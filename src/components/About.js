import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaMobile, FaLightbulb } from 'react-icons/fa';
import './About.css';

const About = () => {
  const cards = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description: "Creating responsive and dynamic web applications using modern technologies.",
      color: "#FF6B6B"
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "Crafting beautiful and intuitive user interfaces with attention to detail.",
      color: "#4ECDC4"
    },
    {
      icon: <FaMobile />,
      title: "Mobile Design",
      description: "Designing seamless mobile experiences that users love.",
      color: "#45B7D1"
    },
    {
      icon: <FaLightbulb />,
      title: "Creative Solutions",
      description: "Bringing innovative ideas to life through creative problem-solving.",
      color: "#96CEB4"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="about" className="about-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="about-header"
      >
        <h2>About Me</h2>
        <p className="about-intro">
          Passionate about creating beautiful and functional digital experiences
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="cards-container"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="card"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
              background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)`
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="card-icon"
              style={{ color: card.color }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {card.icon}
            </motion.div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <motion.div
              className="card-shine"
              whileHover={{
                opacity: [0, 1, 0],
                transition: { duration: 1.5, repeat: Infinity }
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="about-details"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p>
          With a passion for design and development, I create engaging digital experiences
          that combine aesthetics with functionality. My approach focuses on user-centered
          design principles and modern development practices.
        </p>
      </motion.div>
    </section>
  );
};

export default About;