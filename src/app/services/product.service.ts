import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../pages/product/product.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private fakeStoreApiUrl = environment.fakeStoreApiUrl
  private productApiUrl =  environment.productUrl;

  constructor(private http: HttpClient) { }

  getProducts(category: string | undefined = undefined): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiUrl+ (category ? `?category=${category}` : ''));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.fakeStoreApiUrl}/products/categories`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productApiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productApiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productApiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productApiUrl}/${id}`);
  }
  synchronizeProduct(): Observable<boolean> {
    return this.http.get<any>(`${this.productApiUrl}/synchronize`);
  }
}
