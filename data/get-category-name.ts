import { Categories } from "@/categoryData";


export const GetCategory = (id : number) => {
    const categories = Categories;

    const cat =  categories.find((c) => c.id === id);

    return cat;
}

export const GetCategoryBySlug = (slug : string | undefined) => {
    const categories = Categories;

    const cat =  categories.find((c) => c.slug === slug);

    return cat;
}