import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  artikels:any;
  categories:any;
  searchTitle: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';
  constructor(private homeService:HomePageService) { }
  skillsTabs:any=[   
    {
      "cat_ID": 590,
      "cat_name": "Afas",
      "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
      "open_position": 0
  },
  {
      "cat_ID": 589,
      "cat_name": "Freshworks",
      "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
      "open_position": 0
  },
  {
      "cat_ID": 633,
      "cat_name": "Google",
      "cat_image": "https://livelearn.nl/wp-content/uploads/2024/04/google.png",
      "open_position": 0
  },
  {
    "cat_ID": 587,
    "cat_name": "Google Workspace",
    "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
    "open_position": 0
},
{
    "cat_ID": 640,
    "cat_name": "HubSpot",
    "cat_image": "https://livelearn.nl/wp-content/uploads/2024/04/hubspot_logo.jpeg",
    "open_position": 0
},
{
    "cat_ID": 593,
    "cat_name": "Microsoft 360",
    "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
    "open_position": 0
},
{
  "cat_ID": 634,
  "cat_name": "Odoo",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
{
  "cat_ID": 588,
  "cat_name": "Salesforce",
  "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
  "open_position": 0
},
{
  "cat_ID": 641,
  "cat_name": "Exact",
  "cat_image": "https://livelearn.nl/wp-content/uploads/2024/05/Exact.jpeg",
  "open_position": 0
},
// {
//   "cat_ID": 636,
//   "cat_name": "web-programming",
//   "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
//   "open_position": 0
// },
// {
//   "cat_ID": 637,
//   "cat_name": "Webflow",
//   "cat_image": "https://livelearn.nl/wp-content/themes/fluidify-child/img/placeholder.png",
//   "open_position": 0
// },
    
    ]
  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.artikels=data.artikels
      this.categories=data.categories      
      this.artikels.forEach((article:any) => {
        article.title =   article.title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        article.short_description = article.short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');  
      });
          
    })
  }
  get filteredJobs() {
    if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
      return this.artikels.filter((job:any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.post_title.toLowerCase().includes(this.searchTitle.toLowerCase());
        //const placeMatch = this.searchLocation.trim() === '' || job.country.toLowerCase().includes(this.searchLocation.toLowerCase());
        return titleMatch 
      });
    } else {
      return this.artikels;
    }
    
  }

}
