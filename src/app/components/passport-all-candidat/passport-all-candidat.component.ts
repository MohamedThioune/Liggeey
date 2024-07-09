import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading:boolean=true;
  badges:any[]=[];
  courses_info:any[]=[];
  topics:any[]=[];
  certificats:any[]=[];
  skillAll:any;
  candidat:any;
  identifiant:number | null = 0;
  showAllCourses: boolean = false;
  showAllSkills: boolean = false;
  showAllBadges: boolean = false;
  showAllCertificates: boolean = false;
  skill = { note: 75 };
  subtopic: any[] = [];
  sub:any
 // subtopic: any[] = [];
 username: string = '';
 password: string = '';
 isLoading=false
 form!:FormGroup
  constructor(private route : ActivatedRoute,private usagerService:UsagerService,private router: Router,private homeService:HomePageService) { }

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
     this.loading=false;
    }))
    const user = {
      username: "mbayamemansor@gmail.com",
      password: "hidden"
    }    
    this.homeService.getSubtopic(user).subscribe((data:any)=>{
      this.subtopic=data
      console.log(this.subtopic);
      
     })
    
  }
  openSkillModal(skill: any): void {
    // const modalRef = this.modalService.open(SkillModalComponent);
    // modalRef.componentInstance.skill = skill;
  }

  openApplyModal(skill:any) {
    console.log(skill)
    const modalElement = document.getElementById('exampleModalEdu');
    if (modalElement) {
      modalElement.click();
    } else {
      console.error("Modal element not found");
    }
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
  // Dans votre composant Angular
getImageUrlz(note: number): string {
  // Logique pour retourner l'URL de l'image en fonction du pourcentage
  // Par exemple :
  if (note >= 80) {
      return "../../../assets/img/pourcent_80.png";
  } else if (note >= 60) {
      return "../../../assets/img/pourcent_60.png";
  } else {
      return "../../../assets/img/pourcent.png";
  }
}
getColor(note: number): string {
  // Calculate red and green values based on the note
  const red = Math.floor(255 * (1 - note / 100));
  const green = Math.floor(255 * (note / 100));
  return `rgb(${red}, ${green}, 0)`;
}

getImageUrl(note: number): string {
  // Replace with your actual image URL logic
  return 'path/to/image';
}
onSubmit(){
  
}

getImageWidth(note: number): number {
  // Logique pour retourner la largeur de l'image en pourcentage de la largeur parente
  // Par exemple, vous pouvez faire en sorte que 100% soit la largeur maximale et que 0% soit la largeur minimale
  return note;
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
