import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItems.asObservable();

    constructor(private snackBar: MatSnackBar) { }

    addToCart(product: Product) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.cartItems.next([...currentItems]);
            this.snackBar.open(`${product.name} quantity updated!`, 'Close', { duration: 2000 });
        } else {
            const newItem: CartItem = { ...product, quantity: 1 };
            this.cartItems.next([...currentItems, newItem]);
            this.snackBar.open(`${product.name} added to cart!`, 'Close', { duration: 2000 });
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.cartItems.value;
        const updatedItems = currentItems.filter(item => item.id !== productId);
        this.cartItems.next(updatedItems);
        this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
    }

    updateQuantity(productId: number, quantity: number) {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartItems.next([...currentItems]);
            }
        }
    }

    clearCart() {
        this.cartItems.next([]);
    }

    getTotalPrice(): number {
        return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount(): number {
        return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
    }
}
