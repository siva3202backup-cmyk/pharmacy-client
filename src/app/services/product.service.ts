import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, ProductPayload } from '../models';

@Injectable({ providedIn:'root' })
export class ProductService {
  private api = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  list(search = '', category = '') {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    return this.http.get<Product[]>(this.api, { params });
  }

  get(id:number) { return this.http.get<Product>(`${this.api}/${id}`); }
  create(payload: ProductPayload) { return this.http.post<Product>(this.api, payload); }
  update(id:number, payload: ProductPayload) { return this.http.put<Product>(`${this.api}/${id}`, payload); }
  delete(id:number) { return this.http.delete<void>(`${this.api}/${id}`); }

  getProducts(search = '', category = '') { return this.list(search, category); }
  getProduct(id:number) { return this.get(id); }
}
