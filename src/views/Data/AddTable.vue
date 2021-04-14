<template>
    <!-- 先设置整体高度100%，撑满屏幕 -->
    <div style="height: 100%" class="d-flex">
        <!-- 左侧部分 -->
        <div style="height: 100%; width: 19%; border-right: 0.5px solid #e0e0e0">
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
                    <div class="d-flex justify-center">
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
                                    v-show="option.isShow"
                                    v-for="(option, index) in options"
                                    :key="index"
                                    @click="nextPage(option.show)"
                                >
                                    <v-list-item-title> {{ option.name }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <!-- 表名 -->
                    <v-list-item-group>
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

                <!-- 新建连接 -->
                <!-- <v-list v-else-if="isShowOther && historyConnArr.length === 0">
                    <v-card class="d-flex justify-center" shrink>
                        <v-card-text class="d-flex justify-center"> 去新建数据连接 </v-card-text>
                    </v-card>
                </v-list> -->
            </div>
        </div>

        <!-- 右侧部分 -->
        <v-main style="height: 100%" class="pt-3">
            <!-- 数据表预览 -->
            <v-card v-if="!isShowOther && allTables !== null" flat tile>
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
                        <v-btn small dark color="#25354d" style="opacity: 0.9">创建组件</v-btn>
                    </v-card>
                </v-card-title>

                <!-- 表 -->
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :sort-by="['calories', 'fat']"
                    :sort-desc="[false, true]"
                    multi-sort
                    class="elevation-1"
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
                        <v-card-subtitle>已选择{{ selectedTables.length }}项</v-card-subtitle>
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
                                selectedTables = []
                            "
                            >取消</v-btn
                        >
                        <v-btn small dark width="80" color="#25354d" style="opacity: 0.9" @click="pushAllTables()">确定</v-btn>
                    </v-card>
                </v-card-title>
                <!-- 数据库表-连接中所有的表 -->
                <v-main>
                    <v-row class="d-flex">
                        <v-col
                            cols="3"
                            v-for="(item, index) in connTables"
                            :key="index"
                            class="d-flex justify-start"
                            @click="selectTable(item)"
                        >
                            <v-btn
                                class="px-1 d-inline-block d-flex justify-start align-center ml-10"
                                min-width="50%"
                                max-height="40"
                                elevation="1"
                                outlined=""
                                color="#3d557c"
                            >
                                <v-icon class="ml-4" color="#3d557c" medium>mdi-table</v-icon>
                                <v-card-title class="subtitle-1">{{ item }}</v-card-title>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-main>
            </v-card>
        </v-main>
    </div>
</template>

<script>
import { getConnTables } from '../../common/api/select'
export default {
    name: 'AddTable',
    data() {
        return {
            conn: {},
            isShowOther: false,
            tips: '请添加表',
            // 选中的数据包名称
            folder: {},
            // 点击的表
            table: {},
            // 数据表-搜索的关键字
            search: '',
            // 历史数据库连接数组
            historyConnArr: [],
            // 添加表的三种选项
            options: [
                { id: 1, name: '数据库表', show: 'DatabaseConn', isShow: true },
                { id: 2, name: '上传文件', show: 'UpLoadFiles', isShow: true },
                { id: 3, name: '自助数据集', show: 'SelfData', isShow: false },
            ],
            // 左侧表名,用户添加的所有的表
            allTables: null,
            // 每个连接中所有的表
            connTables: [],
            // 被选中的所有的表
            selectedTables: [],
            /**
             * 静态表格
             */
            // 表头
            headers: [
                { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name' },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
            ],
            // 记录
            desserts: [
                { name: 'Frozen Yogurt', calories: 200, fat: 6.0, carbs: 24, protein: 4.0, iron: '1%' },
                { name: 'Ice cream sandwich', calories: 200, fat: 9.0, carbs: 37, protein: 4.3, iron: '1%' },
                { name: 'Eclair', calories: 300, fat: 16.0, carbs: 23, protein: 6.0, iron: '7%' },
                { name: 'Cupcake', calories: 300, fat: 3.7, carbs: 67, protein: 4.3, iron: '8%' },
                { name: 'Gingerbread', calories: 400, fat: 16.0, carbs: 49, protein: 3.9, iron: '16%' },
                { name: 'Jelly bean', calories: 400, fat: 0.0, carbs: 94, protein: 0.0, iron: '0%' },
                { name: 'Lollipop', calories: 400, fat: 0.2, carbs: 98, protein: 0, iron: '2%' },
                { name: 'Honeycomb', calories: 400, fat: 3.2, carbs: 87, protein: 6.5, iron: '45%' },
                { name: 'Donut', calories: 500, fat: 25.0, carbs: 51, protein: 4.9, iron: '22%' },
                { name: 'KitKat', calories: 500, fat: 26.0, carbs: 65, protein: 7, iron: '6%' },
            ],
        }
    },
    created() {
        // 从vuex中取出历史连接
        this.historyConnArr = this.$store.state.databaseConnObjArr
        // 取出用户添加的所有的表
        this.allTables = this.$store.state.folder.tables
        // 取出每个连接中所有的表
        this.connTables = this.$store.state.connTables
        // 取出选中的数据包名称
        this.folder = this.$store.state.folder
        console.log(this.folder)

        // 默认显示第一张表的预览
        this.table = this.allTables[0]

        // 当状态为数据库表时，右侧默认显示第一个连接的所有表
        this.conn = this.historyConnArr[0]
    },
    methods: {
        /**
         * @description: 添加表按钮的点击事件，判断是否显示“自助数据集选项”
         * @param {*}
         * @return {*}
         */
        addBtnClick() {
            if (this.allTables != null) {
                this.options[2].isShow = true
            }
        },

        /**
         * @description: 确定按钮点击事件，构建用户选择的所有的表
         * @param {*}
         * @return {*}
         */
        pushAllTables() {
            this.isShowOther = false
            // this.allTables.push(this.selectedTables)
            this.folder.tables = this.allTables
            console.log(this.folder.tables)
            const folders = this.$store.state.folders
            folders.forEach((element) => {
                if (element.name == this.folder.name) {
                    element.tables = this.folder.tables
                }
            })
            this.$store.commit('folders', folders)
            console.log(folders)
        },
        /**
         * @description: 左侧部分，获取当前点击的表名
         * @param {*} o
         * @return {*}
         */
        getTable(o) {
            this.table = o
            console.log(this.table)
        },
        /**
         * 跳转下一页
         */
        async nextPage(path) {
            // 如果点击的是“数据库表”
            if (path == 'DataBaseFile') {
                // 显示数据库表相关的版块
                this.isShowOther = true
                // 实时获取历史连接
                this.historyConnArr = this.$store.state.databaseConnObjArr
                // 如果历史连接为空，则跳转到新建连接页面
                if (this.historyConnArr == 0) {
                    this.$router.push({
                        name: path,
                        params: {
                            isShow: false,
                        },
                    })
                } else {
                    // 请求接口 => 获取当前连接所有的表名
                    // 当前连接默认为数组中的第一个
                    const conn = this.historyConnArr[0]
                    await getConnTables(conn).then((res) => {
                        if (res.code === 200) {
                            console.log('当前连接中所有的表：' + res.data)
                            console.log('当前连接对象：' + conn)
                            this.$store.commit('saveConnTables', res.data)
                            // 取出每个连接中所有的表
                            this.connTables = this.$store.state.connTables
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
         * 每个表名按钮的点击事件 => 选择表
         */
        selectTable(v) {
            this.allTables = []
            var table = { name: '' }
            table.name = v
            const allTables = this.allTables
            const selectedTables = this.selectedTables
            allTables.push(table)
            selectedTables.push(table)

            // allTables.forEach((element) => {
            //     if (element != o) {
            //         allTables.push(o)
            //     }else {
            //         alert('请勿重复选择')
            //     }
            // })
        },
        /**
         * 连接名的点击事件
         */
        async showAllTable(o) {
            // 把被点击连接对象赋值给单独的变量conn，用作在右侧显示连接名和图标
            this.conn = o
            console.log(this.conn)
            // 请求接口 => 获取当前连接所有的表名
            // 当前连接默认为数组中的第一个
            await getConnTables(this.conn).then((res) => {
                console.log('请求接口')
                if (res.code === 200) {
                    console.log('当前连接中所有的表：' + res.data)
                    console.log('当前连接对象：' + this.conn)
                    this.$store.commit('saveConnTables', res.data)
                    // 取出每个连接中所有的表
                    this.connTables = this.$store.state.connTables
                } else {
                    console.log('连接失败')
                }
            })
        },
        /**
         * 返回数据集界面
         */
        toDatapage() {
            this.$router.push('/data')
        },
    },
}
</script>

<style scoped>
.pcolor {
    color: #25354d;
}
.outline-right {
    border-right: 1px solid #25354d;
}
</style>
