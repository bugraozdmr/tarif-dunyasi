"use client";

import { useState, useEffect } from "react";
import { Billboard } from "@/components/billboard";
import SogukBaklava from "@/public/soguk-baklava.jpg";
import { RecipeList } from "@/components/recipe-list";
import AddRecipeButton from "@/components/add-recipe-button";
import getRecipes from "@/actions/recipe/get-recipes";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/types";
import Loading from "./loading";

// tip düzeltmesi
const nullToUndefined = (value: string | null): string | undefined => {
  return value === null ? undefined : value;
};

// Client oldugu icin loading gelmicek artik

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const filter = nullToUndefined(params.get("filter"));

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await getRecipes({ filter });
      setRecipes(fetchedRecipes);
      setLoading(false);
    };

    fetchRecipes();
  }, [filter]);

  const billboard = {
    label: "En sevdiğiniz yemeklerin tariflerini öğrenin ve paylaşın",
    imageUrl: SogukBaklava.src,
  };

  return (
    <>
      {!filter && (
        <AddRecipeButton />
      )}
      <div className="space-y-10 pb-10">
        {!filter && <Billboard data={billboard} />}

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Loading />
          ) : (
            <RecipeList
              title={
                filter
                  ? `"${filter}" için ${recipes.length} sonuç bulundu`
                  : "Son eklenen tarifler"
              }
              items={recipes}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
