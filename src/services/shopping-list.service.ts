import { HttpClient } from '@angular/common/http';
import { Ingredient } from "../models/ingredient.model";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import 'rxjs/Rx'

@Injectable()
export class ShoppingListService {
    
    private ingredients: Ingredient[] = [];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService) { }

    addItem(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index);
    }

    storeList(token: string) {
        return this.httpClient
            .put(this.buildIngredientsUri(token), this.ingredients)
            .map((response: Ingredient[]) => {
                return response
            });
    }

    fetchList(token: string) {
        return this.httpClient
            .get(this.buildIngredientsUri(token))
            .map((response:Ingredient[]) => {
                return response;
            })
            .do((data) => {
                this.ingredients = data;
            });
    }

    private buildIngredientsUri(token: string) {
        const userId = this.authService.getActiveUser().uid;
        const domain = 'https://ionic2-the-recipe-book.firebaseio.com/';
        const authToken = '?auth=' + token;
        const shoppingListJsonFile = '/shopping-list.json';
        const ingredientsUri = domain + userId + shoppingListJsonFile + authToken;
        return ingredientsUri;
    }
}