/**
 * 数据库相关接口 API 管理文件
 */
import { post } from '../request'

/**
 *  选择数据库连接的 API
 * @returns
 */
export function changeDatabase (obj) {
    return post('/database/conn', obj)
}
