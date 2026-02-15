# API Spec — Manajemen Kursus (Admin)

> Endpoint CRUD untuk mengelola kursus, sections, lessons, learning points, dan materi pendukung.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Courses

Mengambil daftar semua kursus untuk admin.

**Endpoint:** `GET /api/v1/admin/courses`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan judul |
| status | string | - | Filter: `DRAFT`, `PUBLISHED`, `ARCHIVED` |
| category_id | string | - | Filter UUID kategori |
| level | string | - | Filter: `BEGINNER`, `INTERMEDIATE`, `ADVANCED` |
| pricing | string | - | Filter: `FREE`, `PAID` |
| instructor_id | string | - | Filter UUID pengajar |
| sort | string | `-created_at` | Sorting: `title`, `-title`, `created_at`, `-created_at`, `-students_count`, `-rating` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Standar Operasional Kebersihan Masjid",
      "slug": "standar-operasional-kebersihan-masjid",
      "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
      "category": {
        "id": "uuid-string",
        "name": "Kebersihan",
        "slug": "kebersihan"
      },
      "instructor": {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi",
        "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
      },
      "summary": "Pelajari cara menjaga masjid tetap wangi, rapi, dan nyaman untuk jamaah 24 jam.",
      "level": "BEGINNER",
      "pricing": "FREE",
      "price": 0,
      "status": "PUBLISHED",
      "lessons_count": 12,
      "students_count": 1200,
      "rating": 4.8,
      "published_at": "2025-01-05T10:00:00Z",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "per_page": 10,
    "total_pages": 3
  },
  "links": {
    "self": "/api/v1/admin/courses?page=1&per_page=10",
    "next": "/api/v1/admin/courses?page=2&per_page=10",
    "last": "/api/v1/admin/courses?page=3&per_page=10"
  }
}
```

> **Computed fields**: `lessons_count`, `students_count`, `rating` dihitung via query (lihat Computed Fields di database-schema.md).

---

## 2. Get Course Detail

Mengambil detail kursus lengkap beserta sections, lessons, dan learning points.

**Endpoint:** `GET /api/v1/admin/courses/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Standar Operasional Kebersihan Masjid",
    "slug": "standar-operasional-kebersihan-masjid",
    "summary": "Pelajari cara menjaga masjid tetap wangi, rapi, dan nyaman untuk jamaah 24 jam.",
    "description": "Pelajari standar kebersihan masjid sesuai panduan terkini...",
    "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg",
    "video_promo_url": "https://www.youtube.com/watch?v=promo-xxx",
    "category": {
      "id": "uuid-string",
      "name": "Kebersihan",
      "slug": "kebersihan"
    },
    "instructor": {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg"
    },
    "level": "BEGINNER",
    "language": "Indonesia",
    "pricing": "FREE",
    "price": 0,
    "original_price": null,
    "has_certificate": true,
    "has_lifetime_access": true,
    "status": "PUBLISHED",
    "published_at": "2025-01-05T10:00:00Z",
    "learning_points": [
      {
        "id": "uuid-string",
        "point": "Memahami standar kebersihan masjid secara komprehensif",
        "sort_order": 0
      },
      {
        "id": "uuid-string",
        "point": "Menerapkan SOP harian kebersihan area utama",
        "sort_order": 1
      }
    ],
    "sections": [
      {
        "id": "uuid-string",
        "title": "Pengantar",
        "description": "Pendahuluan tentang kebersihan masjid",
        "category": "INTRODUCTION",
        "sort_order": 0,
        "lessons_count": 2,
        "duration": 18,
        "lessons": [
          {
            "id": "uuid-string",
            "title": "Tentang Kebersihan Masjid",
            "type": "VIDEO",
            "duration": 10,
            "video_url": "https://www.youtube.com/watch?v=xxx",
            "is_free_preview": true,
            "sort_order": 0
          },
          {
            "id": "uuid-string",
            "title": "Mengapa Kebersihan Penting",
            "type": "TEXT",
            "duration": 8,
            "is_free_preview": false,
            "sort_order": 1
          }
        ]
      }
    ],
    "students_count": 1200,
    "rating": 4.8,
    "reviews_count": 150,
    "total_duration": 240,
    "total_lessons": 12,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-10T00:00:00Z",
    "created_by": "uuid-admin"
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Kursus tidak ditemukan"
  }
}
```

---

## 3. Create Course

Membuat kursus baru (status default: DRAFT).

**Endpoint:** `POST /api/v1/admin/courses`
**Content-Type:** `multipart/form-data` (untuk upload thumbnail) atau `application/json`

### Request Body

```json
{
  "title": "Manajemen Sound System Masjid",
  "summary": "Panduan praktis setting audio masjid agar jernih dan nyaman.",
  "description": "Panduan lengkap mengelola sound system masjid...",
  "category_id": "uuid-string",
  "instructor_id": "uuid-string",
  "level": "INTERMEDIATE",
  "language": "Indonesia",
  "pricing": "PAID",
  "price": 150000,
  "original_price": 200000,
  "has_certificate": true,
  "has_lifetime_access": true,
  "video_promo_url": "https://www.youtube.com/watch?v=promo-xxx",
  "thumbnail": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 5, max 255 karakter |
| summary | string | Tidak | Max 500 karakter. Ringkasan singkat untuk card |
| description | string | Tidak | Rich text/markdown |
| category_id | string | Ya | UUID kategori yang valid |
| instructor_id | string | Ya | UUID pengajar yang valid |
| level | string | Ya | `BEGINNER`, `INTERMEDIATE`, `ADVANCED` |
| language | string | Tidak | Default `Indonesia` |
| pricing | string | Ya | `FREE`, `PAID` |
| price | number | Ya | 0 jika FREE, > 0 jika PAID |
| original_price | number | Tidak | Harus > price jika diisi |
| has_certificate | boolean | Tidak | Default `false` |
| has_lifetime_access | boolean | Tidak | Default `true` |
| video_promo_url | string | Tidak | URL YouTube video promosi/trailer |
| thumbnail | file | Tidak | JPG/PNG, max 5MB |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/courses/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Manajemen Sound System Masjid",
    "slug": "manajemen-sound-system-masjid",
    "status": "DRAFT",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

### Response — 422 Unprocessable Entity

```json
{
  "error": {
    "code": "validation_error",
    "message": "Validasi gagal",
    "details": [
      {
        "field": "title",
        "message": "Judul kursus wajib diisi",
        "code": "required"
      },
      {
        "field": "price",
        "message": "Harga harus lebih dari 0 untuk kursus PAID",
        "code": "invalid_value"
      }
    ]
  }
}
```

---

## 4. Update Course

Mengupdate data kursus.

**Endpoint:** `PATCH /api/v1/admin/courses/:id`
**Content-Type:** `multipart/form-data` atau `application/json`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Request Body

Field yang tidak dikirim tidak akan diubah (partial update).

```json
{
  "title": "Manajemen Sound System Masjid (Updated)",
  "price": 175000
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Manajemen Sound System Masjid (Updated)",
    "slug": "manajemen-sound-system-masjid",
    "status": "DRAFT",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

---

## 5. Delete Course

Menghapus kursus (soft delete). Tidak bisa menghapus kursus yang masih memiliki peserta aktif.

**Endpoint:** `DELETE /api/v1/admin/courses/:id`

### Response — 204 No Content

_(empty body)_

### Response — 409 Conflict

```json
{
  "error": {
    "code": "has_active_enrollments",
    "message": "Tidak dapat menghapus kursus yang masih memiliki peserta aktif"
  }
}
```

---

## 6. Update Course Status

Mengubah status kursus (publish/archive/draft).

**Endpoint:** `PATCH /api/v1/admin/courses/:id/status`

### Request Body

```json
{
  "status": "PUBLISHED"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `DRAFT`, `PUBLISHED`, `ARCHIVED` |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "status": "PUBLISHED",
    "published_at": "2025-01-15T10:00:00Z"
  }
}
```

> **Catatan**: Saat status diubah ke `PUBLISHED`, server otomatis set `published_at = NOW()` jika belum ada.

---

## 7. Course Learning Points

### 7.1 Batch Update Learning Points

Mengganti semua learning points kursus sekaligus (replace all).

**Endpoint:** `PUT /api/v1/admin/courses/:id/learning-points`

### Request Body

```json
{
  "points": [
    { "point": "Memahami standar kebersihan masjid", "sort_order": 0 },
    { "point": "Menerapkan SOP harian kebersihan", "sort_order": 1 },
    { "point": "Mengelola inventaris alat kebersihan", "sort_order": 2 }
  ]
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| points | array | Ya | Min 1 item |
| points[].point | string | Ya | Min 5, max 500 karakter |
| points[].sort_order | number | Ya | >= 0 |

### Response — 200 OK

```json
{
  "data": [
    { "id": "uuid-string", "point": "Memahami standar kebersihan masjid", "sort_order": 0 },
    { "id": "uuid-string", "point": "Menerapkan SOP harian kebersihan", "sort_order": 1 },
    { "id": "uuid-string", "point": "Mengelola inventaris alat kebersihan", "sort_order": 2 }
  ]
}
```

---

## 8. Course Sections

### 8.1 Create Section

**Endpoint:** `POST /api/v1/admin/courses/:courseId/sections`

### Request Body

```json
{
  "title": "Kebersihan Area Utama",
  "description": "Modul ini membahas teknik kebersihan area shalat utama",
  "category": "MAIN",
  "sort_order": 1
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 3, max 255 karakter |
| description | string | Tidak | Deskripsi section |
| category | string | Ya | `INTRODUCTION`, `MAIN`, `SUPPLEMENTARY`, `CLOSING` |
| sort_order | number | Ya | >= 0 |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/courses/{courseId}/sections/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Kebersihan Area Utama",
    "description": "Modul ini membahas teknik kebersihan area shalat utama",
    "category": "MAIN",
    "sort_order": 1,
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

### 8.2 Update Section

**Endpoint:** `PATCH /api/v1/admin/courses/:courseId/sections/:sectionId`

### Request Body

```json
{
  "title": "Kebersihan Area Utama (Revisi)",
  "category": "MAIN"
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Kebersihan Area Utama (Revisi)",
    "category": "MAIN",
    "sort_order": 1,
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 8.3 Delete Section

Menghapus section beserta semua lessons di dalamnya (CASCADE).

**Endpoint:** `DELETE /api/v1/admin/courses/:courseId/sections/:sectionId`

### Response — 204 No Content

_(empty body)_

### 8.4 Reorder Sections

**Endpoint:** `PUT /api/v1/admin/courses/:courseId/sections/reorder`

### Request Body

```json
{
  "section_ids": ["uuid-3", "uuid-1", "uuid-2", "uuid-4"]
}
```

### Response — 200 OK

```json
{
  "data": {
    "message": "Urutan section berhasil diperbarui"
  }
}
```

---

## 9. Lessons

### 9.1 Create Lesson

**Endpoint:** `POST /api/v1/admin/courses/:courseId/sections/:sectionId/lessons`

### Request Body

```json
{
  "title": "Teknik Sapu & Pel Efisien",
  "summary": "Pelajari teknik menyapu dan mengepel yang efisien untuk area masjid",
  "type": "VIDEO",
  "video_url": "https://www.youtube.com/watch?v=xxx",
  "duration": 15,
  "is_free_preview": false,
  "sort_order": 0
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 3, max 255 karakter |
| summary | string | Tidak | Deskripsi ringkas |
| type | string | Ya | `VIDEO`, `TEXT`, `QUIZ` |
| content | string | Tidak | Konten teks/artikel (untuk TEXT) atau JSON quiz (untuk QUIZ) |
| video_url | string | Conditional | Wajib jika type = VIDEO. URL YouTube valid |
| duration | number | Tidak | Durasi dalam menit, >= 0 |
| is_free_preview | boolean | Tidak | Default `false` |
| sort_order | number | Ya | >= 0 |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/courses/{courseId}/sections/{sectionId}/lessons/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Teknik Sapu & Pel Efisien",
    "type": "VIDEO",
    "video_url": "https://www.youtube.com/watch?v=xxx",
    "duration": 15,
    "is_free_preview": false,
    "sort_order": 0,
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

### 9.2 Update Lesson

**Endpoint:** `PATCH /api/v1/admin/courses/:courseId/sections/:sectionId/lessons/:lessonId`

### Request Body

Field yang tidak dikirim tidak akan diubah.

```json
{
  "title": "Teknik Sapu & Pel Efisien (Updated)",
  "duration": 20
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Teknik Sapu & Pel Efisien (Updated)",
    "type": "VIDEO",
    "duration": 20,
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 9.3 Delete Lesson

**Endpoint:** `DELETE /api/v1/admin/courses/:courseId/sections/:sectionId/lessons/:lessonId`

### Response — 204 No Content

_(empty body)_

### 9.4 Reorder Lessons in Section

**Endpoint:** `PUT /api/v1/admin/courses/:courseId/sections/:sectionId/lessons/reorder`

### Request Body

```json
{
  "lesson_ids": ["uuid-3", "uuid-1", "uuid-2"]
}
```

### Response — 200 OK

```json
{
  "data": {
    "message": "Urutan lesson berhasil diperbarui"
  }
}
```

---

## 10. Course Materials (per Lesson)

### 10.1 List Materials for a Lesson

**Endpoint:** `GET /api/v1/admin/courses/:courseId/lessons/:lessonId/materials`

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Template Excel Keuangan.xlsx",
      "type": "SPREADSHEET",
      "file_url": "https://storage.example.com/materials/template.xlsx",
      "file_size": 245760,
      "is_downloadable": true,
      "sort_order": 0,
      "created_at": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### 10.2 Upload Material

**Endpoint:** `POST /api/v1/admin/courses/:courseId/lessons/:lessonId/materials`
**Content-Type:** `multipart/form-data`

### Request Body

```json
{
  "title": "Template Excel Keuangan",
  "type": "SPREADSHEET",
  "file": "<file>",
  "is_downloadable": true,
  "sort_order": 0
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 3, max 255 karakter |
| type | string | Ya | `PDF`, `SLIDE`, `DOCUMENT`, `SPREADSHEET`, `IMAGE`, `LINK`, `OTHER` |
| file | file | Conditional | Wajib jika type != LINK. Max 50MB |
| file_url | string | Conditional | Wajib jika type = LINK. URL valid |
| is_downloadable | boolean | Tidak | Default `true` |
| sort_order | number | Tidak | Default 0 |

### Response — 201 Created

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Template Excel Keuangan",
    "type": "SPREADSHEET",
    "file_url": "https://storage.example.com/materials/template.xlsx",
    "file_size": 245760,
    "is_downloadable": true,
    "sort_order": 0,
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

### 10.3 Update Material

**Endpoint:** `PATCH /api/v1/admin/courses/:courseId/lessons/:lessonId/materials/:materialId`

### Request Body

```json
{
  "title": "Template Excel Keuangan (v2)",
  "is_downloadable": false
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "title": "Template Excel Keuangan (v2)",
    "is_downloadable": false,
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 10.4 Delete Material

**Endpoint:** `DELETE /api/v1/admin/courses/:courseId/lessons/:lessonId/materials/:materialId`

### Response — 204 No Content

_(empty body)_

---

## 11. Categories

### 11.1 List Categories

Mengambil daftar kategori kursus.

**Endpoint:** `GET /api/v1/admin/categories`

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Kebersihan",
      "slug": "kebersihan",
      "description": "Kursus seputar kebersihan dan perawatan masjid",
      "sort_order": 0,
      "courses_count": 5
    },
    {
      "id": "uuid-string",
      "name": "Keuangan",
      "slug": "keuangan",
      "description": "Kursus manajemen keuangan masjid",
      "sort_order": 1,
      "courses_count": 3
    }
  ]
}
```

### 11.2 Create Category

**Endpoint:** `POST /api/v1/admin/categories`

### Request Body

```json
{
  "name": "Teknologi",
  "description": "Kursus seputar teknologi untuk masjid",
  "sort_order": 5
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 2, max 100 karakter, UNIQUE |
| description | string | Tidak | Deskripsi kategori |
| sort_order | number | Tidak | Default 0 |

### Response — 201 Created

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Teknologi",
    "slug": "teknologi",
    "description": "Kursus seputar teknologi untuk masjid",
    "sort_order": 5,
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

> **Catatan**: `slug` di-generate otomatis dari `name` oleh server.

### 11.3 Update Category

**Endpoint:** `PATCH /api/v1/admin/categories/:id`

### Request Body

```json
{
  "name": "Teknologi & Digital",
  "sort_order": 6
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Teknologi & Digital",
    "slug": "teknologi-digital",
    "sort_order": 6,
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 11.4 Delete Category

Tidak bisa menghapus kategori yang masih memiliki kursus.

**Endpoint:** `DELETE /api/v1/admin/categories/:id`

### Response — 204 No Content

_(empty body)_

### Response — 409 Conflict

```json
{
  "error": {
    "code": "has_courses",
    "message": "Tidak dapat menghapus kategori yang masih memiliki kursus"
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

### 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Resource tidak ditemukan"
  }
}
```
