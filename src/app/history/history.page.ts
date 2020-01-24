import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  title = 'Give History';

  historical = [] 

  constructor(private _api: ApiService,
    private route: ActivatedRoute,
    public _utils : UtilsService) { }

 async ngOnInit() {

    try {      
      this._utils.showLoading();
      const response = await this._api.getHistorical();
      this._utils.dismissLoading();
      console.log(response);       
      this.historical = response as [];
      

    } catch (error) {
      this._utils.dismissLoading();
      this._utils.showAlertMessage( 'Info' , error['error'].message ? error['error'].message  : 'error');
      console.log(error);
    }

  }

  trackByFn(index: number, history: any): any {
    return history.id;
  }


}
