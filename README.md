# Arden Law - Attorney Website

A professional law firm website featuring a blocky, attorney-focused design style. This website represents Arden Law, specializing in injury law.

## 🎯 Overview

This website reimagines the Arden Law online presence with a more traditional, blocky attorney design while maintaining all the original content and messaging. The design emphasizes professionalism, trust, and clear communication through strong geometric sections, a sophisticated color palette, and clean typography.

## ✨ Features

### Design Elements
- **Blocky Layout**: Strong geometric sections with clear visual hierarchy
- **Attorney Color Scheme**: Navy blue (#1a2332) and gold (#c9a961) for a professional legal aesthetic
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Subtle fade-in effects and hover transitions
- **Mobile Navigation**: Hamburger menu for mobile devices

### Sections
1. **Hero Section**: Bold introduction with firm tagline and call-to-action buttons
2. **Client Priorities**: Three key focus areas displayed in blocky format
3. **About the Firm**: Firm philosophy and core values
4. **Practice Areas**: Four practice areas with detailed descriptions
   - Car Accident Lawyer
   - Truck Accident Lawyer
   - Slip and Fall Lawyer
   - Wrongful Death Lawyer
5. **Process**: Three-step client engagement process
6. **Why Clients Stay**: Testimonials and key benefits
7. **Contact**: Contact form and office information

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools or dependencies required - pure HTML, CSS, and JavaScript

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The website is ready to use!

### File Structure
```
ladnik-law/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
└── .github/
    └── copilot-instructions.md  # Project documentation
```

## 🎨 Design Specifications

### Color Palette
Inspired by the business card design, featuring warm, sophisticated tones:

- **Burgundy Dark**: `#5A1F1A` - Primary dark backgrounds and emphasis
- **Burgundy Medium**: `#7B2D26` - Main brand color for key elements
- **Burgundy Light**: `#A64D47` - Accent color for highlights and CTAs
- **Blue Accent**: `#4A5F7F` - Muted slate blue for complementary accents
- **Cream**: `#F5F1E8` - Primary background and light text
- **Cream Light**: `#FAF7F2` - Lighter section backgrounds
- **Cream Accent**: `#E8DCC7` - Darker cream for subtle contrast
- **Text Primary**: `#1A1A1A` - Main black text
- **Text Secondary**: `#6B5E51` - Secondary text
- **Text Muted**: `#8B7E70` - Muted text and subtle elements

### Typography
- **Primary Font**: Georgia, Times New Roman (serif)
- **Headings**: Bold, uppercase with letter spacing
- **Body Text**: 1.1rem with 1.6-1.8 line height for readability

### Layout Principles
- **Blocky Sections**: Each section is a distinct rectangular block
- **Strong Borders**: 2-5px borders for emphasis
- **Consistent Spacing**: CSS custom properties for spacing (0.5rem to 6rem)
- **Grid Layout**: CSS Grid for responsive columns
- **Hover Effects**: Transform and color transitions

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above - Full grid layouts
- **Tablet**: 768px - 1023px - Single column for most grids
- **Mobile**: 767px and below - Stacked layout with mobile menu

## 🔧 Customization

### Updating Contact Information
Edit the contact section in `index.html`:
```html
<div class="contact-details">
    <div class="detail-item">
        <div class="detail-icon">📍</div>
        <div class="detail-text">YOUR ADDRESS HERE</div>
    </div>
    <!-- Update phone and email similarly -->
</div>
```

### Changing Colors
Modify CSS variables in `style.css`:
```css
:root {
    --burgundy-dark: #5A1F1A;
    --burgundy-medium: #7B2D26;
    --burgundy-light: #A64D47;
    --blue-accent: #4A5F7F;
    --cream: #F5F1E8;
    /* Edit other colors as needed */
}
```

### Adding/Removing Practice Areas
Edit the practice areas grid in `index.html` and adjust the numbering accordingly.

## 📧 Contact Form

The contact form uses a `mailto:` link functionality. When submitted:
1. Form data is collected
2. Default email client opens with pre-filled message
3. User sends the email to complete the inquiry

**Note**: For production use, consider implementing a backend email service (e.g., EmailJS, Formspree, or custom backend) for better user experience.

## 🌐 Deployment

### GitHub Pages
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select main branch as source
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Other Hosting Options
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Import from GitHub repository
- **Traditional Hosting**: Upload files via FTP to your web server

## 📄 License

This project is created for Arden Law. All content and design are property of Arden Law.

## 🙋 Support

For questions or modifications, contact:
- **Email**: ardenlegal@gmail.com
- **Phone**: (718) 814-8630
- **Address**: 1620A Voorhies Ave, Brooklyn, NY 11235

## 🏆 Design Philosophy

This website emphasizes:
- **Clarity over decoration**: Every element serves a purpose
- **Professional credibility**: Traditional attorney aesthetic builds trust
- **Accessibility**: High contrast and readable typography
- **Direct communication**: Clear calls-to-action throughout
- **Blocky hierarchy**: Strong visual structure guides visitors

---

**Built with modern web standards | Optimized for performance | Fully responsive**
