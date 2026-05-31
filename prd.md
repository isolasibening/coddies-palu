# PRD — Coddies

## 1. Product Overview

### Nama Produk
Coddies

### Tagline
Teman Tumbuh si Kecil.

### Deskripsi Singkat
Coddies adalah marketplace lokal untuk membantu orang tua di Kota Palu membeli dan menjual perlengkapan bayi serta balita preloved yang masih layak pakai.

Fokus utama Coddies adalah barang bayi berukuran sedang hingga besar seperti stroller, car seat, box bayi, high chair, baby walker, mainan besar, dan sepeda anak.

Coddies hadir untuk mengurangi masalah ongkir mahal, barang bayi yang menumpuk di rumah, dan rendahnya kepercayaan saat membeli barang bayi bekas dari platform umum.

---

## 2. Problem Statement

Orang tua sering memiliki perlengkapan bayi yang hanya digunakan sebentar karena anak cepat tumbuh. Banyak barang masih bagus, tetapi akhirnya menumpuk di rumah karena sulit dijual kembali.

Di sisi lain, orang tua lain membutuhkan perlengkapan bayi dengan harga lebih hemat. Namun, membeli barang besar dari e-commerce nasional sering tidak efisien karena ongkos kirim mahal.

Platform umum seperti Facebook Marketplace, grup WhatsApp, atau OLX belum cukup ideal karena:

- barang sulit difilter,
- informasi kondisi barang sering tidak lengkap,
- stok cepat tenggelam,
- tidak fokus pada kebutuhan bayi,
- kepercayaan antar pengguna rendah,
- lokasi penjual tidak selalu jelas.

---

## 3. Target User

### Primary User
Orang tua muda di Kota Palu yang memiliki anak usia 0–5 tahun.

### Seller Persona
Orang tua yang memiliki perlengkapan bayi atau balita yang sudah tidak digunakan, tetapi masih layak pakai.

### Buyer Persona
Orang tua yang ingin membeli perlengkapan bayi preloved dengan harga lebih hemat, lokasi dekat, dan kondisi barang lebih jelas.

---

## 4. Core User Persona

### Rina — Ibu Muda di Palu

Rina memiliki anak yang sudah bertambah besar. Di rumahnya ada stroller, baby walker, mainan, dan pakaian bayi yang sudah tidak digunakan.

Saat ini Rina biasanya menjual barang melalui status WhatsApp, grup Facebook, atau menawarkan ke teman. Masalahnya, cara ini tidak rapi, cepat tenggelam, dan sulit menjangkau pembeli baru.

Dengan Coddies, Rina bisa mengunggah barang, menampilkan foto, harga, kondisi, lokasi, dan langsung dihubungi calon pembeli melalui WhatsApp.

---

## 5. Product Positioning

Coddies adalah tempat orang tua Palu menemukan perlengkapan bayi preloved yang dekat, hemat, dan lebih terpercaya.

### Value Proposition
Barang si kecil yang sudah tidak terpakai bisa menjadi manfaat untuk keluarga kecil lain di Palu.

---

## 6. Goals

### Business Goals

- Membuktikan ada kebutuhan jual-beli barang bayi preloved di Palu.
- Mengumpulkan listing barang bayi lokal.
- Membangun basis pengguna awal dari komunitas orang tua.
- Menjadi katalog lokal perlengkapan bayi preloved yang terpercaya.
- Menyiapkan dasar monetisasi melalui boost listing dan kerja sama toko lokal.

### User Goals

Pengguna ingin:

- mencari barang bayi preloved dengan mudah,
- melihat kondisi barang secara jelas,
- menemukan barang yang lokasinya dekat,
- menghubungi penjual tanpa ribet,
- menjual barang bayi yang tidak terpakai,
- mengurangi barang menumpuk di rumah.

---

## 7. MVP Scope

MVP Coddies harus sederhana dan fokus pada validasi pasar. Transaksi belum dilakukan di dalam aplikasi. Untuk tahap awal, aplikasi hanya membantu pengguna menemukan barang, melihat detail, menyimpan wishlist, dan menghubungi penjual.

### Must Have

