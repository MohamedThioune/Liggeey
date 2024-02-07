import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-job-one',
  templateUrl: './job-one.component.html',
  styleUrls: ['./job-one.component.css']
})
export class JobOneComponent implements OnInit {
  someArrayOfThings!:any
  currentColor: string = '#ECEDF2';
  isClass1Visible = true;
  jobs:any
  p: number = 1;

  constructor(private homeService:HomePageService) {}
  ngOnInit(): void {
    this.homeService.getAllJob().subscribe((data:any)=>{  
      this.jobs=data
    })
  }
  
  changeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  currentChangeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  submit(){
    alert("ok");
  }
  show(){
    alert("ok")
  }
  toggleClass() {
    this.isClass1Visible = !this.isClass1Visible;
  }

}
