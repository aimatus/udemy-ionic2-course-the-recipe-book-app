import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-list-options',
  templateUrl: 'shopping-list-options.html',
})
export class ShoppingListOptionsPage {

  constructor(private viewController: ViewController) { }

  onLoadList() {
    this.viewController.dismiss();
  }

  onSaveList() {
    this.viewController.dismiss();
  }

}
