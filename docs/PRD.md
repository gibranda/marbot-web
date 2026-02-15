# Product Requirements Document (PRD)

## Marbot LMS — Learning Management System untuk Manajemen Masjid

---

## 1. Ringkasan Produk

**Marbot LMS** adalah platform Learning Management System (LMS) yang dirancang khusus untuk pengembangan kapasitas pengelola masjid (marbot, takmir, dan staf masjid) di Indonesia. Platform ini menyediakan kursus online, workshop/agenda, sertifikasi, dan manajemen konten pembelajaran yang komprehensif.

**Tech Stack:**
- Frontend: React 19 + TypeScript + Vite + TailwindCSS
- Routing: React Router DOM 7 (HashRouter)
- Icons: Lucide React
- State: localStorage (saat ini), akan dimigrasi ke backend API

---

## 2. Tujuan Produk

1. Menyediakan platform pembelajaran online yang mudah diakses oleh pengelola masjid
2. Mengelola kursus, workshop, dan sertifikasi secara terpusat
3. Memfasilitasi proses pembayaran untuk kursus berbayar dan workshop
4. Memberikan tracking progress belajar bagi peserta
5. Menyediakan dashboard admin untuk mengelola seluruh konten platform

---

## 3. Target Pengguna

| Persona | Deskripsi |
|---------|-----------|
| **Marbot/Takmir** | Pengelola masjid yang ingin meningkatkan kompetensi pengelolaan masjid |
| **Admin Platform** | Pengelola konten dan operasional platform Marbot LMS |
| **Pengunjung** | Calon peserta yang browsing katalog kursus dan informasi agenda |

---

## 4. Roles & Permissions

### 4.1 Guest (Pengunjung Tanpa Login)
- Melihat landing page
- Browsing katalog kursus
- Melihat detail kursus
- Browsing daftar agenda/workshop
- Melihat detail agenda
- Melihat profil pengajar
- Mengakses halaman login/register

### 4.2 Student (Peserta Terdaftar)
- Semua akses Guest
- Mendaftar (enroll) ke kursus gratis
- Checkout dan membayar kursus berbayar
- Mengakses course player untuk belajar
- Melihat progress belajar
- Mendaftar ke agenda/workshop
- Melihat dan mendownload sertifikat
- Mengelola profil dan pengaturan akun

### 4.3 Admin
- Dashboard analytics (KPI, statistik, aktivitas terbaru)
- CRUD Kursus (termasuk modul & materi)
- CRUD Pengajar
- Manajemen Peserta
- Monitoring Transaksi
- Penerbitan Sertifikat
- CRUD Agenda/Workshop
- Melihat Laporan & Analitik
- Pengaturan Platform

---

## 5. Fitur Utama

### 5.1 Halaman Publik

#### 5.1.1 Landing Page (`/`)
- Hero section dengan CTA utama
- Statistik platform (jumlah kursus, peserta, pengajar)
- Preview kursus populer
- Showcase pengajar
- Section FAQ
- Section tentang platform

#### 5.1.2 Katalog Kursus (`/katalog`)
- Daftar kursus dalam format grid/list (toggle)
- Pencarian berdasarkan judul
- Filter berdasarkan kategori
- Filter berdasarkan level (Pemula, Menengah, Lanjut)
- Sorting (terbaru, rating, populer)
- Pagination

#### 5.1.3 Detail Kursus (`/course/:id`)
- Informasi lengkap kursus (deskripsi, kurikulum, review)
- Informasi pengajar
- Harga dan tombol enroll/checkout
- Daftar modul dan durasi
- Rating dan ulasan peserta

#### 5.1.4 Daftar Pengajar (`/pengajar`)
- Browse semua pengajar
- Pencarian berdasarkan nama
- Filter berdasarkan role/spesialisasi

#### 5.1.5 Profil Pengajar (`/pengajar/:id`)
- Bio dan informasi pengajar
- Rating dan statistik
- Daftar kursus yang diajar

#### 5.1.6 Daftar Agenda (`/agenda`)
- Browse agenda/workshop
- Filter: online/offline, gratis/berbayar
- Toggle grid/list view
- Informasi kuota tersedia

