import { Component, OnInit } from '@angular/core';
import { Charity } from '../_models/charity.model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-success-directly',
  templateUrl: './success-directly.page.html',
  styleUrls: ['./success-directly.page.scss'],
})
export class SuccessDirectlyPage implements OnInit {
  charity: Charity;
  amountDonated: number;
  title = '';

  constructor(
    private router: Router,
    private navController: NavController,
    private _api: ApiService
  ) {
    this.charity =
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state
        ? this.router.getCurrentNavigation().extras.state.charity
        : null;

    console.log(this.charity);

    if (!this.charity) {
      this.navController.back();
      return;
    }

    this.title = this.charity.name;
    this.charity.image_background = this.charity.image_background
      ? this.charity.image_background
      : '/assets/img/givbux-new-logo.svg';

    this.amountDonated =
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state
        ? this.router.getCurrentNavigation().extras.state.amountDonated
        : null;

    if (!this.amountDonated) {
      this.navController.back();
      return;
    }
  }

  ngOnInit() {}

  goHome() {
    //Setting flag for reload data on Home view after transfer operation
    this._api.afterTransferSuccess = true;
    this.navController.navigateRoot(['/']);
  }
}
