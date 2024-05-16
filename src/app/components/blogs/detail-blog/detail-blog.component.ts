import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentArticle } from 'src/app/interfaces/comment-article';
import { HomePageService } from 'src/app/services/home-page.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { UsagerService } from 'src/app/services/usager.service';
import { error } from 'jquery';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  slug:any;
  article:any;
  comments:any;
  loading:boolean=true;
  message: any = {
    type: '',
    message: ''
  };
  form!:FormGroup;
  userConnect:any;
  public href: string = "";
  isLoading: boolean = false;

  constructor(private router: Router , private homeService:HomePageService,private fb: FormBuilder,private route : ActivatedRoute ,private HomePageService: HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {

    this.initForm()
    this.href = window.location.href;
   // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.initForm()
    this.slug = this.route.snapshot.params['slug'];  
      
    this.HomePageService.getDetailArticle( this.slug).subscribe(data=>{
      this.article=data;
      console.log(this.article);
      
      this.loading=false;
      this.comments=this.article.comments;         
      this.article.title =   this.article.title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
    //  this.article.content = this.article.content.replace(/<[^>]*>|[#&]/g, '');
      console.log(this.comments);
      
         
    })
  }
  postArticleComment(){
    this.isLoading = true;

    if (!this.userConnect) {
      ToastNotification.open({
        type: 'error',
        message: 'Please log in first before posting a comment.'
      });
      this.isLoading = false;

      return; 
    }
      console.log(this.form.value,this.article.ID,this.userConnect.id);
    
      if (this.validateFormJob(this.form.value)) {
  
      this.homeService.postArticleComment(this.form.value,this.userConnect.id,this.article.ID)
        .subscribe(
          // Succès de la requête
          (response) => {
  
            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Comment created successfully."
              this.form.reset()
              console.log(response);
            }
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            this.isLoading = false;

            if (typeR == "success") {
              //this.router.navigate(['/blog']);
            }
          },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: 'Creation of comment failed'
            });
            this.isLoading = false;
          }
        );
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message      
      });
      this.isLoading = false;
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
    if (rating == "") {
      this.message.message = 'Rating  is mandatory';
      return false;
    }
    return true;
  }
}
