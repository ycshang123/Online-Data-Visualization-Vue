/**
 * 查询类相关接口 API 管理文件
 */
import { get, post } from '../request'

/**
 *  选择数据库连接的 API
 * @returns
 */
export function test () {
    console.log('Enter')
    return get('/select/test')
}

export function uloadFilesApi (arr) {
    console.log("接收参数" + arr)
    return post('/select/uploadfile', arr)
}
