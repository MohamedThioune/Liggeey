import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { Router } from '@angular/router';
declare var hbspt: any; // Déclare la bibliothèque HubSpot Forms
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesTab:any
  candidatsTab:string[]=[]
  topics:any
  sub:any
  categories:any;
  candidates:any;
  article:any;
  //jobs:any;
  descr:any;
  activeTab: string = 'all';
  currentCategories: any[] = [];
  date:any;
  userConnect:any;
  candidate=false;
  compagny=false;
  searchTitle:string="";
  loading=true;
  selectedCandidateIndex = 0;
  constructor(private homeService:HomePageService,private usagerService: UsagerService,private datePipe: DatePipe, private router: Router
    ) {

  }

  ngOnInit(): void {
    //this.loadHubspotForm();

     // Récupération du token depuis le local storage
     const storedToken = this.usagerService.getToken();

     if (storedToken) {
                 // Décodage de la base64
       const decodedToken = atob(storedToken);

       // Parse du JSON pour obtenir l'objet original
       this. userConnect = JSON.parse(decodedToken);
       if(this.userConnect.acf.is_liggeey == "candidate"){
         this.candidate=true
       } else if(this.userConnect.acf.is_liggeey == "chief"){
         this.compagny=true
       }
     }
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.article=data.artikels      
      this.currentCategories=data.jobs
      this.loading=false;
      this.currentCategories.forEach(element => {
        element.description= element.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      });

    //  this.candidatsTab.push("../../../assets/img/fadel.jpg","../../../assets/img/khadim.jpg","assets/img/danel.jpg","assets/img/seydou.jpg","../../../assets/img/selle.jpeg")
      this.article[0].post_title =   this.article[0].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[0].short_description =   this.article[0].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '').replace(/<(?!br\s*\/?)[^>]+>/g, '') // Remove all tags except <br>;
      this.article[1].post_title =   this.article[1].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[1].short_description =   this.article[1].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '').replace(/<(?!br\s*\/?)[^>]+>/g, '') // Remove all tags except <br>;
      this.article[2].short_description =   this.article[2].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')  .replace(/<(?!br\s*\/?)[^>]+>/g, '') // Remove all tags except <br>;
      this.article[2].post_title =   this.article[2].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')  .replace(/<(?!br\s*\/?)[^>]+>/g, '') // Remove all tags except <br>;
    })
    this.homeService.getCategories().subscribe((data:any)=>{
      this.categoriesTab=data.categories;
      this.topics=data.topics;
      this.sub=data.sub      
      //this.currentCategories=this.categories
    })

    this.homeService.getCandidates().subscribe((data:any)=>{
      this.candidates=data.candidates      
    })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      (window as any).hbspt.forms.create({
        portalId: '27242849',
        formId: '8352015f-1898-47fe-a743-8c7e1a43e0f5',
        target: '#hubspot-form'
      });
    }, 1000); // Ajustez le délai si nécessaire
  }
  isPopupVisible: boolean = false;
  isLoading: boolean = false;

//   showPopup() {
//     this.isPopupVisible = true;

//     // Utiliser un délai pour s'assurer que l'élément DOM est visible
//     setTimeout(() => {
//         if ((window as any).hbspt) {
//             (window as any).hbspt.forms.create({
//                 region: "na1",
//                 portalId: "27242849",
//                 formId: "8352015f-1898-47fe-a743-8c7e1a43e0f5",
//                 target: "#hubspot-form"
//             });
//         }
//     }, 100); // 100 ms pour que le DOM soit prêt
// }
showPopup() {
  this.isPopupVisible = true;
  this.isLoading = true;

  // Charger le formulaire HubSpot
  setTimeout(() => {
    if ((window as any).hbspt) {
      (window as any).hbspt.forms.create({
        region: "na1",
        portalId: "27242849",
        formId: "8352015f-1898-47fe-a743-8c7e1a43e0f5",
        target: "#hubspot-form",
        onFormReady: () => {
          this.isLoading = false; // Arrêter le chargement une fois que le formulaire est prêt
        }
      });
    }
  }, 100); // Retard pour s'assurer que le DOM est prêt
}


  hidePopup() {
    this.isPopupVisible = false;
  }
  
  loadHubspotForm(): void {
    this.loadHubspotScript()
      .then(() => {
        (window as any).hbspt.forms.create({
          portalId: '27242849',
          formId: '8352015f-1898-47fe-a743-8c7e1a43e0f5',
          target: '#hubspot-form'
        });
      })
      .catch(error => console.error(error));
  }
  
  loadHubspotScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).hbspt) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject('Error loading HubSpot script');
      document.body.appendChild(script);
    });
  }
  
  
  redirectToWhatsApp(){
    this.homeService.redirectToWhatsApp()
  }
  // send_id(id: any) {
  //   this.homeService.setCandidatId(id);
  //   localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
  //   this.router.navigate(['/detail-candidat'])
  //     .then(() => {
  //       window.location.reload();
  //     });
  // }
  navigateToDetail(id: any) {
  this.router.navigate(['detail-candidat'], { state: { id } });
}

  selectCandidate(index: number) {
    this.selectedCandidateIndex = index;
  }

  changeTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'all') {
      this.currentCategories = this.categoriesTab;
    } else if (tab === 'mainCategories') {
      this.currentCategories = this.categoriesTab;
    } else if (tab === 'topics') {
      this.currentCategories = this.topics;
    } else if (tab === 'sub') {
      this.currentCategories = this.sub;
    }
  }


}
