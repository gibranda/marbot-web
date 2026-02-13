# API Spec — Manajemen Kursus (Admin)

> Endpoint CRUD untuk mengelola kursus dan modul.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Kursus

Mengambil daftar semua kursus untuk admin.

**Endpoint:** `GET /api/v1/admin/courses`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan judul |
| status | string | - | Filter: `Published`, `Draft` |
| category | string | - | Filter kategori |
| level | string | - | Filter level |
| instructor_id | string | - | Filter berdasarkan pengajar |
| sort | string | `newest` | Sorting: `newest`, `title_asc`, `title_desc`, `students`, `rating` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "category": "Kebersihan",
        "level": "Pemula",
        "price": 0,
        "price_display": "Gratis",
        "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
        "instructor": {
          "id": "uuid-string",
          "name": "Ustadz Ahmad Fauzi"
        },
        "modules_count": 12,
        "rating": 4.8,
        "students_count": 1200,
        "status": "Published",
        "created_at": "2025-01-01T00:00:00Z",
        "last_update": "2025-01-10T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 24,
      "total_pages": 3
    }
  }
}
```

**Halaman terkait:** `/admin/kursus` — [AdminKursus.tsx](../../src/pages/admin/AdminKursus.tsx)

---

## 2. Get Detail Kursus (Admin)

Mengambil detail kursus untuk form edit.

**Endpoint:** `GET /api/v1/admin/courses/:id`

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
    "description": "Pelajari standar kebersihan masjid sesuai panduan terkini...",
    "category": "Kebersihan",
    "level": "Pemula",
    "price": 0,
    "thumbnail": "https://storage.example.com/courses/thumb-1.jpg",
    "instructor_id": "uuid-string",
    "status": "Published",
    "modules": [
      {
        "id": "uuid-string",
        "title": "Pengantar Kebersihan Masjid",
        "order": 1,
        "duration": "25 menit",
        "type": "video",
        "content_url": "https://storage.example.com/videos/module-1.mp4",
        "is_preview": true
      }
    ],
    "created_at": "2025-01-01T00:00:00Z",
    "last_update": "2025-01-10T00:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/kursus/:id/edit` — [AdminEditCourse.tsx](../../src/pages/admin/AdminEditCourse.tsx)

---

## 3. Create Kursus

Membuat kursus baru.

**Endpoint:** `POST /api/v1/admin/courses`
**Content-Type:** `multipart/form-data` (untuk upload thumbnail)

### Request Body

```json
{
  "title": "Manajemen Sound System Masjid",
  "description": "Panduan lengkap mengelola sound system masjid...",
  "category": "Teknologi",
  "level": "Menengah",
  "price": 150000,
  "instructor_id": "uuid-string",
  "status": "Draft",
  "thumbnail": "<file>",
  "modules": [
    {
      "title": "Pengenalan Sound System",
      "order": 1,
      "duration": "20 menit",
      "type": "video",
      "is_preview": true
    },
    {
      "title": "Instalasi dan Konfigurasi",
      "order": 2,
      "duration": "35 menit",
      "type": "video",
      "is_preview": false
    }
  ]
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| title | string | Ya | Min 5 karakter, max 200 |
| description | string | Ya | Min 20 karakter |
| category | string | Ya | Kategori yang valid |
| level | string | Ya | `Pemula`, `Menengah`, `Lanjut` |
| price | number | Ya | >= 0 (0 = gratis) |
| instructor_id | string | Ya | UUID pengajar yang valid |
| status | string | Ya | `Published`, `Draft` |
| thumbnail | file | Tidak | JPG/PNG, max 5MB |
| modules | array | Tidak | Array objek modul |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Kursus berhasil dibuat",
  "data": {
    "id": "uuid-string",
    "title": "Manajemen Sound System Masjid",
    "status": "Draft",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

### Response — 422 Validation Error

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "title": ["Judul kursus wajib diisi"],
    "instructor_id": ["Pengajar tidak ditemukan"]
  }
}
```

**Halaman terkait:** `/admin/kursus/baru` — [AdminAddCourse.tsx](../../src/pages/admin/AdminAddCourse.tsx)

---

## 4. Update Kursus

Mengupdate data kursus.

**Endpoint:** `PUT /api/v1/admin/courses/:id`
**Content-Type:** `multipart/form-data`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Request Body

Sama dengan Create Course. Field yang tidak dikirim tidak akan diubah.

### Response — 200 OK

```json
{
  "success": true,
  "message": "Kursus berhasil diperbarui",
  "data": {
    "id": "uuid-string",
    "title": "Manajemen Sound System Masjid (Updated)",
    "status": "Published",
    "last_update": "2025-01-15T12:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/kursus/:id/edit` — [AdminEditCourse.tsx](../../src/pages/admin/AdminEditCourse.tsx)

---

## 5. Delete Kursus

Menghapus kursus (soft delete).

**Endpoint:** `DELETE /api/v1/admin/courses/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Kursus berhasil dihapus"
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Tidak dapat menghapus kursus yang masih memiliki peserta aktif"
}
```

---

## 6. Update Status Kursus

Mengubah status kursus (publish/draft).

**Endpoint:** `PATCH /api/v1/admin/courses/:id/status`

### Request Body

```json
{
  "status": "Published"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| status | string | Ya | `Published`, `Draft` |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Status kursus berhasil diubah menjadi Published"
}
```

---

## 7. Manage Modul Kursus

### 7.1 Tambah Modul

**Endpoint:** `POST /api/v1/admin/courses/:courseId/modules`

### Request Body

```json
{
  "title": "Modul Baru: Troubleshooting",
  "order": 5,
  "duration": "30 menit",
  "type": "video",
  "content_url": "https://storage.example.com/videos/new-module.mp4",
  "is_preview": false
}
```

### Response — 201 Created

```json
{
  "success": true,
  "message": "Modul berhasil ditambahkan",
  "data": {
    "id": "uuid-string",
    "title": "Modul Baru: Troubleshooting",
    "order": 5
  }
}
```

### 7.2 Update Modul

**Endpoint:** `PUT /api/v1/admin/courses/:courseId/modules/:moduleId`

### Request Body

```json
{
  "title": "Modul Updated: Advanced Troubleshooting",
  "duration": "45 menit"
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Modul berhasil diperbarui"
}
```

### 7.3 Delete Modul

**Endpoint:** `DELETE /api/v1/admin/courses/:courseId/modules/:moduleId`

### Response — 200 OK

```json
{
  "success": true,
  "message": "Modul berhasil dihapus"
}
```

### 7.4 Reorder Modul

**Endpoint:** `PUT /api/v1/admin/courses/:courseId/modules/reorder`

### Request Body

```json
{
  "module_ids": ["uuid-3", "uuid-1", "uuid-2", "uuid-4"]
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Urutan modul berhasil diperbarui"
}
```

---

## 8. Get Daftar Kategori

Mengambil daftar kategori untuk dropdown.

**Endpoint:** `GET /api/v1/admin/courses/categories`

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "categories": [
      { "slug": "kebersihan", "name": "Kebersihan", "courses_count": 5 },
      { "slug": "keuangan", "name": "Keuangan", "courses_count": 3 },
      { "slug": "ibadah", "name": "Ibadah", "courses_count": 4 },
      { "slug": "manajemen", "name": "Manajemen", "courses_count": 6 },
      { "slug": "teknologi", "name": "Teknologi", "courses_count": 2 },
      { "slug": "keamanan", "name": "Keamanan", "courses_count": 4 }
    ]
  }
}
```
