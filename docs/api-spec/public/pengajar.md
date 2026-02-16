# API Spec — Pengajar (Public)

> Endpoint untuk browsing dan melihat profil pengajar.

**Base URL:** `/api/v1`

---

## 1. Get Daftar Pengajar

Mengambil daftar semua pengajar yang aktif.

**Endpoint:** `GET /api/v1/instructors`
**Auth:** Tidak diperlukan

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 12 | Jumlah per halaman |
| q | string | - | Pencarian berdasarkan nama atau bio |
| specialization_id | string | - | Filter berdasarkan UUID spesialisasi |
| sort | string | `name` | Sorting: `name`, `-name`, `-rating`, `-students`, `-courses` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "specializations": [
        {
          "id": "uuid-string",
          "name": "Kebersihan & Sanitasi",
          "slug": "kebersihan-sanitasi"
        }
      ],
      "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid di berbagai kota besar Indonesia.",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
      "rating": 4.9,
      "total_courses": 5,
      "total_students": 3500,
      "location": "Jakarta"
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

> **Catatan**: Hanya menampilkan pengajar dengan `status = ACTIVE`. Computed fields (`rating`, `total_courses`, `total_students`) dihitung via query. Prefix `-` pada sort menandakan descending.

**Halaman terkait:** `/pengajar` — [Instructors.tsx](../../pages/Instructors.tsx)

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
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Ahmad Fauzi",
    "specializations": [
      {
        "id": "uuid-string",
        "name": "Kebersihan & Sanitasi",
        "slug": "kebersihan-sanitasi"
      }
    ],
    "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid di berbagai kota besar Indonesia.",
    "bio_full": "Aktif sebagai konsultan kebersihan untuk lebih dari 100 masjid di Jabodetabek. Pernah menjadi narasumber di berbagai seminar nasional tentang standar kebersihan rumah ibadah. Bersertifikat ISO untuk manajemen kebersihan fasilitas publik.",
    "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
    "rating": 4.9,
    "total_courses": 5,
    "total_students": 3500,
    "total_reviews": 450,
    "location": "Jakarta",
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "slug": "standar-operasional-kebersihan-masjid",
        "category": {
          "id": "uuid-string",
          "name": "Kebersihan",
          "slug": "kebersihan"
        },
        "level": "BEGINNER",
        "price": 0,
        "price_display": "Gratis",
        "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
        "rating": 4.8,
        "students_count": 1200,
        "duration": "4 jam 30 menit",
        "lessons_count": 12
      }
    ],
    "reviews": [
      {
        "id": "uuid-string",
        "user": {
          "name": "Budi Santoso",
          "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
        },
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
  "message": "Pengajar tidak ditemukan"
}
```

**Halaman terkait:** `/pengajar/:id` — [InstructorProfile.tsx](../../pages/InstructorProfile.tsx)

---

## 3. Get Daftar Spesialisasi Pengajar

Mengambil daftar spesialisasi pengajar dari tabel `specializations` untuk keperluan filter.

**Endpoint:** `GET /api/v1/specializations`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Kebersihan & Sanitasi",
      "slug": "kebersihan-sanitasi"
    },
    {
      "id": "uuid-string",
      "name": "Keuangan & Inventaris",
      "slug": "keuangan-inventaris"
    },
    {
      "id": "uuid-string",
      "name": "Teknis & Operasional",
      "slug": "teknis-operasional"
    },
    {
      "id": "uuid-string",
      "name": "Takmir & Manajemen",
      "slug": "takmir-manajemen"
    },
    {
      "id": "uuid-string",
      "name": "Layanan Jamaah & Adab",
      "slug": "layanan-jamaah-adab"
    }
  ]
}
```

> **Catatan**: Data dari tabel `specializations` ORDER BY `sort_order ASC`. Digunakan untuk populate filter chips di halaman daftar pengajar.
