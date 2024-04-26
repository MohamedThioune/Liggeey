import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Router } from '@angular/router';
import { JobCompagny } from 'src/app/interfaces/job-compagny';
import { ProfilCompagny } from 'src/app/interfaces/profil-compagny';

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
  loading:boolean=true;
  userConnect:any;
  profil:any;
  message: any = {
    type: '',
    message: ''
  };
   countries:any;

  constructor(private fb: FormBuilder,private route: Router,private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.initForm();
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
    this.form.patchValue(this.profil);
    this.loading=false;    
    console.log(this.profil);
    
  })


  this.homeService.getCountries().subscribe(
    (data: any[]) => {
      this.countries = data.map(country => country.name.common);
    },
    error => {
      console.log('Erreur lors de la récupération des pays:', error);
    });

   //console.log(this.userConnect.id);
   
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title:['',[]],
      website:['',[]],
      sector:['',[Validators.required]],
      size:['',[Validators.required]],
      biography:['',[]],
      country:['',[]],
      place:['',[Validators.required]],
      address:['',[]],
    });
  }

  onSubmit() {
    // Utilisez le service pour postuler à l'emploi
    //console.log(this.profil);
    
    if (this.validateFormJob(this.form.value)) {
    this.homeService.updateProfileCompany(this.userConnect.id,this.form.value)
      .subscribe(
        // Succès de la requête
        (response) => {

          let typeR = "error"
          if (<any>response ) {
            console.log(response);
            typeR = "success";
            this.message= "Company Updated successfully."
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
            this.route.navigate(['/dashboard-employer',this.userConnect.id]);
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
validateFormJob(profile: ProfilCompagny): boolean {
  const {website, sector,size, biography, country, place } = profile;
  if (biography == "") {
    this.message.message = 'Biography of your company is mandatory';
    return false;
  }

  if (place == "") {
    this.message.message = 'City of your Company is mandatory';
    return false;
  }
  if (country == "") {
    this.message.message = 'Country of your Company is mandatory';
    return false;
  }
  if (website == "") {
    this.message.message = 'Your Website is mandatory';
    return false;
  }
  if (size == "") {
    this.message.message = 'Size of your Company is mandatory';
    return false;
  }
  if (sector == "") {
    this.message.message = 'Your sector is mandatory';
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
