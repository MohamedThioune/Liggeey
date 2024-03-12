import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usager } from 'src/app/interfaces/usager';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile!: boolean;
  userConnect:any;
  categories:any
  category:any
  candidate=false;
  compagny=false;
  identifiant:number | null = 0;
  loading: boolean = true;



  showLoginBlock: boolean = true;
  showFirstStep: boolean = true;
  showSecondStep: boolean = false;

  switchToApplyBlock() {
    this.showLoginBlock = false;
  }
  goToSecondStep() {
    this.showFirstStep = false;
    this.showSecondStep = true;
  }

  goToFinalStep() {
    this.showSecondStep = false;
  }
  job:any;
  applyJobs=false;
  message: any = {
    type: '',
    message: ''
  };
  selectedFileName: string | undefined;


  constructor(private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ) {
    this.isMobile = window.innerWidth < 768;

  }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);
      this.loading=false
console.log(this.loading);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
      }
    }
      this.homeService.getInfoHomepage().subscribe((data:any)=>{
        this.categories=data.categories
        console.log( this.categories);
    })
    this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
      this.category = data
    })
    // this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
    //   this.category = data
    // })

  }
  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.isMobile = window.innerWidth < 768;
  }
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFileName = files[0].name;
    }
  }

  isWebScreen(): boolean {
    return !this.isMobile;
  }

  isMobileScreen(): boolean {
    return this.isMobile;
  }

  deconnexion(){
    this.usagerService.deconnexion()
  }
}
