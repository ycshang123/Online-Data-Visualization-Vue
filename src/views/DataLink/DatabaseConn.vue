<template>
    <div class="d-flex pa-0">
        <!-- 左侧部分 -->
        <div class="" v-borderRight style="height: 100%; width: 19%">
            <v-row no-gutters style="height: 100%">
                <v-col style="padding: 0" class="d-flex flex-column justify-space-between">
                    <div style="height: 80%">
                        <!-- 按钮 -->
                        <v-card v-if="!disabledBtn" class="d-flex align-center" outlined v-borderBottom tile height="60">
                            <!-- 返回图标 -->
                            <v-icon medium class="ml-1 mr-1" v-if="isShow" @click="previousPage()">mdi-chevron-left</v-icon>

                            <v-spacer></v-spacer>
                            <!-- 新建连接按钮 -->
                            <v-btn depressed color="blue lighten-3" width="180" :disabled="disabledBtn" @click="changeSQLArea()">
                                <v-icon dark class="mr-4">mdi-plus</v-icon>
                                <span>新 建 连 接</span>
                            </v-btn>

                            <v-spacer></v-spacer>
                        </v-card>
                        <!-- 历史连接 -->
                        <v-card class="mx-auto overflow-y-auto overflow-x-hidden" height="400" tile outlined v-borderNone>
                            <v-list tile dense>
                                <v-subheader>历史连接</v-subheader>
                                <v-list-item-group v-if="historyConnArr.length !== 0" v-model="selectedItem" color="primary">
                                    <!-- 查看历史连接详情的 Dialog -->
                                    <v-list-item v-for="(item, i) in historyConnArr" :key="i" @click="showConnDetail(item)">
                                        <v-list-item-avatar size="30" tile>
                                            <v-img :src="item.miniCover" lazy-src=""></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.connName"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </div>

                    <v-card v-if="isUploadCard && !disabledBtn" outlined v-borderNone class="text-center" height="10%">
                        <v-btn color="#B39DDB" class="text-center white--text" height="100%" width="100%" to="/uploadFiles">
                            <v-icon class="mr-4"> mdi-upload </v-icon>
                            <span> 上 传 文 件 </span>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <!-- 信息提示框 -->
        <div class="alert-area">
            <v-alert
                v-show="alertArr.length !== 0"
                v-ripple
                :type="item.type"
                dismissible
                elevation="3"
                v-for="(item, index) in alertArr"
                :key="index"
            >
                {{ item.content }}
            </v-alert>
        </div>

        <!-- 右侧部分-- -->
        <div style="width: 91%">
            <!-- 众多数据库选择界面 -->
            <v-container fluid v-show="isSQLArea">
                <span class="text-h6 indigo--text text--lighten-1">选择数据库类型</span>
                <v-item-group>
                    <v-container class="item-area mt-16">
                        <v-row>
                            <v-col v-for="(item, index) in options" md="4" lg="4" cols="4" :key="index">
                                <v-item class="mt-12">
                                    <v-row justify="center">
                                        <v-card @click="connectSQL(index)" class="d-flex" height="110" width="220">
                                            <v-img :src="item.cover" height="100px"> </v-img>
                                        </v-card>
                                    </v-row>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-item-group>
            </v-container>

            <!-- 数据库连接界面 -->
            <v-container fluid v-show="isConnectArea" class="pt-2">
                <!-- 顶部按钮区 -->
                <v-card flat outlined class="d-flex align-center">
                    <v-col align-self="center">
                        <span>数据连接({{ connSQL.sqlType }})</span>
                    </v-col>
                    <v-col align-self="center" v-show="!disabledTextField" sm="1">
                        <v-row justify="space-between">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon color="deep-purple lighten-3" v-bind="attrs" v-on="on" @click="cancel()">
                                        <v-icon>mdi-close-circle-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cancel</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="deep-purple lighten-3" @click="save()">
                                        <v-icon>mdi-content-save</v-icon>
                                    </v-btn>
                                </template>
                                <span>Save</span>
                            </v-tooltip>
                        </v-row>
                    </v-col>
                </v-card>

                <v-card flat outlined class="mt-4 d-flex justify-center py-4">
                    <v-col cols="10" class="d-flex justify-space-between">
                        <v-col cols="6" v-show="connSQL.sqlType === 'PostgreSQL' || connSQL.sqlType === 'MySQL'">
                            <v-text-field
                                :disabled="disabledTextField"
                                :rules="rules"
                                label="连接名"
                                v-model="connSQL.connName"
                            ></v-text-field>
                            <v-text-field :disabled="disabledTextField" :rules="rules" label="主机" v-model="connSQL.host"></v-text-field>
                            <v-text-field :disabled="disabledTextField" :rules="rules" label="端口" v-model="connSQL.port"></v-text-field>
                            <v-text-field
                                :disabled="disabledTextField"
                                :rules="rules"
                                label="初始数据库"
                                v-model="connSQL.database"
                            ></v-text-field>
                            <v-text-field
                                :disabled="disabledTextField"
                                :rules="rules"
                                label="用户名"
                                v-model="connSQL.userName"
                            ></v-text-field>
                            <v-text-field
                                :disabled="disabledTextField"
                                :rules="rules"
                                label="密码"
                                type="password"
                                v-model="connSQL.password"
                            ></v-text-field>
                            <v-btn v-show="!disabledTextField" depressed color="light-green lighten-3" @click="testConn()">测试连接</v-btn>
                        </v-col>

                        <v-col align-self="center" cols="6">
                            <v-card class="d-flex flex-column justify-center align-center">
                                <v-img :src="connSQL.cover" max-width="400" height="300" contain class="white"></v-img>
                                <div style="width: 100%">
                                    <v-card-title class="title"> {{ connSQL.sqlType }} </v-card-title>
                                </div>
                            </v-card>
                        </v-col>
                    </v-col>
                </v-card>

                <v-row v-show="disabledTextField" justify="center" class="mt-4">
                    <v-col cols="5">
                        <v-card flat tile class="pa-4 d-flex justify-space-between align-center">
                            <v-btn color="#e5dbff" @click="changeSQLArea()">新建连接</v-btn>
                            <div class="text-h5 indigo--text text--lighten-2">>></div>
                            <v-btn color="#d0ebff" @click="goChangeTable()">去选择表</v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <!-- 请先测试连接的 Dialog -->
        <v-dialog v-model="saveDialog" persistent max-width="350">
            <v-card>
                <v-card-title class="text-h5"> Please test the connection first </v-card-title>
                <v-card-actions class="mt-3">
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="saveDialog = false"> ok </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog :value="connDetailDialog" width="700px" persistent>
            <v-card v-if="hisConnDetail">
                <v-card flat outlined class="mt-4 d-flex justify-center py-4">
                    <v-col cols="10" class="d-flex justify-space-between">
                        <v-col cols="6">
                            <v-text-field disabled label="连接名" v-model="hisConnDetail.connName"></v-text-field>
                            <v-text-field disabled label="主机" v-model="hisConnDetail.host"></v-text-field>
                            <v-text-field disabled label="端口" v-model="hisConnDetail.port"></v-text-field>
                            <v-text-field disabled label="初始数据库" v-model="hisConnDetail.database"></v-text-field>
                            <v-text-field disabled label="用户名" v-model="hisConnDetail.userName"></v-text-field>
                            <v-text-field disabled label="密码" v-model="hisConnDetail.password"></v-text-field>
                        </v-col>

                        <v-col align-self="center" cols="6">
                            <v-card class="d-flex flex-column justify-center align-center" height="100%">
                                <v-img :src="hisConnDetail.cover" width="100%" height="100%" contain class="white"></v-img>
                                <div style="width: 100%">
                                    <v-card-title class="title"> {{ hisConnDetail.sqlType }} </v-card-title>
                                </div>
                            </v-card>
                        </v-col>
                    </v-col>
                </v-card>
                <v-card-actions class="d-flex justify-end">
                    <v-btn @click="connDetailDialog = false"> 关闭 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { changeDatabase } from '../../common/api/database'
