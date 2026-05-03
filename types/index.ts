export interface Instructor {
  name: string;
  role: string;
  credentials: string[];
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  icon: string;
  slug: string;
  points?: string[];
  methodology?: string;
  detailedProcess?: { title: string; desc: string }[];
  credentials?: string[];
  team?: Instructor[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface DestinationDetail {
  overview: string;
  whyStudy: string[];
  intakes: string[];
  costs: {
    tuition: string;
    living: string;
  };
  requirements: string[];
  workRights: string;
  popularCourses?: string[];
  admissionChecklist?: string[];
  visaChecklist?: string[];
  faqs?: FAQ[];
}

export interface Destination {
  id: string;
  country: string;
  count: number;
  image: string;
  description?: string;
  highlight: string;
  features: string[];
  details?: DestinationDetail;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  attachmentName?: string;
}

export interface LeadProfile {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  nationality?: string;
  qualification?: string;
  academicScore?: string;
  passingYear?: string;
  faculty?: string;
  englishTest?: string;
  englishScore?: string;
  budget?: string;
  preferredCountry?: string;
  preferredCourse?: string;
  backlogs?: string;
  verificationStatus: 'unverified' | 'analyzing' | 'verified';
}

export interface Testimonial {
  id: string;
  content: string;
  name: string;
  role: string;
  avatar: string;
}

export interface LanguageClass {
  name: string;
  icon: string;
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface Scholarship {
  title: string;
  country: string;
  amount: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  categoryId?: number;
  tags?: string[];
  image: string;
  slug: string;
}