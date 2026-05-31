# PROJECT BRIEF — Coddies

## 1. Nama Proyek

Coddies

## 2. Tagline

Teman Tumbuh si Kecil.

## 3. Deskripsi Singkat

Coddies adalah platform marketplace lokal untuk membantu orang tua di Kota Palu membeli, menjual, dan menemukan perlengkapan bayi serta balita preloved yang masih layak pakai.

Fokus utama Coddies adalah barang bayi berukuran sedang hingga besar seperti stroller, car seat, box bayi, high chair, baby walker, mainan besar, dan sepeda anak. Platform ini dibuat untuk mengurangi masalah ongkir mahal, barang menumpuk di rumah, dan rendahnya kepercayaan saat membeli barang bayi bekas.

## 4. Tujuan Produk

Membangun MVP marketplace lokal yang sederhana, cepat digunakan, dan dipercaya oleh orang tua di Palu.

Tujuan utama MVP bukan membuat marketplace besar langsung, tetapi membuktikan bahwa orang tua di Palu mau:

- mengunggah barang bayi preloved,
- mencari barang bayi bekas yang masih layak,
- menghubungi penjual lokal,
- melakukan COD atau ambil langsung,
- memberi ulasan setelah transaksi.

## 5. Masalah Utama

Orang tua sering memiliki perlengkapan bayi yang hanya dipakai sebentar karena anak cepat tumbuh. Barang seperti stroller, car seat, box bayi, dan mainan besar masih bagus, tetapi akhirnya menumpuk di rumah.

Di sisi lain, orang tua lain membutuhkan barang tersebut dengan harga lebih terjangkau. Masalahnya, e-commerce nasional kurang cocok untuk barang besar karena ongkir mahal. Facebook Marketplace dan grup WhatsApp juga kurang terkurasi, sulit difilter, dan kurang memberi rasa aman.

## 6. Solusi Produk

Coddies menyediakan katalog lokal barang bayi preloved di Palu dengan pencarian, filter, detail kondisi barang, foto yang jelas, wishlist, dan tombol kontak WhatsApp penjual.

Untuk MVP, transaksi tidak dilakukan di dalam aplikasi. Aplikasi hanya membantu pengguna menemukan barang, melihat detail, menyimpan wishlist, dan menghubungi penjual.

## 7. Target Pengguna

### Pengguna Utama

Orang tua muda di Kota Palu yang memiliki anak usia 0–5 tahun.

### Pengguna Penjual

Orang tua yang memiliki perlengkapan bayi atau balita yang sudah tidak digunakan, tetapi masih layak pakai.

### Pengguna Pembeli

Orang tua yang ingin membeli perlengkapan bayi dengan harga lebih hemat, lokasi dekat, dan kondisi barang lebih jelas.

## 8. Persona Utama

### Rina — Ibu Muda di Palu

Rina memiliki anak yang sudah bertambah besar. Di rumahnya ada stroller, baju bayi, mainan, dan baby walker yang sudah jarang dipakai. Barang tersebut masih bagus, tetapi Rina bingung menjualnya.

Saat ini Rina biasanya hanya menawarkan barang lewat status WhatsApp, grup Facebook, atau cerita ke teman. Cara ini kurang rapi, cepat tenggelam, dan pembelinya terbatas.

Coddies membantu Rina mengunggah barangnya dengan foto, harga, kondisi, lokasi, dan tombol kontak WhatsApp agar calon pembeli bisa langsung bertanya.

## 9. Positioning Produk

Coddies adalah tempat orang tua Palu menemukan perlengkapan bayi preloved yang dekat, hemat, dan lebih terpercaya.

## 10. Pembeda Utama

Coddies berbeda dari marketplace umum karena:

- fokus khusus pada perlengkapan bayi dan balita,
- fokus area Kota Palu dan sekitarnya,
- menonjolkan kondisi dan kebersihan barang,
- mendukung COD atau ambil langsung,
- membantu barang preloved tetap bermanfaat,
- lebih terkurasi dibanding grup jual beli umum.

