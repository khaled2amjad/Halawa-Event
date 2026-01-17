// Content Data for Halawa Restaurant & Café
const restaurantData = {
    // Restaurant Information
    restaurant: {
        name: "Halawa",
        subtitle: "Restaurant & Café",
        description: "A family-friendly restaurant and café serving Arabic and international food, desserts, and beverages.",
        location: "Amman, Jordan",
        phone: "+962 6 1234 5678",
        email: "info@halawa-restaurant.jo"
    },

    // Event Information
    event: {
        type: "Open Buffet",
        days: ["Thursday", "Friday", "Saturday"],
        startDate: "January 20",
        schedule: {
            lunch: "3:00 PM – 6:00 PM",
            dinner: "8:00 PM – 11:00 PM"
        },
        price: 20,
        currency: "JOD",
        capacity: 200,
        description: "Join us for an exquisite dining experience with Arabic and international cuisine"
    },

    // Features
    features: [
        {
            icon: "🍽️",
            title: "Exquisite Cuisine",
            description: "Authentic Arabic dishes alongside international favorites, prepared with the finest ingredients"
        },
        {
            icon: "👨‍👩‍👧‍👦",
            title: "Family Friendly",
            description: "Warm, welcoming atmosphere perfect for families and gatherings of all sizes"
        },
        {
            icon: "🍰",
            title: "Delicious Desserts",
            description: "Wide selection of traditional Arabic sweets and international desserts"
        }
    ],

    // Menu Items (for future expansion)
    menu: {
        appetizers: [
            "Hummus with pita bread",
            "Tabbouleh salad",
            "Fattoush salad",
            "Stuffed grape leaves"
        ],
        mainCourses: [
            "Mansaf (Jordanian national dish)",
            "Mixed grill platter",
            "Lamb mandi",
            "Chicken shawarma",
            "Vegetable biryani"
        ],
        desserts: [
            "Kunafa",
            "Baklava",
            "Rice pudding",
            "Umm Ali"
        ],
        beverages: [
            "Fresh juices",
            "Traditional Arabic coffee",
            "Mint tea",
            "Soft drinks"
        ]
    },

    // Contact Information
    contact: {
        address: "📍 Amman, Jordan",
        phone: "📞 +962 6 1234 5678",
        email: "✉️ info@halawa-restaurant.jo"
    },

    // Opening Hours
    hours: {
        buffet: "Thu-Sat: 3:00 PM - 11:00 PM",
        regular: "Sun-Wed: 12:00 PM - 10:00 PM"
    }
};

