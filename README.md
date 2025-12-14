# Lunetix - Ecosystem Website

Website resmi untuk Lunetix ecosystem yang menampilkan semua produk dalam suite produktivitas kami.

## 🌟 Tentang Lunetix

Lunetix adalah ecosystem digital yang dirancang untuk membantu Anda mengelola hidup dan meningkatkan produktivitas. Seperti Meta yang menghadirkan berbagai platform untuk kebutuhan sosial, Lunetix menghadirkan suite aplikasi terintegrasi untuk kebutuhan produktivitas Anda.

## 🚀 Produk Kami

### 📝 Lunotes
**Beautiful note-taking made simple**
- Rich Text Editor
- Kategori Otomatis  
- Sync Real-time
- [Buka Lunotes](https://lunotes.vercel.app/)

### ⏰ Lunotime
**Time management made effortless**
- Pomodoro Timer
- Time Tracking
- Analytics
- [Buka Lunotime](https://lunotime.vercel.app/)

### 🧮 Calcelix
**Smart calculations simplified**
- Scientific Calculator
- Unit Converter
- History
- [Buka Calcelix](https://calcelix.vercel.app/)

### 💰 Lunomoney
**Financial management made easy**
- Expense Tracking
- Budget Planning
- Financial Reports
- [Buka Lunomoney](https://lunomoney.vercel.app/)

## 🎨 Brand Guidelines

Website ini mengikuti brand guidelines Lunotes yang telah ditetapkan:

### Warna Utama
- **Brand Yellow**: `#FBBF24`
- **Brand Orange**: `#F59E0B`
- **Gray Scale**: `#1F2937` hingga `#F9FAFB`

### Typography
- **Font**: Inter (400, 500, 600, 700, 900)
- **Hierarchy**: H1 (48px) hingga Caption (12px)

### Voice & Tone
- **Friendly Professional**: Approachable yet competent
- **Helpful**: Clear, actionable guidance
- **Confident**: Definitive language
- **Warm**: Inclusive, welcoming language
- **Clear**: Simple, direct language

## 🛠️ Teknologi

- **HTML5**: Semantic markup
- **CSS3**: Modern styling dengan Flexbox & Grid
- **JavaScript**: Interactive features dan animations
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized loading dan Core Web Vitals

## 📱 Fitur Website

### ✨ User Experience
- Smooth scrolling navigation
- Responsive design untuk semua device
- Loading animations dan hover effects
- Keyboard navigation support
- Accessibility compliant

### 🎯 Interactive Elements
- Parallax scrolling effects
- Animated product cards
- Easter egg untuk logo clicks
- External link tracking
- Performance monitoring

### 🔧 Technical Features
- Service Worker ready (PWA)
- Theme detection support
- Error handling dan reporting
- Analytics tracking ready
- SEO optimized

## 🚀 Deployment

Website ini dapat di-deploy ke berbagai platform:

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages
1. Push ke GitHub repository
2. Enable GitHub Pages di Settings
3. Pilih source branch (main/master)

## 📂 Struktur File

```
lunetix-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── favicon.svg         # Website icon
└── README.md          # Documentation
```

## 🎨 Customization

### Menambah Produk Baru
1. Tambahkan card baru di section `.products-grid`
2. Buat icon SVG dengan gradient brand
3. Update navigation dan footer links
4. Tambahkan ke ecosystem diagram

### Mengubah Warna
Semua warna mengikuti CSS custom properties yang dapat diubah di bagian atas `styles.css`:

```css
:root {
  --brand-yellow: #FBBF24;
  --brand-orange: #F59E0B;
  --gray-900: #1F2937;
  /* ... */
}
```

### Menambah Animasi
Gunakan intersection observer yang sudah ada:

```javascript
const observer = new IntersectionObserver(callback, options);
observer.observe(element);
```

## 📞 Kontak

- **Email**: brand@lunetix.com
- **Website**: lunetix.com
- **Support**: 24/7 available

## 📄 License

© 2025 Lunetix. All rights reserved.

---

**Dibuat dengan ❤️ untuk ecosystem Lunetix**