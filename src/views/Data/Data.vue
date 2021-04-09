<template>
    <!-- 若空数据集，新建数据包 -->
    <v-card class="mt-10"
            elevation="0">
        <v-dialog persistent
                  transition="dialog-bottom-transition"
                  max-width="600"
                  class="">
            <!-- 按钮 -->
            <template v-slot:activator="{ on, attrs }">
                <v-btn :color="pcolor"
                       dark
                       v-bind="attrs"
                       v-on="on"
                       class="ml-10"
                       @click="cleantext()">
                    <v-icon color="whilte"
                            medium
                            class="mr-4">mdi-folder-plus</v-icon>新建数据包
                </v-btn>
            </template>
            <!-- 数据包命名弹框 -->
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar :color="pcolor"
                               dark>新建数据包</v-toolbar>
                    <v-col cols="12">
                        <v-form>
                            <v-text-field label="数据包名称"
                                          :rules="nameRules"
                                          required
                                          v-model="folderName"></v-text-field>
                        </v-form>
                    </v-col>
                    <v-card-actions class="justify-end">
                        <v-btn text
                               @click="dialog.value = false">取消</v-btn>
                        <v-btn :disabled="folderName.length === 0"
                               text
                               @click="
                                dialog.value = false
                                addFolder()
                            ">确定</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <!-- 存在数据集，展示列表 -->
        <v-row class="d-flex mt-10">
            <v-col cols="3"
                   v-for="(folder, index) in folders"
                   :key="index"
                   class="d-flex justify-start">
                <v-card class="d-inline-block d-flex justify-start align-center ml-10"
                        min-width="50%"
                        @click="nextPage(index)">
                    <v-icon class="ml-4 pcolor"
                            medium>mdi-briefcase</v-icon>
                    <v-card-title class="subtitle-1"> {{ folder.name }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mdiFolderPlus } from '@mdi/js'
export default {
    name: 'Data',
    data () {
        return {
            disable: '',
            folderName: '',
            fullHeight: document.documentElement.clientHeight, //fullHeight: document.documentElement.clientHeight  屏幕高度 默认值
            pcolor: '#25354d',
            nameRules: [(v) => !!v || 'Name must be full', (v) => v.length <= 10 || 'Name must be less than 10 characters'],
            folders: [
                {
                    id: '0',
                    name: '2020年航空数据',
                },
                {
                    id: '1',
                    name: '2021年航空数据',
                },
                // {
                //     id: '2',
                //     name: '2019年航空数据',
                // },
                // {
                //     id: '3',
                //     name: '2018年航空数据',
                // },
                // {
                //     id: '4',
                //     name: '2017年航空数据',
                // },
                // {
                //     id: '5',
                //     name: '2090年航空数据',
                // },
            ],
        }
    },
    watch: {},
    created () {
        console.log('数据集：' + this.folders)
    },
    methods: {
        // 添加数据包的确定按钮点击事件
        addFolder () {
            let folders = this.folders
            let folderName = this.folderName
            let folder = { id: folders.length + 1, name: folderName }
            if (folderName == null) {
                this.disable = true
            } else {
                this.disable = false
                folders.push(folder)
                console.log(this.folders)
            }
            // 将创建的数据包存到本地
            localStorage.setItem('folders', JSON.stringify(this.folders))
        },
        // 添加数据包按钮点击事件 => 清除文本
        cleantext () {
            this.folderName = ''
        },
        // 数据包的点击事件 => 跳转页面、缓存数据包对象到本地
        nextPage (index) {
            // 将所点击的数据包对象存到本地缓存
            localStorage.setItem("folder", JSON.stringify(this.folders[index]))
            this.$router.push({
                name: "AddTable",
            })
        }
    },
}
</script>

<style scoped>
.pcolor {
    color: #25354d;
}
.bg-red {
    background: red;
    /* height: 722px; */
}
</style>
