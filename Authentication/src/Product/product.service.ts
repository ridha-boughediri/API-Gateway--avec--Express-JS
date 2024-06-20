
import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    return this.products.find(product => product.id === id);
  }

  create(productDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: (this.products.length + 1).toString(),
      ...productDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, productDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = { ...product, ...productDto };
    this.products = this.products.map(p =>
      p.id === id ? updatedProduct : p,
    );
    return updatedProduct;
  }

  remove(id: string): Product {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const removedProduct = this.products.splice(index, 1)[0];
    return removedProduct;
  }
}
