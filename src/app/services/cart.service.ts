import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
@Injectable({providedIn:'root'})
export class CartService{
  private itemsSig=signal<CartItem[]>(this.load()); items=this.itemsSig.asReadonly();
  count=computed(()=>this.itemsSig().reduce((s,i)=>s+i.quantity,0)); total=computed(()=>this.itemsSig().reduce((s,i)=>s+(Number(i.product.sale_price||i.product.price)*i.quantity),0));
  add(product:Product,quantity=1){const items=[...this.itemsSig()]; const found=items.find(i=>i.product.id===product.id); found?found.quantity+=quantity:items.push({product,quantity}); this.save(items);}
  update(productId:number,quantity:number){const items=this.itemsSig().map(i=>i.product.id===productId?{...i,quantity}:i).filter(i=>i.quantity>0);this.save(items);}
  remove(productId:number){this.save(this.itemsSig().filter(i=>i.product.id!==productId));}
  clear(){this.save([]);}
  private save(items:CartItem[]){this.itemsSig.set(items);localStorage.setItem('pharmacy_cart',JSON.stringify(items));}
  private load(){const raw=localStorage.getItem('pharmacy_cart');return raw?JSON.parse(raw) as CartItem[]:[];}
}
