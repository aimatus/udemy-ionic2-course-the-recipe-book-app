import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  onSignup(form: NgForm) {
    const loadingDialog = this.loadingController.create({
      content: 'Signing you up...'
    });
    loadingDialog.present();
    this.authService.singup(form.value.email, form.value.password)
      .then(data => {
        loadingDialog.dismiss();
      })
      .catch(error => {
        loadingDialog.dismiss();
        const alert = this.alertController.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
