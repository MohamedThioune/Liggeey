import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobCompagny } from '../interfaces/job-compagny';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }
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
  applyJob(idUser: number,idJob:number): Observable<any> { 
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: idJob,
    };   
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/apply/`,requestBody);
  }
  favoritesJob(idUser: number,idJob:number): Observable<any> {
    const requestBody = {
      userApplyId:idUser,
      jobAppliedId: "job",
      ID:idJob
    };    
    return this.http.post<any>("https://wp12.influid.nl/wp-json/custom/v1/favorites", requestBody);
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
  getCandidatCompagny(id: number): Observable<any> { 
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/favorites/?userApplyId=${id}`,{});
  }
  homeCompagny(id: number): Observable<any> { 
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
   
    };    
    return this.http.post<any>(`https://wp12.influid.nl/wp-json/custom/v1/user/postJob`,requestBody);
  }

}

