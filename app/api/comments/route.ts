import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function POST(req: Request) {
  try {
    // SESSION da kullanılcak user
    const user = await currentUser();

    const userIdd = user?.id;

    const body = await req.json();

    const { text, recipeId, userId } = body;

    console.log(userId,userIdd);

    if(userIdd !== userId){
      return new NextResponse("WTF?", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!text) {
      return new NextResponse("comment is required", { status: 400 });
    }
    
    if (!recipeId) {
      return new NextResponse("recipeId is required", { status: 400 });
    }

    
    const userByUserId = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("WTF?!", { status: 500 });
    }


    // ayni ismi vermek onemli Images
    const comment = await prismadb.comment.create({
      data: {
        text,
        recipeId,
        userId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_POST]", error);
    return new NextResponse("Interval error", { status: 500 });
  }
}

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const recipeId = searchParams.get("recipeId") || undefined;
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

    const comments = await prismadb.comment.findMany({
      where: {
        recipeId: recipeId,
      },
      skip : 6*(page-1),
      take :6,
      select: {
        id : true,
        text: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        recipe : {
          select: {
            name : true,
            slug : true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    

    return NextResponse.json(comments);
  } catch (error) {
    console.log("[COMMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
