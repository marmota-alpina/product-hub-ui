import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Product } from "../product.model";
import { ProductService } from "../../../services/product.service";
import { EMPTY, Observable } from "rxjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {
  ProductShippingSimulatorComponent
} from "../../../components/product-shipping-simulator/product-shipping-simulator.component";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardSubtitle,
        MatCardHeader,
        MatCardContent,
        CurrencyPipe,
        AsyncPipe,
        NgIf,
        MatCardImage,
        ProductShippingSimulatorComponent,
        MatAnchor,
        RouterLink
    ],
})
export class ProductViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  product$: Observable<Product | undefined> = EMPTY;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
     this.product$ = this.productService.getProductById(id);
    }
  }
}
