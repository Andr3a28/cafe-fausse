from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database import db


def create_app():
    app = Flask(__name__)

    # ----------------------
    # Load configuration
    # ----------------------
    app.config.from_object(Config)

    # ----------------------
    # Initialize extensions
    # ----------------------
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # ----------------------
    # Register Blueprints
    # ----------------------
    from routes.reservations import reservations_bp
    from routes.newsletter import newsletter_bp

    app.register_blueprint(reservations_bp, url_prefix="/api/reservations")
    app.register_blueprint(newsletter_bp, url_prefix="/api/newsletter")

    # ----------------------
    # Test Route
    # ----------------------
    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({
            "status": "ok",
            "message": "Café Fausse backend is running!"
        })

    return app


# ----------------------
# Run the app
# ----------------------
if __name__ == "__main__":
    app = create_app()

    # Create tables if they don't exist yet
    with app.app_context():
        db.create_all()

    app.run(debug=True, host="0.0.0.0", port=5000)
