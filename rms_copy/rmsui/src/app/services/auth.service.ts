import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public rootUrl: any = environment.rootUrl;
  public userData: any = [];
  public token: any = '';

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router) {
    this.token = localStorage.getItem('token');
  }


  login(credentials: any): Observable<any> {
    return this.http.post(this.rootUrl + 'login', credentials, httpOptions).pipe(map(res => {
      this.userData = res;
      if (this.userData.success) {
        localStorage.setItem('token', this.userData.token);
      }
      return res;
    }));
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  get tokenExpiry() {
    return this.helper.getTokenExpirationDate('token');
  }

  get currentUser() {
    let token = localStorage.getItem('token');

    if (token) {
      let isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        return this.helper.decodeToken(token);
      } else {
        this.logout();
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }




}
