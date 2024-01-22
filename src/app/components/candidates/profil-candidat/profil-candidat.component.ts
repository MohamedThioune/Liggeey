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
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(this.isSidebarVisible);
    
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  collection: any[] = this.someArrayOfThings=[
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"php"
    },
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
  ]; 
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

}
