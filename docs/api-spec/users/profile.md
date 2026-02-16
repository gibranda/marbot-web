# API Spec — Profil & Dashboard (Users)

> Endpoint untuk dashboard user, profil, dan pengaturan akun.

**Base URL:** `/api/v1/me`

---

## 1. Get Dashboard Overview

Mengambil ringkasan data dashboard user.

**Endpoint:** `GET /api/v1/me/dashboard`
**Auth:** Bearer Token (Required, role: STUDENT)

### Response — 200 OK

```json
{
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
          "thumbnail_url": "https://storage.example.com/courses/thumb-1.jpg"
        },
        "progress": 45,
        "last_accessed_at": "2025-01-14T08:30:00Z"
      }
    ],
    "upcoming_agenda": [
      {
        "id": "uuid-string",
        "title": "Workshop Manajemen Keuangan Masjid",
        "date": "2025-02-15",
        "start_time": "09:00",
        "type": "ONLINE"
      }
    ]
  }
}
```

**Halaman terkait:** `/akun` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

---

## 2. Get Profil User

Mengambil data profil user.

**Endpoint:** `GET /api/v1/me/profile`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi",
    "email": "ahmad@email.com",
    "phone": "081234567890",
    "avatar_url": "https://storage.example.com/avatars/user-1.jpg",
    "institution": "Masjid Al-Ikhlas",
    "bio": "Marbot masjid yang ingin meningkatkan kompetensi",
    "location": "Jakarta Selatan",
    "role": "STUDENT",
    "status": "ACTIVE",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**Halaman terkait:** `/akun/profil` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

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
| institution | string | Tidak | Max 255 karakter |
| bio | string | Tidak | Max 500 karakter |
| location | string | Tidak | Max 255 karakter |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "name": "Ahmad Fauzi, S.Pd",
    "email": "ahmad@email.com",
    "phone": "081234567891",
    "avatar_url": "https://storage.example.com/avatars/user-1.jpg",
    "institution": "Masjid Al-Ikhlas Jakarta",
    "bio": "Marbot masjid berpengalaman 5 tahun",
    "location": "Jakarta Selatan",
    "role": "STUDENT",
    "status": "ACTIVE"
  },
  "message": "Profil berhasil diperbarui"
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
  "data": {
    "avatar_url": "https://storage.example.com/avatars/user-1-new.jpg"
  },
  "message": "Foto profil berhasil diperbarui"
}
```

### Response — 422 Validation Error

```json
{
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
  "message": "Password berhasil diubah"
}
```

### Response — 400 Bad Request

```json
{
  "message": "Password saat ini tidak sesuai"
}
```

**Halaman terkait:** `/akun/pengaturan` — [UserDashboard.tsx](../../pages/UserDashboard.tsx)

---

## 6. Get Pengaturan Notifikasi

Mengambil preferensi notifikasi user.

**Endpoint:** `GET /api/v1/me/settings/notifications`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "data": {
    "email_notifications": true,
    "course_updates": true,
    "agenda_reminders": true,
    "promotional": false
  }
}
```

> **Catatan**: Jika record belum ada di tabel `notification_preferences`, return default (semua TRUE). Row dibuat secara lazy saat user pertama kali update.

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

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| email_notifications | boolean | Tidak | Default: true |
| course_updates | boolean | Tidak | Default: true |
| agenda_reminders | boolean | Tidak | Default: true |
| promotional | boolean | Tidak | Default: true |

### Response — 200 OK

```json
{
  "data": {
    "email_notifications": true,
    "course_updates": true,
    "agenda_reminders": true,
    "promotional": false
  },
  "message": "Pengaturan notifikasi berhasil diperbarui"
}
```

> **Catatan**: Menggunakan UPSERT — jika record belum ada di `notification_preferences`, buat baru; jika sudah ada, update.

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
  "message": "Akun berhasil dihapus. Data Anda akan dihapus permanen dalam 30 hari."
}
```

> **Catatan**: Soft delete — set `users.deleted_at = NOW()`. Semua refresh tokens di-revoke. Akun bisa di-restore dalam 30 hari oleh admin. Setelah 30 hari, cron job menghapus data secara permanen.
