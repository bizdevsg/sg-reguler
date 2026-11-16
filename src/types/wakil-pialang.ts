export type RepresentativeCategory = {
  id: number | string;
  slug: string;
  nama_kategori: string;
  alamat_kantor_cabang?: string;
  telp?: string;
  link_google_maps?: string;
  wakil_pialangs_count?: number;
};

export type Representative = {
  id: number | string;
  slug: string;
  nama: string;
  no_identitas: string;
  status: string;
  status_label?: string;
  category?: RepresentativeCategory | null;
};

export type WakilPialangPageData = {
  categories: RepresentativeCategory[];
  selectedCategory?: string;
  selectedCategoryInfo?: RepresentativeCategory;
  representatives: Representative[] | null;
};
