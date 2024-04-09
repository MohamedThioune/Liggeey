import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
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
  jobId:any;
  message: any = {
    type: '',
    message: ''
  };
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

  constructor(private route : ActivatedRoute ,private cdr: ChangeDetectorRef,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router ,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    console.log(this.identifiant);
    
    this.HomePageService.getAlertCandidat( this.identifiant).subscribe(data=>{
      this.favorites=data  
      console.log(this.favorites);
      
      this.favorites.forEach((element:any) => {
        this.jobId = element.id 
        const date = new Date(element.posted_at);
        element.date = this.formatDate(date);        
      });          
    })
  }

  trashFavoritesJob(idJob:string) {
    if (confirm('Do you want to remove this job from your favorites?')) {

    console.log(this.identifiant,idJob);
    //return
    
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.identifiant && idJob) {
      // Utilisez le service pour postuler à l'emploi
      this.HomePageService.trashFavoritesJob(this.identifiant, idJob)
        .subscribe(
          // Succès de la requête
          (response) => {
            let typeR = "error"
            if (<any>response ) {
              console.log(response);
              
              typeR = "success";
              this.message= "Your job is deleted to favorites."
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
     
          },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            });
            
          }
        );
    }} else {
      ToastNotification.open({
        type: 'error',
        message: "delete cancelled"
      });      
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
    return `${month} ${day}${string}${year}`;
  }
}
