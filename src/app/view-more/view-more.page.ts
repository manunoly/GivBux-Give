import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../_models/charity.model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.page.html',
  styleUrls: ['./view-more.page.scss'],
})
export class ViewMorePage implements OnInit {

  charity : Charity;
  title="";

  constructor(private router: Router,
    private navController: NavController) {

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

   }

  ngOnInit() {

  }

  goBack(){
    this.navController.back();
  }

}
