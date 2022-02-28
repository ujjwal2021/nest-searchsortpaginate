import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>
        
    ){
    }
    async allProducts(): Promise<Product[]>{
        return this.productRepository.find();
    }

    async searchProducts(alias: string){
        return this.productRepository.createQueryBuilder(alias);
    }
}
