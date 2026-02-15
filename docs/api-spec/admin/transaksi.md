# API Spec — Transaksi & Laporan (Admin)

> Endpoint untuk monitoring transaksi dan laporan analitik.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Transactions

Mengambil riwayat semua transaksi.

**Endpoint:** `GET /api/v1/admin/transactions`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan invoice_number atau nama user |
| status | string | - | Filter: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`, `EXPIRED` |
| payment_method | string | - | Filter: `BANK_TRANSFER`, `E_WALLET`, `QRIS`, `VIRTUAL_ACCOUNT` |
| type | string | - | Filter: `course`, `agenda` (derived dari course_id/agenda_id) |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |
| sort | string | `-created_at` | Sorting: `created_at`, `-created_at`, `amount`, `-amount` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "invoice_number": "INV-CRS-2025-0042",
      "user": {
        "id": "uuid-string",
        "name": "Ahmad Fauzi",
        "email": "ahmad@email.com"
      },
      "type": "course",
      "item_title": "Manajemen Keuangan Masjid",
      "amount": 250000,
      "payment_method": "BANK_TRANSFER",
      "status": "SUCCESS",
      "paid_at": "2025-01-15T10:15:00Z",
      "expired_at": "2025-01-16T10:00:00Z",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 10,
    "total_pages": 15
  },
  "links": {
    "self": "/api/v1/admin/transactions?page=1&per_page=10",
    "next": "/api/v1/admin/transactions?page=2&per_page=10",
    "last": "/api/v1/admin/transactions?page=15&per_page=10"
  },
  "summary": {
    "total_transactions": 150,
    "total_revenue": 45000000,
    "pending_count": 5,
    "pending_amount": 1250000
  }
}
```

> **Catatan**: `type` di-derive dari data: jika `course_id` NOT NULL → `"course"`, jika `agenda_id` NOT NULL → `"agenda"`. `item_title` diambil dari JOIN ke `courses.title` atau `agendas.title`.

---

## 2. Get Transaction Detail

Mengambil detail satu transaksi.

**Endpoint:** `GET /api/v1/admin/transactions/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Transaction UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "invoice_number": "INV-CRS-2025-0042",
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890"
    },
    "type": "course",
    "item": {
      "id": "uuid-string",
      "title": "Manajemen Keuangan Masjid"
    },
    "amount": 250000,
    "payment_method": "BANK_TRANSFER",
    "payment_gateway_ref": "TRX-MIDTRANS-12345",
    "status": "SUCCESS",
    "notes": null,
    "paid_at": "2025-01-15T10:15:00Z",
    "expired_at": "2025-01-16T10:00:00Z",
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:15:00Z"
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Transaksi tidak ditemukan"
  }
}
```

---

## 3. Update Transaction Status

Mengubah status transaksi secara manual (misalnya proses refund).

**Endpoint:** `PATCH /api/v1/admin/transactions/:id/status`

### Request Body

```json
{
  "status": "REFUNDED",
  "notes": "Refund atas permintaan peserta"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `REFUNDED` (hanya status ini yang bisa diubah manual oleh admin) |
| notes | string | Tidak | Catatan alasan perubahan status |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "status": "REFUNDED",
    "notes": "Refund atas permintaan peserta",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### Response — 422 Unprocessable Entity

```json
{
  "error": {
    "code": "invalid_transition",
    "message": "Hanya transaksi berstatus SUCCESS yang dapat di-refund"
  }
}
```

> **Catatan**: Status `PENDING` → `SUCCESS`/`FAILED`/`EXPIRED` dikelola otomatis oleh webhook payment gateway dan cron job. Admin hanya bisa melakukan `SUCCESS` → `REFUNDED`.

---

## 4. Export Transactions

Mengekspor data transaksi.

**Endpoint:** `GET /api/v1/admin/transactions/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |
| status | string | - | Filter status |

### Response — 200 OK

**Content-Type:** `text/csv` atau `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
**Content-Disposition:** `attachment; filename="transactions-2025-01-01-2025-01-15.csv"`

> Binary file download.

---

## 5. Revenue Report

Mengambil data laporan pendapatan.

**Endpoint:** `GET /api/v1/admin/reports/revenue`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `monthly` | Periode: `daily`, `weekly`, `monthly`, `yearly` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |

### Response — 200 OK

```json
{
  "data": {
    "total_revenue": 45000000,
    "period": "monthly",
    "chart_data": [
      { "label": "Jan 2025", "revenue": 5000000, "transactions_count": 20 },
      { "label": "Feb 2025", "revenue": 7500000, "transactions_count": 30 },
      { "label": "Mar 2025", "revenue": 6000000, "transactions_count": 25 }
    ],
    "revenue_by_type": {
      "course": { "amount": 35000000, "percentage": 77.8 },
      "agenda": { "amount": 10000000, "percentage": 22.2 }
    },
    "top_earning_courses": [
      {
        "id": "uuid-string",
        "title": "Manajemen Keuangan Masjid",
        "revenue": 12500000,
        "students_count": 50
      }
    ]
  }
}
```

---

## 6. Enrollment Report

Mengambil data laporan enrollment peserta.

**Endpoint:** `GET /api/v1/admin/reports/enrollments`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `monthly` | Periode: `daily`, `weekly`, `monthly`, `yearly` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |

### Response — 200 OK

```json
{
  "data": {
    "total_enrollments": 5000,
    "new_enrollments_period": 300,
    "completion_rate": 65.5,
    "chart_data": [
      { "label": "Jan 2025", "enrollments": 150, "completions": 80 },
      { "label": "Feb 2025", "enrollments": 200, "completions": 120 },
      { "label": "Mar 2025", "enrollments": 180, "completions": 100 }
    ],
    "enrollments_by_category": [
      { "category": "Kebersihan", "count": 1500, "percentage": 30 },
      { "category": "Keuangan", "count": 1000, "percentage": 20 },
      { "category": "Manajemen", "count": 900, "percentage": 18 }
    ],
    "enrollments_by_level": [
      { "level": "BEGINNER", "count": 2500, "percentage": 50 },
      { "level": "INTERMEDIATE", "count": 1800, "percentage": 36 },
      { "level": "ADVANCED", "count": 700, "percentage": 14 }
    ]
  }
}
```

---

## 7. Course Performance Report

Mengambil data performa per kursus.

**Endpoint:** `GET /api/v1/admin/reports/courses`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| sort | string | `-students_count` | Sorting: `students_count`, `-students_count`, `rating`, `-rating`, `revenue`, `-revenue`, `completion_rate`, `-completion_rate` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "instructor": {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi"
      },
      "students_count": 1200,
      "completion_rate": 72.5,
      "rating": 4.8,
      "revenue": 0,
      "pricing": "FREE"
    }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "per_page": 10,
    "total_pages": 3
  },
  "links": {
    "self": "/api/v1/admin/reports/courses?page=1&per_page=10",
    "next": "/api/v1/admin/reports/courses?page=2&per_page=10",
    "last": "/api/v1/admin/reports/courses?page=3&per_page=10"
  }
}
```

---

## 8. Export Report

Mengekspor laporan ke PDF atau spreadsheet.

**Endpoint:** `GET /api/v1/admin/reports/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| type | string | - | Required. `revenue`, `enrollments`, `courses` |
| format | string | `pdf` | Format: `pdf`, `csv`, `xlsx` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |

### Response — 200 OK

**Content-Type:** Sesuai format yang diminta.
**Content-Disposition:** `attachment; filename="report-revenue-2025-01.pdf"`

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
