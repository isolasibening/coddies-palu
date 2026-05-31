
---

# `DESIGN_GUIDE.md`

```md
# DESIGN GUIDE — Coddies

## 1. Arah Visual

Coddies harus terasa hangat, bersih, lokal, ramah, dan terpercaya.

Desain tidak boleh terlihat seperti marketplace murahan, forum jual beli lama, atau aplikasi parenting yang terlalu ramai. Tampilan harus modern, lembut, dan mudah digunakan oleh orang tua yang sibuk.

Kesan utama:
- clean,
- warm,
- friendly,
- trustworthy,
- local,
- simple,
- modern,
- tidak norak.

## 2. Prinsip Desain

### 1. Mobile-first

Mayoritas pengguna kemungkinan membuka Coddies dari smartphone. Semua halaman harus nyaman digunakan di layar kecil.

Prioritas:
- tombol mudah ditekan,
- search bar besar,
- kartu produk jelas,
- navigasi bawah di mobile,
- form tidak melelahkan.

### 2. Produk harus cepat terlihat

Homepage jangan hanya berisi ilustrasi besar. Produk nyata harus cepat muncul.

Pengguna harus langsung melihat:
- barang apa yang tersedia,
- lokasinya di mana,
- harganya berapa,
- kondisinya bagaimana.

### 3. Jangan terlalu banyak teks

Orang tua sibuk. Gunakan copywriting pendek, jelas, dan langsung.

Hindari paragraf panjang di UI.

### 4. Trust lebih penting dari dekorasi

Karena produk berkaitan dengan bayi dan anak, UI harus menonjolkan:
- kondisi barang,
- foto asli,
- lokasi,
- penjual,
- review,
- status produk.

### 5. Local-first

Coddies harus terasa dibuat untuk Palu, bukan marketplace generik.

Gunakan istilah:
- Palu,
- kecamatan,
- COD,
- ambil langsung,
- kurir lokal.

## 3. Kepribadian Brand

Coddies berbicara seperti teman sesama orang tua yang helpful, bukan seperti korporasi.

Tone:
- ramah,
- sederhana,
- tenang,
- membantu,
- tidak sok imut,
- tidak lebay.

Contoh gaya bahasa:

Baik:
- “Cari perlengkapan bayi preloved di Palu.”
- “Barang masih bagus? Jual di Coddies.”
- “Simpan pencarianmu, kami bantu pantau.”
- “Cek kondisi barang sebelum COD.”

Kurang baik:
- “Marketplace revolusioner untuk ekosistem parenting masa depan.”
- “Solusi inovatif berbasis komunitas untuk transformasi preloved economy.”
- “Temukan kebahagiaan si kecil dalam sentuhan cinta.”

Yang terakhir terlalu cringe.

## 4. Warna Brand

Gunakan warna lembut dan hangat.

### Warna Utama

Soft Cream  
Digunakan untuk background utama.

```txt
#FFF8EC
Warm Yellow
Digunakan untuk CTA utama seperti “Jual Barang”.

#F9C74F

Soft Blue
Digunakan untuk elemen informatif.

#A7D8F0

Soft Green
Digunakan untuk trust signal atau status positif.

#B7E4C7

Dark Navy
Digunakan untuk teks utama.

#1F2937

Soft Gray
Digunakan untuk border dan teks sekunder.

#E5E7EB

Muted Text
Untuk teks pendukung.

#6B7280
Catatan Warna
Jangan gunakan warna terlalu neon.
Jangan gunakan terlalu banyak warna sekaligus.
CTA utama harus konsisten.
Background harus lembut dan tidak melelahkan mata.
5. Tipografi

Gunakan font sans-serif modern.

Rekomendasi:

Inter
Plus Jakarta Sans
Nunito Sans

Prioritas:

mudah dibaca,
modern,
ramah,
tidak terlalu formal.
Skala Tipografi

Hero title:

text-3xl sampai text-5xl
font-bold
leading-tight

Section title:

text-2xl
font-semibold

Card title:

text-base atau text-lg
font-semibold

Body text:

text-sm atau text-base
text-gray-600

Label kecil:

text-xs
font-medium
6. Border Radius

Gunakan bentuk rounded yang lembut.

Rekomendasi:

card: rounded-2xl
button: rounded-full atau rounded-xl
input: rounded-xl
image: rounded-xl
modal: rounded-2xl

Jangan gunakan sudut terlalu kaku.

7. Shadow

Gunakan shadow lembut.

Rekomendasi:

shadow-sm
shadow-md

