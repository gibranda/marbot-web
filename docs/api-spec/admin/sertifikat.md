# API Spec — Manajemen Sertifikat (Admin)

> Endpoint untuk mengelola penerbitan dan tracking sertifikat.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Certificates

Mengambil daftar semua sertifikat yang diterbitkan.

**Endpoint:** `GET /api/v1/admin/certificates`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan nama peserta atau certificate_number |
| course_id | string | - | Filter UUID kursus |
| date_from | string | - | Tanggal terbit mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal terbit akhir (YYYY-MM-DD) |
| sort | string | `-issued_at` | Sorting: `issued_at`, `-issued_at`, `certificate_number`, `-certificate_number` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "certificate_number": "MARBOT-2025-001",
      "user": {
        "id": "uuid-string",
        "name": "Ahmad Fauzi",
        "email": "ahmad@email.com"
      },
      "course": {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid"
      },
      "issued_at": "2025-01-15T00:00:00Z",
      "expired_at": null,
      "file_url": "https://storage.example.com/certificates/MARBOT-2025-001.pdf"
    }
  ],
  "meta": {
    "total": 3200,
    "page": 1,
    "per_page": 10,
    "total_pages": 320
  },
  "links": {
    "self": "/api/v1/admin/certificates?page=1&per_page=10",
    "next": "/api/v1/admin/certificates?page=2&per_page=10",
    "last": "/api/v1/admin/certificates?page=320&per_page=10"
  },
  "summary": {
    "total_certificates": 3200,
    "issued_this_month": 45
  }
}
```

---

## 2. Issue Certificate

Menerbitkan sertifikat secara manual untuk peserta tertentu.

**Endpoint:** `POST /api/v1/admin/certificates`

### Request Body

```json
{
  "user_id": "uuid-string",
  "course_id": "uuid-string"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| user_id | string | Ya | UUID peserta yang valid dan memiliki enrollment COMPLETED untuk kursus ini |
| course_id | string | Ya | UUID kursus yang valid dan `has_certificate = true` |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/certificates/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "certificate_number": "MARBOT-2025-046",
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi"
    },
    "course": {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid"
    },
    "issued_at": "2025-01-15T10:00:00Z",
    "expired_at": null,
    "file_url": "https://storage.example.com/certificates/MARBOT-2025-046.pdf"
  }
}
```

### Response — 409 Conflict

```json
{
  "error": {
    "code": "certificate_exists",
    "message": "Peserta sudah memiliki sertifikat untuk kursus ini"
  }
}
```

### Response — 422 Unprocessable Entity

```json
{
  "error": {
    "code": "validation_error",
    "message": "Validasi gagal",
    "details": [
      {
        "field": "user_id",
        "message": "Peserta belum menyelesaikan kursus ini",
        "code": "enrollment_not_completed"
      }
    ]
  }
}
```

> **Catatan**: `certificate_number` dan `file_url` di-generate otomatis oleh server. Sertifikat hanya bisa diterbitkan untuk kursus yang `has_certificate = true` dan peserta yang enrollment-nya `COMPLETED`.

---

## 3. Batch Issue Certificates

Menerbitkan sertifikat untuk banyak peserta sekaligus.

**Endpoint:** `POST /api/v1/admin/certificates/batch`

### Request Body

```json
{
  "course_id": "uuid-string",
  "user_ids": ["uuid-1", "uuid-2", "uuid-3"]
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| course_id | string | Ya | UUID kursus yang valid |
| user_ids | array | Ya | Array UUID peserta yang valid, min 1, max 100 |

### Response — 201 Created

```json
{
  "data": {
    "issued": 3,
    "skipped": 0,
    "certificates": [
      {
        "id": "uuid-string",
        "certificate_number": "MARBOT-2025-046",
        "user_name": "Ahmad Fauzi"
      },
      {
        "id": "uuid-string",
        "certificate_number": "MARBOT-2025-047",
        "user_name": "Budi Santoso"
      },
      {
        "id": "uuid-string",
        "certificate_number": "MARBOT-2025-048",
        "user_name": "Candra Wijaya"
      }
    ],
    "skipped_details": []
  }
}
```

> **Catatan**: Peserta yang sudah memiliki sertifikat untuk kursus tersebut akan di-skip (bukan error). Detail skip alasan ditampilkan di `skipped_details`.

---

## 4. Revoke Certificate

Mencabut/membatalkan sertifikat (hard delete).

**Endpoint:** `DELETE /api/v1/admin/certificates/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Certificate UUID |

### Response — 204 No Content

_(empty body)_

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Sertifikat tidak ditemukan"
  }
}
```

---

## 5. List Eligible Students

Mengambil daftar peserta yang sudah menyelesaikan kursus tapi belum memiliki sertifikat.

**Endpoint:** `GET /api/v1/admin/certificates/eligible`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| course_id | string | - | Filter UUID kursus (required) |

### Response — 200 OK

```json
{
  "data": [
    {
      "user_id": "uuid-string",
      "user_name": "Ahmad Fauzi",
      "user_email": "ahmad@email.com",
      "course_id": "uuid-string",
      "course_title": "Standar Operasional Kebersihan Masjid",
      "completed_at": "2025-01-15T11:00:00Z"
    }
  ],
  "meta": {
    "total": 5
  }
}
```

---

## 6. Export Certificates

Mengekspor daftar sertifikat.

**Endpoint:** `GET /api/v1/admin/certificates/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| course_id | string | - | Filter UUID kursus |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |

### Response — 200 OK

**Content-Type:** `text/csv` atau `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
**Content-Disposition:** `attachment; filename="certificates-2025-01-15.csv"`

> Binary file download.

---

## Error Responses (Global)

### 401 Unauthorized

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Token tidak valid atau sudah kadaluarsa"
  }
}
```

### 403 Forbidden

```json
{
  "error": {
    "code": "forbidden",
    "message": "Anda tidak memiliki akses untuk resource ini"
  }
}
```
