import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({ providedIn:'root' })
export class CartService {
  private itemsSig = signal<CartItem[]>(this.load());
  items = this.itemsSig.asReadonly();
  count = computed(() => this.itemsSig().reduce((sum, item) => sum + item.quantity, 0));
  total = computed(() => this.itemsSig().reduce((sum, item) => sum + Number(item.product.sale_price ?? item.product.price) * item.quantity, 0));

  add(product: Product, quantity = 1) {
    const items = [...this.itemsSig()];
    const found = items.find(i => i.product.id === product.id);
    if (found) found.quantity += quantity;
    else items.push({ product, quantity });
    this.save(items);
  }
  update(productId:number, quantity:number) { this.save(this.itemsSig().map(i => i.product.id === productId ? { ...i, quantity } : i).filter(i => i.quantity > 0)); }
  remove(productId:number) { this.save(this.itemsSig().filter(i => i.product.id !== productId)); }
  clear() { this.save([]); }
  private save(items: CartItem[]) { this.itemsSig.set(items); localStorage.setItem('pharmacy_cart', JSON.stringify(items)); }
  private load(): CartItem[] { const raw = localStorage.getItem('pharmacy_cart'); return raw ? JSON.parse(raw) as CartItem[] : []; }
}
