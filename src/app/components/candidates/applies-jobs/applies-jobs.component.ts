import { Component, OnInit ,HostListener} from '@angular/core';

@Component({
  selector: 'app-applies-jobs',
  templateUrl: './applies-jobs.component.html',
  styleUrls: ['./applies-jobs.component.css']
})
export class AppliesJobsComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any

  constructor() {

   }
   ngOnInit(): void {
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

}
