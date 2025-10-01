"use client";

import { getRecipesQueryOption } from "@/lib/react_query/recipes/getRecipesQueryOption";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import RecipeCard from "./RecipeCard";

const RecipeLists = () => {
  const { data: recipes } = useSuspenseQuery({ ...getRecipesQueryOption() });
  return (
    <React.Fragment>
      <main className="w-full px-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.isArray(recipes) &&
            recipes?.map((recipe) => (
              <RecipeCard key={recipe?.id} {...recipe} />
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default RecipeLists;
