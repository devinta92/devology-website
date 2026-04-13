# CLAUDE.md – Aturan & Panduan Project

> File ini dibaca otomatis oleh Claude Code setiap sesi.
> Letakkan di root folder project kamu.

---

## 🔁 Selalu Lakukan Pertama Kali

- Baca file ini sebelum menulis kode apapun
- Untuk frontend: invoke skill `frontend-design` sebelum mulai coding
- Untuk dokumen: invoke skill `docx` atau `pdf` sesuai kebutuhan
- Jika ada gambar referensi: cocokkan layout, spacing, tipografi, dan warna secara akurat

---

## 🎨 Aturan Frontend & Web Design

### Filosofi Design
- Pilih arah estetika yang **berani dan jelas** — jangan setengah-setengah
- Hindari estetika generik: font Inter/Roboto/Arial, gradien ungu-putih, layout pasaran
- Setiap halaman harus punya **satu hal yang tidak terlupakan**
- Mobile-first, responsive di semua ukuran layar

### Typography
- Gunakan font yang **berkarakter dan unik** (Google Fonts, dll)
- Pasangkan display font yang kuat dengan body font yang elegan
- Jangan pakai system fonts atau font generik

### Warna & Tema
- Gunakan **CSS variables** untuk konsistensi warna
- Tentukan palet dominan + aksen tajam
- Commit ke satu tema, jangan campur-campur

### Animasi & Motion
- Utamakan CSS animation untuk HTML murni
- Gunakan `animation-delay` untuk staggered reveal saat halaman load
- Hover states yang mengejutkan dan menyenangkan
- Jangan berlebihan — satu animasi yang kuat lebih baik dari banyak animasi lemah

### Layout & Komposisi
- Eksplorasi asimetri, overlap, diagonal flow
- Negative space yang generous ATAU kepadatan yang terkontrol
- Hindari grid yang terlalu kaku dan predictable

---

## 🖥️ Local Development Server

- **Selalu serve via localhost** — jangan screenshot dari `file:///` URL
- Start server: `node serve.mjs` (jalankan di background sebelum screenshot)
- Default port: `http://localhost:3000`
- Jika server sudah jalan, jangan start ulang instance baru
- `serve.mjs` ada di root project

---

## 📸 Screenshot Workflow

- Puppeteer diinstall di project root
- Screenshot command: `node screenshot.mjs http://localhost:3000`
- Dengan label: `node screenshot.mjs http://localhost:3000 nama-label`
- Screenshot tersimpan di `./temporary screenshots/screenshot-N.png`
- **Selalu screenshot dari localhost**, bukan dari file
- Setelah screenshot, baca PNG dan bandingkan dengan referensi
- Jika ada mismatch → fix → screenshot ulang → ulangi sampai akurat

### Cara Membandingkan
Saat membandingkan hasil vs referensi, perhatikan spesifik:
- "Heading 32px tapi referensi ~24px"
- "Card gap 24px tapi referensi ~12px"
- Cek: spacing/padding, font size/weight/line-height, warna (exact hex), alignment

---

## 🧱 Struktur Kode

### HTML/CSS
```
project/
├── index.html
├── styles/
│   ├── main.css        ← stylesheet utama
│   └── components/     ← per-komponen
├── scripts/
│   └── main.js
├── assets/
│   ├── images/
│   └── fonts/
├── serve.mjs           ← dev server
├── screenshot.mjs      ← screenshot tool
└── CLAUDE.md           ← file ini
```

### React/Next.js
```
project/
├── src/
│   ├── components/
│   ├── pages/ (atau app/)
│   ├── styles/
│   └── lib/
├── public/
├── package.json
└── CLAUDE.md
```

---

## ✅ Standar Kode

### General
- Tulis kode yang **production-ready**, bukan prototype
- Tambahkan komentar untuk logika yang kompleks
- Naming yang deskriptif — jangan `x`, `temp`, `data2`
- DRY: jangan repeat diri sendiri

### CSS
- Gunakan CSS custom properties (variables) untuk warna, spacing, font
- BEM atau naming convention yang konsisten untuk class
- Jangan pakai `!important` kecuali terpaksa
- Group related properties (positioning, box model, typography, visual)

### JavaScript
- Gunakan `const`/`let`, hindari `var`
- Arrow functions untuk callbacks
- Handle error dengan try/catch di async functions
- Validasi input sebelum proses

### React
- Functional components + hooks
- Props yang jelas dengan default values
- Pisahkan logic dari presentasi
- Gunakan Tailwind utility classes (jika dipakai)

---

## 🚫 Pantangan

- ❌ Jangan commit API keys atau credentials ke kode
- ❌ Jangan pakai `console.log` di production code
- ❌ Jangan hardcode URL — gunakan environment variables
- ❌ Jangan skip error handling
- ❌ Jangan pakai font/warna generik tanpa alasan
- ❌ Jangan screenshot dari `file:///`
- ❌ Jangan start server duplikat

---

## 🔧 Environment & Config

```bash
# File .env (jangan di-commit ke git!)
API_KEY=xxx
DATABASE_URL=xxx
BASE_URL=http://localhost:3000
```

Tambahkan `.env` ke `.gitignore` selalu.

---

## 📦 Dependency Management

- Cek apakah package sudah ada sebelum install baru
- Prefer lightweight packages — jangan install library besar untuk hal kecil
- Lock versions di `package.json`
- Dokumentasikan kenapa setiap dependency dibutuhkan

---

## 🐛 Debugging Workflow

1. Baca error message dengan teliti
2. Cek browser console untuk frontend errors
3. Isolasi masalah ke komponen terkecil
4. Screenshot kondisi sebelum & sesudah fix
5. Jangan fix symptom — fix root cause-nya

---

## 📝 Commit & Dokumentasi

- Commit message format: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`
- Contoh: `feat: tambah animasi hero section`
- Update README jika ada perubahan struktur besar

---

## 🎯 Definisi "Selesai"

Sebuah task dianggap selesai jika:
- [ ] Kode berjalan tanpa error di console
- [ ] Tampilan akurat vs referensi (jika ada)
- [ ] Responsive di mobile dan desktop
- [ ] Screenshot sudah diambil dan diverifikasi
- [ ] Tidak ada kode debug yang tertinggal

---

*Last updated: 2025 | Versi: 1.0*
