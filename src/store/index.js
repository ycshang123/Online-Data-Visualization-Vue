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
            // {
                // 'miniCover': 'data:image/png;base64,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',
                // 'sqlType': 'PostgreSQL', 'cover': 'http://installvirtual.com/wp-content/uploads/2015/11/postgresql-logo.png', 'connName': 'myPostgreSQL', 'host': 'localhost', 'port': 5432, 'database': 'postgres', 'userName': 'postgres', 'password': 'root'
            // }
        ],
        // 数据包数组
        folders: [
            // {
            //     // 每个数据包的名字
            //     name: '二月数据',
            //     // 每个数据包里的表数组
            //     tables: [
            //         {
            //             title: 'airport',
            //             column:['id', 'city', 'fly'],
            //             data:[]
            //         }
            //     ]
            // }
        ],
        // 选中的数据包（添加表页面用）
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
            state.connTables = null
            state.connTables = obj
        },
        /**
         * @description:存用户添加的所有的表名
         * @param {*}
         */
        saveAllTables (state, obj) {
            state.allTables = JSON.parse(obj)

        }
    },
    actions: {},
    modules: {},
})
