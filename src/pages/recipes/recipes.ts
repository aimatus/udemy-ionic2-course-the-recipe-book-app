import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(
    private navController: NavController,
    private recipesService: RecipesService) { }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navController.push(EditRecipePage, { mode: 'New' });
  }

  onLoadRecipe(index: number) {
    const params = { recipe: this.recipes[index], index: index };
    this.navController.push(RecipePage, params);
  }
}
