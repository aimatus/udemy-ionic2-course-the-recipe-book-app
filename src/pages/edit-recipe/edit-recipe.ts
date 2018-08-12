import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navParams: NavParams) { }

  ngOnInit(): void {
    this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.difficultyOptions[1], Validators.required)
    });
  }
}
