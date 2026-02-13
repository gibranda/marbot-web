# API Spec — Manajemen Pengajar (Admin)

> Endpoint CRUD untuk mengelola data pengajar/instruktur.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Daftar Pengajar

Mengambil daftar semua pengajar untuk admin.

**Endpoint:** `GET /api/v1/admin/instructors`

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| search | string | - | Pencarian berdasarkan nama |
| sort | string | `newest` | Sorting: `newest`, `name_asc`, `name_desc`, `rating`, `courses`, `students` |

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
        "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
        "rating": 4.9,
        "total_courses": 5,
        "total_students": 3500,
        "location": "Jakarta",
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 6,
      "total_pages": 1
    }
  }
}
```

**Halaman terkait:** `/admin/pengajar` — [AdminPengajar.tsx](../../src/pages/admin/AdminPengajar.tsx)

---

## 2. Get Detail Pengajar (Admin)

Mengambil detail pengajar untuk form edit.

**Endpoint:** `GET /api/v1/admin/instructors/:id`

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
    "bio": "Berpengalaman 15 tahun dalam manajemen kebersihan masjid...",
    "avatar": "https://storage.example.com/avatars/instructor-1.jpg",
    "email": "ahmad.fauzi@email.com",
    "phone": "081234567890",
    "rating": 4.9,
    "total_courses": 5,
    "total_students": 3500,
    "location": "Jakarta",
    "courses": [
      {
        "id": "uuid-string",
        "title": "Standar Operasional Kebersihan Masjid",
        "students_count": 1200,
        "status": "Published"
      }
    ],
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 3. Create Pengajar

Menambahkan pengajar baru.

**Endpoint:** `POST /api/v1/admin/instructors`
**Content-Type:** `multipart/form-data`

### Request Body

```json
{
  "name": "Ustadz Budi Rahman",
  "role": "Pakar Manajemen Masjid",
  "bio": "Pengalaman 10 tahun sebagai takmir masjid...",
  "email": "budi.rahman@email.com",
  "phone": "081298765432",
  "location": "Bandung",
  "avatar": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3 karakter |
| role | string | Ya | Jabatan/spesialisasi |
| bio | string | Ya | Min 20 karakter |
| email | string | Tidak | Format email valid |
| phone | string | Tidak | Format telepon valid |
| location | string | Tidak | Max 100 karakter |
| avatar | file | Tidak | JPG/PNG, max 2MB |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Pengajar berhasil ditambahkan",
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Budi Rahman",
    "role": "Pakar Manajemen Masjid",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/pengajar/baru` — [AdminAddInstructor.tsx](../../src/pages/admin/AdminAddInstructor.tsx)

---

## 4. Update Pengajar

Mengupdate data pengajar.

**Endpoint:** `PUT /api/v1/admin/instructors/:id`
**Content-Type:** `multipart/form-data`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Instructor UUID |

### Request Body

Sama dengan Create Pengajar. Field yang tidak dikirim tidak akan diubah.

### Response — 200 OK

```json
{
  "success": true,
  "message": "Data pengajar berhasil diperbarui",
  "data": {
    "id": "uuid-string",
    "name": "Ustadz Budi Rahman, M.Pd",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

**Halaman terkait:** `/admin/pengajar/:id/edit` — [AdminEditInstructor.tsx](../../src/pages/admin/AdminEditInstructor.tsx)

---

## 5. Delete Pengajar

Menghapus pengajar (soft delete).

**Endpoint:** `DELETE /api/v1/admin/instructors/:id`

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Instructor UUID |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengajar berhasil dihapus"
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Tidak dapat menghapus pengajar yang masih memiliki kursus aktif"
}
```

---

## 6. Get Pengajar untuk Dropdown

Mengambil daftar pengajar ringkas untuk select/dropdown di form kursus.

**Endpoint:** `GET /api/v1/admin/instructors/select`

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "instructors": [
      {
        "id": "uuid-string",
        "name": "Ustadz Ahmad Fauzi",
        "role": "Pakar Kebersihan Masjid"
      },
      {
        "id": "uuid-string",
        "name": "Ustadz Budi Rahman",
        "role": "Pakar Manajemen Masjid"
      }
    ]
  }
}
```
