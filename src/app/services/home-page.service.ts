import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }
  getInfoHomepage(): Observable<any> {
    return this.http.get('http://wp12.influid.nl/wp-json/custom/v1/homepage');
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
      return this.http.post(`http://wp12.influid.nl/wp-json/custom/v1/candidate/detail/?id=${id}`,{});
  }
  getDetailArticle(id:number | null):Observable<any>{
    return this.http.post(`http://wp12.influid.nl/wp-json/custom/v1/artikel/detail/?id=${id}`,{});
}
}
