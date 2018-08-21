import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { RecipePage } from '../pages/recipe/recipe';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipesService } from '../services/recipes.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { ShoppingListOptionsPage } from '../pages/shopping-list/shopping-list-options/shopping-list-options';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingListOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingListOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
