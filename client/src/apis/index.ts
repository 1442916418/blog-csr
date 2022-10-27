import http from '@/utils/request'
import type * as res from '@/types/response-types'
import type * as req from '@/types/request-types'

/** 登录 */
export const userLogin = (data: req.ApiRequestUserLogin) => {
  return http.post<res.ApiResponseUserResult>('/users/login', data)
}

/** 注册 */
export const userRegister = (data: req.ApiRequestUserRegister) => {
  return http.post<res.ApiResponseUserResult>('/users', data)
}

/** 获取当前用户 */
export const getCurrentUser = () => {
  return http.get<res.ApiResponseUserResult>('/user')
}

/** 更新当前用户 */
export const updateCurrentUser = (data: req.ApiRequestUserUpdate) => {
  return http.put<res.ApiResponseUserResult>('/user', data)
}

/** 获取个人资料 */
export const getUserProfile = (params: req.ApiRequestProfile) => {
  return http.get<res.ApiResponseProfileResult>('/profiles/' + params.username)
}

/** 关注用户 */
export const followUser = (params: req.ApiRequestProfile) => {
  return http.post<res.ApiResponseProfileResult>(`/profiles/${params.username}/follow`)
}

/** 取消关注用户 */
export const deleteFollowUser = (params: req.ApiRequestProfile) => {
  return http.delete<res.ApiResponseProfileResult>(`/profiles/${params.username}/follow`)
}

/** 当前用户，关注的用户那里获取最新的文章(分页查询) */
export const getArticlesFeed = (params: req.ApiRequestPaginationQuery) => {
  return http.get<res.ApiResponseArticlesResult>('/articles/feed', { params })
}

/** 获取文章(分页查询) */
export const getArticles = (params: req.ApiRequestPaginationQuery) => {
  return http.get<res.ApiResponseArticlesResult>('/articles', { params })
}

/** 创建文章 */
export const createArticle = (data: req.ApiRequestCreateArticle) => {
  return http.post<res.ApiResponseArticleResult>('/articles', data)
}

/** 获取文章详情 */
export const getArticleBySlug = (query: req.ApiRequestSlug) => {
  return http.get<res.ApiResponseArticleResult>(`/articles/${query.slug}`)
}

/** 更新文章 */
export const updateArticleBySlug = (query: req.ApiRequestSlug, data: req.ApiRequestCreateArticle) => {
  return http.put<res.ApiResponseArticleResult>(`/articles/${query.slug}`, data)
}

// TODO: 删除返回格式？
/** 删除文章  */
export const deleteArticleBySlug = (query: req.ApiRequestSlug) => {
  return http.delete(`/articles/${query.slug}`)
}

/** 获取评论 */
export const getComments = (query: req.ApiRequestSlug) => {
  return http.get<res.ApiResponseCommentsResult>(`/articles/${query.slug}/comments`)
}

/** 创建评论 */
export const createComment = (query: req.ApiRequestSlug, data: req.ApiRequestCreateComment) => {
  return http.post<res.ApiResponseCommentResult>(`/articles/${query.slug}/comments`, data)
}

// TODO: 删除返回格式？
/** 删除评论 */
export const deleteComment = (query: req.ApiRequestSlug & req.ApiRequestId) => {
  return http.delete(`/articles/${query.slug}/comments/${query.id}`)
}

/** 收藏文章  */
export const favoriteArticles = (query: req.ApiRequestSlug) => {
  return http.post<res.ApiResponseArticleResult>(`/articles/${query.slug}/favorite`)
}

/** 取消收藏文章 */
export const deleteFavoriteArticles = (query: req.ApiRequestSlug) => {
  return http.delete<res.ApiResponseArticleResult>(`/articles/${query.slug}/favorite`)
}

/** 获取标签 */
export const getTags = () => http.get<res.ApiResponseTagResult>('/tags')