Hindari shadow terlalu tebal karena bisa terlihat murahan.

8. Layout Umum

Gunakan layout lapang dengan whitespace cukup.

Container:

max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

Spacing antar section:

py-10 sampai py-20

Grid produk:

grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4

Untuk mobile, kartu produk boleh 2 kolom jika masih terbaca. Jika terlalu sempit, gunakan 1 kolom.

9. Header Desktop

Header harus sederhana.

Isi:

logo Coddies,
Beranda,
Cari Barang,
Wishlist,
Jual Barang,
Akun.

Tombol “Jual Barang” harus paling menonjol.

Contoh struktur:

Logo | Beranda | Cari Barang | Wishlist | [Jual Barang] | Akun

Header harus sticky jika memungkinkan, tetapi tidak wajib untuk MVP.

10. Bottom Navigation Mobile

Gunakan bottom nav untuk mobile.

Isi:

Beranda
Cari
Jual
Wishlist
Akun

Menu “Jual” berada di tengah dan dibuat paling menonjol.

Ikon boleh menggunakan lucide-react.

Ikon yang disarankan:

Home
Search
PlusCircle
Heart
User
11. Homepage Design

Urutan homepage:

Header
Hero section
Search bar besar
Kategori cepat
Produk terbaru
CTA jual barang
Kenapa pilih Coddies
Cara kerja
Wishlist alert
Footer
Hero Section

Hero harus langsung menjelaskan manfaat.

Headline:

Cari perlengkapan bayi preloved di Palu.

Subheadline:

Temukan stroller, car seat, box bayi, dan mainan anak dari orang tua lokal di sekitarmu.

CTA utama:

Cari Barang

CTA kedua:

Jual Barang Bayimu

Hero tidak boleh terlalu tinggi di mobile. Search bar harus cepat terlihat.

12. Search Bar

Search bar adalah elemen penting.

Placeholder:

Cari stroller, car seat, box bayi...

Desain:

besar,
mudah terlihat,
rounded-xl atau rounded-full,
icon search di kiri,
tombol cari di kanan.

Di mobile, search bar boleh full width.

13. Category Chips

Kategori cepat ditampilkan sebagai chip horizontal.

Kategori utama:

Stroller
Car Seat
Box Bayi
High Chair
Baby Walker
Mainan Besar
Sepeda Anak

Style:

rounded-full,
border lembut,
background putih,
hover soft yellow atau soft blue.
14. Product Card

Product card harus informatif, bukan cuma cantik.

Isi wajib:

foto produk,
nama produk,
harga,
lokasi,
kondisi,
status produk,
tombol wishlist,
badge jika ada.

Contoh isi:

Stroller Lipat Joie
Rp450.000
Mantikulore · Sangat Baik
Tersedia
Product Card Style
background putih,
rounded-2xl,
shadow-sm,
image ratio 1:1 atau 4:3,
padding cukup,
harga lebih menonjol,
lokasi kecil,
status berupa badge.
Badge Status

Tersedia:

background soft green
text green dark

Booking:

background soft yellow
text brown/dark

Terjual:

background gray
text muted
15. Product Detail Page

Halaman detail harus menjawab keraguan pembeli.

Elemen wajib:

galeri foto,
nama produk,
harga,
lokasi,
kondisi,
status,
deskripsi,
checklist kondisi,
info penjual,
tombol WhatsApp,
tombol wishlist,
produk serupa.

CTA utama:

Hubungi Penjual

CTA sekunder:

Simpan ke Wishlist

Bagian checklist:

Foto asli tersedia
Kondisi dijelaskan
Bisa COD
Bisa nego
16. Sell Product Page

Halaman jual barang harus terasa mudah, bukan seperti isi formulir pajak.

Form dibagi menjadi beberapa bagian:

Informasi Barang
Nama barang
Kategori
Usia anak
Merek
Deskripsi
Kondisi dan Harga
Kondisi barang
Harga
Bisa nego
Bisa tukar tambah
Minus atau kerusakan
Lokasi dan Kontak
Kecamatan
Area detail
Nomor WhatsApp
Foto Produk
Upload foto utama
Upload foto tambahan
Anjuran minimal 3 foto

Copy kecil:

Foto yang jelas bikin barangmu lebih cepat dilirik.
17. Wishlist Page

Wishlist berisi:

produk yang disimpan,
pencarian yang disimpan.

Jika kosong, tampilkan empty state yang ramah.

Contoh:

Wishlist kamu masih kosong.
Simpan barang yang kamu suka agar mudah ditemukan lagi.

CTA:

