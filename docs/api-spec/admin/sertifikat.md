# API Spec — Manajemen Sertifikat (Admin)

> Endpoint untuk mengelola penerbitan dan tracking sertifikat.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Sertifikat

Mengambil daftar semua sertifikat yang diterbitkan.

**Endpoint:** `GET /api/v1/admin/certificates`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama peserta/nomor sertifikat |
| course_id | string | - | Filter berdasarkan kursus |
| date_from | string | - | Tanggal terbit mulai |
| date_to | string | - | Tanggal terbit akhir |
| sort | string | `newest` | Sorting: `newest`, `oldest`, `name_asc` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "id": "uuid-string",
        "cert_number": "MARBOT-2025-001",
        "student": {
          "id": "uuid-string",
          "name": "Ahmad Fauzi",
          "email": "ahmad@email.com"
        },
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid"
        },
        "issue_date": "2025-01-15T00:00:00Z"
      }
    ],
    "summary": {
      "total_certificates": 3200,
      "this_month": 45
    },
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 3200,
      "total_pages": 320
    }
  }
}
```

**Halaman terkait:** `/admin/sertifikat` — [AdminSertifikat.tsx](../../src/pages/admin/AdminSertifikat.tsx)

---

## 2. Issue Sertifikat Manual

Menerbitkan sertifikat secara manual untuk peserta tertentu.

**Endpoint:** `POST /api/v1/admin/certificates`

### Request Body

```json
{
  "student_id": "uuid-string",
  "course_id": "uuid-string"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| student_id | string | Ya | UUID peserta yang valid dan enrolled |
| course_id | string | Ya | UUID kursus yang valid |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Sertifikat berhasil diterbitkan",
  "data": {
    "id": "uuid-string",
    "cert_number": "MARBOT-2025-046",
    "student_name": "Ahmad Fauzi",
    "course_title": "Standar Operasional Kebersihan Masjid",
    "issue_date": "2025-01-15T10:00:00Z"
  }
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Peserta sudah memiliki sertifikat untuk kursus ini"
}
```

---

## 3. Batch Issue Sertifikat

Menerbitkan sertifikat untuk banyak peserta sekaligus.

**Endpoint:** `POST /api/v1/admin/certificates/batch`

### Request Body

```json
{
  "course_id": "uuid-string",
  "student_ids": ["uuid-1", "uuid-2", "uuid-3"]
}
```

### Response — 201 Created

```json
{
  "success": true,
  "message": "3 sertifikat berhasil diterbitkan",
  "data": {
    "issued": 3,
    "skipped": 0,
    "certificates": [
      {
        "cert_number": "MARBOT-2025-046",
        "student_name": "Ahmad Fauzi"
      },
      {
        "cert_number": "MARBOT-2025-047",
        "student_name": "Budi Santoso"
      },
      {
        "cert_number": "MARBOT-2025-048",
        "student_name": "Candra Wijaya"
      }
    ]
  }
}
```

---

## 4. Revoke Sertifikat

Mencabut/membatalkan sertifikat.

**Endpoint:** `DELETE /api/v1/admin/certificates/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Certificate UUID |

### Request Body

```json
{
  "reason": "Peserta melakukan kecurangan"
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Sertifikat berhasil dicabut"
}
```

---

## 5. Get Peserta Eligible Sertifikat

Mengambil daftar peserta yang sudah menyelesaikan kursus tapi belum memiliki sertifikat.

**Endpoint:** `GET /api/v1/admin/certificates/eligible`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| course_id | string | - | Filter berdasarkan kursus |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "eligible_students": [
      {
        "student_id": "uuid-string",
        "student_name": "Ahmad Fauzi",
        "course_id": "uuid-string",
        "course_title": "Standar Operasional Kebersihan Masjid",
        "completed_at": "2025-01-15T11:00:00Z"
      }
    ],
    "total": 5
  }
}
```

---

## 6. Export Sertifikat

Mengekspor daftar sertifikat.

**Endpoint:** `GET /api/v1/admin/certificates/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| course_id | string | - | Filter berdasarkan kursus |
| date_from | string | - | Tanggal mulai |
| date_to | string | - | Tanggal akhir |

### Response — 200 OK

Binary file download.
