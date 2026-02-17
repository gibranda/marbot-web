# API Spec — Kursus (Public)

> Endpoint publik untuk browsing katalog kursus, detail kursus, dan kategori. Tidak memerlukan autentikasi.

**Base URL:** `/api/v1`

---

## 1. Get Katalog Kursus

Mengambil daftar kursus dengan filter dan pagination.

**Endpoint:** `GET /api/v1/courses`
**Auth:** Tidak diperlukan (optional untuk info enrollment)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 12 | Jumlah per halaman |
| q | string | - | Pencarian berdasarkan judul |
| category_id | string | - | Filter UUID kategori |
| level | string | - | Filter level: `BEGINNER`, `INTERMEDIATE`, `ADVANCED` |
| sort | string | `-created_at` | Sorting: `-created_at`, `-rating`, `-students`, `price`, `-price` |
| pricing | string | - | Filter harga: `FREE`, `PAID` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "slug": "standar-operasional-kebersihan-masjid",
      "summary": "Pelajari standar kebersihan masjid sesuai panduan terkini...",
      "category": {
        "id": "uuid-string",
        "name": "Kebersihan",
        "slug": "kebersihan"
      },
      "level": "BEGINNER",
      "pricing": "FREE",
      "price": 0,
      "original_price": 0,
      "price_display": "Gratis",
      "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
      "instructor": {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi",
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
      },
      "duration": "4 jam 30 menit",
      "lessons_count": 12,
      "rating": 4.8,
      "students_count": 1200,
      "updated_at": "2025-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 24,
    "total_pages": 2
  }
}
```

> **Catatan**: Hanya menampilkan kursus dengan `status = PUBLISHED`. `pricing` diambil dari enum `CoursePricing` (FREE/PAID). `duration` dihitung dari `SUM(lessons.duration)`. `lessons_count` dihitung dari `COUNT(lessons)`. Jika user sudah login (Bearer Token opsional), field `is_enrolled` dan `is_purchased` bisa ditambahkan per item.

**Halaman terkait:** `/katalog` — [Catalog.tsx](../../pages/Catalog.tsx)

---

## 2. Get Detail Kursus

Mengambil informasi lengkap satu kursus.

**Endpoint:** `GET /api/v1/courses/:slug`
**Auth:** Tidak diperlukan (optional untuk status enrollment)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Course slug |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Standar Operasional Kebersihan Masjid",
    "slug": "standar-operasional-kebersihan-masjid",
    "summary": "Pelajari standar kebersihan masjid sesuai panduan terkini",
    "description": "Pelajari standar kebersihan masjid sesuai panduan terkini untuk menjaga kenyamanan jamaah...",
    "category": {
      "id": "uuid-string",
      "name": "Kebersihan",
      "slug": "kebersihan"
    },
    "level": "BEGINNER",
    "pricing": "FREE",
    "price": 0,
    "original_price": 0,
    "price_display": "Gratis",
    "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
    "video_promo_url": "https://www.youtube.com/embed/abc123",
    "duration": "4 jam 30 menit",
    "lessons_count": 12,
    "rating": 4.8,
    "students_count": 1200,
    "has_certificate": true,
    "has_lifetime_access": true,
    "updated_at": "2025-01-10T00:00:00Z",
    "instructor": {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "specializations": [
        {
          "id": "uuid-string",
          "name": "Kebersihan & Sanitasi",
          "slug": "kebersihan-sanitasi"
        }
      ],
      "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid...",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
      "rating": 4.9,
      "total_courses": 5,
      "total_students": 3500
    },
    "learning_points": [
      "Memahami dasar-dasar pengelolaan kebersihan masjid",
      "Menggunakan peralatan kebersihan yang tepat",
      "Menyusun jadwal kebersihan yang efisien"
    ],
    "sections": [
      {
        "id": "uuid-string",
        "title": "Pengantar",
        "category": "INTRODUCTION",
        "sort_order": 0,
        "duration": "25 menit",
        "lessons_count": 2,
        "lessons": [
          {
            "id": "uuid-string",
            "title": "Pengantar Kebersihan Masjid",
            "sort_order": 0,
            "duration": 15,
            "type": "VIDEO",
            "is_free_preview": true
          },
          {
            "id": "uuid-string",
            "title": "Mengapa Kebersihan Penting?",
            "sort_order": 1,
            "duration": 10,
            "type": "VIDEO",
            "is_free_preview": false
          }
        ]
      },
      {
        "id": "uuid-string",
        "title": "Modul Pertama: Peralatan",
        "category": "MAIN",
        "sort_order": 1,
        "duration": "30 menit",
        "lessons_count": 2,
        "lessons": [
          {
            "id": "uuid-string",
            "title": "Peralatan dan Bahan Kebersihan",
            "sort_order": 0,
            "duration": 20,
            "type": "VIDEO",
            "is_free_preview": false
          },
          {
            "id": "uuid-string",
            "title": "Teknik Pembersihan Lantai Marmer",
            "sort_order": 1,
            "duration": 10,
            "type": "TEXT",
            "is_free_preview": false
          }
        ]
      }
    ],
    "reviews": {
      "summary": {
        "average": 4.8,
        "total": 150,
        "distribution": {
          "5": 100,
          "4": 35,
          "3": 10,
          "2": 3,
          "1": 2
        }
      },
      "items": [
        {
          "id": "uuid-string",
          "user": {
            "name": "Budi Santoso",
            "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
          },
          "rating": 5,
          "comment": "Materi sangat bermanfaat dan mudah dipahami",
          "created_at": "2025-01-12T00:00:00Z"
        }
      ]
    },
    "is_enrolled": false,
    "is_purchased": false
  }
}
```

