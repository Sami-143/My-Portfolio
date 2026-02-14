import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaGraduationCap, FaPhone, FaEnvelope, FaArrowRight, FaDownload } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-tag">&lt;about&gt;</span>
          <h2 className="section-title">About <span className="highlight">Me</span></h2>
          <div className="title-line"><span /></div>
        </AnimatedSection>

        <div className="about-grid">
          <AnimatedSection className="about-image" direction="right">
            <div className="image-container">
              <img src="/MyProfile.jpg" alt="Sami Ullah" />
              <div className="image-overlay" />
              <div className="image-frame" />
            </div>
            <motion.div
              className="experience-badge"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="exp-number">BSCS</span>
              <span className="exp-text">UET Lahore<br />CGPA 3.3</span>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="about-text" direction="left">
            <h3 className="about-subtitle">
              Software Engineer & <span className="highlight">MERN Stack Developer</span>
            </h3>
            <p className="about-description">
              I am a skilled Software Engineer specializing in the MERN stack with a strong
              foundation in data structures and algorithms. My expertise lies in designing
              and developing scalable web applications using MongoDB, Express.js, React, and Node.js.
              I am dedicated to optimizing performance and ensuring robust code quality through
              efficient algorithms.
            </p>
            <p className="about-description">
              Currently pursuing BSCS from University of Engineering and Technology, Lahore with
              coursework in Data Structures & Algorithms, Database Systems, Artificial Intelligence,
              and Software Engineering.
            </p>

            <div className="about-info-grid">
              {[
                { icon: <FaMapMarkerAlt />, text: 'Lahore, Pakistan' },
                { icon: <FaGraduationCap />, text: 'UET Lahore (2026)' },
                { icon: <FaPhone />, text: '0321-7586077' },
                { icon: <FaEnvelope />, text: 'samiullahglotar420@gmail.com' },
              ].map((item, i) => (
                <div className="info-item" key={i}>
                  <span className="info-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <motion.button
                className="btn btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Hire Me</span>
                <FaArrowRight />
              </motion.button>
              <motion.a
                href="/Sami-Resume.pdf"
                download="Sami-Resume.pdf"
                className="btn btn-outline"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download CV</span>
                <FaDownload />
              </motion.a>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="section-footer">
          <span className="section-tag">&lt;/about&gt;</span>
        </AnimatedSection>
      </div>
    </section>
  )
}
