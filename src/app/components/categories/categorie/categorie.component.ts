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
  artikels:any
  candidates:any
  p: number = 1;

  constructor(private homeService:HomePageService) {}

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.candidates=data.candidates
      this.artikels=data.artikels      
    })
  }

  submit(){
    alert('ok')
  }
}


