import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {
  identifiant:number | null = 0;
  someArrayOfThings!:any


  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];

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

}
