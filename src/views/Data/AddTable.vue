<template>
    <!-- 先设置整体高度100%，撑满屏幕 -->
    <div style="height: 100%"
         class="d-flex">

        <!-- 左侧列表部分 -->
        <div style="height: 100%; width: 19%; border-right: 0.5px solid #e0e0e0">

            <!-- 所选包名 -->
            <v-list-item>
                <v-icon class="mr-4"
                        @click="toDatapage()">mdi-chevron-left</v-icon>
                <v-list-item-title class="title">{{folder.name}}</v-list-item-title>
            </v-list-item>

            <!-- 分割线 -->
            <v-divider></v-divider>

            <!-- 添加表按钮 -->
            <div class="d-flex justify-center mt-3">
                <v-menu bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn width="50%"
                               color="#25354d"
                               dark
                               v-bind="attrs"
                               style="opacity:0.9"
                               v-on="on"> 添加表 </v-btn>
                    </template>
                    <!-- 点击按钮出现的，三种选项 -->
                    <v-list>
                        <v-list-item v-for="(option, index) in options"
                                     :key="index"
                                     @click="isShowOther = true">
                            <v-list-item-title> {{ option.name }} </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <!-- 左侧列表部分下半区，根据条件显示不同内容的变化区域 -->
            <div class="mt-5">
                <!-- 展示所有表 -->
                <v-list v-show="!(isShowOther)"
                        dense>
                    <v-list-item-group>
                        <v-list-item v-for="table in tables"
                                     :key="table.title">
                            <!-- 行左侧图标 -->
                            <v-list-item-avatar size="20">
                                <v-icon x-small
                                        class="grey lighten-1"
                                        dark>
                                    mdi-table
                                </v-icon>
                            </v-list-item-avatar>
                            <!-- 行右侧表名 -->
                            <v-list-item-content>
                                <v-list-item-title v-text="table.title"></v-list-item-title>
                            </v-list-item-content>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <!-- 展示所有的历史连接 -->
                <v-list v-show="isShowOther"
                        dense>
                    <v-list-item-group>
                        <v-list-item v-for="(historyConn, index) in historyConnArr"
                                     :key="index"
                                     @click="showAllTable(historyConn)">
                            <!-- 行左侧图标 -->
                            <v-list-item-avatar size="23"
                                                tile>
                                <v-img :src="historyConn.avatar"
                                       lazy-src=""></v-img>
                            </v-list-item-avatar>
                            <!-- 行右侧表名 -->
                            <v-list-item-content>
                                <v-list-item-title v-text="historyConn.text"></v-list-item-title>
                            </v-list-item-content>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>

            </div>

        </div>

        <!-- 右侧部分 -->
        <v-main v-if="tables.length !== 0"
                style="height: 100%;"
                class="pt-3">

            <!-- 数据表预览 -->
            <v-card v-show="!(isShowOther)"
                    flat
                    tile>
                <!-- 工具栏 -->
                <!-- 表名图标 -->
                <v-card-title style="height: 10%"
                              class="pt-2">
                    <v-btn icon
                           x-small
                           class="mr-2">
                        <v-icon>mdi-table</v-icon>
                    </v-btn>
                    <!-- 表名 -->
                    {{folder.name}}

                    <!-- 空间填充 -->
                    <v-spacer></v-spacer>

                    <!-- 搜索框 -->
                    <v-text-field v-model="search"
                                  append-icon="mdi-magnify"
                                  label="Search"
                                  single-line
                                  hide-details
                                  dense
                                  class="shrink mr-3"></v-text-field>

                    <!-- 编辑和创建组件按钮 -->
                    <v-card flat
                            class="d-flex px-2"
                            width="20%">
                        <v-btn small
                               dark
                               class="mr-3"
                               color="#25354d"
                               style="opacity:0.9">编辑</v-btn>
                        <v-btn small
                               dark
                               color="#25354d"
                               style="opacity:0.9">创建组件</v-btn>
                    </v-card>

                </v-card-title>

                <!-- 表 -->
                <v-data-table :headers="headers"
                              :items="desserts"
                              :sort-by="['calories', 'fat']"
                              :sort-desc="[false, true]"
                              multi-sort
                              class="elevation-1"
                              loading-text
                              loading
                              :search="search"></v-data-table>
            </v-card>

            <!-- 被选中的连接里所有的表 -->
            <v-card v-show="isShowOther"
                    flat
                    tile
                    class="">
                <!-- 工具栏 -->
                <v-card-title style="height: 10%"
                              class="pt-2">
                    <!-- 表名图标 -->
                    <v-btn icon
                           x-small
                           class="mr-2">
                        <v-img width="10"
                               :src="conn.avatar"></v-img>
                    </v-btn>
                    <!-- 连接名 -->
                    {{conn.text}}

                    <!-- 空间填充 -->
                    <v-spacer></v-spacer>
                    <!-- 已选择（）项 -->
                    <v-card flat class="d-flex align-center mr-4" max-height="40">
                        <v-card-subtitle>已选择{{selectedTables.length}}项</v-card-subtitle>
                    </v-card>
                    <!-- 取消和确定按钮 -->
                    <v-card flat
                            class="d-flex px-2"
                            width="20%">
                        <v-btn small
                               dark
                               width="80"
                               class="mr-8"
                               color="#25354d"
                               style="opacity:0.9"
                               @click="isShowOther = false;selectedTables = []">取消</v-btn>
                        <v-btn small
                               dark
                               width="80"
                               color="#25354d"
                               style="opacity:0.9">确定</v-btn>
                    </v-card>

                </v-card-title>
                <!-- 连接中所有的表 -->
                <v-main>
                    <v-row class="d-flex mt-10">
                        <v-col cols="3"
                               v-for="(item, index) in connTables"
                               :key="index"
                               class="d-flex justify-start"
                               @click="selectTable(item)">
                            <v-btn class="px-1 d-inline-block d-flex justify-start align-center ml-10 "
                                   min-width="50%"
                                   max-height="40"
                                   elevation="1"
                                   outlined=""
                                   color="#3d557c">
                                <v-icon class="ml-4 "
                                        color="#3d557c"
                                        medium>mdi-table</v-icon>
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
export default {
    name: 'AddTable',
    data () {
        return {
            conn: {},
            isShowOther: false,
            tips: '请添加表',
            // 前一个页面传过来的数据包名称
            folder: {},
            // 数据表-搜索的关键字
            search: '',
            // 历史数据库连接数组
            historyConnArr: [
                { text: 'connection-1connection', avatar: require('../../assets/pic/mini/MySQL.png') },
                { text: 'connection-2apple', avatar: require('../../assets/pic/mini/Postgresql.png') },
                { text: 'connection-3visualization', avatar: require('../../assets/pic/mini/SQLServer.png') },
            ],
            // 添加表的三种选项
            options: [
                {
                    id: 1,
                    name: '数据库表',
                    showw: 'dataBaseFile'
                },
                {
                    id: 2,
                    name: '上传文件',
                    showw: 'upLoadFiles'
                },
                {
                    id: 3,
                    name: '自助数据集',
                    showw: 'selfData'
                },
            ],
            // 左侧表名
            tables: [
                {
                    subtitle: 'Jan 9, 2014',
                    title: '一月全国数据表',
                },
                // {
                //     subtitle: 'Jan 17, 2014',
                //     title: '二月全国数据表',
                // },
                // {
                //     subtitle: 'Jan 28, 2014',
                //     title: '三月全国数据表',
                // },
            ],
            // 选中连接中所有的表
            connTables: [
                {
                    id: '0',
                    name: '一月全国数据表',
                },
                {
                    id: '1',
                    name: '二月全国数据表',
                },
                {
                    id: '2',
                    name: '三月全国数据表',
                },
            ],
            // 被选中的表
            selectedTables: [],
            /**
             * 静态表格
             */
            // 表头
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
            ],
            // 记录
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 200,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 200,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 300,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 300,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 400,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 400,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 400,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 400,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 500,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 500,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        }
    },
    created () {
        // 从本地缓存中取出数据包对象
        var param = localStorage.getItem("folder")
        this.folder = JSON.parse(param)

        // 当状态为数据库表时，右侧默认显示第一个连接的所有表
        this.conn = this.historyConnArr[0]
    },
    methods: {
        /**
         * 跳转下一页
         */
        // nextPage (path) {
        //     this.$router.push({
        //         name: path,
        //         params: {
        //             isShow: true,
        //         }
        //     })
        // },

        /**
         * 表按钮的点击事件 => 选择表
         */
        selectTable (o) {
            console.log('sajfg')
            this.selectedTables.push(o)
            console.log(this.selectedTables)
        },

        /**
         * 连接名的点击事件
         */
        showAllTable (o) {
            // 把被点击连接对象赋值给单独的变量conn，用作在右侧显示连接名和图标
            this.conn = o
            // 请求接口 => 获取该连接中所有的表
        },
        /**
         * 返回数据集界面
         */
        toDatapage () {
            this.$router.push('/data')
        }
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