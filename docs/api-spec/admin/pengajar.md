# API Spec — Manajemen Pengajar (Admin)

> Endpoint CRUD untuk mengelola data pengajar/instruktur dan spesialisasi.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

---

## 1. List Instructors

Mengambil daftar semua pengajar untuk admin.

**Endpoint:** `GET /api/v1/admin/instructors`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman (max 50) |
| q | string | - | Pencarian berdasarkan nama |
| sort | string | `-created_at` | Sorting: `name`, `-name`, `created_at`, `-created_at`, `-total_courses`, `-total_students`, `-rating` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
      "location": "Jakarta",
      "specializations": [
        { "id": "uuid-string", "name": "Praktisi Kemasjidan" }
      ],
      "total_courses": 5,
      "total_students": 3500,
      "rating": 4.9,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "per_page": 10,
    "total_pages": 2
  },
  "links": {
    "self": "/api/v1/admin/instructors?page=1&per_page=10",
    "next": "/api/v1/admin/instructors?page=2&per_page=10",
    "last": "/api/v1/admin/instructors?page=2&per_page=10"
  }
}
```

> **Computed fields**: `total_courses`, `total_students`, `rating` dihitung via query (lihat Computed Fields di database-schema.md). `specializations` diambil via JOIN `instructor_specializations` → `specializations`.

---

## 2. Get Instructor Detail

Mengambil detail pengajar beserta daftar kursus yang diajar.

**Endpoint:** `GET /api/v1/admin/instructors/:id`

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
    "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid...",
    "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
    "location": "Jakarta",
    "specializations": [
      { "id": "uuid-string", "name": "Praktisi Kemasjidan" },
      { "id": "uuid-string", "name": "Takmir & Manajemen Masjid" }
    ],
    "total_courses": 5,
    "total_students": 3500,
    "rating": 4.9,
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "status": "PUBLISHED",
        "students_count": 1200,
        "rating": 4.8
      }
    ],
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-10T00:00:00Z"
  }
}
```

### Response — 404 Not Found

```json
{
  "error": {
    "code": "not_found",
    "message": "Pengajar tidak ditemukan"
  }
}
```

---

## 3. Create Instructor

Menambahkan pengajar baru.

**Endpoint:** `POST /api/v1/admin/instructors`
**Content-Type:** `multipart/form-data` (untuk upload avatar) atau `application/json`

### Request Body

```json
{
  "name": "Ustadz Budi Rahman",
  "bio": "Pengalaman 10 tahun sebagai takmir masjid...",
  "location": "Bandung",
  "specialization_ids": ["uuid-spec-1", "uuid-spec-2"],
  "avatar": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3, max 255 karakter |
| bio | string | Tidak | Biografi pengajar |
| location | string | Tidak | Max 255 karakter |
| specialization_ids | array | Tidak | Array UUID spesialisasi yang valid |
| avatar | file | Tidak | JPG/PNG, max 2MB |

### Response — 201 Created

**Headers:** `Location: /api/v1/admin/instructors/{id}`

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Budi Rahman",
    "specializations": [
      { "id": "uuid-spec-1", "name": "Praktisi Kemasjidan" },
      { "id": "uuid-spec-2", "name": "Takmir & Manajemen Masjid" }
    ],
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
        "field": "name",
        "message": "Nama pengajar wajib diisi",
        "code": "required"
      }
    ]
  }
}
```

---

## 4. Update Instructor

Mengupdate data pengajar.

**Endpoint:** `PATCH /api/v1/admin/instructors/:id`
**Content-Type:** `multipart/form-data` atau `application/json`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Instructor UUID |

### Request Body

Field yang tidak dikirim tidak akan diubah.

```json
{
  "name": "Ustadz Budi Rahman, M.Pd",
  "specialization_ids": ["uuid-spec-1", "uuid-spec-3"]
}
```

> **Catatan**: Jika `specialization_ids` dikirim, seluruh relasi `instructor_specializations` akan di-replace (delete all + insert new).

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Budi Rahman, M.Pd",
    "specializations": [
      { "id": "uuid-spec-1", "name": "Praktisi Kemasjidan" },
      { "id": "uuid-spec-3", "name": "Pengajar & Dai" }
    ],
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

---

## 5. Delete Instructor

Menghapus pengajar (soft delete). Tidak bisa menghapus pengajar yang masih memiliki kursus aktif (status PUBLISHED).

**Endpoint:** `DELETE /api/v1/admin/instructors/:id`

### Response — 204 No Content

_(empty body)_

### Response — 409 Conflict

```json
{
  "error": {
    "code": "has_active_courses",
    "message": "Tidak dapat menghapus pengajar yang masih memiliki kursus aktif"
  }
}
```

---

## 6. List Instructors for Select

Mengambil daftar pengajar ringkas untuk select/dropdown di form kursus.

**Endpoint:** `GET /api/v1/admin/instructors/select`

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Ustadz Ahmad Fauzi",
      "avatar_url": "https://storage.example.com/avatars/instructor-1.jpg",
      "specializations": [
        { "id": "uuid-string", "name": "Praktisi Kemasjidan" }
      ]
    },
    {
      "id": "uuid-string",
      "name": "Ustadz Budi Rahman",
      "avatar_url": null,
      "specializations": [
        { "id": "uuid-string", "name": "Takmir & Manajemen Masjid" }
      ]
    }
  ]
}
```

---

## 7. Specializations (Master Data)

### 7.1 List Specializations

**Endpoint:** `GET /api/v1/admin/specializations`

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Praktisi Kemasjidan",
      "slug": "praktisi-kemasjidan",
      "sort_order": 0,
      "instructors_count": 3
    },
    {
      "id": "uuid-string",
      "name": "Takmir & Manajemen Masjid",
      "slug": "takmir-manajemen-masjid",
      "sort_order": 1,
      "instructors_count": 2
    }
  ]
}
```

### 7.2 Create Specialization

**Endpoint:** `POST /api/v1/admin/specializations`

### Request Body

```json
{
  "name": "Pengajar & Dai",
  "sort_order": 2
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 2, max 100 karakter, UNIQUE |
| sort_order | number | Tidak | Default 0 |

### Response — 201 Created

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Pengajar & Dai",
    "slug": "pengajar-dai",
    "sort_order": 2,
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

> **Catatan**: `slug` di-generate otomatis dari `name` oleh server.

### 7.3 Update Specialization

**Endpoint:** `PATCH /api/v1/admin/specializations/:id`

### Request Body

```json
{
  "name": "Pengajar & Dai Profesional",
  "sort_order": 3
}
```

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Pengajar & Dai Profesional",
    "slug": "pengajar-dai-profesional",
    "sort_order": 3,
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 7.4 Delete Specialization

Tidak bisa menghapus spesialisasi yang masih digunakan oleh pengajar.

**Endpoint:** `DELETE /api/v1/admin/specializations/:id`

### Response — 204 No Content

_(empty body)_

### Response — 409 Conflict

```json
{
  "error": {
    "code": "has_instructors",
    "message": "Tidak dapat menghapus spesialisasi yang masih digunakan oleh pengajar"
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
