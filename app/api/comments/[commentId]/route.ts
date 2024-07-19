import { CurrentRole, currentUser } from "@/lib/auth";
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
    const role = await CurrentRole();

    if(role !== 'ADMIN'){
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.commentId) {
      return new NextResponse("Comment Id gerekli", { status: 400 });
    }

    const comment = await prismadb.comment.deleteMany({
      where: {
        id: params.commentId,
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
