
export interface Billboard {
  label: string;
  imageUrl: string;
  name? : string;
}

export interface Recipe {
  id: string;
  name: string;
  // degisir
  userId: string;
  Category: Category;
  images: Image[];
  createdAt: Date;
  slug : string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  description : string;
  slug: string;
  // nedeni categoryData'da
  icon: string;
}
