import { Component, OnInit,HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-resume-candidat',
  templateUrl: './resume-candidat.component.html',
  styleUrls: ['./resume-candidat.component.css']
})
export class ResumeCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  myForm!:FormGroup
  isMobile!: boolean;

  constructor(private fb: FormBuilder) {
    this.isMobile = window.innerWidth < 768; 

   }
   @HostListener('window:resize', ['$event'])
   onResize(event:Event) {
     this.isMobile = window.innerWidth < 768; 
   }
 
   isWebScreen(): boolean {
     return !this.isMobile;
   }
 
   isMobileScreen(): boolean {
     return this.isMobile;
   }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      file: ['', [Validators.required, Validators.email]],
    });
  }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

}
