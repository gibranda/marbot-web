# API Spec — Checkout & Pembayaran (Users)

> Endpoint untuk proses checkout kursus berbayar dan pembayaran.

**Base URL:** `/api/v1`

---

## 1. Create Order (Checkout Kursus)

Membuat order pembayaran untuk kursus berbayar.

**Endpoint:** `POST /api/v1/courses/:id/checkout`
**Auth:** Bearer Token (Required, role: STUDENT)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Request Body

```json
{
  "payment_method": "BANK_TRANSFER",
  "coupon_code": "MARBOT2025"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| payment_method | string | Ya | `BANK_TRANSFER`, `E_WALLET`, `QRIS`, `VIRTUAL_ACCOUNT` |
| coupon_code | string | Tidak | Kode kupon diskon (dari tabel `coupons`) |

### Response — 201 Created

```json
{
  "data": {
    "order": {
      "id": "uuid-string",
      "invoice_number": "INV-CRS-2025-0042",
      "course": {
        "id": "uuid-string",
        "title": "Manajemen Keuangan Masjid",
        "thumbnail_url": "https://storage.example.com/courses/thumb-2.jpg",
        "instructor": {
          "name": "Ustadz Dr. H. Muhammad Ridwan"
        }
      },
      "original_amount": 250000,
      "discount": 50000,
      "amount": 200000,
      "payment_method": "BANK_TRANSFER",
      "payment_details": {
        "bank_name": "Bank Syariah Indonesia",
        "account_number": "1234567890",
        "account_name": "Marbot LMS",
        "va_number": "8801234567890"
      },
      "status": "PENDING",
      "created_at": "2025-01-15T10:00:00Z",
      "expires_at": "2025-01-16T10:00:00Z"
    }
  },
  "message": "Order berhasil dibuat. Silakan selesaikan pembayaran."
}
```

> **Catatan**: Membuat record di `transactions` dengan `course_id` terisi, `agenda_id` NULL. Jika `coupon_code` diberikan, validasi kupon lalu simpan `coupon_id`, `original_amount`, `discount`, dan `amount = original_amount - discount`. `coupon.used_count` di-increment secara atomic.

### Response — 400 Bad Request

```json
{
  "message": "Anda sudah memiliki akses ke kursus ini"
}
```

**Halaman terkait:** `/checkout/:id` — [Checkout.tsx](../../pages/Checkout.tsx)

---

## 2. Get Order Detail

Mengambil detail order/transaksi.

**Endpoint:** `GET /api/v1/orders/:id`
**Auth:** Bearer Token (Required)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Order/Transaction UUID |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "invoice_number": "INV-CRS-2025-0042",
    "type": "course",
    "item": {
      "id": "uuid-string",
      "title": "Manajemen Keuangan Masjid",
      "thumbnail_url": "https://storage.example.com/courses/thumb-2.jpg"
    },
    "original_amount": 250000,
    "discount": 50000,
    "amount": 200000,
    "payment_method": "BANK_TRANSFER",
    "payment_details": {
      "bank_name": "Bank Syariah Indonesia",
      "va_number": "8801234567890"
    },
    "status": "PENDING",
    "created_at": "2025-01-15T10:00:00Z",
    "expires_at": "2025-01-16T10:00:00Z",
    "paid_at": null
  }
}
```

> **Catatan**: `type` ditentukan dari `course_id IS NOT NULL` → "course", `agenda_id IS NOT NULL` → "agenda".

---

## 3. Get Riwayat Transaksi User

Mengambil riwayat transaksi user.

**Endpoint:** `GET /api/v1/me/transactions`
**Auth:** Bearer Token (Required)

