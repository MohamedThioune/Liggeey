import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-compagny-applicant',
  templateUrl: './compagny-applicant.component.html',
  styleUrls: ['./compagny-applicant.component.css']
})
export class CompagnyApplicantComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  applicant:any;
  loading:boolean=true;
  searchTitle:String="";
  identifiant:number | null = 0;
  userId: string;
  message: any = {
    type: '',
    message: ''
  };
  applyJobs=false
  isBookmarked: boolean = false;
  isLoad: { [key: string]: boolean } = {}; // Key-value to track loading per candidate ID
  profil:any
  constructor(private homeService:HomePageService,private route : ActivatedRoute,private usagerService: UsagerService, private router: Router) {

      this.userId = this.usagerService.getUserId();
    
   }

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
   this.homeService.getApplicantUser(this.userConnect.id).subscribe((data:any)=>{
     this.applicant = data            
     this.loading=false;          
    })    
    this.homeService.profilJob(this.userConnect.id).pipe(
      switchMap((profilData: any) => {
        this.profil = profilData;
    
        // Fetch job details after getting the profile
        return this.homeService.getApplicantUser(this.userConnect.id);
      })
    ).subscribe((jobDetailData: any) => {
     this.applicant = jobDetailData;   
      console.log(this.applicant);
      
      // Get the list of favorite applicant IDs
      const favoritesIds = this.profil.favorites.map((fav: any) => fav.ID);
    
      // Iterate over `applicant.applied` and check if they are in the favorites
      this.applicant = this.applicant.map((applicant: any) => {        
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
//  send_id(id: any) {
//   this.homeService.setCandidatId(id);
//   localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
//   this.router.navigate(['/detail-candidat'])
//     .then(() => {
//       window.location.reload();
//     });
// }
send_id(id: any) {
  this.router.navigate(['detail-candidat'], { state: { id } });
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
  const applicant=this.applicant  
   if (this.searchTitle.trim() !== '') {
     return applicant.filter((applicant: any) => {
      return applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
     });
   } else {
     return applicant; // Retournez le tableau complet d'applicants
   }
 }
 favoritesCandidate(candidat:any) {
  // Assurez-vous que this.userConnect et this.job sont définis
  if (this.userConnect && candidat) {
    // Utilisez le service pour ajouter l'emploi aux favoris
    this.homeService.favoritesCandidat(this.userConnect.id, candidat.ID)
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
            this.router.navigate(['/compagny-candidat'])
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
favoritesCandidat(candidat: any) {
  this.isLoad[candidat.ID] = true; // Start loader for this candidate
  // If the candidate is already a favorite, show an alert and stop execution
  if (candidat.favourite) {
    //alert('This candidate is already in your favorites!');
    candidat.favourite = false
    this.isLoad[candidat.ID] = false; // Start loader for this candidate
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
          this.isLoad[candidat.ID] = false; // Start loader for this candidate

        },
        (error) => {
          ToastNotification.open({
            type: 'error',
            message: error.error.errors
          });
          this.isLoad[candidat.ID] = false; // Start loader for this candidate

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
