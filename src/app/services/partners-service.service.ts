import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Partners } from '../interfaces/partners';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PartnersServiceService implements CanActivate {
  public credentialUrl: string = '../../assets/data/credential.json';
  public partnersData: string = '../../assets/data/partners.json';
  public userStatus: boolean = false;
  constructor(private httpclient: HttpClient) {}
  //authentication
  userauthentication(status: boolean) {
    this.userStatus = status;
  }
  //canactivate
  canActivate(): boolean {
    if (this.userStatus) {
      return true;
    } else {
      return false;
    }
  }

  //getting credential from credential.json
  getCredential(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.credentialUrl);
  }
  //getting partners data
  getPartnersData(): Observable<Partners[]> {
    return this.httpclient.get<Partners[]>(this.partnersData);
  }
}
