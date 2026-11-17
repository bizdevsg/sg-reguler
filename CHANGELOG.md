## [Unreleased]

### Added
- Menambahkan `.dockerignore` agar dependency lokal, hasil build Next.js, dan riwayat Git tidak dikirim ke konteks build Docker.
- Menambahkan konfigurasi Docker Compose untuk menjalankan sg-reguler di localhost port 3010 dengan akses portal berita melalui jaringan lokal.
- Menambahkan `dockerFile` untuk membangun dan menjalankan Next.js standalone dalam container produksi.
- Menambahkan redirect permanen dari URL lama produk dan wakil pialang ke struktur route baru.
- Menambahkan halaman katalog kategori JFX dan SPA pada route `/{locale}/product/{kategori}`, dengan daftar produk API, metadata, dan penanganan data kosong atau gagal dimuat.
- Menambahkan tombol katalog pada section produk halaman utama serta navigasi kembali dari halaman detail, dengan label Indonesia dan Inggris.
- Menambahkan halaman detail produk pada route `/{locale}/product/{kategori}/{slug}`, dengan deskripsi, gambar, spesifikasi API, metadata, dan tautan dari kartu produk halaman utama.
- Menambahkan pesan kegagalan detail produk dalam locale Indonesia dan Inggris agar gangguan API dapat dikenali pengguna.
- Menambahkan section produk multilateral dan bilateral setelah berita di halaman utama, dengan kartu responsif dan konten dalam bahasa Indonesia dan Inggris.
- Menambahkan halaman daftar Wakil Pialang Berjangka untuk locale Indonesia dan Inggris, lengkap dengan metadata SEO, filter kantor cabang, tampilan tabel desktop, kartu mobile, serta status kosong dan gagal dimuat.
- Menambahkan konfigurasi opsional `WAKIL_PIALANG_API_BASE_URL` untuk sumber data resmi Wakil Pialang dan kantor cabang.

### Changed
- Memperpendek cache data produk dari 5 menit menjadi 30 detik pada beranda, katalog, dan detail agar perubahan dari SG Admin lebih cepat terlihat.
- Menyesuaikan tampilan kartu produk beranda dengan batas lebih netral dan teks yang lebih terbaca di atas gambar.
- Memperbarui informasi saldo virtual akun demo di hero dari $5.000 menjadi $10.000 dalam bahasa Indonesia dan Inggris.
- Merapikan `.env` lokal dengan menghapus konfigurasi fitur yang tidak digunakan dan Client Area yang dinonaktifkan di proyek ini.
- Menghapus empat variabel dari `.env` lokal yang hasil konfigurasinya tidak digunakan oleh fitur proyek.
- Mengabaikan folder `/deploy` di Git agar berkas deployment lokal tidak ikut tercatat dalam repository.
- Menyesuaikan konfigurasi `.env` lokal untuk domain reguler, mode produksi, origin SG Admin, dan endpoint produksi yang diperlukan.
- Merapikan `.env` lokal sesuai variabel yang direferensikan proyek dan menghapus konfigurasi lama yang tidak ditemukan penggunaannya, sambil mempertahankan nilai konfigurasi aktif.
- Melengkapi dan mengelompokkan variabel yang digunakan aplikasi dalam `.env.example` agar konfigurasi deployment dan integrasi lebih mudah ditemukan tanpa menyalin nilai rahasia.
- Mendokumentasikan konfigurasi produksi minimum serta kebutuhan variabel publik saat build di `.env.example`.
- Menyesuaikan kartu Wakil Pialang dengan desain berinisial, gradien gelap, aksen emas, dan badge status agar selaras dengan desain yang diminta.
- Mendesain ulang profil kantor dan daftar Wakil Pialang menjadi panel beraksen emas dan kartu responsif agar identitas, nomor izin, dan status lebih mudah dibaca.
- Menghapus halaman reguler dan halaman pendukung yang ditambahkan setelah katalog produk, serta memulihkan navigasi dan route produk serta wakil pialang sebelumnya.
- Mengurutkan produk berdasarkan tanggal penambahan dari yang terlama sebelum memilih tiga produk per kategori, termasuk data dari seluruh halaman API.
- Menggeser gambar kartu produk lebih ke kanan agar tidak terlalu menutupi teks.
- Memusatkan gambar kartu produk secara vertikal di sisi kanan agar posisinya lebih seimbang.
- Menata ulang tabel spesifikasi produk dengan warna baris, penekanan kolom pertama, dan aksen judul agar lebih mudah dibaca sambil mempertahankan batas sel dan responsivitas mobile.
- Mengembalikan garis batas pada setiap sel tabel spesifikasi produk agar struktur kolom dan baris lebih jelas, dengan tampilan mobile tetap responsif.
- Membatasi tampilan produk halaman utama menjadi maksimal tiga produk per kategori, dengan slider pada mobile dan grid pada tablet serta desktop.
- Menambahkan label navigasi slider produk pada locale Indonesia dan Inggris untuk aksesibilitas.
- Mengarahkan tombol hero registrasi dan login demo langsung ke situs masing-masing, serta menyesuaikan judul locale Indonesia dan Inggris dengan tujuan tombol.
- Menyesuaikan tabel spesifikasi produk untuk layar kecil dengan lebar yang lebih ringkas, teks terbungkus, dan area gulir yang dapat diakses melalui keyboard.
- Menambahkan petunjuk gulir tabel spesifikasi dalam locale Indonesia dan Inggris agar pengguna mobile mengetahui cara melihat seluruh kolom.
- Memindahkan deskripsi dan gambar produk ke dalam PageHeroBanner pada halaman detail agar menyatu dengan latar hero, sementara spesifikasi tetap berada di bagian bawah.
- Menyederhanakan body detail produk dengan menghapus bingkai pada area deskripsi, gambar, dan tabel spesifikasi agar tampilan terasa lebih lega.
- Merapikan body halaman detail produk dengan tata letak deskripsi dan gambar yang responsif serta tabel spesifikasi yang lebih mudah dibaca di desktop dan mobile.
- Memecah section produk halaman utama menjadi atom gambar, molecule kartu dan kategori, organism section, serta tipe produk bersama agar lebih mudah dirawat tanpa mengubah tampilan atau sumber data.
- Mengambil data kartu produk halaman utama dari API produk SG Admin dengan autentikasi server-side, serta menampilkan status kosong ketika katalog tidak tersedia.
- Menghapus data produk statis dari locale Indonesia dan Inggris agar informasi kartu mengikuti sumber API.
- Menggeser visual dan kartu mengambang hero ke kanan pada tampilan mobile agar posisinya lebih sesuai.
- Mengganti empat gambar kartu mengambang di hero dengan aset dari folder floating-image dan menyesuaikan dimensi aslinya untuk tampilan mobile dan desktop.
- Memindahkan label tombol buka akun demo di hero ke locale Indonesia dan Inggris agar mengikuti bahasa yang dipilih.
- Menyelaraskan lima keunggulan pada bagian Mengapa Pilih Solid Gold Berjangka dalam locale Indonesia dan Inggris agar informasi yang ditampilkan konsisten.
- Memindahkan navigasi jaringan kantor Wakil Pialang dari body direktori ke slot konten header agar pemilihan kantor tersedia langsung pada area hero.
- Memecah implementasi halaman Wakil Pialang Berjangka ke lapisan atom, molecule, organism, tipe domain, dan data server-only agar route hanya menangani locale, metadata, serta komposisi halaman.
- Memindahkan seluruh copy halaman Wakil Pialang Berjangka dari komponen route ke modul locale Indonesia dan Inggris agar mengikuti sistem i18n project dan tetap tersinkron secara type-safe.
- Menyederhanakan desain halaman Wakil Pialang Berjangka menjadi register editorial yang minim ornamen, dengan tab kantor, informasi kontak, tautan peta, dan daftar identitas responsif yang dipisahkan garis tipis.
- Mengalihkan sumber data halaman Wakil Pialang Berjangka ke API SG Admin `/api/v1/wakil-pialang-berjangka`, termasuk daftar kategori kantor dan filter berbasis slug.
- Menggunakan header autentikasi server-side SG Admin pada request Wakil Pialang agar API key tidak terekspos ke browser.
- Merapikan `.env` dengan menghapus 13 variabel warisan aplikasi/deployment lain yang tidak memiliki referensi di source maupun konfigurasi project, tanpa mengubah variabel aktif.

