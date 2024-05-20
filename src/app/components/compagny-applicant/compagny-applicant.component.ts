import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';

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
     console.log(this.applicant);
     
    })
 }
 send_id(id: any) {
  this.homeService.setCandidatId(id);
  localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
  this.router.navigate(['/detail-candidat'])
    .then(() => {
      window.location.reload();
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
     return this.applicant.filter((applicant: any) => {
       const titleMatch = applicant.first_name.toLowerCase().includes(this.searchTitle.toLowerCase());
       return titleMatch;
     });
   } else {
     return this.applicant; // Retournez le tableau complet d'applicants
   }
 }
 



}
