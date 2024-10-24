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
  isLoading: boolean = false;
  passwordFieldType: string = 'password'; // Default to 'password'

  constructor(private usagerService: UsagerService, private route: Router) { }
  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
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
            this.route.navigate(['/dashboard-candidat/'])
            // ToastNotification.open({
            //   type: 'success',
            //   message: "Thank you for logging in, your dashboard will be available soon"
            // });
          } else if(userObject.acf.is_liggeey == "chief"){          
            this.route.navigate(['/dashboard-employer/']);
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

  togglePasswordVisibility() {
    // Toggle the field type between 'password' and 'text'
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  initForm() {
    this.username = '';
    this.password = '';
  }
}
