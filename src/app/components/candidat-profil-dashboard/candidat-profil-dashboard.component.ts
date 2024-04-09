import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-candidat-profil-dashboard',
  templateUrl: './candidat-profil-dashboard.component.html',
  styleUrls: ['./candidat-profil-dashboard.component.css']
})
export class CandidatProfilDashboardComponent implements OnInit {
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
  constructor(private usagerService: UsagerService,private route : ActivatedRoute ,private HomePageService: HomePageService) { }

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
          console.log(this.jobId,job, job.company,this.userConnect); 

        });
    });
  
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data      
      console.log(this.candidat);
            
    })
    
  }
  rejectCandidatByCompany(){

    if (this.candidat && this.jobId ) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.rejectCandidatByCompany(this.candidat.ID, this.jobId)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application rejected with success !."
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
              message: error.error
            }); 
         //   console.log(error.error);

          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });  
    //  console.log( this.message.message);
      
    }
  }

  approveCandidatByCompany(){
    if (this.candidat && this.jobId ) {
      console.log(this.userConnect,this.jobId);
      
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.approveCandidatByCompany(this.candidat.id, this.jobId)
        .subscribe(
          // Succès de la requête
             (response) => {
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application approved with success !."
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
              message: error.error
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


}
