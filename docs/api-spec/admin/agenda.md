# API Spec — Manajemen Agenda (Admin)

> Endpoint CRUD untuk mengelola agenda/workshop dan pendaftar.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Agenda

Mengambil daftar semua agenda untuk admin.

**Endpoint:** `GET /api/v1/admin/agenda`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan judul |
| status | string | - | Filter: `Published`, `Draft` |
| type | string | - | Filter: `Online`, `Offline` |
| date_from | string | - | Tanggal mulai |
| date_to | string | - | Tanggal akhir |
| sort | string | `newest` | Sorting: `newest`, `date_asc`, `date_desc`, `registrants` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "agenda": [
      {
        "id": "uuid-string",
        "slug": "workshop-manajemen-keuangan-masjid",
        "title": "Workshop Manajemen Keuangan Masjid",
        "type": "Online",
        "date": "2025-02-15",
        "time": "09:00",
        "end_time": "12:00",
        "location_name": "Online via Zoom",
        "price": 150000,
        "price_display": "Rp 150.000",
        "quota": 50,
        "remaining_quota": 23,
        "registrants_count": 27,
        "status": "Published",
        "cover": "https://storage.example.com/agenda/cover-1.jpg",
        "created_at": "2025-01-10T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 15,
      "total_pages": 2
    }
  }
}
```

**Halaman terkait:** `/admin/agenda` — [AdminAgenda.tsx](../../src/pages/admin/AdminAgenda.tsx)

---

## 2. Get Detail Agenda (Admin)

Mengambil detail agenda untuk form edit.

**Endpoint:** `GET /api/v1/admin/agenda/:slug`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "slug": "workshop-manajemen-keuangan-masjid",
    "title": "Workshop Manajemen Keuangan Masjid",
    "type": "Online",
    "date": "2025-02-15",
    "time": "09:00",
    "end_time": "12:00",
    "location": "Zoom Meeting",
    "location_name": "Online via Zoom",
    "price": 150000,
    "quota": 50,
    "remaining_quota": 23,
    "description": "Workshop ini membahas tata kelola keuangan masjid...",
    "narasumber": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
    "cover": "https://storage.example.com/agenda/cover-1.jpg",
    "status": "Published",
    "registrants_count": 27,
    "created_at": "2025-01-10T00:00:00Z"
  }
}
```

---

## 3. Create Agenda

Membuat agenda baru.

**Endpoint:** `POST /api/v1/admin/agenda`
**Content-Type:** `multipart/form-data`

### Request Body

```json
{
  "title": "Pelatihan Imam dan Muadzin",
  "type": "Offline",
  "date": "2025-03-20",
  "time": "08:00",
  "end_time": "16:00",
  "location": "Jl. Masjid Raya No. 1, Jakarta Pusat",
  "location_name": "Masjid Istiqlal",
  "price": 0,
  "quota": 30,
  "description": "Pelatihan intensif untuk imam dan muadzin masjid...",
  "narasumber": "Ustadz H. Ahmad Syafii",
  "status": "Draft",
  "cover": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 5 karakter, max 200 |
| type | string | Ya | `Online`, `Offline` |
| date | string | Ya | Format YYYY-MM-DD, tidak boleh tanggal lalu |
| time | string | Ya | Format HH:mm |
| end_time | string | Ya | Format HH:mm, harus setelah time |
| location | string | Ya | Alamat lengkap atau link meeting |
| location_name | string | Ya | Nama tempat |
| price | number | Ya | >= 0 (0 = gratis) |
| quota | number | Ya | Min 1 |
| description | string | Ya | Min 20 karakter |
| narasumber | string | Ya | Nama narasumber |
| status | string | Ya | `Published`, `Draft` |
| cover | file | Tidak | JPG/PNG, max 5MB |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Agenda berhasil dibuat",
  "data": {
    "id": "uuid-string",
    "slug": "pelatihan-imam-dan-muadzin",
    "title": "Pelatihan Imam dan Muadzin",
    "status": "Draft",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/agenda/baru` — [AdminAddAgenda.tsx](../../src/pages/admin/AdminAddAgenda.tsx)

---

## 4. Update Agenda

Mengupdate data agenda.

**Endpoint:** `PUT /api/v1/admin/agenda/:slug`
**Content-Type:** `multipart/form-data`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Request Body

Sama dengan Create Agenda. Field yang tidak dikirim tidak akan diubah.

### Response — 200 OK

```json
{
  "success": true,
  "message": "Agenda berhasil diperbarui",
  "data": {
    "id": "uuid-string",
    "slug": "pelatihan-imam-dan-muadzin",
    "title": "Pelatihan Imam dan Muadzin (Updated)",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/agenda/:slug/edit` — [AdminEditAgenda.tsx](../../src/pages/admin/AdminEditAgenda.tsx)

---

## 5. Delete Agenda

Menghapus agenda (soft delete).

**Endpoint:** `DELETE /api/v1/admin/agenda/:slug`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Agenda berhasil dihapus"
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Tidak dapat menghapus agenda yang sudah memiliki pendaftar"
}
```

---

## 6. Update Status Agenda

Mengubah status agenda (publish/draft).

**Endpoint:** `PATCH /api/v1/admin/agenda/:slug/status`

### Request Body

```json
{
  "status": "Published"
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Status agenda berhasil diubah menjadi Published"
}
```

---

## 7. Get Pendaftar Agenda

Mengambil daftar peserta yang mendaftar agenda tertentu.

**Endpoint:** `GET /api/v1/admin/agenda/:slug/registrants`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama/email |
| status | string | - | Filter: `confirmed`, `pending`, `cancelled` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "agenda": {
      "id": "uuid-string",
      "title": "Workshop Manajemen Keuangan Masjid",
      "date": "2025-02-15",
      "quota": 50,
      "remaining_quota": 23
    },
    "registrants": [
      {
        "id": "uuid-string",
        "user": {
          "id": "uuid-string",
          "name": "Ahmad Fauzi",
          "email": "ahmad@email.com",
          "phone": "081234567890"
        },
        "institution": "Masjid Al-Ikhlas",
        "registration_number": "AGD-2025-0028",
        "status": "confirmed",
        "payment_status": "Berhasil",
        "registered_at": "2025-01-15T10:00:00Z"
      }
    ],
    "summary": {
      "total_registrants": 27,
      "confirmed": 22,
      "pending": 3,
      "cancelled": 2
    },
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 27,
      "total_pages": 3
    }
  }
}
```

**Halaman terkait:** `/admin/agenda/:slug/pendaftar` — [AdminAgendaRegistrants.tsx](../../src/pages/admin/AdminAgendaRegistrants.tsx)

---

## 8. Update Status Pendaftar

Mengubah status pendaftaran peserta agenda.

**Endpoint:** `PATCH /api/v1/admin/agenda/:slug/registrants/:registrantId/status`

### Request Body

```json
{
  "status": "confirmed"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `confirmed`, `pending`, `cancelled` |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Status pendaftar berhasil diubah"
}
```

---

## 9. Export Pendaftar Agenda

Mengekspor daftar pendaftar agenda.

**Endpoint:** `GET /api/v1/admin/agenda/:slug/registrants/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |

### Response — 200 OK

Binary file download.
