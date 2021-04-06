<template>
    <!-- 先设置整体高度100%，撑满屏幕 -->
    <div style="height: 100%">
        <!-- 左侧列表部分 -->
        <div style="height: 100%; width: 19%; border-right: 0.5px solid #e0e0e0">
            <!-- 所选表名 -->
            <v-list-item>
                <v-icon class="mr-4" @click="previousPage()">mdi-chevron-left</v-icon>
                <v-list-item-title class="title">{{ folder.name }}</v-list-item-title>
            </v-list-item>

            <!-- 分割线 -->
            <v-divider></v-divider>

            <!-- 添加表按钮 -->
            <div class="d-flex justify-center mt-3">
                <v-menu bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn width="50%" color="#25354d" dark v-bind="attrs" style="opacity: 0.9" v-on="on"> 添加表 </v-btn>
                    </template>
                    <!-- 点击按钮出现的，三种选项 -->
                    <v-list>
                        <v-list-item v-for="(option, index) in options" :key="index" @click="nextPage(option.path)">
                            <v-list-item-title> {{ option.name }} </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <!-- 表名列表 -->
            <div></div>
        </div>

        <!-- 右侧数据预览部分 -->
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'AddTable',
    data() {
        return {
            folder: {},
            options: [
                {
                    id: 1,
                    name: '数据库表',
                    path: '/datalink',
                },
                {
                    id: 2,
                    name: '上传文件',
                    path: '/uploadfiles',
                },
                {
                    id: 3,
                    name: '自助数据集',
                    path: '/selfdata',
                },
            ],
        }
    },
    created() {
        this.folder = this.$route.params.folder
    },
    methods: {
        nextPage(path) {
            this.$router.push(path)
        },
        previousPage() {
            this.$router.go(-1)
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
