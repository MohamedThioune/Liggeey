import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Usager } from '../interfaces/usager';
import { UserResetPassword } from '../interfaces/user-reset-password';
import { UsagerCompany } from '../interfaces/usager-company';


@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  constructor(private http: HttpClient) { }
  connection(user:User): Observable<any> {
    const base64Credentials = btoa(user.username + ':' + user.password);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    return this.http.post('https://www.livelearn.nl/wp-json/wp/v2/users/me',{}, { headers });
  }
  inscription(usager: Usager): Observable<any> {
    const base64Credentials = btoa(" aaondiaye@gmail.com " + ':' + "L0vele@rn2023");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    const requestBody = {
      email:usager.email,
      password: usager.password,
      first_name: usager.firstName,
      last_name: usager.lastName,
      name:usager.name,
      username:usager. username,
      roles: ["subscriber"],
      acf:{
        "is_liggeey":"candidate"
      },
    };    
    return this.http.post<Usager>(" https://www.livelearn.nl/wp-json/wp/v2/users", requestBody, { headers });
  }
  inscriptionCompagny(usager: UsagerCompany): Observable<any> {
    const base64Credentials = btoa(" aaondiaye@gmail.com " + ':' + "L0vele@rn2023");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    const requestBody = {
      email:usager.emailCompagny,
      phone:usager.phoneCompagny,
      password: usager.passwordCompagny,
      password_confirmation:usager.confirmPasswordCompagny,
      first_name: usager.firstNameCompagny,
      last_name: usager.lastNameCompagny,
      bedrijf:usager.bedrijf,
      acf:{
        "is_liggeey":"chief"
      },   
    };    
    return this.http.post<any>(" https://www.livelearn.nl/wp-json/custom/v1/register/company", requestBody, { headers });
  }
  storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  generateCode(email:String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    return this.http.post('https://livelearn.nl/wp-json/bdpwr/v1/reset-password',{email}, { headers });
  }
  resetPassword(userResetPassword:UserResetPassword): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });
    const bodyRequestPassword = {
      email : userResetPassword.email,
      password : userResetPassword.password,
      code : userResetPassword.code,
     
    }
    return this.http.post<UserResetPassword>('https://livelearn.nl/wp-json/bdpwr/v1/set-password',bodyRequestPassword, { headers });
  }

  deconnexion() {
    localStorage.removeItem('access_token');
    window.location.href = "login";
  } 
}
