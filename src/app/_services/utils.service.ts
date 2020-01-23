import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading;

  constructor(private router : Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private _api: ApiService) { }

  async showLoading(msg = 'Please wait') {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: 19000,
      cssClass: 'primary'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    //console.log(this.loading);
    try {
      if (this.loading)
        await this.loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async showAlertConfirmGivin() {

    const alert = await this.alertController.create({
      header: 'CONFIRM GIVING',
      subHeader: 'Enter amount to donate, ' + `Your Balance is ${this._api.userSesion.user_balance_give}`,
      message: '',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          min: 1,
          placeholder: 'Enter Amount $'
        }
      ],
      buttons: [
        {
          text: 'Give',
          cssClass: 'secondary',
          handler: (data) => {

            console.log('Confirm Ok');
            data.amount = Number(data.amount);
            console.log(isNaN(Number(data.amount)));

            if (isNaN(Number(data.amount)) || data.amount == 0) {
              alert.message = 'Please enter a valid amount!';
              return false;
            } else {
              console.log(data.amount)
              console.log('Http Request');
              this.donateFromWallet(data.amount);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('alert Cancel');
          }
        }
      ]
    });

    await alert.present();

  }

 async showAlertMessage(title: string) {

    const alert = await this.alertController.create({
      header: `${title}`,    
    });

    await alert.present();

  }

  returnToApp() {
    console.log('returning to app');
    window.open('givbuxapp://givbuxapp');
  }

  async donateFromWallet(amount: number) {
    // SENDING REQUEST DONATE FROM WALLET AFTER ALERT
    try {

      await this.showLoading();
      const response = await this._api.donateFromWallet(amount, this._api.token);
      await this.dismissLoading();
      console.log(response);
      this.router.navigate([ '/success' , 'holding' , { amount } ]);

    } catch (error) {

      await this.dismissLoading();
      this.showAlertMessage(error['error'].error ? error['error'].message : 'error');
      console.log(error['error'].error ? error['error'].message : 'error');

    }
  }


}
