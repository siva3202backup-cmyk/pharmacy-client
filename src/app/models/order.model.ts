export interface OrderItemPayload { product_id:number; quantity:number; price:number; }
export interface OrderPayload { items:OrderItemPayload[]; }
export interface Order { id:number; total:number; status:string; created_at:string; user_name?:string; items?:any[]; }
