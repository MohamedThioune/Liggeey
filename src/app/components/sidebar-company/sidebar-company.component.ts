import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-sidebar-company',
  templateUrl: './sidebar-company.component.html',
  styleUrls: ['./sidebar-company.component.css']
})
export class SidebarCompanyComponent implements OnInit {
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  activeItem: string | null = null;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  deconnexion(){
    this.usagerService.deconnexion()
    localStorage.removeItem('cachedCandidat');

  }
  constructor(private usagerService:UsagerService,private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeItem = null; // Reset the active item on route change
      }
    });
  }
  setActiveItem(item: string) {    
    this.activeItem = item;
  }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
  }

}
