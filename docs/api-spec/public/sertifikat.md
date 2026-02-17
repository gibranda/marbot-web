# API Spec — Verifikasi Sertifikat (Public)

> Endpoint publik untuk memverifikasi keaslian sertifikat. Tidak memerlukan autentikasi.

**Base URL:** `/api/v1`

---

## 1. Verifikasi Sertifikat

Memverifikasi keaslian sertifikat berdasarkan nomor sertifikat. Endpoint publik yang dapat diakses siapa saja untuk mengecek validitas sertifikat.

**Endpoint:** `GET /api/v1/certificates/verify/:certNumber`
**Auth:** Tidak diperlukan

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| certNumber | string | Nomor sertifikat (e.g., `MARBOT-2025-001`) |

### Response — 200 OK (Valid)

```json
{
  "data": {
    "is_valid": true,
    "certificate_number": "MARBOT-2025-001",
    "student_name": "Ahmad Fauzi",
    "course_title": "Standar Operasional Kebersihan Masjid",
    "issued_at": "2025-01-15T00:00:00Z",
    "expired_at": null,
    "issued_by": "Marbot LMS"
  }
}
```

### Response — 200 OK (Valid, Expired)

```json
{
  "data": {
    "is_valid": true,
    "is_expired": true,
    "certificate_number": "MARBOT-2025-001",
    "student_name": "Ahmad Fauzi",
    "course_title": "Standar Operasional Kebersihan Masjid",
    "issued_at": "2025-01-15T00:00:00Z",
    "expired_at": "2025-07-15T00:00:00Z",
    "issued_by": "Marbot LMS"
  }
}
```

### Response — 200 OK (Invalid)

```json
{
  "data": {
    "is_valid": false,
    "message": "Nomor sertifikat tidak ditemukan dalam sistem"
  }
}
```

> **Catatan**: Endpoint ini return 200 OK untuk semua kasus — `is_valid` menentukan apakah sertifikat valid. Jika `expired_at` tidak NULL dan sudah lewat, `is_valid` tetap `true` tapi ditambahkan field `is_expired: true` agar frontend bisa menampilkan status kadaluarsa. `expired_at` NULL berarti sertifikat berlaku selamanya.

**Halaman terkait:** `/verify/:certNumber` — halaman publik verifikasi sertifikat