## 11. Scope MVP

MVP Coddies harus sederhana, ringan, dan fokus pada validasi pasar.

### Must Have

- Homepage
- Katalog produk
- Detail produk
- Upload produk
- Wishlist
- Login dan register
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
- Badge sederhana pada produk
- Wishlist alert sederhana
- Halaman barang saya
- Halaman transaksi sederhana

### Could Have

- Notifikasi barang baru
- Rekomendasi produk serupa
- Artikel edukasi membeli barang bayi preloved
- Panduan harga barang bekas
- Halaman komunitas

### Not Now

- Chat internal
- Pembayaran online
- Kurir otomatis
- Escrow
- Barter kompleks
- Tukar tambah otomatis
- Membership
- Komisi transaksi
- Sistem admin kompleks
- Aplikasi mobile native

## 12. Halaman yang Dibutuhkan

### 1. Homepage `/`

Fungsi:
- memperkenalkan Coddies,
- menampilkan search bar,
- menampilkan kategori cepat,
- menampilkan produk terbaru,
- mengarahkan pengguna untuk menjual barang.

Komponen:
- header,
- hero section,
- search bar besar,
- kategori cepat,
- produk terbaru,
- alasan memilih Coddies,
- cara kerja,
- CTA jual barang,
- footer.

### 2. Product Catalog `/products`

Fungsi:
- menampilkan semua produk,
- mendukung pencarian dan filter.

Filter:
- kategori,
- lokasi,
- harga,
- kondisi,
- usia anak,
- status produk.

### 3. Product Detail `/products/[id]`

Fungsi:
- menampilkan detail lengkap produk,
- menampilkan foto produk,
- menampilkan harga,
- menampilkan kondisi,
- menampilkan lokasi,
- menampilkan penjual,
- menyediakan tombol WhatsApp.

### 4. Sell Product `/sell`

Fungsi:
- form untuk mengunggah barang.

Field:
- nama barang,
- kategori,
- deskripsi,
- harga,
- kondisi,
- usia anak,
- lokasi,
- foto produk,
- opsi bisa dinego,
- opsi bisa tukar tambah,
- nomor WhatsApp.

### 5. Wishlist `/wishlist`

Fungsi:
- menyimpan produk yang disukai,
- menyimpan pencarian barang yang belum tersedia.

### 6. Account `/account`

Fungsi:
- menampilkan profil pengguna,
- daftar barang yang diunggah,
- wishlist,
- transaksi,
- pengaturan akun.

### 7. Login `/login`

Fungsi:
- pengguna masuk ke akun.

### 8. Register `/register`

Fungsi:
- pengguna membuat akun baru.

## 13. Navigasi Utama

### Desktop

- Beranda
- Cari Barang
- Wishlist
- Jual Barang
- Akun

Tombol “Jual Barang” harus paling menonjol.

### Mobile

Gunakan bottom navigation:

- Beranda
- Cari
- Jual
- Wishlist
- Akun

Menu “Jual” berada di tengah dan dibuat lebih menonjol.

## 14. Kategori Produk Awal

Kategori yang diprioritaskan:

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

Kategori barang besar harus lebih ditonjolkan dibanding baju bayi.

## 15. Status Produk

Setiap produk harus memiliki status:

- Tersedia
- Sedang Dinego
- Booking
- Terjual
- Dibatalkan

## 16. Kondisi Produk

Gunakan pilihan kondisi:

- Seperti Baru
- Sangat Baik
- Baik
- Ada Minus Ringan
- Perlu Perbaikan

## 17. Checklist Upload Produk

Saat pengguna mengunggah barang, arahkan agar memberi data yang jelas:

- foto asli barang,
- minimal 3–4 foto,
- kondisi barang,
- minus atau kerusakan,
- kelengkapan barang,
- lokasi barang,
- harga,
- alasan dijual,
- apakah bisa nego,
- apakah bisa tukar tambah.

