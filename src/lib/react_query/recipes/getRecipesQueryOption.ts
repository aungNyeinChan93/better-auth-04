import { queryOptions } from "@tanstack/react-query";




export function getRecipesQueryOption() {

    return queryOptions({
        queryKey: ['recipes'],
        queryFn: getAllRecipes
    })
};



export async function getAllRecipes() {
    const { recipes } = await fetch(`https://dummyjson.com/recipes`).then(res => res.json())
    return recipes
}