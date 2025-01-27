import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';
import { RiLayoutLine } from 'react-icons/ri';  // Adding UI/UX icon
import TrueFocus from './TrueFocus';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <motion.div 
        className="logo-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <RiLayoutLine className="logo-icon" />
        <span className="logo-text">UX/UI Design</span>
      </motion.div>
      
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-left">
          <motion.div 
            className="name-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TrueFocus text="Daniel" />
            <TrueFocus text="Mudimba" />
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              UX/UI Designer & Developer
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="social-icons-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a
              href="https://facebook.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#1877f2' }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://instagram.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#e4405f' }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#0077b5' }}
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="image-card">
            <motion.div 
              className="image-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="../Images/Screenshot (61).png" // Replace with your image path
                alt="Daniel Mudimba"
                className="profile-image"
              />
              <div className="image-overlay"></div>
            </motion.div>
            <motion.div 
              className="card-decoration"
              animate={{ 
                rotate: [0, 360],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
