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
<<<<<<< HEAD
=======
  isLoading: boolean = false;
>>>>>>> 95d89ae6564159b95ba903cc027eac4557f456ff

  constructor(private usagerService: UsagerService, private route: Router) { }
  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
<<<<<<< HEAD
=======
    this.isLoading = true;

>>>>>>> 95d89ae6564159b95ba903cc027eac4557f456ff
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.usagerService.connection(user).subscribe(
      (data:any) => {
        
        //const  token  = btoa(user.username + ':' + user.password);
        const token = btoa(JSON.stringify(data));
      
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
            this.route.navigate(['/dashboard-candidat/',userObject.id])
            // ToastNotification.open({
            //   type: 'success',
            //   message: "Thank you for logging in, your dashboard will be available soon"
            // });
          } else if(userObject.acf.is_liggeey == "chief"){          
            this.route.navigate(['/dashboard-employer/',userObject.id]);
          }
<<<<<<< HEAD
=======
          // Désactiver le loader
          this.isLoading = false;
>>>>>>> 95d89ae6564159b95ba903cc027eac4557f456ff
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
        ToastNotification.open({
          type: 'error',
          message: "Identifiant ou mot de passe incorrects: assurez vous de les avoir bien saisis "
        });
<<<<<<< HEAD
=======
        // Désactiver le loader
        this.isLoading = false;
>>>>>>> 95d89ae6564159b95ba903cc027eac4557f456ff
       
      });
  }

  initForm() {
    this.username = '';
    this.password = '';
  }
}
