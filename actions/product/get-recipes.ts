import { Recipe } from "@/types";
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`;

interface Query{
    categoryId? : string;
}

const getRecipes = async (query? : Query) : Promise<Recipe[]> => {
    const url = qs.stringifyUrl({
        url : URL,
        query : {
            categoryId : query?.categoryId,
        },
    });

    // caching olmasın dedim
    const response = await fetch(url,{ cache: 'no-store' });


    return response.json();
}

export default getRecipes;
