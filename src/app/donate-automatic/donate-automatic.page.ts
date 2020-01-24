import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { UtilsService } from '../_services/utils.service';
import { Charity } from '../_models/charity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate-automatic',
  templateUrl: './donate-automatic.page.html',
  styleUrls: ['./donate-automatic.page.scss', '../home/home.page.scss'],
})
export class DonateAutomaticPage implements OnInit {

  title = 'Automatic Give';
  userSesion;

  loading: boolean = false;
  image = './assets/icon/favicon.png';

  charities: Charity[] = [];
  charitiesSelected: Charity[] = [];
  percentageToDonate: number = 0;
  charitySelectedQuantity: number = 0;

  constructor(private _api: ApiService,
    public _utils: UtilsService,
    private router: Router) {
    this.userSesion = this._api.userSesion;
  }

  async ngOnInit() {

    try {

      this.loading = true;
      const response = await this._api.getAllGive();
      this.loading = false;
      //console.log(response);
      this.charities = response as Charity[];
      console.log(this.charities);
      this.charities.forEach(charityIterable => {
        charityIterable.selected = false;
      });

    } catch (error) {
      this.loading = false;
      this._utils.showAlertMessage('Info', error['error'].message ? error['error'].message : 'error');
      console.log(error);

    }

  }

  ionViewWillEnter() {
    this.loadData();
  }

  async setGiveDefaultDonation() {

    const charity2OptionalName = this.charitiesSelected[1] ? this.charitiesSelected[1].name : null;
    const charity2OptionalID = this.charitiesSelected[1] ? this.charitiesSelected[1].id : null;

    // WAIT FOR Response FROM ALERT
    const responseAlert = await this._utils.showAlertConfirmGivinAutomatic(this.charitiesSelected[0].name, Number(this.percentageToDonate.toFixed(2)), charity2OptionalName);
    console.log(responseAlert);

    if (responseAlert) {
      try {

        await this._utils.showLoading();
        const response = await this._api.giveSaveDefaultAutomatic(this.charitiesSelected[0].id, this.percentageToDonate, charity2OptionalID);
        await this._utils.dismissLoading();
        const responseAlert = await this._utils.showAlertWaitConfirmationBackDropFalse(response as string);
        if (responseAlert) {
          this.router.navigate(['/home'])
        }
        // this.router.navigate(['/success', 'directly', { charity1: this.charitySelected.name, amount: this.amountToDonate }])

      } catch (error) {
        this._utils.dismissLoading();
        this._utils.showAlertMessage('Info', error['error'].message ? error['error'].message : 'error');
        console.log(error);
      }
    }

  }

  selectCharityToDonate(index: number, charitySelect: Charity) {

    //console.log(this.charitySelectedQuantity);
    //console.log(charitySelect.id);

    for (const charityIterable of this.charities) {

      if (this.charities[index].selected && (charityIterable.id === this.charities[index].id)) {
        //console.log('same select');

        this.charitiesSelected = this.charitiesSelected.filter(
          charityFilter => charityFilter.id !== charitySelect.id
        );
        this.charities[index].selected = false;
        this.charitySelectedQuantity--;
        break;

      } else {

        if (!this.charities[index].selected && this.charitySelectedQuantity < 2) {
          //console.log('not selected')
          this.charities[index].selected = true;
          this.charitiesSelected.push(this.charities[index]);
          this.charitySelectedQuantity++;
          break;

        }

      }


    }
    console.log(this.charitiesSelected);

  }

  showAlertConfirmGivinFromWallet() {
    this._utils.showAlertConfirmGivinFromWallet();
  }

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }

  async loadData() {

    try {

      await this._utils.showLoading();
      const response = await this._api.getGiveDefault();
      await this._utils.dismissLoading();
      console.log(response)

      this.percentageToDonate = response['percentage'] ? response['percentage'] : 0;
      this.charitySelectedQuantity = 0;
      this.charitiesSelected = [];

      for (const iterator of response['organizations']) {
       for (const charity of this.charities) {
         //For break For because all charities selected
        if(this.charitySelectedQuantity == 2)
            break;
        if(iterator.id_charity === charity.id){
          charity.selected = true;
          this.charitiesSelected.push(charity);
          this.charitySelectedQuantity++;
          
        }         
       }        
      }

    } catch (error) {
      this._utils.dismissLoading();
      this._utils.showAlertMessage('Info', error['error'].message ? error['error'].message : 'error');
      console.log(error);
    }
    // this.charities.forEach(charityIterable => {
    //   charityIterable.selected = false;
    // });
    // this.charitySelected = null;
    // this.amountToDonate = 0;
  }

  calculatePercentageToShow() {
    return (this.percentageToDonate / this.charitiesSelected.length);
  }
}
