import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, Loading } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loadingDialog: Loading;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  onSignup(form: NgForm) {
    this.createAndInitLoaderSpinner();
    this.signupAndHideLoadingSpinner(form.value.email, form.value.password);
  }

  createAndInitLoaderSpinner() {
    this.loadingDialog = this.loadingController.create({
      content: 'Signing you up...'
    });
    this.loadingDialog.present();
  }

  signupAndHideLoadingSpinner(email: string, password: string) {
    this.authService.singup(email, password)
      .then(data => {
        this.loadingDialog.dismiss();
      })
      .catch(error => {
        this.loadingDialog.dismiss();
        this.showSignupErrorAlert(error.message);
      });
  }

  showSignupErrorAlert(message: string) {
    const alert = this.alertController.create({
      title: 'Signup failed!',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
