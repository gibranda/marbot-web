# API Spec — Pengajar (Public)

> Endpoint untuk browsing dan melihat profil pengajar.

**Base URL:** `/api/v1`

---

## 1. Get Daftar Pengajar

Mengambil daftar semua pengajar.

**Endpoint:** `GET /api/v1/instructors`
**Auth:** Tidak diperlukan

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 12 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama |
| role | string | - | Filter berdasarkan spesialisasi/jabatan |
| sort | string | `name_asc` | Sorting: `name_asc`, `name_desc`, `rating`, `courses`, `students` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "instructors": [
      {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi",
        "role": "Pakar Kebersihan Masjid",
        "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid di berbagai kota besar Indonesia.",
        "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
        "rating": 4.9,
        "total_courses": 5,
        "total_students": 3500,
        "location": "Jakarta"
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

**Halaman terkait:** `/pengajar` — [Instructors.tsx](../../src/pages/Instructors.tsx)

---

## 2. Get Profil Pengajar

Mengambil detail profil satu pengajar beserta kursus yang diajar.

**Endpoint:** `GET /api/v1/instructors/:id`
**Auth:** Tidak diperlukan

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Instructor UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Ahmad Fauzi",
    "role": "Pakar Kebersihan Masjid",
    "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid di berbagai kota besar Indonesia. Aktif sebagai konsultan kebersihan untuk lebih dari 100 masjid di Jabodetabek.",
    "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
    "rating": 4.9,
    "total_courses": 5,
    "total_students": 3500,
    "total_reviews": 450,
    "location": "Jakarta",
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "category": "Kebersihan",
        "level": "Pemula",
        "price": 0,
        "price_display": "Gratis",
        "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
        "rating": 4.8,
        "students_count": 1200,
        "duration": "4 jam 30 menit",
        "modules_count": 12
      }
    ],
    "reviews": [
      {
        "id": "uuid-string",
        "user_name": "Budi Santoso",
        "course_title": "Standar Operasional Kebersihan Masjid",
        "rating": 5,
        "comment": "Penyampaian materi sangat jelas dan mudah dipahami",
        "created_at": "2025-01-12T00:00:00Z"
      }
    ]
  }
}
```

### Response — 404 Not Found

```json
{
  "success": false,
  "message": "Pengajar tidak ditemukan"
}
```

**Halaman terkait:** `/pengajar/:id` — [InstructorProfile.tsx](../../src/pages/InstructorProfile.tsx)

---

## 3. Get Daftar Spesialisasi Pengajar

Mengambil daftar role/spesialisasi pengajar untuk filter.

**Endpoint:** `GET /api/v1/instructors/roles`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "roles": [
      "Pakar Kebersihan Masjid",
      "Konsultan Keuangan Masjid",
      "Ahli Sound System Masjid",
      "Pakar Manajemen Masjid",
      "Konsultan Ibadah",
      "Pakar Keamanan Masjid"
    ]
  }
}
```
