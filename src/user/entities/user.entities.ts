/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { PhotoEntity } from './photo.entities';
import { TaskEntity } from '../../task/entities/task.entities';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await genSalt();
    this.password = await hash(password || this.password, salt);
  }

  @OneToOne(() => PhotoEntity, (pic) => pic.user)
  profile: PhotoEntity[];

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
