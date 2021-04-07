<template>
    <!-- 先设置整体高度100%，撑满屏幕 -->
    <div style="height: 100%"
         class="d-flex">

        <!-- 左侧列表部分 -->
        <div style="height: 100%; width: 19%; border-right: 0.5px solid #e0e0e0">

            <!-- 所选表名 -->
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
                                     @click="nextPage(option.path)">
                            <v-list-item-title> {{ option.name }} </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <!-- 表名列表 -->
            <div class="mt-5">
                <!-- 循环的这一行 -->
                <v-list dense>
                    <v-list-item-group>
                        <v-list-item v-for="folder in folders"
                                     :key="folder.title">
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
                                <v-list-item-title v-text="folder.title"></v-list-item-title>

                            </v-list-item-content>

                        </v-list-item>
                    </v-list-item-group>

                </v-list>
            </div>
        </div>

        <!-- 右侧数据表预览部分 -->
        <v-main style="height: 100%;"
                class="pt-3">
            <!-- 工具栏 -->
            <v-card flat
                    tile
                    class="">
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
        </v-main>

    </div>
</template>

<script>
export default {
    name: 'AddTable',
    data () {
        return {
            // 前一个页面传过来的数据包名称
            folder: {},
            // 数据表-搜索的关键字
            search: '',
            // 添加表的三种选项
            options: [
                {
                    id: 1,
                    name: '数据库表',
                    path: 'DatabaseConn'
                },
                {
                    id: 2,
                    name: '上传文件',
                    path: 'UpLoadFiles'
                },
                {
                    id: 3,
                    name: '自助数据集',
                    path: 'SelfData'
                },
            ],
            // 左侧表名
            folders: [
                {
                    subtitle: 'Jan 9, 2014',
                    title: '一月全国数据表',
                },
                {
                    subtitle: 'Jan 17, 2014',
                    title: '二月全国数据表',
                },
                {
                    subtitle: 'Jan 28, 2014',
                    title: '三月全国数据表',
                },
            ],
            // 静态表格
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
    },
    methods: {
        nextPage (path) {
            this.$router.push({
                name: path,
                params: {
                    isShow: true,
                }
            })
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