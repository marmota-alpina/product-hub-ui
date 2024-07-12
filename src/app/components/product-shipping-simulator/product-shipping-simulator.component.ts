import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddressService} from "../../services/address.service";
import {EMPTY, Observable, of} from "rxjs";
import {AddressModel} from "../../models/address.model";
import {ShippingService} from "../../services/shipping.service";
import {Product} from "../../pages/product/product.model";
import {FreightResponse} from "../../models/shipment.model";

@Component({
  selector: 'app-product-shipping-simulator',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatCardSubtitle,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './product-shipping-simulator.component.html',
  styleUrl: './product-shipping-simulator.component.css'
})
export class ProductShippingSimulatorComponent implements OnInit {
  @Input()
  product: Product = {} as Product;
  shippingForm: FormGroup;
  address$: Observable<AddressModel> = EMPTY;
  shipping$: Observable<FreightResponse> = EMPTY;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private addressService: AddressService,
    private shippingService: ShippingService
  ) {
    this.shippingForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.shippingForm.controls["cep"].statusChanges.subscribe(status => {
      if (status == 'VALID') {
        this.address$ = this.addressService.getAddress(this.shippingForm.controls["cep"].value);
      }
    });
    this.shippingForm.statusChanges.subscribe(status => {
      if (status == 'INVALID') {
        this.address$ = EMPTY;
        this.shipping$ = EMPTY;
      }
    })
  }

  simulateShipping() {
    if (this.shippingForm.valid) {
      const {cep, quantity} = this.shippingForm.value;
      this.shipping$ = this.shippingService.getShippingCost(cep, this.product);
      this.snackBar.open(`Simulação de frete para o CEP: ${cep} com quantidade: ${quantity}`, 'Fechar', {
        duration: 3000
      });
    }
  }
}
