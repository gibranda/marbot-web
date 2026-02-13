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
  "success": true,
  "message": "Registrasi berhasil. Silakan verifikasi email/telepon Anda.",
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "role": "student",
      "created_at": "2025-01-15T10:00:00Z"
    },
    "verification": {
      "method": "email",
      "expires_at": "2025-01-15T10:10:00Z"
    }
  }
}
```

### Response — 422 Validation Error

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "email": ["Email sudah terdaftar"],
    "password": ["Password minimal 8 karakter"]
  }
}
```

**Halaman terkait:** `/register` — [Auth.tsx](../../src/pages/Auth.tsx)

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
  "success": true,
  "message": "Verifikasi berhasil. Akun Anda telah aktif.",
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "role": "student",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Kode OTP tidak valid atau sudah kedaluwarsa"
}
```

**Halaman terkait:** `/register/verify` — [RegisterVerify.tsx](../../src/pages/RegisterVerify.tsx)

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
  "success": true,
  "message": "Kode OTP baru telah dikirim",
  "data": {
    "expires_at": "2025-01-15T10:20:00Z"
  }
}
```

### Response — 429 Too Many Requests

```json
{
  "success": false,
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
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": "uuid-string",
      "name": "Ahmad Fauzi",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "role": "student",
      "avatar": "https://storage.example.com/avatars/uuid.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
}
```

### Response — 401 Unauthorized

```json
{
  "success": false,
  "message": "Email/telepon atau password salah"
}
```

### Response — 403 Forbidden

```json
{
  "success": false,
  "message": "Akun belum diverifikasi. Silakan verifikasi terlebih dahulu."
}
```

**Halaman terkait:** `/login` — [Auth.tsx](../../src/pages/Auth.tsx)

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
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
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
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 7. Forgot Password

Mengirim link reset password.

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
  "success": true,
  "message": "Link reset password telah dikirim ke email Anda"
}
```

---

## 8. Reset Password

Reset password menggunakan token dari email.

**Endpoint:** `POST /api/v1/auth/reset-password`
**Auth:** Tidak diperlukan

### Request Body

```json
{
  "token": "reset-token-string",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Password berhasil diubah. Silakan login dengan password baru."
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
  "role": "student",
  "iat": 1705312800,
  "exp": 1705399200
}
```

### Error Response Standard
Semua endpoint menggunakan format error yang konsisten:
```json
{
  "success": false,
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
