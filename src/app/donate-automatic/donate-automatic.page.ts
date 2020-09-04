import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { UtilsService } from '../_services/utils.service';
import { Charity } from '../_models/charity.model';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Category } from '../_models/categories.model';

@Component({
  selector: 'app-donate-automatic',
  templateUrl: './donate-automatic.page.html',
  styleUrls: ['./donate-automatic.page.scss', '../home/home.page.scss'],
})
export class DonateAutomaticPage implements OnInit {
  title = 'Automatic Give';
  userSesion;

  loading: boolean = false;
  image = '/assets/img/givbux-new-logo.svg';

  charities: Charity[] = [];
  charitiesBackup: Charity[] = [];
  charitiesSelected: Charity[] = [];
  percentageToDonate: number = null;
  charitySelectedQuantity: number = 0;

  selectedPercentage: boolean[] = [false, false, false, false, false];
  flagQuerySearch = false;

  popoverCategories = {
    cssClass: 'categories-custom-popover'
  }

  categoryFilter : string;
  categories : Category[];

  constructor(
    private _api: ApiService,
    public _utils: UtilsService,
    private router: Router,
    private navController: NavController
  ) {
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

      this.charities = this.charities.filter((charityIterable) => {
        charityIterable.selected = false;
        return charityIterable.status;
      });

      this.charitiesBackup = [...(this.charities as Charity[])];

      // this.charities.forEach(charityIterable => {
      //   charityIterable.selected = false;
      // });

      console.log(this.charities);
      console.log(this.charitiesBackup);
    } catch (error) {
      this.loading = false;
      this._utils.showAlertMessage(
        'Info',
        error['error'].message ? error['error'].message : 'error'
      );
      console.log(error);
    }

    try {
      this.loading = true;
      const response = await this._api.getGiveCategories();
      this.loading = false;
      //console.log(response);
      this.categories = response as Category[];
      console.log(this.categories);

    } catch (error) {
      this.loading = false;
      this._utils.showAlertMessage(
        'Info',
        error['error'].message ? error['error'].message : 'error'
      );
      console.log(error);
    }
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async setGiveDefaultDonation() {
    const charity2OptionalName = this.charitiesSelected[1]
      ? this.charitiesSelected[1].name
      : null;
    const charity2OptionalID = this.charitiesSelected[1]
      ? this.charitiesSelected[1].id
      : null;

    // WAIT FOR Response FROM ALERT
    const responseAlert = await this._utils.showAlertConfirmGivinAutomatic(
      this.charitiesSelected[0].name,
      Number(this.percentageToDonate.toFixed(2)),
      charity2OptionalName
    );
    console.log(responseAlert);

    if (responseAlert) {
      try {
        await this._utils.showLoading();
        const response = await this._api.giveSaveDefaultAutomatic(
          this.charitiesSelected[0].id,
          this.percentageToDonate,
          charity2OptionalID
        );
        await this._utils.dismissLoading();
        const responseAlert = await this._utils.showAlertWaitConfirmationBackDropFalse(
          response as string
        );
        if (responseAlert) {
          this.router.navigate(['/']);
        }
        // this.router.navigate(['/success', 'directly', { charity1: this.charitySelected.name, amount: this.amountToDonate }])
      } catch (error) {
        this._utils.dismissLoading();
        this._utils.showAlertMessage(
          'Info',
          error['error'].message ? error['error'].message : 'error'
        );
        console.log(error);
      }
    }
  }

