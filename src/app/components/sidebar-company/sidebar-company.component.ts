import { Component, OnInit } from '@angular/core';
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
  }
  constructor(private usagerService:UsagerService) { }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      console.log(this.userConnect.acf.is_liggeey);
    }
  }

}
