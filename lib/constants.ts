import type { Service, Destination, Testimonial, LanguageClass, Milestone, BlogPost } from '@/types';

export const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About',        href: '/about' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Education Counseling',
    icon: 'globe',
    description: 'Expert guidance on choosing the right university and course tailored to your career goals in Japan, Korea, Australia, and more.',
    fullDescription: 'Choosing the right career path is confusing. Our certified counselors analyze your profile, interests, and financial plan to recommend the best universities and courses.',
    points: ['Profile Analysis', 'University Shortlisting', 'Career Mapping'],
    methodology: "Our counseling approach is student-centric. We use a proprietary 3-step verification process to ensure every recommendation aligns with current global market trends and the student's long-term aspirations.",
    detailedProcess: [
      { title: 'In-depth Profile Analysis', desc: 'We review your academic history, language proficiency, and financial background.' },
      { title: 'Goal Alignment', desc: 'Matching your interests with career-driven courses and top-tier institutions.' },
      { title: 'University Comparison', desc: 'Evaluating universities based on ranking, tuition, location, and post-study opportunities.' },
    ],
    credentials: ['Ministry of Social Development (MoSD) Approved', 'CTEVT TITI Trained Counselors', 'British Council Certified Experts'],
    team: [
      { name: 'Sita Lamsal',   role: 'Chief Counselor',   credentials: ['TITI Trained', '10+ Years Exp.'],   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
      { name: 'Bishal Gurung', role: 'Senior Consultant',  credentials: ['British Council Certified'],         image: 'https://i.pravatar.cc/150?u=bishal' },
      { name: 'Anju Thapa',    role: 'Career Strategist',  credentials: ['CTEVT TITI Certified'],              image: 'https://i.pravatar.cc/150?u=anju' },
    ],
  },
  {
    id: '2',
    title: 'Scholarship Guidance',
    icon: 'award',
    description: 'Dedicated support to help you identify and apply for merit-based and need-based scholarships globally.',
    fullDescription: "Education shouldn't be a burden. We help you identify and apply for merit-based, government, and university-specific scholarships.",
    points: ['Merit Scholarships', 'Need-based Aid', 'Application Review'],
    methodology: 'We maintain a direct database of internal university scholarships not always advertised to the public. We guide students on crafting compelling essays and SOPs that maximize funding potential.',
    detailedProcess: [
      { title: 'Scholarship Mapping',  desc: 'Identifying fully-funded and partial scholarships for your profile.' },
      { title: 'Essay Mentoring',      desc: 'Professional guidance on scholarship-specific personal statements.' },
      { title: 'Interview Coaching',   desc: 'Preparing for merit-based scholarship interviews with mock sessions.' },
    ],
    credentials: ['Authorized University Representatives', 'MoSD Approved Documentation Process'],
    team: [
      { name: 'Kiran Thapa',  role: 'Scholarship Head',     credentials: ['University Relations Specialist'], image: 'https://i.pravatar.cc/150?u=kiran' },
      { name: 'Rahul KC',     role: 'Grant Writer',          credentials: ['SOP Specialist'],                  image: 'https://i.pravatar.cc/150?u=rahul' },
      { name: 'Mina Pandey',  role: 'Financial Aid Advisor', credentials: ['Global Funding Expert'],           image: 'https://i.pravatar.cc/150?u=mina' },
    ],
  },
  {
    id: '3',
    title: 'Test Preparation',
    icon: 'book-open',
    description: 'Comprehensive preparation classes for IELTS, PTE, JLPT, NAT, and TOPIK with experienced instructors and mock tests.',
    fullDescription: 'Get the scores you need. We offer intensive preparation classes for IELTS, PTE, JLPT, and TOPIK with experienced instructors and weekly mock tests.',
    points: ['Free Mock Tests', 'Updated Materials', 'Flexible Timing'],
    methodology: 'Interactive classroom sessions combined with digital lab practice. We focus on weakness-spotting and time management strategies through weekly full-length mock exams.',
    detailedProcess: [
      { title: 'Diagnostic Testing',  desc: 'Initial test to determine your baseline and target areas.' },
      { title: 'Intensive Training',  desc: 'Daily sessions covering Reading, Writing, Listening, and Speaking.' },
      { title: 'Feedback Loops',      desc: 'Detailed individual feedback after every mock test.' },
    ],
    credentials: ['British Council Certified Instructors', 'Official PTE Lab Facilities', 'Japanese/Korean Native Trained Staff'],
    team: [
      { name: 'Nisha Rai',      role: 'Lead IELTS Trainer',  credentials: ['British Council Certified'], image: 'https://i.pravatar.cc/150?u=nisha' },
      { name: 'Hiroshi Tanaka', role: 'Japanese Expert',     credentials: ['JLPT N1 Certified'],        image: 'https://i.pravatar.cc/150?u=hiroshi' },
      { name: 'Min-ho Park',    role: 'Korean Specialist',   credentials: ['TOPIK Level 6'],             image: 'https://i.pravatar.cc/150?u=minho' },
    ],
  },
  {
    id: '4',
    title: 'Visa Documentation',
    icon: 'file-check',
    description: 'Meticulous assistance with visa applications, financial documentation, and interview preparation to ensure high success rates.',
    fullDescription: 'One small mistake can lead to visa rejection. We meticulously guide you through financial documents, SOP writing, and form filling to ensure a 98% success rate.',
    points: ['Financial Guidance', 'SOP Assistance', 'Mock Interviews'],
    methodology: 'Double-tier verification of all documentation. We simulate the actual embassy interview environment multiple times until the student is confident and clear.',
    detailedProcess: [
      { title: 'Doc Collection',  desc: 'Systematic gathering of academic, financial, and legal papers.' },
      { title: 'SOP Refinement',  desc: 'Turning your story into a professional and persuasive statement.' },
      { title: 'Final Review',    desc: 'MoSD-approved standards check before submission.' },
    ],
    credentials: ['Approved by Nepal Ministry of Education', 'Certified Documentation Experts'],
    team: [
      { name: 'Sarita Poudel', role: 'Documentation Head', credentials: ['Compliance Specialist'], image: 'https://i.pravatar.cc/150?u=sarita' },
      { name: 'Bibek Shah',    role: 'Visa Liaison',        credentials: ['Embassy Relations'],     image: 'https://i.pravatar.cc/150?u=bibek' },
      { name: 'Gopal Ray',     role: 'Finance Analyst',     credentials: ['Verification Expert'],   image: 'https://i.pravatar.cc/150?u=gopal' },
    ],
  },
  {
    id: '5',
    title: 'Student Accommodation',
    icon: 'home',
    description: 'Assistance in finding safe and affordable accommodation near your university.',
    fullDescription: "We don't just leave you at the airport. We assist in finding safe and affordable accommodation near your university before you even fly.",
    points: ['Dormitory Booking', 'Shared Apartments', 'Homestays'],
    methodology: 'Partnering with global housing providers like Casita and University Living to offer students vetted, safe, and student-friendly living options.',
    detailedProcess: [
      { title: 'Budget Planning',  desc: 'Finding options that fit your monthly living allowance.' },
      { title: 'Vetting Process',  desc: 'Ensuring security and proximity to campus.' },
      { title: 'Booking Support',  desc: 'Handling contracts and deposit transfers safely.' },
    ],
    credentials: ['Global Housing Partnership Network'],
    team: [
      { name: 'Prabin Joshi', role: 'Post-Arrival Lead',    credentials: ['Intl Relations Expert'], image: 'https://i.pravatar.cc/150?u=prabin' },
      { name: 'Deepa Oli',    role: 'Housing Coordinator',  credentials: ['Student Welfare'],        image: 'https://i.pravatar.cc/150?u=deepa' },
      { name: 'Sanjay Lama',  role: 'Travel Support',       credentials: ['Logistics Manager'],      image: 'https://i.pravatar.cc/150?u=sanjay' },
    ],
  },
  {
    id: '6',
    title: 'Health Insurance',
    icon: 'heart',
    description: 'Help choosing the best and most affordable student health insurance plans.',
    fullDescription: 'Mandatory for most countries, we help you choose the best and most affordable student health insurance plans (OSHC, etc.).',
    points: ['OSHC (Australia)', 'IHS (UK)', 'Travel Insurance'],
    methodology: 'Comparison of all major health providers to find plans that offer maximum coverage for pre-existing conditions and mental health support.',
    detailedProcess: [
      { title: 'Requirement Check',  desc: 'Confirming mandatory insurance levels for your specific visa.' },
      { title: 'Quote Comparison',   desc: 'Finding the most affordable premium with high coverage.' },
      { title: 'Policy Issue',       desc: 'Instant certificate generation for visa application.' },
    ],
    credentials: ['Authorized Insurance Agent Partnerships'],
    team: [
      { name: 'Rita Adhikari',   role: 'Insurance Specialist', credentials: ['Certified Advisor'],       image: 'https://i.pravatar.cc/150?u=rita' },
      { name: 'Sunil Jha',       role: 'Support Analyst',      credentials: ['Compliance Expert'],       image: 'https://i.pravatar.cc/150?u=sunil' },
      { name: 'Elena Shrestha',  role: 'Claim Consultant',     credentials: ['Global Policy Specialist'], image: 'https://i.pravatar.cc/150?u=elena' },
    ],
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'au',
    country: 'Australia',
    count: 12,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
    highlight: 'World-class education & lifestyle.',
    features: ['Post-Study Work Visa (2-4 yrs)', 'High Minimum Wage', 'PR Pathways Available', 'Part-time Work (48hrs/fn)', 'Scholarships for Merit'],
    details: {
      overview: 'Australia is the third most popular destination for international students. It boasts world-renowned universities, a high standard of living, and an incredibly diverse environment. The Australian education system is heavily regulated by the government to maintain high standards (ESOS Act), ensuring students receive quality education.',
      whyStudy: [
        'Globally Recognized Degrees (Group of Eight)',
        'Dynamic Post-Study Work Stream (Subclass 485)',
        'High Minimum Wage for Part-time Workers',
        'Safe, Multicultural Cities like Sydney and Melbourne',
        'Focus on Practical and Research-based Learning',
      ],
      intakes: ['February (Major Intake)', 'July (Secondary Intake)', 'November (Fast-track/Limited courses)'],
      costs: {
        tuition: 'AUD 20,000 - 45,000 per year (Bachelor/Master)',
        living: 'AUD 24,505 per year (As per Department of Home Affairs)',
      },
      requirements: [
        'Valid Passport and Academic Documents',
        'English Proficiency: IELTS (6.0+), PTE (50+), or TOEFL',
        'Statement of Purpose (GTE/Genuine Student Requirement)',
        'Financial Stability Evidence (3 months bank balance)',
        'OSHC (Overseas Student Health Cover)',
      ],
      workRights: 'International students are permitted to work 48 hours per fortnight during sessions and unlimited hours during vacations.',
      popularCourses: [
        'Information Technology & Data Science',
        'Engineering (Civil, Electrical, Mechanical)',
        'Nursing & Health Sciences',
        'Accounting & Professional Year',
        'Tourism & Hospitality Management',
        'Business & MBA',
      ],
      admissionChecklist: [
        'Passport (Scanned Copy)',
        'Academic Transcripts & Certificates (SLC to Bachelor)',
        'IELTS / PTE / TOEFL Score Report',
        'Letter of Recommendations (Min 2)',
        'Resume / CV (Updated)',
        'Work Experience Letter (If applicable)',
        'Personal Statement (SOP)',
      ],
      visaChecklist: [
        'COE (Confirmation of Enrollment)',
        'CAAW (If under 18)',
        'Financial Evidence (Bank Balance or Education Loan)',
        'Relationship Proof Documents',
        'Property Valuation & Income Sources',
        'Police Clearance Certificate',
        'OSHC Payment Receipt',
        'Visa Application Fee Payment',
      ],
      faqs: [
        { question: 'What is GTE in Australia?', answer: 'GTE stands for Genuine Temporary Entrant. It is an integrity assessment that every international student must pass to prove that they genuinely intend to stay in Australia temporarily for the purpose of study.' },
        { question: 'Can I take my spouse to Australia?', answer: 'Yes, Australia allows international students to bring their dependent family members (spouse and children) as secondary applicants on their student visa.' },
        { question: 'Is the Post-Study Work (PSW) visa still available?', answer: 'Yes, graduates of Australian institutions are eligible for the Temporary Graduate Visa (subclass 485), which allows them to live and work in Australia for 2 to 4 years depending on their level of study.' },
        { question: "What is the English score requirement for a Bachelor's degree?", answer: 'Generally, an IELTS score of 6.0 with no band less than 5.5, or a PTE score of 50 with no score less than 42, is required for most undergraduate programs.' },
      ],
    },
  },
  {
    id: 'ca',
    country: 'Canada',
    count: 14,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop',
    highlight: 'Welcoming diverse society.',
    features: ['PGWP up to 3 Years', 'PR Friendly Policies', 'High Quality of Life', 'Co-op Programs', 'Work while studying'],
  },
  {
    id: 'cy',
    country: 'Cyprus',
    count: 6,
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
    highlight: 'Affordable European education.',
    features: ['Low Tuition Fees', 'No IELTS Required Options', 'Schengen Access (Ease)', 'Pleasant Climate', 'Work Rights Available'],
  },
  {
    id: 'fr',
    country: 'France',
    count: 9,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    highlight: 'Hub of Art and Culture.',
    features: ['Low Tuition in Public Unis', 'Post-Study Work Visa', 'Schengen Visa Travel', 'Internship Opportunities', 'Housing Assistance (CAF)'],
  },
  {
    id: 'ge',
    country: 'Georgia',
    count: 5,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop',
    highlight: 'Gateway to Europe.',
    features: ['No IELTS Required', 'Gap Accepted', 'Affordable Living Cost', 'Easy Admission Process', 'Schengen Transfer Options'],
  },
  {
    id: 'de',
    country: 'Germany',
    count: 15,
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=800&auto=format&fit=crop',
    highlight: 'Innovation & Engineering hub.',
    features: ['Free/Low Tuition Fees', '18-mo Job Search Visa', 'Strong Economy', 'Schengen Visa Travel', 'Part-time Work Allowed'],
  },
  {
    id: 'ie',
    country: 'Ireland',
    count: 7,
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800&auto=format&fit=crop',
    highlight: 'Silicon Valley of Europe.',
    features: ['2-Year Stay Back', 'English Speaking Country', 'Tech Hub Careers', 'High Quality Education', 'Part-time Work Rights'],
  },
  {
    id: 'jp',
    country: 'Japan',
    count: 13,
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
    highlight: 'Technology meets Tradition.',
    features: ['High Visa Success Rate', 'Part-time Work Allowed', 'Career Opportunities', 'Safe Environment', 'Scholarships Available'],
  },
  {
    id: 'mt',
    country: 'Malta',
    count: 5,
    image: 'https://images.unsplash.com/photo-1597500330999-7227d6200236?q=80&w=800&auto=format&fit=crop',
    highlight: 'English speaking Mediterranean gem.',
    features: ['Schengen Member State', 'Low Tuition Fees', 'English Speaking', 'Work Permit Possibilities', 'Simple Visa Process'],
  },
  {
    id: 'nl',
    country: 'Netherlands',
    count: 8,
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800&auto=format&fit=crop',
    highlight: 'Creative & International.',
    features: ['Orientation Year Visa', 'English Taught Programs', 'Central European Location', 'Innovative Teaching', 'High English Proficiency'],
  },
  {
    id: 'nz',
    country: 'New Zealand',
    count: 6,
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=800&auto=format&fit=crop',
    highlight: 'Adventure and Education.',
    features: ['Post-Study Work Rights', 'High Quality of Life', 'Safe & Peaceful', 'Research Opportunities', 'Spouse Visa Options'],
  },
  {
    id: 'kr',
    country: 'South Korea',
    count: 11,
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=800&auto=format&fit=crop',
    highlight: 'Leading in Technology.',
    features: ['High-Tech Industry Jobs', 'Generous Scholarships', 'Affordable Tuition', 'Cultural Experience', 'Part-time Work Rights'],
  },
  {
    id: 'ae',
    country: 'UAE',
    count: 10,
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop',
    highlight: 'Global Business Hub.',
    features: ['No Bank Balance Req', 'Easy Visa Process', 'Tax-Free Income Jobs', 'International Campuses', 'Safe & Modern City'],
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    count: 15,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    highlight: 'Academic Excellence.',
    features: ['Graduate Route (2 yrs)', 'Short Masters (1 yr)', 'World Renowned Unis', 'No IELTS Options', 'Spouse Visa Allowed'],
  },
  {
    id: 'us',
    country: 'USA',
    count: 14,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
    highlight: 'Land of Opportunity.',
    features: ['OPT/CPT Work Rights', 'STEM OPT Extension', 'Huge Scholarship Funds', 'Flexible Curriculum', 'Global Career Recognition'],
  },
];

