import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
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
  job:any
  message: any = {
    type: '',
    message: ''
  };
  langueTab=['French','English','Dutch']

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
   console.log(this.userConnect.id);

}
onSubmit() {
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
          if (typeR == "success") {
            this.route.navigate(['/job']);
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
    this.route.navigate(['/login']);
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
      description: this.fb.control("", []),
      job_level_of_experience: this.fb.control("", Validators.required),
      job_contract: this.fb.control("", Validators.required),
      job_langues: this.fb.control("", Validators.required),
      job_application_deadline: this.fb.control("", [Validators.email, Validators.required]),
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
