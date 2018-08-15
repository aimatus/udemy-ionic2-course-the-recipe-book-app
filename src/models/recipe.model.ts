import { Ingredient } from "./ingredient.model";

export class Recipe {
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingredient[]) { }
}