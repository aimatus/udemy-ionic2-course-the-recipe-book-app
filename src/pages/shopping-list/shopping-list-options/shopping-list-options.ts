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
    const loadAction = 'save-list';
    this.viewController.dismiss(loadAction);
  }

  onSaveList() {
    const saveAction = 'load-list';
    this.viewController.dismiss(saveAction);
  }
}
