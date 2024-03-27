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
  candidat:any
  candidate=false;
  compagny=false;
  identifiant:number | null = 0;
  showLoginBlock: boolean = true;
  showFirstStep: boolean = true;
  showSecondStep: boolean = true;
  username: string = '';
  password: string = '';
  first_name:string='';
  last_name:string='';
  id!:number;
  avatar:any;
  jobs:any;
  applyJobs=false;
  job:any
  selectedJobId!: any;
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
  public href: string = "";


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
  
    this.href = this.router.url;
    // Récupération du token depuis le local storage
    this.identifiant = +this.route.snapshot.params['id'];
    const storedToken = this.usagerService.getToken();


    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);


      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      this.userObject=true
      this.first_name = this.userConnect.first_name;
      this.last_name = this.userConnect.last_name;
      this.avatar = this.userConnect.avatar_urls && this.userConnect.avatar_urls[96]; // Stockage de l'URL de l'avatar
      this.id=this.userConnect.id

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
    })
    this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
      this.category = data
     // console.log(this.category);

    })
    this.homeService.getDetailCandidate( this.id).subscribe(data=>{
      this.candidat = data
     // console.log(this.category);
      
    })
  }

  switchToApplyBlock() {
    this.showLoginBlock = false;
    const user = {
      username: this.username,
      password: this.password
    }
    // Créez un objet userObject pour stocker le first_name et le last_name

    this.usagerService.connection(user).subscribe(
      (data:any) => {
        const token = btoa(JSON.stringify(data));
        this.usagerService.storeToken(token);
        const storedToken = this.usagerService.getToken();
        if (storedToken ) {
          const decodedToken = atob(storedToken);
          const userConnect = JSON.parse(decodedToken); 
        //  console.log(userObject);
          
      

         // console.log(this.first_name, this.last_name);
          
          if(userConnect.acf.is_liggeey == "candidate"){
            this.candidate=true
            this.userObject=true
            this.showFirstStep=true
            //console.log(this.showFirstStep);
          } else if(userConnect.acf.is_liggeey == "chief"){
            this.compagny=true
            this.userObject=false;
            this.isModalVisible=false
            this.showFirstStep=false

            ToastNotification.open({
              type: 'success',
              message: "This is apply job for Candidat"
            });
          }
          console.log(userConnect);
          
          this.first_name = userConnect.first_name;
          this.last_name = userConnect.last_name;
          this.avatar = userConnect.avatar_urls && userConnect.avatar_urls[96]; // Stockage de l'URL de l'avatar
          this.id=userConnect.id
          console.log(userConnect);

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

    if (this.id && this.selectedJobId) {
      if(this.candidate == true){
        this.homeService.getDetailJob(this.selectedJobId).subscribe((data:any) => {
          this.job = data;
         // return
          if (this.canAppl(this.job)) {
            this.userObject=true
            this.showFirstStep=true
                 // Utilisez le service pour postuler à l'emploi
            this.homeService.applyJob(this.id, this.selectedJobId)
            .subscribe(
              // Succès de la requête
              (response) => {
            this.cdr.detectChanges(); // Force la détection des changements

            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Your job application has been successfully submitted."
              // this.showFirstStep =  !this.showFirstStep;
              // this.showSecondStep = !this.showSecondStep;
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.showFirstStep =  !this.showFirstStep;
            this.showSecondStep = !this.showSecondStep;              
            // if (typeR == "success") {
            //   this.showFirstStep =  !this.showFirstStep;
            //   this.showSecondStep = !this.showSecondStep;
            // //  this.userConnect=true
            //   //this.router.navigate(['/applies-candidat',this.userConnect.id]);
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
          }else{
            this.userObject=false
            this.showFirstStep=false

        ToastNotification.open({
          type: 'success',
          message: "Already Apply four this job"
        });
        return
         // this.router.navigate(['']);
          }
        });
        
   
      } else if(this.compagny == true){
        this.userConnect=false;
        this.isModalVisible=false
        this.showFirstStep=false

        ToastNotification.open({
          type: 'success',
          message: "This is apply job for Candidat"
        });
          this.router.navigate(['/dashbord-compagny',this.userConnect.id]);
        }
      
  
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message

      });
    }
  }

  canAppl(item: any): boolean {
    if (!this.id || !this.id) {
      return true; // Si l'utilisateur n'est pas connecté, autoriser l'application
  }

    return !item.applied.some((appliedItem: any) => appliedItem.ID === this.id);
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
    
  // switchToApplyBlock() {
  //   this.showLoginBlock = false;
  //   const user = {
  //     username: this.username,
  //     password: this.password
  //   }
  //   const userObject={
  //     last_name:this.last_name,
  //     first_name:this.first_name
  //   }
  //   this.usagerService.connection(user).subscribe(
  //     (data:any) => {

  //       //const  token  = btoa(user.username + ':' + user.password);
  //       const token = btoa(JSON.stringify(data));

  //       // Stockage dans le local storage
  //       this.usagerService.storeToken(token);

  //         // Récupération du token depuis le local storage
  //         const storedToken = this.usagerService.getToken();
  //       if (storedToken ) {
  //                   // Décodage de la base64
  //         const decodedToken = atob(storedToken);

  //         // Parse du JSON pour obtenir l'objet original
  //         const userConnect = JSON.parse(decodedToken); 
  //         userObject.first_name=userConnect.first_name;
  //         userObject.last_name=userConnect.last_name
  //         console.log(userObject.first_name, userObject.last_name);
          
  //         if(userConnect.acf.is_liggeey == "candidate"){
  //           this.userConnect=true
  //           this.showFirstStep=true
  //           console.log(this.showFirstStep);
            
  //         } else if(userConnect.acf.is_liggeey == "chief"){
  //           this.userConnect=false;
  //           this.isModalVisible=false

  //           ToastNotification.open({
  //             type: 'success',
  //             message: "This is apply job for Candidat"
  //           });
  //         }
  //       }else {
  //         console.log('noconnect');
  //         ToastNotification.open({
  //           type: 'error',
  //           message: `Les utilisateurs ne peuvent pas se connecter sur la plateforme`
  //         });
  //         return;
  //       }
  //     },
  //     error =>{
  //       ToastNotification.open({
  //         type: 'error',
  //         message: "Identifiant ou mot de passe incorrects: assurez vous de les avoir bien saisis "
  //       });

  //     });
  // }

}
