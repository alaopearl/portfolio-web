// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadStatus = "New" | "In Progress" | "Contacted" | "Closed";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  results: string[];
  demoUrl?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: { name: string; level: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  fileName?: string;
  status: LeadStatus;
  type: "service" | "quote";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type NinRequestStatus = "New" | "Contacted" | "Appointment Scheduled" | "Processing" | "Completed" | "Cancelled";
export type ProductCategory = "MiFi" | "4G Routers" | "5G Routers" | "Portable Wi-Fi" | "Other Connectivity Devices";
export type ProductAvailability = "In Stock" | "Low Stock" | "Out of Stock";

export interface NinService {
  id: string;
  title: string;
  description: string;
  price: string;
  enabled: boolean;
}

export interface NinRequest {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  service: string;
  preferredDate: string;
  method: "Virtual" | "Physical";
  notes: string;
  status: NinRequestStatus;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  networkType: string;
  keySpecification: string;
  price: string;
  stockQuantity: number;
  availability: ProductAvailability;
  imageUrl?: string;
  description: string;
  specifications: { label: string; value: string }[];
  warranty: string;
  deliveryInformation: string;
  featured: boolean;
  createdAt: string;
}

export interface ProductOrder {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  productId: string;
  productName: string;
  quantity: number;
  deliveryMethod: "Pickup" | "Delivery";
  deliveryAddress: string;
  instructions: string;
  status: "New" | "Contacted" | "Completed" | "Cancelled";
  createdAt: string;
}

export const NIN_SECURITY_NOTICE = "For your security, do not submit your NIN, OTP, passwords, PINs or other sensitive information through this public form unless specifically requested through an appropriate secure process.";
export const NIN_AUTHORITY_NOTICE = "We provide assistance with NIN-related processes and are not a government agency. Official registration, verification and approval remain subject to the relevant government authority.";

export const NIN_SERVICES: NinService[] = [
  { id: "nin-registration", title: "NIN Registration Assistance", description: "Help understanding and completing legitimate NIN registration processes.", price: "Contact for pricing", enabled: true },
  { id: "nin-modification", title: "NIN Modification / Update Assistance", description: "Assistance with legitimate NIN information update or modification processes.", price: "Contact for pricing", enabled: true },
  { id: "nin-verification", title: "NIN Verification Assistance", description: "Guidance related to legitimate NIN verification requirements.", price: "Contact for pricing", enabled: true },
  { id: "nin-information", title: "NIN Information & Support", description: "Clear help understanding NIN-related processes and requirements.", price: "Contact for pricing", enabled: true },
  { id: "nin-other", title: "Other NIN Services", description: "Ask about another legitimate NIN-related service.", price: "Contact for pricing", enabled: true },
];

export const PRODUCTS: Product[] = [];

export interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface PricingModel {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// ─── Contact & Links ──────────────────────────────────────────────────────────

export const CONTACT: ContactDetails = {
  phone: "08137162043",
  whatsapp: "08089489320",
  email: "alaopearl@gmail.com",
  address: "Virtual & Physical",
};

export const WHATSAPP_LINK = `https://wa.me/234${CONTACT.whatsapp}?text=Hello%20Abdullahi,%20I%20am%20interested%20in%20working%20with%20you%20on%20a%20project.`;
export const PHONE_LINK = `tel:${CONTACT.phone}`;
export const EMAIL_LINK = `mailto:${CONTACT.email}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "NIN Services", href: "#nin-services" },
  { label: "MiFi & Routers", href: "#mifi-routers" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "High-performance websites and web apps built with modern stacks for speed, SEO, and conversion.",
    icon: "Code",
    features: ["Responsive design", "SEO optimized", "Fast load times", "CMS integration"],
    startingPrice: "From $500",
  },
  {
    id: "react-development",
    title: "React Development",
    description: "Interactive single-page applications and component libraries with React, TypeScript, and Next.js.",
    icon: "Atom",
    features: ["Component architecture", "State management", "API integration", "Performance tuning"],
    startingPrice: "From $800",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Transform raw data into actionable insights with Python, SQL, and visualization dashboards.",
    icon: "ChartBar",
    features: ["Data cleaning", "Statistical modeling", "Dashboard creation", "Report generation"],
    startingPrice: "From $400",
  },
  {
    id: "ai-training",
    title: "AI Training & Data",
    description: "Custom AI model training, data labeling pipelines, and prompt engineering for business automation.",
    icon: "Brain",
    features: ["Model fine-tuning", "Dataset preparation", "Prompt design", "Deployment support"],
    startingPrice: "From $1000",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Brand identities, social media assets, and UI/UX design that communicates your value clearly.",
    icon: "Palette",
    features: ["Logo design", "Brand guidelines", "Social media kits", "UI mockups"],
    startingPrice: "From $300",
  },
  {
    id: "other",
    title: "Custom Solutions",
    description: "Have a unique challenge? Let's design a tailored technical solution for your specific needs.",
    icon: "Wrench",
    features: ["Discovery call", "Custom architecture", "Flexible scope", "Ongoing support"],
    startingPrice: "Let's talk",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [];

export const PROJECT_CATEGORIES = ["All", "Web Development", "React Development", "Data Analysis", "AI Training", "Graphic Design"];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS: Stat[] = [
  { id: "1", label: "Projects Built", value: "Add your number" },
  { id: "2", label: "Technologies", value: "Add your stack" },
  { id: "3", label: "Services Offered", value: "6 service areas" },
  { id: "4", label: "Availability", value: "Client-focused" },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend",
    skills: [
      { name: "React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    id: "backend",
    category: "Backend & Data",
    skills: [
      { name: "Python", level: 90 },
      { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 85 },
      { name: "SQL", level: 90 },
    ],
  },
  {
    id: "ai-ml",
    category: "AI & Machine Learning",
    skills: [
      { name: "LangChain", level: 85 },
      { name: "OpenAI API", level: 88 },
      { name: "Pandas", level: 90 },
      { name: "TensorFlow", level: 75 },
    ],
  },
  {
    id: "design",
    category: "Design & Tools",
    skills: [
      { name: "Figma", level: 80 },
      { name: "Git", level: 92 },
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 },
    ],
  },
];

// ─── Process ──────────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    id: "1",
    title: "Discovery",
    description: "We discuss your goals, challenges, and vision to define the perfect solution scope.",
    icon: "MagnifyingGlass",
  },
  {
    id: "2",
    title: "Design & Plan",
    description: "I create wireframes, architecture docs, and a clear project roadmap with milestones.",
    icon: "PenNib",
  },
  {
    id: "3",
    title: "Build & Test",
    description: "Development sprints with regular demos, thorough testing, and your feedback incorporated.",
    icon: "Code",
  },
  {
    id: "4",
    title: "Launch & Support",
    description: "Deployment, documentation, training, and ongoing support to ensure lasting success.",
    icon: "Rocket",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [];

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const PRICING_MODELS: PricingModel[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$500",
    period: "per project",
    description: "Perfect for small websites, landing pages, and quick data analysis tasks.",
    features: ["Single page or small site", "Basic SEO setup", "Mobile responsive", "1 revision round", "7-day delivery"],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,500",
    period: "per project",
    description: "Ideal for web apps, dashboards, and AI integrations with ongoing support.",
    features: ["Multi-page web app", "Custom design", "API integrations", "3 revision rounds", "30-day support", "Performance optimization"],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$5,000+",
    period: "per project",
    description: "Full-scale solutions with dedicated support, complex architecture, and team collaboration.",
    features: ["Complex architecture", "Dedicated project management", "Unlimited revisions", "90-day support", "Team training", "Priority response"],
  },
];

// ─── Why Work With Me ─────────────────────────────────────────────────────────

export const WHY_POINTS = [
  { title: "Results-Driven", description: "Every project is measured by business impact, not just code shipped.", icon: "Trophy" },
  { title: "Fast Turnaround", description: "Agile workflow with regular demos means you see progress from week one.", icon: "Lightning" },
  { title: "Clean Code", description: "Maintainable, well-documented code that your future team will thank you for.", icon: "BracketsCurly" },
  { title: "Direct Communication", description: "No middlemen. You work directly with me from start to finish.", icon: "ChatsCircle" },
];

// ─── Seed Inquiries ───────────────────────────────────────────────────────────

export const SEED_INQUIRIES: Inquiry[] = [
  {
    id: "seed-1",
    name: "James Wilson",
    email: "james@startup.co",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    service: "Web Development",
    budget: "$1,000 - $3,000",
    timeline: "2-4 weeks",
    message: "Need a modern landing page for our SaaS product launch.",
    status: "New",
    type: "service",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-2",
    name: "Fatima Ahmed",
    email: "fatima@corp.ng",
    phone: "+2348012345678",
    whatsapp: "+2348012345678",
    service: "Data Analysis",
    budget: "$500 - $1,000",
    timeline: "1-2 weeks",
    message: "Looking for someone to build a sales analytics dashboard for our retail chain.",
    status: "In Progress",
    type: "quote",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

// ─── Budget & Timeline Options ────────────────────────────────────────────────

export const BUDGET_OPTIONS = ["Under $500", "$500 - $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $10,000", "$10,000+", "Not sure yet"];
export const TIMELINE_OPTIONS = ["ASAP", "1-2 weeks", "2-4 weeks", "1-2 months", "3+ months", "Flexible"];
export const SERVICE_OPTIONS = ["Web Development", "React Development", "Data Analysis", "AI Training & Data", "Graphic Design", "Custom Solutions"];
