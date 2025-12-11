import { useState, useEffect } from "react";
import "./Gallery.css";

function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    "https://images.unsplash.com/photo-1521305916504-4a1121188589"
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  });

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="gallery-wrapper">
      <h2>Gallery</h2>

      <div className="carousel">
        <button className="nav-btn left" onClick={prevSlide}>
          ❮
        </button>

        <img
          className="carousel-image"
          src={`${photos[index]}?auto=format&fit=crop&w=1600&q=80`}
          alt="Gallery slide"
        />

        <button className="nav-btn right" onClick={nextSlide}>
          ❯
        </button>
      </div>

      {/* Dot indicators */}
      <div className="dots">
        {photos.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === index ? "active" : ""}`}
            onClick={() => setIndex(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
