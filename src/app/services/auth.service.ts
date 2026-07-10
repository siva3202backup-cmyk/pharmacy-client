import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse, User } from '../models/user.model';
@Injectable({ providedIn:'root' })
export class AuthService{
  private api = `${environment.apiUrl}/auth`;
  private userSig = signal<User|null>(this.loadUser());
  currentUser = this.userSig.asReadonly();
  constructor(private http:HttpClient){}
  register(data:{name:string;email:string;password:string}){return this.http.post<LoginResponse>(`${this.api}/register`,data).pipe(tap(r=>this.setSession(r)));}
  login(data:{email:string;password:string}){return this.http.post<LoginResponse>(`${this.api}/login`,data).pipe(tap(r=>this.setSession(r)));}
  logout(){localStorage.removeItem('pharmacy_token');localStorage.removeItem('pharmacy_user');this.userSig.set(null);}
  isLoggedIn(){return !!localStorage.getItem('pharmacy_token');}
  private setSession(r:LoginResponse){localStorage.setItem('pharmacy_token',r.token);localStorage.setItem('pharmacy_user',JSON.stringify(r.user));this.userSig.set(r.user);}
  private loadUser():User|null{const raw=localStorage.getItem('pharmacy_user');return raw?JSON.parse(raw) as User:null;}
}
