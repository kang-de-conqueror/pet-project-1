import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  validateOrReject,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { MyBaseEntity } from '../../shared/orm/base.entity';

@Entity()
@Unique(['email', 'username'])
export class User extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private validate(): Promise<void> {
    return validateOrReject(this);
  }
}
