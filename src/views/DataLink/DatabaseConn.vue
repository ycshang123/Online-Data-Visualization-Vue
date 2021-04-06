<template>
    <div class="d-flex" style="height: 100%">
        <!-- 左侧部分 -->
        <v-col>
            <v-navigation-drawer permanent>
                <!-- 按钮 -->
                <v-card class="d-flex justify-center align-center" outlined tile height="60">
                    <v-btn
                        depressed
                        color="blue lighten-3"
                        width="200"
                        :disabled="!(isSQLArea === false && isConnectArea === false)"
                        @click="changeSQLArea()"
                    >
                        <v-icon dark class="mr-4">mdi-plus</v-icon>
                        <span>新 建 连 接</span>
                    </v-btn>
                </v-card>

                <!-- 历史连接 -->
                <v-card class="mx-auto" tile outlined>
                    <v-list dense>
                        <v-subheader>History connection</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(item, i) in historyConnArr" :key="i">
                                <v-list-item-avatar size="30" tile>
                                    <v-img :src="item.avatar" lazy-src=""></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-navigation-drawer>
        </v-col>

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

        <!-- 右侧部分-----众多数据库选择界面 -->
        <v-col cols="9">
            <v-container class="" v-show="isSQLArea" fluid>
                <span class="text-h6 indigo--text text--lighten-1">选择数据库类型</span>
                <v-item-group>
                    <v-container class="item-area mt-16">
                        <v-row>
                            <v-col v-for="(item, index) in options" md="4" lg="4" cols="4" :key="index">
                                <v-item v-ripple class="mt-12">
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
            <v-container v-show="isConnectArea" fluid>
                <!-- 顶部按钮区 -->
                <v-card flat class="d-flex align-center">
                    <v-col class="" align-self="center">
                        <span>数据连接({{ connSQL.sqlType }})</span>
                    </v-col>
                    <v-col align-self="center" class="" sm="1">
                        <v-row justify="space-between">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn title="" icon color="deep-purple lighten-3" v-bind="attrs" v-on="on" @click="cancel()"
                                        ><v-icon>mdi-close-circle-outline</v-icon></v-btn
                                    >
                                </template>
                                <span>Cancel</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="deep-purple lighten-3" @click="save()"
                                        ><v-icon>mdi-content-save</v-icon></v-btn
                                    >
                                </template>
                                <span>Save</span>
                            </v-tooltip>
                        </v-row>
                    </v-col>
                </v-card>

                <v-divider class="mb-4"></v-divider>

                <v-card flat outlined class="d-flex justify-center py-4">
                    <v-col cols="9" class="d-flex justify-space-between">
                        <v-col cols="4" v-show="connSQL.sqlType === 'PostgreSQL' || connSQL.sqlType === 'MySQL'">
                            <v-text-field :rules="rules" label="连接名" v-model="connSQL.connName"></v-text-field>
                            <v-text-field :rules="rules" label="主机" v-model="connSQL.host"></v-text-field>
                            <v-text-field :rules="rules" label="端口" v-model="connSQL.port"></v-text-field>
                            <v-text-field :rules="rules" label="初始数据库" v-model="connSQL.database"></v-text-field>
                            <v-text-field :rules="rules" label="用户名" v-model="connSQL.userName"></v-text-field>
                            <v-text-field :rules="rules" label="密码" v-model="connSQL.password"></v-text-field>
                            <v-btn depressed color="light-green lighten-3" @click="testConn()">测试连接</v-btn>
                        </v-col>

                        <v-col align-self="center" cols="7">
                            <v-card>
                                <v-img :src="connSQL.cover" height="300" contain class="white"></v-img>
                                <v-card-title class="title"> {{ connSQL.sqlType }} </v-card-title>
                            </v-card>
                        </v-col>
                    </v-col>
                </v-card>
            </v-container>
        </v-col>

        <!-- Dialog -->
        <v-dialog v-model="saveDialog" persistent max-width="350">
            <v-card>
                <v-card-title class="headline"> Test connection failed, whether to continue to save </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="saveDialog = false"> Cancle </v-btn>
                    <v-btn color="green darken-1" text @click="agreeSave()"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { changeDatabase } from '../../common/api/database'
