<template>
    <div class="d-flex justify-space-around" style="height: 100%">
        <v-overlay v-if="contains" style="position: absolute; z-index: 1"></v-overlay>
        <div style="border-right: 0.5px solid #e0e0e0; width: 19%">
            <v-list-item v-if="isdisplay">
                <v-icon @click="previousPage()" class="mdi mdi-chevron-left mdi-24px"></v-icon>
                <v-list-item-content>
                    <v-list-item-title> ***航空数据 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item v-for="item in foldersFile[this.number]" :key="item.name">
                <v-list-item-icon>
                    <v-icon>mdi mdi-file</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle> {{ item.name }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </div>

        <v-card width="81%" tile flat>
            <!-- 头部导航栏 -->
            <v-card outlined v-borderBottom class="pa-0 d-flex justify-center" height="8%" tile flat>
                <v-row no-gutters align="center">
                    <v-col cols="8">
                        <v-card class="px-3 d-flex justify-space-around" tile elevation="0" v-if="!isdisplay">
                            <v-col cols="2" align-self="center">上传文件</v-col>
                            <v-col cols="10 pa-0" class="d-flex align-center justify-center">
                                <span style="width: 25%" class="d-flex justify-end"> 上传数据包至： </span>
                                <div style="height: 49px; width: 60%">
                                    <v-select flat :label="items[this.number]" solo :items="items" @change="changeNumber"> </v-select>
                                </div>
                            </v-col>
                        </v-card>
                    </v-col>

                    <v-col cols="4" class="d-flex align-center">
                        <v-col cols="4" v-if="this.foldersFile[this.number] != null">
                            已上传{{ this.foldersFile[this.number].length }} 项
                        </v-col>
                        <v-col cols="4" v-else>已选择0项</v-col>
                        <v-col cols="8" class="d-flex justify-space-around">
                            <v-btn @click="uploadFile()" color="#3b4a5f" dark>确定</v-btn>
                            <v-btn @click="returnPage()" color="#3b4a5f" dark>返回</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-card>

            <v-card width="92%" tile flat>
                <!-- 数组长度为0出现遮罩层 -->
                <v-card
                    v-if="status"
                    width="600px"
                    height="370px"
                    color="rgba(38, 50, 56,0.5)"
                    class="d-flex flex-column"
                    style="margin-top: 13%; margin-left: 20%"
                >
                    <span class="mdi mdi-close mdi-24px" style="padding-left: 94%" @click="changeStatus()"></span>
                    <v-card height="90%" class="d-flex justify-center align-center" tile elevation="0" color="#92989b">{{ text }}</v-card>
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
                                    accept=".csv,.xlsx,.xls,"
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
                            v-if="this.contains"
                            style="position: fixed; z-index: 1; margin-bottom: 10%"
                            class="d-flex align-center justify-center"
                        >
                            {{ tips }}
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
        console.log(this.$store.state.userInfo);
        // store里面存的所有数据包文件
        this.folders = this.$store.state.folders
        this.folder = this.$store.state.folder
        for (var i = 0; i < this.folders.length; i++) {
            if (this.folders[i].name == this.folder.name) {
                this.number = i
            }
        }
        if (this.folders.length == 0) {
            this.folder.name = '默认数据包'
            this.folder.tables = []
            this.items.push(this.folder.name)
            this.foldersFile.push(this.folder.tables)
            this.folders.push(this.folder)
            // this.$store.commit('folder', this.folder)
        } else {
            this.folders.forEach((item) => {
                // 当前点击的数据包
                this.folder = this.$store.state.folder
                this.items.push(item.name)
                if (item.tables == null) {
                    item.tables = []
                }
                this.foldersFile.push(item.tables)
            })
        }

        if (this.folder.tables == null) {
            this.foldersFile[this.number] = []
        } else {
            this.foldersFile[this.number] = this.folder.tables
        }
        this.fileList = this.$store.state.fileList

        this.formDateList = this.$store.state.formDataList
    },
    data: () => {
        return {
            // 是否显示返回图标
            isShow: false,
            // 添加表页面传来的数据
            folder: { name: '', tables: null },
            // 获取数据包
            folders: [],
            //下拉框出现的所有数据包
            items: [],
            //上传的所有文件
            files: [],
            // 数据包中的所有文件
            foldersFile: [],
            text: '请选择需要上传的文件',
            //控制空文件上传
            status: false,
            //控制文件不要重复上传
            contains: false,
            // 控制两个入口不同的页面显示
            isdisplay: false,
            // 默认给第一个数据包传送数据
            number: 0,
            tips: '',
            //上传文件返回的所有数据
            fileList: [],
            formDateList: null,
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
            if (this.foldersFile[this.number].length != 0) {
                this.files.forEach((file) => {
                    // 判断是否含有重复的文件
                    let isExist = this.foldersFile[this.number].some((item) => item.name === file.name)
                    if (!isExist) {
                        let userId = localStorage.getItem('userId') == null ? 1 : localStorage.getItem('userId')
                        let formData = new FormData()
                        this.files.forEach((file) => {
                            formData.append('file', file)
                            formData.append('readLine', 99)
                            formData.append('skipLine', 0)
                            formData.append('userId', userId)
                        })
                        uloadFilesApi(formData).then((res) => {
                            if (res.code == 200) {
                                this.contains = true
                                this.tips = '文件上传成功'
                                this.formDateList.push(formData)
                                setTimeout(() => {
                                    this.contains = false
                                }, 2000)
                                this.formDateList.push(formData)
                                this.files = []
                                // this.fileList.push(res.data)
                            } else {
                                this.GLOBAL.pushAlertArrObj({
                                    type: 'info',
                                    content: '文件上传失败',
                                })
                            }
                            var filesData = res.data
                            filesData.forEach((item) => {
                                this.foldersFile[this.number].push(item)
                            })
                            console.log(this.foldersFile[this.number])
                            this.files = []
                        })
                        this.files = []
                    } else {
                        this.contains = true
                        this.tips = '请不要上传重复文件'
                        setTimeout(() => {
                            this.contains = false
                        }, 2000)
                        this.files = []
                    }
                })
            } else {
                let formData = new FormData()
                let userId = localStorage.getItem('userId') == null ? 1 : localStorage.getItem('userId')
                this.files.forEach((file) => {
                    formData.append('file', file)
                    formData.append('readLine', 99)
                    formData.append('skipLine', 0)
                    formData.append('userId', userId)
                })
                uloadFilesApi(formData).then((res) => {
                    if (res.code == 200) {
                        this.contains = true
                        this.tips = '文件上传成功'
                        this.formDateList.push(formData)
                        setTimeout(() => {
                            this.contains = false
                        }, 2000)
                        this.files = []
                    } else {
                        this.GLOBAL.pushAlertArrObj({
                            type: 'info',
                            content: '文件上传失败',
                        })
                    }
                    var filesData = res.data
                    filesData.forEach((item) => {
                        this.foldersFile[this.number].push(item)
                    })
                    console.log(this.foldersFile[this.number])
                    this.files = []
                })
            }
        },
        changeStatus() {
            this.status = false
        },
        delectFile(index) {
            this.foldersFile[this.number].splice(index, 1)
            this.files.splice(index, 1)
        },
        // 往不同的文件数组里面push数值
        changeNumber(index) {
            var i = 0
            for (i = 0; i < this.items.length; i++) {
                if (this.items[i] == index) {
                    this.number = i
                }
            }
            console.log(typeof this.foldersFile[this.number])
            // this.number = index
        },
        returnPage() {
            this.$router.go(-1)
        },
    },
}
</script>

<style scoped></style>
