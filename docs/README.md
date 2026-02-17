# Dokumentasi Marbot LMS

Dokumentasi lengkap untuk project **Marbot LMS** — Platform Learning Management System untuk Manajemen Masjid.

---

## Struktur Dokumentasi

```
docs/
├── README.md                          # File ini — konvensi API & panduan
├── PRD.md                             # Product Requirements Document
├── database-schema.md                 # Database Schema Design (27 tabel, 18 enum)
└── api-spec/                          # API Specification
    ├── public/                        # Endpoint publik (tanpa login)
    │   ├── landing.md                 # Landing page, FAQ, statistik, pencarian global
    │   ├── kursus.md                  # Katalog kursus, detail kursus, kategori, review
    │   ├── pengajar.md                # Browse & profil pengajar, spesialisasi
    │   ├── agenda.md                  # Daftar agenda, detail agenda
    │   └── sertifikat.md             # Verifikasi keaslian sertifikat
    ├── users/                         # Endpoint untuk role Student (Bearer Token)
    │   ├── auth.md                    # Register, Login, OTP, Refresh, Logout, Reset Password
    │   ├── courses.md                 # Enroll, kursus saya, player, progress, diskusi, review
    │   ├── agenda.md                  # Registrasi agenda, checkout, agenda saya, cancel
    │   ├── profile.md                 # Dashboard, profil, avatar, password, notifikasi, hapus akun
    │   ├── checkout.md                # Checkout kursus, order, transaksi, kupon, payment methods
    │   └── sertifikat.md              # Daftar sertifikat, detail, download PDF
    └── admin/                         # Endpoint untuk role Admin (Bearer Token)
        ├── dashboard.md               # Dashboard & statistik
        ├── kursus.md                  # CRUD kursus, section, lesson, materi
        ├── pengajar.md                # CRUD pengajar & spesialisasi
        ├── peserta.md                 # Manajemen peserta
        ├── transaksi.md               # Transaksi & laporan
        ├── sertifikat.md              # Manajemen sertifikat
        ├── agenda.md                  # CRUD agenda & pendaftar
        └── pengaturan.md              # Pengaturan platform, FAQ, kupon
```

---

## Konvensi API

### Base URL
```
Production: https://api.marbot.id/api/v1
Development: http://localhost:8000/api/v1
```

### Autentikasi
- Menggunakan **JWT Bearer Token**
- Token dikirim via header: `Authorization: Bearer <token>`
- Access token expired dalam 24 jam
- Refresh token rotation — setiap kali refresh, token lama di-revoke dan token baru diterbitkan
- Endpoint publik (`public/`) tidak memerlukan token
- Beberapa endpoint publik menerima token opsional untuk memperkaya response (contoh: `is_enrolled` pada detail kursus)

### Format Response

**Success (Single Object):**
```json
{
  "data": { ... },
  "message": "Deskripsi sukses (opsional)"
}
```

**Success (List/Collection):**
```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

**Error:**
```json
{
  "message": "Deskripsi error"
}
```

**Validation Error (422):**
```json
{
  "message": "Validasi gagal",
  "errors": {
    "field_name": ["Pesan error untuk field ini"]
  }
}
```

> **Catatan**: Response tidak menggunakan wrapper `"success": true/false`. Keberhasilan ditentukan dari HTTP status code (2xx = sukses, 4xx/5xx = error). Field `message` bersifat opsional pada response sukses, wajib pada response error.

### HTTP Status Codes

| Code | Keterangan |
|------|------------|
| 200 | OK — Request berhasil |
| 201 | Created — Resource berhasil dibuat |
| 400 | Bad Request — Request tidak valid (business logic error) |
| 401 | Unauthorized — Token tidak valid/expired |
| 402 | Payment Required — Pembayaran diperlukan |
| 403 | Forbidden — Tidak memiliki akses |
| 404 | Not Found — Resource tidak ditemukan |
| 409 | Conflict — Konflik data (duplikat, kuota penuh) |
| 422 | Validation Error — Validasi input gagal |
| 429 | Too Many Requests — Rate limit exceeded |
| 500 | Internal Server Error — Error di server |

### Pagination

Semua endpoint yang mengembalikan list/collection menggunakan pagination dengan format `meta`:

```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

Query parameter pagination:

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| `page` | number | 1 | Nomor halaman |
| `per_page` | number | 10 atau 12 | Jumlah item per halaman |

### Konvensi Naming

| Aspek | Konvensi | Contoh |
|-------|----------|--------|
| Endpoint URL | kebab-case | `/api/v1/payment-methods` |
| Query parameter | snake_case | `?category_id=xxx&per_page=12` |
| JSON field | snake_case | `created_at`, `thumbnail_url`, `lessons_count` |
| Enum values | UPPER_SNAKE_CASE | `BEGINNER`, `BANK_TRANSFER`, `PUBLISHED` |
| URL suffix | `_url` | `thumbnail_url`, `avatar_url`, `cover_url`, `file_url` |
| Timestamp suffix | `_at` | `created_at`, `enrolled_at`, `paid_at` |
| Count suffix | `_count` | `lessons_count`, `students_count`, `replies_count` |

### Sorting

Sorting menggunakan query parameter `sort` dengan konvensi prefix `-` untuk descending:

| Nilai | Keterangan |
|-------|------------|
| `sort=name` | Ascending by name |
| `sort=-name` | Descending by name |
| `sort=-created_at` | Terbaru (default di banyak endpoint) |
| `sort=-rating` | Rating tertinggi |
| `sort=price` | Harga termurah |
| `sort=-price` | Harga termahal |

### Pencarian

Semua endpoint pencarian menggunakan query parameter `q`:

```
GET /api/v1/courses?q=kebersihan
GET /api/v1/instructors?q=ahmad
GET /api/v1/search?q=masjid
```

### Enum Reference

Referensi enum yang sering digunakan di API (lengkap di [database-schema.md](database-schema.md)):

| Enum | Values | Digunakan di |
|------|--------|-------------|
| `CourseLevel` | `BEGINNER`, `INTERMEDIATE`, `ADVANCED` | Filter & display level kursus |
| `CoursePricing` | `FREE`, `PAID` | Filter & display harga kursus |
| `CourseStatus` | `DRAFT`, `PUBLISHED`, `ARCHIVED` | Status kursus |
| `AgendaType` | `ONLINE`, `OFFLINE`, `HYBRID` | Filter tipe agenda |
| `PaymentMethod` | `BANK_TRANSFER`, `E_WALLET`, `QRIS`, `VIRTUAL_ACCOUNT` | Metode pembayaran |
| `TransactionStatus` | `PENDING`, `SUCCESS`, `FAILED`, `EXPIRED`, `REFUNDED` | Status transaksi |
| `EnrollmentStatus` | `ACTIVE`, `COMPLETED`, `DROPPED` | Status enrollment kursus |
| `RegistrationStatus` | `PENDING`, `CONFIRMED`, `CANCELLED` | Status registrasi agenda |

---

## Referensi Cepat

- **PRD**: [PRD.md](PRD.md) — Product Requirements, fitur, timeline, roadmap
- **Database**: [database-schema.md](database-schema.md) — 27 tabel, 18 enum, ERD
- **API Public**: [api-spec/public/](api-spec/public/) — 14 endpoint tanpa auth
- **API Users**: [api-spec/users/](api-spec/users/) — 39 endpoint dengan auth student
- **API Admin**: [api-spec/admin/](api-spec/admin/) — endpoint dengan auth admin