import mysql_mini from '../../assets/pic/mini/MySQL.png'
import postgresql_mini from '../../assets/pic/mini/Postgresql.png'
import sqlserver_mini from '../../assets/pic/mini/SQLServer.png'
export default {
    data: () => ({
        selectedItem: null,
        // 历史连接数组对象
        historyConnArr: [
            { text: 'connection-1connection', avatar: require('../../assets/pic/mini/MySQL.png') },
            { text: 'connection-2apple', avatar: require('../../assets/pic/mini/Postgresql.png') },
            { text: 'connection-3visualization', avatar: require('../../assets/pic/mini/SQLServer.png') },
        ],
        options: [
            {
                id: 0,
                cover: 'https://image.16pic.com/00/18/81/16pic_1881896_s.jpg?imageView2/0/format/png',
                name: 'Oracle',
            },
            {
                id: 1,
                cover: 'https://img.stackshare.io/service/3093/EhcacheTwitterIcon.png',
                name: 'Ehcache',
            },
            {
                id: 2,
                cover: 'https://chinese.freecodecamp.org/news/content/images/2020/12/iShot2020-12-04-14.24.51.png',
                name: 'PostgreSQL',
            },
            {
                id: 3,
                cover: 'https://www.datalytic-solutions.com/wp-content/uploads/2019/09/logo-microsoft-sql-server-595x3350.jpg',
                name: 'SQLServer',
            },
            {
                id: 4,
                cover: 'https://pic1.zhimg.com/v2-754e01e49836a295574661a188161775_r.jpg?source=172ae18b',
                name: 'MySQL',
            },
            {
                id: 5,
                cover: 'https://i.pinimg.com/originals/11/a0/6a/11a06a7b4650699a328e25960efbe8af.jpg',
                name: 'DB2',
            },
            {
                id: 6,
                cover: 'https://download.logo.wine/logo/Redis/Redis-Logo.wine.png',
                name: 'Redis',
            },
            {
                id: 7,
                cover: 'https://miro.medium.com/max/900/1*b0TtGI6gWFLltL1QkRxVdg.png',
                name: 'MongoDB',
            },
            {
                id: 8,
                cover: 'https://www.cmsdistribution.com/wp-content/uploads/2017/06/EDB_Logo-175-x-131px-436x228.png',
                name: 'EDB',
            },
        ],
        // 控制数据库选择界面
        isSQLArea: false,
        // 控制数据库连接界面
        isConnectArea: false,
        // 数据库连接界面的 数据库对象
        // connSQL: {
        //     sqlType: '',
        //     cover: '',
        //     connName: '',
        //     host: '',
        //     port: '',
        //     database: '',
        //     userName: '',
        //     password: '',
        // },
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
                    }, 3000)
                }
            },
            deep: true,
        },
    },
    methods: {
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
         * 保存按钮的监听事件
         */
        save() {
            if (this.testConnStatus) {
                this.historyConnArr.push({
                    text: this.connSQL.connName,
                    avatar: this.connSQL.miniCover,
                })
                // 添加一条提示信息
                this.alertArr.push({
                    type: 'success',
                    content: 'Successful save!',
                })
                this.testConnStatus = false
            } else {
                this.saveDialog = true
            }
        },
        /**
         * 确定保存的监听事件
         */
        agreeSave() {
            this.historyConnArr.push({
                text: this.connSQL.connName,
                avatar: this.connSQL.miniCover,
            })
            // 添加一条提示信息
            this.alertArr.push({
                type: 'success',
                content: 'Successful save!',
            })
            this.saveDialog = false
        },
        /**
         * 选择数据库的方法
         */
        connectSQL(index) {
            setTimeout(() => {
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
         * 新建连接按钮的监听事件
         */
        changeSQLArea() {
            this.isSQLArea = true
        },
    },
}
</script>
<style scoped>
.alert-area {
    position: absolute;
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
