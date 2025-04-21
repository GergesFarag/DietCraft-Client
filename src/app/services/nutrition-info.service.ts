import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { INutrients } from "../models/INutrients";

@Injectable({
  providedIn: "root",
})
export class NutritionInfoService {
  apiURL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getNutritionInfo(
    foodName: string
  ): Observable<{ message: string; data: INutrients }> {
    {
      return this.http.get<{ message: string; data: INutrients }>(
        `${this.apiURL}/nutrients?item=${foodName}`
      );
    }
  }
}
