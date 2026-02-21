import {
  Atom,
  BarChart,
  Book,
  BrainCircuit,
  BriefcaseBusiness,
  Car,
  CircleUser,
  Cloud,
  Code,
  Cpu,
  CurlyBraces,
  HeartPulse,
  Leaf,
  LucideBarChart,
  LucideBook,
  LucideBrain,
  LucideBriefcase,
  LucideCar,
  LucideCloud,
  LucideCode,
  LucideCpu,
  LucideCurlyBraces,
  LucideHeart,
  LucideLeaf,
  LucidePenTool,
  LucideShield,
  LucideShoppingCart,
  LucideWifi,
  Monitor,
  Palette,
  PenTool,
  Search,
  Shield,
  ShoppingCart,
  Signal,
  SmartphoneNfc,
} from "lucide-react";

const testimonials = [
  {
    content:
      "DSPL completely elevated our online presence. Their innovative design and development approach truly reflect the essence of our brand.",
    author: "Priya Mehra",
    position: "CEO, BharatTech Solutions",
    avatar: <CircleUser className="h-10 w-10" />,
  },
  {
    content:
      "DSPL helped us a lot. Really good experience overall. Happy with the outcome.",
    author: "Karan Singh",
    position: "Manager, LocalBiz",
    avatar: <CircleUser className="h-10 w-10" />,
  },
  {
    content:
      "The team was very helpful and did what we needed. Everything went smoothly.",
    author: "Divya Nair",
    position: "Freelancer",
    avatar: <CircleUser className="h-10 w-10" />,
  },
];


// Featured projects data
const featuredProjects = [
  {
    title: "E-commerce",
    category: "E-commerce",
    tags: ["Sustainability", "Shopping", "Green"],
    imageUrl: "../../zipper.jpeg",
    description:
      "An e-commerce platform specializing in eco-friendly products with carbon footprint tracking.",
    client: "EcoShop Global",
    year: "2020",
    link: "https://zippernow.in",
  },

  {
    title: "Quantum Finance Dashboard",
    category: "Web Development",
    tags: ["Web App", "Dashboard", "Finance"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "A comprehensive financial dashboard with AI-powered insights and predictive analytics.",
    client: "FinTech Solutions Inc.",
    year: "2023",
  },
  {
    title: "Pulse Health App",
    category: "Mobile",
    tags: ["Health", "Fitness", "iOS/Android"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "A health tracking mobile app with personalized insights and wellness recommendations.",
    client: "Vitality Health Group",
    year: "2022",
  },
  {
    title: "Artisan E-commerce",
    category: "E-commerce",
    tags: ["Shopping", "Marketplace", "Payments"],
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "A curated marketplace connecting artisans with customers seeking handcrafted products.",
    client: "Artisan Collective",
    year: "2022",
  },

  {
    title: "Harmony Music Platform",
    category: "UI/UX Design",
    tags: ["Music", "Streaming", "Entertainment"],
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "Intuitive user experience design for a next-generation music streaming platform.",
    client: "Harmony Entertainment",
    year: "2021",
  },
  {
    title: "Cityscape Real Estate",
    category: "Web Development",
    tags: ["Real Estate", "Property Search", "Maps"],
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "An interactive property search platform with advanced filtering and 3D virtual tours.",
    client: "Cityscape Properties",
    year: "2021",
  },
  {
    title: "Gourmet Delivery",
    category: "UI/UX Design",
    tags: ["Food", "Delivery", "Mobile"],
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "User experience redesign for a premium food delivery service, resulting in 40% increased conversion.",
    client: "Gourmet Express",
    year: "2020",
  },

  {
    title: "Lumina Cosmetics",
    category: "Branding",
    tags: ["Beauty", "Packaging", "Identity"],
    imageUrl:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "Complete brand identity and packaging design for a luxury clean beauty brand.",
    client: "Lumina Beauty Inc.",
    year: "2020",
  },
  {
    title: "Portfolio Pro",
    category: "Web Development",
    tags: ["Creative", "Portfolio", "Showcase"],
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80",
    description:
      "A versatile portfolio platform for creative professionals with customizable templates.",
    client: "Creative Network",
    year: "2019",
  },
];
const services = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "UI/UX Design",
    description:
      "We create intuitive, user-centered designs that enhance user experience and drive engagement.",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Web Development",
    description:
      "Our websites are pixel-perfect, responsive, and optimized for performance and conversions.",
  },
  {
    icon: <SmartphoneNfc className="h-6 w-6" />,
    title: "Mobile Applications",
    description:
      "We build cross-platform and native mobile apps that deliver exceptional user experiences.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "AI Integration",
    description:
      "Enhance your products with cutting-edge AI capabilities and intelligent automation.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Digital Marketing",
    description:
      "Data-driven strategies to increase your visibility, traffic, and customer acquisition.",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Brand Strategy",
    description:
      "We help businesses build meaningful brands that resonate with their target audience.",
  },
];

