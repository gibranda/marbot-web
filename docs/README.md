# Dokumentasi Marbot LMS

Dokumentasi lengkap untuk project **Marbot LMS** — Platform Learning Management System untuk Manajemen Masjid.

---

## Struktur Dokumentasi

```
docs/
├── README.md                          # File ini
├── PRD.md                             # Product Requirements Document
└── api-spec/                          # API Specification
    ├── public/                        # Endpoint publik (tanpa login)
    │   ├── landing.md                 # Landing page & informasi umum
    │   └── pengajar.md                # Browse & profil pengajar
    ├── users/                         # Endpoint untuk role Student
    │   ├── auth.md                    # Register, Login, Verify, Logout
    │   ├── courses.md                 # Katalog, detail, enroll, learning
    │   ├── agenda.md                  # Daftar agenda, detail, registrasi
    │   ├── profile.md                 # Dashboard, profil, pengaturan akun
    │   ├── checkout.md                # Checkout, pembayaran, transaksi
    │   └── sertifikat.md              # Daftar & download sertifikat
    └── admin/                         # Endpoint untuk role Admin
        ├── dashboard.md               # Dashboard & statistik
        ├── kursus.md                  # CRUD kursus & modul
        ├── pengajar.md                # CRUD pengajar
        ├── peserta.md                 # Manajemen peserta
        ├── transaksi.md               # Transaksi & laporan
        ├── sertifikat.md              # Manajemen sertifikat
        ├── agenda.md                  # CRUD agenda & pendaftar
        └── pengaturan.md              # Pengaturan platform
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
- Token expired dalam 24 jam, gunakan refresh token untuk perpanjang

### Format Response Standard

**Success:**
```json
{
  "success": true,
  "message": "Deskripsi sukses",
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Deskripsi error",
  "errors": { }
}
```

### HTTP Status Codes

| Code | Keterangan |
|------|------------|
| 200 | OK — Request berhasil |
| 201 | Created — Resource berhasil dibuat |
| 400 | Bad Request — Request tidak valid |
| 401 | Unauthorized — Token tidak valid/expired |
| 403 | Forbidden — Tidak memiliki akses |
| 404 | Not Found — Resource tidak ditemukan |
| 409 | Conflict — Konflik data (duplikat, kuota penuh) |
| 422 | Validation Error — Validasi input gagal |
| 429 | Too Many Requests — Rate limit exceeded |
| 500 | Internal Server Error — Error di server |

### Pagination
Semua endpoint list menggunakan pagination standard:
```json
{
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10,
    "has_next": true,
    "has_prev": false
  }
}
```
