import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';

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
  applicant:any
  searchTitle:string="";
  searchLocation:string="";
  message: any = {
    type: '',
    message: ''
  };
  identifiant:number | null = 0;
  isLoading: { [key: string]: boolean } = {}; // Key-value to track loading per candidate ID
  constructor(private route : ActivatedRoute,private usagerService:UsagerService,private homeService:HomePageService, private router: Router) { }

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
     this.loadCandidates();
  }
  loadCandidates() {
    this.homeService.getCandidatCompagny(this.userConnect.id).subscribe((data: any) => {
      this.applicants = data;
      this.loading = false;
    });
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  send_id(id: any) {
    this.homeService.setCandidatId(id);
    localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
    this.router.navigate(['/detail-candidat'])
      .then(() => {
        window.location.reload();
      });
  }
  
  // Function to delete candidate and refresh the list
  trashFavoritesCandidat(idCandidate: string) {
    if (confirm('Do you want to remove this candidate from your favorites?')) {
      this.isLoading[idCandidate] = true; // Start loader for this candidate
      if (this.userConnect && this.userConnect.id && idCandidate) {
        this.homeService.trashFavoritesCandidat(this.userConnect.id, idCandidate)
          .subscribe(
            (response) => {
              ToastNotification.open({
                type: response ? "success" : "error",
                message: response
              });
  
              // Refresh the candidate list after deletion
              this.loadCandidates();
              this.isLoading[idCandidate] = false; // Stop loader
            },
            (error) => {
              ToastNotification.open({
                type: 'error',
                message: error.error.message
              });
              this.isLoading[idCandidate] = false; // Stop loader
            }
          );
      }
    } else {
      ToastNotification.open({
        type: 'error',
        message: "Deletion canceled"
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
