import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';
import { AuthService } from '../../services/auth.service';
import { ShoppingListConstants } from './shopping-list-constants';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  items: Ingredient[];
  private loadingSpinner: Loading;

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverController: PopoverController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    var item = new Ingredient(form.value.ingredientName, form.value.amount);
    this.shoppingListService.addItem(item);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.items = this.shoppingListService.getItems();
  }

  onShowOptions(event) {
    const popover = this.popoverController.create(ShoppingListOptionsPage);
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
        if (action === ShoppingListConstants.LOAD_POPOVER_ACTION) {
          this.loadingSpinner.present();
          this.fetchIngredientsList(token);
        }
        else if (action === ShoppingListConstants.SAVE_POPOVER_ACTION) {
          this.loadingSpinner.present();
          this.storeIngredientsList(token);
        }
      });
  }

  private storeIngredientsList(token: string) {
    this.shoppingListService.storeList(token)
      .subscribe(() => {
        this.loadingSpinner.dismiss();
        this.notifiyEvent('Ingredients saved');
      }, error => {
        this.loadingSpinner.dismiss();
        this.handleError(error.error.error);
      });
  }

  private fetchIngredientsList(token: string) {
    this.shoppingListService.fetchList(token)
      .subscribe((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.items = ingredients;
        }
        this.loadingSpinner.dismiss();
        this.notifiyEvent('Ingredients loaded');
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
