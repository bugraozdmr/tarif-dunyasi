import getRecipe from '@/actions/recipe/get-recipe';
import React from 'react'


interface GenerateMetadataProps {
  params : {
    recipeSlug : string;
  }
}

interface EditLayoutProps {
  children : React.ReactNode;
}

export const generateMetadata = async ({ params } : GenerateMetadataProps) => {
  const recipe = await getRecipe(params.recipeSlug);

  if(!recipe){
    return {
      title: `Aradığınız sayfa bulunamadı`,
      description : `Tarif dünyası nefis mi nefis yemeklerin tek adresi.`
    }
  }

  return {
    title: `${recipe.name} | Tarif Dünyası`,
    description : `${recipe.name} nasıl yapılır ? ${recipe.name} tarifi.`
  }
}




const EditLayout = ({children} : {
  children : React.ReactNode
}) => {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};

export default EditLayout;
