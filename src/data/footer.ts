import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

export type FooterLocale = "id" | "en";

export type FooterContent = {
  logoAlt: string;
  desc: string;
  socialsTitle: string;
  disclaimerLabel: string;
  disclaimerBody: string;
  brandTitle: string;
  legalTitle: string;
  legalItems: { label: string; number: string }[];
  socials: { name: string; url: string; icon: IconDefinition }[];
  copyrightProtected: string;
  komdigiAlt: string;
  tsiAlt: string;
};

export const BRAND_NAME = "Solid Gold Berjangka";

const legalNumbers = [
  "C-05612 HT.01.01.TH.2002",
  "SPAB-047/BBJ/07/02",
  "161/BAPPEBTI/SI/IX/2002",
  "15/AK-KBI/V/2003",
  "262/CO-BOD/SGB/VI/2005",
  "1156/BAPPEBTI/SI/3/2007",
  "27/BAPPEBTI/KEP-PBK/09/2014",
  "S-373/PM.02/2025",
  "27/663/DPPK/Srt/B",
  "004/BAPPEBTI/KEP-PBK/CDDS/007/2026",
];

const legalLabels: Record<FooterLocale, string[]> = {
  id: [
    "Kemenkumham",
    "SPAB",
    "Izin Pialang Berjangka",
    "Keanggotaan KBI",
    "PKS PT Royal Assetindo",
    "SK BAPPEBTI",
    "Penerimaan Nasabah Online",
    "Perantara PEDK (OJK)",
    "Peserta SPA PUVA (BI)",
    "CDD Sederhana",
  ],
  en: [
    "Ministry of Justice & Human Rights",
    "SPAB",
    "Futures Brokerage License",
    "KBI Membership",
    "Royal Assetindo Agreement",
    "BAPPEBTI Decree",
    "Online Customer Acceptance",
    "PEDK License (OJK)",
    "PUVA ATS Participant (BI)",
    "Simplified CDD",
  ],
};

const buildLegalItems = (locale: FooterLocale) =>
  legalLabels[locale].map((label, i) => ({ label, number: legalNumbers[i] }));

export const footerContent: Record<FooterLocale, FooterContent> = {
  id: {
    logoAlt: "Logo Solid Gold Berjangka",
    desc: "Pialang berjangka terdaftar BAPPEBTI sejak 2002, anggota BBJ dan KBI. Transfer dana hanya ke Segregated Account resmi PT Solid Gold Berjangka. Jangan mengirim dana ke rekening pribadi.",
    socialsTitle: "MEDIA SOSIAL",
    disclaimerLabel: "Disclaimer:",
    disclaimerBody:
      "Perdagangan berjangka memiliki risiko tinggi dan memerlukan pemahaman yang memadai sebelum melakukan transaksi. Informasi pada website ini hanya bersifat edukasi dan referensi, bukan ajakan atau jaminan keuntungan. Setiap keputusan transaksi sepenuhnya menjadi tanggung jawab nasabah.",
    brandTitle: "Tautan Cepat",
    legalTitle: "Legalitas",
    legalItems: buildLegalItems("id"),
    socials: [
      { name: "Instagram", url: "https://www.instagram.com/solidgoldberjangka.official/", icon: faInstagram },
      { name: "YouTube", url: "https://www.youtube.com/@Ptsolidgoldberjangka", icon: faYoutube },
      { name: "TikTok", url: "https://www.tiktok.com/@solid.prime", icon: faTiktok },
    ],
    copyrightProtected: "Hak cipta dilindungi.",
    komdigiAlt: "Logo Komdigi",
    tsiAlt: "Logo TSI",
  },
  en: {
    logoAlt: "Solid Gold Berjangka logo",
    desc: "PT Solid Gold Berjangka urges the public to stay alert against investment scams. All transaction fund transfers must only be made to official Segregated Accounts under PT Solid Gold Berjangka.",
    socialsTitle: "SOCIAL MEDIA",
    disclaimerLabel: "Disclaimer:",
    disclaimerBody:
      "Futures trading carries high risk and requires adequate understanding before placing transactions. The information on this website is for education and reference only, not an invitation or guarantee of profit. Every transaction decision remains fully the client's responsibility.",
    brandTitle: "Quick Links",
    legalTitle: "Legality",
    legalItems: buildLegalItems("en"),
    socials: [
      { name: "Instagram", url: "https://www.instagram.com/solidgoldjakarta.official/", icon: faInstagram },
      { name: "Facebook", url: "https://facebook.com/example", icon: faFacebookF },
      { name: "YouTube", url: "https://www.youtube.com/@Ptsolidgoldberjangka", icon: faYoutube },
      { name: "Twitter", url: "https://youtube.com/example", icon: faXTwitter },
      { name: "TikTok", url: "https://www.tiktok.com/@solid.prime", icon: faTiktok },
    ],
    copyrightProtected: "All rights reserved.",
    komdigiAlt: "Komdigi logo",
    tsiAlt: "TSI logo",
  },
};
