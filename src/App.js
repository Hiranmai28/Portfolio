import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, Menu, X,
         User, Briefcase, Code2, Zap, Award, BookOpen } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [particles, setParticles]   = useState([]);
  const [svgLines, setSvgLines]     = useState([]);
  const [openSection, setOpenSection] = useState(null); // Prezi zoom state

  // Typewriter
  const roles = ['Data Analyst', 'Data Engineer', 'AI Specialist', 'ML Engineer'];
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typePhase, setTypePhase]   = useState('typing');

  // Counters
  const [counters, setCounters] = useState({ projects: 0, technologies: 0, certifications: 0, gpa: 0 });
  const [countersStarted, setCountersStarted] = useState(false);
  const numbersRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = openSection ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openSection]);

  // Particles + lines
  useEffect(() => {
    const p = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(p);
    const lines = [];
    for (let i = 0; i < p.length; i++)
      for (let j = i + 1; j < p.length; j++) {
        const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 15) lines.push({ id: `${i}-${j}`, x1: p[i].x, y1: p[i].y, x2: p[j].x, y2: p[j].y, opacity: (1 - d / 15) * 0.4 });
      }
    setSvgLines(lines);
  }, []);

  // Typewriter
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
        setRoleIndex(prev => (prev + 1) % roles.length);
        setTypePhase('typing');
      }
    }
  }, [displayText, typePhase, roleIndex]); // eslint-disable-line

  // Counter observer
  useEffect(() => {
    if (!numbersRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !countersStarted) setCountersStarted(true); }, { threshold: 0.3 });
    obs.observe(numbersRef.current);
    return () => obs.disconnect();
  }, [countersStarted]);

  useEffect(() => {
    if (!countersStarted) return;
    const targets = { projects: 10, technologies: 20, certifications: 6, gpa: 38 };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / 60, 3);
      setCounters({ projects: Math.round(targets.projects * ease), technologies: Math.round(targets.technologies * ease), certifications: Math.round(targets.certifications * ease), gpa: Math.round(targets.gpa * ease) });
      if (step >= 60) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [countersStarted]);

  // ── Data ──────────────────────────────────────────────────────────────────────

  const careerPath = [
    {
      type: 'work',
      title: 'Data Analyst Co-op & Program Coordinator',
      org: 'AstraZeneca, Alexion Pharmaceuticals',
      location: 'Boston, MA',
      period: 'Jul 2025 – Dec 2025',
      highlights: [
        'Developed 10+ Power BI dashboards with optimized DAX calculations, reducing report load times by 60%',
        'Designed automated ETL pipelines using Alteryx and Python, reducing data errors by 75%',
        'Built Agentic AI solutions to automate onboarding workflows, accelerating task delivery by 50%',
      ],
    },
    {
      type: 'work',
      title: 'Team Lead & Talent Acquisition Specialist',
      org: 'Saxbys Cafe, Northeastern University',
      location: 'Boston, MA',
      period: 'Aug 2024 – May 2026',
      highlights: [
        'Led a team of 10+ cafe associates, managing scheduling, training, and daily operations',
        'Spearheaded end-to-end talent acquisition — sourcing, interviewing, and onboarding new team members',
        'Implemented operational improvements that measurably increased team efficiency and customer satisfaction',
      ],
    },
    {
      type: 'work',
      title: 'Graduate Research & Teaching Assistant',
      org: 'Northeastern University',
      location: 'Boston, MA',
      period: 'Aug 2024 – Apr 2025',
      highlights: [
        'Guided students through applied data analysis using Python, R, and statistical modeling techniques',
        'Analyzed user behavior through quantitative experiments, contributing to behavioral modeling research',
        'Increased student engagement by 50% through interactive workshops and real-world case studies',
      ],
    },
    {
      type: 'education',
      title: "Master's in Data Science",
      org: 'Northeastern University',
      location: 'Boston, MA',
      period: 'Jan 2024 – May 2026',
      detail: 'GPA: 3.8 / 4.0',
    },
    {
      type: 'work',
      title: 'Data Scientist Intern',
      org: 'Turingminds.ai',
      location: 'Hyderabad, IN',
      period: 'Aug 2022 – Jun 2023',
      highlights: [
        'Cleaned and schema-validated multilingual health datasets; performed EDA using Python and R',
        'Guided feature selection and model development for NLP-based classification tasks',
        'Built interactive dashboards in Tableau and Looker for cross-functional stakeholders',
      ],
    },
    {
      type: 'education',
      title: 'B.Tech, Electronics & Computer Engineering',
      org: 'Sreenidhi Institute of Technology',
      location: 'Hyderabad, IN',
      period: 'Jul 2019 – Jul 2023',
      detail: 'GPA: 4.0 / 4.0',
    },
  ];

  const projects = [
    {
      title: 'NUBOT – Northeastern University',
      description: 'End-to-end ETL pipeline with semantic search capabilities using RAG workflows',
      tech: ['Python', 'Prefect', 'FAISS', 'Mistral LLM', 'LangChain', 'GCP', 'Docker'],
      highlights: [
        'Designed ETL pipeline processing unstructured documents into a FAISS vector database',
        'Integrated Mistral LLM with LangChain for Retrieval-Augmented Generation (RAG)',
        'Deployed to GCP with a CI/CD pipeline via GitHub Actions',
      ],
    },
    {
      title: 'Fine-Tuning LLAMA 2 with LoRA & QLoRA',
      description: 'Fine-tuned LLAMA 2 on custom domain-specific datasets to optimize performance for specialized tasks',
      tech: ['Python', 'LLAMA 2', 'LoRA', 'QLoRA', 'Hugging Face', 'GCP'],
      highlights: [
        'Fine-tuned large language models on domain-specific data, improving RAG response quality by 30%',
        'Trained LLMs on robotic perception data, improving object recognition efficiency in warehouse environments',
      ],
    },
    {
      title: 'SavorSync – AI Recipe Platform',
      description: 'Full-stack platform providing culturally personalized healthy recipes using an AI-powered chatbot',
      tech: ['Python', 'GPT-3.5', 'Tableau', 'RAG', 'Full-Stack Development'],
      highlights: [
        'Conducted user research with 50+ participants; built Tableau dashboards to visualize dietary patterns',
        'Built multilingual AI chatbot using GPT-3.5 for personalized recipe recommendations',
        'Implemented RAG workflows for contextual, culturally-aware recipe generation',
      ],
    },
    {
      title: 'Multiple Disease Prediction (ML)',
      description: 'Real-time health risk prediction tool using ML models to classify multiple diseases',
      tech: ['Python', 'Scikit-learn', 'Streamlit', 'EDA', 'Machine Learning'],
      highlights: [
        'Performed EDA on medical datasets to optimize feature selection for risk classification',
        'Evaluated multiple ML models using accuracy and F1 score; tuned for real-world health applications',
        'Deployed an interactive Streamlit tool for real-time disease risk prediction',
      ],
    },
    {
      title: 'Autism Spectrum Disorder Prediction',
      description: 'Predictive model for ASD using comprehensive survey data and statistical ML',
      tech: ['R', 'Logistic Regression', 'Statistical Analysis', 'Cross-validation'],
      highlights: [
        'Built Logistic Regression model with cross-validation for ASD classification',
        'Performed EDA and tuned model hyperparameters to improve diagnostic precision',
        'Published findings in IJNRD: "Autism Spectrum Disorder Detection using Deep Learning"',
      ],
    },
  ];

  const skills = {
    'Data Engineering':     { items: ['ETL/ELT Pipelines', 'Snowflake', 'Databricks', 'Alteryx', 'Database Architecture', 'Data Modeling'], proficiency: 90, color: 'from-cyan-500 to-cyan-700', bar: 'bg-cyan-500' },
    'Programming':          { items: ['Python', 'SQL', 'R', 'JavaScript', 'C++'], proficiency: 85, color: 'from-violet-500 to-violet-700', bar: 'bg-violet-500' },
    'Data Analysis':        { items: ['Statistical Testing', 'Regression Analysis', 'Pandas', 'NumPy', 'Scikit-learn', 'Excel'], proficiency: 88, color: 'from-cyan-400 to-violet-500', bar: 'bg-gradient-to-r from-cyan-400 to-violet-500' },
    'Visualization & BI':   { items: ['Power BI', 'Tableau', 'Looker', 'Seaborn', 'Matplotlib', 'Plotly'], proficiency: 82, color: 'from-violet-400 to-purple-600', bar: 'bg-violet-400' },
    'Machine Learning & AI':{ items: ['Supervised & Unsupervised Learning', 'Classification Models', 'NLP', 'RAG', 'Transformers', 'LLM Fine-tuning'], proficiency: 80, color: 'from-fuchsia-500 to-violet-600', bar: 'bg-fuchsia-500' },
    'Cloud & DevOps':       { items: ['GCP', 'Azure', 'AWS', 'Docker', 'CI/CD', 'GitHub Actions'], proficiency: 75, color: 'from-sky-400 to-cyan-600', bar: 'bg-sky-400' },
  };

  const certifications = [
    { title: 'Snowflake Data Warehousing Badge', issuer: 'Snowflake' },
    { title: 'AstraZeneca Thriving in AI Programme 2025', issuer: 'AstraZeneca · Platinum' },
    { title: 'Alteryx Machine Learning Micro-Credential', issuer: 'Alteryx' },
    { title: 'Oracle Cloud Infrastructure 2024 Generative AI Professional', issuer: 'Oracle' },
    { title: 'AICTE AWS Data Analytics Virtual Internship', issuer: 'AWS / AICTE' },
    { title: 'Autism Spectrum Disorder Detection using Deep Learning', issuer: 'IJNRD · Research Publication' },
  ];

  const impactStats = [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '6', label: 'Certifications' },
    { value: '3.8', label: 'GPA' },
  ];

  const counterCards = [
    { key: 'projects',      label: 'Projects Built',  suffix: '+', fmt: v => v },
    { key: 'technologies',  label: 'Technologies',    suffix: '+', fmt: v => v },
    { key: 'certifications',label: 'Certifications',  suffix: '',  fmt: v => v },
    { key: 'gpa',           label: 'GPA',             suffix: '',  fmt: v => (v / 10).toFixed(1) },
  ];

  // Prezi section cards (the "overview" cards)
  const sectionCards = [
    { id: 'about',    title: 'About Me',     tagline: 'Who I am & what drives me',           icon: <User size={32} className="text-cyan-400" /> },
    { id: 'career',   title: 'Career Path',  tagline: 'Education + experience, one timeline', icon: <Briefcase size={32} className="text-violet-400" /> },
    { id: 'projects', title: 'Projects',     tagline: "What I've built with data & AI",       icon: <Code2 size={32} className="text-fuchsia-400" /> },
    { id: 'skills',   title: 'Skills',       tagline: 'My full technical toolkit',            icon: <Zap size={32} className="text-sky-400" /> },
    { id: 'certifications', title: 'Certifications', tagline: 'Credentials & publications',  icon: <Award size={32} className="text-amber-400" /> },
    { id: 'contact',  title: 'Contact',      tagline: "Let's work together",                  icon: <Mail size={32} className="text-cyan-400" /> },
  ];

  // ── Section renderers ─────────────────────────────────────────────────────────

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10">About <span className="gradient-text">Me</span></h2>
      <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
        <p>
          I'm a data-driven problem solver who turns raw, messy information into decisions that matter. Currently completing my
          <span className="text-cyan-400 font-semibold"> Master's in Data Science at Northeastern University</span> (GPA: 3.8),
          I bring hands-on experience across the full data stack — from architecting ETL pipelines and building ML models to
          designing executive dashboards and deploying AI-powered applications.
        </p>
        <p>
          At <span className="text-violet-400 font-semibold">AstraZeneca / Alexion Pharmaceuticals</span>, I reduced report load times
          by 60%, cut data pipeline errors by 75%, and shipped Agentic AI solutions that cut manual onboarding work in half.
          My background spans pharma analytics, academic research, LLM fine-tuning, and cross-functional stakeholder communication —
          so I'm equally comfortable in the weeds of a SQL query and in the boardroom presenting findings.
        </p>
        <p>
          What sets me apart: I don't just <em>analyze</em> data — I <em>engineer systems around it</em>. Whether it's fine-tuning
          LLMs with LoRA, building RAG pipelines from scratch, or creating Power BI dashboards that executives actually use, I show
          up with curiosity, precision, and a bias for measurable impact.
        </p>
        <p>
          Outside of data, I'm a people-first leader — I've led teams, hired talent, and mentored students, which means I bring
          both technical depth and the communication skills to translate it for any audience.
        </p>
      </div>
    </div>
  );

  const renderCareer = () => (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Career <span className="gradient-text">Path</span></h2>
      <p className="text-gray-400 mb-12">Education and experience — one continuous story.</p>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/80 via-violet-500/50 to-transparent"></div>
        <div className="space-y-10">
          {careerPath.map((item, i) => (
            <div key={i} className="relative pl-16">
              <div className={`absolute left-0 top-2 w-12 h-12 rounded-full flex items-center justify-center border-2 ${item.type === 'education' ? 'border-violet-400 bg-slate-900' : 'border-cyan-400 bg-slate-900'}`}>
                {item.type === 'education'
                  ? <BookOpen size={18} className="text-violet-400" />
                  : <Briefcase size={18} className="text-cyan-400" />}
              </div>
              <div className={`rounded-xl p-6 border ${item.type === 'education' ? 'bg-violet-900/20 border-violet-700/40' : 'bg-slate-800/50 border-slate-700/40'}`}>
                <span className={`text-xs font-bold tracking-widest uppercase ${item.type === 'education' ? 'text-violet-400' : 'text-cyan-400'}`}>{item.period}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.type === 'education' ? 'bg-violet-500/20 text-violet-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                    {item.type === 'education' ? 'Education' : 'Work'}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mt-2">{item.title}</h4>
                <p className="text-gray-400 text-sm mt-0.5">{item.org} · {item.location}</p>
                {item.detail && <p className="text-gray-500 text-sm mt-1">{item.detail}</p>}
                {item.highlights && (
                  <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2">
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
  );

  const renderProjects = () => (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Featured <span className="gradient-text">Projects</span></h2>
      <p className="text-gray-400 mb-12">Things I've built at the intersection of data, AI, and real-world problems.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-slate-700/40 flex flex-col">
            <h4 className="text-lg font-bold gradient-text mb-2 leading-snug">{p.title}</h4>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t, j) => (
                <span key={j} className="px-3 py-1 bg-slate-700/70 text-cyan-300 rounded-full text-xs border border-slate-600/50">{t}</span>
              ))}
            </div>
            <ul className="space-y-2 text-gray-300 text-sm mt-auto">
              {p.highlights.map((h, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-violet-400 flex-shrink-0 mt-0.5">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Skills & <span className="gradient-text">Expertise</span></h2>
      <p className="text-gray-400 mb-12">My technical toolkit — built across industry, research, and personal projects.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([cat, data], i) => (
          <div key={i} className="card-hover bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-700/40 flex flex-col">
            <div className={`bg-gradient-to-r ${data.color} px-6 py-4`}>
              <h4 className="font-bold text-white text-sm tracking-wide">{cat}</h4>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-5 flex-1">
                {data.items.map((s, j) => (
                  <span key={j} className="px-3 py-1 bg-slate-700/70 text-gray-200 rounded-full text-xs border border-slate-600/40">{s}</span>
                ))}
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Proficiency</span>
                  <span className="text-xs font-bold text-gray-300">{data.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${data.bar}`} style={{ width: `${data.proficiency}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4"><span className="gradient-text">Certifications</span> & Publications</h2>
      <p className="text-gray-400 mb-12">Credentials that validate what I bring to the table.</p>
      <div className="space-y-4">
        {certifications.map((c, i) => (
          <div key={i} className="card-hover flex items-start gap-5 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/40 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-amber-400" />
            </div>
            <div>
              <p className="font-semibold text-white">{c.title}</p>
              <p className="text-sm text-gray-400 mt-0.5">{c.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Get In <span className="gradient-text">Touch</span></h2>
      <p className="text-xl text-gray-300 mb-12 leading-relaxed">
        Open to new opportunities, collaborations, and conversations. Let's build something impactful together.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <Mail className="mx-auto mb-3 text-cyan-400" size={36} />, label: 'Email', content: <a href="mailto:devarasetty.h@northeastern.edu" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors break-all">devarasetty.h@northeastern.edu</a> },
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
          <Linkedin size={20} /> LinkedIn
        </a>
        <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer"
           className="px-7 py-3 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 rounded-xl transition-all hover:scale-105 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-violet-500/20">
          <Github size={20} /> GitHub
        </a>
      </div>
    </div>
  );

  const sectionContent = { about: renderAbout, career: renderCareer, projects: renderProjects, skills: renderSkills, certifications: renderCertifications, contact: renderContact };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 relative overflow-hidden">

      <style>{`
        @keyframes float    { 0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-20px) translateX(10px)} }
        @keyframes twinkle  { 0%,100%{opacity:0.25}50%{opacity:0.9} }
        @keyframes fade-in  { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
        @keyframes cursor-blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes zoom-in  { from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)} }
        .animate-fade-in    { animation: fade-in 1s ease-out both; }
        .delay-200 { animation-delay:.2s } .delay-400 { animation-delay:.4s } .delay-600 { animation-delay:.6s }
        .cursor-blink { display:inline-block; animation: cursor-blink 1s step-end infinite; }
        .gradient-text { background:linear-gradient(90deg,#22d3ee,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .card-hover { transition:transform .2s ease,box-shadow .2s ease; }
        .card-hover:hover { transform:translateY(-4px);box-shadow:0 20px 40px -8px rgba(34,211,238,0.15); }
        .zoom-in { animation: zoom-in 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .prezi-card { transition: transform .25s ease, box-shadow .25s ease; cursor: pointer; }
        .prezi-card:hover { transform: scale(1.04); box-shadow: 0 24px 48px -8px rgba(139,92,246,0.25); }
      `}</style>

      {/* SVG Network Background */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {svgLines.map(l => <line key={l.id} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`} stroke="#22d3ee" strokeWidth="0.5" opacity={l.opacity} />)}
      </svg>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.size}px`, height:`${p.size}px`, background: p.id % 3 === 0 ? '#8b5cf6' : '#22d3ee', animation:`float ${p.duration}s ease-in-out infinite ${p.delay}s, twinkle ${p.duration*1.5}s ease-in-out infinite ${p.delay}s` }} />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">Hiranmai Devarasetty</h1>
          <div className="hidden md:flex space-x-6">
            {sectionCards.map(s => (
              <button key={s.id} onClick={() => setOpenSection(s.id)}
                className="text-sm font-medium tracking-wide hover:text-cyan-400 transition-colors text-gray-300 capitalize">
                {s.title}
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
              {sectionCards.map(s => (
                <button key={s.id} onClick={() => { setOpenSection(s.id); setIsMenuOpen(false); }}
                  className="block w-full text-left capitalize hover:text-cyan-400 transition-colors">{s.title}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="animate-fade-in text-lg text-gray-400 mb-3 tracking-widest uppercase font-medium">Hi! I'm Hiranmai.</p>
          <h1 className="animate-fade-in delay-200 text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight min-h-[1.2em]">
            <span className="gradient-text">{displayText}</span>
            <span className="cursor-blink text-cyan-400">|</span>
          </h1>
          <p className="animate-fade-in delay-400 text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transforming complex data into actionable insights through advanced analytics, AI pipelines, and interactive visualizations.
          </p>
          <div className="animate-fade-in delay-600 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {impactStats.map((stat, i) => (
              <div key={i} className="bg-slate-800/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700/50">
                <p className="text-2xl md:text-3xl font-extrabold text-cyan-400">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-5 mb-12">
            <a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/70 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 rounded-full transition-all hover:scale-110"><Linkedin size={24} /></a>
            <a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/70 hover:bg-violet-600 border border-slate-700 hover:border-violet-500 rounded-full transition-all hover:scale-110"><Github size={24} /></a>
            <a href="mailto:devarasetty.h@northeastern.edu" className="p-3 bg-slate-800/70 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 rounded-full transition-all hover:scale-110"><Mail size={24} /></a>
          </div>
          <button onClick={() => { const el = document.getElementById('numbers'); el && el.scrollIntoView({ behavior: 'smooth' }); }} className="animate-bounce">
            <ChevronDown size={36} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* By The Numbers */}
      <section id="numbers" className="py-24 px-6 relative z-10 bg-slate-900/80 backdrop-blur-sm border-y border-slate-700/50" ref={numbersRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-widest text-violet-400 font-semibold mb-3">Impact at a Glance</h2>
          <h3 className="text-center text-4xl md:text-5xl font-extrabold gradient-text mb-14">By The Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {counterCards.map(({ key, label, suffix, fmt }) => (
              <div key={key} className="card-hover bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-8 text-center shadow-xl">
                <p className="text-5xl md:text-6xl font-extrabold gradient-text mb-2">{fmt(counters[key])}{suffix}</p>
                <p className="text-gray-400 text-sm tracking-wide uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prezi Overview — Explore Section */}
      <section id="explore" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-3">Explore</h2>
          <h3 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
            Dive <span className="gradient-text">Deeper</span>
          </h3>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">Click any card to zoom in and explore the full content.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sectionCards.map(card => (
              <button
                key={card.id}
                onClick={() => setOpenSection(card.id)}
                className="prezi-card text-left bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/40 shadow-xl hover:border-cyan-500/40"
              >
                <div className="mb-4">{card.icon}</div>
                <h4 className="text-lg font-bold text-white mb-1">{card.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{card.tagline}</p>
                <div className="mt-4 text-xs text-cyan-400 font-semibold tracking-wide uppercase flex items-center gap-1">
                  Explore →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-6 text-center text-gray-500 text-sm relative z-10">
        <p>© 2026 <span className="gradient-text font-semibold">Hiranmai Devarasetty</span>. Built with React & Tailwind CSS.</p>
      </footer>

      {/* ── Prezi Zoom Overlay ──────────────────────────────────────────────── */}
      {openSection && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto zoom-in">
          {/* Sticky close bar */}
          <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setOpenSection(null)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-medium"
            >
              <X size={16} /> Close
            </button>
            <div className="flex gap-2">
              {sectionCards.map(s => (
                <button key={s.id} onClick={() => setOpenSection(s.id)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${openSection === s.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-gray-500 hover:text-gray-300'}`}>
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          {/* Section content */}
          <div className="relative z-10">
            {sectionContent[openSection]?.()}
          </div>
        </div>
      )}
    </div>
  );
}
