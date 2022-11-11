import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
  Index,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './user'
import { Comment } from './comment'
import { Tag } from './tag'
import { Favorite } from './favorite'

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column()
  slug!: string

  @Column()
  title!: string

  @Column({ default: '' })
  description!: string

  @Column({ type: 'longtext' })
  body!: string

  @ManyToMany(() => Tag, (tag: Tag) => tag.articles, { cascade: true })
  @JoinTable()
  tagList!: Tag[]

  @ManyToOne(() => User, (user: User) => user.articles)
  author!: User

  @OneToMany(() => Comment, (comment: Comment) => comment.article)
  comments!: Comment[]

  @OneToMany(() => Favorite, (favorite: Favorite) => favorite.article, {
    createForeignKeyConstraints: false
  })
  favorites!: Favorite[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }

  /**
   * 文章 JSON 数据
   * @param following 是否关注
   * @param favorited 是否收藏
   * @returns Article JSON
   */
  toJSON(following: boolean, favorited: boolean, isBody = false) {
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      body: isBody && this.body,
      tagList: this.tagList && this.tagList.map((tag: Tag) => tag.toJSON()),
      author: this.author && this.author.toProfileJSON(following),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      favorited,
      favoritesCount: this.favorites && this.favorites.length
    }
  }
}
