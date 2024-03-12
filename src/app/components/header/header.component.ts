import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Location } from '@angular/common';

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


  showLoginBlock: boolean = true;
  showFirstStep: boolean = true;
  showSecondStep: boolean = false;
  username: string = '';
  password: string = '';
  job:any;
  applyJobs=false;
  message: any = {
    type: '',
    message: ''
  };
  selectedFileName: string | undefined;
  isModalVisible: boolean = true; // Set to true initially to show the modal


  constructor(private location: Location,private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ,private router: Router) {
    this.isMobile = window.innerWidth < 768;

  }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

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
  goBack(): void {
    this.location.back();
  }
  
  switchToApplyBlock() {
    this.showLoginBlock = false;
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.usagerService.connection(user).subscribe(
      (data:any) => {
        
        //const  token  = btoa(user.username + ':' + user.password);
        const token = btoa(JSON.stringify(data));
      
        // Stockage dans le local storage
        this.usagerService.storeToken(token); 
        
          // Récupération du token depuis le local storage
          const storedToken = this.usagerService.getToken();
        if (storedToken ) {          
                    // Décodage de la base64
          const decodedToken = atob(storedToken);

          // Parse du JSON pour obtenir l'objet original
          const userObject = JSON.parse(decodedToken);
          if(userObject.acf.is_liggeey == "candidate"){      
            this.userConnect=true     
          } else if(userObject.acf.is_liggeey == "chief"){
            this.userConnect=false;  
            this.isModalVisible=false
 
            ToastNotification.open({
              type: 'success',
              message: "Thank you for logging in, your dashboard will be available soon"
            });
          }
        }else {
          console.log('noconnect');
          ToastNotification.open({
            type: 'error',
            message: `Les utilisateurs ne peuvent pas se connecter sur la plateforme`
          });
          return;
        }
      },
      error =>{
        ToastNotification.open({
          type: 'error',
          message: "Identifiant ou mot de passe incorrects: assurez vous de les avoir bien saisis "
        });
       
      });
  }


  goToSecondStep() {
    this.showFirstStep = false;
    this.showSecondStep = true;
  }

  goToFinalStep() {
    this.showSecondStep = false;
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
