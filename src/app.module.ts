import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';

const DbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest_search',
  entities: [Product],
  synchronize: true,
});

@Module({
  imports: [DbModule, ProductModule],
})
export class AppModule {}
