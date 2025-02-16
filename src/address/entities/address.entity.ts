import { Property } from "src/property/entities/property.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    //Relationship with Properties
    @OneToOne(() => Property, (property) => property.address)
    property: Property;
}

