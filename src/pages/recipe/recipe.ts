import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(
    public navController: NavController,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    const params = { mode: 'Edit', recipe: this.recipe, index: this.index }
    this.navController.push(EditRecipePage, params);
  }
}