Cari Barang Sekarang
18. Account Page

Isi account:

profil pengguna,
barang saya,
wishlist,
transaksi,
review,
pengaturan akun,
bantuan.

Tampilan harus sederhana seperti dashboard kecil.

19. Login dan Register

Form harus minimal.

Login:

email,
password,
tombol login,
link register.

Register:

nama,
email,
password,
lokasi/kecamatan,
nomor WhatsApp.

Jangan terlalu banyak field di awal.

20. Empty State

Empty state harus membantu, bukan sekadar kosong.

Contoh untuk katalog:

Barang belum ditemukan.
Coba ubah filter atau simpan pencarianmu.

CTA:

Simpan Pencarian

Contoh untuk produk saya:

Kamu belum mengunggah barang.
Barang si kecil yang tidak terpakai bisa bermanfaat untuk keluarga lain.

CTA:

Jual Barang Sekarang
21. Loading State

Gunakan skeleton loading untuk:

product card,
katalog,
detail produk.

Jangan tampilkan spinner besar terus-menerus.

22. Error State

Gunakan pesan error yang manusiawi.

Contoh:

Ups, produk belum bisa dimuat.
Coba refresh halaman.

Hindari:

Error 500 Internal Server Error
23. Icon Style

Gunakan ikon sederhana dari lucide-react.

Rekomendasi:

Search
Heart
User
Home
Plus
MapPin
MessageCircle
ShieldCheck
Baby
Package
Tag
Camera
CheckCircle

Ikon harus line-style, bukan terlalu dekoratif.

24. Ilustrasi

Ilustrasi boleh digunakan, tetapi jangan mendominasi.

Style ilustrasi:

flat,
lembut,
sederhana,
parenting-friendly,
tidak terlalu childish.

Ilustrasi bisa dipakai untuk:

hero kecil,
empty state,
onboarding,
cara kerja.

Jangan gunakan ilustrasi terlalu besar sampai produk tidak terlihat.

25. Foto Produk

Foto produk harus menjadi fokus utama.

Aturan tampilan foto:

crop rapi,
rasio konsisten,
background netral,
tampilkan fallback image jika foto kosong.

Fallback image jangan norak. Gunakan placeholder sederhana.

26. Copywriting UI

Gunakan bahasa Indonesia yang sederhana.

Contoh CTA:

Cari Barang
Jual Barang
Hubungi Penjual
Simpan
Lihat Detail
Upload Foto
Tandai Terjual
Buat Wishlist

Hindari CTA yang terlalu panjang.

27. Komponen Utama

Komponen yang harus dibuat reusable:

Header
BottomNav
Footer
SearchBar
CategoryChips
ProductCard
ProductGrid
ProductFilter
ProductGallery
StatusBadge
ConditionBadge
WishlistButton
SellerCard
EmptyState
SectionHeader
CTASection
SellProductForm
28. Responsive Rules
Mobile
bottom nav aktif,
header lebih sederhana,
produk 1–2 kolom,
filter bisa dalam drawer,
CTA mudah dijangkau,
form full width.
Tablet
produk 2–3 kolom,
filter bisa horizontal,
layout lebih lapang.
Desktop
produk 4 kolom,
filter sidebar,
header penuh,
container max width.
29. Accessibility

Pastikan:

kontras teks cukup,
tombol punya label jelas,
input punya label,
gambar punya alt text,
font tidak terlalu kecil,
area klik cukup besar,
tidak bergantung hanya pada warna.
30. Design Anti-Pattern

Hindari:

homepage terlalu banyak teks,
animasi berlebihan,
warna terlalu ramai,
card terlalu kecil,
tombol terlalu banyak,
fitur barter terlalu dominan,
pop-up mengganggu,
layout seperti OLX lama,
visual terlalu bayi-bayi yang norak,
testimoni palsu,
badge trust tanpa dasar.
31. Referensi Rasa Visual

Arah visual boleh mengambil rasa dari:

marketplace modern,
aplikasi parenting clean,
katalog produk premium,
landing page SaaS sederhana,
e-commerce lokal yang ringan.

Tapi jangan terlihat seperti:

marketplace bekas yang kumuh,
aplikasi bayi yang terlalu kartun,
dashboard admin,
toko online dropship generik.
32. Prioritas Visual MVP

Prioritas desain MVP:

Homepage harus jelas.
Search bar harus dominan.
Product card harus rapi.
Detail produk harus meyakinkan.
Form jual barang harus mudah.
Mobile navigation harus nyaman.
Warna harus lembut dan konsisten.
CTA jual barang harus menonjol.