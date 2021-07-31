import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity('UserDetail')
export class UserDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'IdUser' })
  idUser: UsersEntity;

  @Column({ type: 'varchar', name: 'Nombres', length: 50, nullable: true })
  nombres: string;

  @Column({ type: 'varchar', name: 'Apellidos', length: 50, nullable: true })
  apellidos: string;

  @Column({ type: 'varchar', name: 'Telefono', length: 20, nullable: true })
  telefono: string;
}
