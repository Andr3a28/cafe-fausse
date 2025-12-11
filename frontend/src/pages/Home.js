import React, { useState, useEffect } from "react";

const API_BASE = "http://127.0.0.1:5000";

// Static review data for the carousel
const REVIEWS = [
  {
    quote:
      "The kind of neighbourhood spot you keep coming back to – relaxed, warm, and quietly obsessed with flavour.",
    source: "City Food Magazine",
    rating: 5,
    logo: "City Food"
  },
  {
    quote:
      "Perfect for a slow Sunday brunch or a late-night glass of wine. Service is genuinely friendly, not scripted.",
    source: "Local Bites Blog",
    rating: 4,
    logo: "Local Bites"
  },
  {
    quote:
      "Smart, seasonal cooking without the attitude. Café Fausse feels like a little escape in the middle of the city.",
    source: "The Weekend Guide",
    rating: 5,
    logo: "Weekend Guide"
  }
];

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [errors, setErrors] = useState([]);

  // Carousel state
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate reviews every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);

  const handlePrev = () => {
    setCurrentReview((prev) =>
      prev === 0 ? REVIEWS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < count ? "star star-filled" : "star"}
      >
        ★
      </span>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrors([]);

    if (!email.trim()) {
      setStatus("error");
      setErrors(["Email is required"]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/newsletter/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim()
        })
      });

      if (!response.ok) {
        let message = "Network error";
        try {
          const data = await response.json();
          if (data && data.error) {
            message = data.error;
          }
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }

      await response.json();

      setStatus("success");
      setErrors([]);
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrors([err.message || "Could not subscribe"]);
    }
  };

  const activeReview = REVIEWS[currentReview];

  return (
    <section className="home-hero-section">
      <div className="home-hero-inner">
        <div className="hero-card">
          {/* Hero + newsletter */}
          <div className="hero">
            <h2>Welcome to Café Fausse</h2>
            <p>Cozy, modern dining in the heart of the city.</p>
            <p>
              Explore our menu, reserve your table online, and stay up to date
              with our latest specials.
            </p>
          </div>

          <div className="newsletter-box">
            <h3>Join Our Newsletter</h3>
            <p>Be the first to hear about new dishes, events, and specials.</p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>

            {status === "success" && (
              <div className="success" style={{ marginTop: "0.8rem" }}>
                Thank you for subscribing!
              </div>
            )}

            {status === "error" && errors.length > 0 && (
              <div className="errors" style={{ marginTop: "0.8rem" }}>
                <ul>
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Praise / reviews section */}
          <h3 className="praise-title" style={{ marginTop: "2.2rem" }}>
            Praise for Café Fausse
          </h3>

          <div className="praise-section">
            {/* Carousel */}
            <div className="praise-carousel">
              <div
                key={currentReview}
                className="praise-slide fade-in-up"
              >
                <div className="star-rating">
                  {renderStars(activeReview.rating)}
                </div>
                <p className="praise-quote">“{activeReview.quote}”</p>
                <p className="praise-source">— {activeReview.source}</p>

                <div className="critic-logos">
                  <span className="critic-logo">{activeReview.logo}</span>
                  <span className="critic-logo">Urban Dining Guide</span>
                  <span className="critic-logo">City Eats</span>
                </div>
              </div>

              <div className="praise-controls">
                <button
                  type="button"
                  className="praise-btn"
                  onClick={handlePrev}
                  aria-label="Previous review"
                >
                  ‹
                </button>
                <div className="praise-dots">
                  {REVIEWS.map((_, idx) => (
                    <span
                      key={idx}
                      className={
                        idx === currentReview
                          ? "praise-dot praise-dot-active"
                          : "praise-dot"
                      }
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="praise-btn"
                  onClick={handleNext}
                  aria-label="Next review"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Award card */}
            <div className="award-card">
              <div className="award-badge">BEST NEW BISTRO 2024</div>
              <p className="praise-quote">
                Listed in the 2024 Urban Dining Guide as one of the Top 10
                Neighbourhood Restaurants and recognised for outstanding brunch
                and wine list.
              </p>
              <p className="praise-source">— Urban Dining Guide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
