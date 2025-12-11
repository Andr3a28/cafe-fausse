// src/pages/About.js

function About() {
  return (
    <section className="content-shell about-page">
      <div className="about-grid">
        {/* LEFT: Story + Owners */}
        <div className="about-main about-panel">
          <h2>About Café Fausse</h2>

          <p>
            Café Fausse is a cozy, modern restaurant that blends comfort food with fresh,
            seasonal ingredients. From morning coffee and pastries to evening small plates
            and cocktails, our menu is designed for relaxed catch-ups, date nights, and
            everything in between.
          </p>

          <p>
            Inside, you&apos;ll find warm lighting, an open kitchen, and a playlist that feels
            like your favourite Sunday afternoon. We focus on friendly, unpretentious service
            and dishes that look elegant without ever feeling fussy.
          </p>

          <p>
            This website lets guests browse our menu, reserve a table online, and join our
            newsletter to hear about chef specials, live music evenings, and seasonal events.
          </p>

          <ul className="about-list">
            <li>Fresh, seasonal dishes prepared daily</li>
            <li>Online table reservations with instant confirmation</li>
            <li>Newsletter for specials, events, and tasting nights</li>
          </ul>

          <div className="owners-section">
            <h3>Meet the Owners</h3>
            <div className="owner-grid">
              <div className="owner-card">
                <h4>Elena Moyo</h4>
                <p className="owner-role">Head Chef &amp; Co-Owner</p>
                <p>
                  Elena grew up in a family of home cooks and trained in European bistros
                  before returning to open Café Fausse. Her dishes combine classic techniques
                  with bold, modern flavours, always built around seasonal ingredients.
                </p>
              </div>

              <div className="owner-card">
                <h4>Daniel Rossi</h4>
                <p className="owner-role">Co-Owner &amp; Host</p>
                <p>
                  Daniel runs the dining room and makes sure every guest feels like a regular.
                  With a background in specialty coffee and wine, he curates our drinks list
                  and leads the front-of-house team that welcomes you at the door.
                </p>
              </div>
            </div>

            <p className="owners-tagline">
              Together, Elena and Daniel created Café Fausse as the kind of neighbourhood
              place they always wanted to hang out in: warm, relaxed, and just a little bit
              special.
            </p>
          </div>
        </div>

        {/* RIGHT: Info cards */}
        <div className="about-sidebar">
          <div className="about-panel about-card">
            <h3>Contact &amp; Location</h3>
            <p>
              <strong>Address</strong><br />
              123 Market Street, City Centre, 00000
            </p>
            <p>
              <strong>Phone</strong><br />
              (555) 123-4567
            </p>
            <p>
              <strong>Email</strong><br />
              hello@cafefausse.example
            </p>
          </div>

          <div className="about-panel about-card">
            <h3>Opening Hours</h3>
            <p>Monday – Friday: 08:00 – 22:00</p>
            <p>Saturday: 09:00 – 23:00</p>
            <p>Sunday: 09:00 – 21:00</p>
          </div>

          <div className="about-panel about-card">
            <h3>Group Bookings</h3>
            <p>
              Planning a celebration or team dinner? Contact us for group menus,
              private events, or catering enquiries and our team will be happy to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
