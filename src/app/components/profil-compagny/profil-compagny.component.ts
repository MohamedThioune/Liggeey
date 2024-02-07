import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

@Component({
  selector: 'app-profil-compagny',
  templateUrl: './profil-compagny.component.html',
  styleUrls: ['./profil-compagny.component.css']
})
export class ProfilCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  myForm!:FormGroup;
  form!:FormGroup;
  contactForm!:FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[]],
      firstName:['',[]],
      lastName:['',[]],
      name:['',[]],
      username:['',[]]
    });
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nature:['',[]],
      firstName:['',[]],
    });
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
