import React, { useEffect, useRef } from 'react';
import './TrueFocus.css';

const TrueFocus = ({ text = "Daniel Mudimba" }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const letters = container.querySelectorAll('.letter');
    
    const handleMouseMove = (e) => {
      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const blurValue = (distance / maxDistance) * 5;
          const scaleValue = 1 + (1 - distance / maxDistance) * 0.2;
          letter.style.filter = `blur(${blurValue}px)`;
          letter.style.transform = `scale(${scaleValue})`;
        } else {
          letter.style.filter = 'blur(5px)';
          letter.style.transform = 'scale(1)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="true-focus-container" ref={containerRef}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="letter"
          style={{ 
            '--delay': `${index * 0.1}s`,
            '--index': index
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default TrueFocus; 