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
  courses_info:any[]=[];
  topics:any[]=[];
  certificats:any[]=[];
  skillAll:any;
  constructor(private usagerService:UsagerService,private router: Router,private homeService:HomePageService) { }

  ngOnInit(): void {
    this.ongletSelectionne = "All";
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
    this.homeService.getSkillsCandidate(this.userConnect.id).subscribe((data=>{
      this.skillAll=data
     this.badges= this.skillAll.badges;
          console.log(this.badges);
          
          this.badges.forEach(element => {      
            // Diviser la chaîne de date en parties : date et heure
            const parts = element.post_date.split(" ");
            const datePart = parts[0];
            const timePart = parts[1];
        
            // Diviser la partie de date en année, mois et jour
            const dateParts = datePart.split("-");
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; // Les mois dans JavaScript sont indexés à partir de 0
            const day = parseInt(dateParts[2]);
        
            // Diviser la partie de temps en heure, minute et seconde
            const timeParts = timePart.split(":");
            const hour = parseInt(timeParts[0]);
            const minute = parseInt(timeParts[1]);
            const second = parseInt(timeParts[2]);
        
            // Créer un objet Date avec les parties analysées
            const date = new Date(year, month, day, hour, minute, second);
        
            // Formatter la date
            element.date = this.formatDate(date);
        });
        
     this.courses_info=this.skillAll.courses_info;
     this.topics=this.skillAll.topics;
     this.certificats=this.skillAll.certificats
     console.log(this.skillAll);
     
    // console.log(this.skillAll,this.courses_info,this.badges);
     
    }))
 
    
  }
  
  formatDate(date: Date): string {
    // Tableau des noms de mois
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Récupérer le mois, le jour et l'année de la date
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const string =","

    // Formater la date dans le format souhaité
    return `${month} ${day} ${string} ${year}`;
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
