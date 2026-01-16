# Halawa Restaurant & Café - Open Buffet Landing Page

A modern, responsive single-page landing page for Halawa Restaurant & Café's open buffet event, built with vanilla HTML5, CSS3, and JavaScript.

## Features

### Core Functionality
- **Multi-language Support**: English and Arabic with RTL support
- **Theme Switching**: 4 beautiful themes (Light, Dark, Earthy, Warm Fire)
- **Interactive Booking System**: Calendar-based date selection with real-time availability
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Local Storage**: Persists user preferences and booking data

### Technical Features
- **No Frameworks**: Pure vanilla JavaScript implementation
- **CSS Variables**: Dynamic theming system
- **Semantic HTML5**: Accessible and SEO-friendly markup
- **Component-based CSS**: Modular and maintainable styles
- **Progressive Enhancement**: Works without JavaScript enabled

## Project Structure

```
windsurf-project/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Complete stylesheet with 4 themes
├── js/
│   ├── content.js          # Restaurant data and translations
│   └── main.js             # Main application logic
├── assets/
│   └── images/             # Image assets directory
└── README.md               # This file
```

## Event Details

- **Restaurant**: Halawa Restaurant & Café
- **Event**: Open Buffet
- **Days**: Thursday, Friday, Saturday
- **Start Date**: January 20
- **Schedule**: 
  - Lunch: 3:00 PM – 6:00 PM
  - Dinner: 8:00 PM – 11:00 PM
- **Price**: 20 JOD per person
- **Capacity**: 200 seats per day

## Theme System

The application includes 4 professionally designed themes:

### Light Theme (Default)
- Warm, inviting colors
- High contrast for readability
- Professional restaurant aesthetic

### Dark Theme
- Elegant dark mode
- Reduced eye strain
- Modern sophisticated look

### Earthy Theme
- Natural, organic colors
- Eco-friendly aesthetic
- Warm and welcoming

### Warm Fire Theme
- Vibrant, energetic colors
- Bold and passionate
- Appetizing restaurant atmosphere

## Booking System Features

### Calendar Functionality
- Interactive month navigation
- Event day highlighting (Thu/Fri/Sat)
- Past date disabling
- Start date enforcement (January 20)
- Visual selection feedback

### Booking Logic
- Real-time seat availability tracking
- Overbooking prevention
- Price calculation (guests × 20 JOD)
- Booking reference generation
- Local storage persistence

### Form Validation
- Required field validation
- Phone number format checking
- Guest count limits (1-20)
- Availability checking

## Multi-language Support

### English (LTR)
- Default language
- Full translation coverage
- Standard layout

### Arabic (RTL)
- Complete RTL layout support
- Arabic text translations
- Proper text alignment
- Cultural date formatting

## Responsive Design

### Desktop (1200px+)
- Full grid layouts
- Side-by-side calendar and form
- Maximum content width

### Tablet (768px-1199px)
- Adjusted grid layouts
- Optimized touch targets
- Maintained functionality

### Mobile (320px-767px)
- Single column layouts
- Stacked calendar and form
- Touch-optimized interface
- Simplified navigation

## Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **ES6 Features**: Uses modern JavaScript features
- **CSS3**: Advanced styling and animations
- **HTML5**: Semantic markup and APIs

## Performance Features

- **Optimized CSS**: Efficient selector usage
- **Minimal JavaScript**: Lightweight implementation
- **Local Storage**: Reduced server requests
- **Image Optimization**: Placeholder system ready
- **Debounced Events**: Optimized resize handling

## Accessibility Features

- **Semantic HTML**: Proper document structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard access
- **Color Contrast**: WCAG compliant themes
- **Focus States**: Clear visual indicators

## Customization Guide

### Adding New Themes
1. Define CSS variables in `style.css`
2. Add theme button to HTML
3. Update theme switcher logic in `main.js`

### Modifying Content
1. Update `restaurantData` in `content.js`
2. Add new translation keys
3. Update HTML data-lang attributes

### Extending Booking Features
1. Modify booking logic in `main.js`
2. Update form fields in `index.html`
3. Add corresponding CSS styles

## Getting Started

1. **Clone/Download** the project files
2. **Open** `index.html` in a web browser
3. **No build process required** - pure HTML/CSS/JS

## Development Notes

### Code Organization
- **Modular JavaScript**: Class-based architecture
- **Component CSS**: Logical section organization
- **Semantic HTML**: Meaningful structure
- **Commented Code**: Clear documentation

### Best Practices
- **Progressive Enhancement**: Core functionality without JS
- **Performance Optimization**: Efficient code patterns
- **Accessibility First**: Inclusive design principles
- **Mobile-First**: Responsive design approach

## Future Enhancements

### Potential Features
- Email confirmation system
- Payment integration
- Advanced filtering
- Social media integration
- Analytics tracking
- SEO optimization

### Technical Improvements
- Service worker implementation
- Image lazy loading
- Advanced animations
- Form validation enhancement
- Error handling improvement

## Support

For questions or support regarding this project, please refer to the code comments and documentation within the files.

---

**Halawa Restaurant & Café** - Family-friendly dining with Arabic and international cuisine.
