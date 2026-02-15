# API Spec — Manajemen Agenda (Admin)

> Endpoint CRUD untuk mengelola agenda/workshop dan pendaftar.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Agendas

Mengambil daftar semua agenda untuk admin.

**Endpoint:** `GET /api/v1/admin/agendas`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan judul |
| status | string | - | Filter: `DRAFT`, `PUBLISHED`, `CANCELLED`, `COMPLETED` |
| type | string | - | Filter: `ONLINE`, `OFFLINE`, `HYBRID` |
| date_from | string | - | Filter tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Filter tanggal akhir (YYYY-MM-DD) |
| sort | string | `-created_at` | Sorting: `date`, `-date`, `title`, `-title`, `created_at`, `-created_at`, `-registrants_count` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "slug": "workshop-manajemen-keuangan-masjid",
      "title": "Workshop Manajemen Keuangan Masjid",
      "type": "ONLINE",
      "date": "2025-02-15",
      "start_time": "09:00",
      "end_time": "12:00",
      "location_name": "Online via Zoom",
      "price": 150000,
      "quota": 50,
      "remaining_quota": 23,
      "registrants_count": 27,
      "speaker": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
      "cover_url": "https://storage.example.com/agenda/cover-1.jpg",
      "status": "PUBLISHED",
      "published_at": "2025-01-12T10:00:00Z",
      "created_at": "2025-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "per_page": 10,
    "total_pages": 2
  },
  "links": {
    "self": "/api/v1/admin/agendas?page=1&per_page=10",
    "next": "/api/v1/admin/agendas?page=2&per_page=10",
    "last": "/api/v1/admin/agendas?page=2&per_page=10"
  }
}
```

> **Computed fields**: `remaining_quota` = `quota - COUNT(agenda_registrations WHERE status != 'CANCELLED')`. `registrants_count` = `COUNT(agenda_registrations)`.

---

## 2. Get Agenda Detail

Mengambil detail agenda untuk form edit.

**Endpoint:** `GET /api/v1/admin/agendas/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Agenda UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "slug": "workshop-manajemen-keuangan-masjid",
    "title": "Workshop Manajemen Keuangan Masjid",
    "type": "ONLINE",
    "date": "2025-02-15",
    "start_time": "09:00",
    "end_time": "12:00",
    "location": "https://zoom.us/j/123456789",
    "location_name": "Online via Zoom",
    "price": 150000,
    "quota": 50,
    "remaining_quota": 23,
    "registrants_count": 27,
    "description": "Workshop ini membahas tata kelola keuangan masjid...",
    "speaker": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
    "cover_url": "https://storage.example.com/agenda/cover-1.jpg",
    "status": "PUBLISHED",
    "published_at": "2025-01-12T10:00:00Z",
    "created_at": "2025-01-10T00:00:00Z",
    "updated_at": "2025-01-12T10:00:00Z",
    "created_by": "uuid-admin"
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Agenda tidak ditemukan"
  }
}
```

---

## 3. Create Agenda

Membuat agenda baru (status default: DRAFT).

**Endpoint:** `POST /api/v1/admin/agendas`
**Content-Type:** `multipart/form-data` (untuk upload cover) atau `application/json`

### Request Body

```json
{
  "title": "Pelatihan Imam dan Muadzin",
  "type": "OFFLINE",
  "date": "2025-03-20",
  "start_time": "08:00",
  "end_time": "16:00",
  "location": "Jl. Masjid Raya No. 1, Jakarta Pusat",
  "location_name": "Masjid Istiqlal",
  "price": 0,
  "quota": 30,
  "description": "Pelatihan intensif untuk imam dan muadzin masjid...",
  "speaker": "Ustadz H. Ahmad Syafii",
  "cover": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 5, max 255 karakter |
| type | string | Ya | `ONLINE`, `OFFLINE`, `HYBRID` |
| date | string | Ya | Format YYYY-MM-DD, tidak boleh tanggal lalu |
| start_time | string | Ya | Format HH:mm |
| end_time | string | Tidak | Format HH:mm, harus setelah start_time |
| location | string | Tidak | Alamat lengkap atau link meeting. Max 500 karakter |
| location_name | string | Tidak | Nama tempat. Max 255 karakter |
| price | number | Ya | >= 0 (0 = gratis) |
| quota | number | Ya | Min 1 |
| description | string | Tidak | Deskripsi agenda |
| speaker | string | Tidak | Nama narasumber. Max 255 karakter |
| cover | file | Tidak | JPG/PNG, max 5MB |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/agendas/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "slug": "pelatihan-imam-dan-muadzin",
    "title": "Pelatihan Imam dan Muadzin",
    "status": "DRAFT",
    "created_at": "2025-01-15T10:00:00Z"
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
        "field": "date",
        "message": "Tanggal tidak boleh di masa lalu",
        "code": "invalid_date"
      }
    ]
  }
}
```

> **Catatan**: `slug` di-generate otomatis dari `title` oleh server.

---

## 4. Update Agenda

Mengupdate data agenda.

**Endpoint:** `PATCH /api/v1/admin/agendas/:id`
**Content-Type:** `multipart/form-data` atau `application/json`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Agenda UUID |

### Request Body

Field yang tidak dikirim tidak akan diubah.

```json
{
  "title": "Pelatihan Imam dan Muadzin (Updated)",
  "quota": 50
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "slug": "pelatihan-imam-dan-muadzin",
    "title": "Pelatihan Imam dan Muadzin (Updated)",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

---

## 5. Delete Agenda

Menghapus agenda (soft delete). Tidak bisa menghapus agenda yang sudah memiliki pendaftar confirmed.

**Endpoint:** `DELETE /api/v1/admin/agendas/:id`

### Response — 204 No Content

_(empty body)_

### Response — 409 Conflict

```json
{
  "error": {
    "code": "has_confirmed_registrants",
    "message": "Tidak dapat menghapus agenda yang sudah memiliki pendaftar terkonfirmasi"
  }
}
```

---

## 6. Update Agenda Status

Mengubah status agenda (publish/cancel/complete/draft).

**Endpoint:** `PATCH /api/v1/admin/agendas/:id/status`

### Request Body

```json
{
  "status": "PUBLISHED"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `DRAFT`, `PUBLISHED`, `CANCELLED`, `COMPLETED` |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "status": "PUBLISHED",
    "published_at": "2025-01-15T10:00:00Z"
  }
}
```

> **Catatan**: Saat status diubah ke `PUBLISHED`, server set `published_at = NOW()`. Saat `CANCELLED`, semua pendaftar yang `CONFIRMED`/`PENDING` dinotifikasi (NotificationType: `AGENDA_CANCELLED`).

---

## 7. List Agenda Registrants

Mengambil daftar peserta yang mendaftar agenda tertentu.

**Endpoint:** `GET /api/v1/admin/agendas/:id/registrations`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Agenda UUID |

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan nama/email |
| status | string | - | Filter: `PENDING`, `CONFIRMED`, `CANCELLED`, `ATTENDED` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "user": {
        "id": "uuid-string",
        "name": "Ahmad Fauzi",
        "email": "ahmad@email.com",
        "phone": "081234567890"
      },
      "status": "CONFIRMED",
      "registered_at": "2025-01-15T10:00:00Z",
      "confirmed_at": "2025-01-15T10:15:00Z",
      "cancelled_at": null,
      "cancellation_reason": null
    }
  ],
  "meta": {
    "total": 27,
    "page": 1,
    "per_page": 10,
    "total_pages": 3
  },
  "links": {
    "self": "/api/v1/admin/agendas/uuid-string/registrations?page=1&per_page=10",
    "next": "/api/v1/admin/agendas/uuid-string/registrations?page=2&per_page=10",
    "last": "/api/v1/admin/agendas/uuid-string/registrations?page=3&per_page=10"
  },
  "summary": {
    "total": 27,
    "confirmed": 22,
    "pending": 3,
    "cancelled": 2,
    "attended": 0
  }
}
```

---

## 8. Update Registration Status

Mengubah status pendaftaran peserta agenda.

**Endpoint:** `PATCH /api/v1/admin/agendas/:id/registrations/:registrationId/status`

### Request Body

```json
{
  "status": "CONFIRMED"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `PENDING`, `CONFIRMED`, `CANCELLED`, `ATTENDED` |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "status": "CONFIRMED",
    "confirmed_at": "2025-01-15T10:00:00Z"
  }
}
```

> **Catatan**: Saat status diubah ke `CANCELLED`, server set `cancelled_at = NOW()`. Saat `ATTENDED`, data ini merepresentasikan absensi kehadiran.

---

## 9. Export Registrants

Mengekspor daftar pendaftar agenda.

**Endpoint:** `GET /api/v1/admin/agendas/:id/registrations/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| status | string | - | Filter status registrasi |

### Response — 200 OK

**Content-Type:** `text/csv` atau `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
**Content-Disposition:** `attachment; filename="registrants-workshop-keuangan-2025-01-15.csv"`

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
