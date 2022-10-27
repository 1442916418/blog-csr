/** api 响应 - 默认错误结果 */
export type ApiResponseErrorResult = {
  errors: {
    body: string | string[]
  }
}

/** api 响应 - 用户接口返回结果 */
export type ApiResponseUserResult = {
  user: UserResult
}

export type UserResult = {
  /** 邮箱 */
  email: string
  /** 密码 */
  password: string
  /** 用户名 */
  username: string
  /** 描述 */
  bio?: string
  /** 头像地址 */
  image?: string
}

/** api 响应 - 用户配置信息接口返回结果 */
export type ApiResponseProfileResult = {
  /** 配置信息 */
  profile: AuthorResult
}

/** api 响应 - 文章接口返回结果(列表) */
export type ApiResponseArticlesResult = {
  /** 文章 */
  articles: ArticleResult[]
  /** 文章总数 */
  articlesCount?: number
}

/** api 响应 - 文章接口返回结果 */
export type ApiResponseArticleResult = {
  /** 文章 */
  article: ArticleResult
  /** 文章总数 */
  articlesCount?: number
}

export type ArticleResult = {
  slug: string
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 内容 */
  body: string
  /** 标签 */
  tagList: string[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 是否已收藏 */
  favorited: boolean
  /** 收藏的数量 */
  favoritesCount: number
  /** 作者 */
  author: AuthorResult
}

export type AuthorResult = {
  /** 用户名 */
  username: string
  bio: string
  /** 头像地址 */
  image: string
  /** 是否已关注 */
  following: boolean
}

/** api 响应 - 评论接口返回结果(列表) */
export type ApiResponseCommentsResult = {
  /** 评论 */
  comments: CommentResult[]
}

/** api 响应 - 评论接口返回结果 */
export type ApiResponseCommentResult = {
  /** 评论 */
  comment: CommentResult
}

export type CommentResult = {
  id: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 内容 */
  body: string
  /** 评论作者 */
  author: AuthorResult
}

/** api 响应 - 收藏接口返回结果 */
export type ApiResponseFavoritesResult = {
  /** 文章 */
  article: ArticleResult
}

/** api 响应 - 标签接口返回结果 */
export type ApiResponseTagResult = {
  /** 标签 */
  tags: string[]
}
