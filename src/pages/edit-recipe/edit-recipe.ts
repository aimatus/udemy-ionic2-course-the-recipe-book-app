import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private recipesService: RecipesService,
    private navController: NavController) { }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
      this.initializeForm();
    } else {
      this.initializeBlankForm();
    }
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.title,
      this.recipeForm.value.description,
      this.recipeForm.value.difficulty,
      this.getRecipeIngredients()
    );
    if (this.mode === 'Edit') {
      this.recipesService.updateRecipe(this.index, recipe);
    } else {
      this.recipesService.addRecipe(recipe);
    }
    this.recipeForm.reset();
    this.navController.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {
            this.removeRecipeIngredients();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.addRecipeIngredient(data);
          }
        }
      ]
    });
  }

  private initializeBlankForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.difficultyOptions[1], Validators.required),
      'ingredients': new FormArray([])
    });
  }

  private initializeForm() {
    let ingredients: FormControl[] = [];
    for (let ingredient of this.recipe.ingredients) {
      ingredients.push(new FormControl(ingredient.name, Validators.required));
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(this.recipe.title, Validators.required),
      'description': new FormControl(this.recipe.description, Validators.required),
      'difficulty': new FormControl(this.recipe.difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private displayToastMessage(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  private getRecipeIngredients() {
    let ingredients = [];
    if (this.recipeForm.value.ingredients.length > 0) {
      ingredients = this.recipeForm.value.ingredients.map(name => {
        return { name: name, amount: 1 }
      });
    }
    return ingredients;
  }

  private removeRecipeIngredients() {
    const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
    const arrayLength = formArray.length;
    if (arrayLength > 0) {
      for (let i = arrayLength; i >= 0; i--) {
        formArray.removeAt(i);
      }
      this.displayToastMessage('All ingredients were removed.');
    }
  }

  private addRecipeIngredient(data: any) {
    if (data.name == null || data.name.trim() == '') {
      this.displayToastMessage('Plase, provide a valid ingredient name.');
      return;
    }
    let ingredients = <FormArray>this.recipeForm.get('ingredients');
    ingredients.push(new FormControl(data.name, Validators.required));
    this.displayToastMessage('Item added.');
  }
}
