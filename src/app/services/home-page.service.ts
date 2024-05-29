import { HttpClient,HttpHeaders,HttpResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobCompagny } from '../interfaces/job-compagny';
import { Candidat } from '../interfaces/candidate';
import { CommentArticle } from '../interfaces/comment-article';
import { Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProfilCompagny } from '../interfaces/profil-compagny';
import { Notification } from '../interfaces/notification';
import { Education } from '../interfaces/education';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private cachedJobs: any[] = [];
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  private selectedJobIdSource = new Subject<string>();
  private selectedSlugSource = new Subject<string>();
  selectedJobId$ = this.selectedJobIdSource.asObservable();
  selectedSlug$ = this.selectedSlugSource.asObservable();

  setSelectedJobId(jobId: string, slug: string) {
    this.selectedJobIdSource.next(jobId);
    this.selectedSlugSource.next(slug);
  }
  private candidatIdSource = new Subject<number>();
  candidatId$ = this.candidatIdSource.asObservable();
  setCandidatId(id: number) {
    this.candidatIdSource.next(id);
  }
  // on va mettre les données en cache
  getInfoHomepage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wp-json/custom/v1/homepage`)
    // const cachedData = localStorage.getItem('homepageData');
    // if (cachedData) {
    //   return new Observable(observer => {
    //     observer.next(JSON.parse(cachedData));
    //     observer.complete();
    //   });
    // } else {
    //   return this.http.get(`${this.baseUrl}/wp-json/custom/v1/homepage`).pipe(
    //     map((data: any) => {
    //       localStorage.setItem('homepageData', JSON.stringify(data));
    //       return data;
    //     })
    //   );
    // }
  }
  getCategories(): Observable<any>{
    const base64Credentials = btoa("peinda" + ':' + "1234ok");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',

    });
    return this.http.get(`${this.baseUrl}/wp-json/custom/v1/tags`, { headers });

  }
  getDetailCandidate(id:number | null):Observable<any>{
      return this.http.post(`${this.baseUrl}/wp-json/custom/v1/candidate/detail/?id=${id}`,{});
  }

  getNotificationCandidat(id:number | null):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/notification/list/?userApplyId=${id}`,{});
}
  getAlertCandidat(id:number | null):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/candidate/favorites/?userApplyId=${id}`,{});
}
  getDetailArticle(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/artikel/detail/?slug=${id}`,{});
  }
  getAllCompagny():Observable<any>{
    return this.http.get(`${this.baseUrl}/wp-json/custom/v1/companies`,{  });
  }
  getDetailCompagny(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/company/detail/?slug=${id}`,{});
  }


  getAllJob(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wp-json/custom/v1/jobs`,{});
    //return this.http.get(`https://wp12.influid.nl/wp-json/custom/v1/jobs`,{});
    
    // Vérifier si les données sont en cache
    if (this.cachedJobs.length > 0) {
      return of(this.cachedJobs);
    } else {
      const url = `${this.baseUrl}/wp-json/custom/v1/jobs`;
      const options = {
        observe: 'response' as const,
        cache: true,
      };
      return this.http.get<any[]>(url, options).pipe(
        tap((response: HttpResponse<any[]>) => {
          this.cachedJobs = response.body || [];
        }),
        map((response: HttpResponse<any[]>) => response.body || []),
        catchError(error => {
          console.error('Erreur lors de la récupération des emplois :', error);
          return of([]);
        })
      );
    }
  }



  getDetailJob(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/job/?slug=${id}`,{});
    //return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/job?slug=${id}`,{});
  }
  
  getDetailCategory(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/wp-json/custom/v1/category/detail/?slug=${id}`,{});
  }
  applyJob(idUser: number,idJob:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: idJob,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/apply/`,requestBody);
  }
  updateProfile(idUser:string,candidat:any): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      role:candidat.work_as,
      mobile_phone:candidat.mobile_phone,
      experience:candidat.experience,
      age:candidat.age,
      date_born:candidat.date_born,
      education_level:candidat.education_level,
      biographical_info:candidat.biographical_info,
      language:candidat.language,
      facebook:candidat.facebook,
      twitter:candidat.twitter,
      linkedin:candidat.linkedin,
      instagram:candidat.instagram,
      country:candidat.country,
      city:candidat.city,
      adress:candidat.adress
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/profil/update`,requestBody);
  }
  getImageUser(file: File):Observable<any>{
    const base64Credentials = btoa("mbayamemansor@gmail.com" + ':' + "hidden");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
   

    });
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/wp-json/wp/v2/media/`,formData, { headers });
}

