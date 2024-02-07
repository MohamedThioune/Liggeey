import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

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
  post:any;

  constructor(private fb: FormBuilder,private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]]
    });
   // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
   
  this.homeService.postNewJob(this.userConnect.id).subscribe((data:any)=>{
    this.post=data
  })
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
