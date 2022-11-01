import { AppDataSource } from '../dataSource'
import SecurityService from '../services/security-service'

/**
 * 构造器参数
 */
export interface CParams {
  connection: typeof AppDataSource
  securityService: SecurityService
}
