import { route, POST, before, inject, DELETE, PUT, GET } from 'awilix-koa'
import { StatusCodes } from 'http-status-codes'
import { Context } from 'koa'
import joi from 'joi'

import { SelectQueryBuilder, In } from 'typeorm'

import { ArticleRepository } from '../repositories/article'
import { FavoriteRepository } from '../repositories/favorite'
import { FollowRepository } from '../repositories/follow'
import { CommentRepository } from '../repositories/comment'
import { UserRepository } from '../repositories/user'

import AuthenticationMiddleware, { OptionalAuthenticationMiddleware } from '../middleware/authentication-middleware'

import { Article } from '../model/entity/article'
import { Tag } from '../model/entity/tag'
import { Favorite } from '../model/entity/favorite'
import { Comment } from '../model/entity/comment'
import { User } from '../model/entity/user'
import { Follow } from '../model/entity/follow'
import { randomNumber } from '../utils'

@route('/api/articles')
export default class ArticleController {
  private _articleRepository: typeof ArticleRepository
  private _favoriteRepository: typeof FavoriteRepository
  private _followRepository: typeof FollowRepository
  private _commentRepository: typeof CommentRepository
  private _userRepository: typeof UserRepository

  constructor() {
    this._articleRepository = ArticleRepository
    this._favoriteRepository = FavoriteRepository
    this._followRepository = FollowRepository
    this._commentRepository = CommentRepository
    this._userRepository = UserRepository
  }

  // TODO: body 长度
  @route('')
  @POST()
  @before([inject(AuthenticationMiddleware)])
  async createArticle(ctx: Context) {
    joi.assert(
      ctx.request.body,
      joi.object({
        article: joi.object({
          title: joi.string().min(5).max(50).required(),
          description: joi.string().max(100).required(),
          body: joi.string().max(30000).required(),
          tagList: joi.array().items(joi.string().max(10)).required()
        })
      })
    )

    const article: Article = new Article()
    article.title = ctx.request.body.article.title
    article.description = ctx.request.body.article.description
    article.body = ctx.request.body.article.body
    article.slug = `_${randomNumber()}`
    article.author = ctx.state.user
    article.tagList = ctx.request.body.article.tagList.map((tagLabel: string) => {
      const tag: Tag = new Tag()
      tag.label = tagLabel
      return tag
    })

    await this._articleRepository.save(article)

    const savedArticle: Article = await this._articleRepository.findOneOrFail({
      relations: ['tagList', 'author', 'favorites'],
      where: { slug: article.slug }
    })

    ctx.body = { article: savedArticle.toJSON(false, false) }
    ctx.status = StatusCodes.CREATED
  }

  @route('/feed')
  @GET()
  @before([inject(AuthenticationMiddleware)])
  async getArticleFeed(ctx: Context) {
    const following: Follow[] = await this._followRepository.find({
      relations: ['following'],
      where: { follower: ctx.state.user }
    })

    if (!following.length) {
      ctx.body = { articles: [], articlesCount: 0 }
      ctx.status = StatusCodes.OK
      return
    }

    const filterQuery: SelectQueryBuilder<Article> = this._articleRepository
      .createQueryBuilder('article')
      .select(['article.id'])
      .leftJoin('article.author', 'author')
      .where('article.authorId IN (:...authors)', {
        authors: following.map((follow: Follow) => follow.following.id)
      })

    await this.getArticlesByFilteredIds(ctx, filterQuery)
  }

  @route('')
  @GET()
  @before([inject(OptionalAuthenticationMiddleware)])
  async getArticles(ctx: Context) {
    const filterQuery: SelectQueryBuilder<Article> = this._articleRepository
      .createQueryBuilder('article')
      .select(['article.id'])
      .leftJoin('article.author', 'author')
      .leftJoin('article.tagList', 'tagList')
      .leftJoin('article.favorites', 'favorites')

    filterQuery.where('1 = 1')

    if (ctx.query.tag) {
      filterQuery.andWhere('tagList.label LIKE :tag', { tag: `%${ctx.query.tag}%` })
    }

    if (ctx.query.favorited) {
      const name = ctx.query.favorited as string
      const user: User | null = await this._userRepository.findOne({ where: { username: name } })

      if (user) {
        filterQuery.andWhere('favorites.userId = :userId', { userId: user.id })
      }
    }

    if (ctx.query.author) {
      filterQuery.andWhere('author.username = :username', { username: ctx.query.author })
    }

    await this.getArticlesByFilteredIds(ctx, filterQuery)
  }

  async getArticlesByFilteredIds(ctx: Context, filterQuery: SelectQueryBuilder<Article>) {
    const articlesCount: number = await filterQuery.getCount()

    if (!articlesCount) {
      ctx.body = { articles: [], articlesCount: 0 }
      ctx.status = StatusCodes.OK
      return
    }

    const filteredIds: any[] = await filterQuery.getRawMany()

    const query: SelectQueryBuilder<Article> = this._articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.tagList', 'tagList')
      .leftJoinAndSelect('article.favorites', 'favorites')

    query.where({ id: In(filteredIds.map((article: any) => article.article_id)) })

    query.orderBy('article.createdAt', 'DESC')

    if (ctx.query.limit) {
      query.take(+ctx.query.limit)
    }

    if (ctx.query.offset) {
      query.skip(+ctx.query.offset)
    }

    const filteredArticles: Article[] = await query.getMany()

    const articles: object[] = []

    await Promise.all(
      filteredArticles.map(async (article: Article) => {
        const favorited: boolean = await this._favoriteRepository.getIsFavorited(article, ctx.state.user)
        const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)
        articles.push(article.toJSON(following, favorited))
      })
    )

