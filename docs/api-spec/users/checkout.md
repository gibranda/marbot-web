# API Spec — Checkout & Pembayaran (Users)

> Endpoint untuk proses checkout kursus berbayar dan pembayaran.

**Base URL:** `/api/v1`

---

## 1. Create Order (Checkout Kursus)

Membuat order pembayaran untuk kursus berbayar.

**Endpoint:** `POST /api/v1/courses/:id/checkout`
**Auth:** Bearer Token (Required, role: student)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Course UUID |

### Request Body

```json
{
  "payment_method": "bank_transfer",
  "coupon_code": "MARBOT2025"
}
```

| Field | Type | Required | Validasi |
|-------|------|----------|----------|
| payment_method | string | Ya | `bank_transfer`, `e_wallet`, `qris` |
| coupon_code | string | Tidak | Kode kupon diskon |

### Response — 201 Created

```json
{
  "success": true,
  "message": "Order berhasil dibuat. Silakan selesaikan pembayaran.",
  "data": {
    "order": {
      "id": "uuid-string",
      "invoice": "INV-CRS-2025-0042",
      "course": {
        "id": "uuid-string",
        "title": "Manajemen Keuangan Masjid",
        "thumbnail": "https://storage.example.com/courses/thumb-2.jpg",
        "instructor": {
          "name": "Ustadz Dr. H. Muhammad Ridwan"
        }
      },
      "original_amount": 250000,
      "discount": 50000,
      "total_amount": 200000,
      "payment_method": "bank_transfer",
      "payment_details": {
        "bank_name": "Bank Syariah Indonesia",
        "account_number": "1234567890",
        "account_name": "Marbot LMS",
        "va_number": "8801234567890"
      },
      "status": "pending",
      "created_at": "2025-01-15T10:00:00Z",
      "expires_at": "2025-01-16T10:00:00Z"
    }
  }
}
```

### Response — 400 Bad Request

```json
{
  "success": false,
  "message": "Anda sudah memiliki akses ke kursus ini"
}
```

**Halaman terkait:** `/checkout/:id` — [Checkout.tsx](../../src/pages/Checkout.tsx)

---

## 2. Get Order Detail

Mengambil detail order/transaksi.

**Endpoint:** `GET /api/v1/orders/:id`
**Auth:** Bearer Token (Required)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Order UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "invoice": "INV-CRS-2025-0042",
    "type": "course",
    "item": {
      "id": "uuid-string",
      "title": "Manajemen Keuangan Masjid",
      "thumbnail": "https://storage.example.com/courses/thumb-2.jpg"
    },
    "original_amount": 250000,
    "discount": 50000,
    "total_amount": 200000,
    "payment_method": "bank_transfer",
    "payment_details": {
      "bank_name": "Bank Syariah Indonesia",
      "va_number": "8801234567890"
    },
    "status": "pending",
    "created_at": "2025-01-15T10:00:00Z",
    "expires_at": "2025-01-16T10:00:00Z",
    "paid_at": null
  }
}
```

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
| status | string | - | Filter: `Berhasil`, `Pending`, `Gagal` |
| type | string | - | Filter: `course`, `agenda` |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid-string",
        "invoice": "INV-CRS-2025-0042",
        "type": "course",
        "item_title": "Manajemen Keuangan Masjid",
        "amount": 200000,
        "amount_display": "Rp 200.000",
        "payment_method": "Bank Transfer",
        "status": "Berhasil",
        "date": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 5,
      "total_pages": 1
    }
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
  "success": true,
  "data": {
    "code": "MARBOT2025",
    "discount_type": "percentage",
    "discount_value": 20,
    "discount_amount": 50000,
    "original_price": 250000,
    "final_price": 200000,
    "expires_at": "2025-03-31T23:59:59Z"
  }
}
```

### Response — 404 Not Found

```json
{
  "success": false,
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
  "success": true
}
```

---

## 6. Check Payment Status

Mengecek status pembayaran order (untuk polling dari frontend).

**Endpoint:** `GET /api/v1/orders/:id/status`
**Auth:** Bearer Token (Required)

### Path Parameters

| Parameter | Type | Keterangan |
|-----------|------|------------|
| id | string | Order UUID |

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "order_id": "uuid-string",
    "invoice": "INV-CRS-2025-0042",
    "status": "Berhasil",
    "paid_at": "2025-01-15T10:15:00Z"
  }
}
```

**Halaman terkait:** `/checkout/:id/sukses` — [CheckoutSuccess.tsx](../../src/pages/CheckoutSuccess.tsx)

---

## 7. Get Available Payment Methods

Mengambil daftar metode pembayaran yang tersedia.

**Endpoint:** `GET /api/v1/payment-methods`
**Auth:** Bearer Token (Required)

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "methods": [
      {
        "id": "bank_transfer",
        "name": "Transfer Bank",
        "description": "Transfer melalui Virtual Account",
        "icon": "bank",
        "channels": [
          {
            "id": "bsi",
            "name": "Bank Syariah Indonesia",
            "icon": "https://storage.example.com/payment/bsi.png"
          },
          {
            "id": "bni",
            "name": "Bank BNI",
            "icon": "https://storage.example.com/payment/bni.png"
          }
        ]
      },
      {
        "id": "e_wallet",
        "name": "E-Wallet",
        "description": "Pembayaran melalui dompet digital",
        "icon": "wallet",
        "channels": [
          {
            "id": "gopay",
            "name": "GoPay",
            "icon": "https://storage.example.com/payment/gopay.png"
          },
          {
            "id": "shopeepay",
            "name": "ShopeePay",
            "icon": "https://storage.example.com/payment/shopeepay.png"
          }
        ]
      },
      {
        "id": "qris",
        "name": "QRIS",
        "description": "Scan QR Code untuk pembayaran",
        "icon": "qr-code"
      }
    ]
  }
}
```
