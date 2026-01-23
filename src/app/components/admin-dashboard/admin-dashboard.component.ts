import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'actions'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  updateStock(product: Product, newStock: string) {
    const stock = parseInt(newStock, 10);
    if (!isNaN(stock) && stock >= 0) {
      this.productService.updateStock(product.id, stock).subscribe(success => {
        if (success) {
          product.stock = stock;
          this.snackBar.open(`Stock updated for ${product.name}`, 'Close', { duration: 2000 });
        }
      });
    }
  }

  // Simplified Add Product for this demo
  addProduct() {
    this.snackBar.open('Add Product not fully implemented in this demo (requires Dialog)', 'Close', { duration: 3000 });
  }

  deleteProduct(id: number) {
    // Mock delete
    this.products = this.products.filter(p => p.id !== id);
    this.snackBar.open('Product removed', 'Close', { duration: 2000 });
  }
}
