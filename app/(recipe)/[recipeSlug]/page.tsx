"use client";

import { getCommentCount } from "@/actions/comment/get-comment-count";
import getComments from "@/actions/comment/get-comments";
import getRecipe from "@/actions/recipe/get-recipe";
import ClientLoading from "@/components/client-loading";
import { Gallery } from "@/components/gallery";
import { Info } from "@/components/info";
import Container from "@/components/ui/container";
import { Comment, Recipe } from "@/types";
import { Pagination } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface RecipePageProps {
  params: {
    recipeSlug: string;
  };
}

const CategoryRecipePage: React.FC<RecipePageProps> = ({ params }) => {
  const [count, setCount] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [recipe,setRecipe] = useState<Recipe>();
  const [comment_count,setCommentCount] = useState<number>();
  const [comments,setComments] = useState<Comment[]>();

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipe = await getRecipe(params.recipeSlug);

      setRecipe(recipe);

      if (!recipe) {
        return notFound();
      }

      setLoading(true);

      const count = await getCommentCount({ recipeId: recipe.id });
      setCommentCount(count);

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

      const comments = await getComments({ recipeId: recipe.id,page:currentPage });
      setComments(comments);

      setLoading(false);
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {(recipe) ? (
              <>
              <Gallery images={recipe.images} />
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={recipe} comment_count={comment_count as number} comments={comments} />
                {(pageCount && pageCount !== 0 && pageCount !== 1) && (
              <div className="flex justify-center mt-4">
                <Pagination 
                total={pageCount}
                initialPage={currentPage}
                color="primary"
                onChange={handlePageChange}/>
              </div>
            )}
              </div>
              
              </>
            ) : (
              <ClientLoading />
            )}
          </div>
        </div>
      </Container>
      <hr className="mx-4" />
    </div>
  );
};

export default CategoryRecipePage;
