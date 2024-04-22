import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-compagny-favorite-candidat',
  templateUrl: './compagny-favorite-candidat.component.html',
  styleUrls: ['./compagny-favorite-candidat.component.css']
})
export class CompagnyFavoriteCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  applicants:any;
  searchTitle:string="";
  searchLocation:string="";
  jobLoaded:boolean =false;

  constructor(private usagerService:UsagerService,private homeService:HomePageService) { }

  ngOnInit(): void {
         // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.getCandidatCompagny(this.userConnect.id).subscribe((data:any)=>{
      this.applicants=data 
      this.jobLoaded=true     
     })
  }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  get filteredJobs() {
    if (this.searchTitle.trim() !== '' ) {
      return this.applicants.filter((job:any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return this.applicants;
    }
  }
}
