import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDialogComponent } from './product-dialog.component';
import { StockHighlightDirective } from '../../directives/stock-highlight.directive';

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
    MatFormFieldModule,
    StockHighlightDirective
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'actions'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  openProductDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          // Update existing
          this.productService.updateStock(product.id, result.stock).subscribe(() => {
            this.loadProducts();
            this.snackBar.open('Product updated', 'Close', { duration: 2000 });
          });
        } else {
          // Add new
          this.productService.addProduct(result).subscribe(() => {
            this.loadProducts();
            this.snackBar.open('Product added', 'Close', { duration: 2000 });
          });
        }
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
        this.snackBar.open('Product removed', 'Close', { duration: 2000 });
      });
    }
  }

  updateStock(product: Product, newStock: string) {
    const stock = parseInt(newStock, 10);
    if (!isNaN(stock) && stock >= 0) {
      this.productService.updateStock(product.id, stock).subscribe(() => {
        product.stock = stock;
        this.snackBar.open(`Stock updated for ${product.name}`, 'Close', { duration: 2000 });
      });
    }
  }
}
