import { Component } from '@angular/core';import { CommonModule } from '@angular/common';import { RouterLink, RouterOutlet } from '@angular/router';import { AuthService } from './services/auth.service';import { CartService } from './services/cart.service';
@Component({selector:'app-root',standalone:true,imports:[CommonModule,RouterOutlet,RouterLink],templateUrl:'./app.component.html',styleUrl:'./app.component.scss'})
export class AppComponent{constructor(public auth:AuthService,public cart:CartService){} logout(){this.auth.logout();}}
