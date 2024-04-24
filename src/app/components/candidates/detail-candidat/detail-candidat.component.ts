import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-detail-candidat',
  templateUrl: './detail-candidat.component.html',
  styleUrls: ['./detail-candidat.component.css']
})
export class DetailCandidatComponent implements OnInit {
  identifiant:number | null = 0;
  candidat:any
  candidate=false;
  compagny=false;
  userConnect:any;
  message: any = {
    type: '',
    message: ''
  };
  applyJobs=false
  jobId!: number ; // Initialisé à null
  canApprove=false
  jobLoaded: boolean = false;
  isBookmarked: boolean = false;

  constructor(private usagerService: UsagerService,private route : ActivatedRoute ,private HomePageService: HomePageService, private router: Router) { }
  
  ngOnInit(): void {

    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      //console.log(this.userConnect);
      
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
      }
    }

    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'];
        this.HomePageService.getDetailJob( this.jobId).subscribe(job => {
          if (job.applied.includes(this.userConnect) && job.company === this.userConnect) {
            this.canApprove=!this.canApprove
          }
          console.log(this.jobId,job); 

        });
    });
  
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data  
      this.jobLoaded = true          
    })
    
  }
  rejectCandidatByCompany(){

    if (this.userConnect && this.jobId ) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.rejectCandidatByCompany(this.userConnect.id, this.jobId)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "Candidate successfully rejected."
              }          
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
              // if (typeR == "success") {
              //   this.router.navigate(['/applies-candidat',this.userConnect.id]);
              // }
            },
          // Gestion des erreurs
          (error) => {            
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            }); 
          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });  
    }
  }

  approveCandidatByCompany(){
    if (this.userConnect && this.jobId ) {
      console.log(this.userConnect,this.jobId);
      
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.approveCandidatByCompany(this.userConnect.id, this.jobId)
        .subscribe(
          // Succès de la requête
             (response) => {
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "Candidate accepted successfully."
              }          
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
              // if (typeR == "success") {
              //   this.router.navigate(['/applies-candidat',this.userConnect.id]);
              // }
            },
          // Gestion des erreurs
          (error) => {            
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            }); 
          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });  
    }
  }
  favoritesCandidat() {
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.userConnect && this.candidat) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.favoritesCandidat(this.userConnect.id, this.candidat.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "Your new favorite Candidate has been added."
                this.isBookmarked = true;
              }
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
              this.router.navigate(['/compagny-candidat',this.userConnect.id])
              // if (typeR == "success") {
              //   this.router.navigate(['/applies-candidat',this.userConnect.id]);
              // }
            },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            });
          }
        );
    } else {
      ToastNotification.open({
        type: 'error',
        message: "please log in first"
      });
      this.router.navigate(['/login']);

    }
  }

}
