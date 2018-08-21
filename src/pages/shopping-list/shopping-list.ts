import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  items: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverController: PopoverController) { }

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
  }
}
