import type { RegulerInfoPagesContent } from "../../shared/reguler-info-pages";

export const idRegulerInfoPagesContent: RegulerInfoPagesContent = {
  labels: {
    openAccount: "Online Account Registration",
    demoLogin: "Login Akun Demo",
    liveLogin: "Login Akun Live",
  },
  pages: {
    karakteristikProduk: {
      meta: {
        title: "Karakteristik Produk",
        description:
          "Karakteristik produk perdagangan berjangka PT. Solid Gold Berjangka: efisiensi modal, transaksi dua arah, volatilitas tinggi, dan likuiditas tinggi.",
      },
      hero: {
        eyebrow: "Produk",
        title: "Karakteristik Produk",
        description:
          "Pahami keunggulan dan ciri khas produk perdagangan berjangka sebelum memulai transaksi.",
      },
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Efisiensi Modal",
              body: "Dalam bertransaksi menggunakan Margin Trading (dana jaminan), para investor dapat melakukan transaksi yang besar dengan modal yang relatif kecil. Dengan dana minimal sebesar 10% dari nilai total transaksi, tidak perlu dana 100%.",
            },
            {
              title: "Fleksibilitas Transaksi",
              body: "Transaksi dua arah yang memungkinkan para investor mendapatkan peluang pada saat pasar bergerak naik maupun turun.",
            },
            {
              title: "Pergerakan Harga Sangat Fluktuatif",
              body: "Pergerakan harga harian yang besar dengan range berkisar 100 - 500 poin memberikan peluang keuntungan yang besar dengan kontrak size US $5 / point dan hanya dibebankan biaya transaksi / fee sebesar 3 (tiga) poin ditambah PPN 11%.",
            },
            {
              title: "Likuiditas Tinggi",
              body: "Produk ini memiliki tingkat likuiditas yang sangat tinggi, sehingga para investor dapat melakukan transaksi beli dan jual kapan saja selama market berjalan, tanpa harus ada antrian di harga pasar.",
            },
          ],
        },
        {
          type: "cards",
          title: "Jenis Investasi",
          items: [
            {
              title: "Fixed Rate / Kurs Tetap",
              points: [
                "US $1 = Rp. 10.000 (kurs tetap)",
                "Terhindar dari risiko kerugian akibat fluktuasi USD terhadap Rupiah",
              ],
            },
            {
              title: "Floating Rate / Kurs Berjalan",
              points: [
                "US $1 = US $1 (sesuai kurs USD terhadap Rupiah)",
                "Tidak dikenakan fee dari pembukaan dan penarikan dana USD baik sebagian atau seluruhnya",
              ],
            },
          ],
        },
      ],
    },

    ilustrasiTransaksi: {
      meta: {
        title: "Ilustrasi Transaksi",
        description:
          "Rumus perhitungan transaksi, biaya roll over, serta contoh transaksi day trade dan overnight di PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Produk",
        title: "Ilustrasi Transaksi",
        description:
          "Lihat rumus perhitungan, biaya, dan contoh transaksi untuk memahami potensi laba dan rugi.",
      },
      blocks: [
        {
          type: "formula",
          title: "Rumus Perhitungan Transaksi",
          formula:
            "[ (Selling Price – Buying Price) x Contract Size x n Lot ] – [ (Facility Fee + VAT) x n Lot ]",
          notesTitle: "Keterangan",
          notes: [
            "Contract Size (nilai kontrak): US $5 per poin untuk kontrak gulir berkala indeks saham; 100 troy ounce untuk kontrak gulir harian emas Loco London.",
            "n Lot: banyaknya lot yang ditransaksikan.",
            "Facility Fee (biaya komisi): US $15 per lot per sisi (beli/jual). Total biaya komisi US $30 untuk 1 lot settlement.",
            "VAT (Pajak Pertambahan Nilai): 11% dari biaya komisi (US $1.65/lot/side). Total biaya VAT US $3.3 untuk 1 lot settlement.",
          ],
        },
        {
          type: "table",
          title: "Biaya Roll Over (Overnight)",
          columns: ["Kontrak", "Biaya per Malam"],
          rows: [
            ["HKK5U dan HKK50", "US $3 / malam"],
            ["JPK5U dan JPK50", "US $2 / malam"],
            ["XULF dan XUL10", "US $5 / malam"],
          ],
        },
        {
          type: "callout",
          title: "Contoh Transaksi Day Trade - Keuntungan",
          paragraphs: [
            "Seorang nasabah mengambil posisi beli HKK5U pada level 24.600 poin sebanyak 2 lot. Kemudian investor menutup/melikuidasi posisi beli 2 lot tersebut ketika indeks berada pada level 24.700 poin.",
          ],
          results: [{ label: "P/L", value: "US $933.4 (laba bersih)", tone: "profit" }],
        },
        {
          type: "callout",
          title: "Contoh Transaksi Day Trade - Kerugian",
          paragraphs: [
            "Seorang investor memprediksi Indeks Hang Seng akan mengalami penguatan, maka ia membuka posisi beli HKK5U pada level 24.600 poin sebanyak 1 lot. Namun prediksinya salah dan ia menutup posisi di 24.550 poin.",
          ],
          results: [{ label: "P/L", value: "– US $283.3 (rugi bersih)", tone: "loss" }],
        },
        {
          type: "callout",
          title: "Contoh Transaksi Overnight",
          paragraphs: [
            "Seorang investor memperkirakan Indeks Nikkei 225 akan melemah, maka pada tanggal 10 Juni investor membuka posisi jual di level 14.850 poin sebanyak 2 lot. Dua hari kemudian (12 Juni), investor menutup posisi jual 2 lot tersebut ketika indeks berada pada level 14.650 poin.",
          ],
          results: [
            { label: "Keuntungan kotor", value: "US $1933.4" },
            { label: "Roll over fee (US $2 x 2 lot x 2 malam)", value: "– US $8", tone: "loss" },
            { label: "Keuntungan bersih", value: "US $1925.4", tone: "profit" },
          ],
        },
        {
          type: "table",
          title: "Kode & Jenis Kontrak",
          columns: ["Kode Kontrak", "Dasar", "Kategori Rates", "Jenis Kontrak"],
          rows: [
            ["GU1010_BBJ", "GBP/USD", "DIRECT", "Kontrak Gulir Harian Harga Spot Great Britain Pound Sterling (GBP) terhadap US Dollar (USD)"],
            ["EU1010_BBJ", "EUR/USD", "DIRECT", "Kontrak Gulir Harian Harga Spot Euro (EUR) terhadap US Dollar (USD)"],
            ["AU1010_BBJ", "AUD/USD", "DIRECT", "Kontrak Gulir Harian Harga Spot Australian Dollar (AUD) terhadap US Dollar (USD)"],
            ["UC1010_BBJ", "USD/CHF", "INDIRECT", "Kontrak Gulir Harian Harga Spot US Dollar (USD) terhadap Swiss Franc (CHF)"],
            ["UJ1010_BBJ", "USD/JPY", "INDIRECT", "Kontrak Gulir Harian Harga Spot US Dollar (USD) terhadap Japanese Yen (JPY)"],
          ],
        },
        {
          type: "callout",
          title: "Ilustrasi Perhitungan Transaksi",
          points: [
            "Untuk DIRECT RATES: P/L = (Harga Jual - Harga Beli) x Contract Size x Jumlah Lot",
            "Untuk INDIRECT RATES: P/L = (Harga Jual - Harga Beli) x Contract Size x Jumlah Lot",
          ],
        },
        {
          type: "callout",
          title: "Contoh Transaksi EU1010_BBJ (Daytrade)",
          paragraphs: [
            "Nasabah beli EU1010_BBJ di 1.3530 sebanyak 2 lot, kemudian jual di 1.3540. Jika harga turun ke 1.3525, posisi berada dalam kerugian.",
          ],
          results: [
            { label: "Jual di 1.3540", value: "$133.4 (laba)", tone: "profit" },
            { label: "Jika turun ke 1.3525", value: "– $166.6 (rugi)", tone: "loss" },
          ],
        },
        {
          type: "callout",
          title: "Contoh Transaksi UJ1010_BBJ (Daytrade)",
          paragraphs: [
            "Nasabah jual UJ1010_BBJ di 102.20 sebanyak 1 lot, kemudian tutup di 102.12. Jika harga naik ke 102.27, posisi berada dalam kerugian.",
          ],
          results: [
            { label: "Tutup di 102.12", value: "$45.04 (laba)", tone: "profit" },
            { label: "Jika naik ke 102.27", value: "– $101.74 (rugi)", tone: "loss" },
          ],
        },
      ],
    },

    petunjukTransaksi: {
      meta: {
        title: "Petunjuk Transaksi",
        description:
          "Petunjuk menyampaikan amanat transaksi secara online atau telepon di PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Prosedur",
        title: "Petunjuk Transaksi",
        description:
          "Nasabah dapat menyampaikan amanat secara online dan atau melalui telepon.",
      },
      blocks: [
        {
          type: "callout",
          paragraphs: [
            "Nasabah dapat menyampaikan amanat secara online dan atau melalui telepon (dianjurkan nasabah melakukan simulasi terlebih dulu sebelum menggunakan real online trading).",
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Akses Online Trading",
              body: "Nasabah yang menyampaikan amanat secara online akan memperoleh User ID dan Password dari PT. Solid Gold Berjangka.",
            },
            {
              title: "Syarat Transaksi Online",
              points: [
                "Tersedia jaringan internet",
                "Akses ke etrade.sgberjangka.com/login",
                "Nasabah sudah mempunyai User ID dan Password dari PT. Solid Gold Berjangka (Password dapat diganti oleh nasabah)",
              ],
            },
            {
              title: "Panduan Lengkap",
              body: "Untuk panduan lebih lengkap tentang penggunaan platform trading online, silakan hubungi customer service kami atau kunjungi kantor cabang terdekat.",
            },
          ],
        },
      ],
      cta: {
        title: "Coba Simulasi Terlebih Dahulu",
        body: "Gunakan akun demo untuk berlatih sebelum bertransaksi di akun live.",
      },
    },

    prosedurPenarikan: {
      meta: {
        title: "Prosedur Penarikan Dana",
        description:
          "Informasi umum, tahapan, ketentuan rekening tujuan, dan waktu proses penarikan dana nasabah PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Prosedur",
        title: "Prosedur Penarikan Dana",
        description: "Tahapan dan ketentuan penarikan dana nasabah.",
      },
      blocks: [
        {
          type: "callout",
          title: "Informasi Umum",
          paragraphs: [
            "Penarikan dana dapat dilakukan kapan saja oleh para nasabah selama jam perbankan dengan kondisi tidak melebihi effective margin yang ada di dalam laporan transaksi harian nasabah (statement report).",
          ],
        },
        {
          type: "steps",
          title: "Tahapan Penarikan Dana",
          items: [
            {
              title:
                "Nasabah masuk ke menu withdrawal pada akun transaksi riil-nya untuk melakukan permohonan penarikan dana dengan mengikuti syarat dan ketentuan yang berlaku.",
            },
            { title: "Nasabah mengisi formulir permohonan penarikan dana." },
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Ketentuan Rekening Tujuan",
              body: "Penarikan dana nasabah hanya dapat ditransfer ke rekening atas nama nasabah bersangkutan yang tertera pada Dokumen Aplikasi Pembukaan Rekening Nasabah.",
            },
            {
              title: "Waktu Proses",
              body: "Proses penarikan dana melalui mekanisme standar membutuhkan waktu tiga hari kerja (T+3), namun PT. Solid Gold Berjangka mengupayakan agar proses penarikan dana hanya satu hari kerja (T+1).",
            },
          ],
        },
      ],
    },

    prosedurRegol: {
      meta: {
        title: "Prosedur Registrasi Online",
        description:
          "Langkah registrasi online pembukaan rekening nasabah PT. Solid Gold Berjangka, dari akun demo hingga akun live.",
      },
      hero: {
        eyebrow: "Prosedur",
        title: "Prosedur Registrasi Online",
        description:
          "Ikuti tahapan berikut untuk membuka rekening transaksi di PT. Solid Gold Berjangka.",
      },
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Membuka Website Perusahaan",
              body: "Akses website resmi PT. Solid Gold Berjangka untuk memulai proses registrasi online.",
            },
            {
              title: "Registrasi Demo Account",
              points: ["Input data", "Demo account", "Melakukan simulasi transaksi"],
            },
            {
              title: "Input Dokumen Perjanjian",
              points: [
                "Aplikasi Perjanjian",
                "Dokumen Pemberitahuan Adanya Risiko (DPAR)",
                "Perjanjian Pemberian Amanat (PPA)",
                "Mekanisme Transaksi (Trading Rules)",
                "Input data pendukung (KTP dan lainnya)",
              ],
            },
            {
              title: "Verifikasi Data",
              body: "Wakil Pialang yang ditunjuk melakukan verifikasi data calon nasabah, yaitu:",
              points: [
                "Data pribadi calon nasabah",
                "Penyetoran dana calon nasabah ke rekening terpisah pialang",
                "Kirim slip transfer bank melalui fax/email ke PT. Solid Gold Berjangka",
              ],
            },
            {
              title: "Konfirmasi Dana",
              body: "Nasabah mendapat konfirmasi bahwa dana/margin tersebut sudah dikreditkan di Rekening Terpisah PT. Solid Gold Berjangka.",
            },
            {
              title: "Nomor Account",
              body: "Nasabah mendapatkan nomor account dari PT. Solid Gold Berjangka yang sudah teregistrasi.",
            },
            {
              title: "Tanda Terima",
              body: "Nasabah mendapatkan Tanda Terima (Official Receipt) dari PT. Solid Gold Berjangka.",
            },
            {
              title: "Mulai Bertransaksi",
              body: "Apabila semua prosedur di atas telah dipenuhi, nasabah akan dikonfirmasi untuk dapat melakukan transaksi setelah menerima User ID dan Password online trading yang dikirimkan melalui SMS dan email nasabah sesuai yang tertera di dalam aplikasi pembukaan rekening.",
            },
          ],
        },
        {
          type: "table",
          title: "Rekening Tujuan Transfer",
          intro:
            "Transfer dana hanya ke Segregated Account resmi PT. Solid Gold Berjangka berikut. Jangan mengirim dana ke rekening pribadi.",
          columns: ["Bank", "No. Rekening IDR", "No. Rekening USD"],
          rows: [
            ["Bank BCA Cabang Sudirman, Jakarta", "035-311-596-8", "035-311-797-9"],
            ["Bank CIMB Niaga Cabang Gajahmada, Jakarta", "800-12-97469-00", "800-00-06176-40"],
            ["Bank BNI Cabang Gambir, Jakarta", "017-068-2500", "017-075-0300"],
            ["Bank Mandiri Cabang Imam Bonjol, Jakarta", "122-000-665-6063", "122-000-665-60710"],
            ["Bank Artha Graha Cabang KPO Sudirman, Jakarta", "107-996-4073", "-"],
            ["Bank Rakyat Indonesia KC Ciputat, Tangerang", "038201001510301", "-"],
          ],
        },
      ],
      cta: {
        title: "Siap Membuka Rekening?",
        body: "Mulai registrasi online atau coba akun demo terlebih dahulu.",
      },
    },

    tampilanTransaksiOnline: {
      meta: {
        title: "Tampilan Transaksi Online",
        description:
          "Hal yang perlu diketahui dan peringatan yang sering muncul saat menggunakan online trading PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Edukasi",
        title: "Tampilan Transaksi Online",
        description:
          "Pahami mekanisme harga, kendala umum, dan pesan peringatan pada platform online trading.",
      },
      blocks: [
        {
          type: "cards",
          title: "Hal yang Perlu Diketahui dalam Online Trading",
          items: [
            {
              title: "Updating Harga",
              body: "Pergantian harga pada sistem online trading mengacu pada harga Winquote yang bergerak, yaitu harga terakhir (last trade) ditambah 10 poin untuk beli dan dikurangi 10 poin untuk jual (spread 20 poin).",
            },
            {
              title: "Price Has Change",
              body: "\"Price has change\" dalam pengambilan harga dapat terjadi pada setiap nasabah atau kuasa nasabah yang bertransaksi di online trading maupun manual trading, karena harga bergerak terus-menerus mengikuti pergerakan harga di Winquote.",
            },
            {
              title: "Harga Eksekusi Berbeda dengan Harga Done",
              body: "Dalam bertransaksi menggunakan online trading ataupun manual trading (e-quote), harga yang dieksekusi sering berbeda. Hal ini wajar terjadi karena harga yang muncul bergerak terus mengacu pada Winquote (up to date).",
            },
            {
              title: "Kendala yang Sering Timbul dalam Online Trading",
              body: "Kendala saat bertransaksi online dapat disebabkan oleh perangkat keras dan perangkat lunak yang digunakan, maupun pengguna yang belum memahami mekanisme transaksi online. Disarankan melakukan simulasi pada akun demo terlebih dahulu dan menggunakan koneksi internet yang cepat dan stabil.",
            },
            {
              title: "Loading Lama Saat Eksekusi Harga",
              body: "Loading yang lama dapat terjadi saat market ramai atau koneksi internet terputus. Silakan refresh online trading atau hubungi bagian dealing.",
              points: [
                "Market sedang hectic, sehingga transaksi menggunakan \"Market Order\" akan mengalami kesulitan. Gunakan \"Limit Order\" dan \"Stop Order\".",
                "Koneksi internet loss dan tidak stabil, sehingga perlu dipastikan jaringan internet yang digunakan baik.",
              ],
            },
          ],
        },
        {
          type: "cards",
          title: "Peringatan dalam Online Trading",
          items: [
            {
              title: "Insufficient Margin",
              body: "Peringatan \"Insufficient Margin\" muncul apabila Effective Margin akun Anda tidak mencukupi untuk jumlah lot transaksi yang diambil. Margin juga dapat tertahan oleh Limit Order atau Stop Order yang masih aktif.",
            },
            {
              title: "Price Too Close / Price Too Far",
              body: "Terjadi saat menggunakan limit atau stop order. Jika harga order berada kurang dari 10 poin dari harga screen etrade atau lebih dari 500 poin dari harga screen, akan muncul peringatan \"Price too close / Price too far\".",
            },
            {
              title: "Validation Error",
              body: "Terjadi karena adanya kesalahan pengguna, misalnya ada kolom yang belum terisi atau pengambilan posisi melebihi batas transaksi lot (di atas 20 lot).",
            },
            {
              title: "Invalid Stop Order",
              body: "Terjadi saat menggunakan Limit Order untuk pengambilan posisi baru dengan level yang tidak sesuai. Contoh: Sell New Limit di 20490 padahal harga Sell pada screen etrade adalah 20593.",
            },
          ],
        },
      ],
    },
  },
};
