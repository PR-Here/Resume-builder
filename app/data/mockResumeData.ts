import { FontFamily, SkillCategory } from '../types/enums';
import { ResumeData } from '../context/ResumeContext';

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
  summary: 'Dynamic Senior Software Developer with over 6 years of experience at Programming.com, specializing in React Native and Flutter to build high-performance, visually engaging mobile applications. Expert in API integration, state management, and performance optimization, with a proven track record of delivering scalable and maintainable solutions across both Android and iOS platforms. Known for thriving in collaborative, fast-paced environments, consistently delivering user-centric features, while upholding the highest standards of code quality, UI/UX design, and cross-platform consistency. Seasoned React Native Developer with comprehensive experience in building mobile applications using JavaScript and React. Possess strong skills in developing user interface components, implementing and executing testing suites for software validation, along with proficiency in modern front-end build pipelines and tools. Demonstrated ability to deliver high-quality software solutions, contributing substantially to project success.',
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
      name: 'JavaScript',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "3",
      name: 'TypeScript',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "4",
      name: 'ES 6+',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "5",
      name: 'Function Component',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "6",
      name: 'React Hook',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "7",
      name: 'Custom Hook',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // State Management
    {
      id: "8",
      name: 'Redux Toolkit',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "9",
      name: 'Context API',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "10",
      name: 'Zustand',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Mobile Development
    {
      id: "11",
      name: 'Android app',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "12",
      name: 'iOS app',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "13",
      name: 'Android Studio',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "14",
      name: 'Xcode',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "15",
      name: 'Expo',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Firebase Services
    {
      id: "16",
      name: 'Firebase',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "17",
      name: 'Firebase Storage',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "18",
      name: 'Firebase Auth',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "19",
      name: 'Realtime Database',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "20",
      name: 'Crashlytics',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "21",
      name: 'Analytics',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Communication & Notifications
    {
      id: "22",
      name: 'Push notification',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "23",
      name: 'OneSignal',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "24",
      name: 'Socket.io',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "25",
      name: 'Twilio',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "26",
      name: 'Agora',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Data Management & API
    {
      id: "27",
      name: 'React Query',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "28",
      name: 'Axios',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "29",
      name: 'Fetch',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "30",
      name: 'API integration',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // UI & Navigation
    {
      id: "31",
      name: 'React Navigation',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "32",
      name: 'Application design',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "33",
      name: 'Formik',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "34",
      name: 'I18n',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Maps & Location
    {
      id: "35",
      name: 'Google Maps',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Development Tools
    {
      id: "36",
      name: 'Flipper',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "37",
      name: 'Debugging (Chrome)',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "38",
      name: 'whyDidYouRender',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "39",
      name: 'Version control systems',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Cross-Platform
    {
      id: "40",
      name: 'Flutter',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "41",
      name: 'Dart',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Utilities
    {
      id: "42",
      name: 'Lodash',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Monetization
    {
      id: "43",
      name: 'AdSense',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Authentication & Social
    {
      id: "44",
      name: 'Social login',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // App Store & Deployment
    {
      id: "45",
      name: 'Publish the app (App Store and Play Store)',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Integration & Development
    {
      id: "46",
      name: 'Third-Party Integration',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "47",
      name: 'SDK Integrations',
      category: SkillCategory.TECHNICAL,
      level: 5
    },

    // Quality & Maintenance
    {
      id: "48",
      name: 'Code reviews',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "49",
      name: 'Performance Optimization',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "50",
      name: 'Troubleshooting',
      category: SkillCategory.TECHNICAL,
      level: 5
    },
    {
      id: "51",
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
      description: 'Designed mobile applications for Apple and Android platforms. Strong knowledge of React Native architecture, components, and lifecycle for building cross-platform mobile applications. Familiar with UI libraries like React Native Elements and Material Design for sleek and responsive user interfaces.\n\nIn-depth experience developing mobile apps using Flutter and Dart, building visually attractive UIs with widgets, stateful, and stateless components. Proficient in custom widget creation, animations, and platform channel integration for native features.',
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
      description: 'Cross-platform developer skilled in React Native and React.js for web applications, adept at crafting responsive, user-friendly mobile applications with expertise in API integration, state management, and performance optimization.\n\nProficient in Agile methodologies, version control, and committed to continuous learning.',
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
      description: 'Wrote clean, maintainable, and efficient code.\nBuilt and maintained a reusable codebase for future use.\nCollaborated with the rest of the engineering team to design and launch new features.\nIdentified and fixed bugs, and performance issues.\nEnsured the application was up to date with the latest industry standards.\nWorked with the product and design teams to understand end-user requirements and use cases, and to translate them into a pragmatic and effective technical solution.\nSupported and maintained existing applications, and troubleshot any issues that may arise.',
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
      description: 'Discussed issues with team members to provide resolution and apply best practices.\nCollaborated with project managers to select ambitious, yet realistic, coding milestones on pre-release software project development.\nUpdated old code bases to modern development standards, improving functionality.',
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
      technologies: ['React Native', 'Zustand', 'Sentry', 'Firebase', 'Crashlytics', 'Analytics', 'payment gateway'],
      link: 'https://play.google.com/store/apps/details?id=com.ludosupreme.zupee',
      role: 'Developer',
      current: false
    },
    {
      id:"2",
      name: 'Capri Loans',
      duration: '11 Months',
      description: 'A loan management application with payment integration and location services.',
      technologies: ['React Native', 'Redux', 'Context API', 'Google Map', 'push notification', 'in-app update', 'payment gateway'],
      link: 'https://play.google.com/store/apps/details?id=com.capriloans.consumer',
      role: 'Developer',
      current: false
    },
    {
      id:"3",
      name: 'Tez Rummy',
      duration: '18 Months',
      description: 'A card game application with real-time multiplayer functionality and payment integration.',
      technologies: ['React-native', 'Redux-toolkit', 'async storage', 'clever tap', 'Upi payment', 'crashlytics', 'firebase', 'sentry'],
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
      name: 'Learn Flutter & Dart to Build iOS & Android Apps',
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