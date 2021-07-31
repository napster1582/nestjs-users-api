import { UsersEntity } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 254, name: 'Name', nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 254, name: 'Description', nullable: true })
  description: string;

  @Column({ type: 'bit', name: 'Completed', default: false })
  completed: boolean;

  @ManyToOne((type) => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'IdUser' })
  idUser: UsersEntity;
}