uploadFile(imageId:string ,userId: string): Observable<any> {
  const base64Credentials = btoa("mbayamemansor@gmail.com" + ':' + "hidden");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',

    });
  const requestBody = {
    acf:{
      "profile_img":imageId
    },
  };
  return this.http.post(`${this.baseUrl}/wp-json/wp/v2/users/${userId}`,requestBody,{headers});
}
uploadFileCv(imageId:string,userId: string ): Observable<any> {
  const base64Credentials = btoa("mbayamemansor@gmail.com" + ':' + "hidden");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',

    });
  const requestBody = {
    acf:{
      "cv":imageId
    },
  };
  return this.http.post(`${this.baseUrl}/wp-json/wp/v2/users/${userId}`,requestBody,{headers});
}
getFileCv(cvId:string ): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',

  });
  return this.http.get(`${this.baseUrl}/wp-json/wp/v2/media/${cvId}`, { responseType: 'json' });
}
getPDF(cvId : string): Observable<Blob>
  {
      const base64Credentials = btoa("mbayamemansor@gmail.com" + ':' + "hidden");
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      "Authorization": 'Basic ' + base64Credentials, responseType : 'blob'});

      return this.http.get<Blob>(`${this.baseUrl}/wp-json/wp/v2/media/${cvId}`, { headers : headers,responseType : 
        'blob' as 'json'});

  }

  updateProfileCompany(idUser:string,profil:ProfilCompagny): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      company_bio:profil.biography,
      company_address:profil.address,
      company_place:profil.place,
      company_country:profil.country,
      company_website:profil.website,
      company_size:profil.size,
      company_sector:profil.sector,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/profil/update`,requestBody);
  }
  sendNotification(idUser:number,notification:Notification): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      title:notification.title,
      content:notification.content,
      trigger:notification.trigger,
      receiver_id:notification.receiver_id,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/notification/create`,requestBody);
  }

  favoritesJob(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      typeApplyId: "job",
      ID:idJob
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/favorites`, requestBody);
  }
  favoritesCandidat(idUser: number,idCandidat:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      typeApplyId: "candidate",
      ID:idCandidat
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/favorites`, requestBody);}
  getCountries() {
   return this.http.get<any>("https://restcountries.com/v3.1/all");
  }

  trashFavoritesJob(idUser: number,idJob:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      userJobId: idJob,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/trash/job`, requestBody);
  }
  trashFavoritesCandidat(idUser: number,idCandidat:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      userDeleteId: idCandidat,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/trash/favourite`, requestBody);
  }
  rejectCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApproveId:idUser,
      jobAppliedId: idJob,
      status:"reject"
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/application`, requestBody);
  }
  approveCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApproveId:idUser,
      jobAppliedId: idJob,
      status:"approve"
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/application`, requestBody);
  }

  favoritesCandidate(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      typeApplyId: "candidate",
      ID:idJob
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/favorites`, requestBody);
  }
  manageJob(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/jobs/?userApplyId=${id}`,{});
  }
  postNewJob(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/jobs/?userApplyId=${id}`,{});
  }
  getApplicantUser(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/applicants/?userApplyId=${id}`,{});
  }
  getSkillsCandidate(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/skillsPassport/?userApplyId=${id}`,{});
  }
  getCandidatCompagny(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/favorites/?userApplyId=${id}`,{});
  }
  homeCompagny(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/home/?userApplyId=${id}`,{});
  }
  homeCandidat(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/home/?userApplyId=${id}`,{});
  }
  getOffsetFromNow(date: Date): number {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const offsetMilliseconds = targetDate.getTime() - currentDate.getTime();
    const offsetSeconds = Math.floor(offsetMilliseconds / 1000);
    const offsetMinutes = Math.floor(offsetSeconds / 60);
    const offsetHours = Math.floor(offsetMinutes / 60);
    return offsetHours;
  }
  postJob(job:JobCompagny,userApplyId: number): Observable<any> {
    const requestBody = {
      userApplyId:userApplyId,
      title:job.title,
      job_description: job.description,
      job_level_of_experience: job.job_level_of_experience,
      job_contract: job.job_contract,
      job_langues:job.job_langues,
      job_application_deadline:job. job_application_deadline,
      skills:job.skills

    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/postJob`,requestBody);
  }
  postArticleComment(commment:CommentArticle,idUser: number,idPost:number): Observable<any> {
    const requestBody = {
      id:idUser,
      course_id:idPost,
      stars: commment.rating,
      feedback_content: commment.feedback,
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/artikel/comment`,requestBody);
  }
  addSkill(idUser: number,idTopic:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      topic_id:idTopic,

    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/skill`,requestBody,{});
  }
  myResumeAdd(idUser: number,education:Education): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      school:education.school,
      degree:education.degree,
      start_date:education.start_date,
      end_date:education.end_date,
      commentary:education.commentary,
      job_title:education.job_title,
      company:education.company,
      work_start_date:education.work_start_date,
      work_end_date:education.work_end_date,
      work_description:education.work_description,
      title:education.title,
      description:education.description,
      date:education.date
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/myResume/add`,requestBody,{});
  }
  deleteResume(userApplyId: number, index: number): Observable<any> {
    // Check if userApplyId is defined before converting to string
    const userApplyIdString = userApplyId ;
  
    let params = new HttpParams()
      .set('userApplyId', userApplyIdString) // Use the converted string or an empty string
      .set('field_type', "education")
      .set('delete_education',index)
    //   .set('delete_award',index)
       //.set('delete_work',index);
  
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/myResume/delete`,   params );
  }
  deleteResumeExperience(userApplyId: number, index: number): Observable<any> {
    // Check if userApplyId is defined before converting to string
    const userApplyIdString = userApplyId ;
  
    let params = new HttpParams()
      .set('userApplyId', userApplyIdString) // Use the converted string or an empty string
      .set('field_type', "work")
      //.set('delete_education',index)
    //   .set('delete_award',index)
       .set('delete_work',index);
  
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/myResume/delete`,   params );
  }
  
  updateResume(idUser: string, education: Education,index:number): Observable<any> {
    const requestBody = {
      education_index:index,
      work_index:index,
      userApplyId:idUser,
      school:education.school,
      degree:education.degree,
      start_date:education.start_date,
      end_date:education.end_date,
      commentary:education.commentary,
      job_title:education.job_title,
      company:education.company,
      work_start_date:education.work_start_date,
      work_end_date:education.work_end_date,
      work_description:education.work_description,
      title:education.title,
      description:education.description,
      date:education.date
    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/myResume/update`,requestBody,{});

  }
  
  profilJob(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/profil?userApplyId=${id}`,{});
  }
  appliesJob(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/candidate/applieds?userApplyId=${id}`,{});
  }

  editJob(job:any,userApplyId: number): Observable<any> {
    const requestBody = {
      userApplyId:userApplyId,
      ID:job.ID,
      description: job.description,
      level_of_experience: job.level_of_experience,
      langues:job.langues,
      expired_at:job.expired_at,
      skills:job.skills

    };
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/editJob?userApplyId=${userApplyId}&jobID=${requestBody.ID}&job_description=${requestBody.description}&job_level_of_experience=${requestBody.level_of_experience}&skills=${requestBody.skills}&job_langues=${requestBody.langues}&job_expiration_date=${requestBody.expired_at}`,requestBody);
  }
  deleteJob(jobID:number,userApplyId:number){
    return this.http.post<any>(`${this.baseUrl}/wp-json/custom/v1/user/deleteJob?userApplyId=${userApplyId}&jobID=${jobID}`,{})
  }
}

