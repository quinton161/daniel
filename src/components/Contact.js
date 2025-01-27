import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      'service_your_service_id', // Replace with your EmailJS service ID
      'template_your_template_id', // Replace with your EmailJS template ID
      {
        to_email: 'danielmudimba07@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'your_public_key' // Replace with your EmailJS public key
    )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className={`submit-button ${status}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' :
             status === 'success' ? 'Message Sent!' :
             status === 'error' ? 'Error! Try Again' :
             'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
