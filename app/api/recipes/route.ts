import { GetCategory, GetCategoryBySlug } from "@/data/get-category-name";
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

    const { name, categoryId, description, images,ingredients } = body;

    const realCatId = parseInt(categoryId, 10);

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!ingredients) {
      return new NextResponse("ingredients are required", { status: 400 });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }


    // Image extension check
    const validExtensions = ['.png', '.jpg', '.jpeg'];
    for (const image of images) {
      const url = image.url;
      const extension = url.slice(url.lastIndexOf('.')).toLowerCase();

      if (!validExtensions.includes(extension)) {
        return new NextResponse("Kabul edilen türde resim yükleyiniz!", { status: 400 });
      }
    }



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


    // ayni ismi vermek onemli Images
    const recipe = await prismadb.recipe.create({
      data: {
        name,
        userId,
        ingredients,
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
// filterleri bura dus aslan
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get("category") || undefined;
    const filter = searchParams.get("filter") || undefined;
    const pageNumber = searchParams.get("page") || undefined;

    // PAGINATION -- SKIP
    let page: number | undefined;

    if (pageNumber !== null) {
      const parsedPage = parseInt(pageNumber as string, 10);
      if (!isNaN(parsedPage) && parsedPage >= 0) {
        page = parsedPage;
      }
      else{
        page = 1;
      }
    }
    else{
      page = 1;
    }
    

    // varsa filtereleyip getirir yoksa hic yokmus gibi davranir -- Undefined ise yani
    // include sorun olmasın diye select kullandık

    const category = GetCategoryBySlug(categorySlug);

    const recipes = await prismadb.recipe.findMany({
      where: {
        categoryId: category?.id,
        name: {
          contains: filter,
          mode: "insensitive", // Büyük/küçük harf duyarsız arama yapmak için
        },
      },
      skip : 6*(page-1),
      take :6,
      select: {
        name: true,
        categoryId: true,
        slug: true,
        description: true,
        ingredients: true,
        createdAt: true,
        images: {
          select: {
            id: true,
            recipeId: true,
            url: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    

    return NextResponse.json(recipes);
  } catch (error) {
    console.log("[RECIPES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}