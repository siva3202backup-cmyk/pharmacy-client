/*
  Compatibility model file for the pharmacy Angular client.
  This file intentionally supports BOTH naming styles used in the earlier MVP files
  and the newer Phase 2-5 files, so mixed components compile without errors.
*/

export interface User {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'PHARMACIST' | 'CUSTOMER' | 'USER';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Category {
  id: number;
  name?: string;
  category_name?: string;
  slug: string;
  icon?: string;
  image_url?: string;
  description?: string;
  parent_id?: number | null;
  display_order?: number;
  is_active?: boolean;
}

export interface Brand {
  id: number;
  name?: string;
  brand_name?: string;
  slug: string;
  logo_url?: string;
  description?: string;
  is_active?: boolean;
}

export interface Product {
  id: number;

  /* New Phase 2-5 fields */
  name: string;
  slug?: string;
  sku?: string;
  category?: string;
  categorySlug?: string;
  brand?: string;
  brandSlug?: string;
  mrp?: number;
  price: number;
  stock?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  description: string;
  ingredients?: string;
  dosage?: string;
  warnings?: string;
  featured?: boolean;
  prescription?: boolean;

  /* Backward-compatible MVP/API fields */
  product_name?: string;
  short_description?: string;
  full_description?: string;
  sale_price?: number | null;
  selling_price?: number;
  cost_price?: number;
  tax_percent?: number;
  image_url?: string;
  category_id?: number;
  category_name?: string;
  brand_id?: number;
  brand_name?: string;
  stock_quantity?: number;
  is_featured?: boolean;
  is_prescription_required?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  sale_price?: number | null;
  stock: number;
  image_url: string;
  category_id: number;
  is_featured: boolean;

  /* Optional expanded product fields */
  sku?: string;
  brand_id?: number;
  mrp?: number;
  selling_price?: number;
  cost_price?: number;
  tax_percent?: number;
  ingredients?: string;
  dosage?: string;
  warnings?: string;
  is_prescription_required?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: number;
  user_id?: number;
  fullName?: string;
  full_name?: string;
  phone?: string;
  mobile?: string;
  line1?: string;
  line2?: string;
  address_line1?: string;
  address_line2?: string;
  city: string;
  state: string;
  country?: string;
  pincode?: string;
  postal_code?: string;
  isDefault?: boolean;
  is_default?: boolean;
}

export interface OrderItemPayload {
  product_id: number;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];
  address_id?: number;
  payment_method?: string;
  coupon_code?: string;
}

export interface Order {
  id: number;
  number?: string;
  order_number?: string;
  date?: string;
  created_at?: string;
  status?: string;
  order_status?: string;
  paymentStatus?: string;
  payment_status?: string;
  paymentMethod?: string;
  payment_method?: string;
  total?: number;
  total_amount?: number;
  user_name?: string;
  items?: CartItem[] | unknown[];
  address?: Address;
  tracking?: { label: string; done: boolean; date?: string }[];
}

export interface Review {
  id: number;
  productId?: number;
  product_id?: number;
  user_id?: number;
  name?: string;
  rating: number;
  title: string;
  text?: string;
  review_text?: string;
  date?: string;
  created_at?: string;
}

export interface Payment {
  id: number;
  order_id: number;
  transaction_id?: string;
  payment_gateway: string;
  payment_method: string;
  amount: number;
  payment_status: string;
  created_at?: string;
}
