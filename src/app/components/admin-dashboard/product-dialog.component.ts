import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{data ? 'Edit Product' : 'Add New Product'}}</h2>
    <mat-dialog-content>
      <form [formGroup]="productForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Category</mat-label>
          <mat-select formControlName="category">
            <mat-option value="Fruits">Fruits</mat-option>
            <mat-option value="Vegetables">Vegetables</mat-option>
            <mat-option value="Dairy">Dairy</mat-option>
            <mat-option value="Bakery">Bakery</mat-option>
            <mat-option value="Meat">Meat</mat-option>
            <mat-option value="Pantry">Pantry</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Stock</mat-label>
          <input matInput type="number" formControlName="stock">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Image URL</mat-label>
          <input matInput formControlName="imageUrl">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="productForm.invalid" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 10px; }`]
})
export class ProductDialogComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      category: [data?.category || '', Validators.required],
      price: [data?.price || 0, [Validators.required, Validators.min(0)]],
      stock: [data?.stock || 0, [Validators.required, Validators.min(0)]],
      imageUrl: [data?.imageUrl || '', Validators.required],
      description: [data?.description || '', Validators.required],
      unit: [data?.unit || 'pack']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.productForm.value });
    }
  }
}
