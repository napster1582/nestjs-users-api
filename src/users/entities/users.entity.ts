import { TaskEntity } from 'src/task/entities/task.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetailEntity } from './user-detail.entity';

@Entity('Users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ type: 'varchar', name: 'UserName', length: 50, nullable: false })
  userName: string;

  @Column({ type: 'varchar', name: 'Email', length: 80, nullable: false })
  email: string;

  @Column({ type: 'varchar', name: 'Password', length: 50, nullable: false })
  password: string;

  @Column({ type: 'bit', name: 'Activo', nullable: true, default: true })
  activo: boolean;

  @CreateDateColumn({
    type: 'smalldatetime',
    name: 'CreateAt',
    nullable: false,
  })
  createAt: Date;

  @UpdateDateColumn({ type: 'smalldatetime', name: 'UpdateAt', nullable: true })
  updateAt: Date;

  @OneToOne(() => UserDetailEntity, (details) => details.idUser, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  userDetail: UserDetailEntity;

  @OneToMany((type) => TaskEntity, (task) => task.idUser)
  task: TaskEntity[];
}
