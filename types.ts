
export interface Billboard {
  label: string;
  imageUrl: string;
  name? : string;
}

export interface Recipe {
  id: string;
  name: string;
  user : User;
  categoryId : number;
  ingredients : string;
  description : string;
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


export interface User {
  id: string;
  name: string;
  image : string;
}

export interface Comment{
  id : string;
  text : string;
  user : User;
  createdAt: Date;
}