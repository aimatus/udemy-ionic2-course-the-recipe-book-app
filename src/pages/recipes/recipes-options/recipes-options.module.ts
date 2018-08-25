import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesOptionsPage } from './recipes-options';

@NgModule({
  declarations: [
    RecipesOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipesOptionsPage),
  ],
})
export class RecipesOptionsPageModule {}
