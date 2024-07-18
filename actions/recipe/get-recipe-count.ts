"use server"

// use server olmazsa hata alırsın browserda çalışmaz diye

import { GetCategoryBySlug } from "@/data/get-category-name";
import prismadb from "@/lib/prismadb";


interface Query {
  category?: string;
  filter?: string;
}

const getRecipeCount = async (query?: Query): Promise<number> => {
    // kategori filtrelemek icin bu bir tık şart statik'den id cek
  const category = GetCategoryBySlug(query?.category);

  // HER ŞEY ICIN API'A GIDILMEZKI AMK
  const count = await prismadb.recipe.count({
    where: {
      categoryId: category?.id,
      name: {
        contains: query?.filter,
        mode: "insensitive",
      },
    },
  });

  return count;
};

export default getRecipeCount;