### Fixed
- Mengganti nama empat aset hero menjadi nama sederhana agar pemuatan gambar konsisten pada deployment.
- Memuat gambar detail produk melalui image proxy tanpa optimasi Next.js agar tidak tertolak oleh proteksi API.
- Memuat gambar kartu produk langsung melalui image proxy agar tidak ditolak saat Next.js mengoptimalkan gambar tanpa header permintaan browser.
- Memperbaiki struktur tabel spesifikasi produk yang memiliki beberapa tabel serta sel gabungan agar kolom dan baris tetap sejajar.
- Memperbaiki tabel spesifikasi dua kolom di mobile agar mengikuti lebar layar dan teks tidak terpotong; tabel dengan lebih banyak kolom tetap dapat digeser.
- Memperbaiki sumber produk halaman utama agar menggunakan endpoint JFX dan SPA, termasuk nama, deskripsi sesuai locale, dan URL gambar dari respons API; gangguan satu kategori tidak menyembunyikan kategori lainnya.
- Menghaluskan transisi bagian bawah gambar hero mobile dan memindahkan gradient ke belakang konten agar tombol tetap terlihat jelas serta hero menyatu dengan bagian berikutnya.
- Merapikan tampilan hero pada perangkat mobile dengan memberi ruang untuk navigasi tetap, mengurangi ruang kosong, dan menyesuaikan posisi gambar serta kartu mengambang dengan lebar layar.
- Memperbaiki ID kartu keamanan dan transparansi yang sebelumnya duplikat agar setiap kartu memiliki key dan pemetaan ikon sendiri.
- Memperbaiki layering transisi gradient antara hero dan direktori Wakil Pialang agar dekorasi tidak menangkap interaksi dan konten tetap berada di atasnya.
- Menyesuaikan pemetaan data Wakil Pialang dengan kontrak API baru (`no_identitas`, `status_label`, dan `category`) agar nama kantor, nomor izin, dan status kembali tampil dengan benar.
- Mengganti route `/[locales]/wakil-pialang-berjangka` yang sebelumnya hanya menampilkan halaman kosong dengan daftar perwakilan resmi yang responsif dan dapat diakses.
