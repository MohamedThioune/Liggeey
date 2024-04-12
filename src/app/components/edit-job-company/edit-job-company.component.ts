import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCompagny } from 'src/app/interfaces/job-compagny';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-edit-job-company',
  templateUrl: './edit-job-company.component.html',
  styleUrls: ['./edit-job-company.component.css']
})
export class EditJobCompanyComponent implements OnInit {
  job:any;
  userConnect:any;
  form!: FormGroup;
  dateError = false;
  id:number | null = 0;
  tabsKills:any;
  message: any = {
    type: '',
    message: ''
  };
  langues: string[] = ['French', 'English', 'Dutch'];
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

  constructor(private route : ActivatedRoute,private router:Router,private fb : FormBuilder , private homeService : HomePageService,private usagerService:UsagerService) {

  }

  ngOnInit(): void {
    this.initForm() ;
    this.id = +this.route.snapshot.params['id'];
    this.homeService.getDetailJob(this.id).subscribe(data => {
        this.job = data;
        console.log(this.job);
        this.form.patchValue(this.job);

    });
     // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();

   if (storedToken) {
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }

  }

  convertStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
  formatDateString(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  initForm(){
    this.form = this.fb.group({
      ID: this.fb.control("", []),
      description: this.fb.control("", [Validators.required]),
      level_of_experience: this.fb.control("", Validators.required),
      langues: this.fb.control("", Validators.required),
      expired_at: this.fb.control("", [Validators.email, Validators.required]),
      skills: this.fb.array([]),
    });
  }



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
getskillsFormArray() {
  return this.form.get('skills') as FormArray;
}
getSkills(tabSkillsId:any) {
  const allSkills:any = [];
  if (Array.isArray(tabSkillsId)) {
    tabSkillsId.forEach(skillID => {
      if (Array.isArray(this.skillsTabs)) {
        this.skillsTabs.forEach(skill => {
          if (skillID==skill.term_id) {
            allSkills.push(skill);
          }
        });
    }
    });
}
return allSkills;
}

  validateFormJob(job: any):boolean{
    const { level_of_experience, langues, expired_at } = job;

    if (level_of_experience == 0) {
      this.message.message = 'Experience level is mandatory';
      return false;
    }
    if (langues == "") {
      this.message.message = 'Language is mandatory';
      return false;
    }
    if (expired_at == "") {
      this.message.message = 'The deadline is mandatory';
      return false;
    }
    return true;
  }



  onSubmit(){
    if (this.validateFormJob(this.form.value)) {
    console.log(this.form.value);
    //console.log(jobData);
    this.homeService.editJob(this.form.value,this.userConnect.id)
      .subscribe(
        // Succès de la requête
        (response) => {

          let typeR = "error"
          if (<any>response ) {
            typeR = "success";
            this.message= "Job edited successfully."
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
        //    alert("Job edited successfully.")
            this.router.navigate(['/manage-compagny/'+this.userConnect.id]);
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
    ToastNotification.open({
      type: 'error',
      message: this.message.message
    });
  }
  }
  validateDate(event: any): void {
    const inputValue = event.target.value;
    const dateParts = inputValue.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Soustraire 1 car les mois commencent à partir de 0 dans JavaScript
    const year = parseInt(dateParts[2], 10);
    const inputDate = new Date(year, month, day);
    const currentDate = new Date();

    // Vérifier si la date saisie est valide (non vide et au bon format)
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Format de date "dd/mm/yyyy"
    if (!regex.test(inputValue) || day < 1 || day > 31 || month < 0 || month > 11 || year < 1000 || year > 9999 || inputDate.getTime() !== inputDate.getTime()) {
      this.dateError = true;
      return;
    }

    // Vérifier si la date saisie est inférieure à la date actuelle
    if (inputDate < currentDate) {
      this.dateError = true;
      return;
    }

    // La date est valide
    this.dateError = false;
  }



}

