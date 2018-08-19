import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService) { }

  onSignin(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
