# API Spec — Manajemen Peserta (Admin)

> Endpoint untuk mengelola dan memonitor data peserta/student.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Peserta

Mengambil daftar semua peserta.

**Endpoint:** `GET /api/v1/admin/students`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama/email |
| status | string | - | Filter: `Aktif`, `Nonaktif` |
| sort | string | `newest` | Sorting: `newest`, `name_asc`, `name_desc`, `courses`, `progress` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "uuid-string",
        "name": "Ahmad Fauzi",
        "email": "ahmad@email.com",
        "phone": "081234567890",
        "avatar": "https://storage.example.com/avatars/user-1.jpg",
        "courses_joined": 3,
        "progress": 65,
        "status": "Aktif",
        "join_date": "2025-01-01T00:00:00Z",
        "last_active": "2025-01-14T08:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 50,
      "total_pages": 5
    }
  }
}
```

**Halaman terkait:** `/admin/peserta` — [AdminPeserta.tsx](../../src/pages/admin/AdminPeserta.tsx)

---

## 2. Get Detail Peserta

Mengambil detail satu peserta beserta riwayat enrollment.

**Endpoint:** `GET /api/v1/admin/students/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Student UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi",
    "email": "ahmad@email.com",
    "phone": "081234567890",
    "avatar": "https://storage.example.com/avatars/user-1.jpg",
    "institution": "Masjid Al-Ikhlas",
    "location": "Jakarta Selatan",
    "status": "Aktif",
    "join_date": "2025-01-01T00:00:00Z",
    "last_active": "2025-01-14T08:30:00Z",
    "stats": {
      "courses_joined": 3,
      "courses_completed": 1,
      "certificates_earned": 1,
      "agenda_registered": 2,
      "total_spent": 350000,
      "total_spent_display": "Rp 350.000"
    },
    "enrollments": [
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid"
        },
        "progress": 100,
        "status": "completed",
        "enrolled_at": "2025-01-02T00:00:00Z",
        "completed_at": "2025-01-10T00:00:00Z"
      },
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Manajemen Keuangan Masjid"
        },
        "progress": 45,
        "status": "active",
        "enrolled_at": "2025-01-08T00:00:00Z",
        "completed_at": null
      }
    ],
    "transactions": [
      {
        "id": "uuid-string",
        "invoice": "INV-CRS-2025-0042",
        "item_title": "Manajemen Keuangan Masjid",
        "amount": 250000,
        "status": "Berhasil",
        "date": "2025-01-08T00:00:00Z"
      }
    ]
  }
}
```

---

## 3. Update Status Peserta

Mengubah status peserta (aktif/nonaktif).

**Endpoint:** `PATCH /api/v1/admin/students/:id/status`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Student UUID |

### Request Body

```json
{
  "status": "Nonaktif",
  "reason": "Akun melanggar ketentuan"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `Aktif`, `Nonaktif` |
| reason | string | Tidak | Alasan perubahan status |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Status peserta berhasil diubah menjadi Nonaktif"
}
```

---

## 4. Export Daftar Peserta

Mengekspor daftar peserta ke file CSV/Excel.

**Endpoint:** `GET /api/v1/admin/students/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| status | string | - | Filter status |

### Response — 200 OK

**Content-Type:** `text/csv` atau `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
**Content-Disposition:** `attachment; filename="peserta-2025-01-15.csv"`

> Binary file download
