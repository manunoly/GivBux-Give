import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { UtilsService } from '../_services/utils.service';
import { Charity } from '../_models/charity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate-directly',
  templateUrl: './donate-directly.page.html',
  styleUrls: ['./donate-directly.page.scss', '../home/home.page.scss'],
})
export class DonateDirectlyPage implements OnInit {

  title = 'Directly Give';
  userSesion;
  loading: boolean = false;
  image = './assets/icon/favicon.png';

  charities: Charity[] = [];
  charitySelected: Charity;
  amountToDonate: number;

  constructor(private _api: ApiService,
    private _utils: UtilsService,
    private router: Router) {
    this.userSesion = this._api.userSesion;
  }

  async ngOnInit() {

    try {

      this.loading = true;
      const response = await this._api.getAllGive();
      this.loading = false;
      console.log(response);
      this.charities = response as Charity[];
      console.log(this.charities);

    } catch (error) {
      this.loading = false;
      this._utils.showAlertMessage('Info', error['error'].message ? error['error'].message : 'error');
      console.log(error);

    }
    
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  async giveDonateToCharity() {

    // WAIT FOR Response FROM ALERT
    const responseAlert = await this._utils.showAlertConfirmGivinDirectly(this.charitySelected.name, this.amountToDonate);
    console.log(responseAlert);

    if (responseAlert) {
      try {

        this._utils.showLoading();
        const response = await this._api.giveToCharity(this.charitySelected.id, this.amountToDonate);
        this._utils.dismissLoading();
        this.router.navigate(['/success', 'directly', { charity1: this.charitySelected.name, amount: this.amountToDonate }])

      } catch (error) {
        this._utils.dismissLoading();
        this._utils.showAlertMessage('Info', error['error'].message ? error['error'].message : 'error');
        console.log(error);
      }
    }

  }

  selectCharityToDonate(index: number, charity: Charity) {

    console.log('Selected charity ');
    console.log(charity);
    this.charities.forEach(charityIterable => {
      charityIterable.selected = false;
      charity.selected = true;
    });

    this.charitySelected = charity;

  }

  refreshData() {
    this.charities.forEach(charityIterable => {
      charityIterable.selected = false;
    });
    this.charitySelected = null;
    this.amountToDonate = 0;
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

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }

}
