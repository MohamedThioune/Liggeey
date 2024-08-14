import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router ,NavigationEnd} from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup ,Validators,FormArray} from '@angular/forms';

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
  showThirdStep: boolean = true;
  username: string = '';
  password: string = '';
  first_name:string='';
  last_name:string='';
  id!:any;
  avatar:any;
  work_as:any
  skills:any[]=[]
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
  selectedFileName: string | null = null;
  isModalVisible: boolean = true; // Set to true initially to show the modal
  public href: string = "";
  notification:any;
  isLoading = false;
  title:any;
  slug:any
  notifications:any
  myNotif:any
  safeCvUrl: SafeResourceUrl | null = null;  // Initialisé avec une valeur par défaut
  selectedFile: File | null = null;
  myForm!:FormGroup
  cv:any
  nameCv:any
  isTilted = false;
  selectedSkills: any[] = [];
  selectedSkill: any ;
  form!:FormGroup;
  subtopic: any[] = [];
  skillsTabs:any=[   
    {
      "cat_ID": 590,
      "cat_name": "Afas",
      "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
      "open_position": 0
  },
  {
      "cat_ID": 589,
      "cat_name": "Freshworks",
      "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
      "open_position": 0
  },
  {
      "cat_ID": 633,
      "cat_name": "Google",
      "cat_image": "https://livelearn.nl/wp-content/uploads/2024/04/google.png",
      "open_position": 0
  },
  {
    "cat_ID": 587,
    "cat_name": "Google Workspace",
    "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
    "open_position": 0
},
{
    "cat_ID": 640,
    "cat_name": "HubSpot",
    "cat_image": "https://livelearn.nl/wp-content/uploads/2024/04/hubspot_logo.jpeg",
    "open_position": 0
},
{
    "cat_ID": 593,
    "cat_name": "Microsoft 360",
    "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
    "open_position": 0
},
{
  "cat_ID": 634,
  "cat_name": "Odoo",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
{
  "cat_ID": 588,
  "cat_name": "Salesforce",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
{
  "cat_ID": 641,
  "cat_name": "Exact",
  "cat_image": "https://livelearn.nl/wp-content/uploads/2024/05/Exact.jpeg",
  "open_position": 0
},
// {
//   "cat_ID": 636,
//   "cat_name": "web-programming",
//   "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
//   "open_position": 0
// },
// {
//   "cat_ID": 637,
//   "cat_name": "Webflow",
//   "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
//   "open_position": 0
// },
    
    ]
  constructor(private fb: FormBuilder,private location: Location,private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ,private router: Router, private elementRef: ElementRef,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer,private http: HttpClient) {
    this.isMobile = window.innerWidth < 768;
    this.dropdownOpen = false;
    this.dropdownUser = false;
    this.dropdownMobile = false;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isTilted = false;
      }
    });
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


  onClick() {
    this.router.navigate(['/alert-candidat'])
    this.isTilted = true;
  }
  ngOnInit(): void {

    this.href = window.location.href;    
    // Récupération du token depuis le local storage
    this.identifiant = +this.route.snapshot.params['id'];
    this.initForm()
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
      this.cv=this.userConnect.acf.cv
      
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
      }
    }
    if ( this.id) {
      this.homeService.getSubtopic(this.id).subscribe(
        (data: any) => {
          this.subtopic = data;          
        },
        (error) => {
          console.error('Error fetching subtopics', error);
        }
      );
    } else {
      console.error('User not logged in');
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
    // this.homeService.getSkills().subscribe(data=>{
    //   this.skillsTabs = data
    //   console.log( this.skillsTabs);
      
    // })
    this.homeService.getNotificationCandidat( this.id).subscribe(data=>{
      //this.notifications = data.filter((notification:any) => notification.userApplyId === this.identifiant);
      this.notifications=data;
      this.myNotif=this.notifications.length
      
    })
    const storedCvId = localStorage.getItem('cvId');          
    if (storedCvId) {
      this.downloadPDF(storedCvId);
    }else{
      this.downloadPDF(this.cv);
    }
    this.myForm = this.fb.group({
      file: ['', Validators.required]
    });

    
    const cachedCandidat = localStorage.getItem('cachedCandidat');
    if (cachedCandidat) {
        let cachedData;
        try {
            cachedData = JSON.parse(cachedCandidat);
        } catch (error) {
            console.error('Error parsing cached data:', error);
        }
    if (cachedData && typeof cachedData === 'object' ) {
            this.candidat = { work_as: cachedData.work_as,first_name: cachedData.first_name || cachedData.title,last_name:cachedData.last_name,avatar:cachedData.image || cachedData.logo,skills:cachedData.skills};
            this.first_name=this.candidat.first_name,
            this.last_name=this.candidat.last_name,
            this.avatar=this.candidat.avatar  ,
            this.work_as=this.candidat.work_as,
            this.skills=this.candidat.skills
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
  openApplyModal(skill:any) {
    //console.log(skill)
    this.selectedSkill=skill
    const modalElement = document.getElementById('exampleModalEdu');
    if (modalElement) {
      modalElement.click();
    } else {
      console.error("Modal element not found");
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
redirectToWhatsApp(){
  this.homeService.redirectToWhatsApp()
}
toggleSkill(term_id: any) {
  const skillsArray = this.form.get('skills') as FormArray;

  if (this.selectedSkills.includes(term_id)) {
    this.selectedSkills = this.selectedSkills.filter(skill => skill !== term_id);
    const index = skillsArray.value.indexOf(term_id);
    skillsArray.removeAt(index);
  } else {
    this.selectedSkills.push(term_id);
    skillsArray.push(this.fb.control(term_id));
  }    
}
initForm() {
  this.form = this.fb.group({
    skills: this.fb.array([]),

  });
}
onSubmit() {
  this.isLoading = true;

  // Vérifiez si le formulaire est valide
  if (this.form.valid) {
    // Vérifiez si au moins un des checkboxes est coché      
    if (this.form.value.skills.some((skill:boolean) => !!skill)) {
      const selectedSkills = this.form.value.skills.filter((skill: boolean) => !!skill).join(',');
      // Utilisez le service pour postuler à l'emploi
      this.homeService.addSkill(this.userConnect.id, selectedSkills)
        .subscribe(
          // Succès de la requête
          (response) => {
            let typeR = "error";
            if (<any>response) {
              typeR = "success";
              this.message = "Skills added successfully.";
              this.updateCachedData();
              //this.form.reset();
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading = false;
            // if (typeR == "success") {
            //   this.router.navigate(['/manage-compagny',this.userConnect.id]);
            // }
          },
          // Gestion des erreurs
          (error) => {

            ToastNotification.open({
              type: 'error',
              message: error.error.message
            });
            this.isLoading = false;
          }
        );
    } else {
      // Aucun checkbox n'est coché, affichez un message d'erreur
      ToastNotification.open({
        type: 'error',
        message: "Select at least one skill"
      });
      this.isLoading = false;
    }
  } else {
    
    // Le formulaire n'est pas valide, affichez un message d'erreur
    ToastNotification.open({
      type: 'error',
      message: this.message.message
    });
    this.isLoading = false;
  }
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
          this.cv =userConnect.acf.cv
          this.id=userConnect.id
          if ( this.id) {
            this.homeService.getSubtopic(this.id).subscribe(
              (data: any) => {
                this.subtopic = data;          
              },
              (error) => {
                console.error('Error fetching subtopics', error);
              }
            );
          } else {
            console.error('User not logged in');
          }
          this.homeService.getDetailJob(this.selectedSlug).subscribe((data:any) => {
            this.job = data;
            this.title=this.job.title
  
          })
          this.downloadPDF(this.cv);

                  // Récupérer les détails du candidat et stocker les informations nécessaires dans le cache
        this.homeService.getDetailCandidate(this.id).subscribe(data => {
          if (data && 'work_as' in data) {
            const cachedData = {
              work_as: data.work_as,
              first_name:data.first_name,
              last_name:data.last_name,
              avatar:data.image,
              skills:data.skills,

              // Vous pouvez ajouter d'autres informations nécessaires ici
            };
            localStorage.setItem('cachedCandidat', JSON.stringify(data));

            this.work= localStorage.getItem('cachedCandidat');
            const parsedData = JSON.parse(this.work);
            this.work_as = parsedData.work_as;
            this.skills=parsedData.skills            
          }
        });        
        }else {
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
  downloadPDF(cvId:string) {
    this.homeService.getFileCv(cvId).subscribe(
      (response) => {
        // Utilisez l'URL du PDF à partir de la réponse JSON
        const pdfUrl = response.source_url;
        if (pdfUrl) {
          this.loadPdfFromUrl(pdfUrl);
        } else {
          console.error('Le JSON ne contient pas l\'URL du fichier PDF.');
        }
      },
      (error) => {
      //  console.error('Erreur lors de la récupération des informations du fichier PDF:', error);
      }
    );
  }

  loadPdfFromUrl(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {

        if (blob.type === 'application/pdf') {
          const cvUrl = window.URL.createObjectURL(blob);
          this.nameCv=this.extractFileName( url)          
          this.safeCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cvUrl);
        } else {
          console.error('Le fichier téléchargé n\'est pas un PDF. Type:', blob.type);
        }
      },
      (error) => {
        this.nameCv=this.extractFileName( url)                  
        //console.error('Erreur lors de la récupération du fichier PDF :', error);
      }
    );
  }
  extractFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
  uploadFile() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.homeService.getImageUser(this.selectedFile).pipe(
        switchMap((imageResponse: any) => {
          const imageId = imageResponse.id; // Supposons que l'ID est dans la réponse
          return this.homeService.uploadFileCv(imageId,this.id);

        }),
        switchMap((response: any) => {
          // Use switchMap to chain the call to downloadPDF
        const cvId = response.acf.cv;
        localStorage.setItem('cvId', cvId); // Stocker le cvId dans localStorage
          return this.homeService.getFileCv(response.acf.cv);
        }),
        switchMap((fileResponse: any) => {
          const pdfUrl = fileResponse.source_url;
          this.nameCv=this.extractFileName( pdfUrl)          

          if (pdfUrl) {
            return this.http.get(pdfUrl, { responseType: 'blob' });
          } else {
            throw new Error('Le JSON ne contient pas l\'URL du fichier PDF.');
          }
        })
      ).subscribe(
        (blob: Blob) => {
          if (blob.type === 'application/pdf') {
            const cvUrl = window.URL.createObjectURL(blob);
            this.safeCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cvUrl);
            this.isLoading=false
          } else {
            console.error('Le fichier téléchargé n\'est pas un PDF. Type:', blob.type);
          }
        },
        (error) => {
          //console.error('Erreur lors de la récupération du fichier PDF:', error);
          // ToastNotification.open({
          //   type: 'error',
          //   message: error.message
          // });
          this.isLoading = false;

        }
      );
    } else { 
      const storedCvId = localStorage.getItem('cvId');            
      if (storedCvId) {
        this.downloadPDF(storedCvId);
      }
      else{        
        this.downloadPDF(this.userConnect.acf.cv);
      } 
       
      //this.router.navigate(['/dashboard-candidat']);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  goBack(): void {
    this.location.back();
  }



  goToSecondStep() {
    this.showFirstStep = !this.showFirstStep,
    this.showSecondStep = !this.showSecondStep
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
                 // Utilisez le service pour postuler à l'emploi
                 this.uploadFile()
                // return
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
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading=false
            this.showFirstStep =  this.showFirstStep;
            this.showSecondStep = this.showSecondStep;
            this.showThirdStep = !this.showThirdStep;
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
        this.showSecondStep=false
        
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (event.target.files && file) {
      this.selectedFile = file; // Stocke le fichier sélectionné
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.selectedFileName = e.target.result;
        //console.log(this.selectedFileName);
        
        //this.form.controls['file']?.setValue(file ? file.name : ''); // Met à jour le contrôle du formulaire

      this.myForm.get('file')?.setValue(file ); // Met à jour le contrôle du formulaire
      };
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
    localStorage.removeItem('cvId');
  }



}
