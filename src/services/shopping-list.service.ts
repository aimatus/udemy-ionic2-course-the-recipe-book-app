import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
    
    private ingredients: Ingredient[] = [];

    addItem(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        console.log(this.ingredients);
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
}