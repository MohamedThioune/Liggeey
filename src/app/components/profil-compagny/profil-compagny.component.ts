import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Router } from '@angular/router';
import { JobCompagny } from 'src/app/interfaces/job-compagny';

@Component({
  selector: 'app-profil-compagny',
  templateUrl: './profil-compagny.component.html',
  styleUrls: ['./profil-compagny.component.css']
})
export class ProfilCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  form!:FormGroup;
  userConnect:any;
  profil:any;
  message: any = {
    type: '',
    message: ''
  };
  constructor(private fb: FormBuilder,private route: Router,private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
   // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
   this.homeService.profilJob(this.userConnect.id).subscribe((data:any)=>{
    this.profil=data;
    console.log(this.profil);
    
  })

   //console.log(this.userConnect.id);
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });

 
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
  }
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
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

}
