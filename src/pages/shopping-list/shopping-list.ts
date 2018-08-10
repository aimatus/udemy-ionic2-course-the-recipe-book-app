import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  onAddItem(form: NgForm) {
    console.log(form);
  }
}
