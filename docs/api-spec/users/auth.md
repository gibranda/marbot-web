# API Spec — Autentikasi (Users)

> Endpoint untuk registrasi, login, verifikasi, dan logout pengguna.

**Base URL:** `/api/v1/auth`

---

## 1. Register

Mendaftarkan pengguna baru.

**Endpoint:** `POST /api/v1/auth/register`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "name": "Ahmad Fauzi",
  "email": "ahmad@email.com",
  "phone": "081234567890",
  "password": "password123",
  "password_confirmation": "password123"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| name | string | Ya | Min 3 karakter |
| email | string | Ya | Format email valid, unik |
| phone | string | Ya | Format nomor telepon Indonesia, unik |
| password | string | Ya | Min 8 karakter |
| password_confirmation | string | Ya | Harus sama dengan password |

### Response — 201 Created

```json
{
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "role": "STUDENT",
      "status": "INACTIVE",
      "created_at": "2025-01-15T10:00:00Z"
    },
    "verification": {
      "method": "email",
      "expires_at": "2025-01-15T10:10:00Z"
    }
  },
  "message": "Registrasi berhasil. Silakan verifikasi email Anda."
}
```

### Response — 422 Validation Error

```json
{
  "message": "Validasi gagal",
  "errors": {
    "email": ["Email sudah terdaftar"],
    "password": ["Password minimal 8 karakter"]
  }
}
```

**Halaman terkait:** `/register` — [Auth.tsx](../../pages/Auth.tsx)

---

## 2. Verify OTP

Verifikasi kode OTP setelah registrasi.

**Endpoint:** `POST /api/v1/auth/verify`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "email": "ahmad@email.com",
  "otp_code": "123456"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| email | string | Ya | Email yang terdaftar |
| otp_code | string | Ya | 6 digit kode OTP |

### Response — 200 OK

```json
{
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "role": "STUDENT",
      "status": "ACTIVE"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  },
  "message": "Verifikasi berhasil. Akun Anda telah aktif."
}
```

> **Catatan**: Setelah verifikasi berhasil, server langsung mengembalikan `token` + `refresh_token` agar user tidak perlu login ulang. OTP record di tabel `otp_verifications` di-set `is_used = TRUE` dan `used_at = NOW()`.

### Response — 400 Bad Request

```json
{
  "message": "Kode OTP tidak valid atau sudah kedaluwarsa"
}
```

**Halaman terkait:** `/register/verify` — [RegisterVerify.tsx](../../pages/RegisterVerify.tsx)

---

## 3. Resend OTP

Mengirim ulang kode OTP.

**Endpoint:** `POST /api/v1/auth/resend-otp`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "email": "ahmad@email.com"
}
```

### Response — 200 OK

```json
{
  "data": {
    "expires_at": "2025-01-15T10:20:00Z"
  },
  "message": "Kode OTP baru telah dikirim"
}
```

### Response — 429 Too Many Requests

```json
{
  "message": "Terlalu banyak permintaan. Coba lagi dalam 60 detik."
}
```

---

## 4. Login

Autentikasi pengguna yang sudah terdaftar.

**Endpoint:** `POST /api/v1/auth/login`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "identifier": "ahmad@email.com",
  "password": "password123"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| identifier | string | Ya | Email atau nomor telepon |
| password | string | Ya | Min 8 karakter |

### Response — 200 OK

```json
{
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "role": "STUDENT",
      "status": "ACTIVE",
      "avatar_url": "https://storage.example.com/avatars/uuid.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  },
  "message": "Login berhasil"
}
```

> **Catatan**: `refresh_token` disimpan di tabel `refresh_tokens` (hash-nya). `last_login_at` di-update pada tabel `users`.

### Response — 401 Unauthorized

```json
{
  "message": "Email/telepon atau password salah"
}
```

### Response — 403 Forbidden

```json
{
  "message": "Akun belum diverifikasi. Silakan verifikasi terlebih dahulu."
}
```

**Halaman terkait:** `/login` — [Auth.tsx](../../pages/Auth.tsx)

---

## 5. Refresh Token

Memperbarui access token menggunakan refresh token.

**Endpoint:** `POST /api/v1/auth/refresh`
**Auth:** Tidak diperlukan (menggunakan refresh_token)

### Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Response — 200 OK

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
}
```

> **Catatan**: Implementasi menggunakan **refresh token rotation** — setiap kali refresh berhasil, refresh token lama di-revoke (`revoked_at = NOW()`) dan token baru diterbitkan. Ini mencegah replay attacks.

### Response — 401 Unauthorized

```json
{
  "message": "Refresh token tidak valid atau sudah kedaluwarsa"
}
```

---

## 6. Logout

Logout dan invalidate token.

**Endpoint:** `POST /api/v1/auth/logout`
**Auth:** Bearer Token (Required)

### Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response — 200 OK

```json
{
  "message": "Logout berhasil"
}
```

> **Catatan**: Server me-revoke refresh token di tabel `refresh_tokens` (`revoked_at = NOW()`).

---

## 7. Forgot Password

Mengirim kode OTP untuk reset password ke email.

**Endpoint:** `POST /api/v1/auth/forgot-password`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "email": "ahmad@email.com"
}
```

### Response — 200 OK

```json
{
  "data": {
    "expires_at": "2025-01-15T10:10:00Z"
  },
  "message": "Kode OTP reset password telah dikirim ke email Anda"
}
```

> **Catatan**: Membuat record baru di `otp_verifications` dengan `purpose = RESET_PASSWORD`. Response selalu 200 meskipun email tidak terdaftar (untuk mencegah email enumeration).

---

## 8. Reset Password

Reset password menggunakan kode OTP dari email.

**Endpoint:** `POST /api/v1/auth/reset-password`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "email": "ahmad@email.com",
  "otp_code": "123456",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| email | string | Ya | Email yang terdaftar |
| otp_code | string | Ya | 6 digit kode OTP (purpose: RESET_PASSWORD) |
| password | string | Ya | Min 8 karakter |
| password_confirmation | string | Ya | Harus sama dengan password |

### Response — 200 OK

```json
{
  "message": "Password berhasil diubah. Silakan login dengan password baru."
}
```

> **Catatan**: Setelah berhasil, semua `refresh_tokens` user di-revoke (force logout dari semua device). OTP di-set `is_used = TRUE`.

### Response — 400 Bad Request

```json
{
  "message": "Kode OTP tidak valid atau sudah kedaluwarsa"
}
```

---

## Catatan Implementasi

### JWT Token Structure
```json
{
  "sub": "user-uuid",
  "name": "Ahmad Fauzi",
  "email": "ahmad@email.com",
  "role": "STUDENT",
  "iat": 1705312800,
  "exp": 1705399200
}
```

### Error Response Standard
Semua endpoint menggunakan format error yang konsisten:
```json
{
  "message": "Deskripsi error",
  "errors": {}
}
```

### Rate Limiting
| Endpoint | Limit |
|----------|-------|
| POST /login | 5 request/menit per IP |
| POST /register | 3 request/menit per IP |
| POST /resend-otp | 1 request/menit per email |
| POST /forgot-password | 3 request/jam per email |
