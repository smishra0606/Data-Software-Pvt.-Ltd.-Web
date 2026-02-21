
import { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "web-dev-101",
    title: "Web Development Fundamentals",
    description: "Master the core fundamentals of modern web development with HTML, CSS, and JavaScript to build responsive websites.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    price: 79.99,
    originalPrice: 99.99,
    duration: "16 hours",
    rating: 4.8,
    studentsEnrolled: 4325,
    featured: true,
    lessons: 42,
    modules: 8,
    lastUpdated: "June 2023",
    instructor: {
      name: "David Wilson",
      title: "Senior Frontend Developer",
      bio: "David has 10+ years of experience in web development and has worked with companies like Google and Amazon. He's passionate about teaching web technologies in a practical, project-based approach.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    learningOutcomes: [
      "Build responsive websites using HTML5 and CSS3",
      "Understand JavaScript fundamentals and DOM manipulation",
      "Implement modern CSS layouts with Flexbox and Grid",
      "Create interactive web elements with JavaScript",
      "Optimize websites for performance and accessibility",
      "Deploy your projects to the web"
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lessons: [
          { title: "Course Overview", duration: "10 min" },
          { title: "Setting Up Your Development Environment", duration: "20 min" },
          { title: "Understanding the Web Development Ecosystem", duration: "15 min" }
        ]
      },
      {
        title: "HTML Foundations",
        lessons: [
          { title: "HTML Document Structure", duration: "25 min" },
          { title: "Essential HTML Elements", duration: "30 min" },
          { title: "Semantic HTML and Accessibility", duration: "35 min" },
          { title: "Forms and Input Elements", duration: "40 min" }
        ]
      },
      {
        title: "CSS Styling",
        lessons: [
          { title: "CSS Selectors and Properties", duration: "30 min" },
          { title: "The Box Model", duration: "25 min" },
          { title: "Flexbox Layout", duration: "45 min" },
          { title: "CSS Grid Layout", duration: "45 min" },
          { title: "Responsive Design and Media Queries", duration: "40 min" }
        ]
      },
      {
        title: "JavaScript Basics",
        lessons: [
          { title: "Variables, Data Types, and Operators", duration: "35 min" },
          { title: "Control Flow: Conditionals and Loops", duration: "40 min" },
          { title: "Functions and Scope", duration: "35 min" },
          { title: "DOM Manipulation", duration: "50 min" },
          { title: "Events and Event Handling", duration: "45 min" }
        ]
      }
    ]
  },
  {
    id: "react-masterclass",
    title: "React.js Masterclass: Build Modern Web Applications",
    description: "Learn React from the ground up and build complex, scalable frontend applications with the most popular JavaScript library.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    price: 89.99,
    duration: "20 hours",
    rating: 4.9,
    studentsEnrolled: 3182,
    featured: true,
    lessons: 55,
    modules: 9,
    lastUpdated: "September 2023",
    instructor: {
      name: "Sarah Johnson",
      title: "React Developer & Educator",
      bio: "Sarah specializes in React development and has taught over 50,000 students online. She previously worked as a lead frontend developer at Facebook and now focuses on creating educational content.",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    learningOutcomes: [
      "Understand React core concepts: components, props, and state",
      "Implement hooks for state management and side effects",
      "Create complex UIs with React's component architecture",
      "Build single-page applications with React Router",
      "Manage application state with Context API and Redux",
      "Implement authentication flows in React applications",
      "Deploy your React applications to production"
    ],
    curriculum: [
      {
        title: "React Fundamentals",
        lessons: [
          { title: "Introduction to React", duration: "20 min" },
          { title: "Setting Up a React Project", duration: "25 min" },
          { title: "Components and JSX", duration: "35 min" },
          { title: "Props and Component Communication", duration: "40 min" },
          { title: "State and Events", duration: "45 min" }
        ]
      },
      {
        title: "React Hooks",
        lessons: [
          { title: "Introduction to Hooks", duration: "30 min" },
          { title: "useState Hook", duration: "40 min" },
          { title: "useEffect Hook", duration: "45 min" },
          { title: "Custom Hooks", duration: "50 min" },
          { title: "Other Built-in Hooks", duration: "35 min" }
        ]
      },
      {
        title: "Building Real Applications",
        lessons: [
          { title: "Project Structure and Best Practices", duration: "30 min" },
          { title: "Styling in React Applications", duration: "35 min" },
          { title: "Forms and Form Validation", duration: "45 min" },
          { title: "HTTP Requests and API Integration", duration: "50 min" },
          { title: "Error Handling", duration: "35 min" }
        ]
      }
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design: Create Beautiful User Experiences",
    description: "Learn the principles of UI/UX design and create intuitive, attractive interfaces that users will love.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    category: "UI/UX Design",
    price: 69.99,
    originalPrice: 99.99,
    duration: "14 hours",
    rating: 4.7,
    studentsEnrolled: 2415,
    featured: false,
    lessons: 38,
    modules: 7,
    lastUpdated: "August 2023",
    instructor: {
      name: "Michael Rodriguez",
      title: "Senior Product Designer",
      bio: "Michael has over 8 years of experience in product design, working with startups and enterprise companies to create intuitive and delightful user experiences. He has a passion for teaching design thinking and user-centered methodologies.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    learningOutcomes: [
      "Understand the foundations of UI/UX design",
      "Create wireframes and prototypes for web and mobile apps",
      "Conduct user research and usability testing",
      "Design intuitive navigation and information architecture",
      "Create consistent design systems and style guides",
      "Use industry-standard design tools effectively"
    ],
    curriculum: [
      {
        title: "Design Fundamentals",
        lessons: [
          { title: "Introduction to UI/UX Design", duration: "25 min" },
          { title: "Design Thinking Process", duration: "30 min" },
          { title: "User Research Methods", duration: "40 min" },
          { title: "Design Principles and Elements", duration: "35 min" }
        ]
      },
      {
        title: "Wireframing and Prototyping",
        lessons: [
          { title: "Creating Wireframes", duration: "45 min" },
          { title: "Information Architecture", duration: "35 min" },
          { title: "Interactive Prototyping", duration: "50 min" },
          { title: "User Flow Mapping", duration: "40 min" }
        ]
      },
      {
        title: "Visual Design",
        lessons: [
          { title: "Color Theory for Digital Interfaces", duration: "35 min" },
          { title: "Typography in UI Design", duration: "30 min" },
          { title: "Creating Visual Hierarchy", duration: "40 min" },
          { title: "Design Systems and Style Guides", duration: "45 min" }
        ]
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    description: "Master modern digital marketing strategies to grow businesses online through SEO, social media, content marketing, and paid advertising.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    category: "Marketing",
    price: 74.99,
    duration: "15 hours",
    rating: 4.6,
    studentsEnrolled: 1876,
    featured: false,
    lessons: 35,
    modules: 6,
    lastUpdated: "October 2023",
    instructor: {
      name: "Emma Thompson",
      title: "Digital Marketing Consultant",
      bio: "Emma has helped over 100 businesses improve their online presence and increase conversions. With a background in both agency and in-house marketing roles, she brings practical expertise to her teaching.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    learningOutcomes: [
      "Create effective digital marketing strategies",
      "Implement SEO techniques to improve website ranking",
      "Build engaging social media campaigns",
      "Develop content marketing plans that convert",
      "Set up and optimize paid advertising campaigns",
      "Analyze marketing metrics and ROI"
    ],
    curriculum: [
      {
        title: "Digital Marketing Foundations",
        lessons: [
          { title: "The Digital Marketing Landscape", duration: "30 min" },
          { title: "Setting Marketing Goals and KPIs", duration: "35 min" },
          { title: "Understanding Your Target Audience", duration: "40 min" },
          { title: "Building a Marketing Strategy", duration: "45 min" }
        ]
      },
      {
        title: "Search Engine Optimization",
        lessons: [
          { title: "SEO Fundamentals", duration: "40 min" },
          { title: "Keyword Research", duration: "35 min" },
          { title: "On-Page SEO Techniques", duration: "45 min" },
          { title: "Link Building Strategies", duration: "40 min" },
          { title: "Technical SEO", duration: "50 min" }
        ]
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { title: "Social Media Strategy", duration: "35 min" },
          { title: "Content Creation for Social Media", duration: "40 min" },
          { title: "Community Management", duration: "30 min" },
          { title: "Social Media Advertising", duration: "45 min" }
        ]
      }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design for Beginners",
    description: "Learn the fundamentals of graphic design and develop skills in composition, typography, color theory, and digital design tools.",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
    category: "Design",
    price: 59.99,
    duration: "12 hours",
    rating: 4.5,
    studentsEnrolled: 2103,
    featured: false,
    lessons: 30,
    modules: 5,
    lastUpdated: "July 2023",
    instructor: {
      name: "Laura Chen",
      title: "Graphic Designer & Illustrator",
      bio: "Laura has worked as a professional graphic designer for over 7 years, with clients including major publishers and retail brands. She specializes in branding, typography, and digital illustration.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    learningOutcomes: [
      "Understand fundamental graphic design principles",
      "Create effective visual compositions",
      "Use typography effectively in designs",
      "Apply color theory to enhance visual communication",
      "Work efficiently with industry-standard design tools",
      "Develop a beginner design portfolio"
    ],
    curriculum: [
      {
        title: "Design Principles",
        lessons: [
          { title: "Introduction to Graphic Design", duration: "25 min" },
          { title: "Elements of Design", duration: "35 min" },
          { title: "Principles of Composition", duration: "40 min" },
          { title: "Design Thinking Process", duration: "30 min" }
        ]
      },
      {
        title: "Typography",
        lessons: [
          { title: "Typography Basics", duration: "35 min" },
          { title: "Typeface Classification", duration: "30 min" },
          { title: "Type Hierarchy and Composition", duration: "40 min" },
          { title: "Typography in Digital Design", duration: "35 min" }
        ]
      },
      {
        title: "Color Theory",
        lessons: [
          { title: "Color Fundamentals", duration: "30 min" },
          { title: "Color Harmony and Schemes", duration: "35 min" },
          { title: "Color Psychology", duration: "25 min" },
          { title: "Working with Color in Digital Design", duration: "40 min" }
        ]
      }
    ]
  },
  {
    id: "data-science-basics",
    title: "Introduction to Data Science",
    description: "Get started with data science fundamentals including statistics, Python programming, data visualization, and basic machine learning concepts.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    category: "Data Science",
    price: 84.99,
    originalPrice: 109.99,
    duration: "18 hours",
    rating: 4.7,
    studentsEnrolled: 1568,
    featured: false,
    lessons: 45,
    modules: 8,
    lastUpdated: "November 2023",
    instructor: {
      name: "Robert Kim",
      title: "Data Scientist & AI Researcher",
      bio: "Robert holds a PhD in Computer Science and has worked as a data scientist at leading tech companies. He specializes in machine learning and has published several research papers on AI applications.",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    learningOutcomes: [
      "Understand data science fundamentals and workflow",
      "Program in Python for data analysis",
      "Clean and preprocess data effectively",
      "Create insightful data visualizations",
      "Apply statistical methods to analyze data",
      "Build and evaluate basic machine learning models",
      "Communicate data insights effectively"
    ],
    curriculum: [
      {
        title: "Data Science Foundations",
        lessons: [
          { title: "Introduction to Data Science", duration: "30 min" },
          { title: "The Data Science Process", duration: "35 min" },
          { title: "Types of Data and Data Sources", duration: "40 min" },
          { title: "Ethical Considerations in Data Science", duration: "25 min" }
        ]
      },
      {
        title: "Python for Data Analysis",
        lessons: [
          { title: "Python Basics for Data Science", duration: "45 min" },
          { title: "Working with NumPy", duration: "50 min" },
          { title: "Data Manipulation with Pandas", duration: "55 min" },
          { title: "Data Cleaning and Preprocessing", duration: "50 min" }
        ]
      },
      {
        title: "Data Visualization",
        lessons: [
          { title: "Visualization Principles", duration: "30 min" },
          { title: "Creating Visualizations with Matplotlib", duration: "45 min" },
          { title: "Interactive Visualizations with Plotly", duration: "40 min" },
          { title: "Telling Stories with Data", duration: "35 min" }
        ]
      },
      {
        title: "Introduction to Machine Learning",
        lessons: [
          { title: "Machine Learning Concepts", duration: "40 min" },
          { title: "Supervised vs. Unsupervised Learning", duration: "35 min" },
          { title: "Building Your First ML Model", duration: "55 min" },
          { title: "Model Evaluation and Validation", duration: "50 min" }
        ]
      }
    ]
  }
];
