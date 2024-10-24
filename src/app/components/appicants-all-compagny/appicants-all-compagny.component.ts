import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { switchMap } from 'rxjs/operators';
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
  isBookmarked: boolean = false;
  favourite: boolean = false
  profil:any
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

  //   this.homeService.profilJob(this.userConnect.id).pipe(
  //     switchMap((profilData: any) => {
  //       this.profil = profilData;
    
  //       // Fetch job details after getting the profile
  //       return this.homeService.getDetailJob(this.slug);
  //     })
  //   ).subscribe((jobDetailData: any) => {
  //     this.applicant = jobDetailData;   
       
  //     // Iterate over `this.applicant.applied` and check if any are in `this.profil.favorites`
  //     const favoritesIds = this.profil.favorites.map((fav: any) => fav.ID);
      
  //     const matchingApplicants = this.applicant.applied.filter((applicant: any) => 
  //       favoritesIds.includes(applicant.ID)
  //     );
  //     console.log(matchingApplicants)

  //     if (matchingApplicants.length > 0) {
  //       this.favourite = true;
  //       console.log('Matching applicants:', matchingApplicants);
  //     } else {
  //       this.favourite = false;
  //     }
    
  //     this.loading = false;
  //   }, (error) => {
  //     console.error('Error:', error);
  //     this.loading = false;
  //   });
    
  // }
  // this.homeService.profilJob(this.userConnect.id).pipe(
  //   switchMap((profilData: any) => {
  //     this.profil = profilData;
      
  //     // Fetch job details after getting the profile
  //     return this.homeService.getDetailJob(this.slug);
  //   })
  // ).subscribe((jobDetailData: any) => {
  //   this.applicant = jobDetailData;   
    
  //   // Get the list of favorite applicant IDs
  //   const favoritesIds = this.profil.favorites.map((fav: any) => fav.ID);
    
  //   // Iterate over `this.applicant.applied` and check if they are in the favorites
  //   this.applicant.applied = this.applicant.applied.map((applicant: any) => {
      
  //     // Add a 'favourite' property to each applicant based on the ID check
  //     return {
  //       ...applicant,
  //       favourite: favoritesIds.includes(applicant.ID)
  //     };
  //   });
  
  //   console.log('Applicants with favourite flag:', this.applicant.applied);
  
  //   this.loading = false;
  // }, (error) => {
  //   console.error('Error:', error.error.errors);
  //   this.loading = false;
  // });
  
  // }
  this.homeService.profilJob(this.userConnect.id).pipe(
    switchMap((profilData: any) => {
      this.profil = profilData;
  
      // Fetch job details after getting the profile
      return this.homeService.getDetailJob(this.slug);
    })
  ).subscribe((jobDetailData: any) => {
    this.applicant = jobDetailData;   
    
    // Get the list of favorite applicant IDs
    const favoritesIds = this.profil.favorites.map((fav: any) => fav.ID);
  
    // Iterate over `applicant.applied` and check if they are in the favorites
    this.applicant.applied = this.applicant.applied.map((applicant: any) => {
      return {
        ...applicant,
        favourite: favoritesIds.includes(applicant.ID)
      };
    });
  
    // Iterate over `applicant.rejected` and check if they are in the favorites
    this.applicant.rejected = this.applicant.rejected.map((applicant: any) => {
      return {
        ...applicant,
        favourite: favoritesIds.includes(applicant.ID)
      };
    });
  
    // Iterate over `applicant.approved` and check if they are in the favorites
    this.applicant.approved = this.applicant.approved.map((applicant: any) => {
      return {
        ...applicant,
        favourite: favoritesIds.includes(applicant.ID)
      };
    });
  
    this.loading = false;
  }, (error) => {
    console.error('Error:', error.error.errors);
    this.loading = false;
  });
  }  
  send_id(id: any, jobId: string) {
    this.homeService.setCandidatId(id);
    localStorage.setItem('candidatId', id); // Store the ID in localStorage
    this.router.navigate(['/candidat-profil'], { queryParams: { jobId: jobId } })
      .then(() => {
        window.location.reload();
      });
  }
  // favoritesCandidat(candidat:any) {
  //   this.isLoading=true
  //   if (candidat.favourite) {
  //     alert('This candidate is already in your favorites!');
  //     this.isLoading=false
  //     return; // Stop execution if the job is already a favorite
  //   }
    
  //   // Assurez-vous que this.userConnect et this.job sont définis
  //   if (this.userConnect && candidat) {
  //     // Utilisez le service pour ajouter l'emploi aux favoris
  //     this.homeService.favoritesCandidat(this.userConnect.id,candidat.ID)
  //       .subscribe(
  //         // Succès de la requête
  //           (response) => {
  //             this.applyJobs=true ;
  //             let typeR = "error"
  //             if (<any>response ) {
  //               console.log(response);
                
  //               typeR = "success";
  //               this.message= response;
  //             }
  //             ToastNotification.open({
  //               type: typeR,
  //               message: this.message
  //             })
  //             ;
  //             this.isLoading=false

  //             // this.router.navigate(['/applicant-compagny'])
  //             // .then(() => {
  //             //   window.location.reload();
  //             // });
  //             // if (typeR == "success") {
  //             //   this.router.navigate(['/applies-candidat',this.userConnect.id]);
  //             // }
  //           },
  //         // Gestion des erreurs
  //         (error) => {
  //           ToastNotification.open({
  //             type: 'error',
  //             message: error.error.message
  //           });
  //           this.isLoading=false
  //         }
          
  //       );
  //   } else {
  //     ToastNotification.open({
  //       type: 'error',
  //       message: "please log in first"
  //     });
  //     this.isLoading=false

  //     this.router.navigate(['/login']);

  //   }
  // }
  favoritesCandidat(candidat: any) {
    this.isLoading = true;
  
    // If the candidate is already a favorite, show an alert and stop execution
    if (candidat.favourite) {
      alert('This candidate is already in your favorites!');
      this.isLoading = false;
      return;
    }
  
    // Ensure user and candidat are defined
    if (this.userConnect && candidat) {
      this.homeService.favoritesCandidat(this.userConnect.id, candidat.ID)
        .subscribe(
          (response) => {
            this.applyJobs = true;
            let typeR = "error";
            
            if (response) {
              console.log(response);
              typeR = "success";
              this.message = response;
  
              // Update the candidate's favorite status locally
              candidat.favourite = true;  // This will change the icon color
            }
  
            // Show a toast notification
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
  
            this.isLoading = false;
          },
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.errors
            });
            this.isLoading = false;
          }
        );
    } else {
      ToastNotification.open({
        type: 'error',
        message: "please log in first"
      });
      this.isLoading = false;
  
      this.router.navigate(['/login']);
    }
  }
  
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
    console.log(this.searchTitle);
    
    if (this.searchTitle.trim() !== '') {
      return this.applicant.applied.filter((applicant: any) => {
        const titleMatch = applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return this.applicant.applied; // Retournez le tableau complet d'applicants
    }
  }
  getFilteredApplicants(listType: 'applied' | 'approved' | 'rejected') {
  
    const applicant = this.applicant[listType]; // Dynamically access the correct list
  
    if (this.searchTitle.trim() !== '') {
      return applicant.filter((applicant: any) => {
        const titleMatch = applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
    } else {
      return applicant; // Return the full list if no searchTitle is provided
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
    console.log(candidat,this.applicant.ID);
    
    if (candidat && this.applicant.ID ) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.homeService.rejectCandidatByCompany(candidat.ID, this.applicant.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "User application rejected with success !."
              //  return
                
              this.homeService.sendNotification(candidat.ID,this.rejNotificationCand(candidat.ID,this.userConnect.id,this.applicant.ID)).subscribe();
              this.homeService.sendNotification(this.userConnect.id,this.rejNotificationComp(this.userConnect.id,this.applicant,candidat)).subscribe();
              }          
              ToastNotification.open({
                type: typeR,
                message: this.message

              });
              
              this.isLoading=false
              this.router.navigate(['/applicant-compagny',this.applicant.ID])
              .then(() => {
                window.location.reload();
              });
              if (typeR == "success") {
                this.router.navigate(['/applicant-compagny',this.applicant.ID]);
                
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
