import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    const params = { mode: 'Edit', recipe: this.recipe, index: this.index }
    this.navController.push(EditRecipePage, params);
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
    this.toastController.create({
      message: 'Items added to shopping list.',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navController.popToRoot();
  }
}
