import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidat-profil-dashboard',
  templateUrl: './candidat-profil-dashboard.component.html',
  styleUrls: ['./candidat-profil-dashboard.component.css']
})
export class CandidatProfilDashboardComponent implements OnInit {
  candidat:any
  candidate=false;
  compagny=false;
  userConnect:any;
  message: any = {
    type: '',
    message: ''
  };
  applyJobs=false
  job:any;
  jobId!: any ; // Initialisé à null
  canApprove=false
  alreadyReject=true
  alreadyApproved=true
  notification:any;
  isLoading=false;
  nameCv:any
  urlCv:any
  id:any
  subtopic: any[] = [];
  motivation:any
  skills:any
  isLoadingMotivation: boolean = false;
  isLoadingAbout: boolean = false;
  isLoadingProfil: boolean = false;
  isLoadingCv: boolean = false;
  isLoadingPassport: boolean = false;
  isLoadingEducation: boolean = false;
  isLoadingWork: boolean = false;
  profil:any
  favourite:boolean = false
  loading:boolean=true;

  constructor(private usagerService: UsagerService,private route : ActivatedRoute,private router :Router ,private HomePageService: HomePageService,private location: Location) { }

  ngOnInit(): void {

    const storedToken = this.usagerService.getToken();
    const storedId = localStorage.getItem('candidatId');
    if (storedId) {
        this.id = storedId;
    }
    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);  
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
      }
    }
    
    if (this.userConnect && this.userConnect.id) {
      this.HomePageService.getSubtopic(this.userConnect.id).subscribe(
        (data: any) => {
          this.subtopic = data;          
        },
        (error) => {
          console.error('Error fetching subtopics', error);
        }
      );
    } else {
      console.error('User not logged in');
    }
    
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'];
      
        this.HomePageService.getDetailJob( this.jobId).subscribe(job => {
          this.job=job;   
          const dateString = this.job.expired_at;

          // Extract year, month, and day
          const year = dateString.substring(0, 4);
          const month = dateString.substring(4, 6);  // Note: Month in Date constructor is 0-indexed, so subtract 1 later
          const day = dateString.substring(6, 8);

          // Create a Date object
          const dateObject = new Date(Number(year), Number(month) - 1, Number(day));
          const formattedDate = `${year}-${month}-${day}`;
          this.job.expired_at=formattedDate          
          if (Array.isArray(job.applied)) {
            const applicant = job.applied.find((applicant: any) => Number(applicant.ID) === Number(this.id));
            this.motivation = applicant?.motivation
            
            if (applicant) {
              //console.log('Found applicant:');
            } else {
              //console.log('Applicant not found');
            }
          }
          
          
          
          if (job.applied.includes(this.userConnect) && job.company === this.userConnect) {
            this.canApprove=!this.canApprove
          }
          if (job.rejected.includes(this.id) && job.company === this.userConnect) {
            this.alreadyReject=!this.alreadyReject
          }
          if (job.approved.includes(this.id) && job.company === this.userConnect) {
            this.alreadyApproved=!this.alreadyApproved
          }
        });
    });
  
    this.HomePageService.getDetailCandidate( this.id).subscribe(data=>{
      this.candidat=data  
      this.loading = false;

      this.urlCv=this.extractFileName( this.candidat.cv)        
      this.nameCv =this.candidat.cv 
      //this.candidat.skills = this.candidat.skills || [];
       this.skills=this.candidat.skills
       
       
     if (this.candidat && this.candidat.ID) {
       this.HomePageService.getSubtopic(this.candidat.ID).subscribe(
         (data: any) => {
           this.candidat.skills = data || [];                     
         },
         (error) => {
           console.error('Error fetching subtopics', error);
         }
       );
     } else {
       console.error('User not logged in');
     }
    })    
    this.HomePageService.profilJob(this.userConnect.id).subscribe((data:any)=>{
      this.profil = data;     
      const candidateIdToCheck =parseInt( this.id );
      const isCandidateIncluded = this.profil.favorites.some((candidate: any) => candidate.ID === candidateIdToCheck);

      if (isCandidateIncluded) {
        this.favourite = true
      } else {
        this.favourite = false
      }      
    })
    
  }
  goBack(): void {
    this.location.back();
  }

  action(action: string) {
    if (action === 'Motivation') {
      this.isLoadingMotivation = true;
    } else if (action === 'About') {
      this.isLoadingAbout = true;
    }
    else if (action === 'Profil') {
      this.isLoadingProfil = true;
    } else if (action === 'Cv') {
      this.isLoadingCv = true;
    } else if (action === 'Education') {
      this.isLoadingEducation = true;
    } else if (action === 'Skills Passport') {
      this.isLoadingPassport = true;
    }else if (action === 'Work & Experience') {
      this.isLoadingWork = true;
    }
    

    try {
      this.HomePageService.sendNotificationAction(
        this.candidat.ID,
        this.notificationCand(this.candidat.ID, this.userConnect.id, action, this.job)
      ).subscribe({
        next: (response) => this.handleSuccess(response, action),
        error: (err) => this.handleError(err, action),
        complete: () => this.resetLoadingState(action)
      });
    } catch (exception) {
      this.resetLoadingState(action);  // Reset loading state for this action
      this.handleUnexpectedError(exception);
    }
  }