#### 5.1.7 Detail Agenda (`/agenda/:slug`)
- Informasi lengkap agenda (tanggal, waktu, lokasi)
- Narasumber
- Harga dan kuota
- Tombol pendaftaran

### 5.2 Autentikasi

#### 5.2.1 Login (`/login`)
- Login dengan email atau nomor telepon
- Input password (min 8 karakter)
- Redirect ke halaman sebelumnya setelah login (`returnTo`)

#### 5.2.2 Register (`/register`)
- Registrasi dengan nama, email/telepon, password
- Validasi format email dan telepon
- Minimum password 8 karakter

#### 5.2.3 Verifikasi (`/register/verify`)
- Verifikasi email/nomor telepon
- Input kode OTP

### 5.3 Dashboard Student

#### 5.3.1 Kursus Saya (`/akun/kursus`)
- Daftar kursus yang diikuti
- Progress bar per kursus
- Status enrollment (aktif, selesai)
- Quick link ke course player

#### 5.3.2 Agenda Saya (`/akun/agenda`)
- Daftar workshop yang terdaftar
- Status pendaftaran
- Informasi jadwal

#### 5.3.3 Sertifikat (`/akun/sertifikat`)
- Daftar sertifikat yang diperoleh
- Download sertifikat
- Nomor sertifikat unik

#### 5.3.4 Profil (`/akun/profil`)
- Edit nama, email, telepon
- Upload foto profil
- Informasi personal

#### 5.3.5 Pengaturan (`/akun/pengaturan`)
- Ubah password
- Preferensi notifikasi
- Pengaturan akun lainnya

### 5.4 Pembayaran

#### 5.4.1 Checkout Kursus (`/checkout/:id`)
- Ringkasan pesanan
- Pilihan metode pembayaran
- Proses pembayaran

#### 5.4.2 Sukses Pembayaran (`/checkout/:id/sukses`)
- Konfirmasi pembayaran berhasil
- Link ke course player

#### 5.4.3 Checkout Agenda (`/agenda/:slug/daftar`)
- Form pendaftaran agenda
- Pembayaran (jika berbayar)

### 5.5 Learning Experience

#### 5.5.1 Course Player (`/belajar/:id`)
- Video/materi player
- Navigasi modul dan sub-modul
- Tracking progress per modul
- Penandaan modul selesai
- Progress bar keseluruhan

### 5.6 Admin Panel

#### 5.6.1 Dashboard (`/admin`)
- KPI cards: total kursus, pengajar, peserta, pendapatan
- Grafik enrollment
- Aktivitas terbaru
- Quick actions

#### 5.6.2 Manajemen Kursus (`/admin/kursus`)
- Tabel daftar kursus
- Filter berdasarkan status (Published/Draft)
- Pencarian kursus
- Tombol tambah, edit, hapus

#### 5.6.3 Tambah/Edit Kursus (`/admin/kursus/baru`, `/admin/kursus/:id/edit`)
- Form: judul, deskripsi, kategori, level, harga
- Pilih pengajar (dropdown)
- Manajemen modul (tambah, urutkan, hapus)
- Upload thumbnail
- Status: Published/Draft

#### 5.6.4 Manajemen Pengajar (`/admin/pengajar`)
- Tabel daftar pengajar
- Statistik per pengajar (kursus, peserta, rating)
- Tambah, edit, hapus pengajar

#### 5.6.5 Manajemen Peserta (`/admin/peserta`)
- Tabel daftar peserta
- Status peserta (Aktif/Nonaktif)
- Detail progress peserta
- Filter dan pencarian

#### 5.6.6 Manajemen Transaksi (`/admin/transaksi`)
- Riwayat semua transaksi
- Status: Berhasil, Pending, Gagal
- Filter berdasarkan status dan tanggal
- Detail invoice

#### 5.6.7 Manajemen Sertifikat (`/admin/sertifikat`)
- Daftar sertifikat yang diterbitkan
- Terbitkan sertifikat baru
- Nomor sertifikat otomatis

