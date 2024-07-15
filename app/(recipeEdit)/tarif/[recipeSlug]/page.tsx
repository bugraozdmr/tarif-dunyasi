import { Categories } from "@/categoryData";
import { RecipeForm } from "./components/recipe-form";

const CreateEditRecipe = () => {
    const categories = Categories;

    const recipe = null;



    return ( 
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <RecipeForm   
            initialData={recipe}
            categories={categories}/>
        </div>
    </div>
     );
}
 
export default CreateEditRecipe;