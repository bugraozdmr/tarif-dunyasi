import { Recipe } from "@/types";


const Url = `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`;

/* burda caching yapsak fena olmazdı belli bir süreliğine */

const getRecipe = async (slug:string) : Promise<Recipe> => {
    // caching olmasın dedim
    const response = await fetch(`${Url}/${slug}`,{ cache: 'no-store' });

    return response.json();
}

export default getRecipe;