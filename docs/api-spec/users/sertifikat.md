# API Spec — Sertifikat (Users)

> Endpoint untuk melihat dan mendownload sertifikat user.

**Base URL:** `/api/v1/me`

---

## 1. Get Daftar Sertifikat

Mengambil daftar sertifikat yang diperoleh user.

**Endpoint:** `GET /api/v1/me/certificates`
**Auth:** Bearer Token (Required, role: STUDENT)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| q | string | - | Pencarian berdasarkan nama kursus |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "certificate_number": "MARBOT-2025-001",
      "course": {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
        "instructor": {
          "name": "Ustadz Ahmad Fauzi"
        }
      },
      "issued_at": "2025-01-15T00:00:00Z",
      "expired_at": null,
      "file_url": "/api/v1/certificates/MARBOT-2025-001/download"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 2,
    "total_pages": 1
  }
}
```

> **Catatan**: `expired_at` NULL berarti sertifikat berlaku selamanya. `file_url` mengarah ke endpoint download PDF.

**Halaman terkait:** `/akun/sertifikat` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

---

## 2. Get Detail Sertifikat

Mengambil detail satu sertifikat.

**Endpoint:** `GET /api/v1/me/certificates/:id`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Certificate UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "certificate_number": "MARBOT-2025-001",
    "student": {
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com"
    },
    "course": {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "instructor": {
        "name": "Ustadz Ahmad Fauzi"
      },
      "duration": "4 jam 30 menit",
      "lessons_count": 12
    },
    "issued_at": "2025-01-15T00:00:00Z",
    "expired_at": null,
    "completed_at": "2025-01-15T11:00:00Z",
    "file_url": "/api/v1/certificates/MARBOT-2025-001/download",
    "verify_url": "https://marbot.id/verify/MARBOT-2025-001"
  }
}
```

> **Catatan**: `completed_at` diambil dari `enrollments.completed_at` (kapan user menyelesaikan kursus). `verify_url` adalah URL publik untuk verifikasi keaslian sertifikat.

---

## 3. Download Sertifikat (PDF)

Mendownload sertifikat dalam format PDF.

**Endpoint:** `GET /api/v1/certificates/:certNumber/download`
**Auth:** Bearer Token (Required)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| certNumber | string | Nomor sertifikat (e.g., `MARBOT-2025-001`) |

### Response — 200 OK

**Content-Type:** `application/pdf`
**Content-Disposition:** `attachment; filename="sertifikat-MARBOT-2025-001.pdf"`

> Binary PDF file

> **Catatan**: Server bisa men-generate PDF on-the-fly atau redirect ke `certificates.file_url` jika file sudah di-generate dan disimpan di storage.

### Response — 404 Not Found

```json
{
  "message": "Sertifikat tidak ditemukan"
}
```

---

## 4. Verifikasi Sertifikat (Public)

Memverifikasi keaslian sertifikat. Endpoint publik untuk verifikasi.

**Endpoint:** `GET /api/v1/certificates/verify/:certNumber`
**Auth:** Tidak diperlukan

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| certNumber | string | Nomor sertifikat |

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

### Response — 200 OK (Invalid)

```json
{
  "data": {
    "is_valid": false,
    "message": "Nomor sertifikat tidak ditemukan dalam sistem"
  }
}
```

> **Catatan**: Jika `expired_at` tidak NULL dan sudah lewat, `is_valid` tetap TRUE tapi tambahkan field `is_expired: true` agar frontend bisa menampilkan status kadaluarsa.
