# backend/routes/newsletter.py

from flask import Blueprint, request, jsonify
from database import db
from models import NewsletterSignup, Customer

newsletter_bp = Blueprint("newsletter", __name__)


@newsletter_bp.get("/")
def newsletter_root():
    return jsonify({"message": "Newsletter endpoint working"})


@newsletter_bp.post("/signup")
def newsletter_signup():
    """
    Newsletter signup endpoint.

    Expected JSON:
    {
      "email": "someone@example.com",
      "name": "Optional Name"
    }
    """
    data = request.get_json() or {}
    email = data.get("email")
    name = data.get("name")

    errors = []
    if not email:
        errors.append("Email is required.")
    if errors:
        return jsonify({"errors": errors}), 400

    # Find or create customer, and mark newsletter_opt_in
    customer = Customer.query.filter_by(email=email).first()
    if not customer and name:
        customer = Customer(
            name=name,
            email=email,
            phone=None,
            newsletter_opt_in=True,
        )
        db.session.add(customer)
        db.session.flush()
    elif customer:
        customer.newsletter_opt_in = True

    # Add a record to newsletter_signups table
    signup = NewsletterSignup(email=email)
    db.session.add(signup)
    db.session.commit()

    return jsonify({
        "message": "Thank you for subscribing!",
        "email": email
    }), 201
