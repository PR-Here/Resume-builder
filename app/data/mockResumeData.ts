import { ResumeData } from '../store/resumeStore';
import { FontFamily, SkillCategory } from '../types/enums';

export const mockResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Pankaj Rana',
    email: 'ranap8445@gmail.com',
    phone: '+91-8445611760',
    location: 'Gurugram, Haryana, INDIA',
    linkedin: 'https://www.linkedin.com/in/pankaj-rana-b10941153',
    github: 'https://github.com/pr-here',
    website: 'https://pankajrana-portfolio-4ure1lgxr-pankaj-ranas-projects.vercel.app',
    title: 'Senior Software Developer'
  },
  summary: 'Dynamic Senior Software Developer with over 6 years of experience at Programming.com, specializing in React Native and React.js to build high-performance, visually engaging mobile and web applications. Expert in API integration, state management, and performance optimization, with a proven track record of delivering scalable and maintainable solutions across Android, iOS, and web platforms. Known for thriving in collaborative, fast-paced environments, consistently delivering user-centric features while upholding the highest standards of code quality, UI/UX design, and cross-platform consistency. Seasoned React Native Developer with comprehensive experience in building mobile applications using JavaScript and TypeScript. Possess strong skills in developing user interface components, implementing and executing testing suites for software validation, along with proficiency in modern front-end build pipelines and tools. Demonstrated ability to deliver high-quality software solutions, contributing substantially to project success.',
  skills: [
    // Core Technologies
    {
      id: "1",
      name: 'React Native',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "2",
      name: 'React.js',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "3",
      name: 'JavaScript',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "4",
      name: 'TypeScript',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "5",
      name: 'ES 6+',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "6",
      name: 'Function Component',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "7",
      name: 'React Hook',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "8",
      name: 'Custom Hook',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "9",
      name: 'JSX',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "10",
      name: 'React Router',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // State Management
    {
      id: "11",
      name: 'Redux Toolkit',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "12",
      name: 'Context API',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "13",
      name: 'Zustand',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Mobile Development
    {
      id: "14",
      name: 'Android app',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "15",
      name: 'iOS app',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "16",
      name: 'Android Studio',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "17",
      name: 'Xcode',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "18",
      name: 'Expo',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Firebase Services
    {
      id: "19",
      name: 'Firebase',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "20",
      name: 'Firebase Storage',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "21",
      name: 'Firebase Auth',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "22",
      name: 'Realtime Database',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "23",
      name: 'Crashlytics',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "24",
      name: 'Analytics',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Communication & Notifications
    {
      id: "25",
      name: 'Push notification',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "26",
      name: 'OneSignal',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "27",
      name: 'Socket.io',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "28",
      name: 'Twilio',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "29",
      name: 'Agora',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Data Management & API
    {
      id: "30",
      name: 'React Query',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "31",
      name: 'Axios',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "32",
      name: 'Fetch',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "33",
      name: 'API integration',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // UI & Navigation
    {
      id: "34",
      name: 'React Navigation',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "35",
      name: 'Application design',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "36",
      name: 'Formik',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "37",
      name: 'I18n',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Maps & Location
    {
      id: "38",
      name: 'Google Maps',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Development Tools
    {
      id: "39",
      name: 'Chrome DevTools',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "40",
      name: 'React Developer Tools',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "41",
      name: 'whyDidYouRender',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "42",
      name: 'Version control systems',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Web Development
    {
      id: "43",
      name: 'HTML5',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "44",
      name: 'CSS3',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "45",
      name: 'Sass/SCSS',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "46",
      name: 'Styled Components',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "47",
      name: 'Material-UI',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "48",
      name: 'Ant Design',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Cross-Platform
    // Removed Flutter and Dart skills

    // Utilities
    {
      id: "49",
      name: 'Lodash',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Monetization
    {
      id: "50",
      name: 'AdSense',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Authentication & Social
    {
      id: "51",
      name: 'Social login',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // App Store & Deployment
    {
      id: "52",
      name: 'Publish the app (App Store and Play Store)',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Integration & Development
    {
      id: "53",
      name: 'Third-Party Integration',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "54",
      name: 'SDK Integrations',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Quality & Maintenance
    {
      id: "55",
      name: 'Code reviews',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "56",
      name: 'Performance Optimization',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "57",
      name: 'Troubleshooting',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "58",
      name: 'Code fixes',
      category: SkillCategory.TECHNICAL,
      level: 5
    }
  ],
  experiences: [
    {
      id: "1",
      company: 'Programming.com',
      position: 'Sr. Software Developer',
      startDate: 'May 2024',
      endDate: 'Present',
      current: true,
      description: 'Designed mobile applications for Apple and Android platforms. Strong knowledge of React Native architecture, components, and lifecycle for building cross-platform mobile applications. Familiar with UI libraries like React Native Elements and Material Design for sleek and responsive user interfaces.\n\nExpert in React.js development for web applications, building responsive and interactive user interfaces. Proficient in modern React patterns including hooks, context API, and component composition. Skilled in creating reusable components and implementing efficient state management solutions.\n\nHands-on experience with RESTful APIs and third-party libraries for seamless backend integration. Comfortable working with TypeScript for type safety and scalable code architecture. Proficient in debugging, profiling, and optimizing performance across different devices. Experienced in setting up navigation flows using React Navigation and handling deep linking. Adept at using Git for version control and participating in code reviews to maintain code quality.',
      location: 'Gurugram, Haryana',
      achievements: []
    },
    {
      id: "2",
      company: 'Adglobal360',
      position: 'React Native Developer',
      startDate: 'Aug 2023',
      endDate: 'May 2024',
      current: false,
      description: 'Cross-platform developer skilled in React Native and React.js for web applications, adept at crafting responsive, user-friendly mobile applications with expertise in API integration, state management, and performance optimization.\n\nProficient in Agile methodologies, version control, and committed to continuous learning.\n\nExperienced in building scalable, maintainable codebases with a strong focus on performance and cross-platform consistency. Collaborates effectively with cross-functional teams, prioritizing clean architecture, reusable components, and timely delivery of high-impact features.\n\nWell-versed in debugging, testing, and CI/CD practices to ensure high-quality code and smooth deployments. Strong foundation in JavaScript and TypeScript, with the ability to quickly adapt to new technologies and frameworks.\n\nPassionate about creating seamless user experiences and continuously improving product functionality through data-driven insights and user feedback.\n\nDemonstrated leadership in driving end-to-end feature development, mentoring junior developers, and owning critical modules from design to deployment.',
      location: 'Noida, Uttar Pradesh',
      achievements: []
    },
    {
      id: "3",
      company: 'Etelligens Technology',
      position: 'Mobile Application Developer',
      startDate: 'Jan 2021',
      endDate: 'Aug 2023',
      current: false,
      description: 'Wrote clean, maintainable, and efficient code.\n\nBuilt and maintained a reusable codebase for future use.\n\nCollaborated with the rest of the engineering team to design and launch new features.\n\nIdentified and fixed bugs, and performance issues.\n\nEnsured the application was up to date with the latest industry standards.\n\nWorked with the product and design teams to understand end-user requirements and use cases, and to translate them into a pragmatic and effective technical solution.\n\nSupported and maintained existing applications, and troubleshot any issues that may arise.\n\nActively participated in code reviews, sprint planning, and knowledge-sharing sessions to ensure continuous team improvement and code quality.\n\nIntegrated third-party libraries and APIs to extend app functionality across diverse use cases.',
      location: 'Noida, Uttar Pradesh',
      achievements: []
    },
    {
      id: "4",
      company: 'Mobisoftseo India Tech LLP',
      position: 'Junior Android Developer',
      startDate: 'Sep 2019',
      endDate: 'Jan 2021',
      current: false,
      description: 'Discussed issues with team members to provide resolution and apply best practices.\n\nCollaborated with project managers to select ambitious, yet realistic, coding milestones on pre-release software project development.\n\nUpdated old code bases to modern development standards, improving functionality.',
      location: 'Mumbai, Maharashtra',
      achievements: []
    }
  ],
  projects: [
    {
      id:"1",
      name: 'Zupee Ludo',
      duration: '16 Months',
      description: 'A mobile gaming application for Ludo with real-time multiplayer functionality.',
      technologies: ['React Native', 'Zustand', 'Sentry', 'Firebase', 'Crashlytics', 'Analytics', 'payment gateway', 'UPI payment', 'In-app update'],
      link: 'https://play.google.com/store/apps/details?id=com.ludosupreme.zupee',
      role: 'Developer',
      current: false
    },
    {
      id:"2",
      name: 'Capri Loans',
      duration: '11 Months',
      description: 'A loan management application with payment integration and location services.',
      technologies: ['React Native', 'Redux', 'Context API', 'Google Map', 'push notification', 'in-app update', 'payment gateway','Native Modules','CleverTap'],
      link: 'https://play.google.com/store/apps/details?id=com.capriloans.consumer',
      role: 'Developer',
      current: false
    },
    {
      id:"3",
      name: 'Tez Rummy',
      duration: '18 Months',
      description: 'A card game application with real-time multiplayer functionality and payment integration.',
      technologies: ['React-native', 'Redux-toolkit', 'async storage', 'clever tap', 'Upi payment', 'crashlytics', 'firebase', 'sentry', 'Native Modules'],
      link: 'https://play.google.com/store/apps/details?id=com.battles99.rummyandroid',
      role: 'Developer',
      current: true
    },
    {
      id:"4",
      name: 'TechXpress',
      duration: '10 Months',
      description: 'A technology service platform with payment and analytics integration.',
      technologies: ['React-native', 'Redux-toolkit', 'async storage', 'clever tap', 'Upi payment', 'crashlytics', 'firebase', 'sentry', 'analytics'],
      link: 'https://play.google.com/store/apps/details?id=com.capri.techxpress.cgcl',
      role: 'Developer',
      current: false
    },
    {
      id:"5",
      name: 'Hobbytwin',
      duration: '6 Months',
      description: 'A social platform for hobby enthusiasts with social login and analytics.',
      technologies: ['React Native', 'Zustand', 'Sentry', 'Firebase', 'Crashlytics', 'Analytics', 'Social Login'],
      link: 'https://play.google.com/store/apps/details?id=com.hobbytwin.hobbytwin',
      role: 'Developer',
      current: false
    },
    {
      id:"6",
      name: 'Enviro.H',
      duration: '20 Months',
      description: 'An environmental monitoring application with QR code scanning and location tracking.',
      technologies: ['React Native', 'Zustand', 'Sentry', 'Firebase', 'Crashlytics', 'Analytics', 'Qrcode scanner', 'background Location fetch'],
      link: 'https://play.google.com/store/apps/details?id=com.enviro',
      role: 'Developer',
      current: false
    }
  ],
  education: [
    {
      id:"1",
      institution: 'A.K.T.U. University',
      degree: 'MCA',
      year: '2019',
      location: 'Lucknow',
      achievements: []
    },
    {
      id:"2",
      institution: 'Dewan V.S. Group of Institutions',
      degree: 'BCA',
      year: '2017',
      location: 'Meerut',
      achievements: []
    },
    {
      id:"3",
      institution: 'Intermediate Collage Dhanaura Silver Nagar',
      degree: '12th',
      year: '2014',
      location: 'Uttar Pradesh',
      achievements: []
    },
    {
      id:"4",
      institution: 'Intermediate Collage Dhanaura Silver Nagar',
      degree: '10th',
      year: '2012',
      location: 'Uttar Pradesh',
      achievements: []
    }
  ],
  certifications: [
    {
      id:"1",
      name: 'React.js Complete Guide - Build Modern Web Applications',
      issuer: 'Udemy',
      date: '2023',
      credentialId: '1234567890',
      link: 'https://www.udemy.com/certificate/UC-1234567890'
    }
  ],
  languages: [
    {
      id:"1",
      name: 'English',
      proficiency: 'Fluent'
    },
    {
      id:"2",
      name: 'Hindi',
      proficiency: 'Native'
    }
  ],
  theme: {
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    fontFamily: FontFamily.DMSANS_REGULAR
  },
  template: 'modern'
}; 