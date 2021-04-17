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
            //     "sqlType": "postgresql",
            //     "userName": "postgres",
            //     "password": "root",
            //     "host": "localhost",
            //     "port": "5432",
            //     "database": "airport"
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
        folder: {
            // 每个数据包的名字
            //     name: '二月数据',
            //     // 每个数据包里的表数组
            //     tables: [
            //         {
            //             title: 'airport',
            //             column:['id', 'city', 'fly'],
            //             data:[]
            //         }
            //     ]

        },
        // 每个连接中所有的表
        connTables: [
            // "一月数据", "二月数据"
        ],
        // 用户添加的所有的表
        allTables: [
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
            console.log("新建数据包：" + JSON.parse(obj))
            state.folders.push(JSON.parse(obj))
        },

        /**
         * @description:存选中的数据包名
         * @param {*} state
         * @param {*} v
         */
        saveFolder (state, obj) {
            state.folder = obj
        },
        /**
         * @description:存储数据集
         * @param {*} state
         * @param {*} v
         */
        saveFolders (state, obj) {
            state.folders = obj
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
        // saveAllTables (state, obj) {
        //     state.allTables = JSON.parse(obj)

        // }
    },
    actions: {},
    modules: {},
})
