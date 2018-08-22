import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ShoppingListConstants } from '../shopping-list-constants';

@IonicPage()
@Component({
  selector: 'page-shopping-list-options',
  templateUrl: 'shopping-list-options.html',
})
export class ShoppingListOptionsPage {

  constructor(private viewController: ViewController) { }

  onLoadList() {
    this.viewController.dismiss(ShoppingListConstants.LOAD_POPOVER_ACTION);
  }

  onSaveList() {
    this.viewController.dismiss(ShoppingListConstants.SAVE_POPOVER_ACTION);
  }
}
