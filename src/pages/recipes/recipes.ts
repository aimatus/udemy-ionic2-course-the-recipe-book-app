import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptionsPage } from './recipes-options/recipes-options';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(
    private navController: NavController,
    private recipesService: RecipesService,
    private popoverController: PopoverController) { }

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

  onShowOptions(event) {
    console.log('asdasd');
    const popover = this.popoverController.create(RecipesOptionsPage);
    popover.present({ ev: event });
  }
}
