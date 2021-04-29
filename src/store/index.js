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
            // name: '',
            // tables: [
            //     {
            //         conn: {},
            //         id: 0,
            //         isSelected: false,
            //         name: ''
            //     },
            //     {
            //         conn: {},
            //         id: 1,
            //         isSelected: false,
            //         name: ''
            //     },
            // ]
        },
        // 每个连接中所有的表
        connTables: [
            // {
            //     conn: {},
            //     id: 0,
            //     isSelected: false,
            //     name: ''
            // },
            // {
            //     conn: {},
            //     id: 1,
            //     isSelected: false,
            //     name: ''
            // },
        ],
        // 提示框数组
        alertArr: [
            // {
            //     type: '',
            //     content: ''
            // }
        ],
        //新增表
        addNewTable: [],
        //数据集
        dataList: [],
        //请求文件的所有数据
        fileList: [],

        // 图表数据数组
        chartData: [
            // {
            //     database: '',
            //     tableName: '',
            //     index: 0
            // }
        ]

    },
    mutations: {
        /**
         * @description:    给图表数据数组追加数据
         * @param {*} state
         * @param {*} obj
         * @return {*}
         */
        pushChartData (state, obj) {
            state.chartData.push(JSON.parse(obj))
        },

        /**
         * @description:   给提示框数组追加一个数据
         * @param {*} state
         * @param {*} obj   JSON 字符串类型 ---> 被添加的数据
         * @return {*}
         */
        pushAlertArrObj (state, obj) {
            state.alertArr.push(JSON.parse(obj))
        },

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

    },
    actions: {},
    modules: {},
})
