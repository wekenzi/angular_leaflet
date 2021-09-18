import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor(private http:HttpClient) { }

  GetHospitals():Observable<any>{
    return this.http.get<any>(`./assets/hospitals.json`)
    // .pipe(map(x => x.data))
  }

  GetSchools():Observable<any>{
    return this.http.get<any>(`./assets/schools.json`)
    // .pipe(map(x => x.data))
  }

}
