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
| q | string | - | Pencarian berdasarkan judul |
| type | string | - | Filter: `ONLINE`, `OFFLINE`, `HYBRID` |
| pricing | string | - | Filter: `free`, `paid` |
| status | string | `upcoming` | Filter: `upcoming`, `past` |
| sort | string | `date` | Sorting: `date`, `-date`, `price`, `-price` |

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
      "location": "Zoom Meeting",
      "location_name": "Online via Zoom",
      "price": 150000,
      "price_display": "Rp 150.000",
      "quota": 50,
      "remaining_quota": 23,
      "speaker": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
      "cover_url": "https://storage.example.com/agenda/cover-1.jpg",
      "status": "PUBLISHED"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 6,
    "total_pages": 1
  }
}
```

> **Catatan**: Hanya menampilkan agenda dengan `status = PUBLISHED`. `remaining_quota` dihitung via `quota - COUNT(agenda_registrations WHERE status != 'CANCELLED')`. Filter `upcoming` = `date >= TODAY`, `past` = `date < TODAY`.

**Halaman terkait:** `/agenda` — [AgendaList.tsx](../../pages/agenda/AgendaList.tsx)

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
  "data": {
    "id": "uuid-string",
    "slug": "workshop-manajemen-keuangan-masjid",
    "title": "Workshop Manajemen Keuangan Masjid",
    "type": "ONLINE",
    "date": "2025-02-15",
    "start_time": "09:00",
    "end_time": "12:00",
    "location": "Zoom Meeting",
    "location_name": "Online via Zoom",
    "price": 150000,
    "price_display": "Rp 150.000",
    "quota": 50,
    "remaining_quota": 23,
    "description": "Workshop ini membahas tata kelola keuangan masjid yang transparan dan akuntabel. Peserta akan mempelajari cara menyusun laporan keuangan, pengelolaan dana infaq/sedekah, dan audit keuangan masjid.",
    "speaker": "Ustadz Dr. H. Muhammad Ridwan, M.Si",
    "cover_url": "https://storage.example.com/agenda/cover-1.jpg",
    "status": "PUBLISHED",
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

> **Catatan**: `benefits` adalah data statis yang disimpan sebagai JSON di field `description` atau sebagai konvensi di level aplikasi (hardcoded per agenda atau bagian dari `description` yang di-parse). Jika perlu fleksibel, bisa ditambahkan kolom `benefits JSONB` di tabel `agendas`.

### Response — 404 Not Found

```json
{
  "message": "Agenda tidak ditemukan"
}
```

**Halaman terkait:** `/agenda/:slug` — [AgendaDetail.tsx](../../pages/agenda/AgendaDetail.tsx)

---

## 3. Daftar Agenda (Gratis)

Mendaftarkan user ke agenda gratis.

**Endpoint:** `POST /api/v1/agenda/:slug/register`
**Auth:** Bearer Token (Required, role: STUDENT)

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
| institution | string | Tidak | Nama institusi/masjid (disimpan ke `users.institution` jika belum ada) |

### Response — 201 Created

```json
{
  "data": {
    "registration": {
      "id": "uuid-string",
      "agenda_id": "uuid-string",
      "user_id": "uuid-string",
      "status": "CONFIRMED",
      "registration_number": "AGD-2025-0028",
      "registered_at": "2025-01-15T10:00:00Z"
    }
  },
  "message": "Pendaftaran berhasil"
}
```

> **Catatan**: Untuk agenda gratis, status langsung `CONFIRMED`. `registration_number` di-generate otomatis sebagai e-ticket reference. Field `institution` dari request body di-update ke `users.institution` jika user belum punya data institusi.

### Response — 400 Bad Request

```json
{
  "message": "Anda sudah terdaftar di agenda ini"
}
```

### Response — 409 Conflict

```json
{
  "message": "Kuota agenda sudah penuh"
}
```

---

## 4. Checkout Agenda (Berbayar)

Membuat order pembayaran untuk agenda berbayar.

**Endpoint:** `POST /api/v1/agenda/:slug/checkout`
**Auth:** Bearer Token (Required, role: STUDENT)

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
  "payment_method": "BANK_TRANSFER"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3 karakter |
| email | string | Ya | Format email valid |
| phone | string | Ya | Format telepon valid |
| institution | string | Tidak | Nama institusi/masjid |
| payment_method | string | Ya | `BANK_TRANSFER`, `E_WALLET`, `QRIS`, `VIRTUAL_ACCOUNT` |

### Response — 201 Created

```json
{
  "data": {
    "order": {
      "id": "uuid-string",
      "invoice_number": "INV-AGD-2025-0015",
      "agenda_id": "uuid-string",
      "original_amount": 150000,
      "discount": 0,
      "amount": 150000,
      "payment_method": "BANK_TRANSFER",
      "payment_details": {
        "bank_name": "Bank Syariah Indonesia",
        "account_number": "1234567890",
        "account_name": "Marbot LMS",
        "va_number": "8001234567890"
      },
      "status": "PENDING",
      "expires_at": "2025-01-16T10:00:00Z"
    }
  },
  "message": "Order berhasil dibuat. Silakan selesaikan pembayaran."
}
```

> **Catatan**: Membuat record di `transactions` (agenda_id terisi, course_id NULL) dan `agenda_registrations` (status PENDING). Setelah pembayaran sukses (via webhook), registration di-update ke CONFIRMED.

**Halaman terkait:** `/agenda/:slug/daftar` — [AgendaCheckout.tsx](../../pages/agenda/AgendaCheckout.tsx)

---

## 5. Get Agenda Saya

Mengambil daftar agenda yang sudah didaftarkan user.

**Endpoint:** `GET /api/v1/me/agenda`
**Auth:** Bearer Token (Required, role: STUDENT)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| status | string | - | Filter: `upcoming`, `past`, `cancelled` |
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "agenda": {
        "id": "uuid-string",
        "slug": "workshop-manajemen-keuangan-masjid",
        "title": "Workshop Manajemen Keuangan Masjid",
        "type": "ONLINE",
        "date": "2025-02-15",
        "start_time": "09:00",
        "end_time": "12:00",
        "location_name": "Online via Zoom",
        "cover_url": "https://storage.example.com/agenda/cover-1.jpg"
      },
      "status": "CONFIRMED",
      "registration_number": "AGD-2025-0028",
      "registered_at": "2025-01-15T10:00:00Z"
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

**Halaman terkait:** `/akun/agenda` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

---

## 6. Cancel Registrasi Agenda

Membatalkan registrasi agenda.

**Endpoint:** `POST /api/v1/me/agenda/:id/cancel`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Registration UUID |

### Response — 200 OK

```json
{
  "message": "Pendaftaran berhasil dibatalkan"
}
```

> **Catatan**: Set `agenda_registrations.status = CANCELLED`, `cancelled_at = NOW()`. Hanya bisa cancel jika agenda belum berlangsung (`agendas.date > TODAY`).

### Response — 400 Bad Request

```json
{
  "message": "Tidak dapat membatalkan. Agenda sudah berlangsung."
}
```
