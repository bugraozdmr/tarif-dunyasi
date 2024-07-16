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
