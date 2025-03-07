import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity()
export class Product {
        @PrimaryGeneratedColumn("uuid")
        productId: string;
        @Column({type: "text"})
        productName: string;
        @Column({type: "float"})
        price: number;
        @Column({type: "int"})
        countSeal: number;
        @ManyToMany(() => Provider, (provider) => provider.products, {
                eager: true,
        })
                provider: Provider
}
