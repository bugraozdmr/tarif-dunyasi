import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// PATCH ISTEMİYORUM COMMENTTE

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const user = await currentUser();

    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.commentId) {
      return new NextResponse("Comment Id gerekli", { status: 400 });
    }

    const commentByUserId = await prismadb.comment.findFirst({
      where: {
        id : params.commentId,
        userId,
      },
    });

    if (!commentByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const comment = await prismadb.comment.deleteMany({
      where: {
        id: commentByUserId.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    if (!params.commentId) {
      return new NextResponse("Comment id gerekli", { status: 400 });
    }

    const comment = await prismadb.comment.findUnique({
      where: {
        id : params.commentId
      },
      include: {
        user: {
          select : {
            name : true,
            image : true
          }
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
