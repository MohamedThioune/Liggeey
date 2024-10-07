import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-appicants-all-compagny',
  templateUrl: './appicants-all-compagny.component.html',
  styleUrls: ['./appicants-all-compagny.component.css']
})
export class AppicantsAllCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  loading:boolean=true;
  applicant:any;
  searchTitle:String="";
  slug:any;
  numberCandidat:any
  isLoading=false;
  notification:any;
  candidat:any
  applyJobs:boolean=false

  message: any = {
    type: '',
    message: ''
  };
  constructor(private homeService:HomePageService,private route : ActivatedRoute,private usagerService: UsagerService,private router: Router) { }

  ngOnInit(): void {
    
    this.slug = this.route.snapshot.params['slug'];  

     // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.getDetailJob(this.slug).subscribe((data:any)=>{
      this.applicant = data          
      this.numberCandidat =  this.applicant.applied.length      
      this.loading=false;            
     })
  }

  send_id(id: any, jobId: string) {
    this.homeService.setCandidatId(id);
    localStorage.setItem('candidatId', id); // Store the ID in localStorage
    this.router.navigate(['/candidat-profil'], { queryParams: { jobId: jobId } })
      .then(() => {
        window.location.reload();
      });
}

  
  // goToDetailCandidate( idCandidat: number) {
  //   this.router.navigate(['/detail-candidate', idCandidat]);
  // }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

  get filteredApplican() {
    if (this.searchTitle.trim() !== '' ) {
      return this.applicant.applied.filter((applicant:any) => {
        const titleMatch = this.searchTitle.trim() === '' || applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return this.applicant;
    }
  }
  get filteredApplicant() {
    if (this.searchTitle.trim() !== '') {
      return this.applicant.applied.filter((applicant: any) => {
        const titleMatch = applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return this.applicant.applied; // Retournez le tableau complet d'applicants
    }
  }
  rejectCandidatByCompany(candidat:any){
    this.isLoading=true
    this.notification ={
      userApplyId:this.userConnect.id,
      title:"Response to your job application",
      content:"Your job application has been rejected",
      receiver_id:candidat.ID
    }
    
    if (this.candidat && this.applicant.ID ) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.homeService.rejectCandidatByCompany(this.candidat.ID, this.applicant.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application rejected with success !."
              //  return
                
              this.homeService.sendNotification(this.candidat.ID,this.rejNotificationCand(this.candidat.ID,this.userConnect.id,this.applicant.ID)).subscribe();
              this.homeService.sendNotification(this.userConnect.id,this.rejNotificationComp(this.userConnect.id,this.applicant,this.candidat)).subscribe();
              }          
              ToastNotification.open({
                type: typeR,
                message: this.message

              });
              this.isLoading=false

              if (typeR == "success") {
                this.router.navigate(['/applicant-compagny',this.applicant.ID]);
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
  rejNotificationCand(idUser:number,idUser2:number,job:any):any{
    const notif={
      userApplyId:idUser,
      title:"Result of application for "+job.title,
      content: `
      I hope this email finds you well.<br>
      I regret to inform you that after careful consideration, we have decided not to proceed further with your application for the ${job.title} position at ${job.company.title}.<br>
      We received a significant number of applications, and while we appreciate the time and effort you invested in your application, we have selected candidates whose qualifications and experiences more closely align with the requirements of the role.<br>
      Please understand that this decision does not reflect on your abilities or potential. We encourage you to continue pursuing opportunities that match your skills and aspirations.<br>
      We genuinely appreciate your interest in joining our team and thank you for considering ${job.company.title} as a potential employer.<br>
      We wish you all the best in your future endeavors.<br>
      `,
      trigger:"Response of job application",
      receiver_id:idUser2,
    }
    return notif; 
  }
  rejNotificationComp(idUser:number,job:any,user:any):any{
    const notif={
      userApplyId:idUser,
      title:"Application rejected for "+job.title,
      content: `
      I hope this message finds you well.<br>
      I am writing to confirm that your recent action to reject the candidacy of ${user.first_name} ${user.last_name} for the ${job.title} position has been successfully processed.<br>
      Thank you for your prompt attention to this matter. We will proceed accordingly with the next steps in the hiring process.<br>
      Once again, thank you for your decisive action in this matter.<br>
      `,
      trigger:"Job Reject",
      receiver_id:null,
    }
    return notif; 
  }
}
