import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private _userSesion;
  private _token : string;
  private _afterTransferSuccess : boolean = false;

  constructor(private _http: HttpClient) {

    // Refresh page on some view (optional)
    this.refreshSameTokenSession();

   }

  private getHeaders() {
    return {
      "X-Parse-Application-Id": "9fadf4897e214f2vv5c05d7973331gg8",
      "X-Parse-REST-API-Key": "20dbb0840bf6227dac0209dbdggg2454"
    };
  }
  
  public set token(v : string) {
    this._token = v;
    sessionStorage.setItem('token' , v);
  } 
  
  public set userSesion(v : any) {
    this._userSesion = v;
  } 
  
  public get token() : string {
    return this._token;
  }

  public get userSesion() : any {
    return this._userSesion;
  }

  public set afterTransferSuccess(v : any) {
    this._afterTransferSuccess = v;
  } 

  public get afterTransferSuccess() : any {
    return this._afterTransferSuccess;
  }

  giveValidateToken(token : string): Promise<Object> {
    const url = this.apiUrl + "givevalidateToken";
    const headers = this.getHeaders();

    const params = {
      token: token
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  donateFromWallet(amount : number, token : string): Promise<Object> {
    const url = this.apiUrl + "balancetodonationgivbuxtoken";
    const headers = this.getHeaders();

    const params = {
      amount: amount,
      token: token
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  getAllGive(): Promise<Object> {

    const url = this.apiUrl + "give";
    const headers = this.getHeaders();

    return this._http.post(url, { headers: headers }).toPromise();
  }

  getHistorical() : Promise<Object> {
 
      const url = this.apiUrl + "givehistorytoken";
  
      const headers = this.getHeaders();
      const params = {
        token: this.token
      };
      return this._http.post(url, params , {headers : headers}).toPromise();    
  }

  refreshSameTokenSession() : boolean{

    if(sessionStorage.getItem('token')){
      this._token =  sessionStorage.getItem('token');
      return true;
    }
    return false;
  }

}
