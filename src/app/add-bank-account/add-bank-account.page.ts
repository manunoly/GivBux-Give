import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponseStatusToken } from '../_models/response-status-token.model';
import { ApiService } from '../_services/api.service';
import { UtilsService } from '../_services/utils.service';

declare let dwolla: any;

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.page.html',
  styleUrls: ['./add-bank-account.page.scss'],
})
export class AddBankAccountPage implements OnInit {
  tokenAddBank: string;
  tokenUser: string;
  user: any;
  show: Boolean;
  showCloseButton = false;

  errorByIAV = false;
  messageErrorIAV = '';
  erroByAPI = false;
  messageErrorAPI = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public utilService: UtilsService
  ) {}

  ngOnInit() {
    this.checkValidToken();
  }

  ionViewWillEnter() {}

  private async checkValidToken() {
    /*  this.route.queryParams.subscribe(params => {
      console.log('======= QUERY PARAMS ========');
      console.log(params);
    }); */

    const tokenByUrlUser = this.route.snapshot.paramMap.get('tokenUserGivBux');
    const tokenByUrlAddBank = this.route.snapshot.paramMap.get('tokenAddBank');

    console.log('=========== Tokens ===========');
    console.log(tokenByUrlUser);
    console.log(tokenByUrlAddBank);

    if (tokenByUrlUser && tokenByUrlAddBank) {
      console.log('=========== tokenUSER recieved ===========');
      console.log(tokenByUrlUser);
      console.log('=========== tokenAddBank recieved ===========');
      console.log(tokenByUrlAddBank);

      this.tokenUser = tokenByUrlUser;
      this.tokenAddBank = tokenByUrlAddBank;

      try {
        this.show = true;

        //TOKEN EXPIRED TO TEST
        // `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOiJBbWRjczJ5NmNjIiwiaWF0IjoxNTk5NzQ0MDIxLCJleHAiOjE1OTk3NTg0MjF9.pY5psMZTrupWj_HBmZ0-Y12Rsmo4zsdnn55hgqmHnZE`
        const response = (await this.apiService.statustoken(
         this.tokenUser
        )) as IResponseStatusToken;

        console.log(response);

        this.loadAddBankAccount();
      } catch (error) {
        this.show = false;
        this.showCloseButton = true;
        this.erroByAPI = true;
        this.messageErrorAPI = error['error']['message']
          ? error['error']['message'] + `<br> [cod-A]`
          : 'Sorry, we are facing an unexpected error Checking the User Data. <br> Please go back and try again. <br> [cod-A]';
        console.log(error);
      }
    }
  }

  async loadAddBankAccount() {
    this.show = true;
    try {
      dwolla.configure(environment.env_dwolla); // 'sandbox' | 'prod'
      dwolla.iav.start(
        this.tokenAddBank,
        {
          container: 'iavContainer',
          stylesheets: [
            'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
          ],
          microDeposits: false,
          fallbackToMicroDeposits: true,
          backButton: true,
          subscriber: ({ currentPage, error }) => {
            this.show = false;
            console.log(
              'currentPage:',
              currentPage,
              ' error:',
              JSON.stringify(error)
            );
          },
        },
        (err, res) => {
          //console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));

          if (res) {
            console.log('========== RESPONSE ==========');
            console.log(res);
            this.showCloseButton = true;
          }

          if (err) {
            console.log('========== ERROR BY IAV ==========');
            console.log(err);

            this.messageErrorIAV = `Sorry, we are facing an unexpected error Checking the User Data. <br> Please go back and try again. <br> [cod-IAV]`;

            if (err && err['code'] && err['code'] == 'InvalidIavToken') {
              this.errorByIAV = true;
              this.showCloseButton = true;
              this.messageErrorIAV = `The session has expired. <br> Please go back and try again. <br> [cod-IAV]`;
            }
            this.show = false;
            this.errorByIAV = true;
          }
        }
      );
    } catch (error) {
      console.log(error);
      this.utilService.showAlertMessage(
        'Info',
        error['error'].message ? error['error'].message : 'error'
      );
      this.utilService.returnToAppFromAddBank();
    }
  }

  backToList() {
    this.utilService.returnToAppFromAddBank();
  }

  /**
   * @deprecated
   */
  dwollaAddBank() {
    /*  this.show = false;
    this.apiService.tokenFundingDwolla(this.user.user.dwollaid).then(token => {
      dwolla.configure(environment.env_dwolla); // configure 'sandbox' , 'prod'
      dwolla.iav.start(token['token'], {
        container: 'iavContainer', 
        stylesheets: [
          'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext'
        ],
        microDeposits: false,
        fallbackToMicroDeposits: true,
        backButton: true,
        subscriber: ({ currentPage, error }) => {
          this.show = true;
          console.log('currentPagesubscriber:', currentPage, 'errorsubscriber:', JSON.stringify(error))
        }
      }, function (err, res) {
        this.show = true;
        console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
      });
    }).catch() */
  }
}