// Language Translations
const translations = {
    en: {
        // Header
        "restaurant-cafe": "Restaurant & Café",
        
        // Hero Section
        "hero-title": "Open Buffet at Halawa",
        "hero-description": "Join us for an exquisite dining experience with Arabic and international cuisine",
        "days": "Every Thursday, Friday, Saturday starting from 22 January for one month",
        "times": "Lunch: 3:00 PM - 6:00 PM | Dinner: 8:00 PM - 11:00 PM",
        "price": "20 JOD per person",
        "book-now": "Book Now",
        
        // Info Section
        "about-title": "About Halawa Restaurant",
        "about-description": "A family-friendly restaurant and café serving Arabic and international food, desserts, and beverages",
        "cuisine-title": "Exquisite Cuisine",
        "cuisine-description": "Authentic Arabic dishes alongside international favorites, prepared with the finest ingredients",
        "family-title": "Family Friendly",
        "family-description": "Warm, welcoming atmosphere perfect for families and gatherings of all sizes",
        "desserts-title": "Delicious Desserts",
        "desserts-description": "Wide selection of traditional Arabic sweets and international desserts",
        
        // CTA Section
        "cta-title": "Reserve Your Table Today",
        "cta-description": "Limited seats available! Book your spot for an unforgettable dining experience",
        
        // Booking Section
        "booking-title": "Book Your Buffet Experience",
        "booking-description": "Select your preferred date and complete your reservation",
        "select-date": "Select Date",
        "booking-details": "Booking Details",
        "selected-date": "Selected Date",
        "full-name": "Full Name",
        "phone-number": "Phone Number",
        "number-guests": "Number of Guests",
        "seat-availability": "Seat Availability",
        "total-seats": "Total Seats:",
        "booked-seats": "Booked:",
        "available-seats": "Available:",
        "price-per-person": "Price per person:",
        "total-price": "Total Price:",
        "confirm-booking": "Confirm Booking",
        
        // Modal
        "booking-confirmed": "Booking Confirmed!",
        "booking-reference": "Booking Reference:",
        "date": "Date:",
        "name": "Name:",
        "guests": "Guests:",
        "confirmation-message": "Thank you for your reservation! We look forward to serving you at Halawa Restaurant & Café.",
        "ok": "OK",
        
        // Footer
        "footer-description": "Family-friendly restaurant serving Arabic and international cuisine",
        "contact-info": "Contact Info",
        "opening-hours": "Opening Hours",
        "buffet-days": "Thu-Sat: 3:00 PM - 11:00 PM",
        "regular-days": "Sun-Wed: 12:00 PM - 10:00 PM"
    },
    
    ar: {
        // Header
        "restaurant-cafe": "مطعم ومقهى",
        
        // Hero Section
        "hero-title": "البوفيه المفتوح في حلاوة",
        "hero-description": "انضم إلينا لتجربة طعام راقية مع المأكولات العربية والعالمية",
        "days": "كل خميس، وجمعة، وسبت إبتداءا من 22 يناير ولمدة شهر",
        "times": "الغداء: 3:00 مساءً - 6:00 مساءً | العشاء: 8:00 مساءً - 11:00 مساءً",
        "price": "20 دينار أردني للشخص",
        "book-now": "احجز الآن",
        
        // Info Section
        "about-title": "حول مطعم حلاوة",
        "about-description": "مطعم ومقهى عائلي يقدم المأكولات العربية والعالمية والحلويات والمشروبات",
        "cuisine-title": "مطبخ راقٍ",
        "cuisine-description": "أطباق عربية أصلية بجانب المأكولات والمقبلات العالمية والعربية، محضرة بأفضل المكونات",
        "family-title": "مناسب للعائلات",
        "family-description": "جو دافئ ومرحب مثالي للعائلات والتجمعات من جميع الأحجام",
        "desserts-title": "حلويات لذيذة",
        "desserts-description": "مجموعة واسعة من الحلويات العربية التقليدية والعالمية",
        
        // CTA Section
        "cta-title": "احجز طاولتك اليوم",
        "cta-description": "مقاعد محدودة متاحة! احجز مكانك لتجربة طعام لا تُنسى",
        
        // Booking Section
        "booking-title": "احجز تجربة البوفيه",
        "booking-description": "اختر التاريخ المفضل لك وأكمل حجزك",
        "select-date": "اختر التاريخ",
        "booking-details": "تفاصيل الحجز",
        "selected-date": "التاريخ المحدد",
        "full-name": "الاسم الكامل",
        "phone-number": "رقم الهاتف",
        "number-guests": "عدد الضيوف",
        "seat-availability": "توافر المقاعد",
        "total-seats": "إجمالي المقاعد:",
        "booked-seats": "محجوز:",
        "available-seats": "متاح:",
        "price-per-person": "السعر للشخص:",
        "total-price": "السعر الإجمالي:",
        "confirm-booking": "تأكيد الحجز",
        
        // Modal
        "booking-confirmed": "تم تأكيد الحجز!",
        "booking-reference": "مرجع الحجز:",
        "date": "التاريخ:",
        "name": "الاسم:",
        "guests": "الضيوف:",
        "confirmation-message": "شكراً لحجزك! نتطلع لخدمتك في مطعم ومقهى حلوى.",
        "ok": "موافق",
        
        // Footer
        "footer-description": "مطعم عائلي يقدم المطبخ العربي والعالمي",
        "contact-info": "معلومات الاتصال",
        "opening-hours": "ساعات العمل",
        "buffet-days": "الخميس-السبت: 3:00 مساءً - 11:00 مساءً",
        "regular-days": "الأحد-الأربعاء: 12:00 ظهراً - 10:00 مساءً"
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { restaurantData, translations };
} else {
    window.restaurantData = restaurantData;
    window.translations = translations;
}
