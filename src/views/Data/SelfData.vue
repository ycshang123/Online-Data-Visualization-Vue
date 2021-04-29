<template>
    <div style="position: relative">
        <v-overlay v-if="isPop" style="position: absolute; z-index: 1"></v-overlay>
        <!-- 新增列弹框 -->
        <v-card
            style="position: absolute; z-index: 10; margin-left: 25%; margin-top: 10%"
            height="500px"
            width="50%"
            class="d-flex flex-column justify-space-around"
            v-if="isPop"
        >
            <v-card height="10%" tile elevation="0" class="pa-4 d-flex align-center">
                <span style="font-weight: bold; font-size: 14px" class="mr-3">新增列名</span>

                <input
                    type="text"
                    placeholder="请输入新增列名"
                    style="border: 2px solid #c1d0f1; font-size: 10px; border-radius: 3px; width: 300px; height: 30px"
                    class="pl-2"
                    v-model="newColumn"
                />
            </v-card>
            <v-card height="78%" tile elevation="0" class="d-flex justify-space-around">
                <v-card width="17%" height="100%" color="#f6f8fb" tile elevation="0" class="pa-4">
                    <div v-for="(item, index) in functionSelect" :key="index" style="height: 30px; font-size: 12px; font-weight: bold">
                        {{ item }}
                    </div>
                </v-card>
                <v-card width="3%" class="d-flex flex-column align-center" tile elevation="0">
                    <span style="color: #a4a6a6">»</span>
                    <span style="color: #a4a6a6">函</span>
                    <span style="color: #a4a6a6">数</span>
                </v-card>
                <v-card width="78%" height="100%" tile elevation="0" v-borderTB class="d-flex">
                    <v-card width="25%" height="100%" tile elevation="0" v-borderLR class="d-flex flex-column align-center justify-center">
                        <div style="height: 8%" class="d-flex justify-center align-center">
                            <v-text-field placeholder="搜索" class="pr-2 pl-2" />
                        </div>

                        <div style="height: 90%; width: 100%; overflow-y: auto; white-space: nowrap" class="mt-3">
                            <div v-for="(item, index) in listContent" :key="index" v-cursor class="ml-2">
                                <span style="color: #3f3f4c; font-size: 12px" @click="addColumnContent(index)"> {{ item.content }}</span>
                            </div>
                        </div>
                    </v-card>
                    <v-card width="75%" height="100%" tile elevation="0" v-borderRight>
                        <v-card height="8%" v-borderBottom tile elevation="0" class="d-flex justify-space-around align-center">
                            <div style="width: 70%; height: 100%" class="d-flex justify-space-around align-center">
                                <span
                                    style="color: #b1b1b1"
                                    v-for="(item, index) in functionSign"
                                    :key="index"
                                    @click="operation(index)"
                                    v-cursor
                                >
                                    {{ item }}</span
                                >
                            </div>
                        </v-card>
                        <v-card height="92%" width="100%" tile elevation="0">
                            <v-card v-if="newColumnContent.length == 0" width="100%" height="90%" tile elevation="0">
                                <span style="font-size: 12px; color: #d5dbe0" class="pa-2">示例：销售额/计划销售额</span></v-card
                            >

                            <v-card width="100%" height="90%" v-else>
                                <span
                                    style="font-size: 12px; color: #616161"
                                    v-for="(item, index) in newColumnContent"
                                    :key="index"
                                    tile
                                    elevation="0"
                                >
                                    {{ item }}</span
                                >
                            </v-card>
                            <v-card height="10%" tile elevation="0" class="d-flex align-center justify-end">
                                <span style="font-size: 14px; color: #3296fa" class="mr-4" @click="clearContent()">清空</span></v-card
                            >
                        </v-card>
                    </v-card>
                </v-card>
            </v-card>
            <v-card height="10%" tile elevation="0" class="d-flex justify-end align-center pr-5">
                <v-btn style="border: 1.5px solid #2f84f9; color: #2f84f9; width: 60px" height="28px" class="mr-5" @click="isPop = false"
                    >取消</v-btn
                >
                <v-btn style="color: #fdffff" color="#2f84f9" height="28px" @click="confirmColumn()">确定</v-btn>
            </v-card>
        </v-card>

        <!-- 上半区域 -->
        <v-card class="pa-2" height="20%">
            <v-card class="d-flex justify-space-between align-center" height="60" tile elevation="0">
                <v-col class="d-flex align-center justify-space-around" cols="5">
                    <span>表名:</span>
                    <v-col cols="10">
                        <v-text-field placeholder="请输入新增表名" v-model="newTableName" />
                    </v-col>
                </v-col>
                <v-col class="d-flex justify-space-between" cols="2">
                    <v-btn color="#3b4a5f" style="color: #ffffff" @click="returnPage()">返回</v-btn
                    ><v-btn color="#3b4a5f" style="color: #ffffff" @click="addnewTable()">保存</v-btn>
                </v-col>
            </v-card>
            <!-- 选择顺序 -->
            <div class="flow-btn-area mt-3 d-flex align-center">
                <!-- 动态按钮 -->
                <v-card v-for="(item, index) in newColArr" :key="index" width="150" tile flat>
                    <v-card text outlined flat style="user-select: none; cursor: pointer" @click="isPop = true">
                        {{ item }}
                    </v-card>
                    <span>————</span>
                </v-card>
                <!-- 加号按钮下面的菜单栏 -->
                <v-menu v-ripple offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-card v-bind="attrs" v-on="on" outlined flat style="cursor: pointer"><v-icon>mdi-plus</v-icon> </v-card>
                    </template>

                    <v-list>
                        <v-list-item v-ripple v-for="(item, index) in addColArr" :key="index" style="cursor: pointer">
                            <v-list-item-title @click="addBtn(index)">{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-card>

        <!-- 下半区域 -->
        <v-card flat tile class="d-flex" height="80%">
            <!-- 左边的数据列表区域 -->
            <v-col class="pa-0" cols="2">
                <v-card tile flat class="pa-2" height="100%" outlined v-borderTop>
                    <div class="text-subtitle-1">{{ this.folder }}</div>
                    <div v-for="(item, index) in tableList" :key="index" class="mt-4">
                        <div class="text-body-2 mb-2 ml-3" @click="ColumnArr(index)" v-cursor>
                            <span class="mdi mdi-table-large"></span>
                            <span> {{ item.name }}</span>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <!-- 字段添加区域 -->
            <v-col cols="2" class="pa-0 d-flex flex-column align-center" style="height: 100%">
                <v-card
                    class="pa-0 d-flex flex-column align-center"
                    outlined
                    flat
                    tile
                    style="height: 100%; width: 100%; position: relative"
                >
                    <v-card width="100%" height="10%" v-borderBottom class="d-flex align-center justify-space-between pa-2" tile flat>
                        <v-btn @click="chooseAllColumn()" v-if="status" :disabled="listContent.length == 0">全选</v-btn>
                        <v-btn v-else @click="notChoose()">取消全选</v-btn>
                        <v-btn @click="joinColumnData()">确认</v-btn>
                    </v-card>
                    <v-card width="100%" height="90%" tile flat style="position: relative">
                        <v-card
                            class="pa-2 py-4 overflow-y-auto overflow-x-hidden"
                            tile
                            flat
                            style="position: absolute"
                            width="100%"
                            height="100%"
                        >
                            <div
                                v-for="(item, index) in listContent"
                                :key="index"
                                class="d-flex align-center justify-start"
                                style="height: 20px"
                                v-cursor
                            >
                                <v-checkbox dense @click.stop="chooseColumn(index)" v-model="item.checked"></v-checkbox>
                                <span>{{ item.content.substring(0, 16) }}……</span>
                            </div>
                        </v-card>
                    </v-card>
                </v-card>
            </v-col>

            <v-card v-if="this.chooseList.length > 0" style="overflow-y: auto; overflow-x: auto" tile flat elevation="0">
                <v-data-table :headers="this.chooseList" class="elevation-1" :items="this.numberList"></v-data-table>
            </v-card>
        </v-card>
    </div>
</template>
<script>
import { getConnTableColumn, getColumnData, getConnTables } from '../../common/api/select'
import { addNewColumn } from '../../common/api/add'
export default {
    data() {
        return {
            addColArr: ['新增列', '过滤', '分组汇总', '字段设置', '排序'],
            content: '',
            // 动态按钮添加进的数组
            newColArr: ['选字段'],
            // 数据库表名
            tableList: [],
            // 每个数据表对应的表头
            listContent: [],
            // 选择的表头
            chooseList: [],
            // 是否全选、取消全选
            status: true,
            // 新增列弹框是否弹出
            isPop: false,
            // 新增列窗口左侧对应的函数
            functionSelect: ['公式/函数', '时间差', '获取时间', '所有值/组内', '分组赋值', '排名'],
            // 可以操作的算数运算
            functionSign: ['+', '-', '*', '/', '(', ')'],
            // 算数运算
            operationList: ['+', '-', '*', '/'],
            textType: [{ name: '数值字段' }, { name: '文本字段' }, { name: '时间字段' }],
            // 新增列右侧进行运算的部分
            newColumnContent: [],
            // 新增列的名称
            newColumn: null,
            //左括号的数量
            LeftNumber: 0,
            //右括号的数量
            RightNumber: 0,
            // 数据包名称
            folder: '',
            // 数据库连接信息
            databaseConn: {},
            // 获取表中的字段
            columnArr: { tableName: '', sqlType: '', userName: '', password: '', host: '', port: '', database: '' },
            // 选择表中字段连接数据库需要的数据
            joinColumn: {
                tableName: '',
                sqlType: '',
                userName: '',
                password: '',
                host: '',
                port: '',
                database: '',
                limitCount: 0,
                columnName: '',
            },
            //是否显示表格
            isDisplayTable: false,
            //选择表格中的第一个表
            number: 0,
            // 选定表头对应的值
            numberList: [],
            // 表头的值对应的空对象
            obj: {},
            //新增表名
            newTableName: null,
            // 表名
            tableName: null,

            //数据集
            datalist: null,
            //数据库中所有的表
            alltables: null,
            //新增数据的数据集
            rowList: [],
            //表中的字段名
            charrList: [],
            //上传文件所有的数据
            fileList: [],
            // 新增列运算需要的数据库信息
            operationConn: {
                // 表名
                tableName: '',
                // 数据库类型
                sqlType: '',
                // 用户名
                userName: '',
                // 密码
                password: '',
                // 端口号
                host: '',
                // 端口号
                port: '',
                //需要连接的的库
                database: '',
                // 限制条数
                limitCount: 0,
                // 表名
                columnName: '',
                //运算规则
                operatecontent: [],
                page: 1,
            },
        }
    },
    created() {
        this.folder = this.$store.state.folder.name
        this.tableList = this.$store.state.folder.tables
        this.databaseConn = this.$store.state.databaseConnObjArr[0]
        this.datalist = this.$store.state.addNewTable
        getConnTables(this.databaseConn).then((res) => {
            this.alltables = res.data
        })
        this.rowList = this.$store.state.dataList
        this.fileList = this.$store.state.fileList
    },
    methods: {
        // 动态按钮的实现
        addBtn(index) {
            console.log(index)
            console.log('数组长度' + this.newColArr.length)
            this.content = this.addColArr[index]
            if (index > this.newColArr.length - 1) {
                alert('请按照顺序操作')
            } else {
                if (this.listContent.length == 0) {
                    alert('请选择需要新增列的表')
                } else {
                    if (this.newColArr.indexOf(this.content) == -1) {
                        this.newColArr.push(this.content)
                        this.popWindow()
                    } else {
                        alert('不可以重复添加')
                    }
                }
            }
            console.log(this.newColArr)
        },
        // 新增列元素
        addColumnContent(index) {
            var length = this.newColumnContent.length
            if (length == 0) {
                this.newColumnContent.push(this.listContent[index].content)
            } else {
                var position = length - 1
                var sign = this.newColumnContent[position]
                //没有找到运算符号
                if (this.functionSign.indexOf(sign) == -1) {
                    alert('请选择合适的运算符号')
                } else if (sign === ')') {
                    alert('请选择合适的运算符号')
                } else {
                    this.newColumnContent.push(this.listContent[index].content)
                }
            }
        },
        //新增表名
        addnewTable() {
            var newName = { name: '' }
            newName.name = this.newTableName
            this.tableName = newName.name
            if (this.tableList.some((item) => item.name === newName.name)) {
                alert('请勿输入重复表名')
            } else if (this.newTableName == null) {
                alert('请输入表名')
            } else {
                this.tableList.push(newName)
                var tableInfo = { name: null, table: [] }
                tableInfo.name = newName.name
                this.chooseList.forEach((item) => {
                    var filed = { content: null, checked: false }
                    filed.content = item.text
                    tableInfo.table.push(filed)
                })
                this.chooseList = []
                this.datalist.push(tableInfo)
            }
            this.newTableName = null
        },
        //新增算数方法
        operation(index) {
            var length = this.newColumnContent.length
            if (length == 0) {
                if (this.functionSign[index] == '(') {
                    this.LeftNumber = this.LeftNumber + 1
                    this.newColumnContent.push(this.functionSign[index])
                } else {
                    alert('请选择合适的列名进行运算')
                }
            } else {
                var position = length - 1
                // 获取数组前一个位置元素的值
                var sign = this.newColumnContent[position]
                // 判断前一个元素是否为字段
                let isExist = this.listContent.some((item) => item.content === sign)
                //判断前一个是加减乘除运算符号
                let isOperation = this.operationList.some((item) => item === sign)
                // 获取的元素是左括号
                if (this.functionSign[index] == '(') {
                    if (sign === ')') {
                        alert('请选择合适的运算符号')
                    } else if (isExist) {
                        alert('请选择合适的运算符号')
                    } else {
                        this.LeftNumber = this.LeftNumber + 1
                        this.newColumnContent.push(this.functionSign[index])
                    }
                } else if (this.functionSign[index] == ')') {
                    if (this.newColumnContent.indexOf('(') == -1) {
                        alert('请先选择左括号')
                    } else if (isOperation) {
                        alert('请选择合适的字段进行运算')
                    } else {
                        this.RightNumber = this.RightNumber + 1
                        this.newColumnContent.push(this.functionSign[index])
                    }
                } else if (isExist) {
                    if (this.functionSign[index] == '(') {
                        this.LeftNumber = this.LeftNumber + 1
                    } else if (this.functionSign[index] == ')') {
                        this.RightNumber = this.RightNumber + 1
                    }
                    this.newColumnContent.push(this.functionSign[index])
                } else if (sign === ')') {
                    this.newColumnContent.push(this.functionSign[index])
                }
            }
        },
        // 选择表头
        chooseColumn(index) {
            var header = { text: '', value: '' }
            if (this.listContent[index].checked == true) {
                header.text = this.listContent[index].content
                header.value = this.listContent[index].content
                this.chooseList.push(header)
            } else {
                this.chooseList.pop(header)
            }
        },
        // 全选
        chooseAllColumn() {
            this.status = !this.status
            this.listContent.forEach((item) => {
                item.checked = true
                var header = { text: '', value: '' }
                header.text = item.content
                header.value = item.content
                let isExist = this.chooseList.some((item) => item.text === header.text)
                if (!isExist) {
                    this.chooseList.push(header)
                }
            })
        },
        // 取消全选
        notChoose() {
            var header = { text: '' }
            this.status = !this.status
            this.listContent.forEach((item) => {
                item.checked = false
                if (item.checked == true) {
                    header = item.content
                    this.chooseList.push(header)
                } else {
                    this.chooseList.pop(header)
                }
            })
        },
        // 新增列弹框
        popWindow() {
            this.newColumnContent = []
            this.isPop = true
        },
        //确认添加
        confirmColumn() {
            console.log(this.LeftNumber)
            console.log(this.RightNumber)
            if (this.LeftNumber != this.RightNumber) {
                alert('左右括号不对称')
            } else if (this.newColumn != null) {
                var column = { content: '', checked: false }
                column.content = this.newColumn
                this.listContent.unshift(column)
                this.isPop = false
                this.operationConn = this.databaseConn
                var fieldList = []
                this.newColumnContent.forEach((item) => {
                    var isExist = this.listContent.some((name) => name.content === item)
                    if (isExist) {
                        fieldList.push(item)
                    }
                })
                this.operationConn.columnName = fieldList
                this.operationConn.operatecontent = this.newColumnContent
                this.operationConn.tableName = this.tableList[this.number].name
                this.operationConn.limitCount = 100
                this.operationConn.page = 1
                console.log(this.operationConn)
                addNewColumn(this.operationConn).then((res) => {
                    var caldata = { name: '', data: [] }
                    caldata.name = this.newColumn
                    caldata.data = res.data
                    this.rowList.push(caldata)
                })
            } else {
                if (this.newColumnContent.length > 0) {
                    alert('请输入列名')
                } else {
                    this.isPop = false
                }
            }
            console.log(this.listContent)
        },
        // 清空新增列的内容
        clearContent() {
            this.newColumnContent = []
        },
        // 获取表中的字段
        ColumnArr(index) {
            this.number = index
            if (
                this.tableList[index].name.endsWith('.csv') ||
                this.tableList[index].name.endsWith('.xlsx') ||
                this.tableList[index].name.endsWith('.xls')
            ) {
                this.listContent = []
                this.tableList.forEach((item) => {
                    if (item.name == this.tableList[index].name) {
                        var fieldsList = item.file_list[0]
                        fieldsList.forEach((item) => {
                            var field = { content: null, checked: false }
                            field.content = item
                            this.listContent.push(field)
                        })
                    }
                })
            } else if (this.alltables.indexOf(this.tableList[index].name) == -1) {
                this.datalist.forEach((item) => {
                    if (item.name == this.tableList[index].name) {
                        this.listContent = item.table
                    }
                })
            } else {
                this.columnArr = this.databaseConn
                this.columnArr.tableName = this.tableList[index].name
                getConnTableColumn(this.columnArr).then((res) => {
                    this.listContent = []
                    var fieldsList = res.data
                    this.charrList = res.data
                    fieldsList.forEach((item) => {
                        var field = { content: null, checked: false }
                        field.content = item
                        this.listContent.push(field)
                    })
                })
            }
        },
        // 获取表中的数据
        joinColumnData() {
            if (
                this.tableList[this.number].name.endsWith('.csv') ||
                this.tableList[this.number].name.endsWith('.xlsx') ||
                this.tableList[this.number].name.endsWith('.xls')
            ) {
                this.fileList.forEach((item) => {
                    item.forEach((file) => {
                        if (file.name == this.tableList[this.number].name) {
                            var col = file.file_list[0]
                            for (var i = 1; i < file.file_list.length; i++) {
                                this.obj = {}
                                var j = 0
                                col.forEach((colVale) => {
                                    this.obj[colVale] = file.file_list[i][j]
                                    j++
                                })
                                this.numberList.push(this.obj)
                            }
                        }
                    })
                })
            } else {
                this.joinColumn = this.databaseConn
                this.joinColumn.tableName = this.tableList[this.number].name
                this.joinColumn.limitCount = 100
                this.joinColumn.page = 1
                var columnName = []
                this.chooseList.forEach((item) => {
                    columnName.push(item.text)
                })
                var colList = []
                this.charrList.forEach((item) => {
                    if (columnName.some((colName) => colName === item)) {
                        colList.push(item)
                    }
                })
                let index = []
                columnName.forEach((value) => {
                    this.rowList.forEach((key) => {
                        if (key.name == value) {
                            index.push(key)
                        }
                    })
                })
                this.joinColumn.columnName = colList
                getColumnData(this.joinColumn).then((res) => {
                    console.log(index)
                    var columnList = res.data
                    var k = 0
                    columnList.forEach((item) => {
                        this.obj = {}
                        var i = 0
                        var j = 0
                        columnName.forEach((value) => {
                            if (colList.some((key) => key === value)) {
                                this.obj[value] = item[i]
                                i++
                            } else {
                                this.obj[value] = index[j].data[k]
                                j++
                            }
                        })
                        k++
                        this.numberList.push(this.obj)
                    })
                })
            }
        },
        returnPage() {
            this.$router.go(-1)
        },
    },
}
</script>
<style scoped lang="scss">
* {
    user-select: none;
}
.flow-btn-area {
    .v-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 40px;
    }
}
</style>
