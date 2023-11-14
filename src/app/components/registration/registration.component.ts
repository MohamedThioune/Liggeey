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
            this.message= "Votre compte utilisateur a été créé."
          }          
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
            this.route.navigate(['/courses']);
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
    const { password, name, username, email, firstName,lastName } = usager;
    if (firstName == "") {
      this.message.message = 'Le firstName est obligatoire';
      return false;
    }
    if (lastName == "") {
      this.message.message = 'Le lastName est obligatoire';
      return false;
    }
    if (name == "") {
      this.message.message = 'Le nom  est obligatoire';
      return false;
    }
    if (username == "") {
      this.message.message = 'Le prénom est obligatoire';
      return false;
    }
    if (email == "") {
      this.message.message = 'L\'email est obligatoire';
      return false;
    }
    if (this.form.controls['email'].status == "INVALID") {
      this.message.message = 'Vérifier le format du mail';
      return false;
    }
    if (password == "") {
      this.message.message = 'Le mot de passe est obligatoire';
      return false;
    }
    return true;
  }

  initForm() {
    this.form = this.formBuilder.group({
      password: this.formBuilder.control("", Validators.required),
      firstName: this.formBuilder.control("", Validators.required),
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
            this.message= "Votre compte utilisateur a été créé."
          }          
          ToastNotification.open({
            type: typeR,
            message: this.message
          });
          if (typeR == "success") {
            this.route.navigate(['/courses']);
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
  validateFormCompagny(usager: UsagerCompany): boolean {
    const { firstNameCompagny,lastNameCompagny, passwordCompagny, confirmPasswordCompagny, emailCompagny, phoneCompagny,bedrijf } = usager;
    if (firstNameCompagny == "") {
      this.message.message = 'Le firstName de la compagny est obligatoire';
      return false;
    }
    if (lastNameCompagny == "") {
      this.message.message = 'Le lastName de la compagny est obligatoire';
      return false;
    }
    if (emailCompagny == "") {
      this.message.message = 'L\'email de la compagny est obligatoire';
      return false;
    }
    if (this.form.controls['email'].status == "INVALID") {
      this.message.message = 'Vérifier le format du mail de votre compagny';
      return false;
    }
    if (passwordCompagny == "") {
      this.message.message = 'Le mot de passe est obligatoire';
      return false;
    }
    if (confirmPasswordCompagny == "") {
      this.message.message = 'La confirmation du password  est obligatoire';
      return false;
    }
    if (phoneCompagny == "") {
      this.message.message = 'Le numéro de tel est obligatoire';
      return false;
    }
    if (bedrijf == "") {
      this.message.message = 'Le num est obligatoire';
      return false;
    }

    return true;
  }
}
