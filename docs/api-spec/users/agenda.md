# API Spec — Agenda & Workshop (Users)

> Endpoint untuk browsing agenda, detail agenda, dan pendaftaran workshop.

**Base URL:** `/api/v1`

---

## 1. Get Daftar Agenda

Mengambil daftar agenda/workshop dengan filter.

**Endpoint:** `GET /api/v1/agenda`
**Auth:** Tidak diperlukan

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 12 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan judul |
| type | string | - | Filter: `Online`, `Offline` |
| price | string | - | Filter: `free`, `paid` |
| status | string | `upcoming` | Filter: `upcoming`, `past` |
| sort | string | `date_asc` | Sorting: `date_asc`, `date_desc`, `price_asc`, `price_desc` |

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
        "location": "Zoom Meeting",
        "location_name": "Online via Zoom",
        "price": 150000,
        "price_display": "Rp 150.000",
        "quota": 50,
        "remaining_quota": 23,
        "narasumber": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
        "cover": "https://storage.example.com/agenda/cover-1.jpg",
        "status": "Published"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 12,
      "total": 6,
      "total_pages": 1,
      "has_next": false,
      "has_prev": false
    }
  }
}
```

**Halaman terkait:** `/agenda` — [AgendaList.tsx](../../src/pages/agenda/AgendaList.tsx)

---

## 2. Get Detail Agenda

Mengambil informasi lengkap satu agenda.

**Endpoint:** `GET /api/v1/agenda/:slug`
**Auth:** Tidak diperlukan (optional untuk status registrasi)

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
    "price_display": "Rp 150.000",
    "quota": 50,
    "remaining_quota": 23,
    "description": "Workshop ini membahas tata kelola keuangan masjid yang transparan dan akuntabel. Peserta akan mempelajari cara menyusun laporan keuangan, pengelolaan dana infaq/sedekah, dan audit keuangan masjid.",
    "narasumber": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
    "cover": "https://storage.example.com/agenda/cover-1.jpg",
    "status": "Published",
    "registrants_count": 27,
    "is_registered": false,
    "benefits": [
      "Sertifikat digital",
      "Materi presentasi",
      "Template laporan keuangan",
      "Rekaman workshop"
    ]
  }
}
```

### Response — 404 Not Found

```json
{
  "success": false,
  "message": "Agenda tidak ditemukan"
}
```

**Halaman terkait:** `/agenda/:slug` — [AgendaDetail.tsx](../../src/pages/agenda/AgendaDetail.tsx)

---

## 3. Daftar Agenda (Gratis)

Mendaftarkan user ke agenda gratis.

**Endpoint:** `POST /api/v1/agenda/:slug/register`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Request Body

```json
{
  "name": "Ahmad Fauzi",
  "email": "ahmad@email.com",
  "phone": "081234567890",
  "institution": "Masjid Al-Ikhlas"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3 karakter |
| email | string | Ya | Format email valid |
| phone | string | Ya | Format telepon valid |
| institution | string | Tidak | Nama institusi/masjid |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Pendaftaran berhasil",
  "data": {
    "registration": {
      "id": "uuid-string",
      "agenda_id": "uuid-string",
      "user_id": "uuid-string",
      "status": "confirmed",
      "registered_at": "2025-01-15T10:00:00Z",
      "registration_number": "AGD-2025-0028"
    }
  }
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Anda sudah terdaftar di agenda ini"
}
```

### Response — 409 Conflict

```json
{
  "success": false,
  "message": "Kuota agenda sudah penuh"
}
```

---

## 4. Checkout Agenda (Berbayar)

Membuat order pembayaran untuk agenda berbayar.

**Endpoint:** `POST /api/v1/agenda/:slug/checkout`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Agenda slug |

### Request Body

```json
{
  "name": "Ahmad Fauzi",
  "email": "ahmad@email.com",
  "phone": "081234567890",
  "institution": "Masjid Al-Ikhlas",
  "payment_method": "bank_transfer"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3 karakter |
| email | string | Ya | Format email valid |
| phone | string | Ya | Format telepon valid |
| institution | string | Tidak | Nama institusi/masjid |
| payment_method | string | Ya | `bank_transfer`, `e_wallet`, `qris` |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Order berhasil dibuat. Silakan selesaikan pembayaran.",
  "data": {
    "order": {
      "id": "uuid-string",
      "invoice": "INV-AGD-2025-0015",
      "agenda_id": "uuid-string",
      "amount": 150000,
      "payment_method": "bank_transfer",
      "payment_details": {
        "bank_name": "Bank Syariah Indonesia",
        "account_number": "1234567890",
        "account_name": "Marbot LMS",
        "va_number": "8001234567890"
      },
      "status": "pending",
      "expires_at": "2025-01-16T10:00:00Z"
    }
  }
}
```

**Halaman terkait:** `/agenda/:slug/daftar` — [AgendaCheckout.tsx](../../src/pages/agenda/AgendaCheckout.tsx)

---

## 5. Get Agenda Saya

Mengambil daftar agenda yang sudah didaftarkan user.

**Endpoint:** `GET /api/v1/me/agenda`
**Auth:** Bearer Token (Required, role: student)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| status | string | - | Filter: `upcoming`, `past`, `cancelled` |
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "uuid-string",
        "agenda": {
          "id": "uuid-string",
          "slug": "workshop-manajemen-keuangan-masjid",
          "title": "Workshop Manajemen Keuangan Masjid",
          "type": "Online",
          "date": "2025-02-15",
          "time": "09:00",
          "end_time": "12:00",
          "location_name": "Online via Zoom",
          "cover": "https://storage.example.com/agenda/cover-1.jpg"
        },
        "status": "confirmed",
        "registration_number": "AGD-2025-0028",
        "registered_at": "2025-01-15T10:00:00Z"
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

**Halaman terkait:** `/akun/agenda` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 6. Cancel Registrasi Agenda

Membatalkan registrasi agenda.

**Endpoint:** `POST /api/v1/me/agenda/:id/cancel`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Registration UUID |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pendaftaran berhasil dibatalkan"
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Tidak dapat membatalkan. Agenda sudah berlangsung."
}
```
