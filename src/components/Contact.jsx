import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedinIn, FaCode, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success')
        formRef.current.reset()
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch(() => {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      })
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-tag">&lt;contact&gt;</span>
          <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
          <div className="title-line"><span /></div>
        </AnimatedSection>

        <div className="contact-grid">
          <AnimatedSection className="contact-info" direction="right">
            <h3>Let's work together</h3>
            <p>
              Feel free to connect with me for collaboration or inquiries.
              Whether via email, LinkedIn, or GitHub — I'm accessible for discussions on projects,
              networking, or sharing insights on software development.
            </p>

            <div className="contact-details">
              {[
                {
                  icon: <FaEnvelope />,
                  label: 'Email',
                  value: 'samiullahglotar420@gmail.com',
                  href: 'mailto:samiullahglotar420@gmail.com'
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: 'Location',
                  value: 'Lahore, Pakistan',
                },
                {
                  icon: <FaPhone />,
                  label: 'Phone',
                  value: '0321-7586077',
                  href: 'tel:03217586077'
                },
              ].map((item, i) => (
                <motion.div className="contact-item" key={i} whileHover={{ x: 5 }}>
                  <motion.div
                    className="contact-icon"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <span className="contact-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href}>{item.value}</a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-socials">
              {[
                { href: 'https://github.com/Sami-143', icon: <FaGithub /> },
                { href: 'https://www.linkedin.com/in/sami-ullah-950a0b2b6/', icon: <FaLinkedinIn /> },
                { href: 'https://leetcode.com/u/samimalik_302/', icon: <FaCode /> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="contact-form-wrapper" direction="left">
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="from_name" required placeholder=" " />
                  <label>Your Name</label>
                  <div className="input-line" />
                </div>
                <div className="form-group">
                  <input type="email" name="from_email" required placeholder=" " />
                  <label>Your Email</label>
                  <div className="input-line" />
                </div>
              </div>
              <div className="form-group">
                <input type="text" name="subject" required placeholder=" " />
                <label>Subject</label>
                <div className="input-line" />
              </div>
              <div className="form-group">
                <textarea name="message" rows="5" required placeholder=" " />
                <label>Message</label>
                <div className="input-line" />
              </div>

              <motion.button
                type="submit"
                className={`btn btn-primary btn-submit ${status}`}
                disabled={status === 'sending'}
                whileHover={status === 'idle' ? { scale: 1.03 } : {}}
                whileTap={status === 'idle' ? { scale: 0.97 } : {}}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span>Sending...</span>
                    <div className="spinner" />
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span>Message Sent!</span>
                    <FaCheck />
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span>Failed — Try Again</span>
                    <FaExclamationTriangle />
                  </>
                )}
              </motion.button>
            </form>
          </AnimatedSection>
        </div>

        <AnimatedSection className="section-footer">
          <span className="section-tag">&lt;/contact&gt;</span>
        </AnimatedSection>
      </div>
    </section>
  )
}
