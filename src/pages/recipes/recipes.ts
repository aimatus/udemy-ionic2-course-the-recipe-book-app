import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(private navController: NavController) { }

  onNewRecipe() {
    this.navController.push(EditRecipePage, { mode: 'New' });
  }
}
