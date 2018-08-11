import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    var item = new Ingredient(form.value.ingredientName, form.value.amount);
    this.shoppingListService.addItem(item);
    form.reset();
  }
}
