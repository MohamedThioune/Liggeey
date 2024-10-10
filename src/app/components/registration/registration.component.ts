import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usager } from 'src/app/interfaces/usager';
import { UsagerCompany } from 'src/app/interfaces/usager-company';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  formCompagny!: FormGroup;
  countries:any;

  usager: Usager | undefined;
  message: any = {
    type: '',
    message: ''
  };
  canditate = false;
  employer = false;
  isCandidateActive: boolean = false;
  isEmployerActive: boolean = false;
  isLoading: boolean = false;
  selectedCountryCapital: string | null = null;
  selectedCountry:any;

  constructor(private usagerService: UsagerService, private formBuilder: FormBuilder, private route: Router,private homeService:HomePageService,private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.initForm();
    this.initFormCompagny();
    this.router.data.subscribe(data => {
      if (data['employer']) {
        this.showEmployer();
      } else {
        this.showCandidate();
      }
    });
    this.homeService.getCountries().subscribe(
      (data: any) => {
        this.countries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
      },
      (error) => {
        console.error('Error fetching countries', error);
      }
    );
  }
  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCountryName = selectElement.value;
    const selectedCountry = this.countries.find((country:any) => country.name.common === selectedCountryName);
    this.selectedCountryCapital = selectedCountry?.capital ? selectedCountry.capital[0] : 'No capital found';
    //this.form.patchValue({ city: this.selectedCountryCapital });
  }
showCandidate() {
  this.isCandidateActive = true;
  this.isEmployerActive = false;
  this.canditate = true;
  this.employer = false;
}

showEmployer() {
  this.isEmployerActive = true;
  this.isCandidateActive = false;
  this.canditate = false;
  this.employer = true;
}
  onSubmit(): void {
    this.isLoading = true;
    if (this.validateForm(this.form.value)) {
      this.usagerService.inscription(this.form.value).subscribe(
        usager => {
          let typeR = "error"
          if (<any>usager ) {
            typeR = "success";
            this.message= "Your user account has been created."
          }          
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          this.isLoading = false;
          if (typeR == "success") {
            this.route.navigate(['/login']);
            this.homeService.sendNotification(usager.id,this.notificationTalent(usager.id,this.form.value)).subscribe();
          }
        },
        error => {        
          ToastNotification.open({
            type: 'error',
            message: error.error.code
          });
          this.isLoading = false;
        });
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });      
      this.isLoading = false;
    }
  }
  validateForm(usager: Usager): boolean {
    const { password,password_confirmation , email, firstName,lastName } = usager;
    if (firstName == "") {
      this.message.message = 'FirstName is required';
      return false;
    }
    if (lastName == "") {
      this.message.message = 'LastName is required';
      return false;
    }

    if (email == "") {
      this.message.message = 'Email is required';
      return false;
    }
    if (this.form.controls['email'].status == "INVALID") {
      this.message.message = 'Check the email format';
      return false;
    }
    if (password == "") {
      this.message.message = 'Password is required';
      return false;
    }
    if (password_confirmation == "") {
      this.message.message = 'password Confirmation is required';
      return false;
    }
    if (password_confirmation !== password) {
      this.message.message = 'The password_confirmation must be the same as the password';
      return false;
    }
    return true;
  }
  notificationTalent(idUser:number,user:any):any{
    const notif={
      userApplyId:idUser,
      title:"Inscription as candidate to Liggéey",
      content: `
      Welcome to Liggéey, your account has been successfully created.<br>
      Here is your account information:<br>
      Username: ${user.email}<br>
      Password: what you already filled up<br>
      `,
      trigger:"Registration",
      receiver_id:null,
    }
    return notif;
}
notificationChief(idUser:number,user:any):any{
  const notif={
    userApplyId:idUser,
    title:"Inscription as employer to Liggéey",
    content: `
    Welcome to Liggéey, your account has been successfully created.<br>
    Here is your account information:<br>
    Username: ${user.emailCompagny}<br>
    Password: what you already filled up<br>
    Company: ${user.bedrijf}<br>
    `,
    trigger:"Registration",
    receiver_id:null,
  }
  return notif;
}

  initForm() {
    this.form = this.formBuilder.group({
      password: this.formBuilder.control("", Validators.required),
      password_confirmation: this.formBuilder.control("", Validators.required),
      firstName: this.formBuilder.control("", Validators.required),
      phone: this.formBuilder.control("", []),
      lastName: this.formBuilder.control("", Validators.required),
      name: this.formBuilder.control("", Validators.required),
      country: this.formBuilder.control("",[]),
      email: this.formBuilder.control("", [Validators.email, Validators.required]),
    });
  }
  initFormCompagny() {
    this.formCompagny = this.formBuilder.group({
      firstNameCompagny: this.formBuilder.control("", Validators.required),
      lastNameCompagny: this.formBuilder.control("", Validators.required),
      emailCompagny: this.formBuilder.control("", [Validators.email, Validators.required]),
      phoneCompagny: this.formBuilder.control("", []),
      passwordCompagny: this.formBuilder.control("", Validators.required),
      confirmPasswordCompagny: this.formBuilder.control("", Validators.required),
     bedrijf: this.formBuilder.control("", Validators.required),
    });
  }

  inscriptionCompagny():void{
    this.isLoading=true
    if (this.validateFormCompagny(this.formCompagny.value)) {
      this.usagerService.inscriptionCompagny(this.formCompagny.value).subscribe(
        usager => {
          let typeR = "error"
          if (<any>usager ) {
            typeR = "success";
            this.message= "Your user account has been created."
          }          
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          this.isLoading=false

          if (typeR == "success") {
            this.route.navigate(['/login']);
            this.homeService.sendNotification(usager.ID,this.notificationChief(usager.ID,this.formCompagny.value)).subscribe();
          }
        },
        error => {   
          console.log(error.error);
                           
          ToastNotification.open({
            type: 'error',
            message: error.error.errors.errors.existing_user_email
          });
          this.isLoading=false
        });
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
      this.isLoading=false
    }

  }
  validateFormCompagny(usager: UsagerCompany): boolean {
    const { firstNameCompagny,lastNameCompagny, passwordCompagny, confirmPasswordCompagny, emailCompagny,bedrijf } = usager;
    if (firstNameCompagny == "") {
      this.message.message = 'FirstName of Company is required';
      return false;
    }
    if (lastNameCompagny == "") {
      this.message.message = 'LastName of Company is required';
      return false;
    }
    if (emailCompagny == "") {
      this.message.message = 'Email of Company is required';
      return false;
    }
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailCompagny)) {    
    this.message.message = 'Check the email format of Company';
    return false;
  }
    if (passwordCompagny == "") {
      this.message.message = 'Password of Company';
      return false;
    }
    if (confirmPasswordCompagny == "") {
      this.message.message = 'Password confirmation is required';
      return false;
    }
    if (bedrijf=="") {
      this.message.message = 'Name of Company is mandatory';
      return false;
    }

    return true;
  }
}
