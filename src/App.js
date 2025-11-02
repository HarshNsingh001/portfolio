import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, Menu, X, Code, Award, Briefcase, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = {
    Languages: ['C++', 'Python', 'Java'],
    Backend: ['Django REST', 'Flask'],
    Databases: ['MySQL', 'MongoDB', 'SQLite'],
    'Cloud & Tools': ['Azure', 'Docker', 'GitHub Actions', 'Postman'],
    Concepts: ['OOP', 'REST', 'JWT', 'CI/CD', 'Design Patterns']
  };

  const projects = [
    {
      title: 'AI Code Review Assistant',
      tech: 'Django REST, OpenAI API',
      desc: 'Analyzes code for complexity & bugs, offers smart review suggestions.',
      github: 'https://github.com/HarshNsingh001'
    },
    {
      title: 'Cloud File Sharing Platform',
      tech: 'Django, Azure',
      desc: 'Secure file sharing with RBAC and CI/CD on Azure.',
      github: null,
      status: 'Ongoing'
    },
    {
      title: 'Team Task Management System',
      tech: 'Django REST, React',
      desc: 'Real-time task tracking with RBAC and notifications.',
      github: 'https://github.com/HarshNsingh001'
    }
  ];

  const experiences = [
    {
      title: 'Software Development Engineer Intern',
      company: 'V4K Entertainment Pvt. Ltd.',
      period: 'Jun 2025 – Aug 2025',
      points: [
        'Built REST APIs with JWT auth and caching',
        'Improved latency by ~20%',
        'Containerized services with Docker'
      ]
    },
    {
      title: 'Data Science Intern',
      company: 'CodSoft',
      period: 'Nov 2024 – Dec 2024',
      points: [
        'Built ML pipelines with scikit-learn',
        'Deployed Flask inference REST APIs'
      ]
    }
  ];

  const certifications = [
    'MongoDB Basics (Udemy)',
    'Python Programming (Infosys Springboard)',
    'Fundamentals of ML (Infosys)',
    'Azure Fundamentals (AZ-900, Expected Dec 2025)'
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ 
      position: 'relative',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
      color: 'white',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      {/* Cursor follower */}
      <div style={{
        position: 'fixed',
        width: '32px',
        height: '32px',
        border: '2px solid rgb(192, 132, 252)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s'
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 40,
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            HNS
          </h1>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            className="md-hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: '#0f172a',
              gap: '1.5rem',
              padding: '1.5rem',
              zIndex: 50
            }} className="mobile-nav">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  style={{
                    textTransform: 'capitalize',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0.5rem',
                    textAlign: 'left',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Desktop Menu */}
          <div style={{
            display: 'none',
            gap: '1.5rem'
          }} className="desktop-menu">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  textTransform: 'capitalize',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .md-hidden { display: none !important; }
          .desktop-menu { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        paddingTop: '5rem'
      }}>
        <div style={{ maxWidth: '896px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, rgb(168, 85, 247), rgb(236, 72, 153))',
              animation: 'pulse 2s infinite',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.75rem',
              fontWeight: 'bold'
            }}>
              HN
            </div>
          </div>
          
          <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Harsh Narayan Singh
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgb(216, 180, 254)' }}>
            Software Developer | Backend Developer | Data Science Enthusiast
          </p>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgb(209, 213, 219)', maxWidth: '672px', margin: '0 auto 2rem' }}>
            Building scalable systems, solving problems, and turning ideas into deployable products.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <a 
              href="/assets/Harsh_Narayan_Singh_Resume.pdf" 
              download 
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgb(147, 51, 234)',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                textDecoration: 'none',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgb(126, 34, 206)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgb(147, 51, 234)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Download size={20} /> View Resume
            </a>
            <button 
              onClick={() => scrollToSection('contact')} 
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid rgb(168, 85, 247)',
                background: 'transparent',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                color: 'white',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Contact Me
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a 
              href="https://linkedin.com/in/harshnarayansingh" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', transition: 'all 0.3s' }}
              onMouseEnter={(e) => {
                e.target.style.color = 'rgb(192, 132, 252)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://github.com/HarshNsingh001" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', transition: 'all 0.3s' }}
              onMouseEnter={(e) => {
                e.target.style.color = 'rgb(192, 132, 252)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Github size={28} />
            </a>
            <a 
              href="https://harshnsingh001.github.io/portfolio" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', transition: 'all 0.3s' }}
              onMouseEnter={(e) => {
                e.target.style.color = 'rgb(192, 132, 252)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <ExternalLink size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            About Me
          </h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(4px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.75' }}>
              I'm a final-year CSE (Data Science specialization) student at Ajay Kumar Garg Engineering College. 
              I specialize in backend systems, cloud architecture, and REST APIs. I enjoy optimizing systems for 
              performance and working with scalable architectures.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <span style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Problem Solver
              </span>
              <span style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Team Player
              </span>
              <span style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Quick Learner
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Technical Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(skills).map(([category, items]) => (
              <div 
                key={category} 
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'rgb(192, 132, 252)' }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(skill => (
                    <span 
                      key={skill} 
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(88, 28, 135, 0.3)',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        border: '1px solid rgba(168, 85, 247, 0.3)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <Code style={{ color: 'rgb(192, 132, 252)' }} size={32} />
                  {project.status && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(202, 138, 4, 0.3)',
                      color: 'rgb(253, 224, 71)',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {project.status}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgb(216, 180, 254)', marginBottom: '0.75rem' }}>{project.tech}</p>
                <p style={{ color: 'rgb(209, 213, 219)', marginBottom: '1rem' }}>{project.desc}</p>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgb(192, 132, 252)',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'rgb(216, 180, 254)'}
                    onMouseLeave={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
                  >
                    <Github size={18} /> View on GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experiences.map((exp, idx) => (
              <div 
                key={idx} 
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  transition: 'border-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)'}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <Briefcase style={{ color: 'rgb(192, 132, 252)', marginTop: '0.25rem' }} size={28} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{exp.title}</h3>
                    <p style={{ color: 'rgb(216, 180, 254)', marginBottom: '0.25rem' }}>{exp.company}</p>
                    <p style={{ color: 'rgb(156, 163, 175)', fontSize: '0.875rem', marginBottom: '1rem' }}>{exp.period}</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {exp.points.map((point, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                          <span style={{ color: 'rgb(192, 132, 252)', marginTop: '0.25rem' }}>▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Education
          </h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
              <GraduationCap style={{ color: 'rgb(192, 132, 252)' }} size={32} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>B.Tech in Computer Science Engineering</h3>
                <p style={{ color: 'rgb(216, 180, 254)' }}>Ajay Kumar Garg Engineering College, Ghaziabad</p>
                <p style={{ color: 'rgb(156, 163, 175)' }}>2022 - 2026 | CGPA: 7.5/10</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'rgb(209, 213, 219)', marginLeft: '3rem' }}>
              <p>Class XII (CBSE) – Maharishi Vidya Mandir, Fatehpur – 88%</p>
              <p>Class X (CBSE) – Maharishi Vidya Mandir, Fatehpur – 94%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {certifications.map((cert, idx) => (
              <div 
                key={idx} 
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Award style={{ color: 'rgb(192, 132, 252)' }} size={28} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Programming */}
      <section style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Competitive Programming
          </h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '3.75rem', fontWeight: 'bold', color: 'rgb(192, 132, 252)', marginBottom: '0.5rem' }}>250+</p>
              <p style={{ fontSize: '1.25rem', color: 'rgb(209, 213, 219)' }}>Problems Solved</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a 
                href="https://leetcode.com/u/harshnarayansingh306/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgb(147, 51, 234)',
                  borderRadius: '9999px',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgb(126, 34, 206)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgb(147, 51, 234)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                LeetCode Profile
              </a>
              <a 
                href="https://www.codechef.com/users/harshsingh19_9" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgb(147, 51, 234)',
                  borderRadius: '9999px',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgb(126, 34, 206)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgb(147, 51, 234)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                CodeChef Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ position: 'relative', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(251, 113, 133))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Get In Touch
          </h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Name</label>
                <input 
                  type="text" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(168, 85, 247)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
                <input 
                  type="email" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(168, 85, 247)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Message</label>
                <textarea 
                  rows="5" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(168, 85, 247)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
                ></textarea>
              </div>
              <a 
                href="mailto:harshnarayansingh306@gmail.com"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, rgb(126, 34, 206), rgb(190, 24, 93))';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Send Message
              </a>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'rgb(209, 213, 219)', marginBottom: '1rem' }}>Or reach out directly:</p>
              <a 
                href="mailto:harshnarayansingh306@gmail.com" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'rgb(192, 132, 252)',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(216, 180, 254)'}
                onMouseLeave={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
              >
                <Mail size={20} /> harshnarayansingh306@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        padding: '2rem 1.5rem',
        borderTop: '1px solid rgba(168, 85, 247, 0.2)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="https://linkedin.com/in/harshnarayansingh" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/HarshNsingh001" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              GitHub
            </a>
            <a 
              href="https://harshnsingh001.github.io/portfolio" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              Portfolio
            </a>
            <a 
              href="/assets/Harsh_Narayan_Singh_Resume.pdf" 
              download 
              style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(192, 132, 252)'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              Resume
            </a>
          </div>
          <p style={{ color: 'rgb(156, 163, 175)' }}>© 2025 Harsh Narayan Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

hjhws