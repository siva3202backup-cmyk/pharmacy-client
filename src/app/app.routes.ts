import { Routes } from '@angular/router';
export const routes:Routes=[
{path:'',loadComponent:()=>import('./pages/home.component').then(m=>m.HomeComponent)},
{path:'shop',loadComponent:()=>import('./pages/shop.component').then(m=>m.ShopComponent)},
{path:'category/:slug',loadComponent:()=>import('./pages/listing.component').then(m=>m.ListingComponent)},
{path:'brand/:slug',loadComponent:()=>import('./pages/listing.component').then(m=>m.ListingComponent)},
{path:'product/:id',loadComponent:()=>import('./pages/product-detail.component').then(m=>m.ProductDetailComponent)},
{path:'wishlist',loadComponent:()=>import('./pages/wishlist.component').then(m=>m.WishlistComponent)},
{path:'compare',loadComponent:()=>import('./pages/compare.component').then(m=>m.CompareComponent)},
{path:'cart',loadComponent:()=>import('./pages/cart.component').then(m=>m.CartComponent)},
{path:'checkout',loadComponent:()=>import('./pages/checkout.component').then(m=>m.CheckoutComponent)},
{path:'orders',loadComponent:()=>import('./pages/orders.component').then(m=>m.OrdersComponent)},
{path:'orders/:id',loadComponent:()=>import('./pages/order-detail.component').then(m=>m.OrderDetailComponent)},
{path:'profile',loadComponent:()=>import('./pages/profile.component').then(m=>m.ProfileComponent)},
{path:'addresses',loadComponent:()=>import('./pages/addresses.component').then(m=>m.AddressesComponent)},
{path:'login',loadComponent:()=>import('./pages/login.component').then(m=>m.LoginComponent)},
{path:'admin/:section',loadComponent:()=>import('./pages/admin.component').then(m=>m.AdminComponent)},
{path:'admin',redirectTo:'admin/dashboard',pathMatch:'full'},
{path:'**',redirectTo:''}
];
