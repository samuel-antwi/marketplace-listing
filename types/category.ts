export interface SubCategories {
  url: string;
  title: string;
  id: number;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  uiLabel: string;
  slug: string;
  href: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  subCategories: SubCategories[];
}
