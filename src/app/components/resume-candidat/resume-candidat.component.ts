import { Component, OnInit,HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Education } from 'src/app/interfaces/education';
import { Experience } from 'src/app/interfaces/experience';
import * as $ from 'jquery';
import { switchMap } from 'rxjs/operators';
import {DomSanitizer,SafeResourceUrl, SafeUrl} from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';

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
  isUpdate = false;
  educationIndex!: number ; // Propriété pour stocker l'index
  experienceIndex!: number ; // Propriété pour stocker l'index
  idCv:any
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
  "cat_ID": 635,
  "cat_name": "UI-UX-Designer",
  "cat_image": "https://livelearn.nl/wp-content/uploads/2024/04/UI-UX-Designer.png",
  "open_position": 0
},
{
  "cat_ID": 636,
  "cat_name": "web-programming",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
{
  "cat_ID": 637,
  "cat_name": "Webflow",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
    
    ]
    
  selectedSkills: any[] = [];
  form!:FormGroup;
  formEducation!:FormGroup
  formExperience!:FormGroup
  isLoading=false;
  message: any = {
    type: '',
    message: ''
  };
  modalTitle: string = 'Add New Education';
  isAddEducation!: boolean;
  modalVisible = true;
  selectedFile: File | null = null;
  imageId:any
  uploadedImage: string | null = null;
  cvUrl!:string
  safeCvUrl: SafeResourceUrl | null = null;  // Initialisé avec une valeur par défaut
    //safeCvUrl!:SafeUrl 
  constructor(private fb: FormBuilder,private usagerService: UsagerService,private route : ActivatedRoute ,private HomePageService: HomePageService,private router: Router,private sanitizer: DomSanitizer,private http: HttpClient) {
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

    this.initForm();
    this.initFormEducation();
    this.initFormExperience();
    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
 console.log(this. userConnect );
 
    this.updateCachedData();
    }   

    this.myForm = this.fb.group({
      file: ['', Validators.required]
    });
  }
  
  downloadPDF(cvId:string) {
    this.HomePageService.getFileCv(cvId).subscribe(
      (response) => {
        console.log('JSON response:', response);

        // Utilisez l'URL du PDF à partir de la réponse JSON
        const pdfUrl = response.source_url;
        if (pdfUrl) {
          console.log('PDF URL:', pdfUrl);
          this.loadPdfFromUrl(pdfUrl);
        } else {
          console.error('Le JSON ne contient pas l\'URL du fichier PDF.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations du fichier PDF:', error);
      }
    );
  }

  loadPdfFromUrl(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        if (blob.type === 'application/pdf') {
          const cvUrl = window.URL.createObjectURL(blob);
          this.safeCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cvUrl);
          //this.safeCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.protocol + '//' + window.location.host + cvUrl);
          console.log('Safe URL:', this.safeCvUrl);
        } else {
          console.error('Le fichier téléchargé n\'est pas un PDF. Type:', blob.type);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du fichier PDF :', error);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  initForm() {
    this.form = this.fb.group({
      skills: this.fb.array([]),

    });
  }
  initFormEducation() {
    this.formEducation = this.fb.group({
      school: this.fb.control("", Validators.required),
      degree: this.fb.control("", [Validators.required]),
      start_date: this.fb.control("", Validators.required),
      end_date: this.fb.control("", Validators.required),
      commentary: this.fb.control("", Validators.required),
    });
  }
  validateFormEducation(education: Education): boolean {
    const { school, degree, start_date, end_date, commentary } = education;
    if (school == "") {
      this.message.message = 'school is mandatory';
      return false;
    }
    if (degree == "") {
      this.message.message = 'degree level is mandatory';
      return false;
    }
    if (start_date == "") {
      this.message.message = 'start_date is mandatory';
      return false;
    }
    if (end_date == "") {
      this.message.message = 'end_date is mandatory';
      return false;
    }
    if (commentary == "") {
      this.message.message = 'commentary is mandatory';
      return false;
    }
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (endDate < startDate) {
      this.message.message = 'End date must be after start date';
      return false;
    }
  
    return true;
  }
  
  initFormExperience() {
    this.formExperience = this.fb.group({
      job_title: this.fb.control("", Validators.required),
      company: this.fb.control("", [Validators.required]),
      work_start_date: this.fb.control("", Validators.required),
      work_end_date: this.fb.control("", Validators.required),
      work_description: this.fb.control("", Validators.required),
    });
  }

  validateFormExperience(experience: Experience): boolean {
    const { job_title, company, work_start_date, work_end_date, work_description } = experience;
    if (job_title == "") {
      this.message.message = 'job title is mandatory';
      return false;
    }
    if (company == "") {
      this.message.message = 'company is mandatory';
      return false;
    }
    if (work_start_date == "") {
      this.message.message = 'start date of work is mandatory';
      return false;
    }
    if (work_end_date == "") {
      this.message.message = 'end date of work is mandatory';
      return false;
    }
    if (work_description == "") {
      this.message.message = 'commentary on company is mandatory';
      return false;
    }
    const startDate = new Date(work_start_date);
    const endDate = new Date(work_end_date);
    if (endDate < startDate) {
      this.message.message = 'End date must be after start date';
      return false;
    }
  
    return true;
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
  
  getSkillName(skillId: any): string {
    const skill = this.skillsTabs.find((skill:any) => skill.cat_ID === skillId);
    return skill ? skill.cat_name : '';
  }
  get skillsFormArray() {
    
    return this.form.get('skills') as FormArray;
  }
  
  onSubmit() {
    this.isLoading = true;
  
    // Vérifiez si le formulaire est valide
    if (this.form.valid) {
      // Vérifiez si au moins un des checkboxes est coché      
      if (this.form.value.skills.some((skill:boolean) => !!skill)) {
        const selectedSkills = this.form.value.skills.filter((skill: boolean) => !!skill).join(',');

        // Utilisez le service pour postuler à l'emploi
        this.HomePageService.addSkill(this.userConnect.id, selectedSkills)
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

  onsubmitEducation() {
    this.isLoading = true;
  
      // Utilisez le service pour postuler à l'emploi
      console.log(this.educationIndex);
      if (this.validateFormEducation(this.formEducation.value)) {
        if (this.isUpdate ) {          
          this.updateEducation(this.educationIndex);
        } else {
     this.addEducation();

      // this.HomePageService.myResumeAdd(this.userConnect.id,this.formEducation.value)
      //   .subscribe(
      //     // Succès de la requête
      //     (response) => {
  
      //       let typeR = "error"
      //       if (<any>response ) {
      //         typeR = "success";
      //         this.message= "Education created successfully."
      //         this.updateCachedData();
      //         this.formEducation.reset();

      //       }
            
      //       ToastNotification.open({
      //         type: typeR,
      //         message: this.message
      //       });
      //       this.isLoading = false;
      //       if (typeR == "success") {
      //         this.router.navigate(['/resume-candidat',this.userConnect.id]);
              
      //       }
  
      //     },
      //     // Gestion des erreurs
      //     (error) => {
      //       ToastNotification.open({
      //         type: 'error',
      //         message: error.error.message
      //       });
      //       this.isLoading = false;
  
      //     }
      //   );
      }
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
      this.isLoading = false;
    }
  }
  openModal(action: string, education: any = null,index:any =null): void {
    console.log(education,index,this.formEducation);
    if (action === 'add') {
      this.modalTitle = 'Add Education';
      this.isUpdate = false;
      this.formEducation.reset();
    } else if (action === 'update' && education) {
      this.modalTitle = 'Update Education';
      this.isUpdate = true;
      this.educationIndex=index
      this.formEducation.patchValue({
        school: education.school,
        degree: education.diploma,
        start_date: education.year,
        end_date: education.year,
        commentary: education.description
      });
    }
  }
  openModalExperience(action: string, education: any = null,index:any =null): void {
    console.log(action,education,index,this.formExperience.value);
    if (action === 'add') {
      this.modalTitle = 'Add Work && Experience';
      this.isUpdate = false;
      this.formExperience.reset();
    } else if (action === 'update' && education) {
      this.modalTitle = 'Update Work  && Experience';
      this.isUpdate = true;
      this.experienceIndex=index
      this.formExperience.patchValue({
        job_title: education.job,
        company: education.company,
        work_start_date: education.year,
        work_end_date: education.year,
        work_description: education.description
      });
    }
  }
  addEducation(): void {
    this.HomePageService.myResumeAdd(this.userConnect.id, this.formEducation.value)
      .subscribe(
        response => {
          let typeR = "error";
          if (response) {
            typeR = "success";
            this.message = "Education created successfully.";
            this.updateCachedData();
            this.formEducation.reset();
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          this.isLoading = false;
          if (typeR === "success") {
            this.router.navigate(['/resume-candidat', this.userConnect.id]);
          }
        },
        error => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
          this.isLoading = false;
        }
      );
  }
  updateEducation(index:number): void {
    console.log(this.formEducation.value);
    this.HomePageService.updateResume(this.userConnect.id, this.formEducation.value,index)
    
      .subscribe(
        response => {
          let typeR = "error";
          if (response) {
            typeR = "success";
            this.message = "Education updated successfully.";
            this.updateCachedData();
            this.formEducation.reset();
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          this.isLoading = false;
          if (typeR === "success") {
            this.router.navigate(['/resume-candidat', this.userConnect.id]);
          }
        },
        error => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
          this.isLoading = false;
        }
      );
  }
  
  uploadFile() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.HomePageService.getImageUser(this.selectedFile).pipe(
        switchMap((imageResponse: any) => {
          const imageId = imageResponse.id; // Supposons que l'ID est dans la réponse
          console.log(imageId,this.userConnect.id);
          return this.HomePageService.uploadFileCv(imageId,this.userConnect.id);

        }),
        switchMap((response: any) => {
          // Use switchMap to chain the call to downloadPDF

        const cvId = response.acf.cv;
        localStorage.setItem('cvId', cvId); // Stocker le cvId dans localStorage
          return this.HomePageService.getFileCv(response.acf.cv);
        }),
        switchMap((fileResponse: any) => {
          const pdfUrl = fileResponse.source_url;
          if (pdfUrl) {
            //yconsole.log('PDF URL:', pdfUrl);
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
           // window.location.reload()

            this.isLoading=false

            console.log('Safe URL:', this.safeCvUrl);
            //this.router.navigate(['/dashboard-candidat']);
          } else {
            console.error('Le fichier téléchargé n\'est pas un PDF. Type:', blob.type);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du fichier PDF:', error);
          ToastNotification.open({
            type: 'error',
            message: error.message
          });
          this.isLoading = false;

        }
      );
    } else {   
      const storedCvId = localStorage.getItem('cvId');
      if (storedCvId) {
        this.downloadPDF(storedCvId);
      }
      else if (this.userConnect.acf && this.userConnect.acf.cv) {
        
        console.log(this.userConnect,this.userConnect.acf.cv);
        
        this.downloadPDF(this.userConnect.acf.cv);
      } 
      
      //this.router.navigate(['/dashboard-candidat']);
    }
  }
  
  getGoogleDrivePreviewUrl(url: string): string {
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  // uploadFile() {
  //   if (this.selectedFile) {
  //     this.HomePageService.getImageUser(this.selectedFile).pipe(
  //       switchMap((imageResponse: any) => {
  //         const imageId = imageResponse.id; // Supposons que l'ID est dans la réponse
  //         console.log( imageId);

  //         return this.HomePageService.uploadFileCv(imageId);
          
  //       })
  //     ).subscribe(
  //       (response: any) => {
  //         console.log(response);
          
  //         //this.userConnect=response;
  //         this.updateCachedDataa(response.id)

  //         this.downloadPDF(response.acf.cv);
  //         this.router.navigate(['/dashboard-candidat']);
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //         ToastNotification.open({
  //           type: 'error',
  //           message: error.message
  //         });
  //       }
  //     );
  //   } else {
  //     this.router.navigate(['/dashboard-candidat']);
  //   }
  // }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (event.target.files && file) {
      this.selectedFile = file; // Stocke le fichier sélectionné
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        //this.form.controls['file']?.setValue(file ? file.name : ''); // Met à jour le contrôle du formulaire

      this.form.get('file')?.setValue(file ); // Met à jour le contrôle du formulaire
      };
    }
  }
  onsubmitExperience() {
    this.isLoading = true;
  
      // Utilisez le service pour postuler à l'emploi
      console.log(this.experienceIndex);
      if (this.validateFormExperience(this.formExperience.value)) {
        if (this.isUpdate ) {          
          this.updateExperience(this.experienceIndex);
        } else {
     this.addExperience();

      // this.HomePageService.myResumeAdd(this.userConnect.id,this.formEducation.value)
      //   .subscribe(
      //     // Succès de la requête
      //     (response) => {
  
      //       let typeR = "error"
      //       if (<any>response ) {
      //         typeR = "success";
      //         this.message= "Education created successfully."
      //         this.updateCachedData();
      //         this.formEducation.reset();

      //       }
            
      //       ToastNotification.open({
      //         type: typeR,
      //         message: this.message
      //       });
      //       this.isLoading = false;
      //       if (typeR == "success") {
      //         this.router.navigate(['/resume-candidat',this.userConnect.id]);
              
      //       }
  
      //     },
      //     // Gestion des erreurs
      //     (error) => {
      //       ToastNotification.open({
      //         type: 'error',
      //         message: error.error.message
      //       });
      //       this.isLoading = false;
  
      //     }
      //   );
      }
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
      this.isLoading = false;
    }
  }
  addExperience() {
    this.isLoading = true;
  
      // Utilisez le service pour postuler à l'emploi
      if (this.validateFormExperience(this.formExperience.value)) {
  
      this.HomePageService.myResumeAdd(this.userConnect.id,this.formExperience.value)
        .subscribe(
          // Succès de la requête
          (response) => {
  
            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Work created successfully."
              this.updateCachedData()
              this.formExperience.reset();

            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading = false;
            if (typeR == "success") {
              this.router.navigate(['/resume-candidat',this.userConnect.id]);
            }
  
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
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
      this.isLoading = false;
    }
  }
  updateExperience(index:number): void {
    console.log(this.formExperience.value);
    this.HomePageService.updateResume(this.userConnect.id, this.formExperience.value,index)
    
      .subscribe(
        response => {
          let typeR = "error";
          if (response) {
            typeR = "success";
            this.message = "Education updated successfully.";
            this.updateCachedData();
            this.formExperience.reset();
          }
          if(response.error){
            ToastNotification.open({
              type: typeR,
              message:response.error
            }); 
          }else if(response.message){
            ToastNotification.open({
              type: typeR,
              message:response.message
            }); 
          }    
          this.isLoading = false;
          if (typeR === "success") {
            this.router.navigate(['/resume-candidat', this.userConnect.id]);
          }
        },
        error => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
          this.isLoading = false;
        }
      );
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
    this.HomePageService.getDetailCandidate(this.userConnect.id).subscribe(data => {
      if (data) {
          this.candidat = data;
          localStorage.setItem('cachedCandidat', JSON.stringify(data));
      
      } 
      else {  
            console.error('Received data is not in the expected format.');
      }
    });
    const cvPath = this.userConnect.acf.cv; // Assurez-vous que `this.userConnect` est correctement défini

    this.uploadFile()


  }
  updateCachedDataa(id:number) {
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
  
    if (id) {
      this.HomePageService.getDetailCandidate(id).subscribe(
        (data) => {
          if (data) {
            this.candidat = data;
            localStorage.setItem('cachedCandidat', JSON.stringify(data));
          } else {
            console.error('Received data is not in the expected format.');
          }
        },
        (error) => {
          console.error('Error fetching candidate details:', error);
        }
      );
    } else {
      console.error('User is not connected or user ID is missing.');
    }
    //window.location.reload();
  
  }
  trashFavoritesJob(index:number,option:string) {
    console.log(option,index);
    
    if (confirm('Do you want to remove this resume?')) {

    //console.log(this.userConnect,index);
    //return
    
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this. userConnect && option) {
        if(option=='education'){
          this.HomePageService.deleteResume(this.userConnect.id, index)
          .subscribe(
            // Succès de la requête
            (response) => {
              let typeR = "error"
              if (<any>response ) {
                //console.log(response);
                
                typeR = "success";
                this.message= response.message
                this.updateCachedData();
              }
              console.log(response);
              
              if(response.error){
                ToastNotification.open({
                  type: typeR,
                  message:response.error
                }); 
              }else if(response.message){
                ToastNotification.open({
                  type: typeR,
                  message:response.message
                }); 
              }    
            },
            // Gestion des erreurs
            (error) => {
              ToastNotification.open({
                type: 'error',
                message: error.error
              });            
            }
          );
        }else if(option=='work'){
          this.HomePageService.deleteResumeExperience(this.userConnect.id, index)
          .subscribe(
            // Succès de la requête
            (response) => {
              let typeR = "error"
              if (<any>response ) {
                //console.log(response);
                
                typeR = "success";
                this.message= response.message
                this.updateCachedData();
              }
              console.log(response);
              if(response.error){
                ToastNotification.open({
                  type: typeR,
                  message:response.error
                }); 
              }else if(response.message){
                ToastNotification.open({
                  type: typeR,
                  message:response.message
                }); 
              }
                
            },
            // Gestion des erreurs
            (error) => {
              ToastNotification.open({
                type: 'error',
                message: error.error
              });            
            }
          );
        }
    
    }} else {
      ToastNotification.open({
        type: 'error',
        message: "delete cancelled"
      });      
    }
  }

  // updateEducation(): void {
  //   if (this.userConnect.id) {
  //     this.HomePageService.updateResume(this.userConnect.id, this.formEducation.value).subscribe(
  //       (response) => {
  //         this.handleResponse(response, 'Education updated successfully.');
  //       },
  //       (error) => {
  //         this.handleError(error);
  //       }
  //     );
  //   }
  // }

  // onSubmit() {
  //   this.isLoading = true;
  
  //     // Utilisez le service pour postuler à l'emploi
  //     console.log(this.form.value,this.form.value.skills);
  //     if (this.form.value  ) {
  //       alert('nook')
  // return
  //     this.HomePageService.addSkill(this.userConnect.id,this.form.value,)
  //       .subscribe(
  //         // Succès de la requête
  //         (response) => {
  
  //           let typeR = "error"
  //           if (<any>response ) {
  //             typeR = "success";
  //             this.message= "Skills added successfully."
  //           }
  //           ToastNotification.open({
  //             type: typeR,
  //             message: this.message
  //           });
  //           this.isLoading = false;
  //           // if (typeR == "success") {
  //           //   this.router.navigate(['/manage-compagny',this.userConnect.id]);
  //           // }
  
  //         },
  //         // Gestion des erreurs
  //         (error) => {
  //           ToastNotification.open({
  //             type: 'error',
  //             message: error.error.message
  //           });
  //          this.isLoading = false;
  
  //         }
  //       );
  //   }else if(!this.form.value){
  //     let typeR = "error"

  //     ToastNotification.open({
  //       type: typeR,
  //       message: "Select at least one skill "
  //     });

  //   } else {
  //     ToastNotification.open({
  //       type: 'error',
  //       message: this.message.message
  //     });
  //   }
  // }
}
