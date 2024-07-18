import prismadb from "@/lib/prismadb";
import { Recipe } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`;

interface Query {
  category?: string;
  filter?: string;
  page? : number;
}

// pagination sayfa: D

const getRecipes = async (query?: Query): Promise<Recipe[]> => {
  const RecipesUrl = qs.stringifyUrl({
    url: URL,
    query: {
      category: query?.category,
      filter: query?.filter,
      page: query?.page,
    },
  });

  // caching olmasın dedim
  const response = await fetch(RecipesUrl, { cache: "no-store" });

  return response.json();
};

export default getRecipes;
