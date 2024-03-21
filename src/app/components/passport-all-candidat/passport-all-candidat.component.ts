import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-passport-all-candidat',
  templateUrl: './passport-all-candidat.component.html',
  styleUrls: ['./passport-all-candidat.component.css']
})
export class PassportAllCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  isCollapsedJobs = true;
  isCollapsedEmployers = false;
  isCollapsedAbout = false;
  isCollapsedMobile = false;
  ongletSelectionne: any ;
  userConnect:any;
  badges:any[]=[];
  courses:any[]=[];
  topics:any[]=[];
  skillAll:any;
  constructor(private usagerService:UsagerService,private router: Router,private homeService:HomePageService) { }

  ngOnInit(): void {
    this.ongletSelectionne = "All";
    console.log('ok');
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
    console.log(this.userConnect);
    this.homeService.getSkillsCandidate(this.userConnect.id).subscribe((data=>{
      this.skillAll=data
     this.badges= this.skillAll.badges;
     this.courses=this.skillAll.courses;
     this.topics=this.skillAll.topics
     console.log( this.topics);
     
    }))
    
  }

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

  selectionnerOnglet(onglet: string): void {
    this.ongletSelectionne = onglet;    
  }

}