export const LANGUAGES: LanguageClass[] = [
  { name: 'IELTS',    icon: 'globe' },
  { name: 'PTE',      icon: 'monitor' },
  { name: 'Duolingo', icon: 'feather' },
  { name: 'Korean',   icon: 'book' },
  { name: 'Japanese', icon: 'sun' },
  { name: 'German',   icon: 'map' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sushant Sharma',
    role: 'University of Tokyo',
    content: '"BrightPath guided me through every step of my Japan student visa. The language classes were top-notch!"',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    name: 'Anjali Shrestha',
    role: 'Sydney University',
    content: '"I was confused about documentation, but they made it so simple. Got my visa in 2 weeks."',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    name: 'Rohan Maharjan',
    role: 'Seoul National Univ.',
    content: "\"The team is very professional and friendly. They helped me get a scholarship I didn't even know existed.\"",
    avatar: 'https://picsum.photos/100/100?random=3',
  },
];

export const MILESTONES: Milestone[] = [
  { year: '2019', title: 'Establishment',       desc: 'Founded with a mission to guide students. Started South Korea program.' },
  { year: '2020', title: 'Pandemic Resilience', desc: 'Adapted to digital counseling during COVID-19, supporting students remotely.' },
  { year: '2022', title: 'Recovery & Growth',   desc: 'Operations returned to full scale. Record number of visas approved.' },
  { year: '2023', title: 'New Horizons',        desc: 'Expanded to UAE and Europe. Partnered with 50+ new universities.' },
  { year: '2025', title: 'Expansion',           desc: 'New corporate office launched. Integrated advanced language labs.' },
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Reasons to Study in Australia',
    excerpt: 'Discover why Australia remains a top destination for international students with its world-class education system and vibrant lifestyle.',
    content: `Australia has consistently ranked as one of the top destinations for international students worldwide. But what exactly makes it so special?

1. World-Class Education System: Home to many universities featured in the global top 100, Australian institutions offer rigorous academic standards and cutting-edge research opportunities.

2. Diversity and Inclusion: Australia is a melting pot of cultures, making it incredibly welcoming for students from Nepal and beyond.

3. Post-Study Work Opportunities: The Australian government offers attractive stay-back options for graduates, allowing them to gain valuable international work experience.

4. High Quality of Life: From the pristine beaches of Sydney to the cultural hub of Melbourne, students enjoy a lifestyle that is both safe and exciting.

5. Specialized Courses: Whether you are interested in Marine Biology, Engineering, or Hospitality, Australian universities offer specialized programs tailored to market demands.

BrightPath Nepal provides end-to-end guidance for students aiming for Australia. Visit our main office for a free profile assessment.`,
    date: 'Oct 24, 2024',
    author: 'Sita Lamsal',
    category: 'Study Abroad',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop',
    slug: 'top-5-reasons-australia',
  },
  {
    id: '2',
    title: 'How to Secure a Full Scholarship in USA',
    excerpt: 'A comprehensive guide on applying for fully funded scholarships in US universities, including tips on SOPs and essays.',
    content: `Securing a full scholarship in the USA is a dream for many Nepali students. While competitive, it is entirely possible with the right strategy.

Step 1: Start Early. Scholarship deadlines often fall much earlier than admission deadlines. Aim to start your search at least 12-18 months before you plan to enroll.

Step 2: Focus on Academic Excellence. Most full scholarships are merit-based. High GPA and standardized test scores (SAT/ACT/GRE) are crucial.

Step 3: Master the Personal Statement. Your SOP should tell a unique story that highlights your leadership potential and resilience.

Step 4: Research Financial Aid. Many top-tier US colleges are 'need-blind' for international students, meaning they will provide full funding if you are accepted.

Step 5: External Scholarships. Don't just look at university funding. Research Fulbright, Hubert Humphrey, and other international scholarship programs.

At BrightPath, we specialize in scholarship documentation. Our experts have helped hundreds of students secure significant financial aid in the US.`,
    date: 'Nov 12, 2024',
    author: 'Admin',
    category: 'Scholarships',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800&auto=format&fit=crop',
    slug: 'scholarship-guide-usa',
  },
  {
    id: '3',
    title: 'Understanding the Japan Student Visa Process',
    excerpt: 'Navigate the complexities of the Japanese student visa application. Learn about COE, documentation, and interview prep.',
    content: `Japan offers a unique blend of high-tech innovation and traditional culture. For Nepali students, it is an increasingly popular destination due to high visa success rates.

The process begins with the COE (Certificate of Eligibility). This is the most critical document, issued by the Japanese Immigration Bureau.

To obtain a COE, you must first apply to a Japanese language school or university. They will submit your documents to immigration on your behalf. Required documents typically include academic certificates, birth certificates, and solid financial proof of sponsorship.

Once the COE is granted, you can apply for the student visa at the Japanese Embassy in Kathmandu. Preparation is key—you should have basic Japanese language skills (NAT/JLPT N5 level) to ensure success.

BrightPath Nepal offers intensive Japanese language classes and expert visa guidance for Japan. Join our next batch today.`,
    date: 'Dec 05, 2024',
    author: 'Admin',
    category: 'Visa Guide',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    slug: 'japan-visa-process',
  },
  {
    id: '4',
    title: 'IELTS vs PTE: Which test is right for you?',
    excerpt: 'Comparing the two most popular English proficiency tests to help you decide which one matches your skills better.',
    content: 'Choosing between IELTS and PTE can be tricky. IELTS is more traditional while PTE is computer-based...',
    date: 'Jan 10, 2025',
    author: 'BrightPath Expert',
    category: 'Test Prep',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    slug: 'ielts-vs-pte',
  },
  {
    id: '5',
    title: 'The Rise of European Higher Education',
    excerpt: 'Why more students are choosing countries like Germany and France for their degrees in 2025.',
    content: 'Europe is becoming the new hub for international students due to low tuition and high lifestyle quality...',
    date: 'Feb 15, 2025',
    author: 'Admissions Team',
    category: 'Study Abroad',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
    slug: 'study-in-europe',
  },
  {
    id: '6',
    title: 'Post-Study Work Rights in UK for 2025',
    excerpt: 'Current updates on the Graduate Route visa and what it means for students planning to study in the United Kingdom.',
    content: 'The UK continues to offer excellent post-study work opportunities through its Graduate Route visa...',
    date: 'Feb 28, 2025',
    author: 'Legal Desk',
    category: 'Visa Updates',
    image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=800&auto=format&fit=crop',
    slug: 'uk-work-rights',
  },
];

export const BLOG_POSTS: BlogPost[] = Array.from({ length: 30 }).map((_, i) => {
  const original = INITIAL_BLOG_POSTS[i % INITIAL_BLOG_POSTS.length];
  const part = Math.floor(i / INITIAL_BLOG_POSTS.length);
  return {
    ...original,
    id: `${i + 1}`,
    title: part > 0 ? `${original.title} (Part ${part + 1})` : original.title,
    slug: part > 0 ? `${original.slug}-part-${part + 1}` : original.slug,
    date: `Mar ${i + 1}, 2025`,
  };
});