import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../../services/product.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {switchMap} from "rxjs";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    NgForOf,
    AsyncPipe,
    NgIf,
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatFormField,
    MatInput,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  protected productService = inject(ProductService);
  private route = inject(ActivatedRoute)
  products$ =this.route.queryParams.pipe(
    switchMap(params => this.productService.getProducts(params['category']))
  );
  deleteProduct(id: number| string) {
    this.productService.deleteProduct(id.toString()).subscribe({
      next: () => {
        this.products$ = this.productService.getProducts();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSearch(value: any | null) {
    console.log(value)
  }

  synchronizeProducts() {
    this.productService.synchronizeProduct().subscribe({
      next: () => {
        this.products$ = this.productService.getProducts();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
