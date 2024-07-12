import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Configuration} from "../models/configuration.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private apiUrl =  environment.configUrl;

  constructor(private http: HttpClient) {}

  getConfigurations(): Observable<Configuration[]> {
    return this.http.get<Configuration[]>(this.apiUrl);
  }

  getConfiguration(id: string): Observable<Configuration> {
    return this.http.get<Configuration>(`${this.apiUrl}/${id}`);
  }

  createConfiguration(configuration: Configuration): Observable<Configuration> {
    return this.http.post<Configuration>(this.apiUrl, configuration);
  }

  updateConfiguration(id: string, configuration: Configuration): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, configuration);
  }

  deleteConfiguration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getConfigurationByType(type: string): Observable<Configuration> {
    return this.http.get<Configuration[]>(`${this.apiUrl}/type/${type}`)
      .pipe( map( c => c[0] ?? null));
  }

  getConfigurationValue(type: string): Observable<string> {
    return this.getConfigurationByType(type).pipe(map(c => c?.value ?? ''));
  }
}
