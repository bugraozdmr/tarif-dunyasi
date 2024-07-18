import prismadb from "@/lib/prismadb";
import { RecipesClient } from "./components/client";
import { RecipeColumn } from "./[recipeSlug]/components/columns";
import {format} from 'date-fns';
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";


const RecipePage = async () => {
    // CAN KURTARAN OLDU
    const user = await currentUser();

    if(!user){
        return notFound();
    }

    const recipes = await prismadb.recipe.findMany({
        where : {
            userId : user?.id
        },
        orderBy:{
            createdAt : 'desc'
        }
    });

    const formattedRecipes : RecipeColumn[] = recipes.map((item) => ({
        id : item.id,
        slug : item.slug,
        name : item.name,
        createdAt : format(item.createdAt, "MMMM do,yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <RecipesClient data={formattedRecipes} />
            </div>
        </div>
    )
}

export default RecipePage; 