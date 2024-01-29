import { Component, OnInit } from '@angular/core';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-candidat',
  templateUrl: './sidebar-candidat.component.html',
  styleUrls: ['./sidebar-candidat.component.css']
})
export class SidebarCandidatComponent implements OnInit {

  isSidebarVisible = false;
  userConnect:any;

  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;  
    console.log(this.isSidebarVisible);
      
  }
  deconnexion(){
    this.usagerService.deconnexion()
  }
  constructor( private usagerService:UsagerService,private router: Router) { }

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
