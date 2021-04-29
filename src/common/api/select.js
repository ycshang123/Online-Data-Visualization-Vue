/*
 * @Description: 查询类相关接口 API 管理文件
 * @Author: ycshang
 * @Version: 1.0
 * @Date: 2021-04-05 09:52:43
 */
import { get, post } from '../request'

/**
 *  选择数据库连接的 API
 * @returns
 */
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

/**
 * @description:    获取指定表的所有字段并划分成数字型和非数字型的形式返回
 * @param {*} obj   连接对象的基本信息和指定表名
 * @return {*}
 */
export function getDIDataApi (obj) {
    return post('/select/diData', obj)
}

/**
 * @description:    获取图表所有数据
 * @param {*} obj   连接对象的基本信息和指定表名
 * @return {*}
 */
export function getChartAllData (obj) {
    return post('/select/getChartData', obj)
}

/**
 * @description:    获取图表中指定字段的数据
 * @param {*} obj
 * @return {*}
 */
export function getChartData (obj) {
    return post('/select/filterData', obj)
}

