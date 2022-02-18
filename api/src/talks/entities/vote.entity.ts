import { CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Talk } from './talk.entity';

@Entity()
export class Vote {
  @ManyToOne((type) => User, (user) => user.votes, { primary: true })
  user: User;

  @ManyToOne((type) => Talk, (talk) => talk.votes, { primary: true })
  talk: Talk;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Vote>) {
    Object.assign(this, partial);
  }
}
