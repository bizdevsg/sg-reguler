import type { AppMessages } from "../../shared/messages";

export const idNavbar: AppMessages["navbar"] = {
  login: "Masuk",
  openAccount: "Open Demo Account",
  switchLocaleLabel: "Pilih Bahasa",
  switchLocaleIconAlt: "Ikon bendera Amerika Serikat",
  openMenuLabel: "Buka menu navigasi",
  closeMenuLabel: "Tutup menu navigasi",
  scrollToTopLabel: "Kembali ke atas",
  backToMainWebsite: "Website Utama",
  menuGroups: [
    {
      label: "Produk",
      items: [
        { label: "Multilateral (JFX)", href: "/product/jfx" },
        { label: "Bilateral (SPA)", href: "/product/spa" },
        {
          label: "Karakteristik Produk",
          href: "/product/karakteristik-produk",
        },
        { label: "Ilustrasi Transaksi", href: "/product/ilustrasi-transaksi" },
      ],
    },
    {
      label: "Prosedur",
      items: [
        { label: "Petunjuk Transaksi", href: "/prosedur/petunjuk-transaksi" },
        { label: "Prosedur Penarikan", href: "/prosedur/prosedur-penarikan" },
        {
          label: "Prosedur Registrasi Online",
          href: "/prosedur/prosedur-regol",
        },
        {
          label: "Tampilan Transaksi Online",
          href: "/edukasi/tampilan-transaksi-online",
        },
      ],
    },
    {
      label: "Wakil Pialang Berjangka",
      href: "/wakil-pialang-berjangka",
    },
  ],
};
