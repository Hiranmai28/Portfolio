// Factual portfolio content preserved from the original component.
// Polish layout and headlines freely; edit facts only after review.

export const careerPath = [
    {
      type: 'work',
      title: 'AI Engineer, Analytics',
      org: 'Humanitarians AI',
      location: 'Remote',
      period: 'Sept 2026 - Present',
    },
    {
      type: 'work',
      title: 'Data Analyst & Product Coordinator',
      org: 'Alexion Pharmaceuticals, AstraZeneca',
      location: 'Boston, MA',
      period: 'Jul 2025 - Dec 2025',
    },
    {
      type: 'work',
      title: 'Team Lead & Talent Acquisition Specialist',
      org: 'Saxbys Cafe, Northeastern University',
      location: 'Boston, MA',
      period: 'Aug 2024 - May 2026',
    },
    {
      type: 'work',
      title: 'Graduate Research & Teaching Assistant',
      org: 'Northeastern University',
      location: 'Boston, MA',
      period: 'Aug 2024 - Apr 2025',
    },
    {
      type: 'education',
      title: "Master's in Data Science",
      org: 'Northeastern University',
      location: 'Boston, MA',
      period: 'Jan 2024 - May 2026',
      detail: 'GPA: 3.8 / 4.0',
    },
    {
      type: 'work',
      title: 'Data Scientist, Analytics',
      org: 'Turingminds.ai',
      location: 'Hyderabad, IN',
      period: 'Aug 2022 - Jun 2023',
    },
    {
      type: 'education',
      title: 'B.Tech, Electronics & Computer Engineering',
      org: 'Sreenidhi Institute of Technology',
      location: 'Hyderabad, IN',
      period: 'Jul 2019 - Jul 2023',
      detail: 'GPA: 4.0 / 4.0',
    },
  ];

export const projects = [
    {
      title: 'NUBOT - Northeastern University',
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
      title: 'SavorSync - AI Recipe Platform',
      description: 'Full-stack platform providing culturally personalized healthy recipes using an AI-powered chatbot',
      tech: ['Python', 'GPT-3.5', 'Tableau', 'RAG', 'Full-Stack Development'],
      highlights: [
        'Conducted user research with 50+ participants; built Tableau dashboards to visualize dietary patterns',
        'Built multilingual AI chatbot using GPT-3.5 for personalized recipe recommendations',
        'Implemented RAG workflows for contextual, culturally-aware recipe generation',
      ],
    },
    {
      title: 'Healthcare Benefits Navigator',
      description: 'Interactive healthcare plan explorer with natural language search and RAG-powered contextual answers over 50,000+ plan records.',
      tech: ['Python', 'SQL', 'FAISS', 'Streamlit', 'RAG', 'Data Validation'],
      highlights: [
        'Built data pipelines across 50,000+ healthcare plan records with validation layers that caught quality issues at ingestion',
        'Deployed as an interactive Streamlit application for real-time plan exploration and comparison',
        'Ran multiple rounds of usability testing, reaching 89% user satisfaction and informing schema and validation improvements across iterations',
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

export const skills = {
  'AI & LLMs':            { items: ['LLMs', 'RAG', 'MCP', 'Prompt Engineering', 'Agent Orchestration', 'LLM Evaluation', 'Microsoft Copilot Studio', 'LangGraph', 'FAISS', 'Mistral', 'LoRA', 'QLoRA'], color: 'from-fuchsia-500 to-violet-600' },
  'Machine Learning':     { items: ['Supervised & Unsupervised Learning', 'Classification', 'NLP', 'Transformers', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Feature Engineering', 'Model Evaluation', 'LLAMA 2 Fine-Tuning'], color: 'from-violet-500 to-purple-700' },
  'Programming':          { items: ['Python', 'SQL', 'R', 'JavaScript'], color: 'from-violet-500 to-violet-700' },
  'Data Engineering':     { items: ['ETL/ELT Pipelines', 'Snowflake', 'Databricks', 'dbt', 'Microsoft Fabric', 'Airflow', 'Prefect', 'Alteryx', 'Data Modeling', 'Data Governance'], color: 'from-cyan-500 to-cyan-700' },
  'Data Analysis':        { items: ['Statistical Testing', 'A/B Testing', 'Regression Analysis', 'Pandas', 'NumPy', 'Advanced Excel'], color: 'from-cyan-400 to-violet-500' },
  'Visualization & BI':   { items: ['Power BI', 'Tableau', 'Looker', 'Spotfire', 'DAX', 'Seaborn', 'Matplotlib', 'Plotly'], color: 'from-violet-400 to-purple-600' },
  'Cloud & DevOps':       { items: ['AWS', 'GCP', 'Azure', 'Docker', 'CI/CD', 'GitHub Actions'], color: 'from-sky-400 to-cyan-600' },
  'AI Dev Tools':         { items: ['Claude Code', 'Cursor', 'GitHub Copilot', 'ChatGPT'], color: 'from-amber-400 to-orange-600' },
};

export const certifications = [
    { title: 'Snowflake Data Warehousing Badge', issuer: 'Snowflake' },
    { title: 'AstraZeneca Thriving in AI Programme 2025', issuer: 'AstraZeneca · Platinum' },
    { title: 'Alteryx Machine Learning Micro-Credential', issuer: 'Alteryx' },
    { title: 'Oracle Cloud Infrastructure 2024 Generative AI Professional', issuer: 'Oracle' },
    { title: 'AICTE AWS Data Analytics Virtual Internship', issuer: 'AWS / AICTE' },
    { title: 'Autism Spectrum Disorder Detection using Deep Learning', issuer: 'IJNRD · Research Publication' },
    { title: 'Data Transformation with Spark SQL in Databricks', issuer: 'Databricks' },
  ];

export const impactStats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '6+', label: 'Certifications' },
    { value: 'F500', label: 'Clients Served' },
  ];


export const experienceNotes = {
  'Humanitarians AI': 'Building RL environments that simulate autoimmune disease progression for healthcare AI research. Designing agent benchmarking frameworks, agentic workflows on an internal platform, and technical case studies that communicate experimental findings.',
  'Alexion Pharmaceuticals, AstraZeneca': 'Worked across finance, operations, regulatory, risk and governance for a rare-disease portfolio. Created trusted reporting, improved data-quality workflows and explored practical AI agents in an enterprise setting.',
  'Saxbys Cafe, Northeastern University': 'Led daily operations, coached teammates, supported scheduling and hiring, and learned how to make effective decisions under pressure.',
  'Northeastern University': 'Supported graduate students through teaching, experimental design, Python, R and statistical analysis, including work involving eye-tracking and cognitive styles.',
  'Turingminds.ai': 'Worked on applied analytics and machine learning, improving healthcare classification accuracy through feature engineering and evaluation.'
};
export const conceptImages = {
  'Humanitarians AI': 'humanitarians.jpg',
  'Alexion Pharmaceuticals, AstraZeneca': 'astrazeneca.jpg',
  'Saxbys Cafe, Northeastern University': 'saxbys.jpg',
  'Northeastern University': 'northeastern.jpg',
  'Turingminds.ai': 'turingminds.jpg'
};

