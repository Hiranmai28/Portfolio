import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const experiences = [
    {
      title: "Data Analyst Co-op & Program Coordinator",
      company: "AstraZeneca, Alexion Pharmaceuticals",
      location: "Boston, MA",
      period: "Jul 2025 - Dec 2025",
      highlights: [
        "Developed 10+ Power BI dashboards with optimized DAX calculations, reducing report load times by 60%",
        "Designed automated ETL pipelines using Alteryx and Python, reducing errors by 75%",
        "Built Agentic AI solutions to automate onboarding workflows, accelerating task delivery by 50%"
      ]
    },
    {
      title: "Graduate Research and Teaching Assistant",
      company: "Northeastern University",
      location: "Boston, MA",
      period: "Aug 2024 - Dec 2024",
      highlights: [
        "Coordinated course logistics and guided students through data analysis using Python",
        "Analyzed user behavior through quantitative experiments, contributing to behavioral modeling",
        "Increased student engagement by 50% through interactive discussions"
      ]
    },
    {
      title: "Data Scientist Intern",
      company: "Turingminds.ai",
      location: "Hyderabad, IN",
      period: "Jan 2023 - Jun 2023",
      highlights: [
        "Conducted data cleaning and schema validation of multilingual health datasets",
        "Performed EDA using Python and R to guide feature selection and model development",
        "Built interactive dashboards in Tableau and Looker for cross-functional teams"
      ]
    }
  ];

  const projects = [
    {
      title: "NUBOT - Northeastern University",
      description: "End-to-end ETL pipeline with semantic search capabilities using RAG workflows",
      tech: ["Python", "Prefect", "FAISS", "Mistral LLM", "LangChain", "GCP", "Docker"],
      highlights: [
        "Designed ETL pipeline processing unstructured documents into FAISS vector database",
        "Integrated Mistral LLM with LangChain for Retrieval-Augmented Generation",
        "Deployed to GCP with CI/CD pipeline via GitHub Actions"
      ]
    },
    {
      title: " Fine-Tuning LLAMA 2 with Custom Dataset Using LoRA and QLoRA ",
      description: "LLAMA 2 model using LoRA and QLoRA techniques on custom domain-specific datasets to optimize performance for specialized tasks",
      tech: ["Python", "Prefect", "FAISS", "Mistral LLM", "LangChain", "GCP", "Docker"],
      highlights: [
          "Fine-tuned large language models by leveraging domain-specific data, Enhanced retrieval-augmented generation (RAG) applications for knowledge-intensive tasks, improving response quality by 30",
          "Trained domain-specific LLMs on robotic perception data, improved object recognition efficiency in warehouse environments"
      ]
    },
    {
      title: "SavorSync – Culturally Personalized Healthy Recipe Platform",
      description: "Full-stack web app providing culturally personalized healthy recipes using AI-powered chatbot and user insights",
      tech: ["Python", "GPT-3.5", "Tableau", "RAG", "Full-Stack Development"],
      highlights: [
        "Conducted user research with 50+ participants and created Tableau dashboards to visualize dietary patterns and preferences",
        "Built AI-powered chatbot using GPT-3.5 for multilingual recipe recommendations and ingredient adaptations",
        "Implemented RAG workflows for contextual recipe generation based on cultural and dietary requirements"
      ]
    },
    {
      title: "Multiple Disease Prediction using Machine Learning",
      description: "Real-time health risk prediction tool using machine learning models to classify multiple diseases",
      tech: ["Python", "Machine Learning", "Streamlit", "Scikit-learn", "EDA"],
      highlights: [
        "Performed exploratory data analysis on medical datasets to extract patterns and optimize feature selection for risk classification",
        "Built and evaluated multiple ML models using accuracy and F1 score metrics, tuning performance for real-world health applications",
        "Deployed an interactive real-time risk prediction tool using Streamlit with focus on responsiveness and user-friendly interface"
      ]
    },
    {
      title: "Autism Spectrum Disorder Prediction",
      description: "Predictive model for ASD using comprehensive survey data and machine learning",
      tech: ["R", "Logistic Regression", "Statistical Analysis", "Cross-validation"],
      highlights: [
        "Implemented predictive model using Logistic Regression",
        "Performed exploratory data analysis and optimized model parameters",
        "Improved diagnostic accuracy with precision-recall curves"
      ]
    }
  ];

  const skills = {
    "Data Engineering": ["ETL/ELT Pipelines", "Snowflake", "Databricks", "Alteryx", "Database Architecture", "Data Modeling"],
    "Programming": ["Python", "SQL", "R", "JavaScript", "C++"],
    "Data Analysis": ["Statistical Testing", "Regression Analysis", "Pandas", "NumPy", "Scikit-learn", "Excel"],
    "Visualization & BI": ["Power BI", "Tableau", "Looker", "Seaborn", "Matplotlib", "Plotly"],
    "Machine Learning & AI": ["Supervised & Unsupervised Learning", "Classification Models", "Predictive Analytics", "NLP", "RAG", "Transformers"],
    "Cloud & DevOps": ["GCP", "Azure", "AWS", "Docker", "CI/CD", "GitHub Actions"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 opacity-60 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s, twinkle ${particle.duration * 1.5}s ease-in-out infinite ${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Add floating animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Hiranmai Devarasetty
          </h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize hover:text-cyan-400 transition-colors ${activeSection === section ? 'text-cyan-400' : ''}`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize hover:text-cyan-400 transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Hi! I'm Hiranmai.
            </h1>
            <h2 className="text-3xl md:text-5xl text-cyan-400 mb-8">
              A Data & AI Specialist
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transforming complex data into actionable insights through advanced analytics, 
              AI, and interactive visualizations.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer" 
               className="p-4 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer"
               className="p-4 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all hover:scale-110">
              <Github size={28} />
            </a>
            <a href="mailto:devarasetty.h@northeastern.edu"
               className="p-4 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all hover:scale-110">
              <Mail size={28} />
            </a>
          </div>

          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
          >
            <ChevronDown size={40} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">About Me</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-10 shadow-xl">
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            I'm a Data Professional specializing in data analytics, machine learning, and AI. With expertise in building ETL pipelines, interactive 
            dashboards, and ML models using SQL, Python, Tableau, and Power BI, I'm currently pursuing my Master's in Data Science at Northeastern University.
            </p>
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
              With experience at AstraZeneca and several research positions, I specialize in translating 
              complex data trends into actionable insights and collaborating with cross-functional stakeholders 
              to drive improved decision-making.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-semibold text-cyan-400 mb-6">Education</h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-xl">Master's in Data Science</p>
                    <p className="text-gray-400 text-xl">Northeastern University</p>
                    <p className="text-lg text-gray-500">GPA: 3.8/4.0 | Jan 2024 - April 2026</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xl">B.Tech, Electronics & Computer Engineering</p>
                    <p className="text-gray-400 text-xl">Sreenidhi Institute of Technology</p>
                    <p className="text-lg text-gray-500">GPA: 4.0/4.0 | Jul 2019 - Jul 2023</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-semibold text-cyan-400 mb-6">Certifications & Publications</h3>
                <ul className="space-y-3 text-gray-300 text-xl">
                  <li>• Snowflake Data Warehousing Badge</li>
                  <li>• AstraZeneca Thriving in AI Programme 2025 - Platinum</li>
                  <li>• Alteryx Machine Learning Micro-Credential</li>
                  <li>• AICTE AWS Data Analytics Internship</li>
                  <li>• Oracle Cloud Infrastructure 2024 Generative AI Professional Certified</li>
                  <li>• Research paper publication on 'Autism Spectrum Disorder Detection using Deep Learning', IJNRD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl hover:shadow-cyan-500/10 transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-semibold text-cyan-400">{exp.title}</h3>
                    <p className="text-2xl text-gray-300 mt-2">{exp.company}</p>
                  </div>
                  <div className="text-gray-400 text-lg mt-2 md:mt-0 md:text-right">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300 text-xl">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-400 mr-2">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl hover:shadow-cyan-500/10 transition-all">
                <h3 className="text-3xl font-semibold text-cyan-400 mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 text-xl leading-relaxed">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-700 text-cyan-300 rounded-full text-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-300 text-lg">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-400 mr-2">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                <h3 className="text-3xl font-semibold text-cyan-400 mb-6">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-700 text-gray-300 rounded-full text-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h2 className="text-5xl font-bold mb-10">Get In Touch</h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            I'm currently open to new opportunities and collaborations. Whether you have a question 
            or just want to say hi, feel free to reach out!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8">
              <Mail className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="font-semibold mb-3 text-2xl">Email</h3>
              <a href="mailto:devarasetty.h@northeastern.edu" className="text-gray-400 hover:text-cyan-400 text-xl">
                devarasetty.h@northeastern.edu
              </a>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8">
              <Phone className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="font-semibold mb-3 text-2xl">Phone</h3>
              <a href="tel:+18573435158" className="text-gray-400 hover:text-cyan-400 text-xl">
                +1 857-343-5158
              </a>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8">
              <MapPin className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="font-semibold mb-3 text-2xl">Location</h3>
              <p className="text-gray-400 text-xl">Boston, MA</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer" 
               className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-all hover:scale-105 flex items-center text-lg">
              <Linkedin className="mr-2" size={24} />
              LinkedIn
            </a>
            <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer"
               className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all hover:scale-105 flex items-center text-lg">
              <Github className="mr-2" size={24} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-6 text-center text-gray-400">
        <p>© 2026 Hiranmai Devarasetty. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}