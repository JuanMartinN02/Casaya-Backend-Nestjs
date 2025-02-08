import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Property' })
export class Property {
    @PrimaryGeneratedColumn()
    property_id: number;

    @Column()
    bathrooms: number;

    @Column()
    bedrooms: number;

    @Column()
    parkingSpots: number;

    @Column()
    name: string;

    @Column()
    floors: number;
}
