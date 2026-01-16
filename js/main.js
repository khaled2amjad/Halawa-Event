// Main JavaScript for Halawa Restaurant & Café
class HalawaRestaurant {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.bookings = this.loadBookings();
        
        // Restore selected date from localStorage if exists
        const savedDate = localStorage.getItem('halawaSelectedDate');
        this.selectedDate = savedDate ? new Date(savedDate) : null;
        
        // Start with January 2026 for the buffet period
        this.currentMonth = new Date(2026, 0, 1); // January 2026
        
        this.init();
    }

    init() {
        this.setupLanguage();
        this.setupTheme();
        this.setupEventListeners();
        this.setupCalendar();
        this.updateSeatAvailability();
        this.applyRTL();
    }

    // Language Management
    setupLanguage() {
        this.updateLanguage(this.currentLang);
        this.setActiveLanguageButton();
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Keep LTR layout for header consistency
        document.documentElement.lang = lang;
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        this.applyRTL();
    }

    setActiveLanguageButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
        });
    }

    applyRTL() {
        const isRTL = this.currentLang === 'ar';
        // Don't change body.dir to avoid layout changes
        // Keep LTR layout for header consistency
        document.documentElement.lang = this.currentLang;
        
        // Update calendar weekdays for RTL
        if (isRTL) {
            const weekdays = document.querySelector('.calendar-weekdays');
            if (weekdays) {
                const days = weekdays.querySelectorAll('div');
                const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
                days.forEach((day, index) => {
                    if (index < arabicDays.length) {
                        day.textContent = arabicDays[index];
                    }
                });
            }
        }
    }

    // Theme Management
    setupTheme() {
        this.applyTheme(this.currentTheme);
        this.setActiveThemeButton();
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }

    setActiveThemeButton() {
        const activeBtn = document.querySelector('.theme-btn.active');
        if (activeBtn) {
            activeBtn.classList.remove('active');
        }
        
        const newActiveBtn = document.querySelector(`.theme-btn[data-theme="${this.currentTheme}"]`);
        if (newActiveBtn) {
            newActiveBtn.classList.add('active');
            this.updateButtonPositions(newActiveBtn);
        }
    }

    updateButtonPositions(activeBtn) {
        // This function ensures the active button is positioned correctly
        // All buttons are positioned via CSS nth-child selectors
        // No additional positioning needed as CSS handles it
        return;
    }

    // Event Listeners
    setupEventListeners() {
        // Logo click to go to home
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.updateLanguage(lang);
                this.setActiveLanguageButton();
            });
        });

        // Theme switcher
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const theme = btn.getAttribute('data-theme');
                const oldActiveBtn = document.querySelector('.theme-btn.active');
                const newActiveBtn = btn;
                
                // Apply theme immediately
                this.applyTheme(theme);
                
                // Smooth transition effect
                if (oldActiveBtn && oldActiveBtn !== newActiveBtn) {
                    // Remove active class from old button
                    oldActiveBtn.classList.remove('active');
                    
                    // Add active class to new button
                    newActiveBtn.classList.add('active');
                    
                    // Update position based on which button is now active
                    setTimeout(() => {
                        this.updateButtonPositions(newActiveBtn);
                    }, 50);
                } else {
                    newActiveBtn.classList.add('active');
                }
            });
        });

        // Book Now buttons
        document.getElementById('bookNowBtn').addEventListener('click', () => {
            this.scrollToBooking();
        });

        document.getElementById('ctaBookBtn').addEventListener('click', () => {
            this.scrollToBooking();
        });

        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.changeMonth(-1);
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.changeMonth(1);
        });

        // Booking form
        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmit();
        });

        // Guests input - update price
        document.getElementById('guests').addEventListener('input', () => {
            this.updateTotalPrice();
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('confirmOk').addEventListener('click', () => {
            this.closeModal();
        });

        // Click outside modal to close
        document.getElementById('confirmationModal').addEventListener('click', (e) => {
            if (e.target.id === 'confirmationModal') {
                this.closeModal();
            }
        });
    }

    // Calendar Functions
    setupCalendar() {
        // Load bookings first
        this.bookings = this.loadBookings();
        
        // Restore selected date if exists and is valid
        const savedDate = localStorage.getItem('halawaSelectedDate');
        if (savedDate) {
            const date = new Date(savedDate);
            // Check if the saved date is still valid (not in past and within buffet period)
            const today = new Date();
            const buffetStartDate = new Date(2026, 0, 20); // January 20, 2026
            const buffetEndDate = new Date(2026, 1, 14); // February 14, 2026
            
            if (date >= today && date >= buffetStartDate && date <= buffetEndDate) {
                this.selectedDate = date;
                document.getElementById('selectedDate').value = this.formatDate(date);
            } else {
                // Clear invalid date
                localStorage.removeItem('halawaSelectedDate');
                this.selectedDate = null;
            }
        }
        
        // Render calendar
        this.renderCalendar();
        
        // Update seat availability for current selection
        this.updateSeatAvailability();
        
        // Add real-time updates listener
        window.addEventListener('storage', (e) => {
            if (e.key === 'halawaBookings') {
                this.bookings = this.loadBookings();
                this.renderCalendar();
                this.updateSeatAvailability();
            }
        });
    }

    changeMonth(direction) {
        const currentMonth = this.currentMonth.getMonth();
        const year = this.currentMonth.getFullYear();
        
        // Only allow navigation between January (0) and February (1)
        if (direction === -1 && currentMonth > 0) {
            this.currentMonth.setMonth(currentMonth - 1);
        } else if (direction === 1 && currentMonth < 1) {
            this.currentMonth.setMonth(currentMonth + 1);
        }
        
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        // Update month display
        const monthNames = this.currentLang === 'ar' 
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Clear existing days
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of the month
        const today = new Date();
        const buffetStartDate = new Date(2026, 0, 20); // January 20, 2026
        const buffetEndDate = new Date(2026, 1, 14); // February 14, 2026 (4 weeks from Jan 20)
        
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if day is in the past
            if (currentDate < today && currentDate.toDateString() !== today.toDateString()) {
                dayElement.classList.add('disabled');
            }
            // Check if day is before buffet start date or after buffet end date
            else if (currentDate < buffetStartDate || currentDate > buffetEndDate) {
                dayElement.classList.add('disabled');
            }
            // Check if day is Thursday, Friday, or Saturday (buffet days)
            else if (currentDate.getDay() === 4 || currentDate.getDay() === 5 || currentDate.getDay() === 6) {
                dayElement.classList.add('event-day');
                dayElement.addEventListener('click', () => this.selectDate(currentDate));
            }
            // Other days are disabled
            else {
                dayElement.classList.add('disabled');
            }
            
            // Check if this day is selected
            if (this.selectedDate && currentDate.toDateString() === this.selectedDate.toDateString()) {
                dayElement.classList.add('selected');
            }
            
            calendarDays.appendChild(dayElement);
        }
    }

    selectDate(date) {
        this.selectedDate = date;
        
        // Save selected date to localStorage
        localStorage.setItem('halawaSelectedDate', date.toISOString());
        
        // Update form
        document.getElementById('selectedDate').value = this.formatDate(date);
        
        // Update UI
        this.renderCalendar();
        this.updateSeatAvailability();
    }

    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        if (this.currentLang === 'ar') {
            return date.toLocaleDateString('ar-JO', options);
        } else {
            return date.toLocaleDateString('en-US', options);
        }
    }

    // Booking Functions
    loadBookings() {
        try {
            const stored = localStorage.getItem('halawaBookings');
            if (stored) {
                const bookings = JSON.parse(stored);
                // Validate and clean old bookings (remove bookings older than 30 days)
                const today = new Date();
                const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
                
                const cleanedBookings = {};
                Object.keys(bookings).forEach(dateKey => {
                    const bookingDate = new Date(dateKey);
                    if (bookingDate >= thirtyDaysAgo) {
                        cleanedBookings[dateKey] = bookings[dateKey];
                    }
                });
                
                // Save cleaned bookings back
                this.saveBookings(cleanedBookings);
                return cleanedBookings;
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
        return {};
    }

    saveBookings(bookings = null) {
        try {
            const dataToSave = bookings || this.bookings;
            localStorage.setItem('halawaBookings', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving bookings:', error);
            // Fallback to sessionStorage if localStorage is full
            try {
                sessionStorage.setItem('halawaBookings', JSON.stringify(dataToSave));
            } catch (sessionError) {
                console.error('Error saving to sessionStorage:', sessionError);
            }
        }
    }

    updateSeatAvailability() {
        if (!this.selectedDate) {
            document.getElementById('bookedSeats').textContent = '0';
            document.getElementById('availableSeats').textContent = '200';
            return;
        }
        
        const dateKey = this.selectedDate.toDateString();
        const dayBookings = this.bookings[dateKey] || [];
        const totalBooked = dayBookings.reduce((sum, booking) => sum + booking.guests, 0);
        const available = Math.max(0, 200 - totalBooked);
        
        // Update display with animation
        const bookedElement = document.getElementById('bookedSeats');
        const availableElement = document.getElementById('availableSeats');
        
        bookedElement.textContent = totalBooked;
        availableElement.textContent = available;
        
        // Add visual feedback for availability
        if (available <= 20) {
            availableElement.style.color = '#e74c3c'; // Red for low availability
        } else if (available <= 50) {
            availableElement.style.color = '#f39c12'; // Orange for medium availability
        } else {
            availableElement.style.color = '#27ae60'; // Green for good availability
        }
    }

    updateTotalPrice() {
        const guests = parseInt(document.getElementById('guests').value) || 0;
        const totalPrice = guests * restaurantData.event.price;
        document.getElementById('totalPrice').textContent = `${totalPrice} ${restaurantData.event.currency}`;
    }

    handleBookingSubmit() {
        const fullName = document.getElementById('fullName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const guests = parseInt(document.getElementById('guests').value);
        
        // Validation
        if (!this.selectedDate) {
            alert(this.currentLang === 'ar' ? 'الرجاء اختيار تاريخ' : 'Please select a date');
            return;
        }
        
        if (!fullName || !phoneNumber || !guests) {
            alert(this.currentLang === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
            return;
        }
        
        if (guests < 1 || guests > 20) {
            alert(this.currentLang === 'ar' ? 'عدد الضيوف يجب أن يكون بين 1 و 20' : 'Number of guests must be between 1 and 20');
            return;
        }
        
        // Check availability
        const dateKey = this.selectedDate.toDateString();
        const dayBookings = this.bookings[dateKey] || [];
        const totalBooked = dayBookings.reduce((sum, booking) => sum + booking.guests, 0);
        
        if (totalBooked + guests > 200) {
            alert(this.currentLang === 'ar' ? 'لا توجد مقاعد كافية لهذا التاريخ' : 'Not enough seats available for this date');
            return;
        }
        
        // Create booking with unique ID
        const booking = {
            id: this.generateBookingId(),
            date: this.selectedDate.toDateString(),
            fullName,
            phoneNumber,
            guests,
            totalPrice: guests * restaurantData.event.price,
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };
        
        // Save booking with error handling
        try {
            if (!this.bookings[dateKey]) {
                this.bookings[dateKey] = [];
            }
            this.bookings[dateKey].push(booking);
            
            // Save to localStorage
            this.saveBookings();
            
            // Show confirmation
            this.showConfirmation(booking);
            
            // Update UI immediately
            this.updateSeatAvailability();
            this.renderCalendar();
            
            // Reset form
            document.getElementById('bookingForm').reset();
            document.getElementById('selectedDate').value = '';
            this.selectedDate = null;
            
            // Clear saved date from localStorage
            localStorage.removeItem('halawaSelectedDate');
            
            // Update UI after reset
            this.renderCalendar();
            this.updateSeatAvailability();
            
        } catch (error) {
            console.error('Error saving booking:', error);
            alert(this.currentLang === 'ar' ? 'حدث خطأ أثناء حفظ الحجز. يرجى المحاولة مرة أخرى.' : 'Error saving booking. Please try again.');
        }
    }

    generateBookingId() {
        return 'HAL' + Date.now().toString(36).toUpperCase();
    }

    showConfirmation(booking) {
        document.getElementById('bookingRef').textContent = booking.id;
        document.getElementById('confirmDate').textContent = this.formatDate(new Date(booking.date));
        document.getElementById('confirmName').textContent = booking.fullName;
        document.getElementById('confirmGuests').textContent = booking.guests;
        document.getElementById('confirmPrice').textContent = `${booking.totalPrice} ${restaurantData.event.currency}`;
        
        document.getElementById('confirmationModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('confirmationModal').classList.remove('active');
    }

    scrollToBooking() {
        document.getElementById('bookingSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HalawaRestaurant();
});

// Add some utility functions
window.HalawaUtils = {
    formatCurrency: (amount, currency = 'JOD') => {
        return `${amount} ${currency}`;
    },
    
    formatDate: (date, lang = 'en') => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        if (lang === 'ar') {
            return date.toLocaleDateString('ar-JO', options);
        } else {
            return date.toLocaleDateString('en-US', options);
        }
    },
    
    isValidPhone: (phone) => {
        // Simple phone validation - can be enhanced
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.length >= 7;
    }
};

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Performance optimization - debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize listener with debounce for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Adjust any responsive elements if needed
    console.log('Window resized');
}, 250));
