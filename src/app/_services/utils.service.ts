import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading;

  constructor(private router: Router,
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

  async showAlertConfirmGivinFromWallet() {

    const alert = await this.alertController.create({
      header: 'CONFIRM GIVING',
      subHeader: 'Enter amount to donate, ' + `Your Balance is $${this._api.userSesion.user_balance_give ? this._api.userSesion.user_balance_give : '0.00'}`,
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

  async showAlertConfirmGivinAutomatic(charityName1: string , percentageToDonate : number , charityName2? : string , ) : Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const subHeader = (charityName2) ?
    (`You are donating a total of ${percentageToDonate}%. ${charityName1} (${percentageToDonate/2}%) | ${charityName2} (${percentageToDonate/2}%) `) :
    (`You are donating a total of ${percentageToDonate}% to ${charityName1} `)

      const alert = await this.alertController.create({
        header: 'CONFIRM YOUR DONATION',
        subHeader: subHeader,
        message: '',
        buttons: [
          {
            text: 'Confirm',
            cssClass: 'secondary',
            handler: () => {
              resolveFunction(true)
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('alert Cancel');
              resolveFunction(false)
            }
          }
        ]
      });

      await alert.present();
      return promise;
  
  }

  async showAlertConfirmGivinDirectly(charityName: string, amount: number) : Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

      const alert = await this.alertController.create({
        header: 'CONFIRM YOUR DONATION',
        subHeader: `Are you sure you want to Donate $${amount.toFixed(2)} to ${charityName}?`,
        message: '',
        buttons: [
          {
            text: 'Confirm',
            cssClass: 'secondary',
            handler: () => {
              resolveFunction(true)
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('alert Cancel');
              resolveFunction(false)
            }
          }
        ]
      });

      await alert.present();
      return promise;
  
  }

  async showAlertWaitConfirmationBackDropFalse(title: string, message: string = '') : Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      header: `${title}`,
      subHeader: `${message}`,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Accept',
          cssClass: 'secondary',
          handler: () => {
            resolveFunction(true)
          }
        }
      ]
    });

    await alert.present();
    return promise;

  }

  async showAlertMessage(title: string, subtitle: string = '' , message: string = '') {

    const alert = await this.alertController.create({
      header: `${title}`,
      subHeader: `${subtitle}`,
      message: `${message}`,
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
      this.router.navigate(['/user/success', 'holding', { amount }]);

    } catch (error) {

      await this.dismissLoading();
      this.showAlertMessage(error['error'].error ? error['error'].message : 'error');
      console.log(error['error'].error ? error['error'].message : 'error');

    }
  }


}
