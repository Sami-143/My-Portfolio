import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBuilding, FaShoppingCart, FaCarCrash, FaFileAlt, FaTerminal, FaChartBar, FaCar, FaGithub, FaExternalLinkAlt, FaFilePdf, FaBrain } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

const projects = [
  {
    title: 'LogiScout',
    category: 'fullstack',
    icon: <FaBrain />,
    isFeatured: true,
    description: 'AI-Powered assistant for Incident Resolution — FYP. Architected an AI-powered log intelligence platform to reduce MTTR through real-time incident analysis and contextual root-cause detection. Designed Python & Node.js libraries for structured logging with request-level correlation. Engineered fault-tolerant Kafka-based ingestion pipeline and a cost-aware RAG pipeline integrating server logs and GitHub commits. Led all Web Dashboard development.',
    tech: ['Node.js', 'Python', 'RAG', 'Kafka', 'React', 'MongoDB'],
    links: [],
  },
  {
    title: 'Work Nexus',
    category: 'fullstack',
    icon: <FaBuilding />,
    description: 'HR and Payroll Management System built in a 4-member team. Designed employee management module, leave dashboard, and analytics screens with full API integration for real-time data.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JIRA'],
    links: [{ href: 'https://worknexus-indol.vercel.app', icon: <FaExternalLinkAlt />, label: 'Live' }],
  },
  {
    title: 'E-Commerce App',
    category: 'fullstack',
    icon: <FaShoppingCart />,
    description: 'Full-stack web app with user authentication, product management, cart, and order handling. MongoDB for storage with React frontend, deployed on Heroku.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    links: [{ href: 'https://github.com/Sami-143/e-Commerece-App', icon: <FaGithub />, label: 'Code' }],
  },
  {
    title: 'Traffic Accident Alert',
    category: 'mobile',
    icon: <FaCarCrash />,
    description: 'Flutter app detecting accidents using accelerometer and gravity-filtered data. Sends automated SOS alerts and emergency calls after 10-second alarm. Fully offline with real-time sensor analysis.',
    tech: ['Flutter', 'Dart', 'Sensors', 'Mobile'],
    links: [{ href: 'https://github.com/Kazim68/Traffic-Accident-Alerting-System', icon: <FaGithub />, label: 'Code' }],
  },
  {
    title: 'Google Docs Clone',
    category: 'fullstack',
    icon: <FaFileAlt />,
    description: 'Real-time collaborative document editor with secure storage, instant sync across clients, rich text editing with formatting and image insertion using Quill editor.',
    tech: ['React', 'Socket.io', 'Quill', 'Node.js'],
    links: [{ href: 'https://github.com/Sami-143/Google-docs-clone', icon: <FaGithub />, label: 'Code' }],
  },
  {
    title: 'DSA Projects (C++)',
    category: 'systems',
    icon: <FaTerminal />,
    description: 'DOS-Shell with Text Editor: Command-line shell with file handling and editing. Console-based Excel: Terminal-based spreadsheet with basic formula parsing.',
    tech: ['C++', 'DSA', 'CLI', 'File I/O'],
    links: [
      { href: 'https://github.com/Sami-143/mini-excel', icon: <FaGithub />, label: 'Excel' },
      { href: 'https://github.com/Sami-143/DOSS-SHELL', icon: <FaExternalLinkAlt />, label: 'Shell' },
    ],
  },
  {
    title: 'Playstore Data Analysis',
    category: 'ml',
    icon: <FaChartBar />,
    description: 'Analyzed Google Play Store data to predict app ratings. Engineered features from installs, reviews, size, and price. Used XGBoostRegressor achieving 95% data completeness.',
    tech: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn'],
    links: [{ href: 'https://www.overleaf.com/project/673b79f3567f7c99f881adb5', icon: <FaFilePdf />, label: 'Report' }],
  },
  {
    title: 'ALPD & Verification',
    category: 'ml',
    icon: <FaCar />,
    description: 'Web-based license plate detection system using deep learning and computer vision with integrated security measures for real-time secure vehicle identification.',
    tech: ['Deep Learning', 'CV', 'Python', 'Security'],
    links: [{ href: 'https://github.com/Sami-143/Information-Security-Project', icon: <FaGithub />, label: 'Code' }],
  },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'ML/AI', value: 'ml' },
  { label: 'Systems', value: 'systems' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-tag">&lt;projects&gt;</span>
          <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
          <div className="title-line"><span /></div>
        </AnimatedSection>

        <AnimatedSection className="projects-filter">
          {filters.map(f => (
            <motion.button
              key={f.value}
              className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </AnimatedSection>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatedSection className="section-footer">
          <span className="section-tag">&lt;/projects&gt;</span>
        </AnimatedSection>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.div
      className={`project-card-inner ${project.isFeatured ? 'featured' : ''}`}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {project.isFeatured && (
        <div className="featured-badge">
          <span className="featured-pulse" />
          FYP — Top Project
        </div>
      )}
      <div className="project-header">
        <motion.div className="project-icon" whileHover={{ rotate: -10, scale: 1.15 }}>
          {project.icon}
        </motion.div>
        <div className="project-links">
          {project.links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title={link.label}
              whileHover={{ y: -3, color: '#6366f1' }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
        {project.tech.map(t => <span key={t}>{t}</span>)}
      </div>
      <div className="project-glow" />
    </motion.div>
  )
}
