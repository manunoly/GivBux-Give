import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-donate-directly',
  templateUrl: './donate-directly.page.html',
  styleUrls: ['./donate-directly.page.scss' , '../home/home.page.scss'],
})
export class DonateDirectlyPage implements OnInit {

  title = 'Directly Give';
  balance = 200;
  userSesion;

  charities = [
    {
      id: 'HAlRCC0J7q',
      image: './assets/icon/favicon.png',
      name: 'Ronald McDonald House Charity',
      amount: 299.3,
      selected: false

    },
    {
      id: '321654',
      image: './assets/icon/favicon.png',
      name: 'American Cancer Society',
      amount: 299.3,
      selected: false,
    },
    {
      id: '123',
      image: './assets/icon/favicon.png',
      name: 'Women´s and Children Shelter',
      amount: 299.3,
      selected: false
    },
    {
      id: '345',
      image: './assets/icon/favicon.png',
      name: 'American Association of Retired Persons',
      amount: 299.3,
      selected: false
    },
    {
      id: '567',
      image: '/assets/icon/favicon.png',
      name: 'World Vision International',
      amount: 299.3,
      selected: false
    },    
  ]

  constructor(private _api: ApiService,
    public _utils : UtilsService) { 
      this.userSesion = this._api.userSesion;
    }

  ngOnInit() {
  }

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }
  
}
