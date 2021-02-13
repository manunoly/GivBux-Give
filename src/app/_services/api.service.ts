import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private _userSesion;
  private _token: string;
  private _afterTransferSuccess: boolean = false;

  constructor(private _http: HttpClient) {
    // Refresh page on some view (optional)
    this.refreshSameTokenSession();
  }

  private getHeaders() {
    return {};
  }

  public set token(v: string) {
    this._token = v;
    sessionStorage.setItem('token', v);
  }

  public set userSesion(v: any) {
    this._userSesion = v;
    sessionStorage.setItem('userSesion', JSON.stringify(v));
  }

  public get token(): string {
    return this._token;
  }

  public get userSesion(): any {
    return this._userSesion;
  }

  public set afterTransferSuccess(v: any) {
    this._afterTransferSuccess = v;
  }

  public get afterTransferSuccess(): any {
    return this._afterTransferSuccess;
  }

  giveValidateToken(token: string): Promise<Object> {
    const url = this.apiUrl + 'givevalidateToken';
    const headers = this.getHeaders();

    const params = {
      token: token,
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  donateFromWallet(amount: number, token: string): Promise<Object> {
    const url = this.apiUrl + 'balancetodonationgivbuxtoken';
    const headers = this.getHeaders();

    const params = {
      amount: amount,
      token: token,
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  getAllGive(idCategory?: string): Promise<Object> {
    const giveCategory = idCategory ? idCategory : 'null';

    const url = this.apiUrl + 'give/' + giveCategory;
    const headers = this.getHeaders();

    return this._http.get(url, { headers: headers }).toPromise();
  }

  giveToCharity(id_charity: string, amount: number): Promise<Object> {
    const url = this.apiUrl + 'give';
    const headers = this.getHeaders();

    const params = {
      id_organizations: id_charity,
      amount: '' + amount,
      token: this.token,
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  giveSaveDefaultAutomatic(
    id_charity1: string,
    percentageToDonate: number,
    id_charity2?: string
  ) {
    //Promise<Object>

    const url = this.apiUrl + 'givesavedefault';
    const headers = this.getHeaders();

    let params = {
      token: this.token,
      percentage: percentageToDonate,
      id_charity1: id_charity1,
    };

    id_charity2
      ? (params = { ...params, ...{ id_charity2: id_charity2 } })
      : '';

    console.log(params);

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  getGiveDefault() {
    const url = this.apiUrl + 'getgivedefault';
    const headers = this.getHeaders();

    const params = {
      token: this.token,
    };

    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  getHistorical(): Promise<Object> {
    const url = this.apiUrl + 'givehistorytoken';

    const headers = this.getHeaders();
    const params = {
      token: this.token,
    };
    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  refreshSameTokenSession(): boolean {
    if (sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token');
      this._userSesion = JSON.parse(sessionStorage.getItem('userSesion'));
      return true;
    }
    return false;
  }

  getDataGiveUser(): Promise<Object> {
    const url = this.apiUrl + 'getdatagive';

    const headers = this.getHeaders();
    const params = {
      token: this.token,
    };
    return this._http.post(url, params, { headers: headers }).toPromise();
  }

  getGiveCategories(): Promise<Object> {
    const url = this.apiUrl + 'givecategories';
    const headers = this.getHeaders();

    return this._http.get(url, { headers: headers }).toPromise();
  }

  statustoken(token): Promise<Object> {
    const url = this.apiUrl + `statustoken/${token}`;
    return this._http.get(url).toPromise();
  }
}
