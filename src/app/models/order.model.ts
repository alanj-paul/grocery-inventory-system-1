import { CartItem } from './cart-item.model';

export interface Order {
    id: string;
    items: CartItem[];
    totalAmount: number;
    date: Date;
    status: 'pending' | 'confirmed' | 'delivered';
    shippingDetails: {
        name: string;
        address: string;
        email: string;
    };
}
