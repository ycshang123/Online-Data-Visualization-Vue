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
                    <v-card width="25%" height="100%" tile elevation="0" v-borderLR class="d-flex flex-column align-center">
                        <input
                            type="text"
                            placeholder="搜索"
                            style="border: 1px solid #e0e0e0; font-size: 10px; border-radius: 3px; height: 30px"
                            class="pl-2 mt-1"
                        />
                        <div style="height: 93%; width: 100%; overflow-y: auto; white-space: nowrap">
                            <v-treeview :items="textType" hoverable dense style="font-size: 6px" :open-on-click="true"> </v-treeview>
                        </div>
                    </v-card>
                    <v-card width="75%" height="100%" tile elevation="0" v-borderRight>
                        <v-card height="8%" v-borderBottom tile elevation="0" class="d-flex justify-space-around align-center">
                            <div style="width: 70%; height: 100%" class="d-flex justify-space-around align-center">
                                <span
                                    style="color: #b1b1b1"
                                    v-for="(item, index) in functionSign"
                                    :key="index"
                                    @click="addColumnContent(index)"
                                    v-cursor
                                >
                                    {{ item }}</span
                                >
                            </div>
                        </v-card>
                        <v-card height="92%" width="100%" tile elevation="0">
                            <span v-if="newColumnContent.length == 0" style="font-size: 12px; color: #d5dbe0" class="pa-2"
                                >示例：销售额/计划销售额</span
                            >
                            <span v-else v-for="(item, index) in newColumnContent" :key="index" class="pa-3">
                                {{ item }}
                            </span>
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
                        <v-text-field placeholder="请输入新增表名" v-model="newColumn" />
                    </v-col>
                </v-col>
                <v-col class="d-flex justify-space-between" cols="2">
                    <v-btn color="indigo lighten-2">取消</v-btn><v-btn color="deep-purple lighten-2">保存</v-btn>
                </v-col>
            </v-card>
            <!-- 选择顺序 -->
            <div class="flow-btn-area mt-3 d-flex align-center">
                <!-- 动态按钮 -->
                <v-card v-for="(item, index) in newColArr" :key="index" width="150" tile flat>
                    <v-card text outlined flat style="user-select: none; cursor: pointer">
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
        <v-card class="d-flex" height="80%">
            <!-- 左边的数据列表区域 -->
            <v-col class="pa-0" cols="2">
                <v-card tile flat class="pa-2" height="100%" outlined>
                    <div class="text-subtitle-1">数据列表/2020航空数据</div>
                    <div v-for="(item, index) in tableList" :key="index" class="mt-4">
                        <div class="text-body-2 mb-2 ml-3" @click="selectListContent(index)">{{ item }}</div>
                    </div>
                </v-card>
            </v-col>
            <!-- 字段添加区域 -->
            <v-col cols="2" class="pa-0 red d-flex flex-column align-center">
                <v-card class="d-flex flex-column align-center" outlined flat tile style="height: 100%; width: 100%">
                    <v-card width="100%" height="10%" class="d-flex align-center justify-space-between pa-2" tile elevation="0">
                        <v-btn @click="chooseAllColumn()" v-if="status" :disabled="listContent == null || listContent.length == 0"
                            >全选</v-btn
                        >
                        <v-btn v-else @click="notChoose()">取消全选</v-btn>
                        <v-btn>确定添加</v-btn>
                    </v-card>
                    <v-card width="100%" height="90%" class="pa-2" tile flat>
                        <div
                            v-for="(item, index) in listContent"
                            :key="index"
                            class="d-flex align-center justify-start"
                            style="height: 30px"
                        >
                            <v-checkbox @click.stop="chooseColumn(index)" v-model="item.checked"></v-checkbox>
                            <span>{{ item.content }}</span>
                        </div>
                    </v-card>
                </v-card>
            </v-col>

            <v-card v-if="chooseList.length > 0" style="overflow-y: auto; overflow-x: auto" tile elevation="0">
                <v-data-table :headers="this.chooseList" class="elevation-1"></v-data-table>
            </v-card>
            <!-- <v-col cols="8">
                <v-data-table :headers="this.chooseList" class="elevation-1"></v-data-table>
            </v-col> -->
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addColArr: ['新增列', '过滤', '分组汇总', '字段设置', '排序'],
            content: '',
            newColArr: ['选字段'],
            tableList: ['一月数据表', '二月数据表', '三月数据表', '四月数据表', '五月数据表'],
            listsContent: [
                [
                    { content: '承运日期', checked: false },
                    { content: '出发日期', checked: false },
                    { content: '出发机场', checked: false },
                    { content: '到达城市', checked: false },
                    { content: '客公里', checked: false },
                    { content: '承运日期', checked: false },
                    { content: '出发日期', checked: false },
                ],
                [
                    { content: '二月数据表内容', checked: false },
                    { content: '承运日期', checked: false },
                    { content: '出发日期', checked: false },
                    { content: '出发机场', checked: false },
                    { content: '到达城市', checked: false },
                    { content: '客公里', checked: false },
                    { content: '承运日期', checked: false },
                    { content: '出发日期', checked: false },
                ],
                [{ content: '三月数据表内容', checked: false }],
                [{ content: '四月数据表内容', checked: false }],
                [{ content: '五月数据表内容', checked: false }],
            ],
            listContent: null,
            chooseList: [],
            status: true,
            isPop: false,
            functionSelect: ['公式/函数', '时间差', '获取时间', '所有值/组内', '分组赋值', '排名'],
            functionSign: ['+', '-', '*', '/', '{', '}'],
            textType: [{ name: '数值字段' }, { name: '文本字段' }, { name: '时间字段' }],
            newColumnContent: [],
            isEmpty: false,
            newColumn: '',
        }
    },
    methods: {
        // 动态按钮的实现
        addBtn(index) {
            console.log(index)
            this.content = this.addColArr[index]
            if (index > this.newColumn.length) {
                alert('请按照顺序操作')
            } else {
                if (this.newColArr.indexOf(this.content) == -1) {
                    this.newColArr.push(this.content)
                    this.popWindow()
                } else {
                    alert('不可以重复添加')
                }
            }

            console.log(this.newColArr)
        },
        // 新增列元素
        addColumnContent(index) {
            console.log('点击成功')
            // this.newColumnContent.push(this.functionSign[index])
            console.log(this.newColumnContent)
        },
        // 查询数据库中的表
        selectListContent(index) {
            this.listContent = this.listsContent[index]
        },
        // 选择表头
        chooseColumn(index) {
            var header = { text: '' }
            if (this.listContent[index].checked == true) {
                header.text = this.listContent[index].content
                this.chooseList.push(header)
            } else {
                this.chooseList.pop(header)
            }
            console.log(this.chooseList)
        },
        // 全选
        chooseAllColumn() {
            this.status = !this.status
            this.listContent.forEach((item) => {
                item.checked = true
                var header = { text: '' }
                header.text = item.content
                if (item.checked == true) {
                    console.log(this.chooseList)
                    console.log(this.chooseList.indexOf(header.text))
                    if (this.chooseList.indexOf(header.text) == -1) {
                        this.chooseList.push(header)
                    }
                } else {
                    this.chooseList.pop(header)
                }
            })
            console.log(this.chooseList)
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
        //确认添加@click="confirmColumn()"
        confirmColumn() {
            this.listContent.push(this.newColumn)
            console.log(this.newColumn)
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
