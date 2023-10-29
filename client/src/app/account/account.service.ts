import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  //returns boolean
  isAdmin(token: string): any {
    if (token) {
      const decodedToken = JSON.parse(window.atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
  }

  loadCurrentUser(token: string | null)
  {
    if (token === null){
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    
    return this.http.get<User>(this.baseUrl + 'account', {headers}).pipe(
      map(user => {
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
          return user;
        }
        else{
          return null;
        }
      })
    )
    
  }


  login(values: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/login',values).pipe(
      map(user => {
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
        this.isAdminSource.next(this.isAdmin(user.token));
      })
    );
  }

  register(values: any){
    return this.http.post<User>(this.baseUrl + 'account/register',values).pipe(
      map(user => {
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }

  getUserAddress(){
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address){
    return this.http.put(this.baseUrl + 'account/address',address);
  }


}
