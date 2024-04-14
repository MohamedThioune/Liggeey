import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  notification:any;
  isLoading=false;

  constructor(private usagerService: UsagerService,private route : ActivatedRoute,private router :Router ,private HomePageService: HomePageService) { }

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
         // console.log(this.jobId,job, job.company,this.userConnect); 

        });
    });
  
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data      
            
    })
    
  }
  rejectCandidatByCompany(){
    this.isLoading=true
    this.notification ={
      userApplyId:this.userConnect.id,
      title:"Response to your job application",
      content:"Your job application has been rejected",
      receiver_id:this.candidat.ID
    }
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
                console.log(this.notification);
              //  return
                
                this.HomePageService.sendNotification(this.candidat.ID,this.notification)

              }          
              ToastNotification.open({
                type: typeR,
                message: this.message

              });
              this.isLoading=false

              if (typeR == "success") {
                this.router.navigate(['/applicant-compagny',this.jobId]);
              }
            },
          // Gestion des erreurs
          (error) => {            
            ToastNotification.open({
              type: 'error',
              message: error.error
            }); 
            this.isLoading=false

         //   console.log(error.error);

          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });  
      this.isLoading=false

    //  console.log( this.message.message);
      
    }
  }

  approveCandidatByCompany(){
    this.isLoading=true

    this.notification ={
      userApplyId:this.userConnect.id,
      title:"Response to your job application",
      content:"Your job application has been approved",
      receiver_id:this.candidat.ID
    }
    if (this.candidat && this.jobId ) {
     // console.log(this.userConnect,this.jobId);
      
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.approveCandidatByCompany(this.candidat.ID, this.jobId)
        .subscribe(
          // Succès de la requête
             (response) => {
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application approved with success !."
                this.HomePageService.sendNotification(this.candidat.ID,this.notification)

              }          
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
              this.isLoading=false

              if (typeR == "success") {
                this.router.navigate(['/applicant-compagny',this.jobId]);
              }
            },
          // Gestion des erreurs
          (error) => {            
            ToastNotification.open({
              type: 'error',
              message: error.error
            }); 
            this.isLoading=false

          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      }); 
      this.isLoading=false
 
    }
  }


}
