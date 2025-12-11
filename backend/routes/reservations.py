from flask import Blueprint, request, jsonify
from datetime import datetime
import random

from database import db
from models import Customer, Reservation

reservations_bp = Blueprint("reservations", __name__)


@reservations_bp.get("/")
def get_reservations_root():
    """Simple test endpoint."""
    return jsonify({"message": "Reservations endpoint working"})


@reservations_bp.post("/")
def create_reservation():
    """
    Create a new reservation.

    Expected JSON body:
    {
        "name": "Arthur",
        "email": "arthur@example.com",
        "phone": "0772...",
        "guest_count": 4,
        "time_slot": "2025-12-05T19:30:00"
    }
    """
    data = request.get_json() or {}

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    guest_count = data.get("guest_count")
    time_slot_str = data.get("time_slot")

    # -------------------------------
    # Basic validation
    # -------------------------------
    errors = []

    if not name:
        errors.append("Name is required.")
    if not email:
        errors.append("Email is required.")
    if not guest_count:
        errors.append("Guest count is required.")
    else:
        try:
            guest_count = int(guest_count)
            if guest_count <= 0:
                errors.append("Guest count must be a positive number.")
        except ValueError:
            errors.append("Guest count must be an integer.")

    if not time_slot_str:
        errors.append("time_slot is required (ISO 8601 string).")

    # Parse the time slot
    time_slot = None
    if time_slot_str:
        try:
            # Example accepted format: "2025-12-05T19:30:00"
            time_slot = datetime.fromisoformat(time_slot_str)
        except ValueError:
            errors.append("time_slot must be a valid ISO datetime string.")

    if errors:
        return jsonify({"errors": errors}), 400

    # -------------------------------
    # Find or create customer
    # -------------------------------
    customer = Customer.query.filter_by(email=email).first()
    if not customer:
        customer = Customer(
            name=name,
            email=email,
            phone=phone,
            newsletter_opt_in=False,
        )
        db.session.add(customer)
        # flush so we get customer.id without committing yet
        db.session.flush()

    # -------------------------------
    # Check existing reservations in that time slot
    # -------------------------------
    existing_reservations = Reservation.query.filter_by(time_slot=time_slot).all()

    if len(existing_reservations) >= 30:
        return jsonify({
            "error": "This time slot is fully booked. Please choose another time."
        }), 400

    # Get a random available table from 1–30
    taken_tables = {r.table_number for r in existing_reservations}
    all_tables = set(range(1, 31))
    available_tables = list(all_tables - taken_tables)

    if not available_tables:
        return jsonify({
            "error": "This time slot is fully booked. Please choose another time."
        }), 400

    table_number = random.choice(available_tables)

    # -------------------------------
    # Create reservation
    # -------------------------------
    reservation = Reservation(
        customer_id=customer.id,
        time_slot=time_slot,
        table_number=table_number,
        guest_count=guest_count,
    )
    db.session.add(reservation)
    db.session.commit()

    return jsonify({
        "id": reservation.id,
        "time_slot": reservation.time_slot.isoformat(),
        "table_number": reservation.table_number,
        "guest_count": reservation.guest_count,
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
        }
    }), 201
