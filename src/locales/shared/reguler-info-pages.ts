export type RegulerInfoPageKey =
  | "karakteristikProduk"
  | "ilustrasiTransaksi"
  | "petunjukTransaksi"
  | "prosedurPenarikan"
  | "prosedurRegol"
  | "tampilanTransaksiOnline";

export type InfoItem = {
  title: string;
  body?: string;
  points?: string[];
};

export type InfoResult = {
  label: string;
  value: string;
  tone?: "profit" | "loss";
};

export type InfoBlock =
  | { type: "cards"; title?: string; items: InfoItem[] }
  | { type: "steps"; title?: string; items: InfoItem[] }
  | {
      type: "table";
      title?: string;
      intro?: string;
      columns: string[];
      rows: string[][];
    }
  | {
      type: "formula";
      title: string;
      formula: string;
      notesTitle?: string;
      notes: string[];
    }
  | {
      type: "callout";
      title?: string;
      paragraphs?: string[];
      points?: string[];
      results?: InfoResult[];
    };

export type RegulerInfoPage = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  blocks: InfoBlock[];
  cta?: {
    title: string;
    body: string;
  };
};

export type RegulerInfoPagesContent = {
  labels: {
    openAccount: string;
    demoLogin: string;
    liveLogin: string;
  };
  pages: Record<RegulerInfoPageKey, RegulerInfoPage>;
};
