import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
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
  slug:any;
  challenge:any
  constructor(private homeService:HomePageService,private datePipe: DatePipe ,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
      this.initForm()
       // Récupération du token depuis le local storage
       const storedToken = this.usagerService.getToken();
       this.slug = this.route.snapshot.params['slug'];

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
       this.homeService.getDetailChallenge(this.slug).subscribe((data:any)=>{
        this.challenge=data
        this.challenge.content=  this.challenge.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
        this.loading=false
        })
  }
 
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    
    if (event.target.files && file) {
      this.selectedFile = file; // Stocke le fichier sélectionné
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        //console.log(this.selectedFileName);
        
        //this.form.controls['file']?.setValue(file ? file.name : ''); // Met à jour le contrôle du formulaire

      this.form.get('pdfURL')?.setValue(file ); // Met à jour le contrôle du formulaire
      };
    }
  }
  

  onFilesSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    const fileArray = this.form.get('imageURLs') as FormArray; // Typage explicite
  
    if (!fileArray) {
      //console.error('FormArray "imageURLs" is not defined.');
      return;
    }
  
    if (index >= fileArray.length) {
      //console.error('Invalid index for FormArray');
      return;
    }
  
    if (file) {
      const filePath = event.target.value; // Obtenir le chemin fictif
     // console.log(`File path for input ${index}:`, filePath);
  
      // Mettre à jour le FormArray avec le chemin fictif
      fileArray.at(index).setValue(filePath);
    }
  }
  
  onSubmit() {
    this.isLoading = true;
      // Utilisez le service pour postuler à l'emploi
      const imageURLsArray = this.form.get('imageURLs')?.value as string[];
      if (Array.isArray(imageURLsArray)) {
        const imageURLs = imageURLsArray.filter(url => url !== "").join(',');
        this.form.value.imageURLs = imageURLs;
      }      
      if (this.validateFormJob(this.form.value)) {

      this.homeService.addChallenge(this.userConnect.id,this.form.value,this.challenge.ID)
        .subscribe(
          // Succès de la requête
          (response) => {

            let typeR = "error"
            if (<any>response ) {              
              typeR = "success";
              this.message= "Challenge posted !!"
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading = false;
            if (typeR == "success") {
              this.router.navigate(['/detail-challenge',this.challenge.post_slug]);
            }

          },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.errors || 'An unexpected error occurred'
            });
            this.isLoading = false;
          }
          
        );
    }
    else {
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
      imageURLs: this.fb.array([this.fb.control(''), this.fb.control(''), this.fb.control(''), this.fb.control('')]),      pdfURL: this.fb.control("", []),
    });
  }
  validateFormJob(challenge: Challenge): boolean {
    const { titel, short_description,motivation,long_description,imageURLs,pdfURL,challenge_id,user_id } = challenge;
    return true;
  }


}
