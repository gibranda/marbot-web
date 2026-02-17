# Product Requirements Document (PRD)

## Marbot LMS — Learning Management System untuk Manajemen Masjid

---

## 1. Ringkasan Produk

**Marbot LMS** adalah platform Learning Management System (LMS) yang dirancang khusus untuk pengembangan kapasitas pengelola masjid (marbot, takmir, dan staf masjid) di Indonesia. Platform ini menyediakan kursus online, workshop/agenda, sertifikasi, forum diskusi, dan manajemen konten pembelajaran yang komprehensif.

**Tech Stack:**
- Frontend: React 19 + TypeScript + Vite + TailwindCSS
- Routing: React Router DOM 7 (HashRouter)
- Icons: Lucide React
- State: localStorage (saat ini), akan dimigrasi ke backend API
- Backend: REST API (Node.js/Express atau Laravel — TBD)
- Database: PostgreSQL
- Authentication: JWT + Refresh Token Rotation
- Payment Gateway: Midtrans / Xendit (TBD)
- Storage: Cloud storage untuk avatar, thumbnail, materi (TBD)
- Video: YouTube private/unlisted link (tanpa self-hosting)

---

## 2. Tujuan Produk

1. Menyediakan platform pembelajaran online yang mudah diakses oleh pengelola masjid di seluruh Indonesia
2. Mengelola kursus (video & teks), workshop/agenda, dan sertifikasi secara terpusat
3. Memfasilitasi proses pembayaran untuk kursus berbayar dan workshop dengan berbagai metode (transfer bank, e-wallet, QRIS)
4. Memberikan tracking progress belajar secara real-time bagi peserta
5. Menyediakan forum diskusi per lesson untuk interaksi antar peserta dan pengajar
6. Menyediakan dashboard admin untuk mengelola seluruh konten dan operasional platform
7. Menerbitkan sertifikat digital secara otomatis setelah peserta menyelesaikan kursus

---

## 3. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---------|-----------|-----------------|
| **Marbot/Takmir** | Pengelola masjid yang ingin meningkatkan kompetensi pengelolaan masjid | Akses kursus, ikut workshop, dapat sertifikat |
| **Admin Platform** | Pengelola konten dan operasional platform Marbot LMS | Kelola kursus, pengajar, peserta, transaksi, laporan |
| **Pengunjung (Guest)** | Calon peserta yang browsing katalog kursus dan informasi agenda | Lihat kursus, pengajar, agenda tanpa harus login |

---

## 4. Roles & Permissions

### 4.1 Guest (Pengunjung Tanpa Login)
- Melihat landing page (statistik, kursus populer, pengajar, FAQ)
- Browsing katalog kursus dengan filter (kategori, level, harga) dan pencarian
- Melihat detail kursus (deskripsi, kurikulum, review, pengajar)
- Browsing daftar agenda/workshop dengan filter (tipe, harga, status)
- Melihat detail agenda (jadwal, narasumber, harga, kuota)
- Browsing daftar pengajar dan melihat profil pengajar
- Verifikasi keaslian sertifikat via nomor sertifikat
- Pencarian global (kursus, pengajar, agenda)
- Mengakses halaman login/register

### 4.2 Student (Peserta Terdaftar)
- Semua akses Guest
- Mendaftar (enroll) ke kursus gratis
- Checkout dan membayar kursus berbayar (dengan dukungan kupon diskon)
- Mengakses course player untuk belajar (video, teks, materi pendukung)
- Melihat progress belajar per lesson dan keseluruhan kursus
- Berpartisipasi dalam forum diskusi per lesson (buat thread, reply, vote)
- Memberikan review dan rating untuk kursus yang diikuti
- Mendaftar ke agenda/workshop (gratis langsung confirmed, berbayar via checkout)
- Melihat dan mendownload sertifikat (PDF)
- Mengelola profil (nama, avatar, bio, institusi, lokasi)
- Mengatur preferensi notifikasi
- Mengubah password
- Menghapus akun (soft delete dengan grace period 30 hari)

