import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], category: string, maxPrice: number): Product[] {
    if (!products) return [];
    
    return products.filter(product => {
      const categoryValue = product.category || '';
      const matchCategory = category === 'all' || categoryValue.toLowerCase() === category.toLowerCase();
      const matchPrice = product.price <= maxPrice;
      return matchCategory && matchPrice;
    });
  }
}
