# API Spec — Dashboard Admin

> Endpoint untuk data dashboard, statistik, dan aktivitas terbaru.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Dashboard Overview

Mengambil ringkasan statistik dashboard admin.

**Endpoint:** `GET /api/v1/admin/dashboard`

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "kpis": {
      "total_courses": 24,
      "total_courses_change": 12.5,
      "total_instructors": 12,
      "total_instructors_change": 8.3,
      "total_students": 5000,
      "total_students_change": 15.2,
      "total_revenue": 45000000,
      "total_revenue_display": "Rp 45.000.000",
      "total_revenue_change": 22.1
    },
    "enrollment_chart": {
      "period": "monthly",
      "data": [
        { "month": "Jan", "count": 150 },
        { "month": "Feb", "count": 200 },
        { "month": "Mar", "count": 180 },
        { "month": "Apr", "count": 250 },
        { "month": "May", "count": 300 },
        { "month": "Jun", "count": 280 }
      ]
    },
    "revenue_chart": {
      "period": "monthly",
      "data": [
        { "month": "Jan", "amount": 5000000 },
        { "month": "Feb", "amount": 7500000 },
        { "month": "Mar", "amount": 6000000 },
        { "month": "Apr", "amount": 9000000 },
        { "month": "May", "amount": 10000000 },
        { "month": "Jun", "amount": 7500000 }
      ]
    },
    "recent_activities": [
      {
        "id": "uuid-string",
        "type": "course",
        "title": "Kursus baru 'Manajemen Keuangan Masjid' ditambahkan",
        "timestamp": "2025-01-15T10:00:00Z"
      },
      {
        "id": "uuid-string",
        "type": "student",
        "title": "15 peserta baru mendaftar hari ini",
        "timestamp": "2025-01-15T09:00:00Z"
      },
      {
        "id": "uuid-string",
        "type": "transaction",
        "title": "Transaksi Rp 250.000 berhasil dari Ahmad Fauzi",
        "timestamp": "2025-01-15T08:30:00Z"
      },
      {
        "id": "uuid-string",
        "type": "certificate",
        "title": "Sertifikat MARBOT-2025-001 diterbitkan",
        "timestamp": "2025-01-15T08:00:00Z"
      }
    ],
    "top_courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "students_count": 1200,
        "rating": 4.8,
        "revenue": 0
      }
    ]
  }
}
```

**Halaman terkait:** `/admin` — [AdminDashboard.tsx](../../src/pages/admin/AdminDashboard.tsx)

---

## 2. Get Dashboard Stats (Ringkas)

Mengambil KPI ringkas saja (untuk header/widget).

**Endpoint:** `GET /api/v1/admin/stats`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `month` | Periode perbandingan: `week`, `month`, `year` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "total_courses": 24,
    "published_courses": 20,
    "draft_courses": 4,
    "total_instructors": 12,
    "total_students": 5000,
    "active_students": 3200,
    "total_revenue": 45000000,
    "pending_transactions": 5,
    "total_certificates": 3200,
    "total_agenda": 15,
    "upcoming_agenda": 3
  }
}
```

---

## 3. Get Recent Activities

Mengambil log aktivitas terbaru.

**Endpoint:** `GET /api/v1/admin/activities`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 20 | Jumlah per halaman |
| type | string | - | Filter: `course`, `instructor`, `student`, `transaction`, `certificate`, `agenda` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "uuid-string",
        "type": "course",
        "title": "Kursus baru 'Manajemen Keuangan Masjid' ditambahkan",
        "description": "Ditambahkan oleh Admin pada 15 Jan 2025",
        "timestamp": "2025-01-15T10:00:00Z",
        "actor": {
          "name": "Admin",
          "avatar": null
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 50,
      "total_pages": 3
    }
  }
}
```
