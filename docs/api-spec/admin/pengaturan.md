# API Spec — Pengaturan Platform (Admin)

> Endpoint untuk mengelola pengaturan dan konfigurasi platform.

**Base URL:** `/api/v1/admin`
**Auth:** Bearer Token (Required, role: admin) — berlaku untuk semua endpoint di file ini.

---

## 1. Get Pengaturan Umum

Mengambil pengaturan umum platform.

**Endpoint:** `GET /api/v1/admin/settings/general`

### Response — 200 OK

```json
{
  "success": true,
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

**Halaman terkait:** `/admin/pengaturan` — [AdminPengaturan.tsx](../../src/pages/admin/AdminPengaturan.tsx)

---

## 2. Update Pengaturan Umum

Mengubah pengaturan umum platform.

**Endpoint:** `PUT /api/v1/admin/settings/general`
**Content-Type:** `multipart/form-data`

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
| social_media | object | Tidak | Objek social media links |
| site_logo | file | Tidak | PNG/SVG, max 1MB |
| site_favicon | file | Tidak | ICO/PNG, max 500KB |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengaturan umum berhasil diperbarui"
}
```

---

## 3. Get Pengaturan Pembayaran

Mengambil konfigurasi payment gateway.

**Endpoint:** `GET /api/v1/admin/settings/payment`

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "payment_gateway": "midtrans",
    "is_sandbox": true,
    "enabled_methods": ["bank_transfer", "e_wallet", "qris"],
    "bank_transfer_channels": ["bsi", "bni", "bri", "mandiri"],
    "e_wallet_channels": ["gopay", "shopeepay", "dana"],
    "auto_expire_hours": 24,
    "notification_url": "https://api.marbot.id/api/v1/payments/notification"
  }
}
```

---

## 4. Update Pengaturan Pembayaran

Mengubah konfigurasi payment gateway.

**Endpoint:** `PUT /api/v1/admin/settings/payment`

### Request Body

```json
{
  "payment_gateway": "midtrans",
  "is_sandbox": false,
  "server_key": "SB-Mid-server-xxx",
  "client_key": "SB-Mid-client-xxx",
  "enabled_methods": ["bank_transfer", "e_wallet", "qris"],
  "auto_expire_hours": 24
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| payment_gateway | string | Ya | `midtrans`, `xendit` |
| is_sandbox | boolean | Ya | Mode sandbox/production |
| server_key | string | Ya | Server key payment gateway |
| client_key | string | Ya | Client key payment gateway |
| enabled_methods | array | Ya | Array metode pembayaran yang aktif |
| auto_expire_hours | number | Tidak | Jam kedaluwarsa pembayaran (default 24) |

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengaturan pembayaran berhasil diperbarui"
}
```

---

## 5. Get Pengaturan Email

Mengambil konfigurasi email/SMTP.

**Endpoint:** `GET /api/v1/admin/settings/email`

### Response — 200 OK

```json
{
  "success": true,
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

---

## 6. Update Pengaturan Email

Mengubah konfigurasi email.

**Endpoint:** `PUT /api/v1/admin/settings/email`

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

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengaturan email berhasil diperbarui"
}
```

---

## 7. Test Email Configuration

Mengirim email test untuk memverifikasi konfigurasi.

**Endpoint:** `POST /api/v1/admin/settings/email/test`

### Request Body

```json
{
  "to_email": "admin@marbot.id"
}
```

### Response — 200 OK

```json
{
  "success": true,
  "message": "Email test berhasil dikirim ke admin@marbot.id"
}
```

### Response — 500 Internal Server Error

```json
{
  "success": false,
  "message": "Gagal mengirim email. Periksa konfigurasi SMTP Anda."
}
```

---

## 8. Get Pengaturan Sertifikat

Mengambil konfigurasi template sertifikat.

**Endpoint:** `GET /api/v1/admin/settings/certificate`

### Response — 200 OK

```json
{
  "success": true,
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

## 9. Update Pengaturan Sertifikat

Mengubah konfigurasi template sertifikat.

**Endpoint:** `PUT /api/v1/admin/settings/certificate`
**Content-Type:** `multipart/form-data`

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

### Response — 200 OK

```json
{
  "success": true,
  "message": "Pengaturan sertifikat berhasil diperbarui"
}
```
