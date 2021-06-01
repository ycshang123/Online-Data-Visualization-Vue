<template>
    <v-card class="pt-10" elevation="0">
        <!-- 新建数据包 -->
        <v-dialog persistent transition="dialog-bottom-transition" max-width="600">
            <!-- 按钮 -->
            <template v-slot:activator="{ on, attrs }">
                <v-btn :color="pcolor" dark v-bind="attrs" v-on="on" class="ml-10" style="opacity: 0.9" @click="cleantext()">
                    <v-icon color="whilte" medium class="mr-4">mdi-folder-plus</v-icon>新建数据包
                </v-btn>
            </template>
            <!-- 数据包命名弹框 -->
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="#25354d" dark>新建数据包</v-toolbar>
                    <v-col cols="12">
                        <v-form>
                            <v-text-field label="数据包名称" :rules="nameRules" required v-model="folderName"></v-text-field>
                        </v-form>
                    </v-col>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">取消</v-btn>
                        <v-btn
                            :disabled="folderName.length === 0"
                            text
                            @click="
                                dialog.value = false
                                addFolder()
                            "
                            >确定</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <!-- 右侧展示所有数据集 -->
        <v-row class="d-flex mt-10">
            <v-col cols="3" v-for="(folder, index) in folders" :key="index" class="d-flex justify-start">
                <v-card class="d-inline-block d-flex justify-start align-center ml-10" min-width="50%" @click="nextPage(index)">
                    <v-icon class="ml-4 pcolor" medium>mdi-briefcase</v-icon>
                    <v-card-title class="subtitle-1"> {{ folder.name }} </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mdiFolderPlus } from '@mdi/js'
import { loginByGithub, getUserInfo } from '../../common/api/login'
export default {
    name: 'Data',
    data() {
        return {
            disable: '',
            folderName: '',
            fullHeight: document.documentElement.clientHeight, //fullHeight: document.documentElement.clientHeight  屏幕高度 默认值
            pcolor: '#25354d',
            folder: null,
            nameRules: [(v) => !!v || 'Name must be full', (v) => v.length <= 10 || 'Name must be less than 10 characters'],
            folders: [],
            userInfo: {},
        }
    },
    watch: {},
    created() {
        // 取出已经创建的数据包数组
        this.folders = this.$store.state.folders
        // 取出地址栏中的用户id
        let query = window.location.href
        if (query.lastIndexOf('=') != -1) {
            let begin = query.lastIndexOf('=') + 1
            this.userInfo.openId = query.substring(begin)
            this.getUser()
        } else {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        }
    },
    methods: {
        // 请求用户数据
        async getUser() {
            await getUserInfo(this.userInfo).then((res) => {
                if (res.code === 200) {
                    const data = res.data
                    console.log(data)
                    this.userInfo = data
                }
                localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                this.$store.state.userInfo = this.userInfo
                console.log(this.$store.state.userInfo)
            })
        },
        // 确定按钮点击事件
        addFolder() {
            let folders = this.folders
            let folderName = this.folderName
            let folder = { name: folderName, tables: null }
            if (folderName == null) {
                this.disable = true
            } else {
                this.disable = false
                this.folders = this.$store.state.folders
                // 去重，将创建的数据包存到vuex
                const isExist = this.folders.some((item) => item.name === folder.name)
                if (!isExist) {
                    this.$store.commit('pushDataObj', JSON.stringify(folder))
                } else {
                    alert('包名不能重复！')
                }
            }
        },
        // 添加数据包按钮点击事件 => 清除文本
        cleantext() {
            this.folderName = ''
        },
        // 数据包的点击事件 => 跳转页面
        nextPage(index) {
            this.folder = this.$store.state.folders[index]
            this.$store.commit('saveFolder', this.folder)
            this.$router.push({
                name: 'AddTable',
            })
        },
    },
}
</script>

<style scoped></style>
