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
        const langButtons = document.querySelectorAll('.lang-btn');
        if (langButtons.length > 0) {
            langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang');
                    this.updateLanguage(lang);
                    this.setActiveLanguageButton();
                });
            });
        }

        // Theme switcher
        const themeButtons = document.querySelectorAll('.theme-btn');
        if (themeButtons.length > 0) {
            themeButtons.forEach(btn => {
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
        }

        // Calendar functionality - only if calendar elements exist
        const calendarToggle = document.getElementById('calendarToggle');
        const calendarSection = document.getElementById('calendarSection');
        const selectedDateInput = document.getElementById('selectedDate');
        
        if (calendarToggle && calendarSection && selectedDateInput) {
            // Calendar toggle functionality
            calendarToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                calendarSection.classList.toggle('show');
            });
            
            // Handle manual date input
            selectedDateInput.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                if (selectedValue) {
                    const date = new Date(selectedValue);
                    // Check if date is valid
                    const today = new Date();
                    const buffetStartDate = new Date(2026, 0, 20); // January 20, 2026
                    const buffetEndDate = new Date(2026, 1, 14); // February 14, 2026
                    
                    if (date >= today && date >= buffetStartDate && date <= buffetEndDate) {
                        this.selectDate(date);
                    } else {
                        // Invalid date, clear it
                        e.target.value = '';
                        alert(this.currentLang === 'ar' ? 'التاريخ المحدد غير صالح' : 'Selected date is not valid');
                    }
                }
            });
            
            // Also open calendar when focusing on date input
            selectedDateInput.addEventListener('focus', (e) => {
                e.preventDefault();
                calendarSection.classList.add('show');
            });
            
            // Close calendar when clicking outside
            document.addEventListener('click', (e) => {
                if (!calendarSection.contains(e.target) && 
                    !e.target.closest('.date-input-wrapper')) {
                    calendarSection.classList.remove('show');
                }
            });
            
            // Close calendar when clicking on a date
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('calendar-day') && 
                    !e.target.classList.contains('disabled')) {
                    setTimeout(() => {
                        calendarSection.classList.remove('show');
                    }, 100);
                }
            });
        }

        // Book Now buttons - only if elements exist
        const bookNowBtn = document.getElementById('bookNowBtn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', () => {
                this.scrollToBooking();
            });
        }

        const ctaBookBtn = document.getElementById('ctaBookBtn');
        if (ctaBookBtn) {
            ctaBookBtn.addEventListener('click', () => {
                this.scrollToBooking();
            });
        }

        // Calendar navigation - only if elements exist
        const prevMonthBtn = document.getElementById('prevMonth');
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                this.changeMonth(-1);
            });
        }

        const nextMonthBtn = document.getElementById('nextMonth');
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                this.changeMonth(1);
            });
        }

        // Booking form - only if element exists
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmit();
            });
        }

        // Guests input - only if element exists
        const guestsInput = document.getElementById('guests');
        if (guestsInput) {
            guestsInput.addEventListener('input', () => {
                this.updateTotalPrice();
            });
        }

        // Modal close buttons - only if elements exist
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const confirmOkBtn = document.getElementById('confirmOk');
        if (confirmOkBtn) {
            confirmOkBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Click outside modal to close - only if element exists
        const confirmationModal = document.getElementById('confirmationModal');
        if (confirmationModal) {
            confirmationModal.addEventListener('click', (e) => {
                if (e.target.id === 'confirmationModal') {
                    this.closeModal();
                }
            });
        }
    }

    // Calendar Functions - only if calendar elements exist
    setupCalendar() {
        const calendarDays = document.getElementById('calendarDays');
        const currentMonth = document.getElementById('currentMonth');
        const selectedDateInput = document.getElementById('selectedDate');
        
        if (!calendarDays || !currentMonth || !selectedDateInput) {
            console.warn('Calendar elements not found, skipping calendar setup');
            return;
        }
        
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
                // Format date for date input
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                selectedDateInput.value = formattedDate;
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
        const calendarDays = document.getElementById('calendarDays');
        const currentMonth = document.getElementById('currentMonth');
        
        if (!calendarDays || !currentMonth) {
            console.warn('Calendar elements not found, skipping render');
            return;
        }
        
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        // Update month display
        const monthNames = this.currentLang === 'ar' 
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        currentMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Clear existing days
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
        
        // Format date for date input
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        const selectedDateInput = document.getElementById('selectedDate');
        if (selectedDateInput) {
            selectedDateInput.value = formattedDate;
        }
        
        localStorage.setItem('halawaSelectedDate', date.toISOString());
        this.updateSeatAvailability();
        
        // Close calendar popup after selection
        const calendarSection = document.getElementById('calendarSection');
        if (calendarSection) {
            calendarSection.classList.remove('show');
        }
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
        const bookedSeatsElement = document.getElementById('bookedSeats');
        const availableSeatsElement = document.getElementById('availableSeats');
        
        if (!bookedSeatsElement || !availableSeatsElement) {
            console.warn('Seat availability elements not found');
            return;
        }
        
        if (!this.selectedDate) {
            bookedSeatsElement.textContent = '0';
            availableSeatsElement.textContent = '200';
            return;
        }
        
        const dateKey = this.selectedDate.toDateString();
        const dayBookings = this.bookings[dateKey] || [];
        const totalBooked = dayBookings.reduce((sum, booking) => sum + booking.guests, 0);
        const available = Math.max(0, 200 - totalBooked);
        
        // Update display with animation
        bookedSeatsElement.textContent = totalBooked;
        availableSeatsElement.textContent = available;
        
        // Add visual feedback for availability
        if (available <= 20) {
            availableSeatsElement.style.color = '#e74c3c'; // Red for low availability
        } else if (available <= 50) {
            availableSeatsElement.style.color = '#f39c12'; // Orange for medium availability
        } else {
            availableSeatsElement.style.color = '#27ae60'; // Green for good availability
        }
    }

    updateTotalPrice() {
        const guestsInput = document.getElementById('guests');
        const totalPriceElement = document.getElementById('totalPrice');
        
        if (!guestsInput || !totalPriceElement) {
            console.warn('Price elements not found');
            return;
        }
        
        const guests = parseInt(guestsInput.value) || 0;
        const totalPrice = guests * restaurantData.event.price;
        totalPriceElement.textContent = `${totalPrice} ${restaurantData.event.currency}`;
    }

    handleBookingSubmit() {
        const fullNameInput = document.getElementById('fullName');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const guestsInput = document.getElementById('guests');
        
        if (!fullNameInput || !phoneNumberInput || !guestsInput) {
            console.warn('Form elements not found');
            return;
        }
        
        const fullName = fullNameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        const guests = parseInt(guestsInput.value);
        
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
            const bookingForm = document.getElementById('bookingForm');
            if (bookingForm) {
                bookingForm.reset();
            }
            const selectedDateInput = document.getElementById('selectedDate');
            if (selectedDateInput) {
                selectedDateInput.value = '';
            }
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
        const bookingRefElement = document.getElementById('bookingRef');
        const confirmDateElement = document.getElementById('confirmDate');
        const confirmNameElement = document.getElementById('confirmName');
        const confirmGuestsElement = document.getElementById('confirmGuests');
        const confirmPriceElement = document.getElementById('confirmPrice');
        const confirmationModal = document.getElementById('confirmationModal');
        
        if (!bookingRefElement || !confirmDateElement || !confirmNameElement || 
            !confirmGuestsElement || !confirmPriceElement || !confirmationModal) {
            console.warn('Modal elements not found');
            return;
        }
        
        bookingRefElement.textContent = booking.id;
        confirmDateElement.textContent = this.formatDate(new Date(booking.date));
        confirmNameElement.textContent = booking.fullName;
        confirmGuestsElement.textContent = booking.guests;
        confirmPriceElement.textContent = `${booking.totalPrice} ${restaurantData.event.currency}`;
        
        confirmationModal.classList.add('active');
    }

    closeModal() {
        const confirmationModal = document.getElementById('confirmationModal');
        if (confirmationModal) {
            confirmationModal.classList.remove('active');
        }
    }

    scrollToBooking() {
        const bookingSection = document.getElementById('bookingSection');
        if (bookingSection) {
            bookingSection.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
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
