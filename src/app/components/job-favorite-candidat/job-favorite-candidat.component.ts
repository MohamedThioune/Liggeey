import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-job-favorite-candidat',
  templateUrl: './job-favorite-candidat.component.html',
  styleUrls: ['./job-favorite-candidat.component.css']
})
export class JobFavoriteCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  identifiant:number | null = 0;
  favorites:any;
  userConnect:any;
  jobId:any
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
    this.identifiant = +this.route.snapshot.params['id'];    
    console.log(this.identifiant);
    
    this.HomePageService.getAlertCandidat( this.identifiant).subscribe(data=>{
      this.favorites=data  
      this.favorites.forEach((element:any) => {
        this.jobId = element.id 
        const date = new Date(element.posted_at);
        element.date = this.formatDate(date);        
      });          
    })
  }
  trashFavoritesJob(idJob:any){
    this.HomePageService.trashFavoritesJob(this.userConnect.id, idJob).subscribe(()=>{
    })
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
    return `${month} ${day}${string}${year}`;
  }
}
