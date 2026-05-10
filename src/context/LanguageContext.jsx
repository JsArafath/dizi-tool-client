import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

export const translations = {
  en: {
    // Header
    trackOrder: 'Track Order',

    // Hero
    heroBadge: 'PREMIUM DIGITAL STORE',
    heroHeading1: 'Next-Gen Tools for',
    heroHeading2: 'Digital Creators',
    heroSub: 'Instant access to premium accounts and subscriptions. Lightning-fast delivery within 60 minutes, guaranteed.',
    exploreProducts: 'Explore Products',
    howItWorksBtn: 'How it works',
    pill1: '60 Min Delivery',
    pill2: 'Warranty Included',
    pill3: 'Trusted Seller',
    telegramSupport: 'Telegram Support',

    // Products
    availableProducts: 'Available Products',
    payWith: 'Pay with',
    payWithBold1: 'Binance (USDT)',
    payWithOr: 'or',
    payWithBold2: 'UPI / Cards (BDT)',
    payWithSuffix: 'via PayU',
    warranty: 'Warranty',
    refundPolicy: 'Refund Policy',
    inStock: 'in stock',
    sold: 'sold',
    viewDetails: 'View details',
    hideDetails: 'Hide details',
    addToCart: 'Add to Cart',
    alreadyInCart: 'Already in cart!',
    addedToCart: 'Added to cart ✓',

    // How It Works
    howItWorks: 'How It Works',
    step1Label: 'STEP 01',
    step1Title: 'Choose Products',
    step1Desc: 'Browse our catalog and add items to your cart',
    step2Label: 'STEP 02',
    step2Title: 'Pay Securely',
    step2Desc: 'Pay via Binance (USDT) or PayU (UPI, Cards, EMI, Wallets)',
    step3Label: 'STEP 03',
    step3Title: 'Get Delivered',
    step3Desc: 'Receive your product within 60 minutes via email',

    // Cart & Checkout
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    totalUsdt: 'Total (USDT)',
    totalInr: 'Total (BDT)',
    checkout: 'Checkout via Telegram',
    checkoutNow: 'Checkout Now',
    secureCheckout: 'Secure Checkout',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    paymentMethod: 'Payment Method',
    processing: 'Processing...',
    payNow: 'Pay',

    // Footer
    footerTagline: 'Premium digital tools — 60 min delivery',
  },

  bn: {
    // Header
    trackOrder: 'অর্ডার ট্র্যাক করুন',

    // Hero
    heroBadge: 'প্রিমিয়াম ডিজিটাল স্টোর',
    heroHeading1: 'ডিজিটাল ক্রিয়েটরদের জন্য',
    heroHeading2: 'নেক্সট-জেন টুলস',
    heroSub: 'প্রিমিয়াম অ্যাকাউন্ট ও সাবস্ক্রিপশনে তাৎক্ষণিক অ্যাক্সেস পান। ৬০ মিনিটের মধ্যে দ্রুত ডেলিভারি, গ্যারান্টিসহ।',
    exploreProducts: 'পণ্য দেখুন',
    howItWorksBtn: 'কিভাবে কাজ করে',
    pill1: '৬০ মিনিট ডেলিভারি',
    pill2: 'ওয়ারেন্টি সহ',
    pill3: 'বিশ্বস্ত বিক্রেতা',
    telegramSupport: 'টেলিগ্রাম সাপোর্ট',

    // Products
    availableProducts: 'পণ্যসমূহ',
    payWith: 'পেমেন্ট করুন',
    payWithBold1: 'বিনান্স (USDT)',
    payWithOr: 'অথবা',
    payWithBold2: 'UPI / কার্ড (BDT)',
    payWithSuffix: 'PayU এর মাধ্যমে',
    warranty: 'ওয়ারেন্টি',
    refundPolicy: 'রিফান্ড পলিসি',
    inStock: 'স্টকে আছে',
    sold: 'বিক্রিত',
    viewDetails: 'বিস্তারিত দেখুন',
    hideDetails: 'লুকিয়ে রাখুন',
    addToCart: 'কার্টে যোগ করুন',
    alreadyInCart: 'ইতিমধ্যে কার্টে আছে!',
    addedToCart: 'কার্টে যোগ হয়েছে ✓',

    // How It Works
    howItWorks: 'কিভাবে কাজ করে',
    step1Label: 'ধাপ ০১',
    step1Title: 'পণ্য বেছে নিন',
    step1Desc: 'আমাদের ক্যাটালগ ব্রাউজ করুন এবং কার্টে যোগ করুন',
    step2Label: 'ধাপ ০২',
    step2Title: 'নিরাপদে পেমেন্ট করুন',
    step2Desc: 'বিনান্স (USDT) বা PayU (UPI, কার্ড, EMI, ওয়ালেট) দিয়ে পেমেন্ট করুন',
    step3Label: 'ধাপ ০৩',
    step3Title: 'ডেলিভারি পান',
    step3Desc: 'ইমেইলের মাধ্যমে ৬০ মিনিটের মধ্যে পণ্য পাবেন',

    // Cart & Checkout
    yourCart: 'আপনার কার্ট',
    cartEmpty: 'কার্ট খালি আছে',
    totalUsdt: 'মোট (USDT)',
    totalInr: 'মোট (BDT)',
    checkout: 'টেলিগ্রামে চেকআউট করুন',
    checkoutNow: 'চেকআউট করুন',
    secureCheckout: 'নিরাপদ চেকআউট',
    emailAddress: 'ইমেইল অ্যাড্রেস',
    phoneNumber: 'ফোন নাম্বার',
    paymentMethod: 'পেমেন্ট মাধ্যম',
    processing: 'প্রসেসিং হচ্ছে...',
    payNow: 'পেমেন্ট করুন',

    // Footer
    footerTagline: 'প্রিমিয়াম ডিজিটাল টুলস — ৬০ মিনিট ডেলিভারি',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'bn' : 'en')
  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