#### 5.6.8 Laporan (`/admin/laporan`)
- Analitik pendapatan
- Statistik enrollment
- Performa kursus
- Export laporan

#### 5.6.9 Manajemen Agenda (`/admin/agenda`)
- Tabel daftar agenda
- Status: Published/Draft
- Jumlah pendaftar
- CRUD agenda

#### 5.6.10 Pendaftar Agenda (`/admin/agenda/:slug/pendaftar`)
- Daftar peserta yang mendaftar
- Status pendaftaran dan pembayaran

#### 5.6.11 Pengaturan (`/admin/pengaturan`)
- Pengaturan platform umum
- Konfigurasi pembayaran
- Pengaturan notifikasi

---

## 6. Data Model

Dokumentasi lengkap struktur database telah dipisahkan ke file tersendiri:

**[Database Schema Design](database-schema.md)**

Mencakup:
- 18 tabel dengan hierarki kursus: `courses` → `course_sections` → `lessons`
- 16 enum definitions (English, UPPER_SNAKE_CASE) dengan penjelasan detail kapan digunakan dan cara pengisian
- Struktur kurikulum: Section (Pendahuluan/Utama/Tambahan) → Lessons (Video/Text/Quiz)
- Video storage via YouTube private/unlisted link
- Harga kursus: FREE/PAID dengan dukungan diskon (original_price + price)
- Info tambahan kursus: learning points, has_certificate, has_lifetime_access, language
- Materi pendukung (PDF, slide, dokumen) per kursus atau per lesson
- Forum diskusi, review & rating, sertifikat
- Entity Relationship Diagram (Mermaid) + Data Hierarchy visualization

---

## 7. Referensi API

Dokumentasi API dipisahkan per konteks dan role. Lihat folder `api-spec/` untuk detail:

### Public (Tanpa Autentikasi)
- [Landing Page & Informasi Umum](api-spec/public/landing.md)
- [Pengajar](api-spec/public/pengajar.md)

### Users (Student Role)
- [Autentikasi (Register, Login, Verify)](api-spec/users/auth.md)
- [Katalog & Detail Kursus](api-spec/users/courses.md)
- [Agenda & Workshop](api-spec/users/agenda.md)
- [Profil & Dashboard](api-spec/users/profile.md)
- [Checkout & Pembayaran](api-spec/users/checkout.md)
- [Sertifikat](api-spec/users/sertifikat.md)

### Admin
- [Dashboard & Statistik](api-spec/admin/dashboard.md)
- [Manajemen Kursus](api-spec/admin/kursus.md)
- [Manajemen Pengajar](api-spec/admin/pengajar.md)
- [Manajemen Peserta](api-spec/admin/peserta.md)
- [Transaksi & Laporan](api-spec/admin/transaksi.md)
- [Manajemen Sertifikat](api-spec/admin/sertifikat.md)
- [Manajemen Agenda](api-spec/admin/agenda.md)
- [Pengaturan Platform](api-spec/admin/pengaturan.md)

---

## 8. Non-Functional Requirements

### 8.1 Performa
- Halaman harus load dalam < 3 detik
- API response time < 500ms
- Support 1000+ concurrent users

### 8.2 Keamanan
- Password di-hash menggunakan bcrypt
- JWT token untuk autentikasi API
- HTTPS untuk semua komunikasi
- Rate limiting pada endpoint sensitif
- Input validation dan sanitization

### 8.3 Responsivitas
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mendukung semua browser modern

### 8.4 Aksesibilitas
- Semantic HTML
- ARIA labels pada interactive elements
- Keyboard navigation support

---

## 9. Roadmap Teknis

### Phase 1 — MVP (Current)
- [x] Frontend SPA dengan React + TypeScript
- [x] Semua halaman UI (public, student, admin)
- [x] Mock data dan localStorage
- [ ] Backend API development
- [ ] Database setup

### Phase 2 — Backend Integration
- [ ] REST API dengan authentication (JWT)
- [ ] Database PostgreSQL
- [ ] File upload (thumbnail, avatar)
- [ ] Payment gateway integration

### Phase 3 — Enhancement
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Certificate PDF generation
- [ ] Email notifications
- [ ] Search optimization
