import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentArticle } from 'src/app/interfaces/comment-article';
import { HomePageService } from 'src/app/services/home-page.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  identifiant:number | null = 0;
  article:any
  message: any = {
    type: '',
    message: ''
  };
  form!:FormGroup;
  userConnect:any;
  public href: string = "";

  constructor(private router: Router , private homeService:HomePageService,private fb: FormBuilder,private route : ActivatedRoute ,private HomePageService: HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {

    this.initForm()
    this.href = this.router.url;
   // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.initForm()
    this.identifiant = +this.route.snapshot.params['id'];  
      
    this.HomePageService.getDetailArticle( this.identifiant).subscribe(data=>{
      this.article=data  
      console.log(this.article);
       
      this.article.title =   this.article.title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article.content =   this.article.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
         
    })
  }
  postArticleComment(){
      // Utilisez le service pour postuler à l'emploi
      console.log(this.form.value,this.article.ID);
    
      if (this.validateFormJob(this.form.value)) {
  
      this.homeService.postArticleComment(this.form.value,this.userConnect.id,this.article.ID)
        .subscribe(
          // Succès de la requête
          (response) => {
  
            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Comment created successfully."
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            if (typeR == "success") {
              this.router.navigate(['/blog']);
            }
          },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            });
          }
        );
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
    }
 
   }
  initForm() {
    this.form = this.fb.group({
      rating: this.fb.control("", Validators.required),
      feedback: this.fb.control("", Validators.required),
    });
  }
  validateFormJob(comment: CommentArticle): boolean {
    const { rating, feedback } = comment;
 
    if (feedback == "") {
      this.message.message = 'Feedback  is mandatory';
      return false;
    }
    return true;
  }
}
