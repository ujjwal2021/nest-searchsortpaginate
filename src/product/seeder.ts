import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { Product } from "./product.entity";
import { ProductSeeder } from "./product.seeder";

export const DbModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_search',
    entities: [Product],
    synchronize: true,
  });
  

seeder({
    imports: [DbModule, TypeOrmModule.forFeature([Product])]
}).run([ProductSeeder])