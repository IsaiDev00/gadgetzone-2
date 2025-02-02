import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) =>
        products.map((product) => ({
          ...product,
          image_url: product.image_url || '',
        }))
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    console.log('Payload enviado a POST:', product);
    return this.http.post<Product>(this.apiUrl, product);
  }
  
  updateProduct(product: Product): Observable<{ success: boolean; message: string }> {
    console.log('Payload enviado a PUT:', product);
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/${product.id}`, product);
  }  

  deleteProduct(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }  

  searchProducts(name: string): Observable<Product[]> {
    const url = `${this.apiUrl}/search?name=${encodeURIComponent(name)}`;
    return this.http.get<Product[]>(url);
  }  
}