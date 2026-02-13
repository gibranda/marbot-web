# API Spec — Kursus (Users)

> Endpoint untuk browsing katalog, detail kursus, enrollment, dan learning experience.

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
| search | string | - | Pencarian berdasarkan judul |
| category | string | - | Filter kategori (e.g., `Kebersihan`, `Keuangan`, `Ibadah`) |
| level | string | - | Filter level: `Pemula`, `Menengah`, `Lanjut` |
| sort | string | `newest` | Sorting: `newest`, `rating`, `popular`, `price_asc`, `price_desc` |
| price | string | - | Filter harga: `free`, `paid` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "description": "Pelajari standar kebersihan masjid sesuai panduan terkini...",
        "category": "Kebersihan",
        "level": "Pemula",
        "price": 0,
        "price_display": "Gratis",
        "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
        "instructor": {
          "id": "uuid-string",
          "name": "Ustadz Ahmad Fauzi",
          "avatar": "https://storage.example.com/avatars/instructor-1.jpg"
        },
        "duration": "4 jam 30 menit",
        "modules_count": 12,
        "rating": 4.8,
        "students_count": 1200,
        "last_update": "2025-01-10T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 12,
      "total": 24,
      "total_pages": 2,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

**Halaman terkait:** `/katalog` — [Catalog.tsx](../../src/pages/Catalog.tsx)

---

## 2. Get Detail Kursus

Mengambil informasi lengkap satu kursus.

**Endpoint:** `GET /api/v1/courses/:id`
**Auth:** Tidak diperlukan (optional untuk status enrollment)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Standar Operasional Kebersihan Masjid",
    "description": "Pelajari standar kebersihan masjid sesuai panduan terkini untuk menjaga kenyamanan jamaah...",
    "category": "Kebersihan",
    "level": "Pemula",
    "price": 0,
    "price_display": "Gratis",
    "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
    "duration": "4 jam 30 menit",
    "modules_count": 12,
    "rating": 4.8,
    "students_count": 1200,
    "last_update": "2025-01-10T00:00:00Z",
    "instructor": {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "role": "Pakar Kebersihan Masjid",
      "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid...",
      "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
      "rating": 4.9,
      "total_courses": 5,
      "total_students": 3500
    },
    "modules": [
      {
        "id": "uuid-string",
        "title": "Pengantar Kebersihan Masjid",
        "order": 1,
        "duration": "25 menit",
        "type": "video",
        "is_preview": true
      },
      {
        "id": "uuid-string",
        "title": "Peralatan dan Bahan Kebersihan",
        "order": 2,
        "duration": "30 menit",
        "type": "video",
        "is_preview": false
      }
    ],
    "reviews": [
      {
        "id": "uuid-string",
        "user_name": "Budi Santoso",
        "user_avatar": "https://storage.example.com/avatars/user-1.jpg",
        "rating": 5,
        "comment": "Materi sangat bermanfaat dan mudah dipahami",
        "created_at": "2025-01-12T00:00:00Z"
      }
    ],
    "reviews_summary": {
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
    "is_enrolled": false,
    "is_purchased": false
  }
}
```

### Response — 404 Not Found

```json
{
  "success": false,
  "message": "Kursus tidak ditemukan"
}
```

**Halaman terkait:** `/course/:id` — [CourseDetail.tsx](../../src/pages/CourseDetail.tsx)

---

## 3. Enroll Kursus (Gratis)

Mendaftarkan user ke kursus gratis.

**Endpoint:** `POST /api/v1/courses/:id/enroll`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Berhasil mendaftar kursus",
  "data": {
    "enrollment": {
      "id": "uuid-string",
      "course_id": "uuid-string",
      "user_id": "uuid-string",
      "progress": 0,
      "status": "active",
      "enrolled_at": "2025-01-15T10:00:00Z"
    }
  }
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Anda sudah terdaftar di kursus ini"
}
```

### Response — 402 Payment Required

```json
{
  "success": false,
  "message": "Kursus ini berbayar. Silakan lakukan pembayaran terlebih dahulu."
}
```

---

## 4. Get Kursus Saya (Enrolled Courses)

Mengambil daftar kursus yang diikuti user.

