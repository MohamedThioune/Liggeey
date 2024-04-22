import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators,FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { JobCompagny } from 'src/app/interfaces/job-compagny';

@Component({
  selector: 'app-post-new-job-compagny',
  templateUrl: './post-new-job-compagny.component.html',
  styleUrls: ['./post-new-job-compagny.component.css']
})
export class PostNewJobCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  myForm!:FormGroup;
  form!:FormGroup;
  userConnect:any;
  posts:any;
  job:any;
  jobs:any
  message: any = {
    type: '',
    message: ''
  };
  langues: string[] = ['French', 'English', 'Dutch'];
  isLoading: boolean = false;

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
}
]


selectedSkills: any[] = [];

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

removeSkill(term_id: any) {
  this.selectedSkills = this.selectedSkills.filter(skill => skill !== term_id);
}
getSkillName(skillId: any): string {
  const skill = this.skillsTabs.find((skill:any) => skill.term_id === skillId);
  return skill ? skill.cat_name : '';
}
get skillsFormArray() {
  return this.form.get('skills') as FormArray;
}


  constructor(private fb: FormBuilder,private route: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {

    this.initForm()
   // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();

   if (storedToken) {
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
}

onSubmit() {
  this.isLoading = true;

    // Utilisez le service pour postuler à l'emploi
    console.log(this.form.value,this.form.value.skills);
    if (this.validateFormJob(this.form.value)) {

    this.homeService.postJob(this.form.value,this.userConnect.id)
      .subscribe(
        // Succès de la requête
        (response) => {

          let typeR = "error"
          if (<any>response ) {
            typeR = "success";
            this.message= "Job created successfully."
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          this.isLoading = false;
          if (typeR == "success") {
            this.route.navigate(['/manage-compagny',this.userConnect.id]);
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

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  initForm() {
    this.form = this.fb.group({
      title: this.fb.control("", Validators.required),
      description: this.fb.control("", [Validators.required]),
      job_level_of_experience: this.fb.control("", Validators.required),
      job_contract: this.fb.control("", Validators.required),
      job_langues: this.fb.control("", Validators.required),
      job_application_deadline: this.fb.control("", [Validators.email, Validators.required]),
      skills: this.fb.array([]),

    });
  }
  validateFormJob(job: JobCompagny): boolean {
    const { title, job_level_of_experience, job_langues, job_contract, job_application_deadline } = job;
    if (title == "") {
      this.message.message = 'Title is mandatory';
      return false;
    }
    if (job_level_of_experience == 0) {
      this.message.message = 'Experience level is mandatory';
      return false;
    }
    if (job_langues == "") {
      this.message.message = 'Language is mandatory';
      return false;
    }
    if (job_contract == "") {
      this.message.message = 'The type of contract is mandatory';
      return false;
    }
    if (job_application_deadline == "") {
      this.message.message = 'The deadline is mandatory';
      return false;
    }


    return true;
  }
}
