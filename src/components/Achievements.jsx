import { motion } from 'framer-motion'
import { FaFreeCodeCamp, FaDatabase, FaAws, FaLinux, FaCode, FaUsers } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

const achievements = [
  { icon: <FaFreeCodeCamp />, title: 'JavaScript Algorithms & DS', sub: 'freeCodeCamp' },
  { icon: <FaDatabase />, title: 'SQL (Basic/Intermediate/Advanced)', sub: 'HackerRank' },
  { icon: <FaAws />, title: 'AWS Cloud Practitioner', sub: 'DataCamp' },
  { icon: <FaLinux />, title: 'Linux Fundamentals', sub: 'TrainWithShubham' },
  { icon: <FaCode />, title: '85+ LeetCode Problems', sub: '2 Badges including 50+ Days Streak' },
  { icon: <FaUsers />, title: 'Tech Event Leader', sub: 'Led 5+ Events about Technology' },
]

export default function Achievements() {
  return (
    <section className="achievements" id="achievements">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-tag">&lt;achievements&gt;</span>
          <h2 className="section-title">Achievements & <span className="highlight">Certifications</span></h2>
          <div className="title-line"><span /></div>
        </AnimatedSection>

        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <AnimatedSection key={a.title} className="achievement-card-wrapper" delay={i * 0.1}>
              <motion.div
                className="achievement-card"
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="achievement-icon"
                  whileHover={{ rotate: -5, scale: 1.2 }}
                >
                  {a.icon}
                </motion.div>
                <h4>{a.title}</h4>
                <p>{a.sub}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="section-footer">
          <span className="section-tag">&lt;/achievements&gt;</span>
        </AnimatedSection>
      </div>
    </section>
  )
}
