import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddressModel } from "../models/address.model";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private http = inject(HttpClient)
  private apiUrl = environment.addressApiUrl

  getAddress(cep: string): Observable<AddressModel> {
    return this.http.get<AddressModel>(`${this.apiUrl}/postal/${cep}`);
  }
}
