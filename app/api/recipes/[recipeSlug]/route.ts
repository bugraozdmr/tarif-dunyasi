import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function PATCH(
  req: Request,
  { params }: { params: { recipeSlug: string } }
) {
  try {
    const user = await currentUser();

    const userId = user?.id;
    
    const body = await req.json();

    const { name, categoryId, images, description } = body;

    // categori duzenleme
    const realCatId = parseInt(categoryId, 10);
    if (isNaN(realCatId)) {
      return new NextResponse("Category Id wrong! (not int or unrecognized)", {
        status: 400,
      });
    }

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("isim gerekli", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Açıklama gerekli", { status: 400 });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!params.recipeSlug) {
      return new NextResponse("Slug eksik", { status: 400 });
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

    await prismadb.recipe.update({
      where: {
        id: recipeByUserId.id,
      },
      data: {
        name,
        categoryId:realCatId,
        images: {
          deleteMany: {},
        },
      },
    });

    // Once patch yerine update gerek yoksa olmuyor image'den dolayı once sil resimleri update ile sonra tekrar update ederek yukle

    const recipe = await prismadb.recipe.update({
      where: {
        id: recipeByUserId.id,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.log("[RECIPE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
