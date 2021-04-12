<template>
    <div class="d-flex justify-space-around" style="height: 100%">
        <div style="border-right: 0.5px solid #e0e0e0; width: 19%">
            <v-list-item v-if="isdisplay">
                <v-icon @click="previousPage()" class="mdi mdi-chevron-left mdi-24px"></v-icon>
                <v-list-item-content>
                    <v-list-item-title> ***航空数据 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item v-for="item in filesName" :key="item">
                <v-list-item-icon>
                    <v-icon>mdi mdi-file</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle> {{ item }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                    <v-icon @click="delectFile(item)">mdi mdi-close</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </div>

        <v-card width="81%" tile elevation="0">
            <!-- 头部导航栏 -->
            <v-card class="d-flex justify-space-between align-center" height="70px" tile elevation="0">
                <v-card width="60%" class="d-flex justify-space-around" tile elevation="0" v-if="!isdisplay">
                    <v-card width="30%" class="d-flex align-center ma-3" tile elevation="0"> 上传文件 </v-card>
                    <v-card class="d-flex justify-center align-items-center" width="70%" tile elevation="0">
                        <v-col class="d-flex align-center"> 上传数据包至： </v-col>
                        <v-col cols="8" style="margin-top: 8%">
                            <v-select label="***航空公司" solo :items="items"></v-select>
                        </v-col>
                    </v-card>
                </v-card>
                <v-col cols="3"> 已选择{{ this.files.length }}项 </v-col>
                <v-col cols="1">
                    <v-btn @click="uploadFile()">确定</v-btn>
                </v-col>
            </v-card>

            <v-card width="92%" tile flat>
                <!-- 数组长度为0出现遮罩层 -->
                <v-card
                    v-if="status"
                    width="600px"
                    height="370px"
                    color="rgba(38, 50, 56,0.1)"
                    class="d-flex flex-column"
                    style="margin-top: 13%; margin-left: 20%"
                >
                    <span class="mdi mdi-close mdi-24px" style="padding-left: 94%" @click="changeStatus()"></span>
                    <span style="padding-left: 40%; padding-top: 20%">{{ text }}</span>
                </v-card>
                <!-- 文件上传 -->
                <v-card
                    v-else
                    width="600px"
                    height="370px"
                    color="#fafafa"
                    class="d-flex flex-column justify-space-around"
                    style="margin-top: 13%; margin-left: 20%"
                >
                    <v-card
                        height="100px"
                        width="600px"
                        class="d-flex justify-space-around align-center"
                        tile
                        elevation="0"
                        color="#fafafa"
                    >
                        <span>支持文件类型：</span>
                        <v-card height="45px" width="45px">
                            <v-img src="../../image/excel.png"></v-img>
                        </v-card>

                        <v-card height="45px" width="45px">
                            <v-img src="../../image/CSV.png"></v-img>
                        </v-card>
                    </v-card>
                    <v-card
                        height="100px"
                        width="580px"
                        class="d-flex justify-space-around align-center"
                        tile
                        elevation="0"
                        color="#fafafa"
                    >
                        <v-row>
                            <v-col style="height: 100px">
                                <v-file-input
                                    v-model="files"
                                    counter
                                    accept=".csv,.xlsx,.xlsm,.xls,.xlsb"
                                    label="选择上传的文件"
                                    multiple
                                    placeholder="Select your files"
                                    prepend-icon="mdi-paperclip"
                                    outlined
                                    :show-size="1000"
                                >
                                    <template v-slot:selection="{ index, text }">
                                        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                            {{ text }}
                                        </v-chip>

                                        <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                            +{{ files.length - 2 }} File(s)
                                        </span>
                                    </template>
                                </v-file-input>
                            </v-col>
                        </v-row>
                        <!-- 上传文件重复提示框 -->
                        <v-card
                            width="400px"
                            height="270px"
                            color="rgba(38, 50, 56,0.1)"
                            v-if="this.contains"
                            style="position: fixed; z-index: 1; margin-bottom: 10%"
                            class="d-flex align-center justify-center"
                        >
                            请不要上传重复文件
                        </v-card>
                    </v-card>
                </v-card>
            </v-card>
        </v-card>
    </div>
</template>
<script>
import { uloadFilesApi } from '../../common/api/select'
export default {
    name: 'UpLoadFiles',
    created() {
        // 接收添加表页面传来的数据 => 是否显示返回按钮
        this.isShow = this.$route.params.isShow
        // 从本地缓存中取出数据包对象
        var param = localStorage.getItem('folder')
        this.folder = JSON.parse(param)
    },
    data: () => {
        return {
            // 是否显示返回图标
            isShow: false,
            // 添加表页面传来的数据
            folder: '',
            //下拉框出现的所有数据包
            items: ['2021年航空数据', '2020年航空数据', '2019年航空数据'],
            //上传的所有文件
            files: [],
            //上传的文件名
            filesName: [],
            text: '请选择需要上传的文件',
            //控制空文件上传
            status: false,
            //控制文件不要重复上传
            contains: false,
            // 控制两个入口不同的页面显示
            isdisplay: false,
        }
    },
    methods: {
        /**
         * 返回添加表页面
         */
        previousPage() {
            this.$router.push({
                name: 'AddTable',
                params: {
                    folder: this.folder,
                },
            })
        },
        // 上传文件方法
        uploadFile() {
            if (this.files.length == 0) {
                this.status = true
            }
            if (this.filesName.length != 0) {
                this.files.forEach((file) => {
                    let isExist = this.filesName.some((item) => item === file.name)
                    if (!isExist) {
                        this.filesName.push(file.name)
                        this.files = []
                    } else {
                        this.contains = true
                        setTimeout(() => {
                            this.contains = false
                        }, 2000)
                        this.files = []
                    }
                })
            } else {
                let formData = new FormData()
                this.files.forEach((file) => {
                    formData.append('file', file)
                    this.filesName.push(file.name)
                })
                uloadFilesApi(formData).then((res) => {
                    // console.log(res)
                    this.files = []
                })
            }
        },
        changeStatus() {
            this.status = false
        },
        delectFile(index) {
            this.filesName.splice(index, 1)
            this.files.splice(index, 1)
        },
    },
}
</script>

<style scoped></style>
