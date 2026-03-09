import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { StockHighlightDirective } from '../../directives/stock-highlight.directive';
import { DiscountHighlightDirective } from '../../directives/discount-highlight.directive';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    ProductFilterPipe,
    StockHighlightDirective,
    DiscountHighlightDirective
  ],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  selectedCategory: string = 'all';
  maxPrice: number = 100;
  priceFilter: number = 100;
  inStockOnly: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      this.filteredProducts = prods;
      // Find max price for slider
      const max = Math.max(...prods.map(p => p.price));
      this.maxPrice = Math.ceil(max);
      this.priceFilter = this.maxPrice;
    });
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product => {
      const matchCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchPrice = product.price <= this.priceFilter;
      const matchStock = this.inStockOnly ? product.stock > 0 : true;
      return matchCategory && matchPrice && matchStock;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
