import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptionsPage } from './recipes-options/recipes-options';
import { AuthService } from '../../services/auth.service';
import { RecipesConstants } from './recipes-constants';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  loadingSpinner: Loading;
  recipes: Recipe[];

  constructor(
    private navController: NavController,
    private recipesService: RecipesService,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService) { }

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
    const popover = this.popoverController.create(RecipesOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      action => {
        this.execDismissAction(action);
      }
    );
  }

  private execDismissAction(action: any) {
    this.loadingSpinner = this.loadingController.create({
      content: 'Please wait...'
    });
    this.authService.getActiveUser().getIdToken()
      .then((token: string) => {
        if (action === RecipesConstants.LOAD_POPOVER_ACTION) {
          this.loadingSpinner.present();
          this.fetchIngredientsList(token);
        }
        else if (action === RecipesConstants.SAVE_POPOVER_ACTION) {
          this.loadingSpinner.present();
          this.storeIngredientsList(token);
        }
      });
  }

  private storeIngredientsList(token: string) {
    this.recipesService.storeRecipesList(token)
      .subscribe(() => {
        this.loadingSpinner.dismiss();
        this.notifiyEvent('Recipes saved');
      }, error => {
        this.loadingSpinner.dismiss();
        this.handleError(error.error.error);
      });
  }

  private fetchIngredientsList(token: string) {
    this.recipesService.fetchRecipesList(token)
      .subscribe((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        }
        this.loadingSpinner.dismiss();
        this.notifiyEvent('Recipes loaded');
      }, error => {
        this.loadingSpinner.dismiss();
        this.handleError(error.error.error);
      });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertController.create({
      title: 'An error ocurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  private notifiyEvent(message: string) {
    this.toastController.create({
      message: message,
      duration: 1500
    }).present();
  }
}
