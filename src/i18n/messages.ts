export type Locale = "id" | "en";

type Messages = Record<string, string>;

export const messages: Record<Locale, Messages> = {
  id: {
    "common.readMore": "Pelajari Lebih Lanjut",
    "common.learnMore": "Pelajari Lebih Lanjut",
    "common.details": "Detail",
    "common.all": "Semua",
    "common.id": "ID",
    "common.noDataAlt": "Tidak ada data",
    "common.hqJakarta": "PT. Solid Gold Berjangka - Jakarta",
    "common.company": "PT. Solid Gold Berjangka",
    "common.loadingTitle": "Memuat...",
    "common.errorTitle": "Terjadi Kesalahan",
    "common.loading": "Memuat data...",
    "common.search": "Cari berita...",
    "common.backHome": "Kembali ke Beranda",
    "common.errorLoad": "Gagal memuat data.",
    "common.errorNews": "Gagal memuat berita.",
    "common.notFound": "Halaman tidak ditemukan",
    "common.notFoundDesc":
      "Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.",
    "common.back": "Kembali",
    "common.dataNotFound": "Data tidak ditemukan.",

    "nav.home": "Beranda",
    "nav.about": "Tentang Kami",
    "nav.mainSite": "Website Utama",
    "nav.products": "Produk",
    "nav.procedures": "Prosedur",
    "nav.news": "Berita",
    "nav.analysis": "Analisis",
    "nav.education": "Edukasi",
    "nav.contact": "Kontak",
    "privacy.title": "Kebijakan Privasi",
    "privacy.intro":
      "Kebijakan Privasi ini menjelaskan bagaimana PT. Solid Gold Berjangka mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan website dan layanan kami.",
    "nav.register": "Register Now",
    "nav.about.profile": "Profil Perusahaan",
    "nav.about.legal": "Legalitas Bisnis",
    "nav.about.broker": "Wakil Pialang Berjangka",
    "nav.about.services": "Fasilitas & Layanan",
    "nav.about.achievements": "Pencapaian",
    "nav.about.general": "Umum",
    "nav.about.general.informasi": "Informasi",
    "nav.about.general.video": "Video",
    "nav.about.reason": "Alasan Anda Memilih Kami",
    "nav.products.multilateral": "Multilateral (JFX)",
    "nav.products.bilateral": "Bilateral (SPA)",
    "nav.products.liveQuote": "Live Quote",
    "nav.products.characteristics": "Karakteristik Produk",
    "nav.products.illustration": "Ilustrasi Transaksi",
    "nav.procedures.guide": "Petunjuk Transaksi",
    "nav.procedures.withdrawal": "Prosedur Penarikan",
    "nav.procedures.regol": "Prosedur Registrasi Online",
    "nav.news.market": "Market",
    "nav.news.index": "Index",
    "nav.news.commodity": "Commodity",
    "nav.news.currencies": "Currencies",
    "nav.news.economy": "Ekonomi",
    "nav.news.global": "Global & Ekonomi",
    "nav.news.fiscal": "Fiscal & Moneter",
    "nav.analysis.market": "Analisis Market",
    "nav.analysis.calendar": "Kalender Ekonomi",
    "nav.analysis.pivot": "Pivot & Fibonacci",
    "nav.analysis.historical": "Historical Data",
    "nav.education.terms": "Istilah Dalam Transaksi Online",
    "nav.education.loco": "Loco London Gold",
    "nav.education.symbols": "Simbol Index",
    "nav.education.screen": "Tampilan Transaksi Online",
    "nav.education.system": "Transaksi Sistem Online",
    "education.terms.title": "Istilah Dalam Transaksi Online",
    "education.terms.marketOrder.title": "Market Order",
    "education.terms.marketOrder.desc":
      "Adalah pengambilan posisi jual/beli yang harus segera dilaksanakan/dieksekusi seketika itu juga pada harga terbaik yang bisa diperoleh saat itu. Order ini digunakan untuk membuka posisi baru atau untuk melikuidasi posisi yang ada.",
    "education.terms.limitOrder.title": "Limit Order",
    "education.terms.limitOrder.desc":
      "Adalah pesanan pengambilan harga dengan batasan maksimum/minimum tertentu, dimana limit order ini dapat digunakan untuk membuka posisi baru (open position) dan melikuidasi posisi yang ada (liquidation position).",
    "education.terms.stopOrder.title": "Stop Order",
    "education.terms.stopOrder.p1":
      "Stop Order (juga disebut stop loss order) adalah order digunakan ketika harga diatas atau dibawah dari batas harga yang telah ditentukan (stop price). Ketika stop price yang ditentukan tercapai, maka stop order tersebut berubah menjadi market order (tidak lagi limit). Order ini digunakan untuk membatasi kerugian/mengurangi resiko atau untuk melindungi keuntungan atas posisi yang terbuka.",
    "education.terms.stopOrder.p2":
      "Dengan adanya stop order, pengguna/nasabah tidak harus selalu aktif memonitor pergerakan harga karena stop order akan berfungsi secara otomatis sesuai dengan batas harga yang diinginkan pengguna/nasabah. Dalam situasi fluktuasi harga sangat cepat, stop order yang tereksekusi (menjadi market order) kemungkinan perolehannya bisa berbeda dengan stop price.",
    "education.terms.stopOrder.listTitle": "Stop Order terdiri dari:",
    "education.terms.sellStop.title": "Sell Stop Order",
    "education.terms.sellStop.desc":
      "Adalah instruksi jual di harga terbaik apabila harga berada dibawah stop price. Order ini selalu berada dibawah harga market yang sedang berjalan. Misalnya seorang nasabah hendak mempertahankan posisi beli produk indeks saham di level 25.050 tetapi khawatir bila harganya jatuh maka ia dapat menempatkan sell stop order di level tertentu sesuai keinginannya misal di 25.010. Ketika indeks saham jatuh melampaui 25.010, maka sell stop order tereksekusi (menjadi market order). Dengan demikian nasabah dapat membatasi kerugian atau melindungi atas posisi yang dimilikinya.",
    "education.terms.buyStop.title": "Buy Stop Order",
    "education.terms.buyStop.desc":
      "Instruksi beli di harga terbaik yang juga digunakan untuk membatasi kerugian atas posisi jual yang ada ketika harga berada diatas stop price dari posisi jual tersebut.",
    "education.terms.stopLimit.title": "Stop Limit Order",
    "education.terms.stopLimit.desc":
      "Merupakan kombinasi antara stop order dan limit order. Ketika stop price tercapai, stop limit order berubah menjadi limit order beli/jual di tingkat tidak lebih/kurang dari batas harga yang ditentukan sendiri. Stop limit order digunakan sebagai metode yang efektif dalam memulai atau membuka posisi yang baru (jual atau beli). Akan tetapi karena cara itu bukan alat pelindung yang cukup baik, sebaiknya hanya digunakan terutama jika pasar dalam keadaan sepi atau kurang aktif.",
    "education.terms.oco.title": "One Cancel the Others (OCO)",
    "education.terms.oco.desc":
      "Merupakan penempatan order pada dua limit price. Apabila limit price pertama dapat dilaksanakan/dieksekusi maka limit price kedua akan secara otomatis dibatalkan.",
    "education.terms.gtc.title": "Good Till Cancel (GTC)",
    "education.terms.gtc.desc":
      "Adalah masa tenggang waktu berlakunya limit order hingga hari berikutnya apabila limit order tersebut belum tereksekusi (pending), dan limit order tersebut dapat dibatalkan (cancel).",

    "footer.products": "Produk",
    "footer.news": "Berita",
    "footer.privacy": "Kebijakan Privasi",
    "footer.about": "Tentang Kami",
    "footer.procedures": "Prosedur",
    "footer.company": "Perusahaan",
    "footer.guides": "Panduan",
    "footer.market": "Market",
    "footer.economy": "Ekonomi",
    "footer.brokerNote":
      "Broker resmi yang diawasi oleh Bappebti dan Bursa Berjangka.",
    "footer.rights": "© {year} Solid Gold Berjangka. Hak cipta dilindungi.",
    "footer.quickLinks": "Tautan Cepat",
    "footer.contactTitle": "Kontak Kami",
    "footer.mapTitle": "Peta Lokasi",
    "footer.address":
      "TCC Batavia, Tower One Lt. 10, Jl. K.H. Mas Mansyur Kav. 126, Jakarta Pusat 10220",
    "footer.emailValue": "corporate@solidgold.co.id",
    "footer.faxValue": "021-29675089",
    "footer.phoneValue": "021-29675088",
    "footer.attention.title": "Perhatian!",
    "footer.attention.body":
      "Manajemen PT Solid Gold Berjangka (PT SGB) menghimbau seluruh masyarakat untuk selalu waspada terhadap upaya penipuan berkedok investasi yang mengatasnamakan PT SGB melalui media elektronik maupun media sosial. Pastikan setiap proses transfer dana untuk transaksi Perdagangan Berjangka dilakukan hanya ke rekening Segregated Account atas nama PT Solid Gold Berjangka, bukan ke rekening pribadi siapa pun.",
    "footer.logoKomdigiAlt": "Logo Komdigi",
    "footer.logoKanAlt": "Logo KAN HACCP",
    "footer.mapIframeTitle": "Google Maps - PT. Solid Gold Berjangka",

    "common.emptyData": "Tidak ada data.",
    "common.invalidFormat": "Format data tidak valid",
    "common.close": "Tutup",

    "analysis.calendar": "Kalender Ekonomi",
    "analysis.pivot": "Pivot & Fibonacci",
    "analysis.historical": "Historical Data",
    "analysis.pivotTab": "Pivot",
    "analysis.fibTab": "Fibonacci",
    "analysis.calculatePivot": "Hitung Pivot",
    "analysis.level": "Level",
    "analysis.classic": "Classic",
    "analysis.woodie": "Woodie",
    "analysis.camarilla": "Camarilla",
    "analysis.upTrend": "Up Trend",
    "analysis.downTrend": "Down Trend",
    "analysis.priceALow": "Price A (Low)",
    "analysis.priceBHigh": "Price B (High)",
    "analysis.priceAHigh": "Price A (High)",
    "analysis.priceBLow": "Price B (Low)",
    "analysis.lowPrice": "Harga rendah",
    "analysis.highPrice": "Harga tinggi",
    "analysis.retracement": "Retracement Levels",
    "analysis.extension": "Extension Levels",
    "analysis.open": "Open",
    "analysis.high": "High",
    "analysis.low": "Low",
    "analysis.close": "Close",

    "services.title": "Fasilitas & Layanan",
    "services.items.1.title": "Wakil Pialang Berjangka Profesional",
    "services.items.1.desc":
      "Perusahaan memiliki Wakil Pialang Berjangka profesional yang selalu siap memberikan pelayanan kepada calon nasabah / nasabah, berupa edukasi, prosedur administrasi dan mekanisme transaksi Sistem Perdagangan Alternatif di Bursa Berjangka Jakarta.",
    "services.items.2.title": "Fasilitas Online Trading & Demo Account",
    "services.items.2.desc":
      "Fasilitas ini akan memberikan kemudahan bagi setiap nasabah dalam bertransaksi secara online melalui jaringan internet. Kami juga menyediakan Demo Account atau Simulasi Transaksi agar calon nasabah dapat lebih memahami dan menguasai fungsi-fungsi transaksi. Anda cukup menghubungi customer care kami.",
    "services.items.3.title": "Pelaporan Transaksi Setiap Hari",
    "services.items.3.desc":
      "Setiap hari nasabah akan mendapat Laporan Transaksi Nasabah yang berisikan catatan transaksi dan perkembangan investasi yang telah dilakukan oleh nasabah, baik via e-mail, fax, maupun melalui surat/pos. Catatan atau rekam transaksi tersebut juga dapat diakses langsung melalui online trading platform dengan memilih menu utama Temporary Statement/Daily Statement.",
    "services.items.4.title": "Penarikan Dana (Withdrawal)",
    "services.items.4.desc":
      "Penarikan dana dapat dilakukan sewaktu-waktu oleh nasabah apabila nasabah menghendakinya. PT. Solidgold Berjangka mengupayakan agar penarikan dana dapat diproses satu hari kerja (T+1).",
    "services.items.5.title": "Rekening Terpisah (Segregated Account)",
    "services.items.5.desc":
      "Semua dana investor ditempatkan pada Segregated Account pialang yang ada di Bank Penyimpanan yang disetujui oleh Bappebti yaitu Bank BCA, Bank CIMB Niaga, Bank Mandiri, Bank BNI dan Bank Artha Graha yang terpisah dengan aset-aset perusahaan. Dana tersebut hanya dipergunakan untuk keperluan transaksi nasabah bersangkutan.",
    "services.items.6.title": "Fleksibilitas Transaksi",
    "services.items.6.desc":
      "Transaksi dua arah memungkinkan bagi para investor untuk mendapatkan keuntungan pada saat market bergerak naik maupun turun. Apalagi likuiditas produk ini sangat tinggi, sehingga memungkinkan mengambil keuntungan optimal.",
    "services.items.7.title": "Sarana Penyelesaian Perselisihan",
    "services.items.7.desc":
      "Sarana penyelesaian yang dipergunakan apabila terjadi perselisihan dalam kegiatan perdagangan berjangka:",
    "services.items.7.list1": "Musyawarah untuk Mufakat",
    "services.items.7.list2":
      "Badan Arbitrase Perdagangan Berjangka Komoditi (BAKTI)",
    "services.items.7.list3": "Pengadilan Negeri",
    "services.items.8.title": "Program Sitna",
    "services.items.8.desc":
      "Dalam rangka transparansi transaksi kami menyediakan program Sitna kepada setiap nasabah untuk melihat transaksi tersebut pada Bursa Berjangka Jakarta (BBJ) dan Kliring Berjangka Indonesia.",

    "reasons.title": "Alasan Memilih Kami",
    "reasons.heading": "Mengapa Memilih Kami...",
    "reasons.intro1":
      'PT. Solid Gold Berjangka merupakan perusahaan keuangan yang sangat terpercaya, hal ini di awali dengan adanya pengakuan dari anggota bursa, yang menyerahkan surat persetujuan anggota bursa atau disingkat dengan SPAB, yang isinya menyatakan bahwa "PT. Solid Gold Berjangka ini telah resmi menjadi anggota Bursa Berjangka Jakarta".',
    "reasons.intro2":
      "Selain dari sertifikasi yang diberikan oleh anggota bursa untuk PT. Solid Gold Berjangka, perusahaan keuangan ini juga telah mendapatkan legalitas yang tentunya akan memberikan peningkatan keamanan untuk para nasabah dan calon nasabahnya (para investor).",
    "reasons.items.1.title": "Legalitas",
    "reasons.items.1.desc":
      "Transaksi keseluruhan produk indeks kami (berjangka kontrak Hong Kong dan Jepang Saham Index) mencatat di Bursa Berjangka Jakarta, dana kesetiaan klien (margin) disampaikan kepada PT Kliring Berjangka Indonesia, dan transaksi langsung diamati oleh BAPPEBTI (Pengawas Perdagangan Berjangka Komoditi Badan).",
    "reasons.items.2.title": "Fasilitas Online Trading",
    "reasons.items.2.desc":
      "Dengan kemajuan teknologi yang ada, dan memberikan kepuasan klien dan kemantapan dalam melakukan transaksi, klien mampu melakukan transaksi nya melalui akses internet keluar, dan juga mampu untuk memantau akunnya di layar setiap kali transaksi.",
    "reasons.items.3.title": "Laporan Transaksi Harian",
    "reasons.items.3.desc":
      "Setiap hari investor akan mendapatkan Laporan Rekening klien yang terdiri dari sekitar transaksi yang dilakukan oleh investor; sehingga investor bisa selalu melihat muka investasi mereka.",
    "reasons.items.4.title": "Keamanan Dana dan Jaminan Keselamatan",
    "reasons.items.4.desc":
      "PT. Solid Gold Berjangka ini, merupakan perusahaan keuangan yang sangat terpercaya, hal ini di awali dengan adanya pengakuan dari anggota bursa, yang menyerahkan surat persetujuan anggota bursa (SPAB) yang menyatakan bahwa PT. Solid Gold Berjangka telah resmi menjadi anggota Bursa Berjangka Jakarta.",
    "reasons.items.5.title": "Proses Penarikan Cepat",
    "reasons.items.5.desc":
      "Proses penarikan dana investor melalui mekanisme biasa selama tiga hari kerja (T +3), namun PT. Solid Gold Berjangka upaya untuk memproses penarikan dana hanya selama aktivitas pekerjaan satu hari saja (T +1).",
    "reasons.items.6.title": "Profesional Resmi Broker",
    "reasons.items.6.desc":
      "PT. Solid Gold Berjangka didukung pejabat broker profesional, lulusan nasional dan luar negeri, memiliki kemampuan handal yang dapat memberikan saran berdasarkan analisis pasar, baik fundamental maupun teknis juga untuk membantu investor dalam mengambil keputusan.",
    "reasons.items.7.title": "Departemen Research & Development",
    "reasons.items.7.desc":
      "PT. Solidgold Berjangka memiliki departemen R&D yang dapat membantu para nasabah melakukan transaksi, R&D selalu memberikan analisa - analisa baik secara teknikal atau fundamental dan memberikan berita - berita ter-update tentang pasar maupun global yang akan memberikan informasi kepada nasabah selama 24 jam.",

    "procedure.guide.title": "Petunjuk Transaksi",
    "procedure.guide.intro":
      "Nasabah dapat menyampaikan amanat secara online dan atau melalui telepon (dianjurkan nasabah melakukan simulasi terlebih dulu sebelum menggunakan real online trading).",
    "procedure.guide.accessTitle": "Akses Online Trading",
    "procedure.guide.accessDesc":
      "Nasabah yang menyampaikan amanat secara online akan memperoleh User ID dan Password dari PT. Solid Gold Berjangka.",
    "procedure.guide.requirementsTitle": "Syarat Transaksi Online",
    "procedure.guide.req1": "Tersedia Jaringan Internet",
    "procedure.guide.req2Prefix": "Akses ke",
    "procedure.guide.req3":
      "Nasabah sudah mempunyai User ID dan Password dari PT. Solid Gold Berjangka (Password dapat diganti oleh nasabah)",
    "procedure.guide.fullGuideTitle": "Panduan Lengkap",
    "procedure.guide.fullGuideDesc":
      "Untuk panduan lebih lengkap tentang penggunaan platform trading online, silakan hubungi customer service kami atau kunjungi kantor cabang terdekat.",

    "procedure.withdrawal.title": "Prosedur Penarikan Dana",
    "procedure.withdrawal.generalTitle": "Informasi Umum",
    "procedure.withdrawal.generalDesc":
      "Penarikan dana dapat dilakukan kapan saja oleh para nasabah selama jam perbankan dengan kondisi tidak melebihi dari effective margin yang ada didalam laporan transaksi harian nasabah (statement report).",
    "procedure.withdrawal.stepsTitle": "Tahapan Penarikan Dana",
    "procedure.withdrawal.step1":
      "Nasabah masuk ke menu withdrawal pada akun transaksi rill-nya untuk melakukan permohonan penarikan dana dengan mengikuti syarat dan ketentuan yang berlaku.",
    "procedure.withdrawal.step2":
      "Nasabah mengisi formulir permohonan penarikan dana.",
    "procedure.withdrawal.accountTitle": "Ketentuan Rekening Tujuan",
    "procedure.withdrawal.accountDesc":
      "Penarikan dana Nasabah hanya dapat di transfer ke rekening atas nama nasabah bersangkutan yang tertera pada Dokumen Aplikasi Pembukaan Rekening Nasabah.",
    "procedure.withdrawal.timeTitle": "Waktu Proses",
    "procedure.withdrawal.timeDesc":
      "Proses penarikan dana oleh nasabah melalui mekanisme standar membutuhkan waktu tiga hari kerja (T+3), namun PT. Solid Gold Berjangka mengupayakan agar proses penarikan dana hanya selama satu hari kerja saja (T+1).",

    "procedure.regol.title": "Prosedur Registrasi Online",
    "procedure.regol.step1.title": "1. Membuka Website Perusahaan",
    "procedure.regol.step1.desc":
      "Akses website resmi PT. Solid Gold Berjangka untuk memulai proses registrasi online.",
    "procedure.regol.step2.title": "2. Registrasi Demo Account",
    "procedure.regol.step2.item1": "Input Data",
    "procedure.regol.step2.item2": "Demo Account",
    "procedure.regol.step2.item3": "Melakukan simulasi transaksi",
    "procedure.regol.step3.title": "3. Input Dokumen Perjanjian",
    "procedure.regol.step3.item1": "Aplikasi Perjanjian",
    "procedure.regol.step3.item2": "Dokumen Pemberitahuan Adanya Risiko (DPAR)",
    "procedure.regol.step3.item3": "Perjanjian Pemberian Amanat (PPA)",
    "procedure.regol.step3.item4": "Mekanisme Transaksi (Trading Rules)",
    "procedure.regol.step3.item5": "Input data pendukung (KTP dan lainnya)",
    "procedure.regol.step4.title": "4. Verifikasi Data",
    "procedure.regol.step4.desc":
      "Wakil Pialang yang ditunjuk melakukan verifikasi data calon Nasabah, yaitu:",
    "procedure.regol.step4.item1": "Data pribadi calon Nasabah",
    "procedure.regol.step4.item2":
      "Penyetoran Dana Calon Nasabah ke Rekening Terpisah Pialang",
    "procedure.regol.transferTitle": "Rekening Tujuan Transfer",
    "procedure.regol.transferNote":
      "Kirim slip transfer bank melalui fax/email ke PT. Solid Gold Berjangka.",
    "procedure.regol.idrAccount": "No. Rekening IDR",
    "procedure.regol.usdAccount": "No. Rekening USD",
    "procedure.regol.bank.bca": "Bank BCA Cabang Sudirman, Jakarta",
    "procedure.regol.bank.cimb": "Bank CIMB Niaga Cabang Gajahmada, Jakarta",
    "procedure.regol.bank.bni": "Bank BNI Cabang Gambir, Jakarta",
    "procedure.regol.bank.mandiri": "Bank Mandiri Cabang Imam Bonjol, Jakarta",
    "procedure.regol.bank.artha":
      "Bank Artha Graha Cabang KPO Sudirman, Jakarta",
    "procedure.regol.bank.bri": "Bank Rakyat Indonesia KC Ciputat, Tangerang",
    "procedure.regol.step5":
      "Nasabah mendapat konfirmasi bahwa dana/margin tersebut sudah dikreditkan di Rekening Terpisah PT. Solid Gold Berjangka.",
    "procedure.regol.step6":
      "Nasabah mendapatkan nomor account dari PT. Solid Gold Berjangka yang sudah teregistrasi.",
    "procedure.regol.step7":
      "Nasabah mendapatkan Tanda Terima (Official Receipt) dari PT. Solid Gold Berjangka.",
    "procedure.regol.step8":
      "Apabila semua prosedur diatas telah dipenuhi, maka nasabah akan dikonfirmasikan untuk dapat melakukan transaksi setelah menerima User ID dan Password online trading yang dikirimkan melalui SMS dan email nasabah sesuai yang tertera di dalam aplikasi pembukaan rekening.",

    "product.multilateralTitle": "Produk JFX",
    "product.bilateralTitle": "Produk SPA",
    "product.multilateralHeader": "Produk Multilateral (JFX)",
    "product.bilateralHeader": "Produk Bilateral (SPA)",
    "product.detailTitle": "Detail Produk",
    "product.errorLoad": "Gagal memuat data produk",
    "product.notAvailable": "Data produk tidak tersedia.",
    "product.specs": "Spesifikasi {name}",
    "product.lastUpdate": "Last Update: {datetime} WIB",
    "product.lastUpdateEmpty": "Last Update: -",
    "product.emptyCategory": "Tidak ada produk untuk kategori {category}.",

    "product.characteristics.title": "Karakteristik Produk",
    "product.characteristics.items.1.title": "Efisiensi Modal",
    "product.characteristics.items.1.desc":
      "Dalam bertransaksi menggunakan Margin Trading (dana jaminan), dengan demikian para investor dapat melakukan transaksi yang besar dengan modal yang relatif kecil. Dengan dana minimal sebesar 10% dari nilai total transaksi, tidak perlu dana 100%.",
    "product.characteristics.items.2.title": "Fleksibilitas Transaksi",
    "product.characteristics.items.2.desc":
      "Transaksi dua arah yang memungkinkan para investor untuk mendapatkan peluang pada saat pasar bergerak naik maupun turun.",
    "product.characteristics.items.3.title":
      "Pergerakan Harga Sangat Fluktuatif",
    "product.characteristics.items.3.desc":
      "Pergerakan harga harian yang besar dengan range berkisar 100 - 500 poin memberikan peluang keuntungan yang besar dengan kontrak size US $ 5 / point dan hanya dibebankan biaya transaksi / Fee sebesar 3 (Tiga) poin ditambah PPN 11%.",
    "product.characteristics.items.4.title": "Likuiditas Tinggi",
    "product.characteristics.items.4.desc":
      "Produk ini memiliki tingkat likuiditas yang sangat tinggi, dengan begitu para investor dapat melakukan transaksi beli dan jual kapan saja selama market berjalan, tanpa harus ada antrian di harga pasar.",
    "product.characteristics.investmentTypes": "Jenis Investasi",
    "product.characteristics.fixedTitle": "Fixed Rate / Kurs Tetap",
    "product.characteristics.fixedItem1": "US $ 1 = Rp. 10.000 (kurs tetap)",
    "product.characteristics.fixedItem2":
      "Terhindar dari Risiko kerugian akibat fluktuasi USD terhadap Rupiah",
    "product.characteristics.floatingTitle": "Floating Rate / Kurs Berjalan",
    "product.characteristics.floatingItem1":
      "US $ 1 = US $ 1 (sesuai kurs USD terhadap Rupiah)",
    "product.characteristics.floatingItem2":
      "Tidak dikenakan fee dari pembukaan dan penarikan dana USD baik sebagian atau seluruhnya",

    "product.illustration.title": "Ilustrasi Transaksi",
    "product.illustration.formulaTitle": "Rumus Perhitungan Transaksi",
    "product.illustration.notes": "Keterangan :",
    "product.illustration.contractSizeLabel": "Contract Size (nilai kontrak):",
    "product.illustration.contractSizeItem1":
      "US $5 per poin untuk kontrak gulir berkala indeks saham",
    "product.illustration.contractSizeItem2":
      "100 troy ounce untuk kontrak gulir harian emas Loco London",
    "product.illustration.nLotLabel": "n Lot:",
    "product.illustration.nLotDesc": "Banyaknya lot yang ditransaksikan",
    "product.illustration.feeLabel": "Facility Fee (biaya komisi):",
    "product.illustration.feeDesc": "US $15 per lot per sisi (beli/jual)",
    "product.illustration.totalFeeLabel": "Total biaya komisi:",
    "product.illustration.totalFeeDesc": "US $30 untuk 1 lot settlement",
    "product.illustration.vatLabel": "VAT (Pajak Pertambahan Nilai):",
    "product.illustration.vatDesc": "11% dari biaya komisi (US $1.65/lot/side)",
    "product.illustration.totalVatLabel": "Total biaya VAT:",
    "product.illustration.totalVatDesc": "US $3.3 untuk 1 lot settlement",
    "product.illustration.rolloverTitle": "Biaya Roll Over (Overnight)",
    "product.illustration.contract": "Kontrak",
    "product.illustration.feePerNight": "Biaya per Malam",
    "product.illustration.rollover.row1.contract": "HKK5U dan HKK50",
    "product.illustration.rollover.row1.fee": "US $3 / malam",
    "product.illustration.rollover.row2.contract": "JPK5U dan JPK50",
    "product.illustration.rollover.row2.fee": "US $2 / malam",
    "product.illustration.rollover.row3.contract": "XULF dan XUL10",
    "product.illustration.rollover.row3.fee": "US $5 / malam",
    "product.illustration.example1Title":
      "Contoh Transaksi Day Trade - Keuntungan",
    "product.illustration.example1Desc":
      "Seorang nasabah mengambil posisi beli HKK5U pada level 24.600 poin sebanyak 2 lot. Kemudian investor menutup/melikuidasi posisi beli 2 lot tersebut ketika indeks berada pada level 24.700 poin.",
    "product.illustration.example2Title":
      "Contoh Transaksi Day Trade - Kerugian",
    "product.illustration.example2Desc":
      "Seorang Investor memprediksi Indeks Hang Seng akan mengalami penguatan, maka dia membuka posisi beli HKK5U pada level 24.600 poin sebanyak 1 lot. Namun prediksinya salah dan menutup di 24.550 poin.",
    "product.illustration.example3Title": "Contoh Transaksi Overnight",
    "product.illustration.example3Desc":
      "Seorang investor memperkirakan Indeks Nikkei 225 akan melemah, maka pada tanggal 10 Juni investor membuka posisi jual di level 14.850 poin sebanyak 2 lot. Dua hari kemudian (12 Juni), investor menutup posisi jual 2 lot tersebut ketika indeks berada pada level 14.650 poin.",
    "product.illustration.grossProfit": "Keuntungan kotor",
    "product.illustration.rolloverFeeLine":
      "Roll over fee (US $ 2 x 2 lot x 2 malam)",
    "product.illustration.netProfit": "Keuntungan bersih",
    "product.illustration.contractTypesTitle": "Kode & Jenis Kontrak",
    "product.illustration.contractCode": "Kode Kontrak",
    "product.illustration.base": "Dasar",
    "product.illustration.rateCategory": "Kategori Rates",
    "product.illustration.contractType": "Jenis Kontrak",
    "product.illustration.desc1":
      "Kontrak Gulir Harian Harga Spot Great Britain Pound Sterling (GBP) terhadap US Dollar (USD)",
    "product.illustration.desc2":
      "Kontrak Gulir Harian Harga Spot Euro (EUR) terhadap US Dollar (USD)",
    "product.illustration.desc3":
      "Kontrak Gulir Harian Harga Spot Australian Dollar (AUD) terhadap US Dollar (USD)",
    "product.illustration.desc4":
      "Kontrak Gulir Harian Harga Spot US Dollar (USD) terhadap Swiss Franc (CHF)",
    "product.illustration.desc5":
      "Kontrak Gulir Harian Harga Spot US Dollar (USD) terhadap Japanese Yen (JPY)",
    "product.illustration.calcTitle": "Ilustrasi Perhitungan Transaksi",
    "product.illustration.directRates": "Untuk DIRECT RATES:",
    "product.illustration.indirectRates": "Untuk INDIRECT RATES:",
    "product.illustration.formulaPL":
      "P/L = (Harga Jual - Harga Beli) x Contract Size x Jumlah Lot",
    "product.illustration.example4Title":
      "Contoh Transaksi EU1010_BBJ (Daytrade)",
    "product.illustration.example4Desc":
      "Nasabah beli EU1010_BBJ di 1.3530 sebanyak 2 lot, kemudian jual di 1.3540:",
    "product.illustration.example4Down": "Jika harga turun ke 1.3525:",
    "product.illustration.example5Title":
      "Contoh Transaksi UJ1010_BBJ (Daytrade)",
    "product.illustration.example5Desc":
      "Nasabah jual UJ1010_BBJ di 102.20 sebanyak 1 lot, kemudian tutup di 102.12:",
    "product.illustration.example5Up": "Jika harga naik ke 102.27:",
    "product.illustration.netProfitLabel": "laba bersih",
    "product.illustration.netLossLabel": "rugi bersih",
    "product.illustration.grossProfitLabel": "keuntungan kotor",
    "product.illustration.profitLabel": "laba",
    "product.illustration.lossLabel": "rugi",

    "calendar.filters.today": "Hari Ini",
    "calendar.filters.thisWeek": "Minggu Ini",
    "calendar.filters.previousWeek": "Minggu Lalu",
    "calendar.filters.nextWeek": "Minggu Depan",
    "calendar.fetchError": "Gagal mengambil data",
    "calendar.search": "Cari data...",
    "calendar.time": "Waktu",
    "calendar.country": "Negara",
    "calendar.impact": "Dampak",
    "calendar.event": "Peristiwa",
    "calendar.loading": "Memuat...",
    "calendar.previous": "Sebelumnya",
    "calendar.forecast": "Perkiraan",
    "calendar.actual": "Aktual",
    "calendar.sources": "Sumber",
    "calendar.measures": "Indikator",
    "calendar.usualEffect": "Dampak Umum",
    "calendar.frequency": "Frekuensi",
    "calendar.nextReleased": "Rilis Berikutnya",
    "calendar.notes": "Catatan",
    "calendar.whyCare": "Alasan Penting",
    "calendar.date": "Tanggal",
    "calendar.empty": "Tidak ada data",
    "calendar.prev": "Sebelumnya",
    "calendar.next": "Berikutnya",
    "calendar.pageOf": "Halaman {current} dari {total}",

    "history.title": "Data Historis",
    "history.date": "Tanggal",
    "history.open": "Open",
    "history.high": "High",
    "history.low": "Low",
    "history.close": "Close",
    "history.error": "Gagal memuat data.",
    "history.empty": "Tidak ada data pada kategori {category}.",

    "news.suggestedTitle": "Rekomendasi pilihan, biar kamu gak ketinggalan.",
    "news.emptySuggested": "Tidak ada berita rekomendasi.",
    "news.top": "TOP NEWS",
    "news.tickerLabel": "Ticker berita dan pasar",
    "news.read": "Baca:",
    "news.noDescription": "Tidak ada deskripsi.",
    "news.alt": "Berita",
    "news.noTitle": "Tanpa judul",

    "gallery.tiktok": "Video TikTok",
    "gallery.tiktokError": "Gagal memuat TikTok ID",
    "gallery.tiktokLoading": "Memuat TikTok ID…",
    "gallery.legal": "Legalitas",
    "gallery.legalError": "Gagal memuat legalitas.",
    "gallery.legalEmpty": "Belum ada data legalitas.",
    "gallery.eduVideo": "Video Company Profile",
    "gallery.videoError": "Gagal memuat video.",
    "gallery.videoEmpty": "Belum ada data video.",
    "gallery.embedUnavailable": "Embed tidak tersedia",

    "banner.company": "PT. Solid Gold Berjangka",
    "banner.title": "Selamat Datang di",
    "banner.subtitle": "Solid Gold Berjangka",
    "banner.member":
      "Member of Jakarta Futures Exchange & Member of Indonesia Derivatives Clearing House",
    "banner.demo": "Login Akun Demo",
    "banner.regol": "Online Account Registration",
    "banner.live": "Login Akun Live",

    "home.aboutLabel": "Tentang Kami",
    "home.companyProfile": "Profil Perusahaan",

    "home.profile.p1":
      'Berdiri sejak tahun 2002, PT Solid Gold Berjangka ("SGB") merupakan perusahaan pialang berjangka terdaftar dan diawasi oleh Badan Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI). Berpengalaman lebih dari 20 tahun di industri Perdagangan Berjangka Komoditi, SGB adalah anggota dari PT Bursa Berjangka Jakarta (BBJ) dan PT Kliring Berjangka Indonesia (Persero).',
    "home.profile.p2":
      "Saat ini pelayanan transaksi PT Solid Gold Berjangka terus meluas dengan total kantor operasional mencapai 3 kantor tersebar di Jakarta, Semarang, Makassar.",
    "home.mission": "Misi Perusahaan",
    "home.vision": "Visi Perusahaan",
    "home.mission.item1":
      "Menjadi sebuah perusahaan pialang berjangka yang memiliki skala internasional",
    "home.mission.item2":
      "Menjadi market leader, baik itu secara regional ataupun internasional",
    "home.vision.item1":
      "Mengembangkan dan memajukan Perdagangan Berjangka di Indonesia sehingga dapat memberikan dampak positif kepada perekonomian Nasional baik dari segi mikro dan makro",
    "home.vision.item2":
      "Memberdayakan Perdagangan Berjangka di Indonesia dan membantu semua pihak yang membutuhkannya untuk dapat mempergunakannya sebagai sarana lindung nilai (Hedging)",

    "tradingview.desc.pre":
      "Chart yang kami gunakan disediakan oleh TradingView, sebuah platform charting bagi para trader dan investor dari seluruh penjuru dunia. Temukan berbagai instrumen finansial seperti ",
    "tradingview.desc.link": "chart EURUSD",
    "tradingview.desc.post":
      ", XAUUSD dan instrumen forex lainnya, dan juga peralatan seperti kalender ekonomi, berita finansial, dan masih banyak lagi yang tersedia secara gratis dan dapat membantu dalam aktivitas trading dan investasi Anda.",

    "home.products": "PRODUK",
    "home.products.title": "Produk Trading",
    "home.products.jfx": "Produk Multilateral (JFX)",
    "home.products.spa": "Produk Bilateral (SPA)",
    "home.products.viewAll": "Lihat semua",
    "home.products.emptyJfx": "Belum ada produk untuk kategori JFX.",
    "home.products.emptySpa": "Belum ada produk untuk kategori SPA.",

    "home.gallery": "Galeri",
    "home.videoLegal": "Official Digital Media & Social Channels",
    "home.informasiLabel": "Informasi",
    "home.informasiTitle": "Informasi Terbaru",
    "home.videoUmumLabel": "Video",
    "home.videoUmumTitle": "Video Umum",
    "home.videoUmumEmptyTitle": "Belum Ada Video",
    "home.videoUmumEmptyDesc": "Video akan segera ditambahkan.",

    "about.profileTitle": "Profil Perusahaan",
    "about.whyChoose": "Alasan anda memilih kami",
    "about.whyChooseTitle":
      "20+ tahun berpengalaman, ratusan klien terlayani, dan terdaftar resmi di BAPPEBTI.",
    "about.visionMissionTitle": "Visi dan Misi Perusahaan",
    "about.visionClosing":
      "Dari visi dan misi perusahaan keuangan PT. Solid Gold Berjangka ini, kami berusaha semaksimal mungkin mendirikan perusahaan agar dapat memajukan dan mengembangkan perdagangan berjangka di Indonesia untuk memberikan dampak positif bagi perekonomian nasional, baik dari segi makro maupun mikro.",

    "legal.title": "Legalitas Bisnis",
    "legal.subtitle":
      "Berikut adalah dokumen-dokumen legal yang menjadi dasar hukum dan pengakuan resmi atas operasional PT. Solid Gold Berjangka",
    "legal.ctaTitle": "Legalitas Lengkap dan Terverifikasi",
    "legal.ctaText":
      "Seluruh dokumen legalitas dapat dilihat langsung di kantor kami atau melalui salinan resmi yang telah dilegalisir.",
    "legal.ctaButton": "Hubungi Kami untuk Info Lebih Lanjut",
    "legal.numberPrefix": "No.",
    "legal.docs.1.title": "Akta Pendirian Perseroan Terbatas",
    "legal.docs.1.desc":
      "Tanggal 18 Januari 2002 oleh Notaris Soehendro Gautama, SH, PT. Solid Gold Berjangka",
    "legal.docs.2.title": "Pengesahan Departemen Kehakiman dan HAM",
    "legal.docs.2.desc": "Pengesahan resmi dari Kementerian Hukum dan HAM",
    "legal.docs.3.title": "Surat Persetujuan Anggota Bursa (SPAB)",
    "legal.docs.3.desc": "Persetujuan keanggotaan bursa berjangka",
    "legal.docs.4.title": "Izin Usaha Pialang Berjangka",
    "legal.docs.4.desc": "Keputusan Kepala BAPPEBTI",
    "legal.docs.5.title": "Keanggotaan Lembaga Kliring Berjangka",
    "legal.docs.5.desc": "Keanggotaan resmi di Lembaga Kliring Berjangka",
    "legal.docs.6.title": "Izin Pialang Berjangka untuk Transaksi Luar Negeri",
    "legal.docs.6.desc":
      "Izin sebagai Pialang Berjangka yang menawarkan dan/atau menyalurkan amanat nasabah untuk transaksi kontrak berjangka ke bursa berjangka luar negeri",
    "legal.docs.7.title": "Perjanjian Kerjasama dengan PT. Royal Assetindo",
    "legal.docs.7.desc":
      "Perjanjian Kerjasama dengan Pedagang Penyelenggara Sistem Perdagangan Alternatif",
    "legal.docs.8.title": "Persetujuan sebagai Peserta SPA",
    "legal.docs.8.desc":
      "Pemberian Persetujuan sebagai peserta Sistem Perdagangan Alternatif (SPA)",
    "legal.docs.9.title": "Penerimaan Nasabah Secara Elektronik",
    "legal.docs.9.desc":
      "Penetapan sebagai Pialang Berjangka yang Melakukan Kegiatan Penerimaan Nasabah secara Elektronik On-Line",
    "legal.docs.10.title": "Perantara Perdagangan Efek Derivatif Keuangan",
    "legal.docs.10.desc":
      "Pesetujuan Prinsip Pelaku Derivatif Keuangan sebagai Perantara Perdagangan Efek Derivatif Keuangan di Otoritas Jasa Keuangan",
    "legal.docs.11.title":
      "Peserta Sistem Perdagangan Alternatif Derivatif PUVA",
    "legal.docs.11.desc":
      "Terdaftar sebagai Pialang Berjangka – Peserta Sistem Perdagangan Alternatif Derivatif PUVA di Bank Indonesia",

    "contact.title": "Hubungi Kami",
    "contact.headOffice": "Kantor Pusat",
    "contact.mapError": "Gagal memuat peta.",
    "contact.settingError": "Gagal memuat data setting.",
    "contact.addressUnavailable": "Alamat belum tersedia",
    "contact.emailLabel": "Alamat email:",
    "contact.phone": "Telp",
    "contact.fax": "FAX",
    "contact.email": "Email",
    "contact.branchOffice": "Kantor Cabang",
    "contact.branchError": "Gagal memuat kantor cabang.",
    "contact.branchEmpty": "Belum ada data kantor cabang.",
    "contact.mapsUnavailable": "Link maps tidak tersedia",
    "contact.onlineComplaint": "Pengaduan Online",
    "contact.onlineComplaintAlt": "PENYAMPAIAN KELUHAN ONLINE",

    "wakil.title": "Daftar Wakil Pialang",
    "wakil.subtitle":
      "Berikut adalah daftar Wakil Pialang Berjangka PT. Solid Gold Berjangka.",
    "wakil.pickBranch": "Pilih Cabang",
    "wakil.loading": "Memuat data...",
    "wakil.error": "Gagal memuat data wakil pialang.",
    "wakil.sectionTitle": "Semua ahli berpengalaman ada di sini",
    "wakil.errorDetail": "Gagal memuat data. Coba refresh halaman.",
    "wakil.empty": "Belum ada data wakil pialang.",
    "wakil.detailTitle": "Detail Wakil Pialang",
    "wakil.detailError": "Gagal memuat detail wakil pialang.",
    "wakil.idNumber": "Nomor ID",
    "wakil.branch": "Cabang",
    "wakil.viewMap": "Lihat Maps",
    "wakil.total": "Total",
    "wakil.active": "Aktif",
    "wakil.inactive": "Non-Aktif",

    "news.readMore": "READ MORE",
    "news.suggested": "Suggested News",
    "news.latestTitle": "Update Berita Terbaru",
    "news.emptyLatest": "Tidak ada berita terbaru.",
    "news.emptyList": "Tidak ada berita yang cocok.",
    "news.readMoreCta": "Baca Selengkapnya...",
    "news.notFound": "Berita tidak ditemukan.",
    "news.label": "Berita",
    "news.fetchError": "Gagal mengambil data berita (status {status}).",
    "news.loadError": "Terjadi kesalahan saat memuat berita.",

    "modal.title": "DOWNLOAD PRO TRADER SEKARANG!",
    "modal.desc":
      "Dapatkan pengalaman trading terbaik langsung dari smartphone Anda. Unduh aplikasi Pro Trader sekarang dan nikmati fitur lengkap, berita terbaru, serta akses cepat ke akun demo maupun live.",
    "modal.playStore": "Download di Play Store",
    "modal.appStore": "Download di App Store",

    "stats.legalTitle": "Resmi",
    "stats.legalDesc": "Legalitas & BAPPEBTI",
    "stats.onlineTitle": "Online",
    "stats.onlineDesc": "Trading & Monitoring",
    "stats.supportDesc": "Research & Support",

    "watcher.supervised": "BERIZIN DAN DIAWASI",
    "watcher.membership": "KEANGGOTAAN DARI",
    "watcher.alt.bappebti": "Logo BAPPEBTI",
    "watcher.alt.ojk": "Logo OJK",
    "watcher.alt.bi": "Logo Bank Indonesia",
    "watcher.alt.jfx": "Logo JFX",
    "watcher.alt.kbi": "Logo KBI",
    "watcher.alt.aspebtindo": "Aspebtindo",

    "market.loading": "Memuat market...",
    "market.error": "Gagal memuat market.",
    "market.empty": "Tidak ada data market.",
    "market.scrollLeft": "Scroll kiri",
    "market.scrollRight": "Scroll kanan",
  },
  en: {
    "common.readMore": "Learn More",
    "common.learnMore": "Learn More",
    "common.details": "Details",
    "common.all": "All",
    "common.id": "ID",
    "common.noDataAlt": "No data",
    "common.hqJakarta": "PT. Solid Gold Berjangka - Jakarta",
    "common.company": "PT. Solid Gold Berjangka",
    "common.loadingTitle": "Loading...",
    "common.errorTitle": "Error",
    "common.loading": "Loading data...",
    "common.search": "Search news...",
    "common.backHome": "Back to Home",
    "common.errorLoad": "Failed to load data.",
    "common.errorNews": "Failed to load news.",
    "common.notFound": "Page not found",
    "common.notFoundDesc":
      "Sorry, the page you are looking for is unavailable or has been moved.",
    "common.back": "Back",
    "common.dataNotFound": "Data not found.",

    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.mainSite": "Main Website",
    "nav.products": "Products",
    "nav.procedures": "Procedures",
    "nav.news": "News",
    "nav.analysis": "Analysis",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "privacy.title": "Privacy Policy",
    "privacy.intro":
      "This Privacy Policy explains how PT. Solid Gold Berjangka collects, uses, stores, and protects your personal data when you use our website and services.",
    "nav.register": "Register Now",
    "nav.about.profile": "Company Profile",
    "nav.about.legal": "Business Legality",
    "nav.about.broker": "Futures Broker Representatives",
    "nav.about.services": "Facilities & Services",
    "nav.about.achievements": "Achievements",
    "nav.about.general": "General",
    "nav.about.general.informasi": "Information",
    "nav.about.general.video": "Video",
    "nav.about.reason": "Why Choose Us",
    "nav.products.multilateral": "Multilateral (JFX)",
    "nav.products.bilateral": "Bilateral (SPA)",
    "nav.products.liveQuote": "Live Quote",
    "nav.products.characteristics": "Product Characteristics",
    "nav.products.illustration": "Transaction Illustration",
    "nav.procedures.guide": "Trading Guide",
    "nav.procedures.withdrawal": "Withdrawal Procedure",
    "nav.procedures.regol": "Online Registration Procedure",
    "nav.news.market": "Market",
    "nav.news.index": "Index",
    "nav.news.commodity": "Commodity",
    "nav.news.currencies": "Currencies",
    "nav.news.economy": "Economy",
    "nav.news.global": "Global & Economy",
    "nav.news.fiscal": "Fiscal & Monetary",
    "nav.analysis.market": "Market Analysis",
    "nav.analysis.calendar": "Economic Calendar",
    "nav.analysis.pivot": "Pivot & Fibonacci",
    "nav.analysis.historical": "Historical Data",
    "nav.education.terms": "Terms in Online Transactions",
    "nav.education.loco": "Loco London Gold",
    "nav.education.symbols": "Index Symbols",
    "nav.education.screen": "Online Transaction Screen",
    "nav.education.system": "Online System Transactions",
    "education.terms.title": "Terms in Online Transactions",
    "education.terms.marketOrder.title": "Market Order",
    "education.terms.marketOrder.desc":
      "A buy/sell position that must be executed immediately at the best available price. Used to open new positions or liquidate existing ones.",
    "education.terms.limitOrder.title": "Limit Order",
    "education.terms.limitOrder.desc":
      "An order with a specified maximum/minimum price, used to open new positions or liquidate existing positions.",
    "education.terms.stopOrder.title": "Stop Order",
    "education.terms.stopOrder.p1":
      "A stop order (stop loss order) is used when price moves above or below a specified stop price. Once the stop price is reached, it becomes a market order. It is used to limit losses/reduce risk or protect profits on open positions.",
    "education.terms.stopOrder.p2":
      "With a stop order, users do not need to constantly monitor prices because it triggers automatically at the desired level. In highly volatile markets, the executed price may differ from the stop price.",
    "education.terms.stopOrder.listTitle": "Stop Orders consist of:",
    "education.terms.sellStop.title": "Sell Stop Order",
    "education.terms.sellStop.desc":
      "An instruction to sell at the best price when the market drops below the stop price. It is always placed below the current market price. Example: a client wants to protect a buy position at 25,050 and places a sell stop at 25,010. When price drops past 25,010, the order is executed as a market order to limit losses or protect the position.",
    "education.terms.buyStop.title": "Buy Stop Order",
    "education.terms.buyStop.desc":
      "An instruction to buy at the best price used to limit losses on an existing sell position when price rises above the stop price.",
    "education.terms.stopLimit.title": "Stop Limit Order",
    "education.terms.stopLimit.desc":
      "A combination of a stop order and a limit order. When the stop price is reached, it becomes a buy/sell limit order within the specified price limit. Effective for opening new positions, but not ideal as a protection tool in illiquid markets.",
    "education.terms.oco.title": "One Cancel the Others (OCO)",
    "education.terms.oco.desc":
      "Placing two limit orders; when the first is executed, the second is automatically canceled.",
    "education.terms.gtc.title": "Good Till Cancel (GTC)",
    "education.terms.gtc.desc":
      "A limit order that remains valid until the next day if not executed and can be canceled.",

    "footer.products": "Products",
    "footer.news": "News",
    "footer.privacy": "Privacy Policy",
    "footer.about": "About Us",
    "footer.procedures": "Procedures",
    "footer.company": "Company",
    "footer.guides": "Guides",
    "footer.market": "Market",
    "footer.economy": "Economy",
    "footer.brokerNote":
      "Official broker supervised by Bappebti and the Futures Exchange.",
    "footer.rights": "© {year} Solid Gold Berjangka. All rights reserved.",
    "footer.quickLinks": "Quick Links",
    "footer.contactTitle": "Contact Us",
    "footer.mapTitle": "Location Map",
    "footer.address":
      "TCC Batavia, Tower One Lt. 10, Jl. K.H. Mas Mansyur Kav. 126, Jakarta Pusat 10220",
    "footer.emailValue": "corporate@solidgold.co.id",
    "footer.faxValue": "021-29675089",
    "footer.phoneValue": "021-29675088",
    "footer.attention.title": "Attention!",
    "footer.attention.body":
      "Management of PT Solid Gold Berjangka (PT SGB) urges the public to stay vigilant against investment fraud using PT SGB’s name via electronic media or social media. Ensure every fund transfer for futures trading is made only to the Segregated Account in the name of PT Solid Gold Berjangka, not to any individual’s account.",
    "footer.logoKomdigiAlt": "Komdigi Logo",
    "footer.logoKanAlt": "KAN HACCP Logo",
    "footer.mapIframeTitle": "Google Maps - PT. Solid Gold Berjangka",

    "common.emptyData": "No data.",
    "common.invalidFormat": "Invalid data format",
    "common.close": "Close",

    "analysis.calendar": "Economic Calendar",
    "analysis.pivot": "Pivot & Fibonacci",
    "analysis.historical": "Historical Data",
    "analysis.pivotTab": "Pivot",
    "analysis.fibTab": "Fibonacci",
    "analysis.calculatePivot": "Calculate Pivot",
    "analysis.level": "Level",
    "analysis.classic": "Classic",
    "analysis.woodie": "Woodie",
    "analysis.camarilla": "Camarilla",
    "analysis.upTrend": "Up Trend",
    "analysis.downTrend": "Down Trend",
    "analysis.priceALow": "Price A (Low)",
    "analysis.priceBHigh": "Price B (High)",
    "analysis.priceAHigh": "Price A (High)",
    "analysis.priceBLow": "Price B (Low)",
    "analysis.lowPrice": "Low price",
    "analysis.highPrice": "High price",
    "analysis.retracement": "Retracement Levels",
    "analysis.extension": "Extension Levels",
    "analysis.open": "Open",
    "analysis.high": "High",
    "analysis.low": "Low",
    "analysis.close": "Close",

    "services.title": "Facilities & Services",
    "services.items.1.title": "Professional Futures Broker Representatives",
    "services.items.1.desc":
      "The company has professional futures brokers who are always ready to serve prospective clients/clients with education, administrative procedures, and alternative trading system transaction mechanisms at the Jakarta Futures Exchange.",
    "services.items.2.title": "Online Trading & Demo Account Facilities",
    "services.items.2.desc":
      "This facility provides convenience for clients to trade online via the internet. We also provide a Demo Account or Transaction Simulation so prospective clients can better understand and master trading functions. Simply contact our customer care.",
    "services.items.3.title": "Daily Transaction Reports",
    "services.items.3.desc":
      "Every day clients will receive a Client Transaction Report containing transaction records and investment developments, via email, fax, or mail. These records can also be accessed directly through the online trading platform by selecting Temporary Statement/Daily Statement.",
    "services.items.4.title": "Fund Withdrawal",
    "services.items.4.desc":
      "Withdrawals can be made at any time upon client request. PT. Solidgold Berjangka strives to process withdrawals within one business day (T+1).",
    "services.items.5.title": "Segregated Account",
    "services.items.5.desc":
      "All investor funds are placed in the broker’s Segregated Account at approved custodian banks (BCA, CIMB Niaga, Mandiri, BNI, and Artha Graha) separate from company assets. These funds are used only for the respective client’s transactions.",
    "services.items.6.title": "Transaction Flexibility",
    "services.items.6.desc":
      "Two-way transactions allow investors to profit when the market moves up or down. High liquidity also enables optimal profit-taking.",
    "services.items.7.title": "Dispute Resolution Mechanism",
    "services.items.7.desc":
      "Dispute resolution mechanisms used for futures trading disputes:",
    "services.items.7.list1": "Deliberation for consensus",
    "services.items.7.list2":
      "Commodity Futures Trading Arbitration Board (BAKTI)",
    "services.items.7.list3": "District Court",
    "services.items.8.title": "Sitna Program",
    "services.items.8.desc":
      "For transaction transparency, we provide the Sitna program so clients can view transactions on the Jakarta Futures Exchange (BBJ) and Indonesia Clearing House.",

    "reasons.title": "Why Choose Us",
    "reasons.heading": "Why Choose Us...",
    "reasons.intro1":
      "PT. Solid Gold Berjangka is a highly trusted financial company, acknowledged by exchange members who issued a member approval letter (SPAB) stating that PT. Solid Gold Berjangka is an official member of the Jakarta Futures Exchange.",
    "reasons.intro2":
      "In addition to certifications from exchange members, this financial company has also obtained legalities that further enhance security for clients and prospective clients (investors).",
    "reasons.items.1.title": "Legality",
    "reasons.items.1.desc":
      "All index product transactions (Hong Kong and Japan index futures contracts) are recorded at the Jakarta Futures Exchange, client margin funds are placed at the Indonesia Clearing House, and transactions are supervised by BAPPEBTI.",
    "reasons.items.2.title": "Online Trading Facilities",
    "reasons.items.2.desc":
      "With technological advances and to provide client convenience, clients can trade via internet access and monitor their accounts on screen at any time.",
    "reasons.items.3.title": "Daily Transaction Reports",
    "reasons.items.3.desc":
      "Every day investors receive a client account report containing transaction summaries, allowing investors to continuously monitor their investments.",
    "reasons.items.4.title": "Fund Safety & Protection",
    "reasons.items.4.desc":
      "PT. Solid Gold Berjangka is a highly trusted financial company, acknowledged by exchange members through the SPAB letter confirming PT. Solid Gold Berjangka as an official member of the Jakarta Futures Exchange.",
    "reasons.items.5.title": "Fast Withdrawal Process",
    "reasons.items.5.desc":
      "Withdrawals typically take three business days (T+3), but PT. Solid Gold Berjangka strives to process withdrawals within one business day (T+1).",
    "reasons.items.6.title": "Professional Licensed Brokers",
    "reasons.items.6.desc":
      "PT. Solid Gold Berjangka is supported by professional brokers, graduates from national and international institutions, providing market analysis advice to help investors make decisions.",
    "reasons.items.7.title": "Research & Development Department",
    "reasons.items.7.desc":
      "PT. Solidgold Berjangka has an R&D department that provides technical and fundamental analysis and up-to-date market/global news to clients 24 hours a day.",

    "procedure.guide.title": "Trading Guide",
    "procedure.guide.intro":
      "Clients can submit orders online and/or by phone (clients are advised to run simulations before using real online trading).",
    "procedure.guide.accessTitle": "Online Trading Access",
    "procedure.guide.accessDesc":
      "Clients who submit orders online will receive a User ID and Password from PT. Solid Gold Berjangka.",
    "procedure.guide.requirementsTitle": "Online Trading Requirements",
    "procedure.guide.req1": "Internet connection available",
    "procedure.guide.req2Prefix": "Access to",
    "procedure.guide.req3":
      "Clients already have a User ID and Password from PT. Solid Gold Berjangka (password can be changed by the client)",
    "procedure.guide.fullGuideTitle": "Full Guide",
    "procedure.guide.fullGuideDesc":
      "For a more complete guide on using the online trading platform, please contact our customer service or visit the nearest branch office.",

    "procedure.withdrawal.title": "Fund Withdrawal Procedure",
    "procedure.withdrawal.generalTitle": "General Information",
    "procedure.withdrawal.generalDesc":
      "Withdrawals can be made during banking hours provided they do not exceed the effective margin in the client’s daily statement report.",
    "procedure.withdrawal.stepsTitle": "Withdrawal Steps",
    "procedure.withdrawal.step1":
      "Client opens the withdrawal menu in their live trading account and submits a withdrawal request according to applicable terms.",
    "procedure.withdrawal.step2":
      "Client fills in the withdrawal request form.",
    "procedure.withdrawal.accountTitle": "Destination Account Terms",
    "procedure.withdrawal.accountDesc":
      "Withdrawals can only be transferred to an account under the client’s name listed in the Account Opening Application Document.",
    "procedure.withdrawal.timeTitle": "Processing Time",
    "procedure.withdrawal.timeDesc":
      "Standard withdrawal processing takes three business days (T+3), but PT. Solid Gold Berjangka strives to process within one business day (T+1).",

    "procedure.regol.title": "Online Registration Procedure",
    "procedure.regol.step1.title": "1. Open the Company Website",
    "procedure.regol.step1.desc":
      "Access the official PT. Solid Gold Berjangka website to start online registration.",
    "procedure.regol.step2.title": "2. Demo Account Registration",
    "procedure.regol.step2.item1": "Input Data",
    "procedure.regol.step2.item2": "Demo Account",
    "procedure.regol.step2.item3": "Simulate transactions",
    "procedure.regol.step3.title": "3. Input Agreement Documents",
    "procedure.regol.step3.item1": "Agreement Application",
    "procedure.regol.step3.item2": "Risk Disclosure Document (DPAR)",
    "procedure.regol.step3.item3": "Power of Attorney Agreement (PPA)",
    "procedure.regol.step3.item4": "Transaction Mechanism (Trading Rules)",
    "procedure.regol.step3.item5": "Supporting data input (ID card, etc.)",
    "procedure.regol.step4.title": "4. Data Verification",
    "procedure.regol.step4.desc":
      "The appointed broker verifies prospective client data, namely:",
    "procedure.regol.step4.item1": "Prospective client personal data",
    "procedure.regol.step4.item2":
      "Depositing funds to the broker’s segregated account",
    "procedure.regol.transferTitle": "Transfer Destination Accounts",
    "procedure.regol.transferNote":
      "Send bank transfer slips via fax/email to PT. Solid Gold Berjangka.",
    "procedure.regol.idrAccount": "IDR Account No.",
    "procedure.regol.usdAccount": "USD Account No.",
    "procedure.regol.bank.bca": "BCA Bank, Sudirman Branch, Jakarta",
    "procedure.regol.bank.cimb": "CIMB Niaga Bank, Gajahmada Branch, Jakarta",
    "procedure.regol.bank.bni": "BNI Bank, Gambir Branch, Jakarta",
    "procedure.regol.bank.mandiri": "Mandiri Bank, Imam Bonjol Branch, Jakarta",
    "procedure.regol.bank.artha":
      "Artha Graha Bank, KPO Sudirman Branch, Jakarta",
    "procedure.regol.bank.bri":
      "Bank Rakyat Indonesia, Ciputat Branch, Tangerang",
    "procedure.regol.step5":
      "Client receives confirmation that funds/margin have been credited to PT. Solid Gold Berjangka’s segregated account.",
    "procedure.regol.step6":
      "Client receives a registered account number from PT. Solid Gold Berjangka.",
    "procedure.regol.step7":
      "Client receives an Official Receipt from PT. Solid Gold Berjangka.",
    "procedure.regol.step8":
      "After completing all procedures, the client will be confirmed to trade after receiving the online trading User ID and Password sent via SMS and email as listed in the account opening application.",

    "product.multilateralTitle": "JFX Products",
    "product.bilateralTitle": "SPA Products",
    "product.multilateralHeader": "Multilateral Products (JFX)",
    "product.bilateralHeader": "Bilateral Products (SPA)",
    "product.detailTitle": "Product Details",
    "product.errorLoad": "Failed to load product data",
    "product.notAvailable": "Product data is unavailable.",
    "product.specs": "Specifications {name}",
    "product.lastUpdate": "Last Update: {datetime} WIB",
    "product.lastUpdateEmpty": "Last Update: -",
    "product.emptyCategory": "No products for category {category}.",

    "product.characteristics.title": "Product Characteristics",
    "product.characteristics.items.1.title": "Capital Efficiency",
    "product.characteristics.items.1.desc":
      "With margin trading, investors can transact large positions with relatively small capital. With a minimum of 10% of total transaction value, full 100% funding is not required.",
    "product.characteristics.items.2.title": "Transaction Flexibility",
    "product.characteristics.items.2.desc":
      "Two-way transactions allow investors to capture opportunities when the market moves up or down.",
    "product.characteristics.items.3.title": "Highly Volatile Price Movement",
    "product.characteristics.items.3.desc":
      "Large daily price ranges of 100–500 points provide significant profit opportunities with contract size US $5/point and transaction fee of 3 points plus 11% VAT.",
    "product.characteristics.items.4.title": "High Liquidity",
    "product.characteristics.items.4.desc":
      "This product has very high liquidity, allowing investors to buy and sell at any time during market hours without queueing.",
    "product.characteristics.investmentTypes": "Investment Types",
    "product.characteristics.fixedTitle": "Fixed Rate",
    "product.characteristics.fixedItem1": "US $1 = Rp. 10,000 (fixed rate)",
    "product.characteristics.fixedItem2":
      "Avoids losses due to USD/Rupiah fluctuations",
    "product.characteristics.floatingTitle": "Floating Rate",
    "product.characteristics.floatingItem1":
      "US $1 = US $1 (based on USD/Rupiah rate)",
    "product.characteristics.floatingItem2":
      "No fees for USD deposits and withdrawals, partial or full",

    "product.illustration.title": "Transaction Illustration",
    "product.illustration.formulaTitle": "Transaction Calculation Formula",
    "product.illustration.notes": "Notes:",
    "product.illustration.contractSizeLabel": "Contract Size:",
    "product.illustration.contractSizeItem1":
      "US $5 per point for periodic stock index rolling contracts",
    "product.illustration.contractSizeItem2":
      "100 troy ounces for daily rolling Loco London gold contract",
    "product.illustration.nLotLabel": "n Lot:",
    "product.illustration.nLotDesc": "Number of lots traded",
    "product.illustration.feeLabel": "Facility Fee:",
    "product.illustration.feeDesc": "US $15 per lot per side (buy/sell)",
    "product.illustration.totalFeeLabel": "Total commission fee:",
    "product.illustration.totalFeeDesc": "US $30 for 1 lot settlement",
    "product.illustration.vatLabel": "VAT:",
    "product.illustration.vatDesc": "11% of commission fee (US $1.65/lot/side)",
    "product.illustration.totalVatLabel": "Total VAT fee:",
    "product.illustration.totalVatDesc": "US $3.3 for 1 lot settlement",
    "product.illustration.rolloverTitle": "Roll Over (Overnight) Fees",
    "product.illustration.contract": "Contract",
    "product.illustration.feePerNight": "Fee per Night",
    "product.illustration.rollover.row1.contract": "HKK5U and HKK50",
    "product.illustration.rollover.row1.fee": "US $3 / night",
    "product.illustration.rollover.row2.contract": "JPK5U and JPK50",
    "product.illustration.rollover.row2.fee": "US $2 / night",
    "product.illustration.rollover.row3.contract": "XULF and XUL10",
    "product.illustration.rollover.row3.fee": "US $5 / night",
    "product.illustration.example1Title": "Day Trade Example - Profit",
    "product.illustration.example1Desc":
      "A client opens a buy position in HKK5U at 24,600 points for 2 lots, then closes at 24,700 points.",
    "product.illustration.example2Title": "Day Trade Example - Loss",
    "product.illustration.example2Desc":
      "An investor predicts the Hang Seng Index will strengthen, opens a buy at 24,600 points for 1 lot, but closes at 24,550 points.",
    "product.illustration.example3Title": "Overnight Transaction Example",
    "product.illustration.example3Desc":
      "An investor predicts the Nikkei 225 will weaken, opens a sell at 14,850 points for 2 lots on June 10, and closes at 14,650 points on June 12.",
    "product.illustration.grossProfit": "Gross profit",
    "product.illustration.rolloverFeeLine":
      "Roll over fee (US $ 2 x 2 lots x 2 nights)",
    "product.illustration.netProfit": "Net profit",
    "product.illustration.contractTypesTitle": "Contract Codes & Types",
    "product.illustration.contractCode": "Contract Code",
    "product.illustration.base": "Base",
    "product.illustration.rateCategory": "Rate Category",
    "product.illustration.contractType": "Contract Type",
    "product.illustration.desc1":
      "Daily Rolling Spot Contract of Great Britain Pound Sterling (GBP) vs US Dollar (USD)",
    "product.illustration.desc2":
      "Daily Rolling Spot Contract of Euro (EUR) vs US Dollar (USD)",
    "product.illustration.desc3":
      "Daily Rolling Spot Contract of Australian Dollar (AUD) vs US Dollar (USD)",
    "product.illustration.desc4":
      "Daily Rolling Spot Contract of US Dollar (USD) vs Swiss Franc (CHF)",
    "product.illustration.desc5":
      "Daily Rolling Spot Contract of US Dollar (USD) vs Japanese Yen (JPY)",
    "product.illustration.calcTitle": "Transaction Calculation Illustration",
    "product.illustration.directRates": "For DIRECT RATES:",
    "product.illustration.indirectRates": "For INDIRECT RATES:",
    "product.illustration.formulaPL":
      "P/L = (Selling Price - Buying Price) x Contract Size x Number of Lots",
    "product.illustration.example4Title": "EU1010_BBJ Example (Daytrade)",
    "product.illustration.example4Desc":
      "Client buys EU1010_BBJ at 1.3530 for 2 lots, then sells at 1.3540:",
    "product.illustration.example4Down": "If price drops to 1.3525:",
    "product.illustration.example5Title": "UJ1010_BBJ Example (Daytrade)",
    "product.illustration.example5Desc":
      "Client sells UJ1010_BBJ at 102.20 for 1 lot, then closes at 102.12:",
    "product.illustration.example5Up": "If price rises to 102.27:",
    "product.illustration.netProfitLabel": "net profit",
    "product.illustration.netLossLabel": "net loss",
    "product.illustration.grossProfitLabel": "gross profit",
    "product.illustration.profitLabel": "profit",
    "product.illustration.lossLabel": "loss",

    "calendar.filters.today": "Today",
    "calendar.filters.thisWeek": "This Week",
    "calendar.filters.previousWeek": "Previous Week",
    "calendar.filters.nextWeek": "Next Week",
    "calendar.fetchError": "Failed to fetch data",
    "calendar.search": "Search data...",
    "calendar.time": "Time",
    "calendar.country": "Country",
    "calendar.impact": "Impact",
    "calendar.event": "Event",
    "calendar.loading": "Loading...",
    "calendar.previous": "Previous",
    "calendar.forecast": "Forecast",
    "calendar.actual": "Actual",
    "calendar.sources": "Sources",
    "calendar.measures": "Measures",
    "calendar.usualEffect": "Usual Effect",
    "calendar.frequency": "Frequency",
    "calendar.nextReleased": "Next Released",
    "calendar.notes": "Notes",
    "calendar.whyCare": "Why Trader Care",
    "calendar.date": "Date",
    "calendar.empty": "No data",
    "calendar.prev": "Previous",
    "calendar.next": "Next",
    "calendar.pageOf": "Page {current} of {total}",

    "history.title": "Historical Data",
    "history.date": "Date",
    "history.open": "Open",
    "history.high": "High",
    "history.low": "Low",
    "history.close": "Close",
    "history.error": "Failed to load data.",
    "history.empty": "No data for category {category}.",

    "news.suggestedTitle": "Curated picks so you don’t miss out.",
    "news.emptySuggested": "No recommended news.",
    "news.top": "TOP NEWS",
    "news.tickerLabel": "News and market ticker",
    "news.read": "Read:",
    "news.noDescription": "No description.",
    "news.alt": "News",
    "news.noTitle": "Untitled",

    "gallery.tiktok": "TikTok Video",
    "gallery.tiktokError": "Failed to load TikTok ID",
    "gallery.tiktokLoading": "Loading TikTok ID…",
    "gallery.legal": "Legality",
    "gallery.legalError": "Failed to load legality.",
    "gallery.legalEmpty": "No legality data yet.",
    "gallery.eduVideo": "Company Profile Video",
    "gallery.videoError": "Failed to load video.",
    "gallery.videoEmpty": "No video data yet.",
    "gallery.embedUnavailable": "Embed not available",
    "banner.company": "PT. Solid Gold Berjangka",
    "banner.title": "Welcome to",
    "banner.subtitle": "Solid Gold Berjangka",
    "banner.member":
      "Member of Jakarta Futures Exchange & Member of Indonesia Derivatives Clearing House",
    "banner.demo": "Demo Account Login",
    "banner.regol": "Online Account Registration",
    "banner.live": "Live Account Login",

    "home.aboutLabel": "About Us",
    "home.companyProfile": "Company Profile",

    "home.profile.p1":
      'Established in 2002, PT Solid Gold Berjangka ("SGB") is a registered futures brokerage company supervised by BAPPEBTI. With over 20 years of experience in the commodity futures industry, SGB is a member of the Jakarta Futures Exchange (BBJ) and Indonesia Clearing House (Persero).',
    "home.profile.p2":
      "Our services continue to expand with a total of 3 operational offices in Jakarta, Semarang, and Makassar.",
    "home.mission": "Company Mission",
    "home.vision": "Company Vision",
    "home.mission.item1":
      "To become a futures brokerage company with an international scale",
    "home.mission.item2":
      "To become a market leader both regionally and internationally",
    "home.vision.item1":
      "To develop and advance futures trading in Indonesia so it positively impacts the national economy at both micro and macro levels",
    "home.vision.item2":
      "To empower futures trading in Indonesia and help all parties who need it to use it as a hedging instrument",

    "tradingview.desc.pre":
      "Our chart is provided by TradingView, an international charting platform for traders and investors, providing high-performance market data such as ",
    "tradingview.desc.link": "EURUSD chart",
    "tradingview.desc.post":
      ", XAUUSD and other forex instruments, as well as advanced tools for more comprehensive market analysis: detailed symbol charts, the latest financial news, economic calendar, and more – simply everything a prepared trader may need.",

    "home.products": "PRODUCTS",
    "home.products.title": "Trading Products",
    "home.products.jfx": "Multilateral Products (JFX)",
    "home.products.spa": "Bilateral Products (SPA)",
    "home.products.viewAll": "View all",
    "home.products.emptyJfx": "No products available for JFX.",
    "home.products.emptySpa": "No products available for SPA.",

    "home.gallery": "Gallery",
    "home.videoLegal": "Official Digital Media & Social Channels",
    "home.informasiLabel": "Information",
    "home.informasiTitle": "Latest Information",
    "home.videoUmumLabel": "Video",
    "home.videoUmumTitle": "General Videos",
    "home.videoUmumEmptyTitle": "No Videos Yet",
    "home.videoUmumEmptyDesc": "Videos will be added soon.",

    "about.profileTitle": "Company Profile",
    "about.whyChoose": "Why choose us",
    "about.whyChooseTitle":
      "20+ years of experience, hundreds of clients served, and officially registered with BAPPEBTI.",
    "about.visionMissionTitle": "Company Vision & Mission",
    "about.visionClosing":
      "From PT. Solid Gold Berjangka’s vision and mission, we strive to build the company to advance futures trading in Indonesia and deliver positive impacts to the national economy at both macro and micro levels.",

    "legal.title": "Business Legality",
    "legal.subtitle":
      "Below are the legal documents that serve as the legal basis and official recognition for PT. Solid Gold Berjangka operations.",
    "legal.ctaTitle": "Complete and Verified Legality",
    "legal.ctaText":
      "All legality documents can be viewed directly at our office or through officially legalized copies.",
    "legal.ctaButton": "Contact Us for More Info",
    "legal.numberPrefix": "No.",
    "legal.docs.1.title":
      "Deed of Establishment of the Limited Liability Company",
    "legal.docs.1.desc":
      "Dated January 18, 2002 by Notary Soehendro Gautama, SH, PT. Solid Gold Berjangka",
    "legal.docs.2.title": "Approval from the Ministry of Law and Human Rights",
    "legal.docs.2.desc":
      "Official approval from the Ministry of Law and Human Rights",
    "legal.docs.3.title": "Exchange Membership Approval Letter (SPAB)",
    "legal.docs.3.desc": "Approval for futures exchange membership",
    "legal.docs.4.title": "Futures Brokerage Business License",
    "legal.docs.4.desc": "Decision of the Head of BAPPEBTI",
    "legal.docs.5.title": "Futures Clearing House Membership",
    "legal.docs.5.desc": "Official membership in the futures clearing house",
    "legal.docs.6.title": "Futures Broker License for Overseas Transactions",
    "legal.docs.6.desc":
      "License as a futures broker that offers and/or channels client orders for futures contracts on overseas exchanges",
    "legal.docs.7.title": "Cooperation Agreement with PT. Royal Assetindo",
    "legal.docs.7.desc":
      "Cooperation agreement with an Alternative Trading System Provider",
    "legal.docs.8.title": "Approval as SPA Participant",
    "legal.docs.8.desc":
      "Approval as a participant of the Alternative Trading System (SPA)",
    "legal.docs.9.title": "Electronic Client Acceptance",
    "legal.docs.9.desc":
      "Designation as a futures broker conducting electronic online client acceptance activities",
    "legal.docs.10.title":
      "Financial Derivatives Securities Trading Intermediary",
    "legal.docs.10.desc":
      "Principle approval for Financial Derivatives Market Participant as a trading intermediary by the Financial Services Authority",
    "legal.docs.11.title":
      "PUVA Derivatives Alternative Trading System Participant",
    "legal.docs.11.desc":
      "Registered as a Futures Broker – PUVA Derivatives Alternative Trading System participant at Bank Indonesia",

    "contact.title": "Contact Us",
    "contact.headOffice": "Head Office",
    "contact.mapError": "Failed to load map.",
    "contact.settingError": "Failed to load settings.",
    "contact.addressUnavailable": "Address unavailable",
    "contact.emailLabel": "Email address:",
    "contact.phone": "Phone",
    "contact.fax": "Fax",
    "contact.email": "Email",
    "contact.branchOffice": "Branch Offices",
    "contact.branchError": "Failed to load branch offices.",
    "contact.branchEmpty": "No branch office data yet.",
    "contact.mapsUnavailable": "Map link unavailable",
    "contact.onlineComplaint": "Online Complaint",
    "contact.onlineComplaintAlt": "ONLINE COMPLAINT SUBMISSION",

    "wakil.title": "List of Brokers",
    "wakil.subtitle": "Below is the list of SGB Futures Brokers.",
    "wakil.pickBranch": "Select Branch",
    "wakil.loading": "Loading data...",
    "wakil.error": "Failed to load broker data.",
    "wakil.sectionTitle": "All experienced experts are here",
    "wakil.errorDetail": "Failed to load data. Please refresh the page.",
    "wakil.empty": "No broker data yet.",
    "wakil.detailTitle": "Broker Details",
    "wakil.detailError": "Failed to load broker details.",
    "wakil.idNumber": "ID Number",
    "wakil.branch": "Branch",
    "wakil.viewMap": "View Map",
    "wakil.total": "Total",
    "wakil.active": "Aktif",
    "wakil.inactive": "Non-Aktif",

    "news.readMore": "READ MORE",
    "news.suggested": "Suggested News",
    "news.latestTitle": "Latest News Updates",
    "news.emptyLatest": "No latest news.",
    "news.emptyList": "No matching news found.",
    "news.readMoreCta": "Read More...",
    "news.notFound": "News not found.",
    "news.label": "Berita",
    "news.fetchError": "Gagal mengambil data berita (status {status}).",
    "news.loadError": "Terjadi kesalahan saat memuat berita.",

    "modal.title": "DOWNLOAD PRO TRADER NOW!",
    "modal.desc":
      "Get the best trading experience directly from your smartphone. Download the Pro Trader app now and enjoy full features, latest news, and quick access to demo and live accounts.",
    "modal.playStore": "Download on Play Store",
    "modal.appStore": "Download on App Store",

    "stats.legalTitle": "Official",
    "stats.legalDesc": "Legality & BAPPEBTI",
    "stats.onlineTitle": "Online",
    "stats.onlineDesc": "Trading & Monitoring",
    "stats.supportDesc": "Research & Support",

    "watcher.supervised": "LICENSED & SUPERVISED",
    "watcher.membership": "MEMBERSHIP OF",
    "watcher.alt.bappebti": "BAPPEBTI Logo",
    "watcher.alt.ojk": "OJK Logo",
    "watcher.alt.bi": "Bank Indonesia Logo",
    "watcher.alt.jfx": "JFX Logo",
    "watcher.alt.kbi": "KBI Logo",
    "watcher.alt.aspebtindo": "Aspebtindo",

    "market.loading": "Loading market...",
    "market.error": "Failed to load market.",
    "market.empty": "No market data.",
    "market.scrollLeft": "Scroll left",
    "market.scrollRight": "Scroll right",
  },
};
