import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListOptionsPage } from './shopping-list-options';

@NgModule({
  declarations: [
    ShoppingListOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListOptionsPage),
  ],
})
export class ShoppingListOptionsPageModule {}
