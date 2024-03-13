import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

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
  form_profil!:FormGroup;
  form_social!:FormGroup;
  form_contact!:FormGroup;
  identifiant:number | null = 0;
  candidat:any
  constructor(private fb: FormBuilder,private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data      
      console.log(this.candidat);
      
    })
    this.form_profil = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });
    this.form_social = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });
    this.form_contact = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });
  }

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

}
