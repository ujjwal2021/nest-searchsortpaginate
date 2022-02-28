import { Controller, Get, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import {Request} from 'express';

@Controller('api/products/')
export class ProductController {

    constructor(private productService: ProductService){
    }
    @Get('all')
    async allProduct(){
        return this.productService.allProducts();
    }

    @Get('backend')
    async backend(@Req() req: Request){
        const builder = await this.productService.searchProducts('products');
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
