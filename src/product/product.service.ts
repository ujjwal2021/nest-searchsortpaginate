import { Injectable, Req } from '@nestjs/common';
import {Request} from 'express';
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

    async searchProducts(req: Request){
        // return this.productRepository.createQueryBuilder(alias);
        const builder = await this.productRepository.createQueryBuilder('products');
        if(req.query.keyword){
            builder.where("products.title LIKE :keyword OR products.description LIKE :keyword", {keyword: `%${req.query.keyword}%`});
        }
        const sort : any = req.query.sort;
        if(sort){
            builder.orderBy('products.price', sort.toUpperCase());
        }

        const page: number =parseInt(req.query.page as any) || 1;
        const perpage = 9;
        const total = await builder.getCount();

        builder.offset((page-1)*perpage).limit(perpage);

        return{
            total,
            page,
            last_page: Math.ceil(total/perpage),
            data: await builder.getMany(),
        }

    }
}
