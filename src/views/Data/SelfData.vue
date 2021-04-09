<template>
    <div class="">
        <!-- 上半区域 -->
        <v-card style="height: 20%" class="pa-2" tile outlined flat>
            <v-card class="d-flex justify-space-between align-center" height="60" tile elevation="0">
                <v-col class="d-flex align-center justify-space-around" cols="5">
                    <span>表名:</span>
                    <v-col cols="10">
                        <v-text-field placeholder="请输入新增表名" />
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
        <div class="d-flex" style="height: 80%">
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
            <v-col cols="2" class="pa-0">
                <v-card class="pa-2 d-flex flex-column align-center" outlined flat tile style="height: 100%">
                    <v-card width="100%" class="d-flex align-center justify-space-between" tile elevation="0">
                        <v-btn @click="chooseAllColumn()" v-if="status">全选</v-btn>
                        <v-btn v-else @click="notChoose()">取消全选</v-btn>
                        <v-btn>确定添加</v-btn>
                    </v-card>
                    <v-col cols="12">
                        <div
                            v-for="(item, index) in listContent"
                            :key="index"
                            class="d-flex align-center justify-start"
                            style="height: 30px"
                        >
                            <v-checkbox @click.stop="chooseColumn(index)" v-model="item.checked"></v-checkbox>
                            <span>{{ item.content }}</span>
                        </div>
                    </v-col>
                </v-card>
            </v-col>

            <v-col cols="8" class="">
                <v-data-table :headers="this.chooseList" class="elevation-1"></v-data-table>
            </v-col>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addColArr: ['新增列', '过滤', '分组汇总', '字段设置', '排序'],
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
                [{ content: '二月数据表内容', checked: false }],
                [{ content: '三月数据表内容', checked: false }],
                [{ content: '四月数据表内容', checked: false }],
                [{ content: '五月数据表内容', checked: false }],
            ],
            listContent: null,
            chooseList: [],
            status: true,
        }
    },
    methods: {
        // 动态按钮的实现
        addBtn(index) {
            this.content = this.addColArr[index]
            if (this.newColArr.indexOf(this.content) == -1) {
                this.newColArr.push(this.content)
            } else {
                alert('不可以重复添加')
            }
            console.log(this.newColArr)
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
            var header = { text: '' }
            this.status = !this.status
            this.listContent.forEach((item) => {
                item.checked = true
                if (item.checked == true) {
                    header.text = item.content
                    this.chooseList.push(header)
                } else {
                    this.chooseList.pop(header)
                }
            })
            console.log(this.listsContent)
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
