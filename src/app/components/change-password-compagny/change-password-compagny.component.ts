import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-compagny',
  templateUrl: './change-password-compagny.component.html',
  styleUrls: ['./change-password-compagny.component.css']
})
export class ChangePasswordCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any

  isSidebarVisible = false;
  showButton = true;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName:['',[]],
      name:['',[]]
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
