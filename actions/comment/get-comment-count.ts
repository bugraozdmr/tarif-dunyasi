"use server";

import prismadb from "@/lib/prismadb";

interface GetCommentCountParams {
  recipeId: string;
}

export const getCommentCount = async ({ recipeId }: GetCommentCountParams) => {
  const count = await prismadb.comment.count({
    where: {
      recipeId: recipeId,
    },
  });

  return count;
};
