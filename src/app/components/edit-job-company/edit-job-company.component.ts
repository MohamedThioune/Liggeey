import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCompagny } from 'src/app/interfaces/job-compagny';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-job-company',
  templateUrl: './edit-job-company.component.html',
  styleUrls: ['./edit-job-company.component.css']
})
export class EditJobCompanyComponent implements OnInit {
  job:any;
  userConnect:any;
  selectedSkills:any[]= [];
  skillsID:any
  form!: FormGroup;
  loading:boolean=true;
  dateError = false;
  id:number | null = 0;
  tabsKills:any;
  message: any = {
    type: '',
    message: ''
  };
  slug:any
  langues: string[] = ['French', 'English', 'Dutch'];
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'link'], // Ajoutez 'insertImage' à la barre d'outils
    ckfinder: {
      //uploadUrl: 'https://example.com/upload', // 
      options: {
        resourceType: 'Images' // Type de ressource pour le gestionnaire de fichiers (Images, Files, etc.)
      }
    }
  };
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
    

  constructor(private route : ActivatedRoute,private router:Router,private fb : FormBuilder , private homeService : HomePageService,private usagerService:UsagerService) {

  }

  ngOnInit(): void {
    this.initForm() ;
    this.slug = this.route.snapshot.params['slug'];
    this.homeService.getDetailJob(this.slug).subscribe(data => {
        this.job = data;
        this.loading=false;
        this.selectedSkills = this.job.skills.map((skill:any) => skill.term_id);
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
  getSkillsId (skills:any):any{
    const allSkillsId:any[]= [];
    if (Array.isArray(skills)) {
      skills.forEach(skill => {
        allSkillsId.push(skill.term_id)
      });
  }
  return allSkillsId
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

removeSkill(term_id: any) {
  this.selectedSkills = this.selectedSkills.filter(skill => skill !== term_id);
}
getSkillName(skillId: any): string {
  const skill = this.skillsTabs.find((skill:any) => skill.cat_ID === skillId);
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
          if (skillID==skill.cat_ID) {
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
    this.form.value.skills=this.selectedSkills;
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
            this.router.navigate(['/manage-compagny/']);
          }
        },
        // Gestion des erreurs
        (error) => {
          ToastNotification.open({
            type: 'error',
            message: "edit failed"
          });
        }
      );
  } else {
    ToastNotification.open({
      type: 'error',
      message: "edit failed"
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
    if (!regex.test(inputValue) || day < 1 || day > 31 || month < 0 || month > 12 || year < 1000 || year > 9999 || inputDate.getTime() !== inputDate.getTime()) {
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

