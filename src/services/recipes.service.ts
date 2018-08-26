import { HttpClient } from '@angular/common/http';
import { Recipe } from "../models/recipe.model";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'

@Injectable()
export class RecipesService {

    private recipes: Recipe[] = [];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService) { }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
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

    storeRecipesList(token: string) {
        return this.httpClient
            .put(this.buildIngredientsUri(token), this.recipes)
            .map((response: Recipe[]) => {
                return response
            });
    }

    fetchRecipesList(token: string) {
        return this.httpClient
            .get(this.buildIngredientsUri(token))
            .map((response: Recipe[]) => {
                return response;
            })
            .do((data) => {
                this.recipes = data;
            });
    }

    private buildIngredientsUri(token: string) {
        const userId = this.authService.getActiveUser().uid;
        const domain = 'https://ionic2-the-recipe-book.firebaseio.com/';
        const authToken = '?auth=' + token;
        const recipesListJsonFile = '/recipes-list.json';
        const ingredientsUri = domain + userId + recipesListJsonFile + authToken;
        return ingredientsUri;
    }
}