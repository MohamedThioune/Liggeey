import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  message: any = {
    type: '',
    message: ''
  };


  constructor(private route : ActivatedRoute,private router:Router,private fb : FormBuilder , private homeService : HomePageService,private usagerService:UsagerService) {

  }

  ngOnInit(): void {
    this.initForm() ;
    this.id = +this.route.snapshot.params['id'];
    this.homeService.getDetailJob(this.id).subscribe(data => {
        this.job = data;
        this.form.patchValue(this.job);
        console.log(this.job);     
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
      job_level_of_experience: this.fb.control("", Validators.required),
      skills: this.fb.control("", []),
      job_langues: this.fb.control("", Validators.required),
      expired_at: this.fb.control("", [Validators.email, Validators.required]),      
    });
  }


  validateFormJob(job: any):boolean{
    const { job_level_of_experience, job_langues, expired_at } = job;
    
    if (job_level_of_experience == 0) {
      this.message.message = 'Experience level is mandatory';
      return false;
    }
    if (job_langues == "") {
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
    console.log(this.form.value);
    if (this.validateFormJob(this.form.value)) {

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
            alert("Job edited successfully.")
            this.router.navigate(['/manage-compagny/'+this.userConnect.id]);
          }
        },
        // Gestion des erreurs
        (error) => {
          ToastNotification.open({
            type: 'Edit failed',
            message: error.error.message
          });
        }
      );
  } else {
    ToastNotification.open({
      type: 'Edit failed',
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

