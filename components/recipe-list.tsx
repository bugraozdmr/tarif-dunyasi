import { Recipe } from "../types";
import { NoResults } from "./ui/no-result";
import { RecipeCard } from "./ui/recipe-card";
import React from "react";

interface RecipeListProps {
    title : string;
    items : Recipe[]
}

export const RecipeList : React.FC<RecipeListProps> = ({
    title,
    items
}) => {
    return (
        <div className="space-y-4 mt-2">
            <h3 className="font-bold text-3xl">
                {title}
            </h3>
            {items.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item,index) => (
                    <RecipeCard key={index} data={item}/>
                ))}
            </div>
        </div>
    )
}