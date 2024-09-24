import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators,FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { JobCompagny } from 'src/app/interfaces/job-compagny';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';

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
  inputValue: string = '';
  skills: string[] = [];
  showRemove: boolean = false;
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

editorData = '<p>Hello, world!</p>';
public editorConfig = {
  toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'link'], // Ajoutez 'insertImage' à la barre d'outils
  // Autres configurations...
  ckfinder: {
    uploadUrl: 'https://example.com/upload', // URL pour le téléchargement d'images
    
    options: {
      resourceType: 'Images' // Type de ressource pour le gestionnaire de fichiers (Images, Files, etc.)
    },
    minHeight: '1000px' // ou la hauteur souhaitée
  },
  config : {
    uiColor: '#F0F3F4',
    height: '100%'
  }
};





public Editor = ClassicEditor;
selectedSkills: any[] = [];
tabContrast=['Full Time', 'Partial Time','Remote']
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
get skillsFormArray() {
  return this.form.get('skills') as FormArray;
}

addSkill(event: Event): void {
  event.preventDefault(); // Prevent form submission on Enter

  const skillValue = this.form.get('newSkill')?.value?.trim(); // Get the new skill value
  if (skillValue) {
    this.skillsExperiences.push(this.fb.control(skillValue)); // Add to FormArray
    this.form.get('newSkill')?.reset(); // Clear the input field
  }
}
get skillsExperiences(): FormArray {
  return this.form.get('skills_experiences') as FormArray;
}

toggleRemoveIcon(): void {
  this.showRemove = this.inputValue.includes(' ');
}
removeSkills(index: number): void {
  this.skillsExperiences.removeAt(index); // Remove skill by index
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
    console.log(this.form.value);
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
            this.route.navigate(['/manage-compagny']);
          }

        },
        // Gestion des erreurs
        (error) => {          
          ToastNotification.open({
            type: 'error',
            message: error.error.errors
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
      job_contract: this.fb.control("", []),
      responsibilities: this.fb.control("", [Validators.required]),
      skills_experiences:this.fb.array([]) ,
      newSkill: this.fb.control("") ,// FormControl for capturing a new skill
      job_langues: this.fb.control("", Validators.required),
      job_application_deadline: this.fb.control("", [Validators.email, Validators.required]),
      skills: this.fb.array([]),
      motivation :this.fb.control("", [])
    });
  }
  validateFormJob(job: JobCompagny): boolean {
    const { title, job_level_of_experience, job_langues, job_contract,responsibilities,skills_experiences, job_application_deadline } = job;
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
    if (responsibilities == "") {
      this.message.message = 'Job responsibilities is mandatory';
      return false;
    }
    if (skills_experiences =="") {
      this.message.message = 'Skills experience is mandatory';
      return false;
    }
    
    
    // if (job_contract == "") {
    //   this.message.message = 'The type of contract is mandatory';
    //   return false;
    // }
    if (job_application_deadline == "") {
      this.message.message = 'The deadline is mandatory';
      return false;
    }


    return true;
  }
}
