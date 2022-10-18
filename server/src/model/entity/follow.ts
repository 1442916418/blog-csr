import { Entity, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm'
import { User } from './user'

/**
 * 关注关系实体
 */
@Entity('follows')
@Index(['follower', 'following'], { unique: true })
export class Follow {
  @PrimaryGeneratedColumn()
  id!: number

  /** 关注者 */
  @ManyToOne(() => User, (user: User) => user.followers)
  follower!: User

  /** 被关注者 */
  @ManyToOne(() => User, (user: User) => user.following)
  following!: User
}
