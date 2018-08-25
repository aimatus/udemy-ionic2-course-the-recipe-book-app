import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { RecipesConstants } from '../recipes-constants';

@IonicPage()
@Component({
  selector: 'page-recipes-options',
  templateUrl: 'recipes-options.html',
})
export class RecipesOptionsPage {

  constructor(private viewController: ViewController) { }

  onLoadList() {
    this.viewController.dismiss(RecipesConstants.LOAD_POPOVER_ACTION);
  }

  onSaveList() {
    this.viewController.dismiss(RecipesConstants.SAVE_POPOVER_ACTION);
  }
}