### Query Parameters

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| page | number | 1 | Nomor halaman |
| per_page | number | 10 | Jumlah per halaman |
| status | string | - | Filter: `PENDING`, `SUCCESS`, `FAILED`, `EXPIRED`, `REFUNDED` |
| type | string | - | Filter: `course`, `agenda` |

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "uuid-string",
      "invoice_number": "INV-CRS-2025-0042",
      "type": "course",
      "item_title": "Manajemen Keuangan Masjid",
      "amount": 200000,
      "amount_display": "Rp 200.000",
      "payment_method": "BANK_TRANSFER",
      "status": "SUCCESS",
      "created_at": "2025-01-15T10:00:00Z",
      "paid_at": "2025-01-15T10:15:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 5,
    "total_pages": 1
  }
}
```

---

## 4. Validate Coupon

Memvalidasi kode kupon.

**Endpoint:** `POST /api/v1/coupons/validate`
**Auth:** Bearer Token (Required)

### Request Body

```json
{
  "code": "MARBOT2025",
  "course_id": "uuid-string"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| code | string | Ya | Kode kupon |
| course_id | string | Ya | Course UUID yang akan dibeli |

### Response — 200 OK

```json
{
  "data": {
    "id": "uuid-string",
    "code": "MARBOT2025",
    "discount_type": "PERCENTAGE",
    "discount_value": 20,
    "discount_amount": 50000,
    "original_price": 250000,
    "final_price": 200000,
    "valid_until": "2025-03-31T23:59:59Z"
  }
}
```

> **Catatan**: Validasi server-side: `is_active = TRUE`, `NOW() BETWEEN valid_from AND valid_until`, `used_count < max_uses` (jika max_uses NOT NULL), `course.price >= min_purchase` (jika min_purchase NOT NULL). Untuk `PERCENTAGE`: `discount_amount = MIN(course.price * discount_value / 100, max_discount)`. Untuk `FIXED`: `discount_amount = discount_value`.

### Response — 400 Bad Request

```json
{
  "message": "Kode kupon tidak valid atau sudah kedaluwarsa"
}
```

---

## 5. Payment Notification (Webhook)

Callback dari payment gateway setelah pembayaran selesai.

**Endpoint:** `POST /api/v1/payments/notification`
**Auth:** Payment Gateway Signature

> **Catatan:** Endpoint ini dipanggil oleh payment gateway, bukan oleh frontend. Frontend akan melakukan polling atau menggunakan WebSocket untuk mendapatkan update status pembayaran.

### Request Body (dari Payment Gateway)

```json
{
  "order_id": "INV-CRS-2025-0042",
  "transaction_status": "settlement",
  "payment_type": "bank_transfer",
  "gross_amount": "200000.00",
  "signature_key": "hash-signature-string"
}
```

### Response — 200 OK

```json
{
  "message": "OK"
}
```

> **Catatan**: Setelah menerima callback: 1) Verifikasi signature. 2) Update `transactions.status = SUCCESS`, `paid_at = NOW()`. 3) Jika course: buat `enrollment` (status ACTIVE). 4) Jika agenda: update `agenda_registrations.status = CONFIRMED`, `confirmed_at = NOW()`. 5) Kirim notifikasi ke user.

---

## 6. Check Payment Status

Mengecek status pembayaran order (untuk polling dari frontend).

**Endpoint:** `GET /api/v1/orders/:id/status`
**Auth:** Bearer Token (Required)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Order/Transaction UUID |

### Response — 200 OK

```json
{
  "data": {
    "order_id": "uuid-string",
    "invoice_number": "INV-CRS-2025-0042",
    "status": "SUCCESS",
    "paid_at": "2025-01-15T10:15:00Z"
  }
}
```

**Halaman terkait:** `/checkout/:id/sukses` — [CheckoutSuccess.tsx](../../pages/CheckoutSuccess.tsx)

---

## 7. Get Available Payment Methods

Mengambil daftar metode pembayaran yang tersedia.

**Endpoint:** `GET /api/v1/payment-methods`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "data": [
    {
      "id": "BANK_TRANSFER",
      "name": "Transfer Bank",
      "description": "Transfer melalui Virtual Account",
      "icon": "bank",
      "channels": [
        {
          "id": "bsi",
          "name": "Bank Syariah Indonesia",
          "icon_url": "https://storage.example.com/payment/bsi.png"
        },
        {
          "id": "bni",
          "name": "Bank BNI",
          "icon_url": "https://storage.example.com/payment/bni.png"
        }
      ]
    },
    {
      "id": "E_WALLET",
      "name": "E-Wallet",
      "description": "Pembayaran melalui dompet digital",
      "icon": "wallet",
      "channels": [
        {
          "id": "gopay",
          "name": "GoPay",
          "icon_url": "https://storage.example.com/payment/gopay.png"
        },
        {
          "id": "shopeepay",
          "name": "ShopeePay",
          "icon_url": "https://storage.example.com/payment/shopeepay.png"
        }
      ]
    },
    {
      "id": "QRIS",
      "name": "QRIS",
      "description": "Scan QR Code untuk pembayaran",
      "icon": "qr-code"
    }
  ]
}
```

> **Catatan**: Data payment methods bersifat statis, bisa di-cache. `id` sesuai dengan enum `PaymentMethod` di database.
