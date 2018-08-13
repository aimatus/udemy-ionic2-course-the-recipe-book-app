import { Recipe } from "../models/recipe.model";

export class RecipesService {

    private recipes: Recipe[] = [];

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        console.log(this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }
}