**Endpoint:** `GET /api/v1/me/courses`
**Auth:** Bearer Token (Required, role: student)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| status | string | - | Filter: `active`, `completed` |
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "enrollments": [
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid",
          "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
          "instructor": {
            "name": "Ustadz Ahmad Fauzi"
          },
          "modules_count": 12
        },
        "progress": 45,
        "completed_modules": 5,
        "status": "active",
        "enrolled_at": "2025-01-10T00:00:00Z",
        "last_accessed": "2025-01-14T08:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 3,
      "total_pages": 1
    }
  }
}
```

**Halaman terkait:** `/akun/kursus` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 5. Get Course Player Data

Mengambil data lengkap untuk belajar (course player).

**Endpoint:** `GET /api/v1/courses/:id/learn`
**Auth:** Bearer Token (Required, role: student, harus enrolled)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "course": {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "instructor": {
        "name": "Ustadz Ahmad Fauzi",
        "avatar": "https://storage.example.com/avatars/instructor-1.jpg"
      }
    },
    "modules": [
      {
        "id": "uuid-string",
        "title": "Pengantar Kebersihan Masjid",
        "order": 1,
        "duration": "25 menit",
        "type": "video",
        "content_url": "https://storage.example.com/videos/module-1.mp4",
        "is_completed": true,
        "completed_at": "2025-01-11T10:00:00Z"
      },
      {
        "id": "uuid-string",
        "title": "Peralatan dan Bahan Kebersihan",
        "order": 2,
        "duration": "30 menit",
        "type": "video",
        "content_url": "https://storage.example.com/videos/module-2.mp4",
        "is_completed": false,
        "completed_at": null
      }
    ],
    "progress": {
      "percentage": 45,
      "completed_modules": 5,
      "total_modules": 12,
      "last_module_id": "uuid-string"
    }
  }
}
```

### Response — 403 Forbidden

```json
{
  "success": false,
  "message": "Anda belum terdaftar di kursus ini"
}
```

**Halaman terkait:** `/belajar/:id` — [CoursePlayer.tsx](../../src/pages/CoursePlayer.tsx)

---

## 6. Update Module Progress

Menandai modul sebagai selesai.

**Endpoint:** `POST /api/v1/courses/:courseId/modules/:moduleId/complete`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| courseId | string | Course UUID |
| moduleId | string | Module UUID |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Modul berhasil diselesaikan",
  "data": {
    "module_id": "uuid-string",
    "is_completed": true,
    "completed_at": "2025-01-15T11:00:00Z",
    "course_progress": {
      "percentage": 50,
      "completed_modules": 6,
      "total_modules": 12,
      "is_course_completed": false
    }
  }
}
```

### Response (Kursus Selesai) — 200 OK

```json
{
  "success": true,
  "message": "Selamat! Anda telah menyelesaikan kursus ini.",
  "data": {
    "module_id": "uuid-string",
    "is_completed": true,
    "completed_at": "2025-01-15T11:00:00Z",
    "course_progress": {
      "percentage": 100,
      "completed_modules": 12,
      "total_modules": 12,
      "is_course_completed": true
    },
    "certificate": {
      "id": "uuid-string",
      "cert_number": "MARBOT-2025-001",
      "issue_date": "2025-01-15T11:00:00Z"
    }
  }
}
```

---

## 7. Submit Review Kursus

Memberikan ulasan untuk kursus yang telah diikuti.

**Endpoint:** `POST /api/v1/courses/:id/reviews`
**Auth:** Bearer Token (Required, role: student, harus enrolled)

### Request Body

```json
{
  "rating": 5,
  "comment": "Materi sangat bermanfaat dan mudah dipahami"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| rating | number | Ya | 1-5 |
| comment | string | Tidak | Max 1000 karakter |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Ulasan berhasil ditambahkan",
  "data": {
    "review": {
      "id": "uuid-string",
      "rating": 5,
      "comment": "Materi sangat bermanfaat dan mudah dipahami",
      "created_at": "2025-01-15T12:00:00Z"
    }
  }
}
```

---

## 8. Get Kategori Kursus

Mengambil daftar kategori kursus yang tersedia.

**Endpoint:** `GET /api/v1/courses/categories`
**Auth:** Tidak diperlukan

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "slug": "kebersihan",
        "name": "Kebersihan",
        "courses_count": 5
      },
      {
        "slug": "keuangan",
        "name": "Keuangan",
        "courses_count": 3
      },
      {
        "slug": "ibadah",
        "name": "Ibadah",
        "courses_count": 4
      },
      {
        "slug": "manajemen",
        "name": "Manajemen",
        "courses_count": 6
      },
      {
        "slug": "teknologi",
        "name": "Teknologi",
        "courses_count": 2
      }
    ]
  }
}
```