- Homepage
- Katalog produk
- Detail produk
- Upload produk
- Wishlist
- Login
- Register
- Profil pengguna
- Tombol hubungi penjual via WhatsApp
- Filter kategori
- Filter lokasi
- Filter harga
- Filter kondisi barang
- Status produk
- Dummy data untuk tahap frontend awal

### Should Have

- Review sederhana
- Rating kondisi barang
- Badge produk sederhana
- Halaman barang saya
- Halaman transaksi sederhana
- Wishlist pencarian

### Could Have

- Notifikasi barang baru
- Rekomendasi produk serupa
- Panduan harga barang bekas
- Artikel edukasi barang bayi preloved
- Halaman komunitas

### Not Now

- Chat internal
- Payment gateway
- Escrow
- Kurir otomatis
- Barter kompleks
- Tukar tambah otomatis
- Membership
- Komisi transaksi
- Dashboard admin kompleks
- Aplikasi mobile native

---

## 8. Core Features

### 8.1 Homepage

Homepage adalah halaman pertama yang menjelaskan Coddies dan menampilkan produk lokal terbaru.

#### Komponen

- Header
- Hero section
- Search bar besar
- Kategori cepat
- Produk terbaru
- CTA jual barang
- Alasan memilih Coddies
- Cara kerja
- Wishlist alert
- Footer

#### Tujuan Homepage

Dalam 5 detik, pengguna harus paham bahwa Coddies adalah tempat mencari dan menjual barang bayi preloved di Palu.

---

### 8.2 Product Catalog

Halaman katalog menampilkan semua barang yang tersedia.

#### Fitur

- Search produk
- Filter kategori
- Filter lokasi
- Filter harga
- Filter kondisi
- Filter usia anak
- Filter status produk
- Sort produk terbaru
- Sort harga terendah
- Sort harga tertinggi

#### Product Card

Setiap kartu produk menampilkan:

- foto produk,
- nama produk,
- harga,
- lokasi,
- kondisi,
- status,
- tombol wishlist,
- tombol lihat detail.

---

### 8.3 Product Detail

Halaman detail produk harus membantu pembeli mengambil keputusan.

#### Informasi yang Ditampilkan

- Galeri foto produk
- Nama produk
- Harga
- Kategori
- Kondisi
- Status produk
- Lokasi
- Deskripsi
- Minus atau kerusakan
- Usia anak yang sesuai
- Info penjual
- Tombol WhatsApp
- Tombol wishlist
- Produk serupa

#### CTA Utama

Hubungi Penjual

#### CTA Sekunder

Simpan ke Wishlist

---

### 8.4 Sell Product

Halaman untuk mengunggah barang bayi preloved.

#### Field Form

- Nama barang
- Kategori
- Merek
- Usia anak
- Harga
- Kondisi barang
- Deskripsi
- Minus atau kerusakan
- Lokasi/kecamatan
- Nomor WhatsApp
- Foto utama
- Foto tambahan
- Bisa nego
- Bisa tukar tambah

#### Catatan UX

Form harus ringan dan tidak terasa seperti formulir panjang yang melelahkan.

---

### 8.5 Wishlist

Wishlist membantu pengguna menyimpan barang atau pencarian.

#### Fitur

- Simpan produk
- Hapus produk dari wishlist
- Simpan kata kunci pencarian
- Empty state jika belum ada wishlist

---

### 8.6 Account

Halaman akun berisi ringkasan aktivitas pengguna.

#### Isi Halaman

- Profil pengguna
- Barang saya
- Wishlist saya
- Transaksi saya
- Review saya
- Pengaturan akun
- Bantuan
- Logout

---

### 8.7 Authentication

Untuk MVP, auth digunakan agar pengguna bisa:

- mengunggah barang,
- menyimpan wishlist,
- mengelola barang,
- memberi review.

#### Register Field

- Nama
- Email
- Password
- Kecamatan
- Nomor WhatsApp

#### Login Field

- Email
- Password

---

## 9. Navigation

### Desktop Navigation

- Beranda
- Cari Barang
- Wishlist
- Jual Barang
- Akun

