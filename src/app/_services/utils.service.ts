import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loading;
  textIcon1 =
    'Click on the rewards tab to select or input your donation percentage. A minimum of 1% is required to begin receiving rewards.';
  textIcon2 =
    'The amount in your Donations Holdings Balance will be distributed automatically to your selected charity or charities.';
  textIcon3 =
    'Make a one-time donation from our wallet balance. The amount will be distributed to your chosen organization(s).';

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private _api: ApiService,
    private platform: Platform
  ) {}

  async showLoading(msg = 'Please wait') {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: 19000,
      cssClass: 'primary',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    //console.log(this.loading);
    try {
      if (this.loading) await this.loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async showAlertConfirmGivinFromWallet() {
    const alert = await this.alertController.create({
      header: 'Confirm Giving',
      subHeader: 'Enter the amount you wish to transfer. ',
      message: `Your balance is $${
        this._api.userSesion.user_balanace
          ? this._api.userSesion.user_balanace
          : '0.00'
      }`,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          min: 1,
          placeholder: 'Enter Amount $',
        },
      ],
      buttons: [
        {
          text: 'Transfer', //before Donate
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Ok');
            data.amount = Number(data.amount);
            console.log(isNaN(Number(data.amount)));

            if (isNaN(Number(data.amount)) || data.amount == 0) {
              alert.message = 'Please enter a valid amount!';
              return false;
            } else {
              console.log(data.amount);
              console.log('Http Request');
              this.donateFromWallet(data.amount);
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('alert Cancel');
          },
        },
      ],
    });

    await alert.present();
  }

  async showAlertConfirmGivinAutomatic(
    charityName1: string,
    percentageToDonate: number,
    charityName2?: string
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });

    const subHeader = charityName2
      ? `You are donating a total of ${percentageToDonate}%. ${charityName1} (${
          percentageToDonate / 2
        }%) | ${charityName2} (${percentageToDonate / 2}%) `
      : `You are donating a total of ${percentageToDonate}% to ${charityName1} `;

    const alert = await this.alertController.create({
      header: 'Confirm Your Donation',
      subHeader: subHeader,
      message: '',
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'secondary',
          handler: () => {
            resolveFunction(true);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('alert Cancel');
            resolveFunction(false);
          },
        },
      ],
    });

    await alert.present();
    return promise;
  }

  async showAlertConfirmGivinDirectly(
    charityName: string,
    amount: number
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      header: 'Confirm Your Donation',
      subHeader: `Are you sure you want to Donate $${amount.toFixed(
        2
      )} to ${charityName}?`,
      message: '',
      buttons: [
        {
          text: 'Donate',
          cssClass: 'secondary',
          handler: () => {
            resolveFunction(true);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('alert Cancel');
            resolveFunction(false);
          },
        },
      ],
    });

    await alert.present();
    return promise;
  }

  async showAlertWaitConfirmationBackDropFalse(
    title: string,
    message: string = ''
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
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
            resolveFunction(true);
          },
        },
      ],
    });

    await alert.present();
    return promise;
  }

  async showAlertMessage(
    title: string,
    subtitle: string = '',
    message: string = ''
  ) {
    const alert = await this.alertController.create({
      header: `${title}`,
      subHeader: `${subtitle}`,
      message: `${message}`,
    });

    await alert.present();
  }

  async showAlertMessageHome(title: string, numberIcon: number) {
    let message = '';
    if (numberIcon == 1) {
      message = this.textIcon1;
    } else if (numberIcon == 2) {
      message = this.textIcon2;
    } else if (numberIcon == 3) {
      message = this.textIcon3;
    }

    const alert = await this.alertController.create({
      header: `${title}`,
      subHeader: message,
    });

    await alert.present();
  }

  returnToApp() {
    // console.log(this.router.url);

    if (this.router.url.includes('add-bank-account')) {
      this.returnToAppFromAddBank();
    } else {
      console.log('returning to app FROM GIVE');

      console.log(' BY OPEN ');

      if (this.platform.is('android')) {
        window.open(`${environment.intent_app}givbuxapp`, '_blank');
      } else if (this.platform.is('ios')) {
        //TODO: check this /givbuxapp its causing the problem on iOS close SAFARIVIEWCONTROLLER
        window.open(`${environment.intent_app_ios}close-app`, '_blank');
      }

      /*       try {
        console.log('BY MESSAGE');
        (window as any).webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify('givbuxapp://givbuxapp'));
      } catch (error) {
        console.log(error);
        console.log('**ERROR BY MESSAGE**');
      }  */

      //window.open('givbuxapp://givbuxapp', '_self');
      // console.log(' BY CLOSE ');
      // window.close();
    }
  }

  returnToAppFromAddBank() {
    console.log('returning to app FROM ADD BANK CLOSE');

    console.log(' BY OPEN ');
    window.open(`${environment.intent_app}add-bank-close`, '_self');

    /* 
    try {
      console.log('BY MESSAGE');
      (window as any).webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify('givbuxapp://add-bank-close'));
    } catch (error) {
      console.log(error);
      console.log('**ERROR BY MESSAGE**');
    } */

    /* console.log(' BY CLOSE ');
    window.close(); */
  }

  async donateFromWallet(amount: number) {
    // SENDING REQUEST DONATE FROM WALLET AFTER ALERT
    try {
      await this.showLoading();
      const response = await this._api.donateFromWallet(
        amount,
        this._api.token
      );
      await this.dismissLoading();
      console.log(response);
      this.router.navigate(['/user/success', 'holding', { amount }]);
    } catch (error) {
      await this.dismissLoading();
      this.showAlertMessage(
        error['error'].error ? error['error'].message : 'error'
      );
      console.log(error['error'].error ? error['error'].message : 'error');
    }
  }
}
