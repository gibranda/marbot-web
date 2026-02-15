# API Spec — Dashboard Admin

> Endpoint untuk data dashboard, statistik, dan aktivitas terbaru.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Dashboard Overview

Mengambil ringkasan statistik dashboard admin (KPIs, chart, aktivitas terbaru, top courses).

**Endpoint:** `GET /api/v1/admin/dashboard`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `month` | Periode perbandingan KPI change: `week`, `month`, `year` |

### Response — 200 OK

```json
{
  "data": {
    "kpis": {
      "total_courses": 24,
      "total_courses_change": 12.5,
      "total_instructors": 12,
      "total_instructors_change": 8.3,
      "total_students": 5000,
      "total_students_change": 15.2,
      "total_revenue": 45000000,
      "total_revenue_change": 22.1
    },
    "enrollment_chart": {
      "period": "monthly",
      "data": [
        { "label": "Jan", "count": 150 },
        { "label": "Feb", "count": 200 },
        { "label": "Mar", "count": 180 },
        { "label": "Apr", "count": 250 },
        { "label": "May", "count": 300 },
        { "label": "Jun", "count": 280 }
      ]
    },
    "revenue_chart": {
      "period": "monthly",
      "data": [
        { "label": "Jan", "amount": 5000000 },
        { "label": "Feb", "amount": 7500000 },
        { "label": "Mar", "amount": 6000000 },
        { "label": "Apr", "amount": 9000000 },
        { "label": "May", "amount": 10000000 },
        { "label": "Jun", "amount": 7500000 }
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
        "revenue": 0,
        "pricing": "FREE"
      }
    ]
  }
}
```

> **Catatan**:
> - `*_change` adalah persentase perubahan dibanding periode sebelumnya (positif = naik, negatif = turun)
> - `recent_activities` menampilkan max 10 aktivitas terbaru
> - `top_courses` menampilkan max 5 kursus teratas berdasarkan jumlah peserta
> - Semua angka dihitung via query (no denormalized counts)

---

## 2. Get Dashboard Stats

Mengambil KPI ringkas saja (untuk header/widget, lebih ringan dari dashboard overview).

**Endpoint:** `GET /api/v1/admin/dashboard/stats`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| period | string | `month` | Periode perbandingan: `week`, `month`, `year` |

### Response — 200 OK

```json
{
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
    "total_agendas": 15,
    "upcoming_agendas": 3
  }
}
```

---

## 3. Get Recent Activities

Mengambil log aktivitas terbaru dengan pagination.

**Endpoint:** `GET /api/v1/admin/dashboard/activities`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 20 | Jumlah per halaman (max 50) |
| type | string | - | Filter: `course`, `instructor`, `student`, `transaction`, `certificate`, `agenda` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "type": "course",
      "title": "Kursus baru 'Manajemen Keuangan Masjid' ditambahkan",
      "description": "Ditambahkan oleh Admin pada 15 Jan 2025",
      "timestamp": "2025-01-15T10:00:00Z",
      "actor": {
        "id": "uuid-string",
        "name": "Admin",
        "avatar_url": null
      }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "per_page": 20,
    "total_pages": 3
  },
  "links": {
    "self": "/api/v1/admin/dashboard/activities?page=1&per_page=20",
    "next": "/api/v1/admin/dashboard/activities?page=2&per_page=20",
    "last": "/api/v1/admin/dashboard/activities?page=3&per_page=20"
  }
}
```

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