Tombol “Jual Barang” harus paling menonjol.

### Mobile Navigation

Gunakan bottom navigation:

- Beranda
- Cari
- Jual
- Wishlist
- Akun

Menu “Jual” berada di tengah dan dibuat lebih mencolok.

---

## 10. Categories

Kategori awal:

- Stroller
- Car Seat
- Box Bayi
- High Chair
- Baby Walker
- Mainan Besar
- Sepeda Anak
- Perlengkapan Tidur
- Perlengkapan Makan
- Baju Bayi

Prioritas tampilan diberikan pada barang berukuran sedang hingga besar.

---

## 11. Product Status

Setiap produk harus memiliki status:

- Tersedia
- Sedang Dinego
- Booking
- Terjual
- Dibatalkan

---

## 12. Product Condition

Pilihan kondisi barang:

- Seperti Baru
- Sangat Baik
- Baik
- Ada Minus Ringan
- Perlu Perbaikan

---

## 13. Trust System MVP

Untuk tahap awal, sistem trust dibuat sederhana.

### Trust Signal

- Foto Lengkap
- Kondisi Jelas
- Penjual Responsif
- Transaksi Selesai
- Review Pembeli

### Catatan

Jangan membuat sistem “Trusted Parents” terlalu kompleks pada MVP awal. Badge harus berdasarkan aktivitas nyata, bukan sekadar label dekoratif.

---

## 14. User Flow

### Buyer Flow

1. Pengguna membuka Coddies.
2. Pengguna mencari barang.
3. Pengguna memakai filter.
4. Pengguna membuka detail produk.
5. Pengguna menyimpan ke wishlist jika tertarik.
6. Pengguna menghubungi penjual via WhatsApp.
7. Pengguna dan penjual menyepakati harga.
8. Pengguna melakukan COD atau ambil langsung.
9. Pengguna memberi review sederhana.

### Seller Flow

1. Pengguna daftar/login.
2. Pengguna klik “Jual Barang”.
3. Pengguna mengisi detail produk.
4. Pengguna mengunggah foto.
5. Produk tampil di katalog.
6. Calon pembeli menghubungi via WhatsApp.
7. Penjual menyepakati COD atau ambil langsung.
8. Penjual menandai produk sebagai terjual.

---

## 15. Database Schema

### Users

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| name | string | Nama pengguna |
| email | string | Email pengguna |
| phone | string | Nomor WhatsApp |
| location | string | Kecamatan/area |
| avatarUrl | string | Foto profil |
| responseRate | number | Persentase respons |
| completedTransactions | number | Jumlah transaksi selesai |
| createdAt | datetime | Tanggal dibuat |
| updatedAt | datetime | Tanggal diperbarui |

---

### Products

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| sellerId | string | Relasi ke users |
| title | string | Nama barang |
| description | text | Deskripsi barang |
| categoryId | string | Relasi ke categories |
| brand | string | Merek barang |
| ageRange | string | Rentang usia anak |
| condition | string | Kondisi barang |
| price | number | Harga |
| isNegotiable | boolean | Bisa nego |
| isTradeAllowed | boolean | Bisa tukar tambah |
| defects | text | Minus atau kerusakan |
| location | string | Lokasi/kecamatan |
| status | string | Status produk |
| photos | array | Daftar foto |
| createdAt | datetime | Tanggal dibuat |
| updatedAt | datetime | Tanggal diperbarui |
| soldAt | datetime | Tanggal terjual |

---

### Categories

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| name | string | Nama kategori |
| slug | string | Slug kategori |
| icon | string | Nama ikon |
| priority | number | Urutan tampil |

---

### Wishlists

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| userId | string | Relasi ke users |
| productId | string | Relasi ke products |
| createdAt | datetime | Tanggal disimpan |

---

### SavedSearches

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| userId | string | Relasi ke users |
| keyword | string | Kata kunci pencarian |
| categoryId | string | Kategori opsional |
| location | string | Lokasi opsional |
| maxPrice | number | Harga maksimal |
| createdAt | datetime | Tanggal dibuat |

---

