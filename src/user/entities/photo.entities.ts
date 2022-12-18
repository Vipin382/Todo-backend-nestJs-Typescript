/* eslint-disable prettier/prettier */
import { UserEntity } from './user.entities';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'profile' })
  profile: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  videoType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
