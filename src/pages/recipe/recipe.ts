import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

}
