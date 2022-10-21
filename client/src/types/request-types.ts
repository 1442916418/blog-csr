/** api 请求 - 分页查询条件 */
export type ApiRequestPaginationQuery = {
  /** 限制返回的文章数（默认值为20） */
  limit?: number
  /** 偏移/跳过文章数（默认值为0） */
  offset?: number
  /** 标签 */
  tag?: string
  /** 作者 */
  author?: string
  /** 按用户（用户名）的收藏夹筛选 */
  favorited?: string
}

/** api 请求 - 标识查询条件 */
export type ApiRequestSlug = {
  /** 标识 */
  slug: string
}

/** api 请求 - id 查询条件 */
export type ApiRequestId = {
  id: number
}

/** api 请求 - /users/login - POST */
export type ApiRequestUserLogin = {
  user: {
    /** 邮箱 */
    email: string
    /** 密码 */
    password: string
  }
}

/** api 请求 - /users - POST */
export type ApiRequestUserRegister = {
  user: {
    /** 邮箱 */
    email: string
    /** 密码 */
    password: string
    /** 用户名 */
    username: string
  }
}

/** api 请求 - Profile */
export type ApiRequestProfile = {
  /** 用户名 */
  username: string
}

/** api 请求 - 创建文章 */
export type ApiRequestCreateArticle = {
  article: CreateArticle
}

export type CreateArticle = {
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 内容 */
  body: string
  /** 标签 */
  tagList: string[]
}

/** api 请求 - 创建评论 */
export type ApiRequestCreateComment = {
  comment: CreateComment
}

export type CreateComment = {
  body: string
}
