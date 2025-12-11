// frontend/src/components/NewsletterSignup.js
import { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5000"; // must match backend

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);
    setErrors([]);

    try {
      const response = await axios.post(`${API_BASE}/api/newsletter/signup`, {
        email: email,
        name: name,
      });

      setSuccess(response.data.message || "Thank you for subscribing!");
      setEmail("");
      setName("");
    } catch (err) {
      console.error("Newsletter signup error:", err);
      if (err.response && err.response.data) {
        const data = err.response.data;
        setErrors(data.errors || [data.error || "Something went wrong"]);
      } else {
        setErrors(["Network error"]);
      }
    }
  }

  return (
    <div className="newsletter-box">
      <h3>Join Our Newsletter</h3>
      <p>Be the first to hear about new dishes, events, and specials.</p>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Subscribe</button>
      </form>

      {errors.length > 0 && (
        <div className="errors">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div className="success">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
}

export default NewsletterSignup;
