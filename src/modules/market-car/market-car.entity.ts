import MyBaseEntity from 'src/shared/orm/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'market_cars',
})
export class MarketCar extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  @Index({ fulltext: true })
  model: string;

  @Column()
  @Index({ fulltext: true })
  brand: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: false,
  })
  @Index()
  ownerId: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: 'available_from',
  })
  availableFrom: Date;

  @Column({
    name: 'available_to',
  })
  availableTo: Date;

  @Column({
    name: 'rental_due_date',
    nullable: true,
  })
  rentalDueDate: Date;
}
