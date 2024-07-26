import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Router } from '@angular/router';
import { JobCompagny } from 'src/app/interfaces/job-compagny';
import { ProfilCompagny } from 'src/app/interfaces/profil-compagny';
import { switchMap } from 'rxjs/operators';

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
  selectedCountry:any;
  message: any = {
    type: '',
    message: ''
  };
   countries:any;
   isLoading: boolean = false;
   selectedCountryCapital: string | null = null;
   uploadedImage: string | null = null;
   selectedFile: File | null = null;
   logoId:any
   candidat:any
   
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
    this.selectedCountry=this.profil.country
    this.form.patchValue(this.profil);
    this.loading=false;       
  })



    this.homeService.getCountries().subscribe(
      (data: any) => {
        this.countries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
      },
      (error) => {
        console.error('Error fetching countries', error);
      }
    );
  }
  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCountryName = selectElement.value;
    const selectedCountry = this.countries.find((country:any) => country.name.common === selectedCountryName);
    this.selectedCountryCapital = selectedCountry?.capital ? selectedCountry.capital[0] : 'No capital found';
    this.form.patchValue({ place: this.selectedCountryCapital });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Stocke le fichier sélectionné
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.form.get('logo')?.setValue(file); // Met à jour le contrôle du formulaire
      };
    }
  }
  uploadFile() {
    if (this.selectedFile) {
      this.homeService.getImageUser(this.selectedFile).pipe(
        switchMap((imageResponse: any) => {
          const imageId = imageResponse.id; // Supposons que l'ID est dans la réponse
          if (!imageId) {
            throw new Error('Image ID is missing or invalid.');
          }
          return this.homeService.uploadLogoCompany(imageId,this.profil.ID);
        })
      ).subscribe(
        (response: any) => {
          console.log(response);
          
          this.updateCachedData(response.slug)

          this.route.navigate(['/dashboard-employer']);
        },
        (error) => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
        }
      );
    } else {
      this.route.navigate(['/dashboard-employer']);
    }
  }
  updateCachedData(id:string) {
    // const cachedCandidat = localStorage.getItem('cachedCandidat');
    // if (cachedCandidat) {
    //   let cachedData;
    //   try {
    //     cachedData = JSON.parse(cachedCandidat);
    //   } catch (error) {
    //     console.error('Error parsing cached data:', error);
    //   }
  
    //   if (cachedData) {
    //     this.candidat = cachedData;
    //   } else {
    //     console.error('Cached data is not in the expected format.');
    //   }
    // }
  
    if (id) {
      this.homeService.getDetailCompagny(id).subscribe(
        (data) => {
          if (data) {
            this.candidat = data;
            console.log(this.candidat);
            
            localStorage.setItem('cachedCandidat', JSON.stringify(data));
          } else {
            console.error('Received data is not in the expected format.');
          }
        },
        (error) => {
          console.error('Error fetching candidate details:', error);
        }
      );
    } else {
      console.error('User is not connected or user ID is missing.');
    }
    //window.location.reload();
  
  }
  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title:['',[]],
      //logo:['',[]],
      website:['',[Validators.required]],
      sector:['',[Validators.required]],
      size:['',[Validators.required]],
      biography:['',[]],
      country:['',[]],
      place:['',[Validators.required]],
      address:['',[]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    // Utilisez le service pour postuler à l'emploi    
    if (this.validateFormJob(this.form.value)) {
    this.homeService.updateProfileCompany(this.userConnect.id,this.form.value)
      .subscribe(
        // Succès de la requête
        (response) => {

          let typeR = "error"
          if (<any>response ) {
            typeR = "success";
            this.uploadFile();
            this.message= "Company Updated successfully."
          }
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
            this.route.navigate(['/dashboard-employer']);
          }
          this.isLoading = false;
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
  if (size == null) {
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
