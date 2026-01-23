import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products: Product[] = [
        {
            id: 1,
            name: 'Fresh Apples',
            category: 'fruits',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
            description: 'Crisp and sweet fresh red apples.',
            stock: 50,
            unit: 'kg'
        },
        {
            id: 2,
            name: 'Bananas',
            category: 'fruits',
            price: 1.20,
            image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500',
            description: 'Organic ripe bananas, rich in potassium.',
            stock: 100,
            unit: 'kg'
        },
        {
            id: 3,
            name: 'Whole Milk',
            category: 'dairy',
            price: 3.50,
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500',
            description: 'Fresh whole milk, pasteurized.',
            stock: 20,
            unit: 'liter'
        },
        {
            id: 4,
            name: 'Cheddar Cheese',
            category: 'dairy',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500',
            description: 'Aged cheddar cheese block.',
            stock: 15,
            unit: 'pack'
        },
        {
            id: 5,
            name: 'Whole Wheat Bread',
            category: 'bakery',
            price: 2.49,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
            description: 'Freshly baked whole wheat bread.',
            stock: 30,
            unit: 'loaf'
        },
        {
            id: 6,
            name: 'Eggs',
            category: 'dairy',
            price: 4.20,
            image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500',
            description: 'Free-range large brown eggs.',
            stock: 40,
            unit: 'dozen'
        },
        {
            id: 7,
            name: 'Broccoli',
            category: 'vegetables',
            price: 1.99,
            image: 'https://images.unsplash.com/photo-1459411621453-7fb8db86aa23?w=500',
            description: 'Fresh green broccoli crowns.',
            stock: 25,
            unit: 'kg'
        },
        {
            id: 8,
            name: 'Carrots',
            category: 'vegetables',
            price: 1.49,
            image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500',
            description: 'Organic crunchy carrots.',
            stock: 60,
            unit: 'kg'
        }
    ];

    private categories: Category[] = [
        { id: 1, name: 'Fruits', value: 'fruits' },
        { id: 2, name: 'Vegetables', value: 'vegetables' },
        { id: 3, name: 'Dairy', value: 'dairy' },
        { id: 4, name: 'Bakery', value: 'bakery' }
    ];

    constructor() { }

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }

    getProductById(id: number): Observable<Product | undefined> {
        const product = this.products.find(p => p.id === id);
        return of(product);
    }

    getCategories(): Observable<Category[]> {
        return of(this.categories);
    }

    // Admin methods (mock)
    addProduct(product: Product): Observable<Product> {
        product.id = this.products.length + 1;
        this.products.push(product);
        return of(product);
    }

    updateStock(id: number, newStock: number): Observable<boolean> {
        const product = this.products.find(p => p.id === id);
        if (product) {
            product.stock = newStock;
            return of(true);
        }
        return of(false);
    }
}
