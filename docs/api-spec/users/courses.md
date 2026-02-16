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

> **Catatan**: Hanya menampilkan kursus dengan `status = PUBLISHED`. `pricing` diambil dari enum `CoursePricing` (FREE/PAID). `duration` dihitung dari `SUM(lessons.duration)`. `lessons_count` dihitung dari `COUNT(lessons)`.

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

### Response — 404 Not Found

```json
{
  "message": "Kursus tidak ditemukan"
}
```

**Halaman terkait:** `/course/:slug` — [CourseDetail.tsx](../../pages/CourseDetail.tsx)

---

## 3. Enroll Kursus (Gratis)

Mendaftarkan user ke kursus gratis.

**Endpoint:** `POST /api/v1/courses/:id/enroll`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 201 Created

```json
{
  "data": {
    "enrollment": {
      "id": "uuid-string",
      "course_id": "uuid-string",
      "user_id": "uuid-string",
      "progress": 0,
      "status": "ACTIVE",
      "enrolled_at": "2025-01-15T10:00:00Z"
    }
  },
  "message": "Berhasil mendaftar kursus"
}
```

### Response — 400 Bad Request

```json
{
  "message": "Anda sudah terdaftar di kursus ini"
}
```

### Response — 402 Payment Required

```json
{
  "message": "Kursus ini berbayar. Silakan lakukan pembayaran terlebih dahulu."
}
```

---

## 4. Get Kursus Saya (Enrolled Courses)

Mengambil daftar kursus yang diikuti user.

**Endpoint:** `GET /api/v1/me/courses`
**Auth:** Bearer Token (Required, role: STUDENT)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| status | string | - | Filter: `ACTIVE`, `COMPLETED` |
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "course": {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "slug": "standar-operasional-kebersihan-masjid",
        "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
        "instructor": {
          "name": "Ustadz Ahmad Fauzi"
        },
        "lessons_count": 12
      },
      "progress": 45,
      "completed_lessons": 5,
      "status": "ACTIVE",
      "enrolled_at": "2025-01-10T00:00:00Z",
      "last_accessed_at": "2025-01-14T08:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 3,
    "total_pages": 1
  }
}
```

**Halaman terkait:** `/akun/kursus` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

---

## 5. Get Course Player Data

Mengambil data lengkap untuk belajar (course player).

**Endpoint:** `GET /api/v1/courses/:id/learn`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 200 OK

```json
{
  "data": {
    "course": {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "instructor": {
        "name": "Ustadz Ahmad Fauzi",
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
      }
    },
    "sections": [
      {
        "id": "uuid-string",
        "title": "Pengantar",
        "category": "INTRODUCTION",
        "sort_order": 0,
        "lessons": [
          {
            "id": "uuid-string",
            "title": "Pengantar Kebersihan Masjid",
            "sort_order": 0,
            "duration": 15,
            "type": "VIDEO",
            "video_url": "https://www.youtube.com/embed/abc123",
            "summary": "Pengenalan tentang pentingnya kebersihan masjid...",
            "is_completed": true,
            "completed_at": "2025-01-11T10:00:00Z",
            "materials": [
              {
                "id": "uuid-string",
                "title": "Slide Pengantar.pdf",
                "type": "PDF",
                "file_url": "https://storage.example.com/materials/slide-1.pdf",
                "file_size": 2048000,
                "is_downloadable": true
              }
            ]
          },
          {
            "id": "uuid-string",
            "title": "Mengapa Kebersihan Penting?",
            "sort_order": 1,
            "duration": 10,
            "type": "VIDEO",
            "video_url": "https://www.youtube.com/embed/def456",
            "summary": "Dalil dan manfaat menjaga kebersihan masjid...",
            "is_completed": false,
            "completed_at": null,
            "materials": []
          }
        ]
      }
    ],
    "progress": {
      "percentage": 45,
      "completed_lessons": 5,
      "total_lessons": 12,
      "last_lesson_id": "uuid-string"
    }
  }
}
```

### Response — 403 Forbidden

```json
{
  "message": "Anda belum terdaftar di kursus ini"
}
```

**Halaman terkait:** `/belajar/:id` — [CoursePlayer.tsx](../../pages/CoursePlayer.tsx)

---

## 6. Update Lesson Progress

Menandai lesson sebagai selesai.

**Endpoint:** `POST /api/v1/courses/:courseId/lessons/:lessonId/complete`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| courseId | string | Course UUID |
| lessonId | string | Lesson UUID |

### Response — 200 OK

```json
{
  "data": {
    "lesson_id": "uuid-string",
    "is_completed": true,
    "completed_at": "2025-01-15T11:00:00Z",
    "course_progress": {
      "percentage": 50,
      "completed_lessons": 6,
      "total_lessons": 12,
      "is_course_completed": false
    }
  },
  "message": "Lesson berhasil diselesaikan"
}
```

### Response (Kursus Selesai) — 200 OK

```json
{
  "data": {
    "lesson_id": "uuid-string",
    "is_completed": true,
    "completed_at": "2025-01-15T11:00:00Z",
    "course_progress": {
      "percentage": 100,
      "completed_lessons": 12,
      "total_lessons": 12,
      "is_course_completed": true
    },
    "certificate": {
      "id": "uuid-string",
      "certificate_number": "MARBOT-2025-001",
      "issued_at": "2025-01-15T11:00:00Z"
    }
  },
  "message": "Selamat! Anda telah menyelesaikan kursus ini."
}
```

> **Catatan**: Membuat record di `lesson_progress` (is_completed = TRUE). Jika semua lesson selesai dan `courses.has_certificate = TRUE`, otomatis generate sertifikat di tabel `certificates`. Progress enrollment di-update.

---

## 7. Get Diskusi per Lesson

Mengambil daftar thread diskusi untuk lesson tertentu.

**Endpoint:** `GET /api/v1/courses/:courseId/lessons/:lessonId/discussions`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| courseId | string | Course UUID |
| lessonId | string | Lesson UUID |

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Pertanyaan tentang teknik pembersihan",
      "body": "Apakah ada rekomendasi alat untuk membersihkan karpet masjid yang besar?",
      "user": {
        "id": "uuid-string",
        "name": "Budi Santoso",
        "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
      },
      "replies_count": 3,
      "is_pinned": false,
      "is_resolved": false,
      "created_at": "2025-01-12T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 5,
    "total_pages": 1
  }
}
```

