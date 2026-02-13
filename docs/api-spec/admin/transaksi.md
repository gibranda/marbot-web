# API Spec — Transaksi & Laporan (Admin)

> Endpoint untuk monitoring transaksi dan laporan analitik.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Transaksi

Mengambil riwayat semua transaksi.

**Endpoint:** `GET /api/v1/admin/transactions`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan invoice/nama user |
| status | string | - | Filter: `Berhasil`, `Pending`, `Gagal` |
| type | string | - | Filter: `course`, `agenda` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |
| sort | string | `newest` | Sorting: `newest`, `oldest`, `amount_asc`, `amount_desc` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid-string",
        "invoice": "INV-CRS-2025-0042",
        "user": {
          "id": "uuid-string",
          "name": "Ahmad Fauzi",
          "email": "ahmad@email.com"
        },
        "type": "course",
        "item_title": "Manajemen Keuangan Masjid",
        "amount": 250000,
        "amount_display": "Rp 250.000",
        "payment_method": "Bank Transfer (BSI)",
        "status": "Berhasil",
        "date": "2025-01-15T10:00:00Z",
        "paid_at": "2025-01-15T10:15:00Z"
      }
    ],
    "summary": {
      "total_transactions": 150,
      "total_revenue": 45000000,
      "total_revenue_display": "Rp 45.000.000",
      "pending_count": 5,
      "pending_amount": 1250000
    },
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 150,
      "total_pages": 15
    }
  }
}
```

**Halaman terkait:** `/admin/transaksi` — [AdminTransaksi.tsx](../../src/pages/admin/AdminTransaksi.tsx)

---

## 2. Get Detail Transaksi

Mengambil detail satu transaksi.

**Endpoint:** `GET /api/v1/admin/transactions/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Transaction UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "invoice": "INV-CRS-2025-0042",
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
    "original_amount": 250000,
    "discount": 50000,
    "total_amount": 200000,
    "payment_method": "Bank Transfer",
    "payment_channel": "Bank Syariah Indonesia",
    "status": "Berhasil",
    "created_at": "2025-01-15T10:00:00Z",
    "paid_at": "2025-01-15T10:15:00Z",
    "coupon_code": "MARBOT2025"
  }
}
```

---

## 3. Export Transaksi

Mengekspor data transaksi.

**Endpoint:** `GET /api/v1/admin/transactions/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| format | string | `csv` | Format: `csv`, `xlsx` |
| date_from | string | - | Tanggal mulai |
| date_to | string | - | Tanggal akhir |
| status | string | - | Filter status |

### Response — 200 OK

**Content-Type:** `text/csv`
**Content-Disposition:** `attachment; filename="transaksi-2025-01-01-2025-01-15.csv"`

---

## 4. Get Laporan Pendapatan

Mengambil data laporan pendapatan.

**Endpoint:** `GET /api/v1/admin/reports/revenue`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `monthly` | Period: `daily`, `weekly`, `monthly`, `yearly` |
| date_from | string | - | Tanggal mulai (YYYY-MM-DD) |
| date_to | string | - | Tanggal akhir (YYYY-MM-DD) |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "total_revenue": 45000000,
    "total_revenue_display": "Rp 45.000.000",
    "period": "monthly",
    "chart_data": [
      { "label": "Jan 2025", "revenue": 5000000, "transactions": 20 },
      { "label": "Feb 2025", "revenue": 7500000, "transactions": 30 },
      { "label": "Mar 2025", "revenue": 6000000, "transactions": 25 }
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
        "students": 50
      }
    ]
  }
}
```

**Halaman terkait:** `/admin/laporan` — [AdminLaporan.tsx](../../src/pages/admin/AdminLaporan.tsx)

---

## 5. Get Laporan Enrollment

Mengambil data laporan enrollment peserta.

**Endpoint:** `GET /api/v1/admin/reports/enrollments`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `monthly` | Period: `daily`, `weekly`, `monthly`, `yearly` |
| date_from | string | - | Tanggal mulai |
| date_to | string | - | Tanggal akhir |

### Response — 200 OK

```json
{
  "success": true,
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
      { "level": "Pemula", "count": 2500, "percentage": 50 },
      { "level": "Menengah", "count": 1800, "percentage": 36 },
      { "level": "Lanjut", "count": 700, "percentage": 14 }
    ]
  }
}
```

---

## 6. Get Laporan Performa Kursus

Mengambil data performa per kursus.

**Endpoint:** `GET /api/v1/admin/reports/courses`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| sort | string | `students` | Sorting: `students`, `rating`, `revenue`, `completion_rate` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "instructor": "Ustadz Ahmad Fauzi",
        "students_count": 1200,
        "completion_rate": 72.5,
        "average_rating": 4.8,
        "revenue": 0,
        "revenue_display": "Gratis"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 24,
      "total_pages": 3
    }
  }
}
```

---

## 7. Export Laporan

Mengekspor laporan ke PDF atau spreadsheet.

**Endpoint:** `GET /api/v1/admin/reports/export`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| type | string | Ya | `revenue`, `enrollments`, `courses` |
| format | string | `pdf` | Format: `pdf`, `csv`, `xlsx` |
| date_from | string | - | Tanggal mulai |
| date_to | string | - | Tanggal akhir |

### Response — 200 OK

Binary file download sesuai format yang diminta.
