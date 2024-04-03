import { Component, OnInit } from '@angular/core';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-sidebar-candidat',
  templateUrl: './sidebar-candidat.component.html',
  styleUrls: ['./sidebar-candidat.component.css']
})
export class SidebarCandidatComponent implements OnInit {

  isSidebarVisible = false;
  userConnect:any;
  showButton = true;
  badges:any[]=[];
  courses:any[]=[];
  topics:any[]=[];
  
  
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
  constructor( private usagerService:UsagerService,private router: Router,private homeService:HomePageService) { }

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
