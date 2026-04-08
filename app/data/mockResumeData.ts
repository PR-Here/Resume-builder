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
    title: 'Full Stack Mobile Developer (React Native, React Js, Node.js)'
  },
  summary: '7+ years full stack developer with expertise in React.js, React Native, Next.js, and Node.js. Specialized in building scalable mobile and web applications using TypeScript, REST/GraphQL APIs, MongoDB, and AWS. Proven track record scaling apps to 500K+ daily users with 99.9% uptime. Expert in performance optimization (40% faster), real-time features (Socket.io), payment integration, and CI/CD automation. Led cross-platform development teams and mentored 8+ developers. Certified in React JS Masterclass and Complete React 19 Developer Course. Advanced expertise in custom React hooks, Redux/Zustand state management, React Testing Library, and Jest for enterprise-grade applications. Proficient in TypeScript, GraphQL subscriptions, microservices architecture, and cloud deployment (AWS, GCP, Vercel). Proven ability to architect scalable solutions from ground-up, implement complex payment integrations (UPI, Razorpay, Stripe), and deliver products with 4.5+ ratings and 1M+ downloads across app stores.',
  skills: [
    // FRONTEND
    { id: "1", name: 'React.js', category: SkillCategory.FRONTEND, level: 5 },
    { id: "2", name: 'React Hooks', category: SkillCategory.FRONTEND, level: 5 },
    { id: "3", name: 'JSX & Components', category: SkillCategory.FRONTEND, level: 5 },
    { id: "4", name: 'HTML5 & CSS3', category: SkillCategory.FRONTEND, level: 5 },
    { id: "5", name: 'Styled Components', category: SkillCategory.FRONTEND, level: 5 },
    { id: "6", name: 'React Navigation', category: SkillCategory.FRONTEND, level: 5 },
    { id: "7", name: 'Formik', category: SkillCategory.FRONTEND, level: 5 },
    { id: "8", name: 'UI/UX Design', category: SkillCategory.FRONTEND, level: 5 },
    { id: "37", name: 'Next.js', category: SkillCategory.FRONTEND, level: 5 },
    { id: "38", name: 'Redux', category: SkillCategory.FRONTEND, level: 5 },
    { id: "39", name: 'TypeScript', category: SkillCategory.FRONTEND, level: 5 },
    { id: "40", name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: 5 },    { id: "41", name: 'Context API', category: SkillCategory.FRONTEND, level: 5 },
    { id: "42", name: 'Zustand', category: SkillCategory.FRONTEND, level: 5 },
    { id: "43", name: 'Custom Hooks', category: SkillCategory.FRONTEND, level: 5 },
    { id: "44", name: 'React.memo & useMemo', category: SkillCategory.FRONTEND, level: 5 },
    // MOBILE
    { id: "9", name: 'React Native', category: SkillCategory.MOBILE, level: 5 },
    { id: "10", name: 'Expo', category: SkillCategory.MOBILE, level: 5 },
    { id: "11", name: 'Android & iOS Dev', category: SkillCategory.MOBILE, level: 5 },
    { id: "12", name: 'Android Studio', category: SkillCategory.MOBILE, level: 5 },
    { id: "13", name: 'Xcode', category: SkillCategory.MOBILE, level: 5 },
    { id: "14", name: 'Push Notifications', category: SkillCategory.MOBILE, level: 5 },
    { id: "15", name: 'App Deployment', category: SkillCategory.MOBILE, level: 5 },

    // BACKEND
    { id: "16", name: 'Node.js', category: SkillCategory.BACKEND, level: 5 },
    { id: "17", name: 'Express.js', category: SkillCategory.BACKEND, level: 5 },
    { id: "18", name: 'RESTful APIs', category: SkillCategory.BACKEND, level: 5 },
    { id: "19", name: 'GraphQL', category: SkillCategory.BACKEND, level: 5 },
    { id: "20", name: 'Socket.io', category: SkillCategory.BACKEND, level: 5 },
    { id: "21", name: 'Twilio & Agora', category: SkillCategory.BACKEND, level: 5 },
    { id: "22", name: 'Microservices', category: SkillCategory.BACKEND, level: 5 },
    { id: "23", name: 'API Integration', category: SkillCategory.BACKEND, level: 5 },
    { id: "24", name: 'OAuth & Auth', category: SkillCategory.BACKEND, level: 5 },
    { id: "25", name: 'React Query', category: SkillCategory.BACKEND, level: 5 },

    // DATABASE
    { id: "26", name: 'MongoDB', category: SkillCategory.DATABASE, level: 5 },
    { id: "27", name: 'PostgreSQL', category: SkillCategory.DATABASE, level: 5 },
    { id: "28", name: 'MySQL', category: SkillCategory.DATABASE, level: 5 },
    { id: "29", name: 'Firebase', category: SkillCategory.DATABASE, level: 5 },
    { id: "30", name: 'Realtime DB', category: SkillCategory.DATABASE, level: 5 },
    { id: "31", name: 'Cloud Storage', category: SkillCategory.DATABASE, level: 5 },

    // TESTCASES
    { id: "32", name: 'Unit Testing', category: SkillCategory.TESTCASES, level: 5 },
    { id: "33", name: 'Integration Testing', category: SkillCategory.TESTCASES, level: 5 },
    { id: "34", name: 'Performance Optimization & Profiling', category: SkillCategory.TESTCASES, level: 5 },
    { id: "35", name: 'Debugging', category: SkillCategory.TESTCASES, level: 5 },
    { id: "36", name: 'Git Version Control & CI/CD Pipelines', category: SkillCategory.TESTCASES, level: 5 },
    { id: "45", name: 'React Testing Library', category: SkillCategory.TESTCASES, level: 5 },
    { id: "46", name: 'Jest Testing Framework', category: SkillCategory.TESTCASES, level: 5 }
  ],
  experiences: [
    {
      id: "1",
      company: 'Telus Digital',
      position: 'Senior Application Developer / Module Lead',
      startDate: 'October 2025',
      endDate: 'Present',
      current: true,
      description: 'Leading module development with React Native, React.js, Node.js & TypeScript. Building scalable apps with custom hooks, Redux state management, and real-time features. Mentoring developers on React best practices & architecture patterns. Architecting modular React components with Context API, managing state persistence with AsyncStorage, and implementing real-time synchronization with GraphQL WebSockets. Overseeing code quality through React Testing Library, Jest unit tests (95%+ coverage), and TypeScript strict mode adoption across the team.',
      location: 'Remote',
      achievements: ['Leading module team with focus on React scalability, custom hooks architecture, and mentoring 5+ developers']
    },
    {
      id: "2",
      company: 'Programming.com',
      position: 'Sr. Software Developer',
      startDate: 'May 2024',
      endDate: 'September 2025',
      current: false,
      description: 'Led full stack development with React Native, React.js, and Node.js for 500K+ users. Architected efficient state management with Redux/Zustand, optimized React components with React.memo, and implemented real-time GraphQL subscriptions. 99.9% uptime with CI/CD automation. Engineered custom React hooks for complex form handling and API data fetching, reducing component code by 35%. Implemented lazy loading, code splitting, and bundle optimization achieving 40% faster app startup time across iOS and Android.',
      location: 'Gurugram, Haryana',
      achievements: ['Led React + Node.js architecture for 500K+ users (99.9% uptime), 40% performance gain via React optimization, mentored 8 developers on React patterns']
    },
    {
      id: "3",
      company: 'Adglobal360',
      position: 'React Native & React.js Developer',
      startDate: 'Aug 2023',
      endDate: 'May 2024',
      current: false,
      description: 'Cross-platform React Native & React.js developer building high-performance applications. Implemented custom React hooks, Context API state management, and React Testing Library for 98% code coverage. Optimized bundles with code splitting and lazy loading. Built and shipped 12 production React features with TypeScript, achieved 40% performance improvement using React.memo and useMemo optimization techniques. Integrated 8+ third-party SDKs (Firebase, Sentry, CleverTap) with custom error handling and telemetry logging.',
      location: 'Noida, Uttar Pradesh',
      achievements: ['Delivered 12 React features with 40% performance gain (React.memo optimization), 98% Jest testing coverage, TypeScript-first codebase']
    },
    {
      id: "4",
      company: 'Etelligens Technology',
      position: 'React Native Mobile Developer',
      startDate: 'Jan 2021',
      endDate: 'Aug 2023',
      current: false,
      description: 'Developed high-performance React Native apps with Redux state management and custom React hooks. Integrated 15+ third-party APIs with GraphQL queries. Implemented React Testing Library tests and performance profiling using React DevTools. Shipped 8 production React Native applications achieving 4.5+ star ratings and 500K+ total downloads with zero critical bugs in production. Optimized app lifecycle with React Native lifecycle hooks, memory management, and native module bridging for seamless iOS/Android experience.',
      location: 'Noida, Uttar Pradesh',
      achievements: ['Shipped 8 React Native apps (4.5+ rating), 15+ API integrations (30% faster with custom hooks), reduced bundle size 25% via code splitting']
    },
    {
      id: "5",
      company: 'Mobisoftseo India Tech LLP',
      position: 'Junior React Native Developer',
      startDate: 'Sep 2019',
      endDate: 'Jan 2021',
      current: false,
      description: 'Developed React Native mobile apps with focus on UX & stability. Modernized legacy codebases with functional React components, hooks migration, and error handling. Implemented unit tests with Jest. Launched 5 React Native applications from scratch with 200K+ combined downloads across Google Play Store and Apple App Store. Reduced app crash rates from 8% to 0.5% by implementing React error boundaries, comprehensive error logging, and Redux state validation.',
      location: 'Mumbai, Maharashtra',
      achievements: ['Launched 5 React Native apps (200K+ downloads), reduced crash rate 8% → 0.5% via React error boundaries, migrated to hooks architecture']
    }
  ],
  projects: [
    {
      id:"1",
      name: 'Zupee Ludo',
      duration: '16 Months',
      description: 'Mobile gaming app for Ludo with real-time multiplayer & payment integration. Achieved 100K+ monthly active users with 4.5+ app store rating. Implemented real-time game state management using Redux + Socket.io, custom React Native animations, and secure UPI payment integration with PCI compliance.',
      technologies: ['React Native', 'Zustand', 'Sentry', 'Firebase', 'Crashlytics', 'Analytics', 'payment gateway', 'UPI payment', 'In-app update'],
      link: 'https://play.google.com/store/apps/details?id=com.ludosupreme.zupee',
      role: 'Developer',
      current: false
    },
    {
      id:"2",
      name: 'Capri Loans',
      duration: '11 Months',
      description: 'Loan management app with payment integration, location services & push notifications. Scaled to 50K+ active users with seamless loan disbursement workflow. Built React Native maps integration with geofencing, implemented notification triggers with CleverTap, and custom Context API for loan eligibility calculations.',
      technologies: ['React Native', 'Redux', 'Context API', 'Google Map', 'push notification', 'in-app update', 'payment gateway','Native Modules','CleverTap'],
      link: 'https://play.google.com/store/apps/details?id=com.capriloans.consumer',
      role: 'Developer',
      current: false
    },
    {
      id:"3",
      name: 'Tez Rummy',
      duration: '18 Months',
      description: 'Card game app with real-time multiplayer, payment integration & analytics. Currently live with 150K+ players and 4.6+ rating. Engineered real-time multiplayer game engine using Redux-Toolkit, Socket.io, and custom React Native touch gesture handlers for smooth UX.',
      technologies: ['React-native', 'Redux-toolkit', 'async storage', 'clever tap', 'Upi payment', 'crashlytics', 'firebase', 'sentry', 'Native Modules'],
      link: 'https://play.google.com/store/apps/details?id=com.battles99.rummyandroid',
      role: 'Developer',
      current: true
    },
    {
      id:"4",
      name: 'TechXpress',
      duration: '10 Months',
      description: 'Full stack tech platform with Node.js backend, payment integration & analytics. Served 75K+ active users with enterprise-grade features. Built React Native mobile app with Redux, Node.js Express API with MongoDB, and integrated Razorpay for secure payment processing with 99.99% transaction success rate.',
      technologies: ['React-native', 'Node.js', 'Express.js', 'PostgreSQL', 'Redux-toolkit', 'async storage', 'clever tap', 'Upi payment', 'crashlytics', 'firebase', 'sentry', 'analytics'],
      link: 'https://play.google.com/store/apps/details?id=com.capri.techxpress.cgcl',
      role: 'Full Stack Developer',
      current: false
    },
    {
      id:"5",
      name: 'Resume Builder',
      duration: '3 Months',
      description: 'Full-stack SaaS resume builder built with React.js & Next.js. Implemented custom React hooks for form state management, Redux for global state, and React Testing Library tests. Real-time PDF export, drag-and-drop template customization, and AWS S3 cloud storage. Deployed on Vercel with sub-100ms page loads, implemented server-side rendering for SEO optimization, and integrated Stripe for subscription billing. Features include 98% Jest test coverage, real-time PDF preview rendering, and MongoDB-backed user session persistence.',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'Custom Hooks', 'Redux', 'Node.js', 'MongoDB', 'GraphQL', 'React Testing Library', 'Jest', 'Tailwind CSS', 'PDF Generation', 'AWS S3', 'Vercel'],
      link: 'https://pankajrana-portfolio-4ure1lgxr-pankaj-ranas-projects.vercel.app',
      role: 'Full Stack Developer',
      current: true
    },

  ],
  education: [
    {
      id:"1",
      institution: 'A.K.T.U. University',
      degree: 'MCA',
      year: '2019',
      location: 'Lucknow',
      achievements: ['CGPA: 7.8/10']
    },
    {
      id:"2",
      institution: 'Dewan V.S. Group of Institutions',
      degree: 'BCA',
      year: '2017',
      location: 'Meerut',
      achievements: ['CGPA: 8.2/10']
    },

  ],
  certifications: [
    {
      id:"1",
      name: 'React JS Masterclass: Zero To Job Ready With 10 Projects',
      issuer: 'Udemy',
      date: '2023',
      credentialId: 'UC-db295489-b8c3-4dcb-8838-d4db6ce6cdfa', 
      link: 'https://ude.my/UC-db295489-b8c3-4dcb-8838-d4db6ce6cdfa'
    },
    {
      id:"2",
      name: 'The Complete React 19 Developer Course (incl. Next.js 16)',
      issuer: 'Udemy',
      date: '2024',
      credentialId: 'UC-26402593-b50c-430e-b20e-ef46fc3726f9', 
      link: 'https://ude.my/UC-26402593-b50c-430e-b20e-ef46fc3726f9'
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