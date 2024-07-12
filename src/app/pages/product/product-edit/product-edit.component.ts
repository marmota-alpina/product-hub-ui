import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatCard } from "@angular/material/card";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatAnchor, MatButton, MatButtonModule } from "@angular/material/button";
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  standalone: true,
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, MatFormField,
    MatCard,
    MatInput,
    MatButton,
    MatAnchor,
    MatLabel,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule, MatSelect, MatOption
  ]
})
export class ProductEditComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  productForm: FormGroup;
  categories$ = this.productService.getCategories();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: ['',[Validators.required]],
      category: ['',[Validators.required]],
      weight: [0, [Validators.required, Validators.min(0.01)]],
      length: [0, [Validators.required, Validators.min(0.01)]],
      width: [0, [Validators.required, Validators.min(0.01)]],
      height: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
        this.productForm.patchValue(product);
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.product?.id) {
        this.productService.updateProduct(this.product.id,  product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.createProduct(product).subscribe(() => {
            this.router.navigate(['/products']);
        });
      }
    }
  }
}
