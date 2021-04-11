/**
 * 查询类相关接口 API 管理文件
 */
import { get, post } from '../request'

/**
 *  选择数据库连接的 API
 * @returns
 */
export function test () {
    return get('/select/test')
}

export function uloadFilesApi (arr) {
    return post('/select/uploadFile', arr)
}
