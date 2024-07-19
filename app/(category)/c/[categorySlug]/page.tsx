"use client";

import getRecipeCount from "@/actions/recipe/get-recipe-count";
import getRecipes from "@/actions/recipe/get-recipes";
import Loading from "@/app/loading";
import { Billboards } from "@/billboardData";
import { Categories } from "@/categoryData";
import AddRecipeButton from "@/components/add-recipe-button";
import { Billboard } from "@/components/billboard";
import { RecipeList } from "@/components/recipe-list";
import Container from "@/components/ui/container";
import { Recipe } from "@/types";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: {
    categorySlug: string;
  };
}

const CategoryPage: React.FC<ProductPageProps> = ({ params }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const billboards = Billboards;

  // PATH
  const categorySlug = params.categorySlug;

  const billboardC = billboards.find((b) => b.name === categorySlug);

  const billboard = {
    label: billboardC?.label as string,
    imageUrl: billboardC?.imageUrl as string,
  };

  const category = Categories.find((c) => c.slug === params.categorySlug);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      const count = await getRecipeCount({ category: params.categorySlug });
      setCount(count);

      // TODO 12 YAPILCAK
      if (count > 6) {
        if (count % 6 === 0) {
          setPageCount(count / 6);
        } else {
          setPageCount(count / 6 + 1);
        }
      } else {
        setPageCount(null);
      }

      const fetchedRecipes = await getRecipes({
        category: params.categorySlug,
        page: currentPage,
      });
      setRecipes(fetchedRecipes);

      setLoading(false);
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AddRecipeButton />
      <Container>
        <div className="space-y-10 pb-10">
          {billboard && <Billboard data={billboard} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {loading ? (
              <Loading />
            ) : (
              <RecipeList title={`${category?.name} kategorisindeki tarifler`} items={recipes} />
            )}
            {pageCount && pageCount !== 0 && pageCount !== 1 && (
              <div className="flex justify-center">
                <Pagination
                  total={pageCount}
                  initialPage={currentPage}
                  color="warning"
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
