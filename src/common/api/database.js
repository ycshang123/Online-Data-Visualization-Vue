/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-14 09:57:04
 */

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

/**
 *  查询所有的可接入数据源的数据的 API
 * @returns
 */
export function allDataTypeInfo () {
    return post('/database/allDataTypeInfo')
}
