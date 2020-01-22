import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate-automatic',
  templateUrl: './donate-automatic.page.html',
  styleUrls: ['./donate-automatic.page.scss' , '../home/home.page.scss'],
})
export class DonateAutomaticPage implements OnInit {

  title = 'Automatic Give';
  balance = 200;

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

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, charity: any): any {
    return charity.id;
  }

}