### 4.3 Admin
- Dashboard analytics (KPI cards, grafik enrollment, aktivitas terbaru)
- CRUD Kursus (termasuk section, lesson, dan materi pendukung)
- CRUD Pengajar (profil, spesialisasi, status)
- Manajemen Peserta (daftar, status, detail progress)
- Monitoring Transaksi (riwayat, status pembayaran, detail invoice)
- Penerbitan & manajemen Sertifikat
- CRUD Agenda/Workshop (termasuk daftar pendaftar)
- Melihat Laporan & Analitik (pendapatan, enrollment, performa kursus)
- Pengaturan Platform (profil platform, kontak, pembayaran, SEO)
- Manajemen FAQ dan kupon diskon
- Manajemen kategori kursus dan spesialisasi pengajar

---

## 5. Fitur Utama

### 5.1 Halaman Publik

#### 5.1.1 Landing Page (`/`)
- Hero section dengan CTA utama
- Statistik platform (jumlah kursus, peserta, pengajar, sertifikat)
- Preview kursus populer (6 kursus rating tertinggi)
- Showcase pengajar unggulan (6 pengajar dengan total peserta terbanyak)
- Thread diskusi populer dari forum
- Section FAQ (dari tabel `faqs`, diurutkan berdasarkan `sort_order`)
- **API:** `GET /api/v1/landing`

