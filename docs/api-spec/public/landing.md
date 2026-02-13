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
  "success": true,
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
        "category": "Kebersihan",
        "level": "Pemula",
        "price": 0,
        "price_display": "Gratis",
        "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
        "instructor": {
          "name": "Ustadz Ahmad Fauzi",
          "avatar": "https://storage.example.com/avatars/instructor-1.jpg"
        },
        "rating": 4.8,
        "students_count": 1200,
        "duration": "4 jam 30 menit",
        "modules_count": 12
      }
    ],
    "featured_instructors": [
      {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi",
        "role": "Pakar Kebersihan Masjid",
        "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
        "rating": 4.9,
        "total_courses": 5,
        "total_students": 3500
      }
    ],
    "faqs": [
      {
        "question": "Apa itu Marbot LMS?",
        "answer": "Marbot LMS adalah platform pembelajaran online yang dirancang khusus untuk meningkatkan kompetensi pengelola masjid..."
      }
    ]
  }
}
```

**Halaman terkait:** `/` — [Home.tsx](../../src/pages/Home.tsx)

---

## 2. Get FAQ

Mengambil daftar FAQ.

**Endpoint:** `GET /api/v1/faqs`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": "uuid-string",
        "question": "Apa itu Marbot LMS?",
        "answer": "Marbot LMS adalah platform pembelajaran online yang dirancang khusus untuk meningkatkan kompetensi pengelola masjid di Indonesia.",
        "order": 1
      },
      {
        "id": "uuid-string",
        "question": "Apakah kursus di Marbot LMS gratis?",
        "answer": "Kami menyediakan kursus gratis dan berbayar. Kursus gratis dapat langsung diakses setelah mendaftar.",
        "order": 2
      },
      {
        "id": "uuid-string",
        "question": "Bagaimana cara mendapatkan sertifikat?",
        "answer": "Sertifikat diberikan secara otomatis setelah Anda menyelesaikan seluruh modul dalam kursus.",
        "order": 3
      },
      {
        "id": "uuid-string",
        "question": "Apakah materi bisa diakses kapan saja?",
        "answer": "Ya, semua materi kursus dapat diakses 24/7 setelah Anda terdaftar.",
        "order": 4
      },
      {
        "id": "uuid-string",
        "question": "Bagaimana cara mengikuti workshop?",
        "answer": "Anda bisa mendaftar workshop melalui halaman Agenda. Pilih workshop yang diminati dan lakukan pendaftaran.",
        "order": 5
      },
      {
        "id": "uuid-string",
        "question": "Apakah ada batasan waktu untuk menyelesaikan kursus?",
        "answer": "Tidak ada batasan waktu. Anda bisa belajar sesuai kecepatan Anda sendiri.",
        "order": 6
      }
    ]
  }
}
```

---

## 3. Get Platform Stats

Mengambil statistik platform untuk ditampilkan di berbagai halaman.

**Endpoint:** `GET /api/v1/stats`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "total_courses": 24,
    "total_students": 5000,
    "total_instructors": 12,
    "total_certificates": 3200,
    "total_agenda": 15
  }
}
```