// Client logos
const clients = [
  {
    name: "Company 1",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=CodeTexa",
  },
  {
    name: "Company 2",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=Uderay",
  },
  {
    name: "Company 3",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=Github",
  },
  {
    name: "Company 4",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=Google",
  },
  {
    name: "Company 5",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=Vite",
  },
  {
    name: "Company 6",
    logo: "https://placehold.co/200x80/f5f5f5/333333?text=Vercel",
  },
];

// Stats data
const stats = [
  { label: "Years of experience", value: "5+" },
  { label: "Completed projects", value: "50+" },
  { label: "Happy clients", value: "40+" },
  { label: "Team members", value: "25+" },
];

const features = [
  {
    id: "metaverse",
    title: "Metaverse & AR/VR Solutions",
    description: "Step into the future with immersive virtual experiences.",
    longDescription:
      "Transform interactions, work, and entertainment with cutting-edge AR/VR and Metaverse solutions. From immersive training to virtual storefronts, we craft 3D experiences that redefine engagement.",
    benefits: [
      "Immersive VR training and simulations",
      "Realistic 3D modeling and digital twins",
      "Enhanced brand experiences in the Metaverse",
      "Next-gen gaming and interactive storytelling",
    ],
    steps: [
      "Concept development & 3D modeling",
      "Immersive environment design",
      "AI-driven interactivity implementation",
      "Launch & user engagement optimization",
    ],
    image: "https://source.unsplash.com/featured/?vr,metaverse",
    gallery: [
      "https://source.unsplash.com/featured/?ar",
      "https://source.unsplash.com/featured/?vrgaming",
      "https://source.unsplash.com/featured/?3dmodeling",
    ],
    icon: <LucideCurlyBraces />,
    process: [
      {
        title: "Planning",
        description: "Understanding business needs & goals",
      },
      { title: "Design", description: "Creating immersive 3D environments" },
      { title: "Development", description: "Building AR/VR applications" },
      { title: "Testing", description: "Ensuring seamless user experience" },
      { title: "Deployment", description: "Launching for maximum impact" },
    ],
  },
  {
    id: "green-tech",
    title: "Green Tech & Sustainable IT",
    description: "Innovating for a greener and more sustainable future.",
    longDescription:
      "Leverage AI-driven technology to optimize energy efficiency and track carbon footprints. Our Green Tech solutions help businesses reduce waste and embrace sustainability.",
    benefits: [
      "AI-powered energy efficiency solutions",
      "Real-time carbon tracking and analytics",
      "Sustainable IT strategies for eco-conscious businesses",
      "Reduced operational costs through smart automation",
    ],
    steps: [
      "Energy consumption analysis",
      "AI-powered optimization modeling",
      "Implementation of green IT solutions",
      "Continuous monitoring & reporting",
    ],
    image: "https://source.unsplash.com/featured/?green,technology",
    gallery: [
      "https://source.unsplash.com/featured/?sustainability",
      "https://source.unsplash.com/featured/?eco-tech",
      "https://source.unsplash.com/featured/?clean-energy",
    ],
    icon: <LucideLeaf />,
    process: [
      { title: "Audit", description: "Assessing current energy usage" },
      {
        title: "Optimization",
        description: "Identifying efficiency opportunities",
      },
      {
        title: "Integration",
        description: "Implementing AI-powered solutions",
      },
      {
        title: "Monitoring",
        description: "Tracking and optimizing energy consumption",
      },
      {
        title: "Reporting",
        description: "Ensuring compliance and improvements",
      },
    ],
  },
  {
    id: "quantum",
    title: "Quantum Computing Services",
    description: "Revolutionizing computing with quantum power.",
    longDescription:
      "Unlock quantum computing for advanced cryptography, optimization, and problem-solving. Our solutions push computational limits to drive innovation and efficiency.",
    benefits: [
      "Quantum-safe cryptography for future security",
      "High-speed data processing and simulations",
      "Optimization solutions for logistics & finance",
      "Machine learning acceleration using quantum power",
    ],
    steps: [
      "Identifying quantum use cases",
      "Developing quantum algorithms",
      "Integration with existing systems",
      "Scaling for enterprise applications",
    ],
    image: "https://source.unsplash.com/featured/?quantum,computing",
    gallery: [
      "https://source.unsplash.com/featured/?quantum",
      "https://source.unsplash.com/featured/?supercomputer",
      "https://source.unsplash.com/featured/?data-security",
    ],
    icon: <LucideBrain />,
    process: [
      {
        title: "Assessment",
        description: "Understanding quantum computing needs",
      },
      { title: "Development", description: "Building quantum algorithms" },
      { title: "Integration", description: "Applying quantum solutions" },
      { title: "Testing", description: "Ensuring security & performance" },
      { title: "Optimization", description: "Scaling for enterprise use" },
    ],
  },
  {
    id: "5g",
    title: "5G & Edge Computing Solutions",
    description: "Ultra-fast connectivity for the digital future.",
    longDescription:
      "Leverage 5G and edge computing to accelerate data processing, reduce latency, and unlock new possibilities in IoT, AI, and smart infrastructure.",
    benefits: [
      "Real-time data processing at the edge",
      "Reduced network latency for seamless performance",
      "Enhanced security and localized computing",
      "Optimized connectivity for IoT and smart cities",
    ],
    steps: [
      "Infrastructure assessment",
      "5G and edge strategy planning",
      "Integration of next-gen networking",
      "Optimization for high-performance computing",
    ],
    image: "https://source.unsplash.com/featured/?5g,technology",
    gallery: [
      "https://source.unsplash.com/featured/?edgecomputing",
      "https://source.unsplash.com/featured/?networking",
      "https://source.unsplash.com/featured/?iot",
    ],
    icon: <LucideWifi />,
    process: [
      {
        title: "Planning",
        description: "Identifying 5G & edge computing needs",
      },
      { title: "Integration", description: "Deploying high-speed networks" },
      { title: "Optimization", description: "Enhancing speed and security" },
      { title: "Testing", description: "Ensuring seamless connectivity" },
      { title: "Scaling", description: "Expanding network coverage" },
    ],
  },
  {
    id: "ai-healthcare",
    title: "AI-Powered Healthcare & MedTech",
    description: "Revolutionizing healthcare with AI-driven innovations.",
    longDescription:
      "From smart diagnostics to robotic surgeries, our AI-powered healthcare solutions enhance patient care, automate processes, and improve medical outcomes.",
    benefits: [
      "AI-driven disease diagnosis & predictive analytics",
      "Robotic surgery and automation in medical procedures",
      "Smart wearable health monitoring devices",
      "Secure digital health records powered by AI",
    ],
    steps: [
      "Medical data collection & analysis",
      "AI model training for diagnostics",
      "Integration into healthcare systems",
      "Continuous monitoring & improvement",
    ],
    image: "https://source.unsplash.com/featured/?healthcare,technology",
    gallery: [
      "https://source.unsplash.com/featured/?medtech",
      "https://source.unsplash.com/featured/?robotics,health",
      "https://source.unsplash.com/featured/?digitalhealth",
    ],
    icon: <LucideHeart />,
    process: [
      {
        title: "Research",
        description: "Identifying key healthcare challenges",
      },
      { title: "Development", description: "Creating AI-driven solutions" },
      {
        title: "Implementation",
        description: "Integrating AI into medical systems",
      },
      { title: "Testing", description: "Ensuring compliance & accuracy" },
      {
        title: "Optimization",
        description: "Enhancing AI performance over time",
      },
    ],
  },
  // Add the remaining 10 services following the same structure
  {
    id: "autonomous-vehicles",
    title: "Autonomous Vehicles & Smart Mobility",
    description: "Driving the future with AI-powered mobility solutions.",
    longDescription:
      "From self-driving cars to intelligent traffic systems, our AI-driven smart mobility solutions are transforming transportation, making it safer, smarter, and more efficient.",
    benefits: [
      "AI-powered autonomous vehicle technology",
      "Real-time traffic and route optimization",
      "Enhanced safety through smart sensors & automation",
      "Fleet management with predictive maintenance",
    ],
    steps: [
      "Data collection & AI model training",
      "Integration with smart traffic infrastructure",
      "Testing & safety validation",
      "Deployment & continuous AI improvements",
    ],
    image: "https://source.unsplash.com/featured/?autonomous,vehicle",
    gallery: [
      "https://source.unsplash.com/featured/?smartcar",
      "https://source.unsplash.com/featured/?ai-transport",
      "https://source.unsplash.com/featured/?selfdriving",
    ],
    icon: <LucideCar />,
    process: [
      { title: "Research", description: "Identifying smart mobility needs" },
      { title: "Development", description: "Building AI-powered solutions" },
      { title: "Testing", description: "Ensuring safety & reliability" },
      {
        title: "Integration",
        description: "Connecting with smart infrastructure",
      },
      { title: "Scaling", description: "Expanding autonomous capabilities" },
    ],
  },
  {
    id: "data-science",
    title: "Data Science & AI Solutions",
    description: "Transforming data into actionable insights with AI.",
    longDescription:
      "Leverage data-driven decision-making with AI-powered analytics, machine learning models, and predictive insights that optimize business strategies and operations.",
    benefits: [
      "AI-powered predictive analytics",
      "Advanced data visualization & reporting",
      "Machine learning models for automation",
      "Big data processing for enhanced decision-making",
    ],
    steps: [
      "Data collection & preprocessing",
      "AI model development & training",
      "Integration with business workflows",
      "Real-time analytics & optimization",
    ],
    image: "https://source.unsplash.com/featured/?data,science",
    gallery: [
      "https://source.unsplash.com/featured/?bigdata",
      "https://source.unsplash.com/featured/?ai-analysis",
      "https://source.unsplash.com/featured/?machinelearning",
    ],
    icon: <LucideBarChart />,
    process: [
      { title: "Analysis", description: "Understanding data challenges" },
      { title: "Development", description: "Building AI-driven models" },
      { title: "Testing", description: "Ensuring accuracy & reliability" },
      { title: "Integration", description: "Embedding into workflows" },
      { title: "Monitoring", description: "Continuous optimization" },
    ],
  },
  {
    id: "software",
    title: "Software Development",
    description: "Building powerful, scalable, and secure software solutions.",
    longDescription:
      "From web applications to enterprise software, we develop custom solutions tailored to your needs, leveraging the latest technologies and agile methodologies.",
    benefits: [
      "Custom software development tailored to business needs",
      "Scalable & secure cloud-based applications",
      "Agile development for fast & flexible deployment",
      "Integration with existing business systems",
    ],
    steps: [
      "Requirement gathering & analysis",
      "UI/UX design & prototyping",
      "Development & testing",
      "Deployment & ongoing support",
    ],
    image: "https://source.unsplash.com/featured/?software,development",
    gallery: [
      "https://source.unsplash.com/featured/?coding",
      "https://source.unsplash.com/featured/?programming",
      "https://source.unsplash.com/featured/?webapp",
    ],
    icon: <LucideCode />,
    process: [
      { title: "Planning", description: "Understanding business goals" },
      { title: "Design", description: "Creating intuitive UI/UX" },
      { title: "Development", description: "Building scalable applications" },
      { title: "Testing", description: "Ensuring security & performance" },
      { title: "Deployment", description: "Launching & maintaining solutions" },
    ],
  },
  {
    id: "robotics-iot",
    title: "Robotics & IoT Solutions",
    description: "Connecting the physical and digital worlds with smart tech.",
    longDescription:
      "Revolutionizing industries with IoT-powered automation, smart devices, and AI-driven robotics for enhanced productivity and operational efficiency.",
    benefits: [
      "Smart IoT sensors & automation",
      "AI-powered robotics for industrial & service applications",
      "Real-time monitoring & predictive maintenance",
      "Seamless integration with cloud & enterprise systems",
    ],
    steps: [
      "Defining IoT & robotics use cases",
      "Developing smart automation solutions",
      "Integrating with cloud & AI systems",
      "Deployment & performance optimization",
    ],
    image: "https://source.unsplash.com/featured/?robotics,IOT",
    gallery: [
      "https://source.unsplash.com/featured/?smartdevices",
      "https://source.unsplash.com/featured/?industrialrobot",
      "https://source.unsplash.com/featured/?automation",
    ],
    icon: <LucideCpu />,
    process: [
      { title: "Research", description: "Analyzing automation requirements" },
      { title: "Development", description: "Building smart IoT solutions" },
      { title: "Integration", description: "Connecting with AI & cloud" },
      { title: "Testing", description: "Ensuring efficiency & safety" },
      { title: "Scaling", description: "Expanding for industry-wide impact" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Blockchain Solutions",
    description: "Fortifying digital assets with cutting-edge security.",
    longDescription:
      "Protect your data, transactions, and digital assets with robust cybersecurity and blockchain solutions, ensuring security, transparency, and trust in every interaction.",
    benefits: [
      "Advanced threat detection & cybersecurity solutions",
      "Blockchain-powered decentralized security",
      "End-to-end encryption & identity protection",
      "Compliance with global security standards",
    ],
    steps: [
      "Security assessment & risk analysis",
      "Implementation of AI-powered threat detection",
      "Blockchain integration for secure transactions",
      "Continuous monitoring & compliance assurance",
    ],
    image: "https://source.unsplash.com/featured/?cybersecurity,blockchain",
    gallery: [
      "https://source.unsplash.com/featured/?hacker",
      "https://source.unsplash.com/featured/?blockchainsecurity",
      "https://source.unsplash.com/featured/?digitalprivacy",
    ],
    icon: <LucideShield />,
    process: [
      { title: "Assessment", description: "Identifying vulnerabilities" },
      { title: "Development", description: "Implementing security solutions" },
      { title: "Testing", description: "Ensuring compliance & resilience" },
      { title: "Integration", description: "Securing networks & transactions" },
      { title: "Monitoring", description: "Real-time threat detection" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud Computing & DevOps",
    description: "Seamless cloud solutions for scalable and agile operations.",
    longDescription:
      "Empower your business with cloud infrastructure, DevOps automation, and scalable architectures. We optimize cloud computing to enhance efficiency, security, and performance.",
    benefits: [
      "Cloud migration & infrastructure optimization",
      "DevOps automation for rapid deployment",
      "Enhanced scalability and cost-efficiency",
      "Secure cloud-native applications",
    ],
    steps: [
      "Cloud strategy & architecture design",
      "Infrastructure deployment & automation",
      "CI/CD pipeline implementation",
      "Performance monitoring & security enhancement",
    ],
    image: "https://source.unsplash.com/featured/?cloudcomputing,devops",
    gallery: [
      "https://source.unsplash.com/featured/?cloudtechnology",
      "https://source.unsplash.com/featured/?devops",
      "https://source.unsplash.com/featured/?server",
    ],
    icon: <LucideCloud />,
    process: [
      { title: "Assessment", description: "Evaluating cloud readiness" },
      { title: "Migration", description: "Seamless transition to the cloud" },
      {
        title: "Optimization",
        description: "Enhancing performance & cost-efficiency",
      },
      { title: "Security", description: "Implementing robust cloud security" },
      {
        title: "Automation",
        description: "Streamlining workflows with DevOps",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "Quick Commerce & E-Commerce Solutions",
    description: "Accelerate online sales with next-gen e-commerce solutions.",
    longDescription:
      "We build high-performance e-commerce platforms, enabling seamless shopping experiences, AI-driven recommendations, and quick commerce logistics for fast deliveries.",
    benefits: [
      "AI-powered product recommendations",
      "Seamless checkout & payment integration",
      "Quick commerce logistics & automation",
      "Omnichannel e-commerce experience",
    ],
    steps: [
      "Market research & e-commerce strategy",
      "Custom platform development",
      "AI integration for smart recommendations",
      "Launch, marketing, & performance optimization",
    ],
    image: "https://source.unsplash.com/featured/?ecommerce,shopping",
    gallery: [
      "https://source.unsplash.com/featured/?online-shopping",
      "https://source.unsplash.com/featured/?checkout",
      "https://source.unsplash.com/featured/?commerce",
    ],
    icon: <LucideShoppingCart />,
    process: [
      { title: "Planning", description: "Defining e-commerce objectives" },
      { title: "Development", description: "Building a robust online store" },
      { title: "Integration", description: "Connecting payment & logistics" },
      { title: "Marketing", description: "Driving traffic and conversions" },
      { title: "Optimization", description: "Enhancing performance & UX" },
    ],
  },
  {
    id: "startup",
    title: "Startup & Business Solutions",
    description: "Helping startups scale and businesses thrive.",
    longDescription:
      "From idea validation to full-scale operations, we empower startups and businesses with technology-driven solutions, funding guidance, and growth strategies.",
    benefits: [
      "End-to-end startup consulting & strategy",
      "MVP development for rapid market entry",
      "Investor-ready business models & funding assistance",
      "Technology solutions to streamline operations",
    ],
    steps: [
      "Idea validation & market research",
      "MVP development & testing",
      "Go-to-market strategy & launch",
      "Scaling & investment growth",
    ],
    image: "https://source.unsplash.com/featured/?startup,business",
    gallery: [
      "https://source.unsplash.com/featured/?entrepreneur",
      "https://source.unsplash.com/featured/?businessgrowth",
      "https://source.unsplash.com/featured/?funding",
    ],
    icon: <LucideBriefcase />,
    process: [
      { title: "Consultation", description: "Defining business goals" },
      { title: "Planning", description: "Developing a strategic roadmap" },
      { title: "Execution", description: "Building scalable business models" },
      { title: "Funding", description: "Connecting with investors" },
      { title: "Scaling", description: "Expanding market reach" },
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX & Graphic Design",
    description: "Creating stunning digital experiences that engage users.",
    longDescription:
      "We craft intuitive UI/UX designs and visually appealing graphics to enhance brand identity, improve user experience, and boost digital engagement.",
    benefits: [
      "User-centric UI/UX design",
      "Brand identity and creative design",
      "Prototyping and wireframing",
      "Conversion-optimized interfaces",
    ],
    steps: [
      "User research & experience mapping",
      "Wireframing & prototyping",
      "Visual design & branding",
      "Usability testing & optimization",
    ],
    image: "https://source.unsplash.com/featured/?graphicdesign,uiux",
    gallery: [
      "https://source.unsplash.com/featured/?creativedesign",
      "https://source.unsplash.com/featured/?branding",
      "https://source.unsplash.com/featured/?interface",
    ],
    icon: <LucidePenTool />,
    process: [
      { title: "Research", description: "Understanding user behavior" },
      { title: "Wireframing", description: "Structuring digital experiences" },
      { title: "Design", description: "Crafting visually stunning elements" },
      { title: "Testing", description: "Refining usability & performance" },
      { title: "Launch", description: "Implementing and iterating" },
    ],
  },
  {
    id: "it-consulting",
    title: "IT Consulting & Training",
    description: "Empowering businesses with expert IT guidance & training.",
    longDescription:
      "We provide strategic IT consulting and training programs to help businesses leverage technology, upskill teams, and stay ahead in the digital age.",
    benefits: [
      "Expert IT strategy consulting",
      "Customized corporate training programs",
      "Technology adoption & transformation support",
      "Future-proofing businesses with digital skills",
    ],
    steps: [
      "IT assessment & strategy development",
      "Customized training program design",
      "Implementation & skill-building workshops",
      "Ongoing support & technology updates",
    ],
    image: "https://source.unsplash.com/featured/?ittraining,consulting",
    gallery: [
      "https://source.unsplash.com/featured/?corporatetraining",
      "https://source.unsplash.com/featured/?itconsulting",
      "https://source.unsplash.com/featured/?technologyeducation",
    ],
    icon: <LucideBook />,
    process: [
      { title: "Assessment", description: "Identifying technology gaps" },
      { title: "Planning", description: "Developing a tailored IT strategy" },
      { title: "Training", description: "Upskilling teams & individuals" },
      { title: "Implementation", description: "Integrating IT solutions" },
      { title: "Support", description: "Ensuring continuous growth" },
    ],
  },
];

const serviceRoutes = [
  {
    name: "Metaverse & AR/VR",
    path: "/services#metaverse",
    description: "Immersive VR apps, 3D modeling & digital twins",
    icon: <CurlyBraces className="h-6 w-6 text-amber-500" />,
  },
  {
    name: "Green Tech & Sustainable IT",
    path: "/services#green-tech",
    description: "AI-driven energy efficiency & carbon tracking",
    icon: <Leaf className="h-6 w-6 text-green-500" />,
  },
  {
    name: "Quantum Computing",
    path: "/services#quantum",
    description: "Advanced cryptography & complex problem-solving",
    icon: <Atom className="h-6 w-6 text-purple-500" />,
  },
  {
    name: "5G & Edge Computing",
    path: "/services#5g",
    description: "Ultra-fast connectivity & next-gen networking",
    icon: <Signal className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "AI in Healthcare",
    path: "/services#ai-healthcare",
    description: "Smart diagnostics, robotic surgery & digital health",
    icon: <HeartPulse className="h-6 w-6 text-red-500" />,
  },
  {
    name: "Autonomous Vehicles",
    path: "/services#autonomous-vehicles",
    description: "AI-powered transportation & self-driving tech",
    icon: <Car className="h-6 w-6 text-gray-500" />,
  },
  {
    name: "Data Science & AI",
    path: "/services#data-science",
    description: "Transforming data into actionable insights",
    icon: <BarChart className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "Software Development",
    path: "/services#software",
    description: "Custom software solutions for businesses",
    icon: <Code className="h-6 w-6 text-amber-500" />,
  },
  {
    name: "Robotics & IoT",
    path: "/services#robotics-iot",
    description: "Smart automation & AI-powered robotics",
    icon: <Cpu className="h-6 w-6 text-gray-500" />,
  },
  {
    name: "Cybersecurity & Blockchain",
    path: "/services#cybersecurity",
    description: "Fortifying digital assets with cutting-edge security",
    icon: <Shield className="h-6 w-6 text-red-500" />,
  },
  {
    name: "Cloud Computing & DevOps",
    path: "/services#cloud-devops",
    description: "Scalable cloud solutions & DevOps automation",
    icon: <Cloud className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "Quick Commerce & E-Commerce",
    path: "/services#ecommerce",
    description: "Fast and seamless digital shopping experiences",
    icon: <ShoppingCart className="h-6 w-6 text-amber-500" />,
  },
  {
    name: "Startup & Business Solutions",
    path: "/services#startup",
    description: "Helping startups scale & businesses grow",
    icon: <BriefcaseBusiness className="h-6 w-6 text-green-500" />,
  },
  {
    name: "UI/UX & Graphic Design",
    path: "/services#ui-ux",
    description: "Creating stunning & user-friendly digital experiences",
    icon: <PenTool className="h-6 w-6 text-purple-500" />,
  },
  {
    name: "IT Consulting & Training",
    path: "/services#it-consulting",
    description: "Expert IT guidance & corporate training programs",
    icon: <Book className="h-6 w-6 text-gray-500" />,
  },
];

const projectRoutes = [
  { name: "Case Studies", path: "/projects/case-studies" },
  { name: "Open Source", path: "/projects/open-source" },
  { name: "Client Work", path: "/projects/client-work" },
];
const mainRoutes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Internships", path: "/internships" },
  { name: "Careers", path: "/careers" },
];

export {
  testimonials,
  services,
  clients,
  stats,
  features,
  serviceRoutes,
  projectRoutes,
  mainRoutes,
  featuredProjects,
};
