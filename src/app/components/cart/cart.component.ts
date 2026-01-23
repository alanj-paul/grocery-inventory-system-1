import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'actions'];

  constructor(public cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void { }

  updateQuantity(item: CartItem, delta: number) {
    this.cartService.updateQuantity(item.id, item.quantity + delta);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
