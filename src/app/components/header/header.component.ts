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
  work_as:any
  work:any
  jobs:any;
  applyJobs=false;
  job:any
  selectedJobId!: any;
  selectedSlug!:any
   subscription!: Subscription;

  dropdownOpen: boolean = false;
  dropdownUser: boolean = false;
  dropdownMobile: boolean = false;
  selectedOption: string = '';

  message: any = {
    type: '',
    message: ''
  };
  selectedFileName: string | undefined;
  isModalVisible: boolean = true; // Set to true initially to show the modal
  public href: string = "";
  notification:any;
  isLoading = false;
  title:any;
  slug:any
  constructor(private location: Location,private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ,private router: Router, private elementRef: ElementRef,private cdr: ChangeDetectorRef) {
    this.isMobile = window.innerWidth < 768;
    this.dropdownOpen = false;
    this.dropdownUser = false;
    this.dropdownMobile = false;
  }

  notificationApplyJobs(idUser:number,job:any):any{
    const notif={
      userApplyId:idUser,
      title:"Application for "+job.title,
      content: `
      Thank you for applying for the position of ${job.title} at ${job.company.title}.We have received your application, and we appreciate your interest.<br>
      If your application matches our needs, we will contact you to arrange an interview or a phone conversation to discuss your qualifications and career aspirations in more detail.<br>
      In the meantime, feel free to visit our website to learn more about our company and career opportunities.<br>
      Once again, thank you for your interest in ${job.company.title}.<br>
      `,
      trigger:"Confirmation of job application",
      receiver_id:null,
    }
    return notif;  
  }
  notificationChiefApplyJobs(idUser:number,idUser2:number,job:any,user:any):any{
    const notif={
      userApplyId:idUser,
      title:"Application for "+job.title,
      content: `
      This is to inform you that a new job application has been received for the position of ${job.title}. The applicant, ${user.display_name}, has expressed interest in joining our team and has submitted their application through our online portal.<br>
      Our team will be reviewing ${user.display_name}'s application thoroughly to assess their qualifications and suitability for the role. If their profile aligns with our requirements, further evaluation and consideration will be conducted.<br>
      Updates regarding this application will be provided as necessary.<br>
      Thank you for your attention to this matter.<br>
      `,
      trigger:"New Job Application Received",
      receiver_id:idUser2,
    }
    return notif;  
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleDropdownUser(): void {
    this.dropdownUser = !this.dropdownUser;
  }
  toggleDropdownMobile(): void {
    this.dropdownMobile = !this.dropdownMobile;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.dropdownUser = false;
    this.dropdownMobile = false;
  }



  ngOnInit(): void {

    this.href = window.location.href;
   // console.log(this.href);
    
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
    this.subscription = this.homeService.selectedSlug$.subscribe(slugJob => {
      this.selectedSlug = slugJob;
    });
    
      this.homeService.getInfoHomepage().subscribe((data:any)=>{
        this.categories=data.categories
    })
    this.homeService.getDetailCategory( this.slug).subscribe(data=>{
      this.category = data
     // console.log(this.category);

    })
    const cachedCandidat = localStorage.getItem('cachedCandidat');
    if (cachedCandidat) {
        let cachedData;
        try {
            cachedData = JSON.parse(cachedCandidat);
        } catch (error) {
            console.error('Error parsing cached data:', error);
        }
    if (cachedData && typeof cachedData === 'object' ) {
            this.candidat = { work_as: cachedData.work_as,first_name: cachedData.first_name,last_name:cachedData.last_name,avatar:cachedData.image};
            this.first_name=this.candidat.first_name,
            this.last_name=this.candidat.last_name,
            this.avatar=this.candidat.avatar,
            this.work_as=this.candidat.work_as
        } else {
            console.error('Cached data does not contain work_as property or is not in the expected format.');
        }
    } 
    else {
        // Récupérer les données depuis le service si elles ne sont pas en cache
        
  
        this.homeService.getDetailCandidate( this.id).subscribe(data => {
                    if (data ) {
                        
          
        this.candidat = { work_as: data.work_as,first_name:data.first_name };
                        localStorage.setItem('cachedCandidat', JSON.stringify(data));
                        this.first_name=this.candidat.first_name;
                        //console.log(this.first_name,this.last_name);

                    } else {
                        console.error('Received data does not contain work_as property or is not in the expected format.');
                    }
                });
    }
 
   

  }
 
  updateCachedData(){
    const cachedCandidat = localStorage.getItem('cachedCandidat');
    if (cachedCandidat) {
        let cachedData;
        try {
            cachedData = JSON.parse(cachedCandidat);
        } catch (error) {
            console.error('Error parsing cached data:', error);
        }

        if (cachedData) {
            this.candidat = cachedData;
        } else {
            console.error('Cached data is not in the expected format.');
        }

    }
    this.homeService.getDetailCandidate(this.userConnect.id).subscribe(data => {
      if (data) {
          this.candidat = data;
          localStorage.setItem('cachedCandidat', JSON.stringify(data));
      
      } 
      else {  
            console.error('Received data is not in the expected format.');
      }
    });
        
  }
  navigateWithoutReload(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du navigateur
    const href = (event.target as HTMLAnchorElement).getAttribute('href');
    if (href) {
        this.router.navigateByUrl(href); // Utilisez le routeur Angular pour naviguer sans rechargement de page
    }
}
navigateToDetailCategory() {
  this.href = window.location.href;
  this.router.navigateByUrl(this.href);
}

send_id(id: any) {
  this.router.navigate(['detail-category',id])
    .then(() => {
      window.location.reload();
    });
}
  switchToApplyBlock() {
    this.isLoading = true;

    this.showLoginBlock = false;
    const user = {
      username: this.username,
      password: this.password
    }
    // Créez un objet userObject pour stocker le first_name et le last_name

    this.usagerService.connection(user).subscribe(
      (data:any) => {
        const token = btoa(unescape(encodeURIComponent((JSON.stringify(data)))));
        this.usagerService.storeToken(token);
        const storedToken = this.usagerService.getToken();
        if (storedToken ) {
          const decodedToken = atob(storedToken);
          const userConnect = JSON.parse(decodedToken);
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
              message: "You must be a candidate to Apply"
            });
            localStorage.removeItem('access_token');
          }
          
          this.isLoading=false
          this.first_name = userConnect.first_name;
          this.last_name = userConnect.last_name;
          this.avatar = userConnect.avatar_urls && userConnect.avatar_urls[96]; // Stockage de l'URL de l'avatar
          this.id=userConnect.id
          this.homeService.getDetailJob(this.selectedSlug).subscribe((data:any) => {
            this.job = data;
            this.title=this.job.title
  
          })
                  // Récupérer les détails du candidat et stocker les informations nécessaires dans le cache
        this.homeService.getDetailCandidate(this.id).subscribe(data => {
          if (data && 'work_as' in data) {
            const cachedData = {
              work_as: data.work_as,
              first_name:data.first_name,
              last_name:data.last_name,
              avatar:data.image
              // Vous pouvez ajouter d'autres informations nécessaires ici
            };
            localStorage.setItem('cachedCandidat', JSON.stringify(data));

            this.work= localStorage.getItem('cachedCandidat');
            const parsedData = JSON.parse(this.work);
            this.work_as = parsedData.work_as;

          }
        });        
        }else {
          console.log('noconnect');
          ToastNotification.open({
            type: 'error',
            message: `Users cannot log in to the platform`
          });
          return;
        }
      },
      error =>{
        ToastNotification.open({
          type: 'error',
          message: "Incorrect username or password: make sure you have entered them correctly"
        });
        this.isLoading=false

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
    this.isLoading=true
    this.notification ={
      userApplyId:3,
      title:"Apply Job Successfully",
      content:"Apply Job Successfully",
      receiver_id:this.id
    }
    
    if (this.id && this.selectedJobId && this.selectedSlug) {
      if(this.candidate == true){
        this.homeService.getDetailJob(this.selectedSlug).subscribe((data:any) => {
          this.job = data;
          this.title=this.job.title
          
         // return
          if (this.canAppl(this.job)) {
            // this.userObject=true
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
              this.homeService.sendNotification(this.id,this.notificationApplyJobs(this.id,this.job)).subscribe();
              this.homeService.sendNotification(response.chief.ID,this.notificationChiefApplyJobs(response.chief.ID,this.id,this.job,response.candidate.data)).subscribe();
              // this.showFirstStep =  !this.showFirstStep;
              // this.showSecondStep = !this.showSecondStep;
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading=false
            this.showFirstStep =  !this.showFirstStep;
            this.showSecondStep = !this.showSecondStep;
            //this.showFirstStep=true

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
          message: "Already Applied for this job"
        });
        this.isLoading=false
        this.userObject=true
        
        //return
         //this.router.navigate(['']);
          }
        });


      } else if(this.compagny == true){
        this.userConnect=true;
        this.isModalVisible=false
        this.showFirstStep=true

        ToastNotification.open({
          type: 'success',
          message: "You must be a candidate to Apply"
        });
        this.isLoading=false
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
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownMobile = false;
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
    localStorage.removeItem('cachedCandidat');
  }



}
