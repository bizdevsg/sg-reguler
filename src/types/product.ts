export type HomeProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type ProductCategory = "jfx" | "spa";
export type ProductDetail = HomeProduct & { specs: string };
