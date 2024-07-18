import { Comment } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/comments?recipeId=`;


const getComments = async ({recipeId,page} : {recipeId:string,page? : number;}) : Promise<Comment[]> => {
    // caching olmasın dedim
    // elle verildi page
    const response = await fetch(`${URL}${recipeId}&page=${page}`,{ cache: 'no-store' });

    return response.json();
}

export default getComments;
