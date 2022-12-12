import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@app/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  published: boolean;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async genSlug() {
    this.slug = this.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, (c) => (c === 'đ' ? 'd' : 'D'))
      .replace(' ', '-');
  }
}
