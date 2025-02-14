import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
    user: User;
}