### Transactions

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| productId | string | Relasi ke products |
| sellerId | string | Relasi ke users |
| buyerId | string | Relasi ke users |
| finalPrice | number | Harga akhir |
| status | string | Status transaksi |
| meetupLocation | string | Lokasi COD |
| cancelReason | text | Alasan batal |
| completedAt | datetime | Tanggal selesai |
| createdAt | datetime | Tanggal dibuat |

---

### Reviews

| Field | Type | Description |
|---|---|---|
| id | string | Primary key |
| transactionId | string | Relasi ke transactions |
| reviewerId | string | Pemberi review |
| reviewedUserId | string | Penerima review |
| productAccuracyRating | number | Akurasi produk |
| hygieneRating | number | Kebersihan |
| communicationRating | number | Komunikasi |
| safetyRating | number | Keamanan |
| comment | text | Komentar |
| createdAt | datetime | Tanggal dibuat |

---

## 16. Recommended Tech Stack

### Frontend
Next.js, TypeScript, Tailwind CSS, shadcn/ui

### Backend
Supabase PostgreSQL

### Authentication
Supabase Auth

### File Storage
Supabase Storage

### Deployment
Vercel

### Initial Development
Gunakan dummy data terlebih dahulu sebelum integrasi backend.

---

## 17. Design Direction

Coddies harus terasa:

- bersih,
- ramah,
- lembut,
- modern,
- lokal,
- terpercaya,
- tidak ramai,
- tidak kekanak-kanakan berlebihan.

### Warna Utama

- Soft cream untuk background
- Warm yellow untuk CTA utama
- Soft blue untuk elemen informatif
- Soft green untuk trust signal
- Dark navy untuk teks utama
- Soft gray untuk border

### Prinsip UI

- Mobile-first
- Produk cepat terlihat
- Search bar dominan
- CTA “Jual Barang” menonjol
- Product card informatif
- Form upload tidak melelahkan
- Navigasi sederhana
- Trust signal terlihat jelas

---

## 18. Success Metrics

### Supply Metrics

- 200 listing aktif dalam 60 hari
- 50 penjual aktif pertama
- 70% produk memiliki minimal 3 foto
- 50% listing berasal dari barang besar

### Demand Metrics

- 500 pengguna terdaftar
- 100 wishlist tersimpan
- 30 transaksi pertama
- 40% pengguna kembali dalam 14 hari

### Marketplace Health Metrics

- Rata-rata chat per listing
- Produk terjual dalam 14 hari
- Kategori paling dicari
- Kategori dengan stok kosong
- Jumlah produk yang ditandai terjual

### Trust Metrics

- 60% transaksi selesai mendapat review
- Rata-rata rating kondisi minimal 4/5
- Rata-rata rating komunikasi minimal 4/5

---

## 19. Monetization Plan

Monetisasi tidak diterapkan pada MVP awal.

### Potensi Monetisasi Fase Berikutnya

- Boost listing
- Listing premium
- Iklan toko bayi lokal
- Jasa foto produk
- Badge seller terverifikasi
- Kerja sama kurir lokal
- Rekomendasi produk sponsor

### Catatan

Jangan mengambil komisi transaksi pada fase awal karena transaksi COD dan WhatsApp sulit dikontrol.

---

## 20. Risks

### Product Risks

- Listing awal terlalu sedikit
- Produk tidak cepat terjual
- User lebih memilih Facebook Marketplace
- Penjual tidak update status barang
- Pembeli hanya bertanya tanpa transaksi
- Review sedikit
- Barang tidak sesuai foto
- Transaksi pindah ke WhatsApp dan tidak tercatat

### Technical Risks

- Upload foto berat
- Filter lambat jika data bertambah
- Auth membingungkan pengguna
- Struktur database terlalu kompleks untuk MVP

### Market Risks

- Orang tua belum terbiasa memakai platform khusus
- Komunitas lokal sulit diajak pindah
- Supply barang bayi tidak konsisten
- Kompetisi dari grup Facebook dan WhatsApp

---

## 21. Validation Plan

Sebelum membangun fitur kompleks:

