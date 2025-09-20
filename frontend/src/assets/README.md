# LBH CARE Assets Directory

## 📁 Struktur Folder

```
src/assets/
├── images/       # Gambar untuk konten website
└── logo/         # Logo dan brand assets
```

**Note**: Folder `icons/` dan `fonts/` telah dihapus karena kosong. Icons menggunakan Font Awesome CDN.

## 📌 Penggunaan

### Icons

- **Source**: Font Awesome 6.4.0 CDN
- **URL**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2`
- **Usage**: Class-based icons (fas, fa-solid)
- **Note**: Tidak ada file icon lokal, menggunakan CDN

### Images

- **Format**: PNG (primary)
- **Optimasi**: Compressed untuk web
- **Naming**: `[nama-person].png` untuk foto profil
- **Files**:
  - `lbh hero.png` - Hero section image
  - `Keyshan.png` - Foto Keyshan Eka Ludista
  - `ferdinan.png` - Foto Ferdinand Silalahi
  - `Bagas.png` - Foto Bagas Herlangga
  - `daffa.png` - Foto Daffa Arya Saputra
  - `Syahril.png` - Foto Syahril Akbar Gunawan

### Fonts

- **Source**: Font Awesome CDN (tidak ada file lokal)
- **Format**: WOFF2 dari CDN
- **Usage**: Icons dan UI elements

### Logo

- **Format**: PNG
- **File**: `Lbh.png`
- **Usage**: Header dan footer
- **Note**: Digunakan 2x dalam aplikasi (header + footer)

## 🎨 Brand Colors

```css
:root {
  /* Primary Colors */
  --primary-dark: #1a365d;
  --primary-main: #2d5282;
  --primary-light: #3182ce;

  /* Secondary Colors */
  --secondary-dark: #dd6b20;
  --secondary-main: #ed8936;
  --secondary-light: #f6ad55;

  /* Neutral Colors */
  --neutral-100: #f7fafc;
  --neutral-200: #edf2f7;
  --neutral-300: #e2e8f0;
  --neutral-400: #cbd5e0;
  --neutral-500: #a0aec0;
  --neutral-600: #718096;
  --neutral-700: #4a5568;
  --neutral-800: #2d3748;
  --neutral-900: #1a202c;
}
```

## 🔍 Optimasi

### Images

- Compress semua images menggunakan tools seperti:
  - [Squoosh](https://squoosh.app/)
  - [TinyPNG](https://tinypng.com/)
  - [ImageOptim](https://imageoptim.com/)

### SVG

- Optimize SVG menggunakan:
  - [SVGOMG](https://jakearchibald.github.io/svgomg/)
  - [SVG Optimizer](https://github.com/svg/svgo)

### Fonts

- Subset fonts menggunakan:
  - [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/)
  - [Fontsquirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)

## 📱 Responsive Images

### Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
  /* Use small images */
}

/* Tablet */
@media (max-width: 768px) {
  /* Use medium images */
}

/* Desktop */
@media (min-width: 769px) {
  /* Use large images */
}
```

## 🔒 Security

- Semua external resources harus melalui HTTPS
- Implement SRI (Subresource Integrity) untuk CDN resources
- Use CSP (Content Security Policy) untuk asset security

## 🔄 Version Control

- Track perubahan semua assets di Git
- Gunakan Git LFS untuk file besar
- Maintain changelog untuk major asset updates

## 📦 Asset Loading

### Preload Critical Assets

```html
<!-- Font Awesome CDN -->
<link
  rel="preload"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Logo -->
<link rel="preload" href="/src/assets/logo/Lbh.png" as="image" />
```

### Lazy Load Non-Critical Images

```html
<!-- Hero Image -->
<img src="src/assets/images/lbh hero.png" alt="LBH CARE Hero" loading="lazy" />

<!-- Profile Images -->
<img
  src="src/assets/images/Keyshan.png"
  alt="Keyshan Eka Ludista"
  loading="lazy"
/>
```

## 📋 Asset Checklist

### Sebelum Production

- [x] Compress semua images
- [x] Optimize semua SVGs
- [x] Generate font subsets (menggunakan CDN)
- [x] Test responsive images
- [x] Validate asset paths
- [x] Check asset security
- [x] Update documentation

### Status Assets

- [x] **Images**: 6 file PNG (semua digunakan)
- [x] **Logo**: 1 file PNG (digunakan 2x)
- [x] **Icons**: Font Awesome CDN (tidak ada file lokal)
- [x] **Fonts**: Font Awesome CDN (tidak ada file lokal)
- [x] **Folder Structure**: Bersih, tidak ada folder kosong
- [x] **Documentation**: Terupdate sesuai struktur aktual
