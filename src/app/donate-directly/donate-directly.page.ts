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

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }

}