---

## 8. Create Thread Diskusi

Membuat thread diskusi baru pada lesson.

**Endpoint:** `POST /api/v1/courses/:courseId/lessons/:lessonId/discussions`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled)

### Request Body

```json
{
  "title": "Pertanyaan tentang teknik pembersihan",
  "body": "Apakah ada rekomendasi alat untuk membersihkan karpet masjid yang besar?"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 5, max 255 karakter |
| body | string | Ya | Min 10, max 5000 karakter |

### Response — 201 Created

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Pertanyaan tentang teknik pembersihan",
    "body": "Apakah ada rekomendasi alat untuk membersihkan karpet masjid yang besar?",
    "user": {
      "id": "uuid-string",
      "name": "Budi Santoso",
      "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
    },
    "replies_count": 0,
    "is_pinned": false,
    "is_resolved": false,
    "created_at": "2025-01-15T11:00:00Z"
  },
  "message": "Diskusi berhasil dibuat"
}
```

---

## 9. Get Replies Thread Diskusi

Mengambil balasan dari thread diskusi.

**Endpoint:** `GET /api/v1/discussions/:threadId/replies`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled di kursus terkait)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| threadId | string | Thread UUID |

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 20 | Jumlah per halaman |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "body": "Saya biasa menggunakan vacuum cleaner industrial untuk karpet masjid yang luas.",
      "user": {
        "id": "uuid-string",
        "name": "Ahmad Fauzi",
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
      },
      "parent_id": null,
      "is_accepted": false,
      "votes_count": 5,
      "is_voted": true,
      "created_at": "2025-01-12T11:00:00Z",
      "replies": [
        {
          "id": "uuid-string",
          "body": "Terima kasih, ustadz! Bisa rekomendasikan mereknya?",
          "user": {
            "id": "uuid-string",
            "name": "Budi Santoso",
            "avatar_url": "https://storage.example.com/avatars/user-1.jpg"
          },
          "parent_id": "uuid-parent",
          "is_accepted": false,
          "votes_count": 0,
          "is_voted": false,
          "created_at": "2025-01-12T12:00:00Z"
        }
      ]
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 3,
    "total_pages": 1
  }
}
```

> **Catatan**: Replies level 1 (parent_id = NULL) ditampilkan dengan nested replies (level 2). `votes_count` dari `COUNT(discussion_votes)`. `is_voted` menandakan apakah user saat ini sudah vote reply tersebut.

---

## 10. Create Reply Diskusi

Membalas thread atau reply diskusi.

**Endpoint:** `POST /api/v1/discussions/:threadId/replies`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled di kursus terkait)

### Request Body

```json
{
  "body": "Saya biasa menggunakan vacuum cleaner industrial untuk karpet masjid yang luas.",
  "parent_id": null
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| body | string | Ya | Min 3, max 5000 karakter |
| parent_id | string | Tidak | UUID reply yang dibalas (NULL untuk reply ke thread) |

### Response — 201 Created

```json
{
  "data": {
    "id": "uuid-string",
    "body": "Saya biasa menggunakan vacuum cleaner industrial untuk karpet masjid yang luas.",
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
    },
    "parent_id": null,
    "is_accepted": false,
    "votes_count": 0,
    "created_at": "2025-01-15T11:30:00Z"
  },
  "message": "Balasan berhasil ditambahkan"
}
```

---

## 11. Vote Reply Diskusi

Toggle upvote pada reply diskusi.

**Endpoint:** `POST /api/v1/discussions/replies/:replyId/vote`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| replyId | string | Reply UUID |

### Response — 200 OK (Voted)

```json
{
  "data": {
    "reply_id": "uuid-string",
    "is_voted": true,
    "votes_count": 6
  },
  "message": "Vote berhasil"
}
```

### Response — 200 OK (Unvoted)

```json
{
  "data": {
    "reply_id": "uuid-string",
    "is_voted": false,
    "votes_count": 5
  },
  "message": "Vote dibatalkan"
}
```

> **Catatan**: Toggle mechanism — jika sudah vote maka unvote, jika belum vote maka vote. Data di tabel `discussion_votes`.

---

## 12. Submit Review Kursus

Memberikan ulasan untuk kursus yang telah diikuti.

**Endpoint:** `POST /api/v1/courses/:id/reviews`
**Auth:** Bearer Token (Required, role: STUDENT, harus enrolled)

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
  "data": {
    "review": {
      "id": "uuid-string",
      "rating": 5,
      "comment": "Materi sangat bermanfaat dan mudah dipahami",
      "created_at": "2025-01-15T12:00:00Z"
    }
  },
  "message": "Ulasan berhasil ditambahkan"
}
```

---

## 13. Get Kategori Kursus

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

> **Catatan**: Data dari tabel `categories`. `courses_count` dihitung dari kursus yang `status = PUBLISHED`.
