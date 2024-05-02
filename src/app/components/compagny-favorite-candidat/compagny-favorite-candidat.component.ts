import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
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
  loading:boolean=true;
  userConnect:any;
  applicants:any;
  searchTitle:string="";
  searchLocation:string="";
  message: any = {
    type: '',
    message: ''
  };
  identifiant:number | null = 0;

  constructor(private route : ActivatedRoute,private usagerService:UsagerService,private homeService:HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    

         // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.getCandidatCompagny(this.userConnect.id).subscribe((data:any)=>{
      this.loading=false;
      this.applicants=data 
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
  trashFavoritesCandidat(idCandidate:string) {
    if (confirm('Do you want to remove this candidate from your favorites?')) {

    console.log(this.identifiant,idCandidate);
    //return
    
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.identifiant && idCandidate) {
      // Utilisez le service pour postuler à l'emploi
      this.homeService.trashFavoritesCandidat(this.identifiant, idCandidate)
        .subscribe(
          // Succès de la requête
          (response) => {
            let typeR = "error"
            if (<any>response ) {
              console.log(response);
              
              typeR = "success";
              this.message= "This Candidate is deleted to favorites."
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
