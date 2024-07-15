import getRecipes from "@/actions/recipe/get-recipes";
import { Billboards } from "@/billboardData";
import AddRecipeButton from "@/components/add-recipe-button";
import { Billboard } from "@/components/billboard";
import { RecipeList } from "@/components/recipe-list";
import Container from "@/components/ui/container";
import { GetCategoryBySlug } from "@/data/get-category-name";

interface ProductPageProps {
  params: {
    categorySlug: string;
  };
}

const CategoryPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const billboards = Billboards;

  // PATH
  const categorySlug = params.categorySlug;

  const billboardC = billboards.find((b) => b.name === categorySlug);

  const billboard = {
    label: billboardC?.label as string,
    imageUrl: billboardC?.imageUrl as string,
  };

  const recipes = await getRecipes({ category: categorySlug });

  return (
    <>
      <AddRecipeButton />
      <Container>
        <div className="space-y-10 pb-10">
          {billboard && <Billboard data={billboard} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <RecipeList title="Son eklenen tarifler" items={recipes} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