    ctx.body = { articles, articlesCount }
    ctx.status = StatusCodes.OK
  }

  @route('/:slug')
  @PUT()
  @before([inject(AuthenticationMiddleware)])
  async updateArticle(ctx: Context) {
    // TODO: tagList 修改
    joi.assert(
      ctx.request.body,
      joi.object({
        article: joi.object({
          title: joi.string().min(5).max(50),
          description: joi.string().max(100),
          body: joi.string().max(30000)
        })
      })
    )

    const article: Article | null = await this._articleRepository.findOne({ where: { slug: ctx.params.slug } })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    Object.assign(article, ctx.request.body.article)

    if (ctx.request.body.article.title) {
      article.slug = `_${randomNumber()}`
    }

    await this._articleRepository.update(article.id, article)

    const updatedArticle: Article = await this._articleRepository.findOneOrFail({
      relations: ['tagList', 'author', 'favorites'],
      where: { slug: article.slug }
    })

    const favorited: boolean = await this._favoriteRepository.getIsFavorited(updatedArticle, ctx.state.user)
    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, updatedArticle.author)

    ctx.body = { article: updatedArticle.toJSON(following, favorited) }
    ctx.status = StatusCodes.CREATED
  }

  @route('/:slug')
  @GET()
  @before([inject(OptionalAuthenticationMiddleware)])
  async getArticle(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({
      relations: ['tagList', 'author', 'favorites'],
      where: { slug: ctx.params.slug }
    })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const favorited: boolean = await this._favoriteRepository.getIsFavorited(article, ctx.state.user)
    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)

    ctx.body = { article: article.toJSON(following, favorited, true) }
    ctx.status = StatusCodes.OK
  }

  @route('/:slug')
  @DELETE()
  @before([inject(AuthenticationMiddleware)])
  async deleteArticle(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({ where: { slug: ctx.params.slug } })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    await this._articleRepository.remove(article)

    ctx.status = StatusCodes.OK
    ctx.body = { result: StatusCodes.OK }
  }

  @route('/:slug/comments')
  @POST()
  @before([inject(AuthenticationMiddleware)])
  async addComment(ctx: Context) {
    joi.assert(
      ctx.request.body,
      joi.object({
        comment: joi.object({
          body: joi.string().max(30000).required()
        })
      })
    )

    const article: Article | null = await this._articleRepository.findOne({ where: { slug: ctx.params.slug } })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const comment: Comment = new Comment()
    comment.body = ctx.request.body.comment.body
    comment.article = article
    comment.author = ctx.state.user

    await this._commentRepository.save(comment)

    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)

    ctx.body = { comment: comment.toJSON(following) }
    ctx.status = StatusCodes.CREATED
  }

  @route('/:slug/comments')
  @GET()
  @before([inject(OptionalAuthenticationMiddleware)])
  async getComments(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({ where: { slug: ctx.params.slug } })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    // @ts-ignore
    const comments: Comment[] = await this._commentRepository.find({ where: { article } })

    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)

    ctx.body = { comments: comments.map((comment: Comment) => comment.toJSON(following)) }
    ctx.status = StatusCodes.OK
  }

  @route('/:slug/comments/:id')
  @DELETE()
  @before([inject(AuthenticationMiddleware)])
  async deleteComment(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({ where: { slug: ctx.params.slug } })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    await this._commentRepository.delete(ctx.params.id)

    ctx.status = StatusCodes.OK
    ctx.body = { result: StatusCodes.OK }
  }

  @route('/:slug/favorite')
  @POST()
  @before([inject(AuthenticationMiddleware)])
  async favoriteArticle(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({
      relations: ['tagList', 'author', 'favorites'],
      where: { slug: ctx.params.slug }
    })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const stateUser: User = ctx.state.user

    const existingFavorite = await this._favoriteRepository.getExistingFavorite(article, stateUser)

    if (!existingFavorite) {
      const favorite: Favorite = new Favorite()
      favorite.article = article
      favorite.user = ctx.state.user

      await this._favoriteRepository.save(favorite)

      article.favorites.push(favorite)
    }

    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)

    ctx.status = StatusCodes.CREATED
    ctx.body = { article: article.toJSON(following, true, true) }
  }

  @route('/:slug/favorite')
  @DELETE()
  @before([inject(AuthenticationMiddleware)])
  async unfavoriteArticle(ctx: Context) {
    const article: Article | null = await this._articleRepository.findOne({
      relations: ['tagList', 'author', 'favorites'],
      where: { slug: ctx.params.slug }
    })

    if (!article) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    await this._favoriteRepository
      .createQueryBuilder('favorite')
      .delete()
      .where('articleId = :articleId', { articleId: article.id })
      .andWhere('userId = :userId', { userId: ctx.state.user.id })
      .execute()

    article.favorites.pop()

    const following: boolean = await this._followRepository.getIsFollowing(ctx.state.user, article.author)

    ctx.status = StatusCodes.OK
    ctx.body = { article: article.toJSON(following, false, true) }
  }
}
