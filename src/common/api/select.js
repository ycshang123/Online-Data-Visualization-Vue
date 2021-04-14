/*
 * @Description:
 * @Author: ycshang
 * @Version: 1.0
 * @Date: 2021-04-05 09:52:43
 */

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

export function getConnTables (obj) {
    return post('/select/allTable', obj)
}
export function getConnTableColumn (obj) {
    return post('/select/allColumn', obj)
}

export function getColumnData (obj) {
    return post('/select/addDataByColumn', obj)
}

