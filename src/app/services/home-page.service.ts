import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobCompagny } from '../interfaces/job-compagny';
import { Candidat } from '../interfaces/candidate';
import { CommentArticle } from '../interfaces/comment-article';
import { Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProfilCompagny } from '../interfaces/profil-compagny';
import { Notification } from '../interfaces/notification';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private cachedJobs: any[] = [];
  private baseUrl = 'https://wp12.influid.nl/wp-json/custom/v1/';
  constructor(private http: HttpClient) { }
  private selectedJobIdSource = new Subject<string>();
  selectedJobId$ = this.selectedJobIdSource.asObservable();

  setSelectedJobId(jobId: string) {
    this.selectedJobIdSource.next(jobId);
  }
  // on va mettre les données en cache
  getInfoHomepage(): Observable<any> {
    const cachedData = localStorage.getItem('homepageData');
    if (cachedData) {
      return new Observable(observer => {
        observer.next(JSON.parse(cachedData));
        observer.complete();
      });
    } else {
      return this.http.get('https://wp12.influid.nl/wp-json/custom/v1/homepage').pipe(
        map((data: any) => {
          localStorage.setItem('homepageData', JSON.stringify(data));
          return data;
        })
      );
    }
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


  getAllJob(): Observable<any[]> {
    // Vérifier si les données sont en cache
    if (this.cachedJobs.length > 0) {
      return of(this.cachedJobs);
    } else {
      const url = 'https://wp12.influid.nl/wp-json/custom/v1/jobs';
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
  updateProfile(idUser:string,candidat:Candidat): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
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
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/profil`,requestBody);
  }
  sendNotification(idUser:number,notification:Notification): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      title:notification.title,
      content:notification.content,
      trigger:notification.trigger,
      receiver_id:notification.receiver_id,
    };
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/notification/create`,requestBody);
  }

  favoritesJob(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      typeApplyId: "job",
      ID:idJob
    };
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/favorites", requestBody);
  }
  trashFavoritesJob(idUser: number,idJob:string): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      userJobId: idJob,
    };
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/trash/favourite", requestBody);
  }

  rejectCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApproveId:idUser,
      jobAppliedId: idJob,
      status:"reject"
    };
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/application", requestBody);
  }
  approveCandidatByCompany(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApproveId:idUser,
      jobAppliedId: idJob,
      status:"approve"
    };
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/user/application", requestBody);
  }

  favoritesCandidate(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      typeApplyId: "candidate",
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
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/candidate/home/?userApplyId=${id}`,{});
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
  deleteJob(jobID:number,userApplyId:number){
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/deleteJob?userApplyId=${userApplyId}&jobID=${jobID}`,{})
  }
}

