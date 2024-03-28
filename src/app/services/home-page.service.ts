import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobCompagny } from '../interfaces/job-compagny';
import { Candidat } from '../interfaces/candidate';
import { CommentArticle } from '../interfaces/comment-article';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }
  private selectedJobIdSource = new Subject<string>();
  selectedJobId$ = this.selectedJobIdSource.asObservable();

  setSelectedJobId(jobId: string) {
    this.selectedJobIdSource.next(jobId);
  }
  getInfoHomepage(): Observable<any> {
    return this.http.get('https://wp12.influid.nl/wp-json/custom/v1/homepage');
  }
  getCategories(): Observable<any>{
    const base64Credentials = btoa("peinda" + ':' + "1234ok");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    return this.http.get('https://wp12.influid.nl/wp-json/custom/v1/tags', { headers });

  }
  getDetailCandidate(id:number | null):Observable<any>{
      return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/candidate/detail/?id=${id}`,{});
  }
  getAlertCandidat(id:number | null):Observable<any>{
    return this.http.post(`  https://wp12.influid.nl/wp-json/custom/v1/candidate/favorites/?userApplyId=${id}`,{});
}
  getDetailArticle(id:number | null):Observable<any>{
    return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/artikel/detail/?id=${id}`,{});
  }
  getAllCompagny():Observable<any>{
    return this.http.get('https://wp12.influid.nl/wp-json/custom/v1/companies',{  });
  }
  getDetailCompagny(id:number | null):Observable<any>{
    return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/company/detail/?id=${id}`,{});
  }
  getAllJob():Observable<any>{
    return this.http.get('https://wp12.influid.nl/wp-json/custom/v1/jobs',{  });
  }
  getDetailJob(id:number | null):Observable<any>{
    return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/job/?id=${id}`,{});
  }
  getDetailCategory(id:number | null):Observable<any>{
    return this.http.post(`https://wp12.influid.nl/wp-json/custom/v1/category/detail/?id=${id}`,{});
  }
  applyJob(idUser: number,idJob:string): Observable<any> { 
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: idJob,
    };   
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/apply/`,requestBody);
  }
  updateProfile(candidat:Candidat): Observable<any> { 
    const requestBody = {
      userApplyId:candidat.id,
      role:candidat.role,
      telnr:candidat.telnr,
      experience:candidat.experience,
      date_born:candidat.date_born,
      education_level:candidat.education_level,
      biographical_info:candidat.biographical_info,
      facebook:candidat.facebook,
      twitter:candidat.twitter,
      linkedin:candidat.linkedin,
      instagram:candidat.instagram,
      country:candidat.country,
      city:candidat.city
    };   
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/candidate/profil/update`,requestBody);
  }
  
  favoritesJob(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: "job",
      ID:idJob
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/favorites", requestBody);
  }
  trashFavoritesJob(idUser: string,idJob:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      userDeleteId: idJob,
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/trash/favourite", requestBody);
  }
  
  rejectCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: idJob,
      status:"reject"
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/application", requestBody);
  }
  approveCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: idJob,
      status:"approve"
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/application", requestBody);
  }
  
  favoritesCandidate(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: "candidate",
      ID:idJob
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/favorites", requestBody);
  }
  manageJob(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/jobs/?userApplyId=${id}`,{});
  }
  postNewJob(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/jobs/?userApplyId=${id}`,{});
  }
  getApplicantUser(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/applicants/?userApplyId=${id}`,{});
  }
  getSkillsCandidate(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/candidate/skillsPassport/?userApplyId=${id}`,{});
  }
  getCandidatCompagny(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/favorites/?userApplyId=${id}`,{});
  }
  homeCompagny(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/home/?userApplyId=${id}`,{});
  }
  homeCandidat(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/home/?userApplyId=${id}`,{});
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
      description: job.description,
      job_level_of_experience: job.job_level_of_experience,
      job_contract: job.job_contract,
      job_langues:job.job_langues,
      job_application_deadline:job. job_application_deadline,
      skills:job.skills
   
    };    
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/postJob`,requestBody);
  }
  postArticleComment(commment:CommentArticle,idUser: number,idPost:number): Observable<any> { 
    const requestBody = {
      id:idUser,
      course_id:idPost,
      stars: commment.rating,
      feedback_content: commment.feedback,  
    };    
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/artikel/comment`,requestBody,{});
  }
  

  profilJob(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/profil?userApplyId=${id}`,{});
  }
  appliesJob(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/candidate/applieds?userApplyId=${id}`,{});
  }

  editJob(job:any,userApplyId: number): Observable<any> { 
    const requestBody = {
      userApplyId:userApplyId,
      ID:job.ID,
      description: job.description,
      job_level_of_experience: job.job_level_of_experience,
      job_langues:job.job_langues,
      expired_at:job.expired_at,
      skills:job.skills
   
    };    
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/editJob?userApplyId=${userApplyId}&jobID=${requestBody.ID}&description=${requestBody.description}&job_level_of_experience=${requestBody.job_level_of_experience}&skills=${requestBody.skills}&job_langues=${requestBody.job_langues}&job_expiration_date=${requestBody.expired_at}`,requestBody);
  }
}

