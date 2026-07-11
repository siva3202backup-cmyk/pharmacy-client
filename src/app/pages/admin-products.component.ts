import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { Category, Product, ProductPayload } from "../models";
@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `<h1>Product CRUD</h1><div class="card box"><form class="form" (ngSubmit)="save()"><div class="two"><label class="field">Name<input name="name" [(ngModel)]="form.name" required></label><label class="field">Category<select name="category" [(ngModel)]="form.category_id"><option *ngFor="let c of cats" [ngValue]="c.id">{{c.name}}</option></select></label></div><label class="field">Description<textarea name="description" [(ngModel)]="form.description"></textarea></label><div class="four"><label class="field">Price<input type="number" name="price" [(ngModel)]="form.price"></label><label class="field">Sale Price<input type="number" name="sale" [(ngModel)]="form.sale_price"></label><label class="field">Stock<input type="number" name="stock" [(ngModel)]="form.stock"></label><label class="field">Image URL<input name="image" [(ngModel)]="form.image_url"></label></div><label><input type="checkbox" name="featured" [(ngModel)]="form.is_featured"> Featured</label><button class="btn btn-primary">{{editId?'Update':'Create'}}</button> <button type="button" class="btn btn-light" (click)="reset()">Reset</button></form></div><div class="card" style="padding:20px;margin-top:20px"><table><tr><th>Name</th><th>Price</th><th>Stock</th><th></th></tr><tr *ngFor="let p of products"><td>{{p.name}}</td><td>{{(p.sale_price??p.price)|currency}}</td><td>{{p.stock}}</td><td><button class="btn btn-light" (click)="edit(p)">Edit</button> <button class="btn btn-danger" (click)="remove(p.id)">Delete</button></td></tr></table></div>`,
    styles: [
        `.box{padding:20px}.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}.four{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}@media(max-width:900px){.two,.four{grid-template-columns:1fr}}`,
    ],
})
export class AdminProductsComponent implements OnInit {
    products: Product[] = [];
    cats: Category[] = [];
    editId: number | null = null;
    form = this.empty();
    constructor(private ps: ProductService, private cs: CategoryService) { }
    ngOnInit() {
        this.load();
        this.cs.list().subscribe((c) => {
            this.cats = c;
            if (c.length) this.form.category_id = c[0].id;
        });
    }
    load() {
        this.ps.list().subscribe((p) => (this.products = p));
    }
    save() {
        const req = this.editId
            ? this.ps.update(this.editId, this.form)
            : this.ps.create(this.form);
        req.subscribe(() => {
            this.reset();
            this.load();
        });
    }
    edit(p: Product) {
        this.editId = p.id;
        this.form = {
            name: p.name,
            description: p.description,
            price: Number(p.price),
            sale_price: p.sale_price === null ? null : Number(p.sale_price),
            stock: p.stock,
            image_url: p.image_url,
            category_id: p.category_id,
            is_featured: !!p.is_featured,
        };
    }
    remove(id: number) {
        if (confirm("Delete product?"))
            this.ps.delete(id).subscribe(() => this.load());
    }
    reset() {
        this.editId = null;
        this.form = this.empty();
        if (this.cats.length) this.form.category_id = this.cats[0].id;
    }
    empty(): ProductPayload {
        return {
            name: "",
            description: "",
            price: 0,
            sale_price: null,
            stock: 0,
            image_url: "",
            category_id: 0,
            is_featured: false,
        };
    }
}
