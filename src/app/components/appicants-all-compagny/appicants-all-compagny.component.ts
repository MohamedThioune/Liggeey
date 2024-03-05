import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-appicants-all-compagny',
  templateUrl: './appicants-all-compagny.component.html',
  styleUrls: ['./appicants-all-compagny.component.css']
})
export class AppicantsAllCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  applicant:any;
  searchTitle:String="";
  constructor(private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
     // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.getApplicantUser(this.userConnect.id).subscribe((data:any)=>{
      this.applicant=data
      console.log(this.applicant);
      
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

  get filteredApplicant() {
    if (this.searchTitle.trim() !== '' ) {
      return this.applicant.filter((applicant:any) => {
        const titleMatch = this.searchTitle.trim() === '' || applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return this.applicant;
    }
  }

}
