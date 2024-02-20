import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public get(url: string): Observable<any> {
    return this.http
      .get<any>(this.apiURL + url)
      .pipe(map((data) => data));
  }

}
