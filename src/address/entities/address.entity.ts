import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Address' })
export class Address {
    @PrimaryGeneratedColumn()
    address_id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    zone: string;

    @Column()
    municipality: string;
}

