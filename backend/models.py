from datetime import datetime
from database import db

class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    newsletter_opt_in = db.Column(db.Boolean, default=False)

    reservations = db.relationship("Reservation", backref="customer", lazy=True)


class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    guest_count = db.Column(db.Integer, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)


class NewsletterSignup(db.Model):
    __tablename__ = "newsletter_signups"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
