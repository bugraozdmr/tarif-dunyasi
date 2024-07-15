
import { Billboard } from "@/components/billboard";
import SogukBaklava from "@/public/soguk-baklava.jpg";

import { RecipeList } from "@/components/recipe-list";
import AddRecipeButton from "@/components/add-recipe-button";
import getRecipes from "@/actions/product/get-recipes";

const HomePage = async () => {
  const billboard = {
    label: "En sevdiğiniz yemeklerin tariflerini öğrenin ve paylaşın",
    imageUrl: SogukBaklava.src,
  };

  // RECIPES
  const recipes = await getRecipes();

  return (
    <>
      <AddRecipeButton />
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <RecipeList title="Son eklenen tarifler" items={recipes} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
