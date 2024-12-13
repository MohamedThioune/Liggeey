import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-detail-challenge',
  templateUrl: './detail-challenge.component.html',
  styleUrls: ['./detail-challenge.component.css']
})
export class DetailChallengeComponent implements OnInit {

  challenge:any
  loading:boolean=true;
  slug:any;
  userConnect:any;
  candidate=false
  company=false
  userObject:boolean =false
  step1:boolean=false
  step2:boolean=false
  step3:boolean=false
  allStep:boolean=false
  downloadLink!: string;
  username: string = '';
  password: string = '';
  isLoading = false;

  constructor(private homeService:HomePageService,private datePipe: DatePipe ,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    this.slug = this.route.snapshot.params['slug'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.company=true
      }
      this.userObject=true
    }      
    if(this.userConnect && this.userConnect.id && this.slug){
        this.homeService.getDetailChallengeWithUserID(this.slug,this.userConnect.id).subscribe((data:any)=>{
        this.challenge=data  
        //console.log( this.challenge.steps);
        const elementToCheck=1 || 3
        this.challenge.steps.forEach((element:any) => {          
          if (element==1) {
            this.step1 = !this.step1
          }else if(element==2){
            this.step2 = !this.step2
          }else if(element==3){
            this.step3 = !this.step3
          }
          const valuesToCheck = [1, 3]; // Les valeurs à vérifier
          if (valuesToCheck.every(value => this.challenge.steps.includes(value))) {
           // console.log('Le tableau contient toutes les valeurs:', valuesToCheck);
            this.allStep = true;
            console.log(this.challenge.steps);
          } else {
            console.log('Le tableau ne contient pas toutes les valeurs:', valuesToCheck);
          }          
        });
            // Input date string
        const inputDate = this.challenge.deadline;
    
        // Convert to a Date object
        const date = new Date(inputDate);
    
        // Extract date components
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
        const day = date.getDate();
        const hours = date.getHours();
    
        // Format the date
        const formattedDate = `${year} | ${month} ${day} | ${hours} hours `;
    
        this.challenge.deadline=formattedDate
        this.challenge.content=  this.challenge.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
        this.loading=false
        })
    }else{
      this.homeService.getDetailChallenge(this.slug).subscribe((data:any)=>{
      this.challenge=data          
          // Input date string
      const inputDate = this.challenge.deadline;

      // Convert to a Date object
      const date = new Date(inputDate);

      // Extract date components
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
      const day = date.getDate();
      const hours = date.getHours();

      // Format the date
      const formattedDate = `${year} | ${month} ${day} | ${hours} hours `;

      this.challenge.deadline=formattedDate
      this.challenge.content=  this.challenge.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      this.loading=false
      })
    }
    this.setDownloadLink();

  }
  setDownloadLink() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      // Safari browser
      this.downloadLink = 'https://apps.apple.com/nl/app/livelearn/id1666976386';
    } else if (userAgent.includes('chrome')) {
      // Android browser
      this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
    } else {
      // Default link or other browsers
      this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
    }
  }
  postSolution(challenge:any){

    if (!this.userConnect) {
      ToastNotification.open({
        type: 'error',
        message: 'Please log in first before posting your solution.'
      });

      return; 
    }else if(this.userConnect && this.userConnect.id && challenge.participants){
      challenge.participants.forEach((element:any) => {
        if (element.data.ID==this.userConnect.id) {
          ToastNotification.open({
            type: 'error',
            message: 'you can only post your challenge once.'
          });
        }
      });
    }else {
      this.router.navigate(['/add-challenge',challenge.post_slug])
    }
 
   }
   switchToApplyBlock() {
    this.isLoading = true;

    const user = {
      username: this.username,
      password: this.password
    }
    
    this.usagerService.connection(user).subscribe(
      (data:any) => {
        
        //const  token  = btoa(user.username + ':' + user.password);
        const token = btoa(unescape(encodeURIComponent((JSON.stringify(data)))));
      
        // Stockage dans le local storage
        this.usagerService.storeToken(token); 
        
          // Récupération du token depuis le local storage
          const storedToken = this.usagerService.getToken();
        if (storedToken ) {          
                    // Décodage de la base64
          const decodedToken = atob(storedToken);

          // Parse du JSON pour obtenir l'objet original
          const userObject = JSON.parse(decodedToken);
          if(userObject.acf.is_liggeey == "candidate"){          
            this.router.navigate(['/dashboard-candidat/'])
          } else if(userObject.acf.is_liggeey == "chief"){          
            this.router.navigate(['/dashboard-employer/']);
          }
          // Désactiver le loader
          this.isLoading = false;
        }else {
          ToastNotification.open({
            type: 'error',
            message: `Users cannot log in to the platform`
          });
          return;
        }
      },
      error =>{
        ToastNotification.open({
          type: 'error',
          message: "Incorrect username or password: make sure you have entered them correctly"
        });
        // Désactiver le loader
        this.isLoading = false;
       
      });
  }


}
