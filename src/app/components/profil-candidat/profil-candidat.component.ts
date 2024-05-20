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
  countries:any;
  showButton = true;
  form!:FormGroup;
  facebook:any;
  twitter:any;
  linkedin:any;
  loading: boolean = true; 
  role:any;
  instagram:any;
  form_social!:FormGroup;
  form_contact!:FormGroup;
  identifiant:number | null = 0;
  candidat:any;
  message: any = {
    type: '',
    message: ''
  };
  userConnect:any;
  selectedCountry:any;

  constructor(private fb: FormBuilder,private route : ActivatedRoute ,private router: Router,private HomePageService: HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
       // Récupération du token depuis le local storage
       const storedToken = this.usagerService.getToken();

       if (storedToken) {
         // Décodage de la base64
         const decodedToken = atob(storedToken);
   
         // Parse du JSON pour obtenir l'objet original
         this. userConnect = JSON.parse(decodedToken);
       }
    this.initForm() ;
    this.identifiant = +this.route.snapshot.params['id'];
    this.HomePageService.getDetailCandidate( this.userConnect.id).subscribe(data=>{
      this.candidat=data
      
      //this.candidat.date_born=this.convertDate(this.candidat.date_born);
      this.facebook=this.candidat.social_network.facebook;
      this.twitter=this.candidat.social_network.twitter;
      this.linkedin=this.candidat.social_network.linkedin;
      this.instagram=this.candidat.social_network.instagram;
      this.selectedCountry=this.candidat.country
      this.form.patchValue(this.candidat);
      this.loading = false;
    })
 
    this.HomePageService.getCountries().subscribe(
      (data: any[]) => {
        this.countries = data.map(country => country.name.common);
      },
      error => {
        console.log('Erreur lors de la récupération des pays:', error);
      });
  

  }
  onSubmit(idUser:string) {
    // Utilisez le service pour postuler à l'emploi    
    //console.log(idUser,this.form.value);
    
    if (this.form.value!="") {
      const newDate= this.swapDayAndMonth(this.form.value.date_born);
      this.form.value.date_born = newDate;
      console.log(this.form.value);
      this.HomePageService.updateProfile(idUser,this.form.value)
      .subscribe(
        // Succès de la requête
        (response) => {

          let typeR = "error"
          if (<any>response ) {
            typeR = "success";
            this.message= "Profile updated successfully."
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
            this.router.navigate(['/dashboard-candidat']);
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
    //this.router.navigate(['/login']);
  }
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
      //role: ["", Validators.required],
      experience:["",Validators.required],
      //telnr:["",Validators.required],
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
      //age: ['', Validators.required],
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

  swapDayAndMonth(dateString: string): string {
    // Diviser la chaîne de date en parties : jour, mois, année
    const dateParts = dateString.split('/');
    
    // Échanger le jour et le mois
    const temp = dateParts[0];
    dateParts[0] = dateParts[1];
    dateParts[1] = temp;
    
    // Reconstruire la chaîne de date dans le nouveau format
    const swappedDate = dateParts.join('/');
    
    return swappedDate;
}
}
