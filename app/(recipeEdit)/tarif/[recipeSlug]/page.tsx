import { Categories } from "@/categoryData";
import { RecipeForm } from "./components/recipe-form";
import prismadb from "@/lib/prismadb";

const CreateEditRecipe = async ({
  params,
}: {
  params: { recipeSlug: string };
}) => {
  const categories = Categories;

  // tarif var mı yok mu kontrol ona göre bilgi gelir ...
  const recipe = await prismadb.recipe.findUnique({
    where: {
      slug: params.recipeSlug,
    },
    include: {
      images: true,
    },
  });


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecipeForm initialData={recipe} categories={categories} />
      </div>
    </div>
  );
};

export default CreateEditRecipe;
