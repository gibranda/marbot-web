# API Spec — Sertifikat (Users)

> Endpoint untuk melihat dan mendownload sertifikat user.

**Base URL:** `/api/v1/me`

---

## 1. Get Daftar Sertifikat

Mengambil daftar sertifikat yang diperoleh user.

**Endpoint:** `GET /api/v1/me/certificates`
**Auth:** Bearer Token (Required, role: student)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama kursus |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "id": "uuid-string",
        "cert_number": "MARBOT-2025-001",
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid",
          "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
          "instructor": {
            "name": "Ustadz Ahmad Fauzi"
          }
        },
        "issue_date": "2025-01-15T00:00:00Z",
        "download_url": "/api/v1/certificates/MARBOT-2025-001/download"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 2,
      "total_pages": 1
    }
  }
}
```

**Halaman terkait:** `/akun/sertifikat` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 2. Get Detail Sertifikat

Mengambil detail satu sertifikat.

**Endpoint:** `GET /api/v1/me/certificates/:id`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Certificate UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "cert_number": "MARBOT-2025-001",
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
      "modules_count": 12
    },
    "issue_date": "2025-01-15T00:00:00Z",
    "completed_at": "2025-01-15T11:00:00Z",
    "download_url": "/api/v1/certificates/MARBOT-2025-001/download",
    "verify_url": "https://marbot.id/verify/MARBOT-2025-001"
  }
}
```

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

### Response — 404 Not Found

```json
{
  "success": false,
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
  "success": true,
  "data": {
    "is_valid": true,
    "cert_number": "MARBOT-2025-001",
    "student_name": "Ahmad Fauzi",
    "course_title": "Standar Operasional Kebersihan Masjid",
    "issue_date": "2025-01-15T00:00:00Z",
    "issued_by": "Marbot LMS"
  }
}
```

### Response — 200 OK (Invalid)

```json
{
  "success": true,
  "data": {
    "is_valid": false,
    "message": "Nomor sertifikat tidak ditemukan dalam sistem"
  }
}
```
