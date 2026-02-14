import { motion } from 'framer-motion'
import { FaCode, FaPalette, FaServer, FaDatabase, FaTools, FaBrain } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

const skillData = [
  {
    icon: <FaCode />, title: 'Languages',
    tags: ['JavaScript', 'Python', 'SQL', 'C++', 'C#', 'Dart']
  },
  {
    icon: <FaPalette />, title: 'Frontend',
    tags: ['React.js', 'Redux', 'Tailwind CSS', 'HTML5/CSS3']
  },
  {
    icon: <FaServer />, title: 'Backend',
    tags: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'RBAC']
  },
  {
    icon: <FaDatabase />, title: 'Databases',
    tags: ['MongoDB', 'MySQL', 'MSSQL']
  },
  {
    icon: <FaTools />, title: 'Tools & DevOps',
    tags: ['Git & GitHub', 'JIRA', 'Postman', 'CI/CD', 'Agile/Scrum']
  },
  {
    icon: <FaBrain />, title: 'Data & ML',
    tags: ['Pandas', 'NumPy', 'Scikit-learn', 'Jupyter']
  },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-tag">&lt;skills&gt;</span>
          <h2 className="section-title">My <span className="highlight">Skills</span></h2>
          <div className="title-line"><span /></div>
        </AnimatedSection>

        <div className="skills-grid">
          {skillData.map((cat, i) => (
            <AnimatedSection key={cat.title} className="skill-category" delay={i * 0.1}>
              <div className="category-header">
                <motion.div
                  className="category-icon-wrap"
                  whileHover={{ rotate: -5, scale: 1.15 }}
                >
                  {cat.icon}
                </motion.div>
                <h3>{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.tags.map(tag => (
                  <motion.span
                    key={tag}
                    className="skill-tag"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="section-footer">
          <span className="section-tag">&lt;/skills&gt;</span>
        </AnimatedSection>
      </div>
    </section>
  )
}
