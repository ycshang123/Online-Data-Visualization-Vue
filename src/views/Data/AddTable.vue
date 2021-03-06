<template>
    <!-- 先设置整体高度100%，撑满屏幕 -->
    <div style="height: 100%" class="d-flex">
        <!-- 左侧部分 -->
        <div style="height: 100%; width: 17.5%; border-right: 0.5px solid #e0e0e0">
            <!-- 所选包名 -->
            <v-list-item>
                <v-icon class="mr-4" @click="toDatapage()">mdi-chevron-left</v-icon>
                <v-list-item-title class="title">{{ folder.name }}</v-list-item-title>
            </v-list-item>

            <!-- 分割线 -->
            <v-divider></v-divider>

            <!-- 左侧列表部分下半区，根据条件显示不同内容的变化区域 -->
            <div class="mt-5">
                <!-- 展示所有表 -->
                <v-list v-show="!isShowOther" dense>
                    <!-- 添加表按钮 -->
                    <div class="d-flex justify-center mb-2">
                        <v-menu bottom>
                            <!-- 按钮 -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    @click="addBtnClick()"
                                    width="50%"
                                    color="#25354d"
                                    dark
                                    v-bind="attrs"
                                    style="opacity: 0.9"
                                    v-on="on"
                                >
                                    添加表
                                </v-btn>
                            </template>
                            <!-- 点击按钮出现的，三种选项 -->
                            <v-list>
                                <v-list-item
                                    v-for="(option, index) in options"
                                    v-show="option.isShow"
                                    :key="index"
                                    @click="nextPage(option.show)"
                                >
                                    <v-list-item-title> {{ option.name }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <!-- 表名 -->
                    <v-list-item-group v-if="allTables.length !== 0">
                        <v-list-item v-for="(table, index) in allTables" :key="index" @click="getTable(table)">
                            <!-- 行左侧图标 -->
                            <v-list-item-avatar size="20">
                                <v-icon x-small class="grey lighten-1" dark> mdi-table </v-icon>
                            </v-list-item-avatar>
                            <!-- 行右侧表名 -->
                            <v-list-item-content>
                                <v-list-item-title v-text="table.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <!-- 点击“数据库表”后，展示所有的历史连接 -->
                <v-list v-if="isShowOther && historyConnArr.length !== 0" dense>
                    <v-list-item-group>
                        <v-list-item v-for="(historyConn, index) in historyConnArr" :key="index" @click="showAllTable(historyConn)">
                            <!-- 行左侧图标 -->
                            <v-list-item-avatar size="23" tile>
                                <v-img :src="historyConn.miniCover" lazy-src=""></v-img>
                            </v-list-item-avatar>
                            <!-- 行右侧表名 -->
                            <v-list-item-content>
                                <v-list-item-title v-text="historyConn.connName"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </div>
        </div>

        <!-- 右侧部分 -->
        <v-main style="height: 100%; width: 80%" class="pt-1" v-relative>
            <!-- 数据表预览 -->
            <v-card v-if="!isShowOther && allTables.length !== 0" flat tile max-width="99%" height="100%" v-absolute>
                <!-- 工具栏 -->
                <!-- 表名图标 -->
                <v-card-title style="height: 10%" class="pt-2 subtitle-2">
                    <v-btn icon x-small class="mr-2">
                        <v-icon>mdi-table</v-icon>
                    </v-btn>
                    <!-- 表名 -->
                    {{ table.name }}

                    <!-- 空间填充 -->
                    <v-spacer></v-spacer>

                    <!-- 搜索框 -->
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        dense
                        class="shrink mr-3"
                    ></v-text-field>

                    <!-- 编辑和创建组件按钮 -->
                    <v-card flat class="d-flex px-2" width="20%">
                        <v-btn small dark class="mr-3" color="#25354d" style="opacity: 0.9">编辑</v-btn>
                        <v-btn small dark color="#25354d" style="opacity: 0.9" @click="createCompBtn()">创建组件</v-btn>
                    </v-card>
                </v-card-title>

                <!-- 表 -->
                <v-data-table
                    dense
                    :headers="headers"
                    :items="desserts"
                    :sort-by="['calories', 'fat']"
                    :sort-desc="[false, true]"
                    multi-sort
                    class="elevation-1 overflow-x-auto overflow-y-hidden"
                    max-width="100%"
                    max-height="89%"
                    :search="search"
                ></v-data-table>
            </v-card>

            <!-- 点击“数据库表”后，被选中的连接里，所有的表 -->
            <v-card v-if="isShowOther && historyConnArr.length !== 0" flat tile class="">
                <!-- 工具栏 -->
                <v-card-title style="height: 10%" class="pt-2">
                    <!-- 表名图标 -->
                    <v-btn icon x-small class="mr-2">
                        <v-img width="10" :src="conn.miniCover"></v-img>
                    </v-btn>
                    <!-- 连接名 -->
                    {{ conn.connName }}

                    <!-- 空间填充 -->
                    <v-spacer></v-spacer>
                    <!-- 已选择（）项 -->
                    <v-card flat class="d-flex align-center mr-4" max-height="40">
                        <v-card-subtitle>已选择{{ selectCount }}项</v-card-subtitle>
                    </v-card>
                    <!-- 取消和确定按钮 -->
                    <v-card flat class="d-flex px-2" width="20%">
                        <v-btn
                            small
                            dark
                            width="80"
                            class="mr-8"
                            color="#25354d"
                            style="opacity: 0.9"
                            @click="
                                isShowOther = false
                                selectCount = 0
                            "
                            >取消</v-btn
                        >
                        <v-btn small dark width="80" color="#25354d" style="opacity: 0.9" @click="pushAllTables()">确定</v-btn>
                    </v-card>
                </v-card-title>
                <!-- 数据库表-连接中所有的表 -->
                <v-main>
                    <v-row class="d-flex">
                        <v-col cols="3" v-for="(item, index) in connTables" :key="index" class="d-flex justify-start">
                            <v-btn
                                class="px-1 d-inline-block d-flex justify-start align-center ml-10"
                                :class="item.isSelected ? 'pcolor-lighten3-bg' : ''"
                                min-width="80%"
                                max-height="40"
                                elevation="1"
                                outlined=""
                                color="#3d557c"
                                @click="selectTable(item, index)"
                            >
                                <v-icon class="ml-4" color="#3d557c" medium>mdi-table</v-icon>
                                <v-card-title class="subtitle-1">{{ item.name }}</v-card-title>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-main>
            </v-card>
        </v-main>
    </div>
</template>

<script>
import { getConnTables, getConnTableColumn, getColumnData, uloadFilesApi } from '../../common/api/select'
import { uploadSql } from '../../common/api/database'
export default {
    name: 'AddTable',
    data() {
        return {
            selectCount: 0,
            // 当前连接对象
            conn: {},
            isShowOther: false,
            // 选中的数据包名称
            folder: {},
            // 点击的表
            table: {},
            // 数据表-搜索的关键字
            search: '',
            // 历史数据库连接数组
            historyConnArr: [],
            // 左侧表名,用户添加的所有的表
            allTables: [],
            // 每个连接中所有的表
            connTables: [],
            // 表头
            headers: [],
            // 记录
            desserts: [],
            formDataList: [],
            numberList: [],
            dataList: [],
            newColNameList: [],
            // 添加表的三种选项
            options: [
                { id: 1, name: '数据库表', show: 'DatabaseConn', isShow: true },
                { id: 2, name: '上传文件', show: 'UpLoadFiles', isShow: true },
                { id: 3, name: '自助数据集', show: 'SelfData', isShow: false },
            ],
            //自主数据集
            customizeList: [],
            status: false,
        }
    },
    created() {
        // 取出选中的数据包
        this.folder = this.$store.state.folder
        // 取出自定义表
        this.dataList = this.$store.state.addNewTable
        // 从vuex中取出历史连接
        this.historyConnArr = this.$store.state.databaseConnObjArr
        // 取出用户添加的所有的表
        if (this.$store.state.folder.tables != undefined) {
            this.allTables = this.$store.state.folder.tables
        }
        // 取出每个连接中所有的表
        this.connTables = this.$store.state.connTables

        // 默认显示第一张表的预览
        if (this.allTables.length != 0) {
            this.table = this.allTables[0]
        }
        // 当状态为数据库表时，右侧默认显示第一个连接的所有表
        this.conn = this.historyConnArr[0]
        // 当数据包中有表时，执行数据表预览方法
        if (this.allTables.length !== 0) {
            this.showTablePre(this.table)
        }
        this.formDataList = this.$store.state.formDataList
        this.customizeList = this.$store.state.dataList
    },
    methods: {
        /**
         * @description: 数据表预览
         * @param {*}
         * @return {*}
         */
        async showTablePre(obj) {
            this.formDataList = this.$store.state.formDataList
            this.headers = []
            this.desserts = []
            let headers = []
            let desserts = []
            let header = {}
            if (obj.name.endsWith('.csv') || obj.name.endsWith('.xlsx') || obj.name.endsWith('.xls')) {
                this.formDataList.forEach((formData) => {
                    this.table = {
                        formData: formData,
                    }
                    uloadFilesApi(formData).then((res) => {
                        var resultList = res.data
                        resultList.forEach((item) => {
                            if (obj.name == item.name) {
                                let data = item.file_list
                                var col = item.file_list[0]
                                col.forEach((item) => {
                                    header = {
                                        text: item,
                                        value: item,
                                    }
                                    this.headers.push(header)
                                })
                                for (var i = 1; i < data.length; i++) {
                                    obj = {}
                                    var j = 0
                                    col.forEach((colValue) => {
                                        obj[colValue] = data[i][j]
                                        j++
                                    })
                                    this.desserts.push(obj)
                                }
                            }
                        })
                    })
                    console.log(this.desserts)
                })
            } else if (this.dataList.some((item) => item.name === obj.name)) {
                // 如果是新增表
                for (var m = 0; m < this.dataList.length; m++) {
                    var n = 0
                    if (this.dataList[m].name == obj.name) {
                        n = m
                    }
                }
                var colNameList = []
                this.dataList[n].table.forEach((item) => {
                    colNameList.push(item.content)
                    header = {
                        text: item.content,
                        value: item.content,
                    }
                    headers.push(header)
                })
                this.headers = headers
                this.newColNameList = colNameList
                console.log(this.dataList[n])
                // 获取点击表对应的连接
                this.folder.tables.forEach((item) => {
                    if (item.name == this.dataList[n].oldname) {
                        obj.conn = item.conn
                    }
                })
                console.log(obj)
                // 构造参数
                const dataParams = {
                    tableName: this.dataList[n].oldname,
                    colName: this.newColNameList,
                    sqlType: obj.conn.sqlType,
                    userName: obj.conn.userName,
                    password: obj.conn.password,
                    host: obj.conn.host,
                    port: obj.conn.port,
                    database: obj.conn.database,
                    page: 1,
                    limitCount: 100,
                }
                // 请求接口，获取全部数据
                await getColumnData(dataParams).then((res) => {
                    if (res.code == 200) {
                        const data = res.data
                        data.forEach((element) => {
                            let obj = {}
                            let i = 0
                            headers.forEach((item) => {
                                obj[item.text] = element[i]
                                i++
                            })
                            desserts.push(obj)
                        })
                        this.desserts = desserts
                    }
                })
            } else {
                // 如果是数据库文件
                // 构造参数
                const colParams = {
                    tableName: this.table.name,
                    sqlType: obj.conn.sqlType,
                    userName: obj.conn.userName,
                    password: obj.conn.password,
                    host: obj.conn.host,
                    port: obj.conn.port,
                    database: obj.conn.database,
                }
                // 请求接口，获取全部字段
                await getConnTableColumn(colParams).then((res) => {
                    if (res.code === 200) {
                        var colData = []
                        colData = res.data
                        this.customizeList.forEach((item) => {
                            if (item.tablename == this.table.name) {
                                colData.unshift(item.name)
                            }
                        })
                        let header = {}
                        for (let i = 0; i < colData.length; i++) {
                            const element = colData[i]
                            header = {
                                text: colData[i],
                                value: colData[i],
                            }
                            headers.push(header)
                        }
                        this.headers = headers
                    }
                })
                // 构造参数
                const dataParams = {
                    tableName: this.table.name,
                    columnName: [],
                    sqlType: obj.conn.sqlType,
                    userName: obj.conn.userName,
                    password: obj.conn.password,
                    host: obj.conn.host,
                    port: obj.conn.port,
                    database: obj.conn.database,
                    page: 1,
                    limitCount: 100,
                }
                // 请求接口，获取全部数据
                await getColumnData(dataParams).then((res) => {
                    if (res.code == 200) {
                        var resultList = []
                        resultList = res.data
                        let j = 0
                        resultList.forEach((element) => {
                            let obj = {}
                            let i = 0
                            headers.forEach((item) => {
                                this.customizeList.forEach((itemData) => {
                                    if (itemData.name == item.text) {
                                        obj[item.text] = itemData.data[j]
                                        j++
                                        this.status = true
                                    }
                                })
                                if (this.status) {
                                    this.status = false
                                    return
                                } else {
                                    obj[item.text] = element[i]
                                    i++
                                }
                            })
                            desserts.push(obj)
                        })
                        this.desserts = desserts
                    }
                })
            }
        },
        /**
         * @description: 添加表按钮的点击事件，判断是否显示“自助数据集选项”
         * @param {*}
         * @return {*}
         */
        addBtnClick() {
            if (this.allTables.length != 0) {
                this.options[2].isShow = true
            }
        },
        /**
         * @description: 确定按钮点击事件，构建用户选择的所有的表
         * @param {*}
         * @return {*}
         */
        async pushAllTables() {
            // 是否显示“数据库连接部分”
            this.isShowOther = false
            // 收集被选择的表
            const selectedTables = this.connTables.filter((item) => {
                if (item.isSelected) {
                    return item
                }
            })
            this.allTables = this.allTables.concat(selectedTables)
            this.folder.tables = this.allTables
            // 实时更新每个数据包里的数据
            const folders = this.$store.state.folders
            folders.forEach((element) => {
                if (element.name == this.folder.name) {
                    element.tables = this.folder.tables
                }
            })
            this.table = this.allTables[0]
            this.$store.commit('saveFolders', folders)
            this.selectCount = 0
            this.showTablePre(this.table)
            let conn = this.table.conn
            if (conn == undefined) {
            } else {
                conn.tableName = this.table.name
                conn.userId = localStorage.getItem('userId') == null ? 1 : localStorage.getItem('userId')
                await uploadSql(conn).then((res) => {
                    if (res.code == 200) {
                        this.GLOBAL.pushAlertArrObj({
                            type: 'info',
                            content: '添加成功',
                        })
                    } else {
                        this.GLOBAL.pushAlertArrObj({
                            type: 'error',
                            content: '添加失败',
                        })
                    }
                })
            }
        },
        /**
         *  options的点击事件
         */
        async nextPage(path) {
            // 如果点击的是“数据库表”
            if (path == 'DatabaseConn') {
                // 显示数据库表相关的版块
                this.isShowOther = true
                // 实时获取历史连接
                this.historyConnArr = this.$store.state.databaseConnObjArr
                // 如果历史连接为空，则跳转到新建连接页面
                if (this.historyConnArr.length == 0) {
                    this.$router.push({
                        name: path,
                        params: {
                            isShow: false,
                        },
                    })
                } else {
                    // 请求接口 => 获取当前连接所有的表名
                    // 当前连接默认为数组中的第一个
                    let conn = this.historyConnArr[0]
                    await getConnTables(conn).then((res) => {
                        if (res.code === 200) {
                            const data = res.data
                            // 构造connTable对象，push进connTables数组
                            let connTableArr = []
                            let id = 0
                            for (let i = 0; i < data.length; i++) {
                                /**
                                 * 去重操作
                                 */
                                let item = data[i]
                                if (!this.isRepeat(item)) {
                                    let connTable = {
                                        id: id,
                                        name: data[i],
                                        isSelected: false,
                                        conn: this.conn,
                                    }
                                    connTableArr.push(connTable)
                                    id++
                                }
                            }
                            this.connTables = connTableArr
                            // console.log('当前连接中所有的表：')
                            // console.log(this.connTables)
                        }
                    })
                }
            } else {
                this.$router.push({
                    name: path,
                    params: {
                        isShow: false,
                    },
                })
            }
        },
        /**
         * @description: 判断 obj 是否已经存在于 this.allTables当中（比较依据为名字）
         * @param {*} tableName 被比较的表名
         * @return {*} True：重复       False：不重复
         */
        isRepeat(tableName) {
            if (this.allTables.length == 0) {
                return false
            }
            for (let j = 0; j < this.allTables.length; j++) {
                let item = this.allTables[j]
                if (tableName == item.name) {
                    return true
                }
            }
        },
        /**
         * @description: 每个表名按钮的点击事件 => 选择表
         * @param {*} o 被点击者对象
         * @param {*} index 索引
         * @return {*}
         */
        selectTable(obj, index) {
            if (obj.isSelected) {
                this.selectCount--
            } else {
                this.selectCount++
            }
            obj.isSelected = !obj.isSelected
        },
        /**
         * 连接名的点击事件
         */
        async showAllTable(o) {
            // 把被点击连接对象赋值给单独的变量conn，用作在右侧显示连接名和图标
            this.conn = o
            this.selectCount = 0
            // 请求接口 => 获取当前连接所有的表名
            // 当前连接默认为数组中的第一个
            await getConnTables(this.conn).then((res) => {
                if (res.code === 200) {
                    const data = res.data
                    // 构造connTable对象，push进connTables数组
                    let connTableArr = []
                    let id = 0
                    for (let i = 0; i < data.length; i++) {
                        /**
                         * 去重操作
                         */
                        let item = data[i]
                        if (!this.isRepeat(item)) {
                            let connTable = {
                                id: id,
                                name: data[i],
                                isSelected: false,
                                conn: this.conn,
                            }
                            connTableArr.push(connTable)
                            id++
                        }
                    }
                    this.$store.commit('saveConnTables', connTableArr)
                    this.connTables = connTableArr
                    // console.log('当前连接中所有的表：')
                    // console.log(this.connTables)
                }
            })
        },
        /**
         * 返回数据集界面
         */
        toDatapage() {
            this.$router.push('/data')
        },
        /**
         * @description: 左侧部分，获取当前点击的表名
         * @param {*} o
         * @return {*}
         */
        getTable(o) {
            this.table = o
            // if (this.table.conn == undefined) {
            //     this.table.tableName = this.table.name
            // }
            console.log(this.table)
            this.showTablePre(this.table)
        },
        /**
         * @description: 创建组件按钮的点击事件
         * @param {*}
         * @return {*}
         */
        createCompBtn() {
            //界面跳转，传参 -> 当前连接对象、字段名
            this.$router.push({
                name: 'Dashboard',
                params: {
                    table: this.table,
                },
            })
        },
    },
}
</script>

<style scoped>
.outline-right {
    border-right: 1px solid #25354d;
}
.bc-selected {
    background-color: #bdbdbd;
}
</style>
