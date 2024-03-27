import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-skills-candidat',
  templateUrl: './skills-candidat.component.html',
  styleUrls: ['./skills-candidat.component.css']
})
export class SkillsCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  isCollapsedJobs = true;
  isCollapsedEmployers = false;
  isCollapsedAbout = false;
  isCollapsedMobile = false;
  userConnect:any;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
 
  toggleCollapseJobs() {
    this.isCollapsedJobs = !this.isCollapsedJobs;
  }
  toggleCollapseEmployers() {
    this.isCollapsedEmployers = !this.isCollapsedEmployers;
  }
  toggleCollapseAbout() {
    this.isCollapsedAbout = !this.isCollapsedAbout;
  }
  toggleCollapseMobile() {
    this.isCollapsedMobile = !this.isCollapsedMobile;
  }
  constructor(private homeService:HomePageService,private usagerService:UsagerService) { }

  ngOnInit(): void {
     // Récupération du token depuis le local storage
     const storedToken = this.usagerService.getToken();
    
     if (storedToken) {   
                 // Décodage de la base64
       const decodedToken = atob(storedToken);
 
       // Parse du JSON pour obtenir l'objet original
       this. userConnect = JSON.parse(decodedToken);
       console.log(this.userConnect);

     }
     console.log(this.userConnect);
     
    this.homeService.getSkillsCandidate(this.userConnect.ID).subscribe(data=>{
      console.log(data);
      
    })

    
  }

}
