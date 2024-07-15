import React from "react";

import { Recipe, Category, Image } from "@/types";

import { Billboard } from "@/components/billboard";
import SogukBaklava from "@/public/soguk-baklava.jpg";

import { RecipeList } from "@/components/recipe-list";
import { Categories } from "@/categoryData";
import AddRecipeButton from "@/components/add-recipe-button";

const HomePage = () => {
  const billboard = {
    label: "En sevdiğiniz yemeklerin tariflerini öğrenin ya da paylaşın",
    imageUrl: SogukBaklava.src,
  };

  // RECIPE

  const categories = Categories;

  const image1: Image = {
    id: "img1",
    url: "https://example.com/image1.jpg",
  };

  const image2: Image = {
    id: "img2",
    url: "https://example.com/image2.jpg",
  };

  const recipe1: Recipe = {
    id: "recipe1",
    name: "Chocolate Cake",
    userId: "user1",
    Category: categories[0],
    images: [image1],
    createdAt: new Date(),
    slug: "chocolate-cake",
  };

  const recipe2: Recipe = {
    id: "recipe2",
    name: "Spaghetti Carbonara",
    userId: "user2",
    Category: categories[1],
    images: [image2, image1],
    createdAt: new Date(),
    slug: "spaghetti-carbonara",
  };

  const recipes: Recipe[] = [recipe1, recipe2];

  return (
    <>
      <AddRecipeButton />

      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <RecipeList title="Son eklenen tarifler" items={recipes} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
