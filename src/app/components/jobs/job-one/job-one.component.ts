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
  artikels:any

  changeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  currentChangeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  constructor(private homeService:HomePageService) {}
  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{  
      this.artikels=data.artikels
      console.log(this.artikels, this.artikels.length);

    })
  }
  
  p: number = 1;
  collection: any[] = this.someArrayOfThings=[
    {
      "color":"#4947D0",
      "profil":"Ingénieur logiciel (Android), bibliothèques",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_1.svg"
    },
    {
      "profil":"Recruiting Coordinator",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_2.svg"

    }
    ,{
      "profil":"Senior Product Designer",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_3.svg"

    },
    {
      "profil":"Web Developer",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_4.svg"
    },
    {
      "profil":"Sr. Full Stack Engineer",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_5.svg"
    },
    {
      "profil":"Senior Product Designer",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_2.svg"
    },
    {
      "color":"#4947D0",
      "profil":"Ingénieur logiciel (Android), bibliothèques",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_1.svg"
    },
    {
      "profil":"Recruiting Coordinator",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_5.svg"
    }
    ,{
      "profil":"Senior Product Designer",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_4.svg"
    },
    {
      "profil":"Web Developer",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_3.svg"
    },
    {
      "profil":"Sr. Full Stack Engineer",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/logo_2.svg"
    },
    {
      "profil":"Senior Product Designer",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/logo_5.svg"

    }
  ]; 
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