## 18. Fitur Trust Dasar

Untuk MVP, gunakan trust signal sederhana:

- Foto Lengkap
- Kondisi Jelas
- Penjual Responsif
- Transaksi Selesai
- Review Pembeli

Jangan membuat sistem Trusted Parents yang terlalu kompleks pada MVP awal.

## 19. Cara Kerja Produk

Alur utama pembeli:

1. Buka Coddies.
2. Cari barang.
3. Gunakan filter.
4. Buka detail produk.
5. Simpan ke wishlist jika tertarik.
6. Hubungi penjual via WhatsApp.
7. Sepakati harga dan lokasi COD.
8. Selesaikan transaksi di luar aplikasi.
9. Beri review sederhana.

Alur utama penjual:

1. Daftar akun.
2. Klik Jual Barang.
3. Isi detail produk.
4. Upload foto.
5. Terima pertanyaan dari pembeli.
6. Sepakati COD atau ambil langsung.
7. Tandai produk sebagai terjual.

## 20. Model Monetisasi Masa Depan

Tidak digunakan pada MVP awal.

Potensi monetisasi fase berikutnya:

- boost listing,
- listing premium,
- iklan toko bayi lokal,
- jasa foto produk,
- badge seller terverifikasi,
- kerja sama kurir lokal,
- rekomendasi produk sponsor.

## 21. Metrik Sukses MVP

Target awal:

- 200 listing aktif dalam 60 hari,
- 50 penjual aktif pertama,
- 500 pengguna terdaftar,
- 30 transaksi pertama,
- 100 wishlist tersimpan,
- 40% pengguna kembali dalam 14 hari,
- 70% produk memiliki minimal 3 foto,
- 60% transaksi selesai mendapat review.

## 22. Risiko Produk

Risiko utama:

- jumlah listing sedikit,
- pengguna lebih memilih Facebook Marketplace,
- penjual tidak update status barang,
- pembeli hanya bertanya tanpa transaksi,
- barang tidak sesuai foto,
- transaksi pindah ke WhatsApp dan tidak tercatat,
- review sedikit,
- barter sulit terjadi,
- user tidak kembali jika barang kosong.

## 23. Strategi Validasi Awal

Sebelum membangun fitur kompleks:

- buat landing page,
- buat katalog manual,
- kumpulkan 50 penjual awal,
- kumpulkan 200 listing,
- gunakan WhatsApp sebagai kanal transaksi,
- promosikan di komunitas lokal Palu,
- ukur jumlah chat dan transaksi,
- catat kategori paling dicari,
- catat barang yang paling cepat terjual.

## 24. Batasan untuk Codex

Saat mengerjakan proyek ini:

- Jangan membuat fitur di luar scope MVP.
- Jangan membuat payment gateway.
- Jangan membuat chat internal dulu.
- Jangan membuat sistem kurir otomatis.
- Jangan membuat barter kompleks.
- Jangan membuat dashboard admin kompleks.
- Gunakan dummy data untuk frontend awal.
- Buat kode rapi, modular, dan mudah dikembangkan.
- Prioritaskan mobile-first.
- Pastikan UI tetap ringan dan tidak ramai.
- Gunakan komponen reusable.
- Pisahkan data dummy dari komponen UI.
- Gunakan nama variabel yang jelas.
- Jangan hardcode terlalu banyak teks di dalam komponen besar.

## 25. Tech Stack MVP

Gunakan:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Vercel

Untuk tahap pertama, backend boleh ditunda dan gunakan dummy data terlebih dahulu.

## 26. Struktur Folder yang Disarankan

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
    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductFilter.tsx
      ProductGallery.tsx
    home/
      HeroSection.tsx
      CategoryChips.tsx
      LatestProducts.tsx
      HowItWorks.tsx
      TrustSection.tsx
    forms/
      SellProductForm.tsx

  data/
    dummy-products.ts
    categories.ts

  lib/
    utils.ts
    types.ts