import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealDetectionService {
  apiURL:string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  detectMeal(image: File): Observable<any>{
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.httpClient.post(`${this.apiURL}/user/upload`, formData);
  }
}
