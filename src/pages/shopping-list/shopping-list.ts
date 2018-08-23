import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
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

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverController: PopoverController,
    private authService: AuthService) { }

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
        if (action === ShoppingListConstants.LOAD_POPOVER_ACTION) {
          console.log('Loading list...');
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.shoppingListService.fetchList(token)
                  .subscribe(
                    (ingredients: Ingredient[]) => {
                      if (ingredients) {
                        this.items = ingredients;
                        console.log(this.items);
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
              }
            );
        } else if (action === ShoppingListConstants.SAVE_POPOVER_ACTION) {
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.shoppingListService.storeList(token)
                  .subscribe(
                    () => console.log('Success!'),
                    error => {
                      console.log(error);
                    }
                  );
              }
            );
        }
      }
    );
  }
}