> **Catatan**: `sections` menampilkan hierarki `course_sections` → `lessons`. Lesson detail (video_url, summary, materials) TIDAK disertakan — hanya ditampilkan di course player. `is_free_preview = true` menandakan lesson bisa diakses tanpa enrollment. `is_enrolled` dan `is_purchased` bernilai `false` jika user belum login. Review `items` dibatasi 3 terbaru; untuk pagination review lengkap gunakan endpoint terpisah.

### Response — 404 Not Found

```json
{
  "message": "Kursus tidak ditemukan"
}
```

**Halaman terkait:** `/course/:slug` — [CourseDetail.tsx](../../pages/CourseDetail.tsx)

---

## 3. Get Kategori Kursus

Mengambil daftar kategori kursus yang tersedia.

**Endpoint:** `GET /api/v1/categories`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Kebersihan",
      "slug": "kebersihan",
      "courses_count": 5
    },
    {
      "id": "uuid-string",
      "name": "Keuangan",
      "slug": "keuangan",
      "courses_count": 3
    },
    {
      "id": "uuid-string",
      "name": "Manajemen",
      "slug": "manajemen",
      "courses_count": 6
    },
    {
      "id": "uuid-string",
      "name": "Teknologi",
      "slug": "teknologi",
      "courses_count": 2
    }
  ]
}
```

> **Catatan**: Data dari tabel `categories`. `courses_count` dihitung dari kursus yang `status = PUBLISHED`. Endpoint ini digunakan untuk filter di halaman katalog dan sidebar navigasi.

---

## 4. Get Review Kursus

Mengambil daftar review kursus dengan pagination.

**Endpoint:** `GET /api/v1/courses/:slug/reviews`
**Auth:** Tidak diperlukan

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| slug | string | Course slug |

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| sort | string | `-created_at` | Sorting: `-created_at`, `-rating`, `rating` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "user": {
        "name": "Budi Santoso",
        "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
      },
      "rating": 5,
      "comment": "Materi sangat bermanfaat dan mudah dipahami",
      "created_at": "2025-01-12T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 150,
    "total_pages": 15
  }
}
```

> **Catatan**: Data dari tabel `course_reviews`. Endpoint ini untuk pagination review di halaman detail kursus. Summary review (average, distribution) sudah termasuk di response detail kursus.
