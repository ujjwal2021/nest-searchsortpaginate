import { InjectRepository } from '@nestjs/typeorm';
import {DataFactory, Seeder} from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

export class ProductSeeder implements Seeder{
    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>
    ){
    }
    seed(): Promise<any> {
        const products = DataFactory.createForClass(Product).generate(50);

        return this.productRepository.insert(products);
        // return Promise.resolve(undefined)
    }
    drop(): Promise<any> {
        return this.productRepository.delete({});
    }
    
}