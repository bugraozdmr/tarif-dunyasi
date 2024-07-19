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
import getRecipeCount from "@/actions/recipe/get-recipe-count";
import { Pagination } from "@nextui-org/react";
import { cookies } from "next/headers";
import getCookies from "@/helpers/get-cookies";

// tip düzeltmesi
const nullToUndefined = (value: string | null): string | undefined => {
  return value === null ? undefined : value;
};

// Client oldugu icin loading gelmicek artik

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useSearchParams();
  const filter = nullToUndefined(params.get("filter"));

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      const count = await getRecipeCount({ filter });
      setCount(count);

      // TODO 12 YAPILCAK
      if(count > 6){
        if(count % 6 === 0){
          setPageCount(count / 6)
        }
        else{
          setPageCount((count / 6) + 1)
        }
      }
      else{
        setPageCount(null);
      }

      const fetchedRecipes = await getRecipes({ filter , page:currentPage });
      setRecipes(fetchedRecipes);

      setLoading(false);
    };

    fetchRecipes();
  }, [filter,currentPage]);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            <>
            <RecipeList
              title={
                filter
                  ? `"${filter}" için ${count ? `${count}` : 0} sonuç bulundu`
                  : "Son eklenen tarifler"
              }
              items={recipes}
            />
            {(pageCount && pageCount !== 0 && pageCount !== 1) && (
              <div className="flex justify-center">
                <Pagination 
                total={pageCount}
                initialPage={currentPage}
                color="warning"
                onChange={handlePageChange}/>
              </div>
            )}
            </>
          )}
          
        </div>
      </div>
    </>
  );
};

export default HomePage;
