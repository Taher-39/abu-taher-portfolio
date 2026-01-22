'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, MapPin, Download, ExternalLink, Code, Database, Wrench, Award, Briefcase, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Contact form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Typing animation hook
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const titles = ["Full Stack Developer", "CSE Graduate", "Educator"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < titles[titleIndex].length) {
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTitleIndex((titleIndex + 1) % titles.length);
        }, 2000);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [charIndex, titleIndex]);

  const skills = {
    languages: ["JavaScript (ES6+)", "TypeScript", "C", "HTML5", "CSS3"],
    frontend: ["Next.js", "React.js", "Redux Toolkit", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    tools: ["Git", "GitHub", "Vercel", "Postman", "Zod", "JWT"]
  };

  const projects = [
    {
      title: "Halal Zone",
      description: "MERN E-Commerce web app with Redux, TypeScript, and JWT Auth. Features include cart management, checkout, dashboard, OTP verification, and order tracking.",
      tech: ["React", "Redux", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB"],
      live: "https://halzo.vercel.app/",
      code: "https://github.com/Taher-39/camp-store-client"
    },
    {
      title: "Car Rental System",
      description: "Backend API with TypeScript featuring Zod validation, Bcryptjs security, JWT authentication, and comprehensive booking system with admin panel.",
      tech: ["TypeScript", "Express.js", "MongoDB", "Zod", "JWT", "Bcryptjs"],
      live: "https://erental-car.vercel.app",
      code: "https://github.com/Taher-39/car-rental-reservation-system"
    },
    {
      title: "Creative Agency",
      description: "Full-stack website with conditional dashboards for admin and users, featuring SSLCommerz payment integration for seamless transactions.",
      tech: ["React", "Node.js", "MongoDB", "SSLCommerz", "Express"],
      live: "https://creative-agency-git-main-taher-39.vercel.app/",
      code: "https://github.com/Taher-39/agency-client"
    }
  ];

  const experiences = [
    {
      role: "Assistant Math Teacher",
      company: "Al Jamiya Salafia Madrasha",
      period: "Sep 2024 - Present",
      description: "Teaching Math (Classes 6-10) and ICT (SSC-HSC level). Leveraging B.Sc. in CSE to provide quality education across multiple grades."
    },
    {
      role: "Front End Developer Intern",
      company: "MessBook",
      period: "May - Jul 2022",
      description: "Built responsive layouts using React, Bootstrap, and CSS. Worked with Node.js, MongoDB, and Mongoose in a collaborative team environment."
    }
  ];
  // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

  // Handle form submission
    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus('');
  
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          alert('✅ Message sent successfully! I will get back to you soon.');
        } else {
          setSubmitStatus('error');
          alert('❌ Failed to send message. Please try again or email directly.');
        }
      } catch (error) {
        setSubmitStatus('error');
        alert('❌ Failed to send message. Please try again or email directly.');
      } finally {
        setIsSubmitting(false);
      }
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              AT
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors duration-300 relative group cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-800/95 backdrop-blur-lg"
          >
            <div className="px-4 py-4 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
        <motion.div 
          style={{ opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Abu Taher</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl mb-4 h-12 text-blue-300"
          >
            {titles[titleIndex].substring(0, charIndex)}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Building scalable web applications and empowering the next generation of tech talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-10 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer"
            >
              View Projects
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=1GZHbcox6UXTrq8Z8OsRD1_CmFDCtPTah"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-blue-500 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-6 justify-center mt-12"
          >
            <a href="https://github.com/taher-39" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/taher39" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="mailto:taherpust@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail size={28} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
                    AT
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Abu Taher</h3>
                    <p className="text-blue-400">Full Stack Developer</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Passionate computer science graduate with expertise in building scalable web applications using the MERN stack. 
                  I combine technical proficiency with a dedication to education, mentoring the next generation of tech enthusiasts.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={18} className="text-blue-400" />
                    <span>Rajshahi, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail size={18} className="text-cyan-400" />
                    <span>taherpust@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <GraduationCap size={18} className="text-purple-400" />
                    <span>B.Sc. in CSE, PUST</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Education & Achievement */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg bg-gradient-to-br from-blue-900/20 to-gray-800/30 border border-blue-700/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-blue-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">Education</h3>
                      <p className="text-white font-semibold">B.Sc. in Computer Science & Engineering</p>
                      <p className="text-gray-300 text-sm">Pabna University of Science and Technology</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300">CGPA: 2.95/4.00</span>
                        <span className="text-gray-400">2018 - 2024</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg bg-gradient-to-br from-cyan-900/20 to-gray-800/30 border border-cyan-700/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="text-cyan-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-cyan-300">Achievement Highlight</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-300 text-sm font-semibold">🏆 4th Place</span>
                        <span className="text-gray-300 text-sm">KYAU National Hackathon 2023</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Built 2 complete websites in 24 hours:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div>
                          <p className="text-gray-300 text-sm">AI-Based Smart Village Platform</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div>
                          <p className="text-gray-300 text-sm">Dengue Awareness Website</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Technical <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills).map(([category, items], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-lg bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {category === 'languages' && <Code className="text-blue-400" size={24} />}
                    {category === 'frontend' && <Code className="text-cyan-400" size={24} />}
                    {category === 'backend' && <Database className="text-green-400" size={24} />}
                    {category === 'tools' && <Wrench className="text-purple-400" size={24} />}
                    <h3 className="text-xl font-semibold capitalize">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="backdrop-blur-lg bg-gray-800/40 border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Work <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-400">{exp.role}</h3>
                      <p className="text-xl text-gray-300">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-400">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h2>

            <div className="backdrop-blur-lg bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:taherpust@gmail.com" className="text-gray-200 hover:text-blue-400 transition-colors">
                      taherpust@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-cyan-400" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-gray-200">Rajshahi, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Github className="text-purple-400" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <a href="https://github.com/taher-39" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors">
                      github.com/taher-39
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Linkedin className="text-blue-500" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <a href="https://linkedin.com/in/taher39" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors">
                      linkedin.com/in/taher39
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2025 Abu Taher. Built with Next.js, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;