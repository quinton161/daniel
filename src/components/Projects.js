import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import DecayCard from './DecayCard';

const ProjectsSection = styled.section`
  padding: 100px 0;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce solution with React",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
    link: "https://project1.com",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
    link: "https://project2.com",
    tags: ["React Native", "Firebase"]
  },
  {
    title: "Healthcare Dashboard",
    description: "Medical data visualization platform",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    link: "https://project3.com",
    tags: ["Vue.js", "D3.js", "Express"]
  },
  {
    title: "AI Portfolio Generator",
    description: "Automated portfolio creation using AI",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    link: "https://project4.com",
    tags: ["Next.js", "OpenAI", "TailwindCSS"]
  }
];

const CardWrapper = styled(motion.div)`
  position: relative;
  
  &:hover .card-text {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-text {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  backdrop-filter: blur(5px);
`;

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        Featured Projects
      </motion.h2>

      <ProjectGrid>
        {projects.map((project, index) => (
          <CardWrapper
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none' }}
            >
              <DecayCard
                width={500}
                height={600}
                image={project.image}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 style={{ 
                    marginBottom: '1rem', 
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                  <Tags>
                    {project.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>{tag}</Tag>
                    ))}
                  </Tags>
                </motion.div>
              </DecayCard>
            </a>
          </CardWrapper>
        ))}
      </ProjectGrid>
    </ProjectsSection>
  );
};

export default Projects;
