import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsagerService } from '../services/usager.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  userConnect:any
  role:any
  constructor(private authService: UsagerService, private router: Router) {}
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
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUserRole = this.getUserRole(); // Utilisez votre méthode pour obtenir le rôle de l'utilisateur

      if (currentUserRole === 'chief') {
        return true;
      } else {
        this.router.navigate(['']); // Redirigez vers la page d'accueil si l'utilisateur n'est pas un candidat
        return false;
      }
  }
}
