import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from 'src/app/interfaces/challenge';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { switchMap } from 'rxjs/operators';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {
  loading:boolean=true;
  identifiant:number | null = 0;
  userConnect:any;
  candidate=false
  company=false
  form!: FormGroup;
  message: any = {
    type: '',
    message: ''
  };
  selectedFile: File | null = null;
  imageId!: any ;
  uploadedImage: string | null = null;
  isLoading: boolean = false;

  constructor(private homeService:HomePageService,private datePipe: DatePipe ,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
//console.log(this.form.value);

       // Récupération du token depuis le local storage
       const storedToken = this.usagerService.getToken();
       this.identifiant = +this.route.snapshot.params['id'];

       if (storedToken) {
                   // Décodage de la base64
         const decodedToken = atob(storedToken);

         // Parse du JSON pour obtenir l'objet original
         this. userConnect = JSON.parse(decodedToken);
         if(this.userConnect.acf.is_liggeey == "candidate"){
            this.candidate=true

         } else if(this.userConnect.acf.is_liggeey == "chief"){
           this.company=true
          }
       }
  }
  uploadFile() {
    if (this.selectedFile) {
      this.homeService.getImageUser(this.selectedFile).pipe(
        switchMap((imageResponse: any) => {
          const imageId = imageResponse.id; // Supposons que l'ID est dans la réponse
          this.imageId = imageId;          
          return this.homeService.uploadFile(imageId,this.userConnect.id);
        })
      ).subscribe(
        (response: any) => {
         // this.updateCachedData(response.id)

          this.router.navigate(['/dashboard-candidat']);
        },
        (error) => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
        }
      );
    } else {
      this.router.navigate(['/dashboard-candidat']);
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];    
    if (file) {
      this.selectedFile = file; // Stocke le fichier sélectionné
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.form.get('pdfURL')?.setValue(file); // Met à jour le contrôle du formulaire
      };
    }    
  }
  onFilesSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    const fileArray = this.form.get('imageURLs') as FormArray;
  
    // Vérifiez que l'index est valide
    if (!fileArray || index >= fileArray.length) {
      console.error('Invalid index for FormArray');
      return;
    }
  
    if (file) {
      // Stocke le fichier dans le FormArray
      fileArray.at(index).setValue(file);
  
      // Facultatif : Lecture pour prévisualisation
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        //console.log(`Preview for input ${index}:`, e.target.result);
      };
  
      console.log('File uploaded:', file);
    }
  }
  

onSubmit() {
  this.isLoading = true;
    // Utilisez le service pour postuler à l'emploi
    console.log(this.form.value);
    //return
    if (this.validateFormJob(this.form.value)) {

    this.homeService.addChallenge(this.userConnect.id,this.form.value)
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
            this.router.navigate(['/challenges']);
          }

        },
        // Gestion des erreurs
        (error) => {   
          console.log(error);
                 
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
  
  initForm() {
    this.form = this.fb.group({
      titel: this.fb.control("", Validators.required),
      short_description: this.fb.control("", Validators.required),
      motivation: this.fb.control("", Validators.required),
      long_description: this.fb.control("", Validators.required),
      // imageURLs: this.fb.control("", []),
      imageURLs: this.fb.array([null, null, null]), // Pour stocker les trois fichiers
      pdfURL: this.fb.control("", []),
    });
  }
  validateFormJob(challenge: Challenge): boolean {
    const { titel, short_description,motivation,long_description,imageURLs,pdfURL,challenge_id,user_id } = challenge;
 

    return true;
  }


}
