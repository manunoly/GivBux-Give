import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  title = 'Give History';

  historical = [
    {
      id: 'ZPWjT8BE8n',
      new: false,
      op: 0,
      userid: "zrPofmHmZc",
      amount: "0.1",
      type: "give",
      date: "2020-01-22 05:07:27",
      source: "wallet",
      createdAt: null,
      donationreceive: {
        objectId: "HAlRCC0J7q",
        createdAt: {date: "2019-04-17 14:11:11.276000", timezone_type: 2, timezone: "Z"},
        updatedAt: {date: "2020-01-22 15:01:59.490000", timezone_type: 2, timezone: "Z"},
        name: "Charity A",
        amount: 299.3,
        __type: "Object",
        className: "Organizations"
      }

    },
    {
      id: 'ZPWjT8BE8n',
      new: false,
      op: 0,
      userid: "zrPofmHmZc",
      amount: "0.1",
      type: "give",
      date: "2020-01-22 05:07:27",
      source: "wallet",
      createdAt: null,
      donationreceive: {
        objectId: "HAlRCC0J7q",
        createdAt: {date: "2019-04-17 14:11:11.276000", timezone_type: 2, timezone: "Z"},
        updatedAt: {date: "2020-01-22 15:01:59.490000", timezone_type: 2, timezone: "Z"},
        name: "Charity A",
        amount: 299.3,
        __type: "Object",
        className: "Organizations"
      }
    },

  ] 

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, history: any): any {
    return history.id;
  }


}
