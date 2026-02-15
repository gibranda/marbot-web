# API Spec — Pengaturan Platform (Admin)

> Endpoint untuk mengelola pengaturan dan konfigurasi platform.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: ADMIN) — berlaku untuk semua endpoint di file ini.

> **Catatan**: Pengaturan platform disimpan di tabel konfigurasi terpisah (key-value store) atau environment variables, bukan di 22 tabel utama database schema. Endpoint ini mengelola konfigurasi operasional platform.

---

## 1. Get General Settings

Mengambil pengaturan umum platform.

**Endpoint:** `GET /api/v1/admin/settings/general`

### Response — 200 OK

```json
{
  "data": {
    "site_name": "Marbot LMS",
    "site_description": "Platform pembelajaran online untuk pengelola masjid",
    "site_logo": "https://storage.example.com/settings/logo.png",
    "site_favicon": "https://storage.example.com/settings/favicon.ico",
    "contact_email": "info@marbot.id",
    "contact_phone": "081234567890",
    "contact_address": "Jakarta, Indonesia",
    "social_media": {
      "instagram": "https://instagram.com/marbotlms",
      "youtube": "https://youtube.com/@marbotlms",
      "whatsapp": "081234567890"
    },
    "footer_text": "2025 Marbot LMS. All rights reserved."
  }
}
```

---

## 2. Update General Settings

Mengubah pengaturan umum platform.

**Endpoint:** `PATCH /api/v1/admin/settings/general`
**Content-Type:** `multipart/form-data` (untuk upload logo/favicon) atau `application/json`

### Request Body

