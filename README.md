# LBH CARE - Platform Konsultasi Hukum Gratis

![LBH CARE Logo](frontend/src/assets/logo/Lbh.png)

## 📋 Deskripsi

LBH CARE adalah platform konsultasi hukum gratis yang menghubungkan masyarakat Indonesia dengan pengacara bersertifikat sesuai amanah UUD 1945. Platform ini menyediakan layanan konsultasi hukum online 24/7 dengan tim pengacara dan paralegal profesional.

## ✨ Fitur Utama

- **Konsultasi Hukum Gratis**: Konsultasi langsung dengan pengacara bersertifikat
- **Tim Profesional**: Pengacara dan paralegal berpengalaman
- **24/7 Online Support**: Layanan konsultasi tersedia setiap saat
- **WhatsApp Integration**: Chat langsung melalui WhatsApp
- **Knowledge Center**: Artikel dan panduan hukum
- **Responsive Design**: Akses optimal di semua perangkat

## 🏗️ Arsitektur Project

```
LBHCARE/
├── frontend/                 # Frontend (HTML, CSS, JS)
│   ├── index.html           # Halaman utama
│   ├── src/
│   │   ├── assets/          # Assets (gambar, logo)
│   │   │   ├── images/      # Gambar konten
│   │   │   └── logo/        # Logo dan brand assets
│   │   ├── scripts/         # JavaScript
│   │   │   └── main.js      # Script utama
│   │   └── styles/          # CSS
│   │       ├── main.css     # CSS utama
│   │       └── components/  # CSS komponen
│   └── package.json         # Dependencies frontend
├── backend/                 # Backend (Node.js, Express)
│   ├── src/
│   │   ├── app.js          # Aplikasi utama
│   │   ├── controllers/    # Controller
│   │   ├── models/         # Model database
│   │   ├── routes/         # Route API
│   │   └── services/       # Business logic
│   └── package.json        # Dependencies backend
└── README.md               # Dokumentasi project
```

## 🚀 Teknologi yang Digunakan

### Frontend

- **HTML5**: Struktur halaman web
- **CSS3**: Styling dan responsive design
- **JavaScript (ES6+)**: Interaktivitas dan animasi
- **Tailwind CSS**: Framework CSS utility-first
- **Font Awesome**: Icon library

### Backend

- **Node.js**: Runtime JavaScript
- **Express.js**: Web framework
- **MongoDB**: Database NoSQL
- **Mongoose**: ODM untuk MongoDB

## 📱 Responsive Design

Project ini dirancang untuk optimal di semua perangkat:

- **Desktop**: 1200px ke atas
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎨 Design System

### Warna Utama

```css
--primary-dark: #1a365d
--primary-main: #2d5282
--primary-light: #3182ce
--secondary-main: #ed8936
```

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Font Sizes**: 14px - 48px (responsive)
- **Font Weights**: 400, 500, 600, 700

## 👥 Tim Pengacara

### Pengacara

1. **Keyshan Eka Ludista S.H., M.H**

   - Spesialisasi: Hukum Pidana & Perdata
   - Lokasi: Sukabumi
   - Pengalaman: 5 tahun
   - WhatsApp: +6287780954251

2. **Ferdinand Silalahi S.H., M.H**

   - Spesialisasi: Hukum Keluarga & Ketenagakerjaan
   - Lokasi: Jakarta
   - Pengalaman: 3 tahun
   - WhatsApp: +6281234567890

3. **Bagas Herlangga S.H., M.H**
   - Spesialisasi: Hukum Bisnis & Kontrak
   - Lokasi: Bandung
   - Pengalaman: 4 tahun
   - WhatsApp: +6281234567891

### Paralegal

1. **Daffa Arya Saputra**

   - Spesialisasi: Riset & Administrasi
   - Lokasi: Jakarta
   - Pengalaman: 1 tahun
   - WhatsApp: +6281223645192

2. **Syahril Akbar Gunawan**
   - Spesialisasi: Riset & Administrasi
   - Lokasi: Sukabumi
   - Pengalaman: 2 tahun
   - WhatsApp: +6285793740207

## 🛠️ Instalasi & Setup

### Prerequisites

- Node.js (v14 atau lebih baru)
- MongoDB (v4.4 atau lebih baru)
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

## 📁 Struktur File

### Assets yang Digunakan

- **Logo**: `Lbh.png` (2x digunakan)
- **Hero Image**: `lbh hero.png`
- **Lawyer Photos**: `Keyshan.png`, `ferdinan.png`, `Bagas.png`
- **Paralegal Photos**: `daffa.png`, `Syahril.png`

### CSS Components

- `header.css` - Header dan navigasi
- `hero.css` - Hero section
- `services.css` - Layanan
- `lawyers.css` - Section pengacara
- `paralegal.css` - Section paralegal
- `consultation.css` - Modal konsultasi
- `knowledge.css` - Knowledge center
- `about.css` - Tentang kami
- `footer.css` - Footer
- `flip-card.css` - Card flip animation
- `filters.css` - Search dan filter
- `icons.css` - Font Awesome icons
- `security.css` - Security features

## 🔧 Fitur JavaScript

### Fungsi Utama

- **Navigation**: Smooth scroll, mobile menu
- **Search & Filter**: Pencarian pengacara/paralegal
- **Chat Integration**: WhatsApp integration
- **Animations**: Intersection Observer, fade-in effects
- **Modal System**: Consultation modal
- **Form Handling**: Newsletter subscription

### Event Listeners

- Scroll effects
- Button interactions
- Form submissions
- Search functionality
- Card flip animations

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
}

/* Desktop */
@media (min-width: 1200px) {
}
```

## 🚀 Deployment

### Frontend

- Static hosting (Netlify, Vercel, GitHub Pages)
- CDN untuk assets
- Optimasi gambar dan CSS

### Backend

- Cloud hosting (Heroku, DigitalOcean, AWS)
- MongoDB Atlas untuk database
- Environment variables untuk konfigurasi

## 📊 Performance

### Optimasi yang Diterapkan

- **Lazy Loading**: Gambar dimuat saat diperlukan
- **CSS Minification**: File CSS dikompres
- **Image Optimization**: Gambar dioptimasi untuk web
- **Font Loading**: Preload font kritis
- **Debouncing**: Search dengan delay

## 🔒 Security

### Fitur Keamanan

- **HTTPS**: Semua komunikasi terenkripsi
- **CSP**: Content Security Policy
- **Input Validation**: Validasi form input
- **XSS Protection**: Cross-site scripting protection

## 📈 Monitoring

### Analytics

- Google Analytics integration
- User interaction tracking
- Performance monitoring
- Error logging

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 📞 Kontak

- **Email**: info@lbhcare.com
- **Website**: https://lbhcare.com
- **WhatsApp**: +6287780954251

## 🏆 Pencapaian

- ✅ Responsive design untuk semua perangkat
- ✅ Integrasi WhatsApp untuk konsultasi
- ✅ Animasi smooth dan interaktif
- ✅ Search dan filter functionality
- ✅ Modal system untuk konsultasi
- ✅ Knowledge center dengan artikel
- ✅ Tim pengacara dan paralegal profesional
- ✅ Optimasi performance dan SEO

---

**LBH CARE** - Platform konsultasi hukum gratis terpercaya yang menghubungkan masyarakat Indonesia dengan pengacara bersertifikat sesuai amanah UUD 1945.
