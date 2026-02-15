# API Spec — Manajemen Peserta (Admin)

> Endpoint untuk mengelola dan memonitor data peserta/student.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Students

Mengambil daftar semua peserta (users dengan role STUDENT).

**Endpoint:** `GET /api/v1/admin/students`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan nama atau email |
| status | string | - | Filter: `ACTIVE`, `INACTIVE`, `SUSPENDED` |
| sort | string | `-created_at` | Sorting: `name`, `-name`, `created_at`, `-created_at`, `-courses_count`, `-last_login_at` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "avatar_url": "https://storage.example.com/avatars/user-1.jpg",
      "status": "ACTIVE",
      "email_verified_at": "2025-01-01T08:00:00Z",
      "courses_count": 3,
      "last_login_at": "2025-01-14T08:30:00Z",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 5000,
    "page": 1,
    "per_page": 10,
    "total_pages": 500
  },
  "links": {
    "self": "/api/v1/admin/students?page=1&per_page=10",
    "next": "/api/v1/admin/students?page=2&per_page=10",
    "last": "/api/v1/admin/students?page=500&per_page=10"
  }
}
```

> **Computed fields**: `courses_count` dihitung via `COUNT(enrollments) WHERE user_id = ? AND status != 'DROPPED'`.

---

## 2. Get Student Detail

Mengambil detail satu peserta beserta statistik, riwayat enrollment, dan transaksi.

**Endpoint:** `GET /api/v1/admin/students/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | User UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi",
    "email": "ahmad@email.com",
    "phone": "081234567890",
    "avatar_url": "https://storage.example.com/avatars/user-1.jpg",
    "status": "ACTIVE",
    "email_verified_at": "2025-01-01T08:00:00Z",
    "phone_verified_at": null,
    "last_login_at": "2025-01-14T08:30:00Z",
    "created_at": "2025-01-01T00:00:00Z",
    "stats": {
      "courses_enrolled": 3,
      "courses_completed": 1,
      "certificates_earned": 1,
      "agendas_registered": 2,
      "total_spent": 350000
    },
    "enrollments": [
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid"
        },
        "progress": 100.00,
        "status": "COMPLETED",
        "enrolled_at": "2025-01-02T00:00:00Z",
        "completed_at": "2025-01-10T00:00:00Z"
      },
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Manajemen Keuangan Masjid"
        },
        "progress": 45.00,
        "status": "ACTIVE",
        "enrolled_at": "2025-01-08T00:00:00Z",
        "completed_at": null
      }
    ],
    "recent_transactions": [
      {
        "id": "uuid-string",
        "invoice_number": "INV-CRS-2025-0042",
        "amount": 250000,
        "status": "SUCCESS",
        "created_at": "2025-01-08T00:00:00Z"
      }
    ]
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Peserta tidak ditemukan"
  }
}
```

---

## 3. Update Student Status

Mengubah status peserta (aktif/nonaktif/suspended).

**Endpoint:** `PATCH /api/v1/admin/students/:id/status`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | User UUID |

### Request Body

```json
{
  "status": "SUSPENDED"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `ACTIVE`, `INACTIVE`, `SUSPENDED` |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "status": "SUSPENDED",
    "updated_at": "2025-01-15T10:00:00Z"
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
        "field": "status",
        "message": "Status tidak valid",
        "code": "invalid_enum"
      }
    ]
  }
}
```

---

## 4. Reset Student Access

Mereset akses kursus peserta ke kondisi awal (progress kembali ke 0%, lesson completions dihapus). Digunakan jika peserta mengalami masalah teknis atau perlu mengulang materi.

**Endpoint:** `POST /api/v1/admin/students/:id/reset-access`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | User UUID |

### Request Body

```json
{
  "enrollment_id": "uuid-string",
  "reason": "Peserta mengalami error saat mengakses modul 3"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| enrollment_id | string | Ya | UUID enrollment yang valid milik student ini |
| reason | string | Tidak | Alasan reset akses |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "enrollment_id": "uuid-string",
    "course_title": "Standar Operasional Kebersihan Masjid",
    "progress": 0.00,
    "status": "ACTIVE",
    "reset_at": "2025-01-15T12:00:00Z"
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Enrollment tidak ditemukan untuk peserta ini"
  }
}
```

> **Catatan**: Reset akses akan menghapus semua `lesson_completions` untuk enrollment tersebut dan mengubah `progress` menjadi 0. Status enrollment tetap `ACTIVE`. Jika peserta sudah memiliki sertifikat untuk kursus ini, sertifikat tidak akan dicabut.

---

## 5. Export Students

Mengekspor daftar peserta ke file CSV/Excel.

**Endpoint:** `GET /api/v1/admin/students/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| status | string | - | Filter status: `ACTIVE`, `INACTIVE`, `SUSPENDED` |

### Response — 200 OK

**Content-Type:** `text/csv` atau `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
**Content-Disposition:** `attachment; filename="students-2025-01-15.csv"`

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
