import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// PATCH ISTEMİYORUM COMMENTTE

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function DELETE(
  req: Request,
  { params }: { params: { recipeSlug: string } }
) {
  try {
    const user = await currentUser();

    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.recipeSlug) {
      return new NextResponse("Slug gerekli", { status: 400 });
    }

    const recipeByUserId = await prismadb.recipe.findFirst({
      where: {
        slug: params.recipeSlug,
        userId,
      },
    });

    if (!recipeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const recipe = await prismadb.recipe.deleteMany({
      where: {
        id: recipeByUserId.id,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.log("[RECIPE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { recipeSlug: string } }
) {
  try {
    if (!params.recipeSlug) {
      return new NextResponse("Slug gerekli", { status: 400 });
    }

    const recipe = await prismadb.recipe.findUnique({
      where: {
        slug: params.recipeSlug,
      },
      include: {
        images: true,
        user: {
          select : {
            name : true,
            image : true
          }
        },
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.log("[RECIPE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
