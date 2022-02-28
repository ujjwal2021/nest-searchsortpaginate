import { Factory } from "nestjs-seeder";
// import { SupportOptionRange } from "prettier";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomInt } from "crypto";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: string;

    @Factory(faker=> faker.lorem.words(2))
    @Column()
    title: string;

    @Factory(faker=> faker.lorem.words(10))
    @Column()
    description: string;

    @Factory(faker=> faker.image.imageUrl())
    @Column()
    image: string;

    @Factory(faker=> randomInt(100, 1000))
    @Column()
    price: number;

}
