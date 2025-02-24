import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePageService } from '../services/home-page.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Router } from '@angular/router';
import { Challenge } from '../interfaces/challenge';
import { Usager } from '../interfaces/usager';
import { Investor } from '../interfaces/investor';
import { UsagerService } from '../services/usager.service';
import { log } from 'console';

@Component({
  selector: 'app-investor-landing-page',
  templateUrl: './investor-landing-page.component.html',
  styleUrls: ['./investor-landing-page.component.css']
})
export class InvestorLandingPageComponent implements OnInit {
    form!: FormGroup;
    isLoading=false;
    message: any = {
      type: '',
      message: ''
    };
    userConnect:any;

  scrollToSection() {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor(private HomePageService: HomePageService,private router :Router,private fb: FormBuilder,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.initForm()
        // Récupération du token depuis le local storage
        const storedToken = this.usagerService.getToken();
 
        if (storedToken) {
                    // Décodage de la base64
          const decodedToken = atob(storedToken);
 
          // Parse du JSON pour obtenir l'objet original
          this. userConnect = JSON.parse(decodedToken);          
        }
  }
  onSubmit(){
    this.isLoading = true;
    // if (!this.userConnect) {
    //   ToastNotification.open({
    //     type: 'error',
    //     message: 'Please log in first before posting a investor.'
    //   });
    //   this.isLoading = false;

    //   return; 
    // }   
    if (this.validateFormJob(this.form.value)) {
        this.HomePageService.sendNotificationInvestor(5,this.accNotificationCand(5,this.userConnect.id,this.form.value))
        .subscribe(
          // Succès de la requête
             (response) => {
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.form.reset()
              }
              ToastNotification.open({
                type: typeR,
                message:response
              });
              this.isLoading=false
             },
                 // Gestion des erreurs
          (error) => {                        
            ToastNotification.open({
              type: 'error',
              message: error.errors
            }); 
            this.isLoading=false

          })
    }else{
      ToastNotification.open({
        type: 'error',
        message: 'Please enter the required fields'
      });
      this.isLoading=false
    }
  }
   initForm() {
      this.form = this.fb.group({
        lastName: this.fb.control("", Validators.required),
        firstName: this.fb.control("", Validators.required),
        email: this.fb.control("", [Validators.email, Validators.required]),
        phone: this.fb.control("", Validators.required),
        option: this.fb.control("", Validators.required),
        amount: this.fb.control("", Validators.required),
      });
    }
  
    accNotificationCand(idUser:number,idUser2:number,investor:any):any{
      const notif={
        userApplyId:idUser,
        title:"Get in touch with an investor  !",
        content: `
        <p>Hello Daniel,
          You have received a new notification concerning an investor<p>.<br> 
          <p><br>

          Last name: 
          First name: ${investor.firstName}
          Email: Email: ${investor.lastName}
          Telephone: [Telephone]: ${investor.phone}
          Option chosen: ${investor.option}
          Estimated amount: ${investor.amount}
          </p><br>

          Yours sincerely
        `,
        trigger:"A investor needs your attention ",
        receiver_id:idUser2,
      }
      return notif; 
    }

      validateFormJob(investor: Investor): boolean {
        const { firstName,lastName,email,phone,option,amount } = investor;
          
       const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {    
          this.message.message = 'Check your email format';
          return false;
        }
        else if (email == "") {
          this.message.message = 'Your email is mandatory';
          return false;
        }else if(phone == ""){
          this.message.message = 'Your phone is mandatory';
          return false;
        }else if(option == ""){
          this.message.message = 'Your option is mandatory';
          return false;
        }else if(amount == ""){
          this.message.message = 'Your amount is mandatory';
          return false;
        }
        return true;
      }
}
