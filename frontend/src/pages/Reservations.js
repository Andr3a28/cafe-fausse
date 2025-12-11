import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

function Reservations() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    datetime: "",
  });

  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [errors, setErrors] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrors([]);
    setConfirmation(null);

    if (!form.name.trim() || !form.email.trim() || !form.datetime) {
      setStatus("error");
      setErrors(["Name, email, and date/time are required."]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          guest_count: form.guests,
          time_slot: form.datetime, // backend already accepts this format
        }),
      });

      if (!response.ok) {
        let message = "Network error";
        try {
          const data = await response.json();
          if (data && data.error) {
            message = data.error;
          }
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      const data = await response.json();

      setStatus("success");
      setErrors([]);
      setConfirmation({
        table: data.table_number,
        guests: data.guest_count,
        time: data.time_slot,
        name: data.customer?.name || form.name,
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        guests: 2,
        datetime: "",
      });
    } catch (err) {
      setStatus("error");
      setErrors([err.message || "Could not create reservation"]);
    }
  };

  return (
    <section className="reservations-section">
      <div className="reservations-layout">
        <div className="reservations-left">
          <h2>Reserve a Table</h2>
          <p className="reservations-tagline">
            Book your spot for dinner, date night, or a celebration in just a
            few clicks.
          </p>

          <form className="reservation-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="guests">Number of Guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="12"
                value={form.guests}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="datetime">Date &amp; Time</label>
              <input
                id="datetime"
                name="datetime"
                type="datetime-local"
                value={form.datetime}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Book Reservation</button>
          </form>

          {confirmation && (
            <div className="success reservations-success">
              <p>
                <strong>Reservation Confirmed</strong>
              </p>
              <p>Table #{confirmation.table}</p>
              <p>
                {confirmation.guests} guest(s) at {confirmation.time}
              </p>
              <p>Under the name: {confirmation.name}</p>
            </div>
          )}

          {status === "error" && errors.length > 0 && (
            <div className="errors">
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="reservations-image" aria-hidden="true" />
      </div>
    </section>
  );
}

export default Reservations;
