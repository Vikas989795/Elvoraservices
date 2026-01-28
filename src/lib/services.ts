import {
  Landmark,
  Banknote,
  Shield,
  TrendingUp,
  Briefcase,
  Laptop,
  Megaphone,
  Fingerprint,
  CreditCard,
  Building,
  Scroll,
  HeartHandshake,
  Car,
  Home,
  Cloud,
  Layers,
  BarChart,
  UserCheck,
  FileText,
  Wallet
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceOption {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
}

export interface ServiceCategory {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  options: ServiceOption[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'Government Services',
    slug: 'government',
    icon: Landmark,
    description: 'Assistance with various government-issued documents and services.',
    options: [
      { name: 'PAN Card', slug: 'pan-card', icon: CreditCard, description: 'Apply for a new PAN card or make corrections to an existing one.' },
      { name: 'Aadhaar Card', slug: 'aadhaar-card', icon: UserCheck, description: 'Services for Aadhaar enrollment, updates, and corrections.' },
      { name: 'Passport', slug: 'passport', icon: FileText, description: 'Guidance and application support for obtaining a new passport.' },
    ],
  },
  {
    name: 'Banking Services',
    slug: 'banking',
    icon: Banknote,
    description: 'Facilitating a range of banking transactions and account services.',
    options: [
      { name: 'Account Opening', slug: 'account-opening', icon: Wallet, description: 'Assistance with opening savings and current accounts in various banks.' },
      { name: 'Money Transfer', slug: 'money-transfer', icon: TrendingUp, description: 'Secure and fast domestic money transfer services.' },
      { name: 'Credit Card Apply', slug: 'credit-card-apply', icon: CreditCard, description: 'Helping you choose and apply for the right credit card.' },
    ],
  },
  {
    name: 'AEPS',
    slug: 'aeps',
    icon: Fingerprint,
    description: 'Aadhaar Enabled Payment System for easy and secure transactions.',
    options: [
      { name: 'Cash Withdrawal', slug: 'cash-withdrawal', icon: Banknote, description: 'Withdraw cash from your bank account using your Aadhaar number.' },
      { name: 'Balance Enquiry', slug: 'balance-enquiry', icon: BarChart, description: 'Check your bank account balance securely with your fingerprint.' },
      { name: 'Mini Statement', slug: 'mini-statement', icon: Scroll, description: 'Get a mini statement of your recent transactions via AEPS.' },
    ],
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    icon: Shield,
    description: 'Connecting you with authorized insurers for your protection needs.',
    options: [
      { name: 'Health Insurance', slug: 'health-insurance', icon: HeartHandshake, description: 'Find and apply for health insurance plans that fit your needs.' },
      { name: 'Motor Insurance', slug: 'motor-insurance', icon: Car, description: 'Assistance with securing insurance for your car or two-wheeler.' },
      { name: 'Home Insurance', slug: 'home-insurance', icon: Home, description: 'Protect your home and belongings with the right insurance cover.' },
    ],
  },
  {
    name: 'Investment',
    slug: 'investment',
    icon: TrendingUp,
    description: 'Guidance on various investment opportunities to grow your wealth.',
    options: [
      { name: 'Mutual Funds', slug: 'mutual-funds', icon: Layers, description: 'Facilitating investments in a wide range of mutual fund schemes.' },
      { name: 'Stock Market', slug: 'stock-market', icon: BarChart, description: 'Assistance with demat account opening and stock trading.' },
    ],
  },
  {
    name: 'Business Services',
    slug: 'business',
    icon: Briefcase,
    description: 'Comprehensive support for starting and managing your business.',
    options: [
      { name: 'Company Registration', slug: 'company-registration', icon: Building, description: 'Helping you with the legal process of registering your company.' },
      { name: 'GST Registration', slug: 'gst-registration', icon: Scroll, description: 'Complete assistance for Goods and Services Tax (GST) registration.' },
    ],
  },
  {
    name: 'Cyber Cafe',
    slug: 'cyber-cafe',
    icon: Laptop,
    description: 'A wide array of online services provided at your convenience.',
    options: [
      { name: 'Online Applications', slug: 'online-applications', icon: FileText, description: 'Filling and submitting various online forms and applications.' },
      { name: 'Document Scanning', slug: 'document-scanning', icon: Scroll, description: 'High-quality scanning and digital storage of your important documents.' },
    ],
  },
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: Megaphone,
    description: 'Helping businesses grow their online presence and reach.',
    options: [
      { name: 'Social Media Management', slug: 'social-media-management', icon: Users, description: 'Managing and growing your brand on social media platforms.' },
      { name: 'Website Development', slug: 'website-development', icon: Cloud, description: 'Creating professional and responsive websites for your business.' },
    ],
  },
];
