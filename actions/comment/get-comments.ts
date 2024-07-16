import { Comment } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/comments?recipeId=`;


const getComments = async ({recipeId} : {recipeId:string}) : Promise<Comment[]> => {
    // caching olmasın dedim
    const response = await fetch(`${URL}${recipeId}`,{ cache: 'no-store' });

    return response.json();
}

export default getComments;
