import React from "react";
import Container from "@/components/ui/container";

import {Recipe,Category,Image} from "@/types"

import {Billboard} from '@/components/billboard';
import SogukBaklava from "@/public/soguk-baklava.jpg"

import {RecipeList} from "@/components/recipe-list"

const HomePage = () => {
  const billboard = {
    label : "En sevdiğiniz yemeklerin tariflerini öğrenin ya da paylaşın",
    imageUrl : SogukBaklava.src
  }

  // RECIPE

  {/*
    
    const category1: Category = {
    id: 'cat1',
    name: 'Desserts',
    slug:"23123"
  };
  
  const category2: Category = {
    id: 'cat2',
    name: 'Main Courses',
    slug:"23123"
  };
  
  const image1: Image = {
    id: 'img1',
    url: 'https://example.com/image1.jpg',
  };
  
  const image2: Image = {
    id: 'img2',
    url: 'https://example.com/image2.jpg',
  };
  
  const recipe1: Recipe = {
    id: 'recipe1',
    name: 'Chocolate Cake',
    userId: 'user1',
    Category: category1,
    images: [image1],
    createdAt: new Date(),
    slug: 'chocolate-cake'
  };
  
  const recipe2: Recipe = {
    id: 'recipe2',
    name: 'Spaghetti Carbonara',
    userId: 'user2',
    Category: category2,
    images: [image2,image1],
    createdAt: new Date(),
    slug: 'spaghetti-carbonara'
  };
  
  
  const recipes: Recipe[] = [recipe1, recipe2];*/}
  const recipes : Recipe[] = [];

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <RecipeList title="Son eklenen tarifler" items={recipes} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
