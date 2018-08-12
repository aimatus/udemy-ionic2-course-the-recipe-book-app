import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];

  constructor(public navParams: NavParams) { }

  ngOnInit(): void {
    this.navParams.get('mode');
  }
}
