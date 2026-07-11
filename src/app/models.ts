export interface User { id:number; name:string; email:string; role:'USER'|'ADMIN'; }
export interface LoginResponse { token:string; user:User; }
export interface Category { id:number; name:string; slug:string; image_url?:string; }
export interface Product {
  id:number;
  name:string;
  slug?:string;
  description:string;
  price:number;
  sale_price?:number|null;
  stock:number;
  image_url:string;
  category_id:number;
  category_name?:string;
  is_featured?:boolean;
  created_at?:string;
}
export interface ProductPayload {
  name:string;
  description:string;
  price:number;
  sale_price?:number|null;
  stock:number;
  image_url:string;
  category_id:number;
  is_featured:boolean;
}
export interface CartItem { product:Product; quantity:number; }
export interface OrderItemPayload { product_id:number; quantity:number; price:number; }
export interface OrderPayload { items:OrderItemPayload[]; }
export interface Order { id:number; total:number; status:string; created_at:string; user_name?:string; items?:unknown[]; }
