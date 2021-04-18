/*
 * @Description:
 * @Author: ycshang
 * @Version: 1.0
 * @Date: 2021-04-05 09:52:43
 */
import { get, post } from '../request'

export function addNewColumn (obj) {
    return post('/add/addNewColumn', obj)
}