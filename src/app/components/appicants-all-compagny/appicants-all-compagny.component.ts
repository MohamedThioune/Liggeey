import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

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
      this.applicant=data      
      this.loading=false;      
      console.log(this.applicant.slug);
      
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
  

}
