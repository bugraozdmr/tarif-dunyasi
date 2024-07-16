import getRecipe from "@/actions/recipe/get-recipe";
import { Gallery } from "@/components/gallery";
import { Info } from "@/components/info";
import Container from "@/components/ui/container";
import { notFound } from "next/navigation";
import React from "react";
import EditLayout from "./layout";

interface RecipePageProps {
  params: {
    recipeSlug: string;
  };
}

const CategoryRecipePage: React.FC<RecipePageProps> = async ({ params }) => {
  const recipe = await getRecipe(params.recipeSlug);

  if (!recipe) {
    return notFound();
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={recipe.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={recipe} />
            </div>
          </div>
        </div>
      </Container>
      <hr className="mx-4" />
    </div>
  );
};

export default CategoryRecipePage;
