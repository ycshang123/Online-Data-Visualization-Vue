/*
 * @Description:
 * @Author: xxq
 * @Version: 1.0
 * @Date: 2021-05-03 11:28:54
 */

import { get, post } from '../request'

export function loginByGithub () {
    return post('/login/ByGithub')
}

export function test1 () {
    return get('/login/redi')
}

