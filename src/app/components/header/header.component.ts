import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isMobile!: boolean;
  userConnect:any;
  userObject:any
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

  selectedJobId!: string;
   subscription!: Subscription;

  dropdownOpen: boolean = false;
  dropdownUser: boolean = false;
  selectedOption: string = '';


  message: any = {
    type: '',
    message: ''
  };
  selectedFileName: string | undefined;
  isModalVisible: boolean = true; // Set to true initially to show the modal


  constructor(private location: Location,private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ,private router: Router, private elementRef: ElementRef,private cdr: ChangeDetectorRef) {
    this.isMobile = window.innerWidth < 768;
    this.dropdownOpen = false;
    this.dropdownUser = false;
  }
  

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleDropdownUser(): void {
    this.dropdownUser = !this.dropdownUser;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.dropdownUser = false;
  }

  

  ngOnInit(): void {
  

    // Récupération du token depuis le local storage
    this.identifiant = +this.route.snapshot.params['id'];
    const storedToken = this.usagerService.getToken();
    

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
    this.subscription = this.homeService.selectedJobId$.subscribe(id => {
      this.selectedJobId = id;      
    });
      this.homeService.getInfoHomepage().subscribe((data:any)=>{
        this.categories=data.categories
     //  console.log( this.categories);
    })
    this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
      this.category = data
     // console.log(this.category);
      
    })
    // this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
    //   this.category = data
    // })

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
          const userConnect = JSON.parse(decodedToken);       
          if(userConnect.acf.is_liggeey == "candidate"){
            this.userConnect=true
            this.showFirstStep=true
            console.log(this.showFirstStep);
            
          } else if(userConnect.acf.is_liggeey == "chief"){
            this.userConnect=false;
            this.isModalVisible=false

            ToastNotification.open({
              type: 'success',
              message: "This is apply job for Candidat"
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

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  goBack(): void {
    this.location.back();
  }



  goToSecondStep() {
    this.showFirstStep = false;
    this.showSecondStep = true;
  }

  goToFinalStep() {
    
    if (this.userConnect && this.selectedJobId) {
      console.log(this.userConnect,this.selectedJobId)
      // Utilisez le service pour postuler à l'emploi
      this.homeService.applyJob(this.userConnect.id, this.selectedJobId)
        .subscribe(
          // Succès de la requête
          (response) => {
            this.applyJobs=true ;
            console.log(this.applyJobs);
            
            this.cdr.detectChanges(); // Force la détection des changements

            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Your job application has been successfully submitted."
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            if (typeR == "success") {
              this.showFirstStep =  !this.showFirstStep;
              this.showSecondStep = !this.showSecondStep;
              //this.router.navigate(['/applies-candidat',this.userConnect.id]);
            }
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
      alert('no ok')
      ToastNotification.open({
        type: 'error',
        message: this.message
        
      });
      console.log(this.message);
     
    }
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
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownUser = false;
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
