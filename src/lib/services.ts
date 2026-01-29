import {
  Landmark, Banknote, Shield, TrendingUp, Briefcase, Laptop, Megaphone, FileText, Store,
  Building2, Building, Smartphone, PiggyBank,
  UserCheck, CreditCard, Vote, Car, Scroll, FileCheck, CircleDollarSign,
  ArrowRightLeft, BarChart, GanttChartSquare, QrCode,
  HeartHandshake, Home, Package, LifeBuoy,
  CandlestickChart, Layers,
  Receipt,
  Scan, Printer, FileUp,
  Globe, Users, Search, Bot, Sparkles, Languages,
  BookUser, Server, WalletCards, HandCoins, Newspaper, Coins, FileCheck2, Network, GitBranch, School, Scale, BrainCircuit,
  Wallet, Tractor, User, Award, Library, BadgePercent, Star, Handshake, Milestone
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceOption {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  options?: ServiceOption[];
}

export interface ServiceCategory extends ServiceOption { }

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'Banking & Financial Services',
    slug: 'banking-financial-services',
    icon: Banknote,
    description: 'Facilitation for a wide range of banking services. Subject to first-party approval.',
    options: [
      {
        name: 'Bank Categories',
        slug: 'bank-categories',
        icon: Library,
        description: 'Services across Government, Private, Payment, and Small Finance Banks.',
        options: [
          {
            name: 'Government Banks',
            slug: 'government-banks',
            icon: Building2,
            description: 'Facilitation for major public sector banks.',
            options: [
              { name: 'State Bank of India (SBI)', slug: 'sbi', icon: School, description: 'Assistance with SBI services.' },
              { name: 'Punjab National Bank (PNB)', slug: 'pnb', icon: School, description: 'Assistance with PNB services.' },
              { name: 'Bank of Baroda (BoB)', slug: 'bob', icon: School, description: 'Assistance with BoB services.' },
              { name: 'Canara Bank', slug: 'canara-bank', icon: School, description: 'Assistance with Canara Bank services.' },
              { name: 'Union Bank of India', slug: 'union-bank', icon: School, description: 'Assistance with Union Bank services.' },
              { name: 'Bank of India', slug: 'boi', icon: School, description: 'Assistance with BOI services.' },
            ]
          },
          {
            name: 'Private Banks',
            slug: 'private-banks',
            icon: Building,
            description: 'Facilitation for leading private sector banks.',
            options: [
              { name: 'HDFC Bank', slug: 'hdfc', icon: Building, description: 'Assistance with HDFC Bank services.' },
              { name: 'ICICI Bank', slug: 'icici', icon: Building, description: 'Assistance with ICICI Bank services.' },
              { name: 'Axis Bank', slug: 'axis', icon: Building, description: 'Assistance with Axis Bank services.' },
              { name: 'Kotak Mahindra Bank', slug: 'kotak', icon: Building, description: 'Assistance with Kotak services.' },
              { name: 'IndusInd Bank', slug: 'indusind', icon: Building, description: 'Assistance with IndusInd Bank services.' },
              { name: 'IDFC FIRST Bank', slug: 'idfc', icon: Building, description: 'Assistance with IDFC FIRST Bank services.' },
              { name: 'Yes Bank', slug: 'yes-bank', icon: Building, description: 'Assistance with Yes Bank services.' },
              { name: 'RBL Bank', slug: 'rbl', icon: Building, description: 'Assistance with RBL Bank services.' },
            ]
          },
          {
            name: 'Payment Banks',
            slug: 'payment-banks',
            icon: Smartphone,
            description: 'Facilitation for innovative payment banks.',
            options: [
              { name: 'Airtel Payments Bank', slug: 'airtel-payments', icon: Smartphone, description: 'Assistance with Airtel Payments Bank.' },
              { name: 'Paytm Payments Bank', slug: 'paytm-payments', icon: Smartphone, description: 'Assistance with Paytm Payments Bank.' },
              { name: 'India Post Payments Bank', slug: 'ippb', icon: Smartphone, description: 'Assistance with IPPB services.' },
              { name: 'Fino Payments Bank', slug: 'fino-payments', icon: Smartphone, description: 'Assistance with Fino Payments Bank.' },
              { name: 'Jio Payments Bank', slug: 'jio-payments', icon: Smartphone, description: 'Assistance with Jio Payments Bank.' },
              { name: 'Aditya Birla Idea Payments Bank', slug: 'abipb', icon: Smartphone, description: 'Assistance with Aditya Birla Payments Bank.' },
            ]
          },
          {
            name: 'Small Finance Banks',
            slug: 'small-finance-banks',
            icon: PiggyBank,
            description: 'Facilitation for specialized small finance banks.',
            options: [
              { name: 'AU Small Finance Bank', slug: 'au-sfb', icon: PiggyBank, description: 'Assistance with AU SFB.' },
              { name: 'Equitas Small Finance Bank', slug: 'equitas-sfb', icon: PiggyBank, description: 'Assistance with Equitas SFB.' },
              { name: 'Ujjivan Small Finance Bank', slug: 'ujjivan-sfb', icon: PiggyBank, description: 'Assistance with Ujjivan SFB.' },
              { name: 'ESAF Small Finance Bank', slug: 'esaf-sfb', icon: PiggyBank, description: 'Assistance with ESAF SFB.' },
              { name: 'Fincare Small Finance Bank', slug: 'fincare-sfb', icon: PiggyBank, description: 'Assistance with Fincare SFB.' },
              { name: 'Jana Small Finance Bank', slug: 'jana-sfb', icon: PiggyBank, description: 'Assistance with Jana SFB.' },
              { name: 'Suryoday Small Finance Bank', slug: 'suryoday-sfb', icon: PiggyBank, description: 'Assistance with Suryoday SFB.' },
            ]
          },
        ]
      },
      {
        name: 'Bank Services',
        slug: 'bank-services',
        icon: Milestone,
        description: 'Core banking service facilitation for any bank.',
        options: [
          {
            name: 'Account Opening Assistance',
            slug: 'account-opening',
            icon: BookUser,
            description: 'Guidance on opening Savings and Current accounts.',
            options: [
              { name: 'Savings Account', slug: 'savings-account', icon: Wallet, description: 'Eligibility, documents, and KYC process guidance.' },
              { name: 'Current Account', slug: 'current-account', icon: Briefcase, description: 'Business eligibility and bank coordination support.' }
            ]
          },
          {
            name: 'AEPS Services',
            slug: 'aeps-services-info',
            icon: UserCheck,
            description: 'Information on Aadhaar Enabled Payment System.',
            options: [
              { name: 'Cash Withdrawal', slug: 'aeps-cash-withdrawal', icon: Banknote, description: 'Info on biometric authentication and limits.' },
              { name: 'Balance Enquiry', slug: 'aeps-balance-enquiry', icon: BarChart, description: 'Guidance on checking balance via AEPS.' },
              { name: 'Mini Statement', slug: 'aeps-mini-statement', icon: GanttChartSquare, description: 'Information on getting transaction statements.' }
            ]
          },
          {
            name: 'Cash Services',
            slug: 'cash-services',
            icon: HandCoins,
            description: 'Information on cash deposit and withdrawal services.',
            options: [
              { name: 'Cash Deposit Information', slug: 'cash-deposit', icon: FileCheck2, description: 'Guidance on branch or BC point deposits.' },
              { name: 'Cash Withdrawal Information', slug: 'cash-withdrawal', icon: Banknote, description: 'Guidance on withdrawal processes.' }
            ]
          },
          {
            name: 'Other Banking Support',
            slug: 'other-banking-support',
            icon: Handshake,
            description: 'Assistance with other essential banking tasks.',
            options: [
              { name: 'Jan Dhan Account Assistance', slug: 'jan-dhan', icon: Users, description: 'Guidance on PMJDY accounts.' },
              { name: 'Bank KYC Update Guidance', slug: 'kyc-update', icon: UserCheck, description: 'Assistance with the KYC update process.' },
              { name: 'Account Linking Support', slug: 'account-linking', icon: GitBranch, description: 'Guidance for linking Mobile/Aadhaar.' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Digital Payment & Fintech',
    slug: 'digital-payment-fintech',
    icon: WalletCards,
    description: 'Facilitating modern digital payment and financial technology services.',
    options: [
      { name: 'Aadhaar Enabled Payment System (AEPS)', slug: 'aeps', icon: UserCheck, description: 'Core AEPS services including withdrawal and balance enquiry.' },
      { name: 'Micro-ATM Assistance', slug: 'micro-atm', icon: Laptop, description: 'Guidance on using Micro-ATM devices for transactions.' },
      { name: 'UPI Onboarding Support', slug: 'upi-onboarding', icon: QrCode, description: 'Assistance with UPI registration and bank account linking.' },
      { name: 'Bill Payment Assistance', slug: 'bill-payment', icon: Receipt, description: 'Facilitating utility bill payments for electricity, gas, etc.' },
      { name: 'Mobile / DTH / Utility Recharge', slug: 'recharge', icon: Smartphone, description: 'Assistance with mobile, DTH, and other recharges.' },
      { name: 'FASTag Assistance', slug: 'fastag', icon: Car, description: 'Guidance on FASTag application and recharge.' },
      { name: 'Digital Wallet Guidance', slug: 'digital-wallet', icon: Wallet, description: 'Informational support for various digital wallets.' },
      { name: 'BC / Banking Point Assistance', slug: 'bc-banking-point', icon: Users, description: 'Guidance on becoming a Business Correspondent.' },
      { name: 'Spice Money / Spice Pay (Info)', slug: 'spice-money-info', icon: Coins, description: 'Informational guidance on Spice Money services.' },
    ]
  },
  {
    name: 'Government & CSC Services',
    slug: 'government-csc-services',
    icon: Landmark,
    description: 'Assistance with a wide array of government and CSC-related services.',
    options: [
      {
        name: 'Identity & Certificates',
        slug: 'identity-certificates',
        icon: Award,
        description: 'Assistance for Aadhaar, PAN, and other essential certificates.',
        options: [
          { name: 'Aadhaar Enrolment / Update', slug: 'aadhaar-services', icon: UserCheck, description: 'Guidance on new enrolment and updates.' },
          { name: 'PAN Card Application', slug: 'pan-card-services', icon: CreditCard, description: 'Support for new PAN and correction applications.' },
          { name: 'Voter ID Application Support', slug: 'voter-id', icon: Vote, description: 'Assistance with new registration and corrections.' },
          { name: 'Birth Certificate Support', slug: 'birth-certificate', icon: FileText, description: 'Guidance on the application process.' },
          { name: 'Death Certificate Support', slug: 'death-certificate', icon: FileText, description: 'Guidance on the application process.' }
        ]
      },
      {
        name: 'Transport & Travel',
        slug: 'transport-travel',
        icon: Car,
        description: 'Facilitation for driving licenses and passports.',
        options: [
          { name: 'Driving License Assistance', slug: 'driving-license', icon: Car, description: 'Guidance for new and renewal applications.' },
          { name: 'Learning License Assistance', slug: 'learning-license', icon: Car, description: 'Support for learning license applications.' },
          { name: 'Passport Application Guidance', slug: 'passport-application', icon: FileCheck2, description: 'Help with the passport application process.' }
        ]
      },
      {
        name: 'Social & Government Schemes',
        slug: 'social-government-schemes',
        icon: Users,
        description: 'Informational assistance for key government welfare schemes.',
        options: [
          { name: 'Ration Card Assistance', slug: 'ration-card', icon: FileText, description: 'Guidance on ration card applications.' },
          { name: 'Income/Caste/Domicile Certificate', slug: 'certificates', icon: FileText, description: 'Assistance with various state certificates.' },
          { name: 'PM Kisan Scheme Assistance', slug: 'pm-kisan', icon: HandCoins, description: 'Guidance on the PM Kisan scheme.' },
          { name: 'Pension Scheme Facilitation', slug: 'pension-scheme', icon: Users, description: 'Information on various pension schemes.' },
          { name: 'Ayushman Bharat Guidance', slug: 'ayushman-bharat', icon: HeartHandshake, description: 'Awareness and guidance on Ayushman Bharat.' },
          { name: 'PMJJBY / PMSBY Assistance', slug: 'pmjjby-pmsby', icon: Shield, description: 'Information on government insurance schemes.' }
        ]
      },
      {
        name: 'Education & Public Services',
        slug: 'education-public-services',
        icon: School,
        description: 'Support for scholarship and exam form submissions.',
        options: [
          { name: 'Scholarship Application Support', slug: 'scholarship-application', icon: BadgePercent, description: 'Assistance with filling scholarship forms.' },
          { name: 'Exam Form Filling', slug: 'exam-form', icon: FileCheck2, description: 'Help with online examination forms.' },
          { name: 'Online Government Form Filling', slug: 'online-forms', icon: Laptop, description: 'General support for filling government forms.' }
        ]
      },
    ]
  },
  {
    name: 'Insurance Services',
    slug: 'insurance-services',
    icon: Shield,
    description: 'Connecting you with authorized insurers (facilitation only, no selling).',
    options: [
      {
        name: 'Insurance Types',
        slug: 'insurance-types',
        icon: Layers,
        description: 'Informational guidance on various insurance categories.',
        options: [
          { name: 'Life Insurance', slug: 'life-insurance', icon: HeartHandshake, description: 'Information on term and endowment plans.' },
          { name: 'Health Insurance', slug: 'health-insurance', icon: HeartHandshake, description: 'Information on individual and family floater plans.' },
          { name: 'Motor Insurance', slug: 'motor-insurance', icon: Car, description: 'Guidance on bike, car, and commercial vehicle insurance.' },
          { name: 'Travel Insurance', slug: 'travel-insurance', icon: Globe, description: 'Information on travel protection plans.' },
          { name: 'Personal Accident Insurance', slug: 'personal-accident-insurance', icon: Shield, description: 'Information on accident coverage plans.' }
        ]
      },
      {
        name: 'Insurance Companies (Info)',
        slug: 'insurance-companies-info',
        icon: Building,
        description: 'Informational guidance on major insurance providers.',
        options: [
          { name: 'SBI Life Insurance', slug: 'sbi-life', icon: Building, description: 'Information on SBI Life products.' },
          { name: 'ICICI Prudential Life Insurance', slug: 'icici-prudential', icon: Building, description: 'Information on ICICI Prudential products.' },
          { name: 'Bajaj Allianz Life Insurance', slug: 'bajaj-allianz', icon: Building, description: 'Information on Bajaj Allianz products.' },
          { name: 'Max Life Insurance', slug: 'max-life', icon: Building, description: 'Information on Max Life products.' },
          { name: 'Go Digit General Insurance', slug: 'go-digit', icon: Building, description: 'Information on Go Digit products.' }
        ]
      }
    ]
  },
  {
    name: 'Investment & Financial Awareness',
    slug: 'investment-financial-awareness',
    icon: TrendingUp,
    description: 'Guidance and awareness on various investment and financial products.',
    options: [
      { name: 'Demat Account Assistance', slug: 'demat-account', icon: BookUser, description: 'Guidance on opening a Demat account with brokers.' },
      { name: 'Mutual Fund Information Support', slug: 'mutual-funds', icon: Layers, description: 'Explaining the basics of mutual funds.' },
      { name: 'SIP Guidance', slug: 'sip-guidance', icon: BarChart, description: 'Information on Systematic Investment Plans.' },
      { name: 'National Pension Scheme (NPS)', slug: 'nps-guidance', icon: Users, description: 'Guidance on the NPS retirement savings scheme.' },
      { name: 'Fixed Deposit Information', slug: 'fixed-deposit', icon: PiggyBank, description: 'Awareness about fixed deposit investments.' },
      { name: 'Credit Score Guidance', slug: 'credit-score', icon: Star, description: 'Information on checking and understanding your credit score.' },
      { name: 'Loan Guidance', slug: 'loan-guidance', icon: CircleDollarSign, description: 'Informational support on personal, business, or MSME loans.' },
    ]
  },
  {
    name: 'Business & Enterprise Services',
    slug: 'business-enterprise-services',
    icon: Briefcase,
    description: 'Comprehensive support for starting and managing your business.',
    options: [
      {
        name: 'Registration & Compliance',
        slug: 'registration-compliance',
        icon: FileCheck2,
        description: 'Assistance with various business registrations.',
        options: [
          { name: 'MSME / Udyam Registration', slug: 'msme-udyam', icon: Briefcase, description: 'Guidance on Udyam registration.' },
          { name: 'GST Registration Guidance', slug: 'gst-registration', icon: Receipt, description: 'Support for GST registration.' },
          { name: 'GST Return Filing Assistance', slug: 'gst-filing', icon: Receipt, description: 'Guidance on filing GST returns.' },
          { name: 'Trade License Support', slug: 'trade-license', icon: Award, description: 'Help with obtaining a trade license.' },
          { name: 'Company Registration Guidance', slug: 'company-registration', icon: Building, description: 'Informational support on company registration.' },
          { name: 'Startup India Registration', slug: 'startup-india', icon: Sparkles, description: 'Guidance on Startup India registration.' }
        ]
      },
      {
        name: 'Corporate & Brand Facilitation',
        slug: 'corporate-brand-facilitation',
        icon: Handshake,
        description: 'Facilitating connections and enablement for corporate services.',
        options: [
          { name: 'BankSathi-type Services Info', slug: 'banksathi-info', icon: Users, description: 'Informational guidance on financial advisor platforms.' },
          { name: 'Gromo-type Services Info', slug: 'gromo-info', icon: Users, description: 'Informational guidance on financial product distribution.' },
          { name: 'Corporate Tie-ups Facilitation', slug: 'corporate-tieups', icon: Handshake, description: 'Assisting businesses in forming corporate partnerships.' },
          { name: 'OEM Enablement Info', slug: 'oem-enablement', icon: Milestone, description: 'Informational support for Original Equipment Manufacturer enablement.' }
        ]
      }
    ]
  },
  {
    name: 'Documentation & Legal Support',
    slug: 'documentation-legal-support',
    icon: FileText,
    description: 'Assistance with affidavit preparation, scanning, and uploading.',
    options: [
      { name: 'Affidavit Preparation Assistance', slug: 'affidavit-prep', icon: Scale, description: 'Guidance on drafting and preparing affidavits.' },
      { name: 'Digital Documentation Support', slug: 'digital-docs', icon: FileUp, description: 'Help with creating and managing digital documents.' },
      { name: 'Application & Compliance Assistance', slug: 'application-compliance', icon: FileCheck2, description: 'Support for filling out compliance forms.' },
      { name: 'Scanning & Uploading Support', slug: 'scanning-uploading', icon: Scan, description: 'High-quality document scanning and uploading.' }
    ]
  },
  {
    name: 'Cyber Cafe & Digital Services',
    slug: 'cyber-cafe-digital-services',
    icon: Laptop,
    description: 'A wide array of online services provided at your convenience.',
    options: [
      { name: 'Printing', slug: 'printing', icon: Printer, description: 'High-quality document printing services.' },
      { name: 'Scanning', slug: 'scanning', icon: Scan, description: 'Professional document scanning services.' },
      { name: 'Photocopy', slug: 'photocopy', icon: FileText, description: 'Fast and reliable photocopying services.' },
      { name: 'Lamination', slug: 'lamination', icon: FileCheck2, description: 'Protect your important documents with lamination.' },
      { name: 'Resume Preparation', slug: 'resume-prep', icon: BookUser, description: 'Assistance in creating a professional resume.' },
      { name: 'Online Application Submission', slug: 'online-application-submission', icon: Laptop, description: 'Support for submitting various online applications.' },
      { name: 'Email & Internet Assistance', slug: 'email-internet', icon: Globe, description: 'Help with email setup and internet browsing.' }
    ]
  },
  {
    name: 'Digital Marketing & Business Promotion',
    slug: 'digital-marketing-business-promotion',
    icon: Megaphone,
    description: 'Boosting your business\'s online presence and lead generation.',
    options: [
      { name: 'Digital Marketing Assistance', slug: 'digital-marketing', icon: Megaphone, description: 'Guidance on digital marketing strategies.' },
      { name: 'Branding & Online Presence', slug: 'branding-online-presence', icon: Star, description: 'Help with building a strong brand identity online.' },
      { name: 'Website & Online Profile Support', slug: 'website-online-profile', icon: Globe, description: 'Assistance with website creation and profile management.' },
      { name: 'Google Business Profile Setup', slug: 'google-business-profile', icon: Store, description: 'Guidance on setting up and optimizing your GBP.' },
      { name: 'Local Business Promotion', slug: 'local-business-promotion', icon: Users, description: 'Strategies to promote your business locally.' },
      { name: 'Lead Generation Support', slug: 'lead-generation', icon: Search, description: 'Assistance with generating potential customer leads.' },
      { name: 'Online Reputation Guidance', slug: 'online-reputation', icon: Shield, description: 'Guidance on managing your online reputation.' }
    ]
  },
  {
    name: 'Marketplace & Platform Facilitation',
    slug: 'marketplace-platform-facilitation',
    icon: Store,
    description: 'Support for sellers on major e-commerce platforms.',
    options: [
      { name: 'Amazon Seller Support', slug: 'amazon-seller-support', icon: Store, description: 'Guidance for selling on the Amazon marketplace.' },
      { name: 'Flipkart Seller Support', slug: 'flipkart-seller-support', icon: Store, description: 'Guidance for selling on the Flipkart marketplace.' },
      { name: 'Online Marketplace Onboarding', slug: 'marketplace-onboarding', icon: Milestone, description: 'Assistance with getting started on various online platforms.' }
    ]
  }
];
