import type { AppMessages } from "../../shared/messages";

export const enNavbar: AppMessages["navbar"] = {
  login: "Login",
  openAccount: "Open Demo Account",
  switchLocaleLabel: "Select a Language",
  switchLocaleIconAlt: "Indonesia flag icon",
  openMenuLabel: "Open navigation menu",
  closeMenuLabel: "Close navigation menu",
  scrollToTopLabel: "Scroll back to top",
  backToMainWebsite: "Main Website",
  menuGroups: [
    {
      label: "Products",
      items: [
        { label: "Multilateral (JFX)", href: "/product/jfx" },
        { label: "Bilateral (SPA)", href: "/product/spa" },
        {
          label: "Product Characteristics",
          href: "/product/karakteristik-produk",
        },
        {
          label: "Transaction Illustration",
          href: "/product/ilustrasi-transaksi",
        },
      ],
    },
    {
      label: "Procedures",
      items: [
        { label: "Transaction Guide", href: "/prosedur/petunjuk-transaksi" },
        { label: "Withdrawal Procedure", href: "/prosedur/prosedur-penarikan" },
        {
          label: "Online Registration Procedure",
          href: "/prosedur/prosedur-regol",
        },
        {
          label: "Online Trading Display",
          href: "/edukasi/tampilan-transaksi-online",
        },
      ],
    },
    { label: "Wakil Pialang Berjangka", href: "/wakil-pialang-berjangka" },
  ],
};
