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

  constructor(private _api: ApiService,
    private route: ActivatedRoute,
    public _utils: UtilsService) {

  }

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

  async getRefresDataUser(){

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
      console.log('token recieved => ' + this.route.snapshot.paramMap.get('token'));
      this.giveValidateToken(this.route.snapshot.paramMap.get('token'))
    }
    else if (this._api.refreshSameTokenSession()) {
      console.log('retrieve token from session => ' + this._api.token);
      if(!this._api.afterTransferSuccess)
        this.getRefresDataUser();
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

  callAlertInfo() {
    this._utils.showAlertMessage('Help', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec cursus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    +' Etiam tristique risus eu tincidunt auctor. Ut et sollicitudin ex. Phasellus ornare, lacus vel lacinia interdum, massa magna iaculis nisl, at posuere velit velit in justo. '
    +'Sed varius risus nec neque imperdiet accumsan. Aliquam eu consectetur sapien, eget tristique nunc. Nullam tincidunt magna non tellus porttitor, a pulvinar ligula varius. '
    +'Morbi imperdiet magna purus, in dictum nisi convallis et. Aenean lacus velit, semper sed tempor vel, auctor nec arcu. Praesent mollis eget velit ut rutrum. Quisque eu purus blandit sem condimentum sodales.'
    +'Aenean eu porttitor risus, luctus iaculis sem.Aliquam erat volutpat.Mauris nisi nibh, mollis vel congue sit amet, porta in nisl.Fusce non ullamcorper orci.Aenean volutpat ullamcorper iaculis.Nunc eget consectetur velit.'
    +'Pellentesque ante urna, placerat vitae nunc sit amet, accumsan scelerisque nulla.Maecenas ut scelerisque purus')
  }



}
