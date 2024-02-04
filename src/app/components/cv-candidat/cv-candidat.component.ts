import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-candidat',
  templateUrl: './cv-candidat.component.html',
  styleUrls: ['./cv-candidat.component.css']
})
export class CvCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  myForm!:FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      file:['',[]],
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