handleSuccess(response: any, action: string) {
  let typeR = "error";
  if (response) {
    typeR = "success";
    this.message = response;
  }

  ToastNotification.open({
    type: typeR,
    message: this.message
  });

  this.resetLoadingState(action);  // Reset loading after success
}

handleError(err: any, action: string) {
  console.error('Error sending notification:', err);

  this.message = 'An error occurred while sending the request. Please try again.';
  ToastNotification.open({
    type: 'error',
    message: this.message
  });

  this.resetLoadingState(action);  // Reset loading after error
}

resetLoadingState(action: string) {
  if (action === 'Motivation') {
    this.isLoadingMotivation = false;
  } else if (action === 'About') {
    this.isLoadingAbout = false;
  }  else if (action === 'Profil') {
    this.isLoadingProfil = false;
  } else if (action === 'Cv') {
    this.isLoadingCv = false;
  } else if (action === 'Education') {
    this.isLoadingEducation = false;
  } else if (action === 'Skills Passport') {
    this.isLoadingPassport = false;
  }else if (action === 'Work & Experience') {
    this.isLoadingWork = false;
  }
}

  handleUnexpectedError(exception: any) {
    // Handle unexpected exceptions separately, if necessary
    alert('An unexpected error occurred. Please contact support.');
  }
  
 notificationCand(idUser:number,idUser2:number,action:any,job:any):any{
  const notif={
    userApplyId:idUser,
    title: `${job.company.title}` + " needs your action !",
    content: `
    I hope this message finds you well.<br> 
    Thank you for your recent application for ${job.title} with ${job.company.title} . We appreciate your interest in joining our team.<br>

    Upon reviewing your application, we noticed that some required information is missing. To proceed with your application, could you please provide the following details:
    <strong>${action}</strong>.<br>

    Kindly submit the above information at your earliest convenience.<br>
    If you have any questions or need further clarification, please don't hesitate to reach out.<br>
    We look forward to receiving the complete details and continuing with your application process.<br>

    Thank you for your attention to this matter.<br>
    `,
    trigger:action + " is missing ! " ,
    receiver_id:idUser2,
  }
  return notif; 
}
  cleanText(text: string): string {
    return text ? text.replace(/<[^>]+>/g, '') : '';
  }
  extractFileName(url: string): string {
    if (!url) {
      return ''; 
    }
    return url.substring(url.lastIndexOf('/') + 1);
  }
  rejectCandidatByCompany(){
    this.isLoading=true
    this.notification ={
      userApplyId:this.userConnect.id,
      title:"Response to your job application",
      content:"Your job application has been rejected",
      receiver_id:this.candidat.ID
    }
    console.log(this.candidat,this.jobId);
    
    if (this.candidat && this.jobId ) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.rejectCandidatByCompany(this.candidat.ID, this.job.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              console.log(response);
              
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application rejected with success !."
              //  return
                
              this.HomePageService.sendNotification(this.candidat.ID,this.rejNotificationCand(this.candidat.ID,this.userConnect.id,this.job)).subscribe();
              this.HomePageService.sendNotification(this.userConnect.id,this.rejNotificationComp(this.userConnect.id,this.job,this.candidat)).subscribe();
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
            console.log(error);
                             
            ToastNotification.open({
              type: 'error',
              message: error.error.errors
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

  approveCandidatByCompany(){
    this.isLoading=true
    if (this.candidat && this.jobId ) {      
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.approveCandidatByCompany(this.candidat.ID, this.job.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application approved with success !."
                this.HomePageService.sendNotification(this.candidat.ID,this.accNotificationCand(this.candidat.ID,this.userConnect.id,this.job)).subscribe();
                this.HomePageService.sendNotification(this.userConnect.id,this.accNotificationComp(this.userConnect.id,this.job,this.candidat)).subscribe();
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
            console.log(error);
                     
            ToastNotification.open({
              type: 'error',
              message: error.errors
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


accNotificationCand(idUser:number,idUser2:number,job:any):any{
  const notif={
    userApplyId:idUser2,
    title:"Result of application for "+job.title,
    content: `
    I hope this email finds you well. I am pleased to inform you that your initial application for the ${job.title} position has been successful, and we would like to invite you for the next stage of our hiring process.<br>
    We were highly impressed by your qualifications and experience, and we believe you could be a great fit for our team. To further evaluate your candidacy, we would like to schedule another interview with you.<br>
    The interview will provide us with the opportunity to delve deeper into your skills, experiences, and how they align with the requirements of the role. Additionally, it will give you the chance to learn more about ${job.company.title} and ask any questions you may have.<br>
    Please let us know your availability for the interview by replying to this email. We will do our best to accommodate your schedule.<br>
    We look forward to meeting with you again and discussing your potential contributions to our team.<br>
    `,
    trigger:"Response of job application",
    receiver_id:idUser,
  }
  return notif; 
}
accNotificationComp(idUser:number,job:any,user:any):any{
  const notif={
    userApplyId:idUser,
    title:"Application approved for "+job.title,
    content: `
    I hope this message finds you well.<br>
    I am writing to confirm that your recent action to accept the candidacy of ${user.first_name} ${user.last_name}' for the ${job.title} position has been successfully processed.<br>
    Thank you for your prompt attention to this matter. We will proceed accordingly with the next steps in the hiring process.<br>
    Once again, thank you for your decisive action in this matter.<br>
    `,
    trigger:"Job Approvement",
    receiver_id:null,
  }
  return notif; 
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
