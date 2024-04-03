import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';
import { Candidat } from 'src/app/interfaces/candidate';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {

  uploadedImage: any; // Pour stocker l'image téléchargée
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = true;
  showButton = true;
  form!:FormGroup;
  form_social!:FormGroup;
  form_contact!:FormGroup;
  identifiant:number | null = 0;
  candidat:any;
  message: any = {
    type: '',
    message: ''
  };
  userConnect:any;

  constructor(private fb: FormBuilder,private route : ActivatedRoute ,private router: Router,private HomePageService: HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.initForm() ;
    this.identifiant = +this.route.snapshot.params['id'];    

       // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
  
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


}

  
  }
  onSubmit() {
    // Utilisez le service pour postuler à l'emploi    
    console.log(this.form.value);

  //   if (this.form_profil.value!="") {

  //   this.HomePageService.updateProfile(this.form_profil.value)
  //     .subscribe(
  //       // Succès de la requête
  //       (response) => {

  //         let typeR = "error"
  //         if (<any>response ) {
  //           typeR = "success";
  //           this.message= "Profile updated successfully."
  //         }
  //         ToastNotification.open({
  //           type: typeR,
  //           message: this.message
  //         });
  //         if (typeR == "success") {
  //           this.router.navigate(['/job']);
  //         }
  //       },
  //       // Gestion des erreurs
  //       (error) => {
  //         ToastNotification.open({
  //           type: 'error',
  //           message: error.error.message
  //         });
  //       }
  //     );
  // } else {
  //   ToastNotification.open({
  //     type: 'error',
  //     message: this.message.message
  //   });
  //   //this.router.navigate(['/login']);
  // }
}



  // updateProfile(){
  //     this.form_profil.value=
  //   this.HomePageService.updateProfile().subscribe(data=>{
      
  //   })
  // }
 
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
      };
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(this.isSidebarVisible);
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  initForm() {
    this.form = this.fb.group({
      role: ["", Validators.required],
      experience:["",Validators.required],
      telnr:["",Validators.required],
      date_born:["",Validators.required],
      education_level:["",Validators.required],
      biographical_info:["",Validators.required],
      facebook:["",Validators.required],
      twitter:["",Validators.required],
      linkedin:["",Validators.required],
      instagram:["",Validators.required],
      country:["",Validators.required],
      city:["",Validators.required],
      first_name: ['', Validators.required],
      work_as: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      language: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      adress: ['', Validators.required]
      
    });
  }

  validateFormJob(candidat: Candidat): boolean {
    const { first_name, work_as, mobile_phone, email, experience } = candidat;
    if (first_name == "") {
      this.message.message = 'Name is mandatory';
      return false;
    }
    if (work_as == "") {
      this.message.message = 'Work as  is mandatory';
      return false;
    }
    if (mobile_phone == "") {
      this.message.message = 'Phone is mandatory';
      return false;
    }
    if (email == "") {
      this.message.message = 'Your email  is mandatory';
      return false;
    }

    if (this.form.controls['email'].status == "INVALID") {
      this.message.message = 'Vérifier le format du mail';
      return false;
    }
    if (experience == "") {
      this.message.message = 'Your experience is mandatory';
      return false;
    }
   

    return true;
  }

}
