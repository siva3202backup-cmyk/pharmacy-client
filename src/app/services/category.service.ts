import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models';

@Injectable({ providedIn:'root' })
export class CategoryService {
  private api = `${environment.apiUrl}/categories`;
  constructor(private http: HttpClient) {}
  list() { return this.http.get<Category[]>(this.api); }
  getAll() { return this.list(); }
}
