import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = true;
  showButton = true;
  form_profil!:FormGroup;
  form_social!:FormGroup;
  form_contact!:FormGroup;
  uploadedImage: any; // Pour stocker l'image téléchargée

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
