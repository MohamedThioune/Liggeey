import { Component, OnInit,HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Education } from 'src/app/interfaces/education';
import { Experience } from 'src/app/interfaces/experience';
import * as $ from 'jquery';

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

  skillsTabs:any=[   {
    "term_id": 285,
      "name": "Google",
      "slug": "google",
      "term_group": 0,
      "term_taxonomy_id": 285,
      "taxonomy": "course_category",
      "description": "google",
      "parent": 283,
      "count": 0,
      "filter": "raw",
      "cat_ID": 285,
      "category_count": 0,
      "category_description": "google",
      "cat_name": "Google",
      "category_nicename": "google",
      "category_parent": 283
  },
  {
    "term_id": 288,
    "name": "Odoo",
    "slug": "odoo",
    "term_group": 0,
    "term_taxonomy_id": 288,
    "taxonomy": "course_category",
    "description": "odoo",
    "parent": 283,
    "count": 4,
    "filter": "raw",
    "cat_ID": 288,
    "category_count": 4,
    "category_description": "odoo",
    "cat_name": "Odoo",
    "category_nicename": "odoo",
    "category_parent": 283
  },
  {
    "term_id": 284,
    "name": "Salesforce",
    "slug": "salesforce",
    "term_group": 0,
    "term_taxonomy_id": 284,
    "taxonomy": "course_category",
    "description": "salesforce",
    "parent": 283,
    "count": 4,
    "filter": "raw",
    "cat_ID": 284,
    "category_count": 4,
    "category_description": "salesforce",
    "cat_name": "Salesforce",
    "category_nicename": "salesforce",
    "category_parent": 283
  },
  {
    "term_id": 290,
    "name": "UI-UX Designer",
    "slug": "web-designer",
    "term_group": 0,
    "term_taxonomy_id": 290,
    "taxonomy": "course_category",
    "description": "ui-ux-designer",
    "parent": 283,
    "count": 1,
    "filter": "raw",
    "cat_ID": 290,
    "category_count": 1,
    "category_description": "ui-ux-designer",
    "cat_name": "UI-UX Designer",
    "category_nicename": "web-designer",
    "category_parent": 283
  },
  {
    "term_id": 286,
    "name": "Wordpress",
    "slug": "wordpress",
    "term_group": 0,
    "term_taxonomy_id": 286,
    "taxonomy": "course_category",
    "description": "wordpress",
    "parent": 283,
    "count": 6,
    "filter": "raw",
    "cat_ID": 286,
    "category_count": 6,
    "category_description": "wordpress",
    "cat_name": "Wordpress",
    "category_nicename": "wordpress",
    "category_parent": 283
  },
  {
    "term_id": 289,
    "name": "Digital Marketing",
    "slug": "digital-marketing",
    "term_group": 0,
    "term_taxonomy_id": 289,
    "taxonomy": "course_category",
    "description": "digital marketing",
    "parent": 283,
    "count": 5,
    "filter": "raw",
    "cat_ID": 289,
    "category_count": 6,
    "category_description": "digital-marketing",
    "cat_name": "Digital Marketing",
    "category_nicename": "digital-marketing",
    "category_parent": 283
  },
  {
    "term_id": 291,
    "name": "Drupal",
    "slug": "drupal",
    "term_group": 0,
    "term_taxonomy_id": 291,
    "taxonomy": "course_category",
    "description": "drupal",
    "parent": 283,
    "count": 2,
    "filter": "raw",
    "cat_ID": 291,
    "category_count": 6,
    "category_description": "drupal",
    "cat_name": "Drupal",
    "category_nicename": "drupal",
    "category_parent": 291
},
{
  "term_id": 287,
  "name": "Webflow",
  "slug": "webflow",
  "term_group": 0,
  "term_taxonomy_id": 287,
  "taxonomy": "course_category",
  "description": "webflow",
  "parent": 283,
  "count": 1,
  "filter": "raw",
  "cat_ID": 287,
  "category_count": 6,
  "category_description": "webflow",
  "cat_name": "Webflow",
  "category_nicename": "webflow",
  "category_parent": 287
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


  constructor(private fb: FormBuilder,private usagerService: UsagerService,private route : ActivatedRoute ,private HomePageService: HomePageService,private router: Router) {
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

    } else {
    this.HomePageService.getDetailCandidate(this.userConnect.id).subscribe(data => {
        if (data) {
            this.candidat = data;
            localStorage.setItem('cachedCandidat', JSON.stringify(data));
        } else {
            console.error('Received data is not in the expected format.');
        }
    });

    }
console.log(this.candidat);


    }

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
    console.log(this.selectedSkills);
    
  }
  

  getSkillName(skillId: any): string {
    const skill = this.skillsTabs.find((skill:any) => skill.term_id === skillId);
    return skill ? skill.cat_name : '';
  }
  get skillsFormArray() {
    console.log(this.form.get('skills'));
    
    return this.form.get('skills') as FormArray;
  }
  onSubmit() {
    this.isLoading = true;
  
    // Vérifiez si le formulaire est valide
    if (this.form.valid) {
      // Vérifiez si au moins un des checkboxes est coché      
      if (this.form.value.skills.some((skill:boolean) => !!skill)) {
        console.log(this.userConnect.id, this.form.value.skills);
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
              console.log(error.error);

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
      console.log(this.message);
      
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
      console.log(this.userConnect.id,this.formEducation.value);
      if (this.validateFormEducation(this.formEducation.value)) {
  
      this.HomePageService.myResumeAdd(this.userConnect.id,this.formEducation.value)
        .subscribe(
          // Succès de la requête
          (response) => {
  
            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Education created successfully."
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

  onsubmitExperience() {
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
  openModalForAdd(): void {
    this.modalTitle = 'Add New Education';
    (<any>$('#exampleModalEdu')).modal('show');

    // Réinitialiser le formulaire si nécessaire
  }

  // openModalForEdit(): void {
  //   this.modalTitle = 'Edit Education';
  //   this.form.patchValue(this.candidat)
  //   // Pré-remplir les champs du formulaire avec les données existantes pour la modification
  // }
  openModalForEdit() {
    // Pré-remplir le formulaire avec les données de l'élément à éditer
    this.form.patchValue(this.candidat)

  
    // Définir le titre du modal
    this.modalTitle = "Edit Education";
  
    // Ouvrir le modal
    (<any>$('#exampleModalEdu')).modal('show');
  }
  
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
