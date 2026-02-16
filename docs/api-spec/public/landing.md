# API Spec — Landing Page & Informasi Umum (Public)

> Endpoint untuk halaman utama, statistik, dan data publik lainnya.

**Base URL:** `/api/v1`

---

## 1. Get Landing Page Data

Mengambil data yang diperlukan untuk landing page.

**Endpoint:** `GET /api/v1/landing`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "data": {
    "hero": {
      "title": "Tingkatkan Kompetensi Pengelolaan Masjid Anda",
      "subtitle": "Platform pembelajaran online terlengkap untuk marbot, takmir, dan pengelola masjid di Indonesia",
      "cta_text": "Mulai Belajar",
      "cta_link": "/katalog"
    },
    "stats": {
      "total_courses": 24,
      "total_students": 5000,
      "total_instructors": 12,
      "total_certificates": 3200
    },
    "featured_courses": [
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
        "instructor": {
          "id": "uuid-string",
          "name": "Ustadz Ahmad Fauzi",
          "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
        },
        "rating": 4.8,
        "students_count": 1200,
        "duration": "4 jam 30 menit",
        "lessons_count": 12
      }
    ],
    "featured_instructors": [
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
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
        "rating": 4.9,
        "total_courses": 5,
        "total_students": 3500
      }
    ],
    "featured_threads": [
      {
        "id": "uuid-string",
        "title": "Tips Mengelola Kebersihan Masjid Saat Ramadhan",
        "body_preview": "Selama bulan Ramadhan, tantangan kebersihan masjid meningkat...",
        "user": {
          "id": "uuid-string",
          "name": "Budi Santoso",
          "avatar_url": "https://storage.example.com/avatars/user-1.jpg",
          "institution": "Masjid Al-Ikhlas"
        },
        "replies_count": 12,
        "created_at": "2025-01-12T00:00:00Z"
      }
    ],
    "faqs": [
      {
        "id": "uuid-string",
        "question": "Apa itu Marbot LMS?",
        "answer": "Marbot LMS adalah platform pembelajaran online yang dirancang khusus untuk meningkatkan kompetensi pengelola masjid..."
      }
    ]
  }
}
```

> **Catatan**: Data `hero` dan `stats` diambil dari tabel `site_settings`. `featured_courses` diambil berdasarkan rating tertinggi (limit 6). `featured_instructors` berdasarkan total peserta (limit 6). `featured_threads` dari `discussion_threads` terbaru (limit 3). `faqs` dari tabel `faqs` WHERE `is_published = TRUE` ORDER BY `sort_order`.

**Halaman terkait:** `/` — [Home.tsx](../../pages/Home.tsx)

---

## 2. Get FAQ

Mengambil daftar FAQ.

**Endpoint:** `GET /api/v1/faqs`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "question": "Apa itu Marbot LMS?",
      "answer": "Marbot LMS adalah platform pembelajaran online yang dirancang khusus untuk meningkatkan kompetensi pengelola masjid di Indonesia.",
      "sort_order": 1
    },
    {
      "id": "uuid-string",
      "question": "Apakah kursus di Marbot LMS gratis?",
      "answer": "Kami menyediakan kursus gratis dan berbayar. Kursus gratis dapat langsung diakses setelah mendaftar.",
      "sort_order": 2
    },
    {
      "id": "uuid-string",
      "question": "Bagaimana cara mendapatkan sertifikat?",
      "answer": "Sertifikat diberikan secara otomatis setelah Anda menyelesaikan seluruh modul dalam kursus.",
      "sort_order": 3
    },
    {
      "id": "uuid-string",
      "question": "Apakah materi bisa diakses kapan saja?",
      "answer": "Ya, semua materi kursus dapat diakses 24/7 setelah Anda terdaftar.",
      "sort_order": 4
    },
    {
      "id": "uuid-string",
      "question": "Bagaimana cara mengikuti workshop?",
      "answer": "Anda bisa mendaftar workshop melalui halaman Agenda. Pilih workshop yang diminati dan lakukan pendaftaran.",
      "sort_order": 5
    },
    {
      "id": "uuid-string",
      "question": "Apakah ada batasan waktu untuk menyelesaikan kursus?",
      "answer": "Tidak ada batasan waktu. Anda bisa belajar sesuai kecepatan Anda sendiri.",
      "sort_order": 6
    }
  ]
}
```

> **Catatan**: Data dari tabel `faqs` WHERE `is_published = TRUE` ORDER BY `sort_order ASC`.

---

## 3. Get Platform Stats

Mengambil statistik platform untuk ditampilkan di berbagai halaman.

**Endpoint:** `GET /api/v1/stats`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "data": {
    "total_courses": 24,
    "total_students": 5000,
    "total_instructors": 12,
    "total_certificates": 3200,
    "total_agenda": 15
  }
}
```

> **Catatan**: Nilai bisa diambil dari `site_settings` (statis, di-update via admin) atau dihitung via computed query secara real-time tergantung kebutuhan performa.

---

## 4. Search Global

Pencarian global untuk kursus, pengajar, dan agenda.

**Endpoint:** `GET /api/v1/search`
**Auth:** Tidak diperlukan

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| q | string | - | Kata kunci pencarian (required, min 2 karakter) |
| type | string | - | Filter tipe: `course`, `instructor`, `agenda` (opsional, default semua) |
| per_page | number | 10 | Jumlah per tipe |

### Response — 200 OK

```json
{
  "data": {
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
        "instructor": {
          "id": "uuid-string",
          "name": "Ustadz Ahmad Fauzi",
          "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
        },
        "rating": 4.8,
        "students_count": 1200
      }
    ],
    "instructors": [
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
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
        "rating": 4.9,
        "total_courses": 5
      }
    ],
    "agenda": [
      {
        "id": "uuid-string",
        "slug": "workshop-manajemen-keuangan-masjid",
        "title": "Workshop Manajemen Keuangan Masjid",
        "type": "ONLINE",
        "date": "2025-02-15",
        "cover_url": "https://storage.example.com/agenda/cover-1.jpg"
      }
    ]
  }
}
```

**Halaman terkait:** `/cari` — [SearchResults.tsx](../../pages/SearchResults.tsx)
