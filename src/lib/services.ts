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
  Wallet,
  Users,
  Building2,
  Server,
  BookUser,
  WalletCards,
  PiggyBank,
  HandCoins,
  Newspaper,
  Store,
  Coins,
  FileCheck2,
  Network,
  Smartphone,
  QrCode,
  Package,
  GitBranch,
  School,
  ArrowRightLeft,
  GanttChartSquare,
  CandlestickChart,
  Globe,
  CircleDollarSign,
  LifeBuoy,
  Scale,
  Receipt
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceOption {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  options?: ServiceOption[];
}

export interface ServiceCategory extends ServiceOption {}

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
      {
        name: 'Public Sector Banks',
        slug: 'public-sector-banks',
        icon: Building2,
        description: 'Services related to major public sector banks in India.',
        options: [
          { name: 'State Bank of India (SBI)', slug: 'sbi', icon: School, description: 'Services for SBI customers.', options: [
              { name: 'Savings & Current Account', slug: 'accounts', icon: Wallet, description: 'Information on opening and managing accounts.'},
              { name: 'AEPS Support', slug: 'aeps', icon: Fingerprint, description: 'Aadhaar Enabled Payment System with SBI.'},
              { name: 'BC / Bank Mitra Info', slug: 'bc-mitra', icon: Users, description: 'Information about Business Correspondent services.'},
              { name: 'Micro-ATM Info', slug: 'micro-atm', icon: Laptop, description: 'Details on Micro-ATM services.'},
          ]},
          { name: 'Punjab National Bank (PNB)', slug: 'pnb', icon: School, description: 'Services for PNB customers.' },
          { name: 'Bank of Baroda (BoB)', slug: 'bob', icon: School, description: 'Services for Bank of Baroda customers.' },
          { name: 'Canara Bank', slug: 'canara-bank', icon: School, description: 'Services for Canara Bank customers.' },
          { name: 'Union Bank of India', slug: 'union-bank', icon: School, description: 'Services for Union Bank of India customers.' },
          { name: 'Punjab & Sind Bank (PSB)', slug: 'psb', icon: School, description: 'Services for Punjab & Sind Bank customers.' },
        ]
      },
      {
        name: 'Private Sector Banks',
        slug: 'private-sector-banks',
        icon: Building,
        description: 'Services related to major private sector banks.',
        options: [
          { name: 'HDFC Bank', slug: 'hdfc', icon: Building, description: 'Services for HDFC Bank customers.'},
          { name: 'ICICI Bank', slug: 'icici', icon: Building, description: 'Services for ICICI Bank customers.'},
          { name: 'Axis Bank', slug: 'axis', icon: Building, description: 'Services for Axis Bank customers.'},
          { name: 'Kotak Mahindra Bank', slug: 'kotak', icon: Building, description: 'Services for Kotak Mahindra Bank customers.'},
          { name: 'IDFC FIRST Bank', slug: 'idfc', icon: Building, description: 'Services for IDFC FIRST Bank customers.'},
          { name: 'Yes Bank', slug: 'yes-bank', icon: Building, description: 'Services for Yes Bank customers.'},
          { name: 'RBL Bank', slug: 'rbl', icon: Building, description: 'Services for RBL Bank customers.'},
        ]
      },
       {
        name: 'Small Finance Banks',
        slug: 'small-finance-banks',
        icon: PiggyBank,
        description: 'Services related to small finance banks.',
        options: [
            { name: 'AU Small Finance Bank', slug: 'au-sfb', icon: PiggyBank, description: 'Services for AU SFB.'},
            { name: 'Ujjivan Small Finance Bank', slug: 'ujjivan-sfb', icon: PiggyBank, description: 'Services for Ujjivan SFB.'},
            { name: 'Equitas SFB', slug: 'equitas-sfb', icon: PiggyBank, description: 'Services for Equitas SFB.'},
        ]
      },
      {
        name: 'Payment Banks',
        slug: 'payment-banks',
        icon: WalletCards,
        description: 'Services related to various payment banks in India.',
        options: [
            { name: 'Airtel Payments Bank', slug: 'airtel-payments', icon: Smartphone, description: 'AEPS, UPI, and other services.'},
            { name: 'Paytm Payments Bank', slug: 'paytm-payments', icon: Smartphone, description: 'Wallet, UPI, and banking services.'},
            { name: 'India Post Payments Bank', slug: 'ippb', icon: Smartphone, description: 'Government-backed payment bank services.'},
            { name: 'Fino Payments Bank', slug: 'fino-payments', icon: Smartphone, description: 'Services by Fino Payments Bank.'},
            { name: 'Jio Payments Bank', slug: 'jio-payments', icon: Smartphone, description: 'Services by Jio Payments Bank.'},
        ]
      },
    ],
  },
  {
    name: 'AEPS',
    slug: 'aeps',
    icon: Fingerprint,
    description: 'Aadhaar Enabled Payment System for easy and secure transactions.',
    options: [
      { name: 'AEPS Transactions', slug: 'aeps-transactions', icon: ArrowRightLeft, description: 'Core AEPS functionalities.', options: [
        { name: 'Cash Withdrawal', slug: 'cash-withdrawal', icon: Banknote, description: 'Withdraw cash from your bank account using your Aadhaar number.' },
        { name: 'Balance Enquiry', slug: 'balance-enquiry', icon: BarChart, description: 'Check your bank account balance securely with your fingerprint.' },
        { name: 'Mini Statement', slug: 'mini-statement', icon: GanttChartSquare, description: 'Get a mini statement of your recent transactions via AEPS.' },
      ]},
      {
        name: 'AEPS Networks',
        slug: 'aeps-networks',
        icon: Network,
        description: 'Connecting with various financial inclusion networks.',
        options: [
          { name: 'BankMitra (CSC AEPS)', slug: 'bankmitra', icon: Users, description: 'Services via the BankMitra CSC network.'},
          { name: 'PayNearby', slug: 'paynearby', icon: Store, description: 'Financial services through PayNearby.'},
          { name: 'Eko India Financial Services', slug: 'eko', icon: HandCoins, description: 'AEPS and recharge services.'},
          { name: 'Spice Money', slug: 'spice-money', icon: Coins, description: 'Transactions, transfers, and bookings.'},
        ]
      },
      {
        name: 'NPCI System',
        slug: 'npci-system',
        icon: Server,
        description: 'Services under the National Payments Corporation of India.',
        options: [
          { name: 'Fund Transfer / UPI', slug: 'fund-transfer-upi', icon: QrCode, description: 'UPI and fund transfer information.'},
        ]
      }
    ],
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    icon: Shield,
    description: 'Connecting you with authorized insurers for your protection needs.',
    options: [
      {
        name: 'Life Insurance',
        slug: 'life-insurance',
        icon: HeartHandshake,
        description: 'Protecting your family\'s future with life insurance policies.',
        options: [
          { name: 'LIC of India', slug: 'lic', icon: LifeBuoy, description: 'Life Insurance Corporation of India.' },
          { name: 'HDFC Life', slug: 'hdfc-life', icon: LifeBuoy, description: 'HDFC Life Insurance Co. Ltd.' },
          { name: 'ICICI Prudential', slug: 'icici-prudential', icon: LifeBuoy, description: 'ICICI Prudential Life Insurance Co. Ltd.' },
          { name: 'SBI Life', slug: 'sbi-life', icon: LifeBuoy, description: 'SBI Life Insurance Co. Ltd.' },
          { name: 'Bajaj Allianz Life', slug: 'bajaj-allianz-life', icon: LifeBuoy, description: 'Bajaj Allianz Life Insurance Co. Ltd.' },
        ]
      },
      {
        name: 'General Insurance',
        slug: 'general-insurance',
        icon: Package,
        description: 'Cover for your health, vehicle, and property.',
        options: [
          { name: 'Motor Insurance', slug: 'motor-insurance', icon: Car, description: 'Assistance with securing insurance for your car or two-wheeler.' },
          { name: 'Health Insurance', slug: 'health-insurance', icon: HeartHandshake, description: 'Find and apply for health insurance plans that fit your needs.' },
          { name: 'Home Insurance', slug: 'home-insurance', icon: Home, description: 'Protect your home and belongings with the right insurance cover.' },
          { name: 'SBI General Insurance', slug: 'sbi-general', icon: Shield, description: 'General insurance from SBI.' },
          { name: 'ICICI Lombard', slug: 'icici-lombard', icon: Shield, description: 'General insurance from ICICI Lombard.' },
          { name: 'HDFC ERGO', slug: 'hdfc-ergo', icon: Shield, description: 'General insurance from HDFC ERGO.' },
        ]
      },
    ],
  },
  {
    name: 'Investment',
    slug: 'investment',
    icon: TrendingUp,
    description: 'Guidance on various investment opportunities to grow your wealth.',
    options: [
       {
        name: 'Demat & Securities',
        slug: 'demat-securities',
        icon: CandlestickChart,
        description: 'Services for trading and holding securities.',
        options: [
          { name: 'Demat Account Opening', slug: 'demat-opening', icon: BookUser, description: 'Open a Demat account with leading brokers.'},
          { name: 'NSDL Services', slug: 'nsdl', icon: Server, description: 'Services from National Securities Depository Limited.'},
          { name: 'CDSL Services', slug: 'cdsl', icon: Server, description: 'Services from Central Depository Services Ltd.'},
        ]
      },
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
      { name: 'GST Registration', slug: 'gst-registration', icon: Receipt, description: 'Complete assistance for Goods and Services Tax (GST) registration.' },
      { name: 'ITR Filing', slug: 'itr-filing', icon: FileCheck2, description: 'Assistance with filing your Income Tax Returns.' },
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
    name: 'Digital & Fintech',
    slug: 'digital-fintech',
    icon: CircleDollarSign,
    description: 'Digital marketing and financial technology solutions.',
    options: [
       { name: 'Social Media Management', slug: 'social-media-management', icon: Users, description: 'Managing and growing your brand on social media platforms.' },
       { name: 'Website Development', slug: 'website-development', icon: Globe, description: 'Creating professional and responsive websites for your business.' },
       { name: 'PhonePe Services', slug: 'phonepe', icon: Smartphone, description: 'Utilize PhonePe for UPI and other transactions.' },
       { name: 'PayNearby', slug: 'paynearby', icon: Store, description: 'AEPS and bill payment services.'},
    ],
  },
];
