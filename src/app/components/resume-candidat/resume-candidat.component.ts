import { Component, OnInit,HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-resume-candidat',
  templateUrl: './resume-candidat.component.html',
  styleUrls: ['./resume-candidat.component.css']
})
export class ResumeCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  myForm!:FormGroup
  isMobile!: boolean;
  identifiant:number | null = 0;
  candidat:any
  candidate=false;
  compagny=false;
  userConnect:any;

  constructor(private fb: FormBuilder,private usagerService: UsagerService,private route : ActivatedRoute ,private HomePageService: HomePageService) {
    this.isMobile = window.innerWidth < 768;

   }
   @HostListener('window:resize', ['$event'])
   onResize(event:Event) {
     this.isMobile = window.innerWidth < 768;
   }

   isWebScreen(): boolean {
     return !this.isMobile;
   }

   isMobileScreen(): boolean {
     return this.isMobile;
   }

  ngOnInit(): void {
    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      console.log(this.userConnect);

      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
      }
    }
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data
      console.log( this.candidat);

    })
    this.myForm = this.fb.group({
      file: ['', [Validators.required, Validators.email]],
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

}
