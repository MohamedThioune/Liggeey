import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get('https://www.livelearn.nl/wp-json/custom/v1/tags', { headers });

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
}