import mysql_mini from '../../assets/pic/miniSqlLogo/MySQL.png'
import postgresql_mini from '../../assets/pic/miniSqlLogo/Postgresql.png'
export default {
    name: 'DatabaseConn',
    created() {
        if (this.$route.params.isShow == false) {
            this.isUploadCard = false
        } else {
            this.isUploadCard = true
        }
        this.historyConnArr = this.$store.state.databaseConnObjArr
        // 接收添加表页面传来的数据 => 是否显示返回按钮
        this.isShow = this.$route.params.isShow
        // 从本地缓存中取出数据包对象
        var param = localStorage.getItem('folder')
        this.folder = JSON.parse(param)
    },
    data: () => ({
        // 展示历史连接对象详情的对象
        hisConnDetail: null,
        // 是否显示数据库连接对象详情对话框
        connDetailDialog: false,
        // 是否显示上传文件按钮
        isUploadCard: true,
        // 是否禁用 “新建连接” 按钮
        disabledBtn: false,
        // 是否禁用文本输入框
        disabledTextField: false,
        // 是否显示返回图标
        isShow: false,
        // 添加表页面传来的数据
        folder: '',
        selectedItem: null,
        // 历史连接数组对象
        historyConnArr: null,
        options: [
            { id: 0, cover: 'https://image.16pic.com/00/18/81/16pic_1881896_s.jpg?imageView2/0/format/png', name: 'Oracle' },
            { id: 1, cover: 'https://img.stackshare.io/service/3093/EhcacheTwitterIcon.png', name: 'Ehcache' },
            { id: 2, cover: 'http://installvirtual.com/wp-content/uploads/2015/11/postgresql-logo.png', name: 'PostgreSQL' },
            {
                id: 3,
                cover: 'https://www.datalytic-solutions.com/wp-content/uploads/2019/09/logo-microsoft-sql-server-595x3350.jpg',
                name: 'SQLServer',
            },
            { id: 4, cover: 'https://pic1.zhimg.com/v2-754e01e49836a295574661a188161775_r.jpg?source=172ae18b', name: 'MySQL' },
            { id: 5, cover: 'https://i.pinimg.com/originals/11/a0/6a/11a06a7b4650699a328e25960efbe8af.jpg', name: 'DB2' },
            { id: 6, cover: 'https://download.logo.wine/logo/Redis/Redis-Logo.wine.png', name: 'Redis' },
            { id: 7, cover: 'https://miro.medium.com/max/900/1*b0TtGI6gWFLltL1QkRxVdg.png', name: 'MongoDB' },
            { id: 8, cover: 'https://www.cmsdistribution.com/wp-content/uploads/2017/06/EDB_Logo-175-x-131px-436x228.png', name: 'EDB' },
        ],
        // 控制数据库选择界面
        isSQLArea: false,
        // 控制数据库连接界面
        isConnectArea: false,
        // 数据库连接界面的 数据库对象
        connSQL: {
            // 历史连接处的小图标
            miniCover: '',
            sqlType: 'PostgreSQL',
            // 数据库封面图
            cover: '',
            connName: 'myPostgreSQL',
            host: 'localhost',
            port: '',
            database: 'postgres',
            userName: 'postgres',
            password: 'root',
        },
        rules: [(value) => !!value || 'Not blank'],
        // 提示框数组
        alertArr: [],
        // 测试连接的状态值
        testConnStatus: false,
        saveDialog: false,
    }),
    watch: {
        alertArr: {
            handler() {
                if (this.alertArr.length !== 0) {
                    setTimeout(() => {
                        this.alertArr.splice(0, 1)
                    }, 2000)
                }
            },
            deep: true,
        },
    },
    methods: {
        /**
         * @description: 显示历史数据库的详情
         * @param {*} item 特定历史连接对象
         * @return {*}
         */
        showConnDetail(item) {
            this.connDetailDialog = true
            this.hisConnDetail = item
        },
        /**
         * “去选择表” 按钮的动作监听
         */
        goChangeTable() {
            this.$router.push('/addtable')
        },
        /**
         * 测试连接 按钮的方法
         */
        async testConn() {
            switch (this.connSQL.sqlType) {
                case 'MySQL':
                case 'PostgreSQL':
                    // 第一步，判断参数非空
                    if (
                        this.connSQL.connName &&
                        this.connSQL.host &&
                        this.connSQL.port &&
                        this.connSQL.database &&
                        this.connSQL.userName &&
                        this.connSQL.password
                    ) {
                        // 第二步，调用 api 测试
                        await changeDatabase(this.connSQL).then((res) => {
                            if (res.code === 200) {
                                this.testConnStatus = true
                                // 第三步，追加一个成功提示
                                this.alertArr.push({
                                    type: 'info',
                                    content: 'Successful connection!',
                                })
                            } else {
                                this.testConnStatus = false
                                // 追加一个失败提示
                                this.alertArr.push({
                                    type: 'error',
                                    content: 'Connection fail!',
                                })
                            }
                        })
                    } else {
                        this.alertArr.push({
                            type: 'error',
                            content: 'You must fill out the form data!',
                        })
                    }
            }
        },
        /**
         * 取消按钮的监听事件
         */
        cancel() {
            // 改变 isSQLArea 值
            this.isSQLArea = true
            // 显示出数据库连接界面
            this.isConnectArea = false
        },
        /**
         * @description: 保存按钮的监听事件
         * @param {*}
         * @return {*}
         */
        save() {
            if (this.testConnStatus) {
                if (this.isRepeat(this.connSQL)) {
                    // 添加一条提示信息
                    this.alertArr.push({
                        type: 'error',
                        content: 'Do not add twice',
                    })
                } else {
                    this.$store.commit('pushDbObj', JSON.stringify(this.connSQL))
                    // 添加一条提示信息
                    this.alertArr.push({
                        type: 'success',
                        content: 'Successful save!',
                    })
                    this.testConnStatus = false
                    this.disabledTextField = true
                }
            } else {
                this.saveDialog = true
            }
        },

        /**
         * @description: 判断目标元素是否已经存在于vuex中的连接对象数组中
         * @param {*} connObj
         * @return {*} true: 重复       false: 不重复
         */
        isRepeat(connObj) {
            let dbArr = this.$store.state.databaseConnObjArr
            for (let i = 0; i < dbArr.length; i++) {
                let obj = dbArr[i]
                // 如果连接名和类型都相同，则表示重复，反之
                if (obj.connName == connObj.connName && obj.sqlType == connObj.sqlType) {
                    return true
                }
            }
            return false
            // let jsonConnArr = JSON.stringify(this.$store.state.databaseConnObjArr)
            // let jsonObj = JSON.stringify(connObj)
            // return jsonConnArr.indexOf(jsonObj) == -1 ? false : true
        },

        /**
         * @description: 选择数据库的方法
         * @param {*} index
         * @return {*}
         */
        connectSQL(index) {
            setTimeout(() => {
                this.testConnStatus = false
                // 改变 “新建连接” 按钮的状态值
                this.disabledBtn = true
                // 改变 isSQLArea 值
                this.isSQLArea = false
                // 显示出数据库连接界面
                this.isConnectArea = true
                this.connSQL.sqlType = this.options[index].name
                switch (this.connSQL.sqlType) {
                    case 'MySQL':
                        this.connSQL.port = 3306
                        this.connSQL.miniCover = mysql_mini
                        break
                    case 'PostgreSQL':
                        this.connSQL.port = 5432
                        this.connSQL.miniCover = postgresql_mini
                        break
                }
                this.connSQL.cover = this.options[index].cover
            }, 200)
        },

        /**
         * @description: "新建连接" 按钮的监听事件
         * @param {*}
         * @return {*}
         */
        changeSQLArea() {
            this.isUploadCard = false
            this.isSQLArea = true
            this.isConnectArea = false
            this.disabledBtn = true
            this.disabledTextField = false
        },

        /**
         * @description: 返回添加表页面
         * @param {*}
         * @return {*}
         */
        previousPage() {
            this.$router.push({
                name: 'AddTable',
                params: {
                    folder: this.folder,
                },
            })
        },
    },
    computed: {},
    mounted() {},
}
</script>
<style scoped>
.alert-area {
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 1000;
    height: 300px;
    overflow: auto;
}
.item-area {
    width: 85%;
}
.v-text-field {
    width: 200px;
}
</style>