  selectCharityToDonate(index: number, charitySelect: Charity) {
    //console.log(this.charitySelectedQuantity);
    //console.log(charitySelect.id);

    for (const charityIterable of this.charities) {
      if (
        this.charities[index].selected &&
        charityIterable.id === this.charities[index].id
      ) {
        //console.log('same select');

        this.charitiesSelected = this.charitiesSelected.filter(
          (charityFilter) => charityFilter.id !== charitySelect.id
        );
        this.charities[index].selected = false;
        this.charitySelectedQuantity--;
        break;
      } else {
        if (
          !this.charities[index].selected &&
          this.charitySelectedQuantity < 2
        ) {
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
      console.log(response);

      this.percentageToDonate = response['percentage']
        ? response['percentage']
        : null;

      if (this.percentageToDonate > 0) {
        this.checkSelectedPercentage();
      }
      this.charitySelectedQuantity = 0;
      this.charitiesSelected = [];

      for (const iterator of response['organizations']) {
        for (const charity of this.charities) {
          //For break For because all charities selected
          if (this.charitySelectedQuantity == 2) break;
          if (iterator.id_charity === charity.id) {
            charity.selected = true;
            this.charitiesSelected.push(charity);
            this.charitySelectedQuantity++;
          }
        }
      }
    } catch (error) {
      this._utils.dismissLoading();
      this._utils.showAlertMessage(
        'Info',
        error['error'].message ? error['error'].message : 'error'
      );
      console.log(error);
    }
    // this.charities.forEach(charityIterable => {
    //   charityIterable.selected = false;
    // });
    // this.charitySelected = null;
    // this.amountToDonate = 0;
  }

  calculatePercentageToShow() {
    return this.percentageToDonate / this.charitiesSelected.length;
  }

  callAlertInfo() {
    this._utils.showAlertMessageHome('Help', 1);
  }

  viewMoreFromCharity(charity: Charity) {
    const navigationExtras: NavigationExtras = {
      state: {
        charity,
      },
    };
    this.navController.navigateForward('user/view-more', navigationExtras);
  }

  updatePercentage(index: number) {
    for (let index = 0; index < this.selectedPercentage.length; index++) {
      this.selectedPercentage[index] = false;
    }
    this.selectedPercentage[index] = true;
  }

  checkSelectedPercentage() {
    console.log(this.percentageToDonate);

    for (let index = 0; index < this.selectedPercentage.length; index++) {
      this.selectedPercentage[index] = false;
    }

    if (this.percentageToDonate == 1) {
      this.selectedPercentage[0] = true;
    } else if (this.percentageToDonate == 5) {
      this.selectedPercentage[1] = true;
    } else if (this.percentageToDonate == 10) {
      this.selectedPercentage[2] = true;
    } else if (this.percentageToDonate == 25) {
      this.selectedPercentage[3] = true;
    } else {
      this.selectedPercentage[4] = true;
    }
  }

  filterLocal(event) {
    // console.log(event);
    if (event.target.value != '') {
      this.flagQuerySearch = true;
      this.filterByName(event.target.value);
    } else {
      this.charities = this.charitiesBackup;
      this.flagQuerySearch = false;
    }
  }

  private filterByName(search: string): Charity[] {
    console.log(search);
    if (search != '') {
      const resultFilter = this.charitiesBackup.filter((charity) =>
        charity.name.toLowerCase().includes(search)
      );
      console.log(resultFilter);
      if (resultFilter.length == 0) {
        this.charities = [];
        return;
      }
      this.charities = resultFilter;
      return;
    } else {
      this.charities = [];
      return null;
    }
  }

  async selectedCategory(event : CustomEvent){

    // console.log(event);
    // console.log(event.detail.value);
    const categoryForSearch = event.detail.value;

    console.log(categoryForSearch);

    try {

      this.loading = true;
      const response = await this._api.getAllGive(categoryForSearch);
      this.loading = false;
      //console.log(response);
      this.charities = response as Charity[];
      console.log(this.charities);

      if(categoryForSearch){
        this.flagQuerySearch = true;
      } else {
        this.flagQuerySearch = false;
      }

      this.charities = this.charities.filter((charityIterable) => {
        charityIterable.selected = false;
        return charityIterable.status;
      });

    } catch (error) {
      this.loading = false;
      this._utils.showAlertMessage(
        'Info',
        error['error'].message ? error['error'].message : 'error'
      );
      console.log(error);
    }
  }
}
