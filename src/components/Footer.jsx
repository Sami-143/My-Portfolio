import { FaGithub, FaLinkedinIn, FaCode } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-name">Sami Ullah</span>
          </div>
          <p className="footer-text">Designed & Built by Sami Ullah &copy; 2026</p>
          <div className="footer-socials">
            <a href="https://github.com/Sami-143" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/sami-ullah-950a0b2b6/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://leetcode.com/u/samimalik_302/" target="_blank" rel="noopener noreferrer"><FaCode /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
