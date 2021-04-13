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
        ],
        // 数据包数组
        folders: [],
        // 选中的数据包
        folder: [],
        // 每个连接中所有的表
        connTables: [
            // "一月数据", "二月数据"
        ],
        // 用户添加的所有的表
        allTables: [
            // "重庆市一月数据", "江苏省一月数据"
        ]
    },
    mutations: {
        /**
         * 给 databaseConnObjArr数组追加元素
         * @param {*} state
         * @param {*} obj   JSON 字符串类型 ---> 数据库连接对象的基本信息
         */
        pushDbObj (state, obj) {
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
            state.folder = v
        },
        /**
         * @description:存每个连接所有的表名
         * @param {*} state
         * @param {*} obj
         */
        saveConnTables (state, obj) {
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
