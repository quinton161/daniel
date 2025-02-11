import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css"; // Importing the CSS file
import Navbar from "./Navbar"; // Import the Navbar component

export default function HeroSection() {
  const [totalUnits, setTotalUnits] = useState(0);
  const [m2ToBuilt, setM2ToBuilt] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    const countUp = (setter, target) => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          setter(count);
        } else {
          clearInterval(interval);
        }
      }, 20); // Adjust the speed of counting
    };

    countUp(setTotalUnits, 34);
    countUp(setM2ToBuilt, 49000);
    countUp(setPortfolioValue, 256000000);
  }, []);

  // Determine the image source based on screen size
  const isSmallDevice = window.innerWidth <= 768; // Adjust the breakpoint as needed
  const imageSrc = isSmallDevice ? "./Images/Daniel.png" : "./Images/hero.jpeg";

  return (
    <section className="hero-section">
      <Navbar /> {/* Include the Navbar component */}
      <div className="hero-content">
        <h1 className="hero-title">Daniel Mudimba</h1>
        <p className="hero-subtitle">UX/UI designer</p>
      </div>

      {/* Image Section */}
      <div className="hero-image-container">
        <img src={imageSrc} alt="Elite Construction" className="hero-image" />
        <div className="hero-overlay">
          <span className="news-badge">News</span>
          <h2 className="overlay-title">Leaders in Elite Construction</h2>
        </div>
        <button className="arrow-button">
          <ArrowRight size={20} className="arrow-icon" />
        </button>
      </div>

      {/* Stats Section Removed */}
    </section>
  );
}
