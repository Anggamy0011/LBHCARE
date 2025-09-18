# KeyLawCare Assets Directory

## 📁 Struktur Folder

```
src/assets/
├── icons/        # Icon SVG dan font icons
├── images/       # Gambar untuk konten website
├── fonts/        # Font files lokal
└── logo/         # Logo dan brand assets
```

## 📌 Penggunaan

### Icons

- Format: SVG, PNG (jika diperlukan)
- Ukuran: 24x24px, 32x32px, 48x48px
- Naming: `icon-[nama]-[ukuran].svg`

### Images

- Format: WebP (primary), JPG/PNG (fallback)
- Optimasi: Compressed untuk web
- Naming: `[section]-[deskripsi]-[ukuran].webp`

### Fonts

- Format: WOFF2, WOFF (fallback)
- Subset: Latin
- Naming: `[font-name]-[weight].woff2`

### Logo

- Format: SVG (primary), PNG (fallback)
- Ukuran: Multiple sizes for responsive
- Naming: `logo-[tipe]-[ukuran].svg`

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
<link
  rel="preload"
  href="/src/assets/fonts/inter-600.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/src/assets/logo/logo-main.svg" as="image" />
```

### Lazy Load Non-Critical Images

```html
<img
  src="placeholder.jpg"
  data-src="/src/assets/images/content-image.webp"
  loading="lazy"
  alt="Description"
/>
```

## 📋 Asset Checklist

### Sebelum Production

- [ ] Compress semua images
- [ ] Optimize semua SVGs
- [ ] Generate font subsets
- [ ] Test responsive images
- [ ] Validate asset paths
- [ ] Check asset security
- [ ] Update documentation
