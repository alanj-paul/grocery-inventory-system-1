import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  orderPlaced = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const items = this.cartService.getCartItems();
      if (items.length === 0) {
        this.snackBar.open('Your cart is empty!', 'Close', { duration: 3000 });
        return;
      }

      const order = {
        ...this.checkoutForm.value,
        items: items,
        total: this.cartService.getTotalPrice(),
        userId: this.authService.getCurrentUser()?.id,
        date: new Date().toISOString()
      };

      this.orderService.placeOrder(order).subscribe(() => {
        this.orderPlaced = true;
        this.cartService.clearCart();
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 5000 });
      });
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
