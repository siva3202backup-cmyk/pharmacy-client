import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse, User } from '../models';

@Injectable({ providedIn:'root' })
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  private userSig = signal<User | null>(this.load());

  user = this.userSig.asReadonly();
  currentUser = this.userSig.asReadonly();

  constructor(private http: HttpClient) {}

  register(data:{name:string;email:string;password:string}) {
    return this.http.post<LoginResponse>(`${this.api}/register`, data).pipe(tap(r => this.set(r)));
  }

  login(data:{email:string;password:string}) {
    return this.http.post<LoginResponse>(`${this.api}/login`, data).pipe(tap(r => this.set(r)));
  }

  logout() {
    localStorage.removeItem('pharmacy_token');
    localStorage.removeItem('pharmacy_user');
    this.userSig.set(null);
  }

  isLoggedIn() { return !!localStorage.getItem('pharmacy_token'); }

  private set(response: LoginResponse) {
    localStorage.setItem('pharmacy_token', response.token);
    localStorage.setItem('pharmacy_user', JSON.stringify(response.user));
    this.userSig.set(response.user);
  }

  private load(): User | null {
    const raw = localStorage.getItem('pharmacy_user');
    return raw ? JSON.parse(raw) as User : null;
  }
}