```json
{
  "site_name": "Marbot LMS",
  "site_description": "Platform pembelajaran online untuk pengelola masjid",
  "contact_email": "info@marbot.id",
  "contact_phone": "081234567890",
  "contact_address": "Jakarta, Indonesia",
  "social_media": {
    "instagram": "https://instagram.com/marbotlms",
    "youtube": "https://youtube.com/@marbotlms",
    "whatsapp": "081234567890"
  },
  "site_logo": "<file>",
  "site_favicon": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| site_name | string | Tidak | Max 100 karakter |
| site_description | string | Tidak | Max 500 karakter |
| contact_email | string | Tidak | Format email valid |
| contact_phone | string | Tidak | Format telepon valid |
| contact_address | string | Tidak | Max 200 karakter |
| social_media | object | Tidak | Object berisi key-value social media links |
| footer_text | string | Tidak | Max 200 karakter |
| site_logo | file | Tidak | PNG/SVG, max 1MB |
| site_favicon | file | Tidak | ICO/PNG, max 500KB |

### Response — 200 OK

```json
{
  "data": {
    "message": "Pengaturan umum berhasil diperbarui",
    "updated_at": "2025-01-15T10:00:00Z"
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
        "field": "contact_email",
        "message": "Format email tidak valid",
        "code": "invalid_format"
      }
    ]
  }
}
```

---

## 3. Get Payment Settings

Mengambil konfigurasi payment gateway.

**Endpoint:** `GET /api/v1/admin/settings/payment`

### Response — 200 OK

```json
{
  "data": {
    "payment_gateway": "midtrans",
    "is_sandbox": true,
    "enabled_methods": ["BANK_TRANSFER", "E_WALLET", "QRIS", "VIRTUAL_ACCOUNT"],
    "bank_transfer_channels": ["bsi", "bni", "bri", "mandiri"],
    "e_wallet_channels": ["gopay", "shopeepay", "dana"],
    "auto_expire_hours": 24,
    "notification_url": "https://api.marbot.id/api/v1/payments/notification"
  }
}
```

> **Catatan**: `enabled_methods` menggunakan enum `PaymentMethod` dari database schema. `server_key` tidak ditampilkan di response GET untuk keamanan.

---

## 4. Update Payment Settings

Mengubah konfigurasi payment gateway.

**Endpoint:** `PATCH /api/v1/admin/settings/payment`

### Request Body

```json
{
  "payment_gateway": "midtrans",
  "is_sandbox": false,
  "server_key": "Mid-server-xxx",
  "client_key": "Mid-client-xxx",
  "enabled_methods": ["BANK_TRANSFER", "E_WALLET", "QRIS"],
  "auto_expire_hours": 24
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| payment_gateway | string | Tidak | `midtrans`, `xendit` |
| is_sandbox | boolean | Tidak | Mode sandbox/production |
| server_key | string | Tidak | Server key payment gateway |
| client_key | string | Tidak | Client key payment gateway |
| enabled_methods | array | Tidak | Array dari `BANK_TRANSFER`, `E_WALLET`, `QRIS`, `VIRTUAL_ACCOUNT` |
| auto_expire_hours | number | Tidak | Jam kedaluwarsa pembayaran, min 1, max 72 |

### Response — 200 OK

```json
{
  "data": {
    "message": "Pengaturan pembayaran berhasil diperbarui",
    "updated_at": "2025-01-15T10:00:00Z"
  }
}
```

---

## 5. Get Email Settings

Mengambil konfigurasi email/SMTP.

**Endpoint:** `GET /api/v1/admin/settings/email`

### Response — 200 OK

```json
{
  "data": {
    "smtp_host": "smtp.gmail.com",
    "smtp_port": 587,
    "smtp_username": "noreply@marbot.id",
    "smtp_encryption": "tls",
    "from_name": "Marbot LMS",
    "from_email": "noreply@marbot.id",
    "templates": {
      "welcome": true,
      "enrollment_confirmation": true,
      "payment_confirmation": true,
      "certificate_issued": true,
      "agenda_reminder": true
    }
  }
}
```

> **Catatan**: `smtp_password` tidak ditampilkan di response GET untuk keamanan.

---

## 6. Update Email Settings

Mengubah konfigurasi email.

**Endpoint:** `PATCH /api/v1/admin/settings/email`

### Request Body

```json
{
  "smtp_host": "smtp.gmail.com",
  "smtp_port": 587,
  "smtp_username": "noreply@marbot.id",
  "smtp_password": "app-password-here",
  "smtp_encryption": "tls",
  "from_name": "Marbot LMS",
  "from_email": "noreply@marbot.id"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| smtp_host | string | Tidak | Hostname SMTP server |
| smtp_port | number | Tidak | Port SMTP (25, 465, 587) |
| smtp_username | string | Tidak | Username SMTP |
| smtp_password | string | Tidak | Password SMTP (hanya dikirim saat update) |
| smtp_encryption | string | Tidak | `tls`, `ssl`, `none` |
| from_name | string | Tidak | Nama pengirim. Max 100 karakter |
| from_email | string | Tidak | Email pengirim. Format email valid |

### Response — 200 OK

```json
{
  "data": {
    "message": "Pengaturan email berhasil diperbarui",
    "updated_at": "2025-01-15T10:00:00Z"
  }
}
```

---

## 7. Test Email Configuration

Mengirim email test untuk memverifikasi konfigurasi SMTP.

**Endpoint:** `POST /api/v1/admin/settings/email/test`

### Request Body

```json
{
  "to_email": "admin@marbot.id"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| to_email | string | Ya | Format email valid |

### Response — 200 OK

```json
{
  "data": {
    "message": "Email test berhasil dikirim ke admin@marbot.id"
  }
}
```

### Response — 422 Unprocessable Entity

```json
{
  "error": {
    "code": "smtp_error",
    "message": "Gagal mengirim email. Periksa konfigurasi SMTP Anda."
  }
}
```

---

## 8. Get Certificate Settings

Mengambil konfigurasi template sertifikat.

**Endpoint:** `GET /api/v1/admin/settings/certificate`

### Response — 200 OK

```json
{
  "data": {
    "template": "default",
    "prefix": "MARBOT",
    "numbering_format": "MARBOT-{YEAR}-{SEQ}",
    "signatory_name": "Dr. H. Ahmad Hidayat, M.Pd",
    "signatory_title": "Direktur Marbot LMS",
    "signature_image": "https://storage.example.com/settings/signature.png",
    "logo_on_certificate": "https://storage.example.com/settings/cert-logo.png"
  }
}
```

---

## 9. Update Certificate Settings

Mengubah konfigurasi template sertifikat.

**Endpoint:** `PATCH /api/v1/admin/settings/certificate`
**Content-Type:** `multipart/form-data` (untuk upload signature/logo) atau `application/json`

### Request Body

```json
{
  "prefix": "MARBOT",
  "signatory_name": "Dr. H. Ahmad Hidayat, M.Pd",
  "signatory_title": "Direktur Marbot LMS",
  "signature_image": "<file>",
  "logo_on_certificate": "<file>"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| prefix | string | Tidak | Max 20 karakter, huruf kapital |
| signatory_name | string | Tidak | Max 100 karakter |
| signatory_title | string | Tidak | Max 100 karakter |
| signature_image | file | Tidak | PNG, max 500KB |
| logo_on_certificate | file | Tidak | PNG, max 1MB |

### Response — 200 OK

```json
{
  "data": {
    "message": "Pengaturan sertifikat berhasil diperbarui",
    "updated_at": "2025-01-15T10:00:00Z"
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
