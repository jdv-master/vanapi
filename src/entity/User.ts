import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id_usuario!: number;

    @Column()
    id_empresa!: number;
    
    @Column()
    nome!: string;

    @Column()
    email!: string;

    @Column()
    senha!: string;

    @Column()
    tipo!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    data_cadastro!: Date;
}