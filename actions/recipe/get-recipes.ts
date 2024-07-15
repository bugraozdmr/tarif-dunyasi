import { Recipe } from "@/types";
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`;

interface Query{
    category? : string;
}

const getRecipes = async (query? : Query) : Promise<Recipe[]> => {
    const url = qs.stringifyUrl({
        url : URL,
        query : {
            category : query?.category,
        },
    });

    // caching olmasın dedim
    const response = await fetch(url,{ cache: 'no-store' });


    return response.json();
}

export default getRecipes;
