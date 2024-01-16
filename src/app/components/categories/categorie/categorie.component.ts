import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  someArrayOfThings!:any
  categories:any;

  constructor(private homeService:HomePageService) {}
  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      console.log(this.categories);
      
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
    alert('ok')
  }
}