1. Buat landing page Coddies.
2. Buat katalog produk dengan dummy data.
3. Kumpulkan minimal 50 penjual awal.
4. Kumpulkan minimal 200 listing.
5. Promosikan ke komunitas orang tua di Palu.
6. Gunakan WhatsApp sebagai kanal transaksi.
7. Catat jumlah klik WhatsApp.
8. Catat jumlah wishlist.
9. Catat kategori paling dicari.
10. Catat produk yang paling cepat terjual.
11. Evaluasi apakah marketplace layak dikembangkan.

---

## 22. Development Phases

### Phase 1 — Frontend MVP

- Setup Next.js
- Setup Tailwind
- Setup shadcn/ui
- Buat homepage
- Buat katalog produk
- Buat detail produk
- Buat form jual barang
- Buat wishlist
- Buat akun
- Buat login/register UI
- Gunakan dummy data

### Phase 2 — Backend Integration

- Setup Supabase
- Buat database schema
- Integrasi auth
- Integrasi produk
- Integrasi upload foto
- Integrasi wishlist
- Integrasi akun

### Phase 3 — Marketplace Features

- Status produk
- Review sederhana
- Barang saya
- Transaksi sederhana
- Saved search
- Basic notification

### Phase 4 — Growth Features

- Boost listing
- Produk rekomendasi
- Seller badge
- Statistik seller
- Admin moderation ringan
- Kerja sama toko lokal

---

## 23. Non-Goals

Hal berikut tidak dikerjakan pada MVP:

- Aplikasi Android/iOS native
- Chat internal
- Payment gateway
- Escrow
- Sistem kurir otomatis
- AI recommendation
- Admin dashboard kompleks
- Membership
- Komisi transaksi
- Multi-kota
- Barter otomatis

---

## 24. Acceptance Criteria

MVP dianggap selesai jika:

- Homepage tampil responsive.
- Produk terbaru tampil di homepage.
- Pengguna bisa membuka katalog.
- Pengguna bisa memfilter produk.
- Pengguna bisa membuka detail produk.
- Pengguna bisa melihat tombol WhatsApp penjual.
- Pengguna bisa membuka form jual barang.
- Pengguna bisa menyimpan wishlist secara dummy/local state.
- Halaman akun tersedia.
- Login dan register UI tersedia.
- Mobile navigation berjalan baik.
- Semua halaman rapi di mobile dan desktop.
- Tidak ada fitur di luar scope MVP.

---

## 25. Codex Instructions

Saat menggunakan Codex:

- Baca PRD ini sebelum coding.
- Jangan membuat fitur di luar MVP.
- Gunakan dummy data pada tahap pertama.
- Jangan integrasikan payment gateway.
- Jangan membuat chat internal.
- Jangan membuat kurir otomatis.
- Jangan membuat barter kompleks.
- Buat komponen reusable.
- Gunakan TypeScript.
- Gunakan Tailwind CSS.
- Gunakan shadcn/ui.
- Prioritaskan mobile-first.
- Buat UI clean, ramah, dan tidak ramai.
- Pisahkan data dummy dari komponen.
- Pastikan struktur folder rapi.
- Jelaskan file yang dibuat setelah selesai.

---

## 26. Suggested Folder Structure

```txt
src/
  app/
    page.tsx
    products/
      page.tsx
      [id]/
        page.tsx
    sell/
      page.tsx
    wishlist/
      page.tsx
    account/
      page.tsx
    login/
      page.tsx
    register/
      page.tsx

  components/
    layout/
      Header.tsx
      BottomNav.tsx
      Footer.tsx

    home/
      HeroSection.tsx
      CategoryChips.tsx
      LatestProducts.tsx
      HowItWorks.tsx
      TrustSection.tsx
      CTASection.tsx

    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductFilter.tsx
      ProductGallery.tsx
      ProductStatusBadge.tsx
      ProductConditionBadge.tsx

    forms/
      SellProductForm.tsx
      LoginForm.tsx
      RegisterForm.tsx

    shared/
      SearchBar.tsx
      EmptyState.tsx
      SectionHeader.tsx
      WishlistButton.tsx

  data/
    dummy-products.ts
    categories.ts

  lib/
    types.ts
    utils.ts