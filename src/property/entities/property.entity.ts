import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Property' })
export class Property {
    @PrimaryGeneratedColumn('increment')
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

    //
    @Column()
    isApartment: boolean;

    @Column()
    floorNmr: number;

    @Column('text', { array: true })
    images: string[];

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    price: number;

    @Column()
    city: string;

    @Column()
    zone: string;

    @Column()
    municipality: string;

    @Column()
    latitud: string;

    @Column()
    longitud: string;

    @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
    user: User;
}
