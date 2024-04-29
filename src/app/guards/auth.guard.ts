import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsagerService } from '../services/usager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UsagerService,private router :Router) {}
userConnect:any
role:any
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     const token = localStorage.getItem('access_token');
  //     if(token){
  //       return true;
  //     }else{
  //       window.location.href = environment.login_url;
  //       return false;
  //     }  
  //   }

  getUserRole():string{
    const storedToken = this.authService.getToken();

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      this.role=this.userConnect.acf.is_liggeey
    
    }
    return this.role;
  
}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = environment.login_url;
        return false;
      }

      const currentUserRole = this.getUserRole(); // Vous devez implémenter cette méthode pour récupérer le rôle de l'utilisateur

      if (state.url.includes('dashboard-candidat') && currentUserRole !== 'candidate') {
        this.router.navigate(['']);
                return false;
      } else if (state.url.includes('dashboard-employer') && currentUserRole !== 'chief') {
        this.router.navigate(['']);
        return false;
      }

      return true; 
    }
  
}
