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
        folders: [],
        // 选中的数据包
        folder: [],
        // 每个连接中所有的表
        connTables: [
            // { id: '0', name: '一月全国数据表' },
            // { id: '1', name: '二月全国数据表' },
            // { id: '2', name: '三月全国数据表' }
        ],
        // 用户添加的所有的表
        allTables: [
            // { id: 0, title: '一月全国数据表' },
        ]
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
        /**
         * @description: 给folders数组追加元素
         * @param {*} state
         * @param {*} obj
         */
        pushDataObj (state, obj) {
            console.log(JSON.parse(obj))
            state.folders.push(JSON.parse(obj))
        },

        /**
         * @description:存选中的数据包名
         * @param {*} state
         * @param {*} v
         */
        saveFolder (state, v) {
            console.log(v)
            state.folder = v
        },
        /**
         * @description:存每个连接所有的表名
         * @param {*} state
         * @param {*} obj
         */
        saveConnTable (state, obj) {
            state.connTables = obj
        },
        /**
         * @description:存用户添加的所有的表名
         * @param {*}
         */
        saveAllTables (state, obj) {
            state.allTables = obj
        }
    },
    actions: {},
    modules: {},
})
