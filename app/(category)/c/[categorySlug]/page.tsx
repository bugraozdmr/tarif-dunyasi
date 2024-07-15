"use client";

import { Billboards } from "@/billboardData";
import AddRecipeButton from "@/components/add-recipe-button";
import { Billboard } from "@/components/billboard";
import Container from "@/components/ui/container";
import { usePathname } from "next/navigation";

const CategoryPage = () => {
  const billboards = Billboards;

  // PATH
  let path = usePathname();
  let nameParts = path.split("/");
  let categoryName = nameParts[nameParts.length - 1];

  const billboardC = Billboards.find((b) => b.name === categoryName);
  console.log(billboardC);

  const billboard = {
    label: billboardC?.label as string,
    imageUrl: billboardC?.imageUrl as string,
  };

  return (
    <>
    <AddRecipeButton />
      <Container>
        <div className="space-y-10 pb-10">
          {billboard && <Billboard data={billboard} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {/*<RecipeList title="Son eklenen tarifler" items={recipes} /> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
