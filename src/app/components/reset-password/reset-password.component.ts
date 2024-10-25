import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private usagerService: UsagerService, private route: Router) { }
  passwordShow = false;
  emailShow =true;
  email:string='';
  emailReset: string = '';
  code: string = '';
  password: string = '';
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
   const email = this.email;
    this.usagerService.generateCode(email).subscribe(
      (data:any) => {
        if (data.data.status == 200) {    
          ToastNotification.open({
            type: 'success',
            message: data.message
          });             
          this.passwordShow = true;   
          this.emailShow = false;
          this.route.navigate(['/reset-password']);
        }else {
          ToastNotification.open({
            type: 'error',
            message: data.message
          });
          return;
        }
      },
      error =>{
        ToastNotification.open({
          type: 'error',
          message: error.error.message 
        });
       
      });
  }
  resetPassword(){
    const userResetPassword = {
       email : this.email,
       password : this.password,
       code : this.code,
    };    
    this.usagerService.resetPassword(userResetPassword).subscribe(
      (data:any)=>{
      if (data.data.status == 200) {    
        ToastNotification.open({
          type: 'success',
          message: data.message
        });  
        this.route.navigate(['/login']);
      }else {
        ToastNotification.open({
          type: 'error',
          message: data.message
        });
        return;
      }
    },
    error =>{
      console.log(error);
      
      ToastNotification.open({
        type: 'error',
        message:"error"
        //message: error.error.message
      });
     
    })

  
  }

  initForm() {
    this.email = '';
    this.password = '';
  }



}
