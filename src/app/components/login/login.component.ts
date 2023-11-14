import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usagerService: UsagerService, private route: Router) { }
  username: string = '';
  password: string = '';
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.usagerService.connection(user).subscribe(
      (data:any) => {
        const  token  = btoa(user.username + ':' + user.password);
        if (token) {          
          this.usagerService.storeToken(token); 
         this.usagerService.getToken(); 
          console.log(this.usagerService.getToken());
          this.route.navigate(['/courses']);
        }else {
          console.log('noconnect');
          ToastNotification.open({
            type: 'error',
            message: `Les utilisateurs ne peuvent pas se connecter sur la plateforme`
          });
          return;
        }
      },
      error =>{
        console.log(error,user);
        ToastNotification.open({
          type: 'error',
          message: "Identifiant ou mot de passe incorrects: assurez vous de les avoir bien saisis "
        });
       
      });
  }

  initForm() {
    this.username = '';
    this.password = '';
  }
  fermerFormulaire() {
    // Placez ici le code pour fermer le formulaire, par exemple en masquant l'élément ou en effectuant d'autres actions nécessaires.
    console.log('Formulaire fermé');
  }
}
