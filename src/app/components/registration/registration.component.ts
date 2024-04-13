import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usager } from 'src/app/interfaces/usager';
import { UsagerCompany } from 'src/app/interfaces/usager-company';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  formCompagny!: FormGroup;
  
  usager: Usager | undefined;
  message: any = {
    type: '',
    message: ''
  };
  canditate = true;
  employer = false;
  constructor(private usagerService: UsagerService, private formBuilder: FormBuilder, private route: Router) { }
  ngOnInit(): void {
    this.initForm();
    this.initFormCompagny();

  }
  showCandidate(){
    this.canditate = true;
    this.employer = false;
  }
  showEmployer(){
    this.canditate = false;
    this.employer = true;
  }
  onSubmit(): void {
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
          if (typeR == "success") {
            this.route.navigate(['/login']);
          }
        },
        error => {          
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
        });
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
    }
  }
  validateForm(usager: Usager): boolean {
    const { password,password_confirmation ,name, username, email, firstName,lastName } = usager;
    if (firstName == "") {
      this.message.message = 'FirstName is required';
      return false;
    }
    if (lastName == "") {
      this.message.message = 'LastName is required';
      return false;
    }
    if (name == "") {
      this.message.message = 'Name is required';
      return false;
    }
    if (username == "") {
      this.message.message = 'First name is required';
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

  initForm() {
    this.form = this.formBuilder.group({
      password: this.formBuilder.control("", Validators.required),
      password_confirmation: this.formBuilder.control("", Validators.required),
      firstName: this.formBuilder.control("", Validators.required),
      phone: this.formBuilder.control("", []),
      lastName: this.formBuilder.control("", Validators.required),
      name: this.formBuilder.control("", Validators.required),
      username: this.formBuilder.control("", Validators.required),
      email: this.formBuilder.control("", [Validators.email, Validators.required]),
    });
  }
  initFormCompagny() {
    this.formCompagny = this.formBuilder.group({
      firstNameCompagny: this.formBuilder.control("", Validators.required),
      lastNameCompagny: this.formBuilder.control("", Validators.required),
      emailCompagny: this.formBuilder.control("", [Validators.email, Validators.required]),
      phoneCompagny: this.formBuilder.control("", Validators.required),
      passwordCompagny: this.formBuilder.control("", Validators.required),
      confirmPasswordCompagny: this.formBuilder.control("", Validators.required),
      bedrijf: this.formBuilder.control("", Validators.required),
    });
  }

  inscriptionCompagny():void{
    console.log(this.formCompagny.value);
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
          if (typeR == "success") {
            this.route.navigate(['/login']);
          }
        },
        error => { 
          console.log(error.error);
                   
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
        });
    } else {
      console.log(this.message);
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
    }

  }
  validateFormCompagny(usager: UsagerCompany): boolean {
    const { firstNameCompagny,lastNameCompagny, passwordCompagny, confirmPasswordCompagny, emailCompagny, phoneCompagny,bedrijf } = usager;
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
    if (this.form.controls['email'].status == "INVALID") {
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
    if (phoneCompagny == "") {
      this.message.message = 'Phone of company is required';
      return false;
    }
    if (bedrijf == "") {
      this.message.message = 'bedrijf is required';
      return false;
    }

    return true;
  }
}
