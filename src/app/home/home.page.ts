import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'Give';
  tokenValid: boolean = false;
  loading = false;
  userSesion;
  version = '4.0.2';

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
    public _utils: UtilsService
  ) {}

  ngOnInit() {
    console.log('onInit');
    this.checkTokenValidation();
  }

  // For Refresh home after some success transfer
  ionViewWillEnter() {
    //check after transfer param
    if (this._api.afterTransferSuccess) {
      this._api.afterTransferSuccess = false; //Setting variable controller to false after transfer success
      console.log('reEnter on Home after transfer');
      this.getRefresDataUser();
    }
  }

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }

  async getRefresDataUser() {
    try {
      this.loading = true;
      await this._utils.showLoading();
      const responseUser = await this._api.getDataGiveUser();
      await this._utils.dismissLoading();
      this.loading = false;
      this.tokenValid = true;
      console.log(responseUser);

      // SETTING UP DATA ON SERVICE AND COMPONENT
      this._api.userSesion = responseUser;
      this.userSesion = responseUser;
    } catch (error) {
      await this._utils.dismissLoading();
      this.loading = false;
      console.log(error['error'].error ? error['error'].message : 'error');
    }
  }

  checkTokenValidation() {
    if (this.route.snapshot.paramMap.get('token')) {
      console.log(
        'token recieved => ' + this.route.snapshot.paramMap.get('token')
      );
      this.giveValidateToken(this.route.snapshot.paramMap.get('token'));
    } else if (this._api.refreshSameTokenSession()) {
      console.log('retrieve token from session => ' + this._api.token);
      if (!this._api.afterTransferSuccess) this.getRefresDataUser();
    }
  }

  async giveValidateToken(token: string) {
    console.log('checking token...');

    try {
      this.loading = true;
      await this._utils.showLoading();
      const responseUser = await this._api.giveValidateToken(token);
      await this._utils.dismissLoading();
      this.loading = false;
      this.tokenValid = true;
      console.log(responseUser);

      // SETTING UP DATA ON SERVICE AND COMPONENT
      this._api.token = token;
      this._api.userSesion = responseUser;

      this.userSesion = responseUser;
    } catch (error) {
      await this._utils.dismissLoading();
      this.loading = false;
      this.tokenValid = false;
      console.log(error['error'].error ? error['error'].message : 'error');
    }
  }

  showAlertConfirmGivinFromWallet() {
    this._utils.showAlertConfirmGivinFromWallet();
  }

  callAlertInfo(iconNumber: number) {
    this._utils.showAlertMessageHome('Information', iconNumber);
  }
}
