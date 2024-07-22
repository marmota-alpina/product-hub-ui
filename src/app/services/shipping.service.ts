import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FreightResponse, ShipmentCalculation} from "../models/shipment.model";
import {Product} from "../pages/product/product.model";
import {map, Observable, switchMap} from "rxjs";
import {environment} from "../../environments/environment";
import {ConfigurationService} from "./configuration.service";
import {DEFAULT_CONTRACT_KEY, SENDER_POSTAL_CODE_KEY} from "../models/configuration.model";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private http = inject(HttpClient);
  private freightApiUrl = environment.freightApiUrl;
  private senderPostalCode = "";
  private contractCode = "8ec38ad7-7a96-4027-a1b9-5d815b03719a";
  private configurationService = inject(ConfigurationService);
  private config = this.configurationService.getConfigurations()
    .pipe(map( configs => configs.filter(c =>
      c.key === DEFAULT_CONTRACT_KEY || c.key === SENDER_POSTAL_CODE_KEY)));

  getShippingCost(postal_code: string, product: Product): Observable<FreightResponse> {
    return this.config.pipe(
      switchMap( configs => {
        this.contractCode = configs.find(c => c.key === DEFAULT_CONTRACT_KEY)?.value ?? this.contractCode;
        this.senderPostalCode = configs.find(c => c.key === SENDER_POSTAL_CODE_KEY)?.value ?? this.senderPostalCode;
        return this.http.post<FreightResponse>(`${this.freightApiUrl}`, {
          weight: product.weight,
          dimensions: {
            height: product.height,
            width: product.width,
            length: product.length
          },
          contract_id: this.contractCode,
          origin_postal_code: this.senderPostalCode,
          destination_postal_code: postal_code,
          shipment_type: "ground"
        } as ShipmentCalculation);
      })
    )
  }

}
