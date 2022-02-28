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
        return this.productService.searchProducts(req);
    }
}
