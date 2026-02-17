# API Spec — Agenda & Workshop (Public)

> Endpoint publik untuk browsing daftar agenda dan detail agenda/workshop. Tidak memerlukan autentikasi.

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

> **Catatan**: `is_registered` bernilai `false` jika user belum login. Jika user sudah login (Bearer Token opsional), `is_registered` menandakan apakah user sudah terdaftar di agenda ini. `benefits` disimpan sebagai JSON di kolom khusus atau di-parse dari `description`.

### Response — 404 Not Found

```json
{
  "message": "Agenda tidak ditemukan"
}
```

**Halaman terkait:** `/agenda/:slug` — [AgendaDetail.tsx](../../pages/agenda/AgendaDetail.tsx)
