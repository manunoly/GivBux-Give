import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  
  title = 'Give';
  amount = 10;
  donatedTo = '';
  imageSuccess = './assets/img/success/hands.svg';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _api : ApiService) { 
    
    // PARAMMAP FOR AMOUNT 
    this.amount = this.route.snapshot.paramMap.get('amount') ? Number(this.route.snapshot.paramMap.get('amount')) : 0;

    if (this.route.snapshot.paramMap.get('typepage') == 'holding') {

      this.donatedTo = '';

    } else if(this.route.snapshot.paramMap.get('typepage') == 'automatic') {

      this.donatedTo = this.route.snapshot.paramMap.get('charity1') ;
                                    // if exist charity2 add to string if not add blank
      this.donatedTo +=  (this.route.snapshot.paramMap.get('charity2')) ? ( ' & ' + this.route.snapshot.paramMap.get('charity2') ) : '';

    } else if(this.route.snapshot.paramMap.get('typepage') == 'directly') {

      this.donatedTo = this.route.snapshot.paramMap.get('charity1');

    }
    

   }

  ngOnInit() {
  }

  goHome(){
    //Setting flag for reload data on Home view after transfer operation
    this._api.afterTransferSuccess = true;
    this.router.navigate(['/']);
  }
}
