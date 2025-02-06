import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}
