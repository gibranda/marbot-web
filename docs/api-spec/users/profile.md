# API Spec — Profil & Dashboard (Users)

> Endpoint untuk dashboard user, profil, dan pengaturan akun.

**Base URL:** `/api/v1/me`

---

## 1. Get Dashboard Overview

Mengambil ringkasan data dashboard user.

**Endpoint:** `GET /api/v1/me/dashboard`
**Auth:** Bearer Token (Required, role: student)

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "stats": {
      "active_courses": 3,
      "completed_courses": 2,
      "certificates_earned": 2,
      "upcoming_agenda": 1
    },
    "recent_courses": [
      {
        "id": "uuid-string",
        "course": {
          "id": "uuid-string",
          "title": "Standar Operasional Kebersihan Masjid",
          "thumbnail": "https://storage.example.com/courses/thumb-1.jpg"
        },
        "progress": 45,
        "last_accessed": "2025-01-14T08:30:00Z"
      }
    ],
    "upcoming_agenda": [
      {
        "id": "uuid-string",
        "title": "Workshop Manajemen Keuangan Masjid",
        "date": "2025-02-15",
        "time": "09:00",
        "type": "Online"
      }
    ]
  }
}
```

**Halaman terkait:** `/akun` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 2. Get Profil User

Mengambil data profil user.

**Endpoint:** `GET /api/v1/me/profile`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi",
    "email": "ahmad@email.com",
    "phone": "081234567890",
    "avatar": "https://storage.example.com/avatars/user-1.jpg",
    "institution": "Masjid Al-Ikhlas",
    "bio": "Marbot masjid yang ingin meningkatkan kompetensi",
    "location": "Jakarta Selatan",
    "role": "student",
    "status": "active",
    "joined_at": "2025-01-01T00:00:00Z"
  }
}
```

**Halaman terkait:** `/akun/profil` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 3. Update Profil User

Mengubah data profil user.

**Endpoint:** `PUT /api/v1/me/profile`
**Auth:** Bearer Token (Required)

### Request Body

```json
{
  "name": "Ahmad Fauzi, S.Pd",
  "phone": "081234567891",
  "institution": "Masjid Al-Ikhlas Jakarta",
  "bio": "Marbot masjid berpengalaman 5 tahun",
  "location": "Jakarta Selatan"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Tidak | Min 3 karakter |
| phone | string | Tidak | Format telepon valid |
| institution | string | Tidak | Max 100 karakter |
| bio | string | Tidak | Max 500 karakter |
| location | string | Tidak | Max 100 karakter |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi, S.Pd",
    "email": "ahmad@email.com",
    "phone": "081234567891",
    "avatar": "https://storage.example.com/avatars/user-1.jpg",
    "institution": "Masjid Al-Ikhlas Jakarta",
    "bio": "Marbot masjid berpengalaman 5 tahun",
    "location": "Jakarta Selatan"
  }
}
```

---

## 4. Upload Avatar

Mengunggah foto profil user.

**Endpoint:** `POST /api/v1/me/avatar`
**Auth:** Bearer Token (Required)
**Content-Type:** `multipart/form-data`

### Request Body

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| avatar | file | Ya | JPG/PNG, max 2MB, min 100x100px |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Foto profil berhasil diperbarui",
  "data": {
    "avatar": "https://storage.example.com/avatars/user-1-new.jpg"
  }
}
```

### Response — 422 Validation Error

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "avatar": ["Ukuran file maksimal 2MB"]
  }
}
```

---

## 5. Update Password

Mengubah password user.

**Endpoint:** `PUT /api/v1/me/password`
**Auth:** Bearer Token (Required)

### Request Body

```json
{
  "current_password": "password123",
  "new_password": "newpassword456",
  "new_password_confirmation": "newpassword456"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| current_password | string | Ya | Password saat ini |
| new_password | string | Ya | Min 8 karakter |
| new_password_confirmation | string | Ya | Harus sama dengan new_password |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Password saat ini tidak sesuai"
}
```

**Halaman terkait:** `/akun/pengaturan` — [UserDashboard.tsx](../../src/pages/user/UserDashboard.tsx)

---

## 6. Get Pengaturan Notifikasi

Mengambil preferensi notifikasi user.

**Endpoint:** `GET /api/v1/me/settings/notifications`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "email_notifications": true,
    "course_updates": true,
    "agenda_reminders": true,
    "promotional": false
  }
}
```

---

## 7. Update Pengaturan Notifikasi

Mengubah preferensi notifikasi.

**Endpoint:** `PUT /api/v1/me/settings/notifications`
**Auth:** Bearer Token (Required)

### Request Body

```json
{
  "email_notifications": true,
  "course_updates": true,
  "agenda_reminders": true,
  "promotional": false
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengaturan notifikasi berhasil diperbarui"
}
```

---

## 8. Delete Account

Menghapus akun user (soft delete).

**Endpoint:** `DELETE /api/v1/me/account`
**Auth:** Bearer Token (Required)

### Request Body

```json
{
  "password": "password123",
  "reason": "Tidak membutuhkan layanan lagi"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| password | string | Ya | Password saat ini untuk konfirmasi |
| reason | string | Tidak | Alasan penghapusan akun |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Akun berhasil dihapus. Data Anda akan dihapus permanen dalam 30 hari."
}
```
