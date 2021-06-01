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

export function getUserInfo (obj) {
    return post('/login/selectUser', obj)
}
export function login (obj) {
    return post('/login/login', obj)
}

