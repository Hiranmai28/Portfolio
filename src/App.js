import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState([]);
  const [svgLines, setSvgLines] = useState([]);

  // Typewriter state
  const roles = ['Data Analyst', 'Data Engineer', 'AI Specialist', 'ML Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typePhase, setTypePhase] = useState('typing'); // 'typing' | 'deleting'

  // Animated counter state
  const [counters, setCounters] = useState({ projects: 0, technologies: 0, certifications: 0, gpa: 0 });
  const [countersStarted, setCountersStarted] = useState(false);
  const numbersRef = useRef(null);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Particles + SVG lines ───────────────────────────────────────────────────
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    // Build SVG connection lines between nearby particles
    const lines = [];
    for (let i = 0; i < newParticles.length; i++) {
      for (let j = i + 1; j < newParticles.length; j++) {
        const dx = newParticles[i].x - newParticles[j].x;
        const dy = newParticles[i].y - newParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          lines.push({
            id: `${i}-${j}`,
            x1: newParticles[i].x,
            y1: newParticles[i].y,
            x2: newParticles[j].x,
            y2: newParticles[j].y,
            opacity: (1 - dist / 15) * 0.4,
          });
        }
      }
    }
    setSvgLines(lines);
  }, []);

  // ── Typewriter ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const current = roles[roleIndex];

    if (typePhase === 'typing') {
      if (displayText.length < current.length) {
        const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTypePhase('deleting'), 2000);
        return () => clearTimeout(t);
      }
    }

    if (typePhase === 'deleting') {
      if (displayText.length > 0) {
        const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTypePhase('typing');
      }
    }
  }, [displayText, typePhase, roleIndex]);

  // ── Intersection observer to trigger counters ───────────────────────────────
  useEffect(() => {
    if (!numbersRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) setCountersStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(numbersRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  // ── Animated counters ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!countersStarted) return;
    const targets = { projects: 10, technologies: 20, certifications: 6, gpa: 38 }; // gpa ×10
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        projects: Math.round(targets.projects * ease),
        technologies: Math.round(targets.technologies * ease),
        certifications: Math.round(targets.certifications * ease),
        gpa: Math.round(targets.gpa * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [countersStarted]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // ── Data ────────────────────────────────────────────────────────────────────
  const experiences = [
    {
      title: 'Data Analyst Co-op & Program Coordinator',
      company: 'AstraZeneca, Alexion Pharmaceuticals',
      location: 'Boston, MA',
      period: 'Jul 2025 - Dec 2025',
    },
    {
      title: 'Graduate Research and Teaching Assistant',
      company: 'Northeastern University',
      location: 'Boston, MA',
      period: 'Aug 2024 - Apr 2025',
    },
    {
      title: 'Data Scientist Intern',
      company: 'Turingminds.ai',
      location: 'Hyderabad, IN',
      period: 'Aug 2022 - Jun 2023',
    },
  ];

  const projects = [
    {
      title: 'NUBOT - Northeastern University',
      description: 'End-to-end ETL pipeline with semantic search capabilities using RAG workflows',
      tech: ['Python', 'Prefect', 'FAISS', 'Mistral LLM', 'LangChain', 'GCP', 'Docker'],
      highlights: [
        'Designed ETL pipeline processing unstructured documents into FAISS vector database',
        'Integrated Mistral LLM with LangChain for Retrieval-Augmented Generation',
        'Deployed to GCP with CI/CD pipeline via GitHub Actions',
      ],
    },
    {
      title: 'Fine-Tuning LLAMA 2 with Custom Dataset Using LoRA and QLoRA',
      description: 'LLAMA 2 model using LoRA and QLoRA techniques on custom domain-specific datasets to optimize performance for specialized tasks',
      tech: ['Python', 'Prefect', 'FAISS', 'Mistral LLM', 'LangChain', 'GCP', 'Docker'],
      highlights: [
        'Fine-tuned large language models leveraging domain-specific data; enhanced RAG applications, improving response quality by 30%',
        'Trained domain-specific LLMs on robotic perception data, improved object recognition efficiency in warehouse environments',
      ],
    },
    {
      title: 'SavorSync – Culturally Personalized Healthy Recipe Platform',
      description: 'Full-stack web app providing culturally personalized healthy recipes using AI-powered chatbot and user insights',
      tech: ['Python', 'GPT-3.5', 'Tableau', 'RAG', 'Full-Stack Development'],
      highlights: [
        'Conducted user research with 50+ participants and created Tableau dashboards to visualize dietary patterns',
        'Built AI-powered chatbot using GPT-3.5 for multilingual recipe recommendations and ingredient adaptations',
        'Implemented RAG workflows for contextual recipe generation based on cultural and dietary requirements',
      ],
    },
    {
      title: 'Multiple Disease Prediction using Machine Learning',
      description: 'Real-time health risk prediction tool using machine learning models to classify multiple diseases',
      tech: ['Python', 'Machine Learning', 'Streamlit', 'Scikit-learn', 'EDA'],
      highlights: [
        'Performed EDA on medical datasets to extract patterns and optimize feature selection for risk classification',
        'Built and evaluated multiple ML models using accuracy and F1 score metrics for real-world health applications',
        'Deployed an interactive real-time risk prediction tool using Streamlit with user-friendly interface',
      ],
    },
    {
      title: 'Autism Spectrum Disorder Prediction',
      description: 'Predictive model for ASD using comprehensive survey data and machine learning',
      tech: ['R', 'Logistic Regression', 'Statistical Analysis', 'Cross-validation'],
      highlights: [
        'Implemented predictive model using Logistic Regression',
        'Performed exploratory data analysis and optimized model parameters',
        'Improved diagnostic accuracy with precision-recall curves',
      ],
    },
  ];

  const skills = {
    'Data Engineering': {
      items: ['ETL/ELT Pipelines', 'Snowflake', 'Databricks', 'Alteryx', 'Database Architecture', 'Data Modeling'],
      proficiency: 90,
      color: 'from-cyan-500 to-cyan-700',
      bar: 'bg-cyan-500',
    },
    'Programming': {
      items: ['Python', 'SQL', 'R', 'JavaScript', 'C++'],
      proficiency: 85,
      color: 'from-violet-500 to-violet-700',
      bar: 'bg-violet-500',
    },
    'Data Analysis': {
      items: ['Statistical Testing', 'Regression Analysis', 'Pandas', 'NumPy', 'Scikit-learn', 'Excel'],
      proficiency: 88,
      color: 'from-cyan-400 to-violet-500',
      bar: 'bg-gradient-to-r from-cyan-400 to-violet-500',
    },
    'Visualization & BI': {
      items: ['Power BI', 'Tableau', 'Looker', 'Seaborn', 'Matplotlib', 'Plotly'],
      proficiency: 82,
      color: 'from-violet-400 to-purple-600',
      bar: 'bg-violet-400',
    },
    'Machine Learning & AI': {
      items: ['Supervised & Unsupervised Learning', 'Classification Models', 'Predictive Analytics', 'NLP', 'RAG', 'Transformers'],
      proficiency: 80,
      color: 'from-fuchsia-500 to-violet-600',
      bar: 'bg-fuchsia-500',
    },
    'Cloud & DevOps': {
      items: ['GCP', 'Azure', 'AWS', 'Docker', 'CI/CD', 'GitHub Actions'],
      proficiency: 75,
      color: 'from-sky-400 to-cyan-600',
      bar: 'bg-sky-400',
    },
  };

  const impactStats = [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '6', label: 'Certifications' },
    { value: '3.8', label: 'GPA' },
  ];

  const counterCards = [
    { key: 'projects', label: 'Projects Built', suffix: '+', raw: (v) => v },
    { key: 'technologies', label: 'Technologies', suffix: '+', raw: (v) => v },
    { key: 'certifications', label: 'Certifications', suffix: '', raw: (v) => v },
    { key: 'gpa', label: 'GPA', suffix: '', raw: (v) => (v / 10).toFixed(1) },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 relative overflow-hidden">

      {/* ── Global Styles ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50%       { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.9; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .animate-fade-in   { animation: fade-in 1s ease-out both; }
        .delay-200  { animation-delay: 0.2s; }
        .delay-400  { animation-delay: 0.4s; }
        .delay-600  { animation-delay: 0.6s; }
        .cursor-blink { display: inline-block; animation: cursor-blink 1s step-end infinite; }
        .gradient-text {
          background: linear-gradient(90deg, #22d3ee, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px rgba(34,211,238,0.15);
        }
      `}</style>

      {/* ── Connected Node SVG Background ─────────────────────────────────── */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {svgLines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`} y1={`${line.y1}%`}
            x2={`${line.x2}%`} y2={`${line.y2}%`}
            stroke="#22d3ee"
            strokeWidth="0.5"
            opacity={line.opacity}
          />
        ))}
      </svg>

      {/* ── Floating Particles ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.id % 3 === 0 ? '#8b5cf6' : '#22d3ee',
              animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s, twinkle ${p.duration * 1.5}s ease-in-out infinite ${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">
            Hiranmai Devarasetty
          </h1>
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize text-sm font-medium tracking-wide hover:text-cyan-400 transition-colors ${activeSection === section ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                {section}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50">
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

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Greeting */}
          <p className="animate-fade-in text-lg md:text-xl text-gray-400 mb-3 tracking-widest uppercase font-medium">
            Hi! I'm Hiranmai.
          </p>

          {/* Typewriter role — big H1 */}
          <h1 className="animate-fade-in delay-200 text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight min-h-[1.2em]">
            <span className="gradient-text">{displayText}</span>
            <span className="cursor-blink text-cyan-400">|</span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-in delay-400 text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transforming complex data into actionable insights through advanced analytics,
            AI pipelines, and interactive visualizations.
          </p>

          {/* Impact Stats Strip */}
          <div className="animate-fade-in delay-600 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {impactStats.map((stat, i) => (
              <div key={i} className="bg-slate-800/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700/50">
                <p className="text-2xl md:text-3xl font-extrabold text-cyan-400">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-5 mb-12">
            <a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer"
               className="p-3 bg-slate-800/70 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 rounded-full transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer"
               className="p-3 bg-slate-800/70 hover:bg-violet-600 border border-slate-700 hover:border-violet-500 rounded-full transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="mailto:devarasetty.h@northeastern.edu"
               className="p-3 bg-slate-800/70 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 rounded-full transition-all hover:scale-110">
              <Mail size={24} />
            </a>
          </div>

          <button onClick={() => scrollToSection('numbers')} className="animate-bounce">
            <ChevronDown size={36} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* ── By The Numbers Section ─────────────────────────────────────────── */}
      <section id="numbers" className="py-24 px-6 relative z-10 bg-slate-900/80 backdrop-blur-sm border-y border-slate-700/50" ref={numbersRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-widest text-violet-400 font-semibold mb-3">
            Impact at a Glance
          </h2>
          <h3 className="text-center text-4xl md:text-5xl font-extrabold gradient-text mb-14">
            By The Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {counterCards.map(({ key, label, suffix, raw }) => (
              <div key={key} className="card-hover bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-8 text-center shadow-xl">
                <p className="text-5xl md:text-6xl font-extrabold gradient-text mb-2">
                  {raw(counters[key])}{suffix}
                </p>
                <p className="text-gray-400 text-sm tracking-wide uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold text-center mb-3">Who I Am</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
            About <span className="gradient-text">Me</span>
          </h3>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-slate-700/40">
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              I'm a Data Professional specializing in data analytics, machine learning, and AI. With expertise in building ETL pipelines, interactive
              dashboards, and ML models using SQL, Python, Tableau, and Power BI, I'm currently pursuing my Master's in Data Science at Northeastern University.
            </p>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              With experience at AstraZeneca and several research positions, I specialize in translating
              complex data trends into actionable insights and collaborating with cross-functional stakeholders
              to drive improved decision-making.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-6">
              {/* Education Timeline */}
              <div>
                <h3 className="text-2xl font-bold gradient-text mb-6">Education</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/60 to-violet-500/20"></div>
                  <div className="space-y-8">
                    {[
                      { degree: "Master's in Data Science", school: 'Northeastern University', gpa: '3.8/4.0', period: 'Jan 2024 - May 2026' },
                      { degree: 'B.Tech, Electronics & Computer Engineering', school: 'Sreenidhi Institute of Technology', gpa: '4.0/4.0', period: 'Jul 2019 - Jul 2023' },
                    ].map((edu, i) => (
                      <div key={i} className="relative pl-14">
                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                        </div>
                        <p className="text-cyan-400 text-xs font-semibold tracking-wide uppercase">{edu.period}</p>
                        <p className="font-semibold text-white mt-0.5">{edu.degree}</p>
                        <p className="text-gray-400 text-sm">{edu.school}</p>
                        <p className="text-gray-500 text-xs mt-0.5">GPA: {edu.gpa}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-bold gradient-text mb-6">Certifications & Publications</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  {[
                    'Snowflake Data Warehousing Badge',
                    'AstraZeneca Thriving in AI Programme 2025 — Platinum',
                    'Alteryx Machine Learning Micro-Credential',
                    'AICTE AWS Data Analytics Internship',
                    'Oracle Cloud Infrastructure 2024 Generative AI Professional Certified',
                    "Research paper: 'Autism Spectrum Disorder Detection using Deep Learning', IJNRD",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience Section ────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6 relative z-10 bg-slate-900/60">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-sm uppercase tracking-widest text-violet-400 font-semibold text-center mb-3">Career Path</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
            Work <span className="gradient-text">Experience</span>
          </h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/60 via-violet-500/40 to-transparent"></div>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-16">
                  <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500"></div>
                  </div>
                  <div className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-slate-700/40">
                    <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">{exp.period}</p>
                    <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                    <p className="text-gray-400 mt-1">{exp.company} · {exp.location}</p>
                    {exp.highlights && (
                      <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400 flex-shrink-0 mt-0.5">▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects Section ──────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold text-center mb-3">What I've Built</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
            Featured <span className="gradient-text">Projects</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/40 flex flex-col">
                <h4 className="text-lg font-bold gradient-text mb-3 leading-snug">{project.title}</h4>
                <p className="text-gray-300 mb-5 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700/70 text-cyan-300 rounded-full text-xs border border-slate-600/50">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 text-gray-300 text-sm mt-auto">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-400 flex-shrink-0 mt-0.5">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Section ────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 relative z-10 bg-slate-900/60">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-sm uppercase tracking-widest text-violet-400 font-semibold text-center mb-3">Technical Toolkit</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
            Skills & <span className="gradient-text">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, data], index) => (
              <div key={index} className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-700/40 flex flex-col">
                {/* Colored header bar */}
                <div className={`bg-gradient-to-r ${data.color} px-6 py-4`}>
                  <h4 className="font-bold text-white text-sm tracking-wide">{category}</h4>
                </div>
                {/* Pills */}
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.items.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700/70 text-gray-200 rounded-full text-xs border border-slate-600/40">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {/* Proficiency bar */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Proficiency</span>
                      <span className="text-xs font-bold text-gray-300">{data.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${data.bar}`}
                        style={{ width: `${data.proficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h2 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-3">Let's Connect</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-8">
            Get In <span className="gradient-text">Touch</span>
          </h3>
          <p className="text-xl text-gray-300 mb-14 max-w-2xl mx-auto leading-relaxed">
            I'm currently open to new opportunities and collaborations. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: <Mail className="mx-auto mb-3 text-cyan-400" size={36} />, label: 'Email', content: <a href="mailto:devarasetty.h@northeastern.edu" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">devarasetty.h@northeastern.edu</a> },
              { icon: <Phone className="mx-auto mb-3 text-violet-400" size={36} />, label: 'Phone', content: <a href="tel:+18573435158" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">+1 857-343-5158</a> },
              { icon: <MapPin className="mx-auto mb-3 text-fuchsia-400" size={36} />, label: 'Location', content: <p className="text-gray-400 text-sm">Boston, MA</p> },
            ].map((item, i) => (
              <div key={i} className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/40 shadow-xl">
                {item.icon}
                <h4 className="font-semibold mb-2 text-white">{item.label}</h4>
                {item.content}
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer"
               className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-xl transition-all hover:scale-105 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-cyan-500/20">
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer"
               className="px-7 py-3 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 rounded-xl transition-all hover:scale-105 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-violet-500/20">
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-6 text-center text-gray-500 text-sm relative z-10">
        <p>
          © 2026 <span className="gradient-text font-semibold">Hiranmai Devarasetty</span>. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