#### 5.1.2 Katalog Kursus (`/katalog`)
- Daftar kursus dalam format grid/list (toggle)
- Pencarian berdasarkan judul (`q`)
- Filter berdasarkan kategori (`category_id`)
- Filter berdasarkan level: Pemula, Menengah, Lanjut (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`)
- Filter berdasarkan harga: Gratis/Berbayar (`FREE`, `PAID`)
- Sorting: terbaru, rating tertinggi, terpopuler, harga termurah/termahal
- Pagination (12 per halaman)
- **API:** `GET /api/v1/courses`, `GET /api/v1/categories`

#### 5.1.3 Detail Kursus (`/course/:slug`)
- Informasi lengkap kursus (judul, deskripsi, summary, learning points)
- Video promo (YouTube embed)
- Kurikulum terstruktur: Section → Lessons (dengan durasi dan tipe)
- Informasi pengajar (bio, spesialisasi, rating, total kursus)
- Harga dan tombol enroll/checkout
- Rating dan ulasan peserta (summary + distribution + daftar review)
- Indikator: sertifikat tersedia, akses seumur hidup
- **API:** `GET /api/v1/courses/:slug`, `GET /api/v1/courses/:slug/reviews`

#### 5.1.4 Daftar Pengajar (`/pengajar`)
- Browse semua pengajar aktif
- Pencarian berdasarkan nama (`q`)
- Filter berdasarkan spesialisasi (`specialization_id`)
- Sorting: nama, rating, jumlah peserta, jumlah kursus
- Pagination (12 per halaman)
- **API:** `GET /api/v1/instructors`, `GET /api/v1/specializations`

#### 5.1.5 Profil Pengajar (`/pengajar/:id`)
- Bio lengkap dan informasi pengajar
- Spesialisasi, lokasi
- Rating dan statistik (total kursus, total peserta)
- Daftar kursus yang diajar
- **API:** `GET /api/v1/instructors/:id`

#### 5.1.6 Daftar Agenda (`/agenda`)
- Browse agenda/workshop yang akan datang
- Filter: tipe (online/offline/hybrid), harga (gratis/berbayar), status (upcoming/past)
- Sorting: tanggal, harga
- Toggle grid/list view
- Informasi kuota tersedia (sisa kuota)
- Pagination (12 per halaman)
- **API:** `GET /api/v1/agenda`

#### 5.1.7 Detail Agenda (`/agenda/:slug`)
- Informasi lengkap agenda (judul, deskripsi, tanggal, waktu, lokasi)
- Narasumber/speaker
- Harga, kuota tersisa, dan jumlah pendaftar
- Daftar benefit (sertifikat, materi, rekaman, dll.)
- Tombol pendaftaran (gratis) atau checkout (berbayar)
- **API:** `GET /api/v1/agenda/:slug`

#### 5.1.8 Verifikasi Sertifikat (`/verify/:certNumber`)
- Input atau scan nomor sertifikat
- Tampilkan status valid/invalid/expired
- Informasi pemegang sertifikat, nama kursus, dan tanggal terbit
- **API:** `GET /api/v1/certificates/verify/:certNumber`

#### 5.1.9 Pencarian Global (`/cari`)
- Pencarian lintas kursus, pengajar, dan agenda
- Hasil dikelompokkan per tipe
- **API:** `GET /api/v1/search`

### 5.2 Autentikasi

#### 5.2.1 Login (`/login`)
- Login dengan email dan password
- Minimum password 8 karakter
- Redirect ke halaman sebelumnya setelah login (`returnTo`)
- JWT token + refresh token
- **API:** `POST /api/v1/auth/login`

#### 5.2.2 Register (`/register`)
- Registrasi dengan nama, email, password
- Validasi format email
- Minimum password 8 karakter
- Kirim kode OTP ke email untuk verifikasi
- **API:** `POST /api/v1/auth/register`

#### 5.2.3 Verifikasi OTP (`/register/verify`)
- Input kode OTP 6 digit
- OTP expired dalam 5 menit
- Bisa resend OTP
- Setelah verifikasi berhasil, langsung login (dapat token)
- **API:** `POST /api/v1/auth/verify-otp`, `POST /api/v1/auth/resend-otp`

#### 5.2.4 Lupa Password (`/lupa-password`)
- Input email untuk menerima kode OTP reset password
- **API:** `POST /api/v1/auth/forgot-password`

#### 5.2.5 Reset Password (`/reset-password`)
- Input email, kode OTP, dan password baru
- Semua refresh token di-revoke setelah reset
- **API:** `POST /api/v1/auth/reset-password`

### 5.3 Dashboard Student

#### 5.3.1 Overview Dashboard (`/akun`)
- Ringkasan statistik: kursus aktif, selesai, sertifikat, agenda mendatang
- Kursus terakhir diakses (quick continue)
- Agenda mendatang
- **API:** `GET /api/v1/me/dashboard`

#### 5.3.2 Kursus Saya (`/akun/kursus`)
- Daftar kursus yang diikuti
- Progress bar per kursus
- Filter status enrollment (aktif, selesai)
- Quick link ke course player
- **API:** `GET /api/v1/me/courses`

#### 5.3.3 Agenda Saya (`/akun/agenda`)
- Daftar workshop yang terdaftar
- Status pendaftaran (confirmed, pending, cancelled)
- Nomor registrasi (e-ticket)
- Informasi jadwal
- Tombol batalkan registrasi (jika agenda belum berlangsung)
- **API:** `GET /api/v1/me/agenda`, `POST /api/v1/me/agenda/:id/cancel`

#### 5.3.4 Sertifikat (`/akun/sertifikat`)
- Daftar sertifikat yang diperoleh
- Pencarian berdasarkan nama kursus
- Download sertifikat (PDF)
- Nomor sertifikat unik
- Link verifikasi publik
- **API:** `GET /api/v1/me/certificates`, `GET /api/v1/me/certificates/:id`, `GET /api/v1/certificates/:certNumber/download`

#### 5.3.5 Riwayat Transaksi (`/akun/transaksi`)
- Riwayat semua transaksi user
- Filter status (pending, berhasil, gagal, expired, refund)
- Filter tipe (kursus, agenda)
- Detail order
- **API:** `GET /api/v1/me/transactions`, `GET /api/v1/orders/:id`

#### 5.3.6 Profil (`/akun/profil`)
- Edit nama, telepon, institusi, bio, lokasi
- Upload foto profil (JPG/PNG, maks 2MB)
- **API:** `GET /api/v1/me/profile`, `PUT /api/v1/me/profile`, `POST /api/v1/me/avatar`

#### 5.3.7 Pengaturan (`/akun/pengaturan`)
- Ubah password
- Preferensi notifikasi (email, update kursus, reminder agenda, promosi)
- Hapus akun (dengan konfirmasi password, soft delete, grace period 30 hari)
- **API:** `PUT /api/v1/me/password`, `GET/PUT /api/v1/me/settings/notifications`, `DELETE /api/v1/me/account`

### 5.4 Pembayaran

#### 5.4.1 Checkout Kursus (`/checkout/:id`)
- Ringkasan pesanan (thumbnail, judul, harga)
- Input kode kupon diskon (validasi real-time)
- Pilihan metode pembayaran (transfer bank, e-wallet, QRIS)
- Batas waktu pembayaran (24 jam)
- **API:** `POST /api/v1/courses/:id/checkout`, `POST /api/v1/coupons/validate`, `GET /api/v1/payment-methods`

#### 5.4.2 Sukses Pembayaran (`/checkout/:id/sukses`)
- Konfirmasi pembayaran berhasil
- Link ke course player / halaman agenda
- **API:** `GET /api/v1/orders/:id/status`

#### 5.4.3 Checkout Agenda (`/agenda/:slug/daftar`)
- Form pendaftaran agenda (nama, email, telepon, institusi)
- Untuk agenda gratis: langsung confirmed
- Untuk agenda berbayar: pilih metode pembayaran, batas waktu 24 jam
- **API:** `POST /api/v1/agenda/:slug/register`, `POST /api/v1/agenda/:slug/checkout`

### 5.5 Learning Experience

#### 5.5.1 Course Player (`/belajar/:id`)
- Video player (YouTube embed) atau konten teks
- Sidebar navigasi: Section → Lessons
- Summary per lesson
- Materi pendukung (PDF, slide) yang bisa didownload
- Tracking progress per lesson (tandai selesai)
- Progress bar keseluruhan kursus
- Otomatis generate sertifikat saat kursus selesai (jika kursus memiliki sertifikat)
- **API:** `GET /api/v1/courses/:id/learn`, `POST /api/v1/courses/:courseId/lessons/:lessonId/complete`

#### 5.5.2 Forum Diskusi (dalam Course Player)
- Daftar thread diskusi per lesson
- Buat thread baru (judul + body)
- Reply thread (mendukung nested reply 2 level)
- Upvote reply
- Indikator: pinned, resolved
- **API:** `GET/POST /api/v1/courses/:courseId/lessons/:lessonId/discussions`, `GET/POST /api/v1/discussions/:threadId/replies`, `POST /api/v1/discussions/replies/:replyId/vote`

#### 5.5.3 Review Kursus
- Berikan rating (1-5 bintang) dan komentar
- Hanya bisa review setelah enrolled
- **API:** `POST /api/v1/courses/:id/reviews`

### 5.6 Admin Panel

#### 5.6.1 Dashboard (`/admin`)
- KPI cards: total kursus, pengajar, peserta, pendapatan
- Grafik enrollment bulanan
- Aktivitas terbaru
- Quick actions
- **API:** `GET /api/v1/admin/dashboard`

#### 5.6.2 Manajemen Kursus (`/admin/kursus`)
- Tabel daftar kursus dengan pagination
- Filter berdasarkan status (Published/Draft), kategori, level
- Pencarian kursus
- Tombol tambah, edit, hapus (soft delete)
- **API:** `GET /api/v1/admin/courses`

#### 5.6.3 Tambah/Edit Kursus (`/admin/kursus/baru`, `/admin/kursus/:id/edit`)
- Form: judul, slug, deskripsi, summary, kategori, level, harga (pricing FREE/PAID)
- Pilih pengajar (dropdown dari daftar pengajar aktif)
- Learning points (list teks)
- Manajemen section & lesson (tambah, urutkan, hapus)
- Upload thumbnail dan video promo (YouTube URL)
- Materi pendukung per lesson (upload PDF, slide)
- Status: Published/Draft
- **API:** `POST/PUT /api/v1/admin/courses`, `POST/PUT/DELETE /api/v1/admin/courses/:id/sections`, `POST/PUT/DELETE /api/v1/admin/courses/:id/lessons`

#### 5.6.4 Manajemen Pengajar (`/admin/pengajar`)
- Tabel daftar pengajar
- Statistik per pengajar (kursus, peserta, rating)
- Tambah, edit, hapus pengajar
- Kelola spesialisasi pengajar
- **API:** `GET/POST/PUT/DELETE /api/v1/admin/instructors`

#### 5.6.5 Manajemen Peserta (`/admin/peserta`)
- Tabel daftar peserta
- Status peserta (Aktif/Nonaktif/Suspended)
- Detail progress peserta per kursus
- Filter dan pencarian
- **API:** `GET /api/v1/admin/students`

#### 5.6.6 Manajemen Transaksi (`/admin/transaksi`)
- Riwayat semua transaksi platform
- Status: Success, Pending, Failed, Expired, Refunded
- Filter berdasarkan status, tanggal, tipe (kursus/agenda)
- Detail invoice
- **API:** `GET /api/v1/admin/transactions`

#### 5.6.7 Manajemen Sertifikat (`/admin/sertifikat`)
- Daftar sertifikat yang diterbitkan
- Terbitkan sertifikat manual (untuk kasus khusus)
- Nomor sertifikat otomatis (format: MARBOT-YYYY-XXXX)
- **API:** `GET/POST /api/v1/admin/certificates`

#### 5.6.8 Laporan (`/admin/laporan`)
- Analitik pendapatan (harian, bulanan, tahunan)
- Statistik enrollment per kursus
- Performa kursus (rating, completion rate)
- Export laporan (CSV/Excel)
- **API:** `GET /api/v1/admin/reports/*`

#### 5.6.9 Manajemen Agenda (`/admin/agenda`)
- Tabel daftar agenda
- Status: Published/Draft
- Jumlah pendaftar dan sisa kuota
- CRUD agenda (judul, deskripsi, tanggal, waktu, lokasi, harga, kuota, speaker, benefit)
- **API:** `GET/POST/PUT/DELETE /api/v1/admin/agenda`

#### 5.6.10 Pendaftar Agenda (`/admin/agenda/:slug/pendaftar`)
- Daftar peserta yang mendaftar
- Status pendaftaran (confirmed, pending, cancelled)
- Status pembayaran
- **API:** `GET /api/v1/admin/agenda/:id/registrations`

#### 5.6.11 Pengaturan (`/admin/pengaturan`)
- Pengaturan platform umum (nama, deskripsi, kontak)
- Konfigurasi pembayaran (rekening, payment gateway)
- Hero section content (judul, subtitle, CTA)
- Manajemen FAQ (CRUD)
- Manajemen kupon diskon (CRUD)
- Manajemen kategori kursus dan spesialisasi pengajar
- **API:** `GET/PUT /api/v1/admin/settings`, `GET/POST/PUT/DELETE /api/v1/admin/faqs`, `GET/POST/PUT/DELETE /api/v1/admin/coupons`

---

## 6. Data Model

Dokumentasi lengkap struktur database telah dipisahkan ke file tersendiri:

**[Database Schema Design](database-schema.md)**

Mencakup:
- **27 tabel** dengan hierarki kursus: `courses` → `course_sections` → `lessons` → `course_materials`
- **18 enum definitions** (English, UPPER_SNAKE_CASE) dengan penjelasan detail kapan digunakan dan cara pengisian
- Konvensi: UUID v4 PK, TIMESTAMPTZ, soft delete, snake_case naming
- Struktur kurikulum: Section (INTRODUCTION/MAIN/CLOSING) → Lessons (VIDEO/TEXT/QUIZ)
- Video storage via YouTube private/unlisted link
- Harga kursus: FREE/PAID dengan dukungan diskon (original_price + price + kupon)
- Info tambahan kursus: learning points, has_certificate, has_lifetime_access, language
- Materi pendukung (PDF, slide, dokumen) per kursus atau per lesson
- Forum diskusi (threads, replies dengan nesting 2 level, voting)
- Review & rating per kursus
- Sertifikat otomatis dengan nomor unik
- Tabel pendukung: `faqs`, `coupons`, `site_settings`, `notification_preferences`, `discussion_votes`
- Entity Relationship Diagram (Mermaid) + Data Hierarchy visualization

---

## 7. Referensi API

Dokumentasi API dipisahkan per konteks dan role. Semua endpoint mengikuti konvensi yang didokumentasikan di [README.md](README.md).

### Public (Tanpa Autentikasi)
| File | Deskripsi | Endpoint |
|------|-----------|----------|
| [Landing Page & Informasi Umum](api-spec/public/landing.md) | Landing data, FAQ, statistik platform, pencarian global | 4 endpoint |
| [Kursus](api-spec/public/kursus.md) | Katalog kursus, detail kursus, kategori, review list | 4 endpoint |
| [Pengajar](api-spec/public/pengajar.md) | Daftar pengajar, profil pengajar, spesialisasi | 3 endpoint |
| [Agenda](api-spec/public/agenda.md) | Daftar agenda, detail agenda | 2 endpoint |
| [Sertifikat](api-spec/public/sertifikat.md) | Verifikasi keaslian sertifikat | 1 endpoint |

### Users (Student Role — Bearer Token Required)
| File | Deskripsi | Endpoint |
|------|-----------|----------|
| [Autentikasi](api-spec/users/auth.md) | Register, login, verify OTP, refresh token, logout, lupa & reset password | 7 endpoint |
| [Kursus & Learning](api-spec/users/courses.md) | Enroll, kursus saya, course player, progress, diskusi, review | 10 endpoint |
| [Agenda](api-spec/users/agenda.md) | Registrasi agenda, checkout agenda, agenda saya, cancel | 4 endpoint |
| [Profil & Dashboard](api-spec/users/profile.md) | Dashboard, profil, avatar, password, notifikasi, hapus akun | 8 endpoint |
| [Checkout & Pembayaran](api-spec/users/checkout.md) | Checkout kursus, order detail, transaksi, kupon, payment methods | 7 endpoint |
| [Sertifikat](api-spec/users/sertifikat.md) | Daftar sertifikat, detail, download PDF | 3 endpoint |

### Admin (Admin Role — Bearer Token Required)
| File | Deskripsi | Endpoint |
|------|-----------|----------|
| [Dashboard & Statistik](api-spec/admin/dashboard.md) | Dashboard overview, KPI, grafik | — |
| [Manajemen Kursus](api-spec/admin/kursus.md) | CRUD kursus, section, lesson, materi | — |
| [Manajemen Pengajar](api-spec/admin/pengajar.md) | CRUD pengajar, spesialisasi | — |
| [Manajemen Peserta](api-spec/admin/peserta.md) | Daftar peserta, detail, status | — |
| [Transaksi & Laporan](api-spec/admin/transaksi.md) | Transaksi, laporan pendapatan, export | — |
| [Manajemen Sertifikat](api-spec/admin/sertifikat.md) | Daftar sertifikat, terbitkan manual | — |
| [Manajemen Agenda](api-spec/admin/agenda.md) | CRUD agenda, daftar pendaftar | — |
| [Pengaturan Platform](api-spec/admin/pengaturan.md) | Settings, FAQ, kupon, kategori | — |

**Total: 14 endpoint publik, 39 endpoint users, + endpoint admin**

---

## 8. Non-Functional Requirements

### 8.1 Performa
- Halaman harus load dalam < 3 detik (First Contentful Paint)
- API response time < 500ms untuk operasi read, < 1s untuk operasi write
- Support 1000+ concurrent users
- Pagination wajib untuk semua list endpoint (mencegah query tanpa batas)
- Lazy load images dan komponen berat

### 8.2 Keamanan
- Password di-hash menggunakan bcrypt (min cost factor 10)
- JWT access token (expired 24 jam) + refresh token rotation
- HTTPS untuk semua komunikasi
- Rate limiting pada endpoint sensitif (login, register, OTP, forgot password)
- Input validation dan sanitization di server-side
- CORS configuration untuk domain yang diizinkan
- Signature verification untuk webhook payment gateway
- Soft delete dengan grace period (akun bisa di-restore dalam 30 hari)

### 8.3 Responsivitas
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mendukung semua browser modern (Chrome, Firefox, Safari, Edge)

### 8.4 Aksesibilitas
- Semantic HTML
- ARIA labels pada interactive elements
- Keyboard navigation support
- Color contrast ratio minimal 4.5:1

### 8.5 Reliabilitas
- Graceful error handling dengan pesan error yang informatif dalam Bahasa Indonesia
- Idempotent API design untuk operasi pembayaran
- Transaction safety untuk operasi multi-step (checkout, enrollment)
- Webhook retry mechanism untuk payment notification

---

## 9. Timeline Pengembangan (1 Bulan)

> Target: Dari frontend MVP yang sudah jadi, integrasi backend hingga platform siap untuk soft launch.

### Minggu 1 — Foundation & Core Backend (Day 1-7)

| Hari | Task | Deliverable |
|------|------|-------------|
| 1-2 | Setup project backend (framework, database, migrations) | Repo backend, 27 tabel + 18 enum di PostgreSQL, seeder data dummy |
| 2-3 | Implementasi autentikasi (register, login, verify OTP, refresh token) | 7 endpoint auth berfungsi, JWT + refresh token rotation |
| 3-4 | Implementasi endpoint publik: landing, FAQ, stats, search, kategori, spesialisasi | 8 endpoint publik (landing.md + sebagian kursus/pengajar) |
| 5-6 | Implementasi endpoint publik: katalog kursus, detail kursus, daftar pengajar, profil pengajar | 7 endpoint publik (kursus.md + pengajar.md) |
| 6-7 | Implementasi endpoint publik: daftar agenda, detail agenda, verifikasi sertifikat | 3 endpoint publik (agenda.md + sertifikat.md) |

**Milestone Minggu 1:** Semua halaman publik dan autentikasi terhubung ke backend. Guest bisa browsing kursus, pengajar, dan agenda.

### Minggu 2 — Student Features (Day 8-14)

| Hari | Task | Deliverable |
|------|------|-------------|
| 8-9 | Enrollment kursus (gratis), kursus saya, course player, lesson progress | 4 endpoint learning experience |
| 9-10 | Forum diskusi: threads, replies, voting | 5 endpoint diskusi |
| 10-11 | Review kursus, profil & dashboard user, avatar upload | 5 endpoint (review + profile) |
| 12-13 | Registrasi agenda (gratis & berbayar), agenda saya, cancel registrasi | 4 endpoint agenda users |
| 13-14 | Sertifikat user (list, detail, download PDF), notifikasi preferences, password, delete account | 6 endpoint (sertifikat + settings) |

**Milestone Minggu 2:** Student bisa enroll kursus, belajar via course player, diskusi, review, daftar agenda, lihat sertifikat, dan kelola profil.

### Minggu 3 — Payment & Admin Backend (Day 15-21)

| Hari | Task | Deliverable |
|------|------|-------------|
| 15-16 | Checkout kursus & agenda, validasi kupon, payment methods, payment gateway integration | 7 endpoint checkout + webhook |
| 16-17 | Polling status pembayaran, auto-enrollment setelah bayar, riwayat transaksi | 3 endpoint payment flow |
| 18-19 | Admin dashboard, manajemen kursus (CRUD + section + lesson + materi) | Admin dashboard + kursus endpoints |
| 19-20 | Admin manajemen pengajar, peserta, sertifikat | Admin CRUD endpoints |
| 20-21 | Admin manajemen agenda + pendaftar, transaksi & laporan | Admin agenda + transaksi endpoints |

**Milestone Minggu 3:** Payment flow end-to-end berfungsi. Admin panel backend selesai.

### Minggu 4 — Integration, Testing & Polish (Day 22-30)

| Hari | Task | Deliverable |
|------|------|-------------|
| 22-23 | Admin pengaturan platform (settings, FAQ, kupon, kategori, spesialisasi) | Admin pengaturan endpoints |
| 23-24 | Frontend integration: connect semua halaman ke API, hapus mock data | Frontend fully connected |
| 25-26 | Testing: unit test endpoint kritis (auth, payment, enrollment) | Test coverage untuk critical path |
| 26-27 | Bug fixing, edge case handling, error handling consistency | Stabilitas platform |
| 28-29 | Performance optimization (query optimization, caching, lazy loading) | Response time < 500ms |
| 29-30 | UAT (User Acceptance Testing), seed production data, deployment setup | Ready for soft launch |

**Milestone Minggu 4:** Platform siap soft launch. Semua fitur terintegrasi dan teruji.

### Ringkasan Timeline

```
Minggu 1: [████████████] Foundation & Core Backend
                         → Auth + semua endpoint publik

Minggu 2: [████████████] Student Features
                         → Learning, diskusi, profil, agenda, sertifikat

Minggu 3: [████████████] Payment & Admin
                         → Checkout, payment gateway, admin panel

Minggu 4: [████████████] Integration & Testing
                         → Connect FE-BE, testing, bug fix, deploy
```

### Asumsi & Risiko

| Risiko | Mitigasi |
|--------|----------|
| Payment gateway integration melebihi estimasi | Gunakan sandbox/test mode dulu, production switch di phase berikutnya |
| PDF certificate generation kompleks | Mulai dengan template sederhana, improvement di sprint berikutnya |
| Frontend integration memerlukan banyak penyesuaian | Prioritaskan critical path (auth → browse → enroll → learn → checkout) |
| Database query lambat untuk data besar | Index strategy sudah direncanakan di schema, optimize saat testing |

---

## 10. Roadmap Jangka Panjang

### Phase 1 — MVP (Selesai)
- [x] Frontend SPA dengan React + TypeScript
- [x] Semua halaman UI (public, student, admin)
- [x] Mock data dan localStorage
- [x] Dokumentasi PRD, database schema, dan API spec

### Phase 2 — Backend Integration (1 Bulan — Timeline di atas)
- [ ] REST API dengan authentication (JWT + refresh token)
- [ ] Database PostgreSQL (27 tabel, 18 enum)
- [ ] File upload (thumbnail, avatar, materi PDF)
- [ ] Payment gateway integration
- [ ] PDF certificate generation
- [ ] Soft launch

### Phase 3 — Enhancement (Bulan 2-3)
- [ ] Real-time notifications (WebSocket / SSE)
- [ ] Advanced analytics dashboard admin
- [ ] Email notifications (welcome, payment confirmation, course completion)
- [ ] Search optimization (full-text search PostgreSQL)
- [ ] Social login (Google OAuth)
- [ ] Mobile responsive polish
- [ ] SEO optimization (meta tags, sitemap, structured data)

### Phase 4 — Scale (Bulan 4+)
- [ ] CDN untuk asset statis
- [ ] Redis caching layer
- [ ] Background job processing (queue untuk email, PDF generation)
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Instructor dashboard (self-service kursus upload)
