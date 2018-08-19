import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, Loading } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  loadingDialog: Loading;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  onSignin(form: NgForm) {
    this.createAndInitLoaderSpinner();
    this.signinAndHideLoadingSpinner(form.value.email, form.value.password);
  }

  createAndInitLoaderSpinner() {
    this.loadingDialog = this.loadingController.create({
      content: 'Signing you up...'
    });
    this.loadingDialog.present();
  }

  signinAndHideLoadingSpinner(email: string, password: string) {
    this.authService.signin(email, password)
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
      title: 'Signin failed!',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
