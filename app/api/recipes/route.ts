import { generateSlug } from "@/helpers/slug-generator";
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function POST(req: Request) {
  try {
    // SESSION da kullanılcak user
    const user = await currentUser();

    const userId = user?.id;

    const body = await req.json();

    const { name, categoryId, description, images } = body;

    const realCatId = parseInt(categoryId, 10);

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    console.log(userId)

    const userByUserId = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("WTF?!", { status: 500 });
    }

    // creating slug
    const slug = generateSlug(name);

    console.log(`${slug} ${userId} ${name} ${realCatId} ${typeof realCatId}`);

    // ayni ismi vermek onemli Images
    const recipe = await prismadb.recipe.create({
      data: {
        name,
        userId,
        description,
        categoryId: realCatId,
        slug,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.log("[RECIPE_POST]", error);
    return new NextResponse("Interval error", { status: 500 });
  }
}

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;

    const realCatId = categoryId ? parseInt(categoryId, 10) : undefined;

    // varsa filtereleyip getirir yoksa hic yokmus gibi davranir -- Undefined ise yani
    const recipes = await prismadb.recipe.findMany({
      where: {
        categoryId: realCatId,
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.log("[RECIPES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
