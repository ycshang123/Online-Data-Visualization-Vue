/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-07 22:02:13
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 历史连接数组
        databaseConnObjArr: [
            { connName: 'connection-1connection', miniCover: require('/src/assets/pic/miniSqlLogo/MySQL.png') },
            { connName: 'connection-2apple', miniCover: require('/src/assets/pic/miniSqlLogo/Postgresql.png') },
            { connName: 'connection-3visualization', miniCover: require('/src/assets/pic/miniSqlLogo/SQLServer.png') },
        ],
        // 数据包数组
        folders:[],
        // 所有的表
        tables:[]
    },
    mutations: {
        /**
         * 给 databaseConnObjArr数组追加元素
         * @param {*} state
         * @param {*} obj   JSON 字符串类型 ---> 数据库连接对象的基本信息
         */
        pushDbObj (state, obj) {
            console.log(JSON.parse(obj))
            state.databaseConnObjArr.push(JSON.parse(obj))
        },
        pushDataObj (state, obj) {
            console.log(JSON.parse(obj))
            state.folders.push(JSON.parse(obj))
        },
    },
    actions: {},
    modules: {},
})
