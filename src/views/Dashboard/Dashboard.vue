<template>
    <div>
        <!-- 上半区域 -->
        <v-card style="height: 8%" flat tile outlined class="d-flex align-center">
            <v-row no-gutters justify="space-between">
                <v-col cols="4" class="d-flex align-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-card v-bind="attrs" outlined flat v-on="on" width="30%" class="d-flex justify-space-between">
                                {{ packageName.length > 8 ? packageName.substring(0, 8) + '...' : packageName }}
                                <v-icon right dark color="blue-grey lighten-1"> mdi-chevron-down </v-icon>
                            </v-card>
                        </template>
                        <v-list>
                            <v-list-item ripple v-for="(item, index) in packageList" :key="index" v-cursor>
                                <v-list-item-title @click="choicePackage(index)">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <div class="ml-8 d-flex align-center justify-center">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon class="mr-4" v-on="on" v-bind="attrs">
                                    <v-icon color="blue-grey lighten-1">mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>添加</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-on="on" v-bind="attrs">
                                    <v-icon color="blue-grey lighten-1">mdi-reply</v-icon>
                                </v-btn>
                            </template>
                            <span>撤销</span>
                        </v-tooltip>
                    </div>
                </v-col>
                <v-col cols="1 d-flex justify-end">
                    <v-btn @click="toObjectPage()" class="blue-grey lighten-1 white--text">进入仪表板</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <!-- 下半区域 -->
        <div class="d-flex" style="height: 92%; width: 100%">
            <!-- 左 -->
            <v-col cols="2 pa-0">
                <v-card height="100%" class="pa-0" tile flat>
                    <!-- 顶部标题 -->
                    <v-card height="6%" tile flat class="d-flex align-center justify-space-between" v-borderBottom>
                        <!-- <div>一月航空数据表</div> -->
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <!-- <div style="width: 20%" class="text-h6 red" v-bind="attrs" v-on="on">{{ obj.tableName }}</div> -->
                                <div
                                    v-ripple="{ class: 'primary--text' }"
                                    v-bind="attrs"
                                    v-on="on"
                                    style="width: 63%; border: 1px solid #e0e0e0"
                                    class="d-flex justify-space-between px-2"
                                >
                                    {{ tableName.length > 8 ? tableName.substring(0, 8) + '...' : tableName }}
                                    <v-icon right dark color="blue-grey lighten-1"> mdi-chevron-down </v-icon>
                                </div>
                            </template>
                            <v-list>
                                <v-list-item ripple v-for="(item, index) in tableList" :key="index" v-cursor>
                                    <v-list-item-title @click="choiceTable(index)">{{ item.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <!-- 按钮组 -->
                        <div>
                            <v-btn icon color="blue-grey lighten-1">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn icon color="blue-grey lighten-1">
                                <v-icon>mdi-compare-horizontal</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                    <!-- 维度 -->
                    <v-card height="47%" tile flat v-borderBottom>
                        <div style="height: 8%">维度</div>
                        <div style="height: 90%" v-relative>
                            <div
                                v-if="dimensionalityArr.length !== 0"
                                class="overflow-y-auto overflow-x-hidden"
                                v-absolute
                                style="width: 98%"
                            >
                                <div v-for="(item, index) in dimensionalityArr" :key="index">
                                    <v-card
                                        :key="item.id"
                                        draggable="true"
                                        @dragstart="dragstart($event, item, index)"
                                        @dragend="dragend($event)"
                                        @dblclick="modifyColName(index, 'x')"
                                        class="pa-1 mb-2 d-flex align-center"
                                        color="#E8EAF6"
                                        v-cursor
                                    >
                                        <input
                                            v-show="item.isModify"
                                            type="text"
                                            class="gray pl-2"
                                            placeholder="请输入修改后的名字"
                                            style="border: 1px solid red"
                                            ref="xFocus"
                                            @keyup.enter="$event.target.blur"
                                            @blur="saveColName(index, 'x')"
                                            v-model="colName"
                                        />
                                        <div v-show="!item.isModify">
                                            <v-icon> mdi-menu-right</v-icon>
                                            {{ item.alias == '' ? item.name : item.alias }}
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </div>
                    </v-card>
                    <!-- 指标 -->
                    <v-card height="47%" tile flat class="d-flex flex-column justify-space-between">
                        <div style="height: 8%">指标</div>
                        <div style="height: 90%; width: 100%" v-relative>
                            <div
                                v-if="dimensionalityArr.length !== 0"
                                class="overflow-y-auto overflow-x-hidden"
                                v-absolute
                                style="width: 98%"
                            >
                                <div v-for="(item, index) in indicatorArr" :key="index">
                                    <v-card
                                        draggable="true"
                                        @dragstart="dragstart($event, item, index)"
                                        @dragend="dragend($event)"
                                        @dblclick="modifyColName(index, 'y')"
                                        class="pa-1 mb-2 d-flex align-center"
                                        color="#EDE7F6"
                                        v-cursor
                                    >
                                        <input
                                            v-show="item.isModify"
                                            type="text"
                                            class="gray pl-2"
                                            placeholder="请输入修改后的名字"
                                            style="border: 1px solid red"
                                            ref="yFocus"
                                            @keyup.enter="$event.target.blur"
                                            @blur="saveColName(index, 'y')"
                                            v-model="colName"
                                        />
                                        <div v-show="!item.isModify">
                                            <v-icon> mdi-menu-right</v-icon>
                                            {{ item.alias == '' ? item.name : item.alias }}
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-card>
            </v-col>

            <!-- 中 -->
            <v-col cols="2 pa-0">
                <v-card height="100%" tile flat v-borderLR class="pa-0">
                    <v-card tile flat height="30%">
                        <div>图表类型</div>
                        <v-card class="mt-3 overflow-y-auto overflow-x-hidden" tile outlined flat height="80%">
                            <v-row>
                                <v-col cols="4 d-flex justify-center" v-for="(item, index) in chartArr" :key="index">
                                    <v-tooltip nudge-top="10" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                :class="chartArr[index].isSelect ? 'select' : ''"
                                                class="d-flex align-center justify-center"
                                                elevation="1"
                                                width="25"
                                                height="25"
                                                icon
                                                v-on="on"
                                                v-bind="attrs"
                                                @click="changeType(index)"
                                            >
                                                <img draggable="false" :src="item.icon" />
                                            </v-btn>
                                        </template>
                                        <span>{{ item.type }}</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-card>
                    <v-card tile flat height="70%" class="pa-0" v-borderTop>
                        <v-card flat tile class="pa-0" height="8%">
                            <v-row no-gutters>
                                <v-col cols="6 ">
                                    <v-card tile flat class="text-center" v-cursor ripple v-borderRight>
                                        <div>图形属性</div>
                                    </v-card>
                                </v-col>
                                <v-col cols="6">
                                    <v-card tile flat class="text-center" v-cursor ripple>
                                        <div>组件样式</div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card tile flat height="92%" v-borderTop>
                            <v-card tile flat outlined class="pa-1 mb-4" style="cursor: pointer" ripple>颜色</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4" style="cursor: pointer" ripple>大小</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4" style="cursor: pointer" ripple>标签</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4" style="cursor: pointer" ripple>提示</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4" style="cursor: pointer" ripple>细粒度</v-card>
                        </v-card>
                    </v-card>
                </v-card>
            </v-col>

            <!-- 右 -->
            <v-col cols="8 pa-0">
                <v-card class="pb-0 d-flex flex-column justify-space-between" tile flat height="100%">
                    <v-card class="" flat height="20%">
                        <v-row no-gutters align="center" class="">
                            <v-col cols="1">
                                <div>横轴</div>
                            </v-col>
                            <v-col cols="11">
                                <v-card
                                    id="xAxis"
                                    flat
                                    tile
                                    outlined
                                    class="d-flex align-center"
                                    height="60"
                                    @dragover.prevent
                                    @drop="drop($event)"
                                >
                                    <v-card
                                        class="mr-4 py-1 px-3"
                                        style="cursor: pointer"
                                        rounded="lg"
                                        outlined
                                        v-for="(item, index) in xAxisArr"
                                        :key="index"
                                        @mouseenter="item.isShow = true"
                                        @mouseleave="item.isShow = false"
                                    >
                                        <v-badge
                                            :value="item.isShow"
                                            title="删除"
                                            bordered
                                            icon="mdi-close-circle-outline"
                                            color="#bdbdbd"
                                            @click.native="delXYAxisArr(item, index, 'xAxis')"
                                        >
                                            {{ item.alias == '' ? item.name : item.alias }}
                                        </v-badge>
                                    </v-card>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" class="mt-4">
                            <v-col cols="1" class="d-flex">
                                <div>
                                    <div>纵轴</div>
                                    <div style="sheight: 15px; font-size: 5px; color: gray">{{ funName }}</div>
                                </div>
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <div class="ml-4" style="border-radius: 3px" v-bind="attrs" v-on="on" v-cursor>
                                            <v-icon v-ripple small>mdi-chevron-down </v-icon>
                                        </div>
                                    </template>
                                    <v-list>
                                        <v-list-item ripple v-for="(item, index) in funList" :key="index" v-cursor>
                                            <v-list-item-title @click="changeFun(index)">{{ item.text }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                            <v-col cols="11" style="height: 60px" v-relative>
                                <div style="height: 60px" v-absolute>
                                    <v-card
                                        id="yAxis"
                                        flat
                                        tile
                                        outlined
                                        class="d-flex align-center overflow-x-auto overflow-y-hidden"
                                        height="60"
                                        @dragover.prevent
                                        @drop="drop($event)"
                                    >
                                        <v-card
                                            class="mr-4 py-1 px-1"
                                            style="cursor: pointer"
                                            rounded="lg"
                                            outlined
                                            v-for="(item, index) in yAxisArr"
                                            :key="index"
                                            @mouseenter="item.isShow = true"
                                            @mouseleave="item.isShow = false"
                                        >
                                            <v-badge
                                                :value="item.isShow"
                                                title="删除"
                                                bordered
                                                icon="mdi-close-circle-outline"
                                                color="#bdbdbd"
                                                @click.native="delXYAxisArr(item, index, 'yAxis')"
                                            >
                                                {{ item.alias == '' ? item.name : item.alias }}
                                            </v-badge>
                                        </v-card>
                                    </v-card>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card height="75%" flat tile outlined :class="dataStatus ? 'd-flex align-center' : ''">
                        <multiChart :settings="settings" :chartType="chartType" :data="chartData" :dataStatus="dataStatus"></multiChart>
                    </v-card>
                </v-card>
            </v-col>
        </div>
    </div>
</template>
<script>
import { getDIDataApi, getChartAllData, getChartData } from '../../common/api/select'
import multiChart from '../../components/multi-chart'
export default {
    name: 'Dashboard',
    components: { multiChart },
    data() {
        return {
            // 修改列名时候的参数对象
            colName: '',
            // 操作类型的名称
            funName: '求和',
            // 数据处理的方式
            funType: 'SUM',
            // 操作选项
            funList: [
                { id: 0, text: '求和' },
                { id: 1, text: '方差' },
                { id: 2, text: '平均值' },
                { id: 3, text: '最大值' },
                { id: 4, text: '最小值' },
                { id: 5, text: '标准差' },
            ],
            // 包列表
            packageList: [],
            // 当前选中包的 index
            packageIndex: 0,
            // 表列表
            tableList: [],
            // 当前选中表的 index
            tableIndex: 0,
            // 当前表名
            tableName: '请选择表',
            // 当前包名
            packageName: '请选择包',
            // 图表类型变量
            chartType: 'histogram',
            obj: {
                // tableName: 'test',
                // columnName: [],
                // sqlType: 'postgresql',
                // userName: 'postgres',
                // password: 'root',
                // host: 'localhost',
                // port: 5432,
                // database: 'postgres',
            },
            // 当前操作表对象（包含表名和所有的字段名）
            tableObj: null,
            // 图表所需的数据是否已经全部加载的状态
            dataStatus: false,
            // 图标的配置项 option
            chartData: {
                columns: [],
                rows: [],
            },
            settings: {},
            // 图标类型图标数组
            chartArr: [
                { id: 0, isSelect: true, chartType: 'histogram', type: '柱状图', icon: require('../../assets/pic/chart/bar.png') },
                { id: 1, isSelect: false, chartType: 'pie', type: '饼图', icon: require('../../assets/pic/chart/pie.png') },
                { id: 2, isSelect: false, chartType: 'line', type: '折线图', icon: require('../../assets/pic/chart/line.png') },
                { id: 3, isSelect: false, chartType: 'scatter', type: '散点图', icon: require('../../assets/pic/chart/scatter.png') },
                { id: 4, isSelect: false, chartType: 'candle', type: 'K线图', icon: require('../../assets/pic/chart/candlestick.png') },
                { id: 5, isSelect: false, chartType: 'radar', type: '雷达图', icon: require('../../assets/pic/chart/radar.png') },
                { id: 6, isSelect: false, chartType: 'funnel', type: '漏斗图', icon: require('../../assets/pic/chart/funnel.png') },
                { id: 7, isSelect: false, chartType: 'gauge', type: '仪表盘', icon: require('../../assets/pic/chart/gauge.png') },
                { id: 8, isSelect: false, chartType: 'map', type: '地图', icon: require('../../assets/pic/chart/map.png') },
            ],
            // 维度 内容数组
            dimensionalityArr: [],
            // 指标 内容数组
            indicatorArr: [],
            // X 轴数组
            xAxisArr: [],
            // Y 轴数组
            yAxisArr: [],
            // 谢晓茜接口所需参数
            index: Number,
            colNameList: [],
            // 图表类型选项中的上一项 index
            chartArrIndex: 0,
        }
    },
    created() {
        this.initPackageTableData()
    },
    methods: {
        /**
         * @description:    跳转到仪表板界面
         * @param {*}
         * @return {*}
         */
        toObjectPage() {
            this.$router.push({
                name: 'Object',
                params: {
                    chartData: this.chartData,
                    settings: this.settings,
                    chartType: this.chartType,
                },
            })
        },
        /**
         * @description: 保存修改后的列名
         * @param {*} index
         * @param {*} type
         * @return {*}
         */
        saveColName(index, type) {
            if (type == 'x') {
                this.dimensionalityArr[index].alias = this.colName
            } else {
                this.indicatorArr[index].alias = this.colName
            }
            this.modifyColName(index, type, false)
            this.colName = ''
        },
        /**
         * @description: 字段修改别名的方法
         * @param {*} index 索引
         * @param {*} type x 和 y 轴数据区分的参数
         * @return {*}
         */
        modifyColName(index, type, status = true) {
            if (type == 'x') {
                let item = this.dimensionalityArr[index]
                item.isModify = status
                this.dimensionalityArr.splice(index, 1, item)
                this.$nextTick(() => {
                    this.$refs.xFocus[index].focus()
                })
            } else {
                let item = this.indicatorArr[index]
                item.isModify = status
                this.indicatorArr.splice(index, 1, item)
                this.$nextTick(() => {
                    this.$refs.yFocus[index].focus()
                })
            }
        },
        /**
         * @description: 改变计算方式的方法
         * @param {*} index 索引值
         * @return {*}
         */
        changeFun(index) {
            this.funName = this.funList[index].text
            switch (this.funList[index].text) {
                case '求和':
                    this.funType = 'SUM'
                    break
                case '平均值':
                    this.funType = 'MEAN'
                    break
                case '最大值':
                    this.funType = 'MAX'
                    break
                case '最小值':
                    this.funType = 'MIN'
                    break
                case '方差':
                    this.funType = 'VAR'
                    break
                case '标准差':
                    this.funType = 'STD'
                    break
                default:
                    this.funType = 'SUM'
            }
            this.getChartData()
        },
        /**
         * @description: 初始化包和表基本信息方法
         * @param {*}
         * @return {*}
         */
        initPackageTableData() {
            let routeParamTable = this.$route.params.table
            console.log(routeParamTable)
            /**
             * 1. 直接点击侧边栏跳转的方式
             */
            if (routeParamTable == undefined) {
                this.packageList = this.$store.state.folders
                if (this.packageList.length != 0) {
                    this.packageName = this.packageList[this.packageIndex].name
                    if (this.packageList[this.packageIndex].tables) {
                        this.tableList = this.packageList[this.tableIndex].tables
                    }
                }
            } else {
                /**
                 * 2. 从某一张表跳转过来的方式
                 */
                this.packageList = this.$store.state.folders
                console.log(this.packageList.length)
                // 设置包名
                this.packageName = this.packageList[this.packageIndex].name
                // 设置表列表
                this.tableList = this.packageList[this.tableIndex].tables
                // 判断传过来的是一个数据库表对象还是一个文件对象（csv文件）

                this.obj = routeParamTable.conn
                this.obj.tableName = routeParamTable.name
                this.tableName = this.obj.tableName
                this.obj.columnName = []
                this.packageName = this.$store.state.folder.name
                this.initData()
            }
        },
        /**
         * @description: 选择表名的方法
         * @param {*} index
         * @return {*}
         */
        choiceTable(index) {
            this.clearData()
            this.tableIndex = index
            this.tableName = this.tableList[this.tableIndex].name
            let currentTable = this.$store.state.folders[this.packageIndex].tables[this.tableIndex]
            this.obj = currentTable.conn
            this.obj.tableName = currentTable.name
            this.initData()
        },
        /**
         * @description: 选择包名的方法
         * @param {*} index
         * @return {*}
         */
        choicePackage(index) {
            this.packageIndex = index
            this.packageName = this.packageList[index].name
            this.tableList = this.packageList[index].tables
            this.tableName = '请选择表'
            this.clearData()
        },
        /**
         * @description: 改变图表类型的方法
         * @param {*} index
         * @return {*}
         */
        changeType(index) {
            this.chartArr[this.chartArrIndex].isSelect = false
            this.chartArrIndex = index
            this.dataStatus = false
            this.chartType = this.chartArr[index].chartType
            this.chartArr[index].isSelect = !this.chartArr[index].isSelect
            setTimeout(() => {
                this.dataStatus = true
            }, 0.01)
        },
        /**
         * @description: 初始化数据方法
         * @param {*}
         * @return {*}
         */
        async initData() {
            /**
             * 1. 调用获取维度和指标数组数据的方法
             */
            await getDIDataApi(this.obj).then((res) => {
                this.dimensionalityArr = res.data.dimensionality
                this.indicatorArr = res.data.indicator
                this.colNameList = []
                // 获取所有的指标和维度值，构造成一个数组，并且赋值给 obj 对象
                for (let i = 0; i < this.dimensionalityArr.length; i++) {
                    let item = this.dimensionalityArr[i]
                    item['isModify'] = false
                    item['alias'] = ''
                    this.colNameList.push(item.name)
                }
                for (let i = 0; i < this.indicatorArr.length; i++) {
                    let item = this.indicatorArr[i]
                    item['isModify'] = false
                    item['alias'] = ''
                    this.colNameList.push(item.name)
                }
                this.obj.columnName = this.colNameList
                /**
                 * 2. 调用获取 所有 指标和维度数组数据的方法
                 */
                getChartAllData(this.obj).then((res) => {
                    this.allDataIndex = res.data.allDataListIndex
                    this.obj = {}
                })
            })
        },

        /**
         * 删除按钮的监听器
         * xy: 表示对哪个轴进行操作
         */
        delXYAxisArr(o, i, xy) {
            let obj = {}
            if (xy == 'xAxis') {
                obj = this.xAxisArr.splice(i, 1)
            } else {
                obj = this.yAxisArr.splice(i, 1)
            }
            if (o.type == 'dimensionality') {
                let { type, index, isShow, ...item } = obj[0]
                this.dimensionalityArr.push(item)
                this.dimensionalityArr.sort(this.compare('id'))
            } else {
                let { type, index, isShow, ...item } = obj[0]
                this.indicatorArr.push(item)
                this.indicatorArr.sort(this.compare('id'))
            }
            this.getChartData()
        },

        /**
         * @description: 参数清空方法
         * @param {*}
         * @return {*}
         */
        clearData() {
            this.xAxisArr = []
            this.yAxisArr = []
            this.dimensionalityArr = []
            this.indicatorArr = []
            this.chartData.columns = []
            this.chartData.rows = []
        },

        /**
         * 拖 动作开始方法
         */
        dragstart(event, item, index) {
            /**
             *  在 维度 数组中找到了目标 item 对象，则表示对 维度 中的元素进行操作
             *  追加一个 type 属性，表示对哪类数据进行操作
             **/
            if (JSON.stringify(this.dimensionalityArr).indexOf(JSON.stringify(item)) != -1) {
                item.type = 'dimensionality'
            } else {
                item.type = 'indicator'
            }
            // 给 item 对象追加一个 索引 的属性，以便后续进行删除数组中的数据
            item.index = index
            // 追加一个状态值，表示关闭按钮是否显示
            item.isShow = false
            // 注意：这里的 setData() 方法基本上只能传递字符串，不能传递数字、对象等
            event.dataTransfer.setData('item', JSON.stringify(item))
        },

        /**
         * 拖拉到拖拉结束并放之间 的动作监听方法
         */
        drop(event) {
            let elId = event.target.id || event.srcElement.id
            if (elId == 'xAxis' && this.xAxisArr.length != 0) {
                this.GLOBAL.pushAlertArrObj({
                    type: 'error',
                    content: 'X 轴上只能放一个数据！',
                })
            } else {
                let item = JSON.parse(event.dataTransfer.getData('item'))
                /**
                 * 1. 先删除被拖放元素
                 */
                if (item.type == 'dimensionality' && elId == 'xAxis') {
                    // 删除被拖拉的对象
                    this.dimensionalityArr.splice(item.index, 1)
                    // 在 x 轴 中追加一个数据
                    this.xAxisArr.push(item)
                } else if (item.type == 'indicator' && elId != 'xAxis') {
                    // 删除被拖拉的对象
                    this.indicatorArr.splice(item.index, 1)
                    // 在 y 轴 中追加一个数据
                    this.yAxisArr.push(item)
                } else {
                    this.GLOBAL.pushAlertArrObj({
                        type: 'error',
                        content: `请将 ${item.type == 'dimensionality' ? '“维度”' : '“指标”'} 内的字段放在 ${
                            item.type == 'dimensionality' ? '“x”' : '“y”'
                        } 轴上！`,
                    })
                }
                /**
                 * 3. 最后获取对应的数据
                 */
                this.getChartData()
            }
        },

        /**
         * 拖 动作结束方法
         */
        dragend(event) {
            // 无参数则删除所有数据
            event.dataTransfer.clearData()
        },

        /**
         * 按照指定属性进行排序的方法
         */
        compare(param) {
            return (obj1, obj2) => {
                let value1 = obj1[param]
                let value2 = obj2[param]
                return value1 - value2
            }
        },

        /**
         * @description: 获取图表所对应的数据的方法
         * @param {*}
         * @return {*}
         */
        async getChartData() {
            if (this.xAxisArr.length != 0 && this.yAxisArr.length != 0) {
                let columns = [this.xAxisArr[0].name]
                let aliasList = [this.xAxisArr[0].alias == '' ? this.xAxisArr[0].name : this.xAxisArr[0].alias]
                for (let i = 0; i < this.yAxisArr.length; i++) {
                    let item = this.yAxisArr[i]
                    columns.push(item.name)
                    aliasList.push(item.alias == '' ? item.name : item.alias)
                }
                console.log('开始生成数据')
                let param = {
                    allColNameList: this.colNameList, // 单独的所有维度和指标数组
                    allDataListIndex: this.allDataIndex, // 全局变量的索引值
                    colNameList: columns, // 所选择的字段
                    aliasList: aliasList,
                    funType: this.funType,
                }
                await getChartData(param).then((res) => {
                    this.chartData.columns = columns
                    this.chartData.rows = res.data
                    this.dataStatus = true
                    // 设置图例
                    this.settings.dimension = [aliasList[0]]
                    let metrics = []
                    for (let i = 1; i < aliasList.length; i++) {
                        metrics.push(aliasList[i])
                    }
                    this.settings.metrics = metrics
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.v-card {
    padding: 8px 8px 8px 8px;
}
.select {
    border: 1px solid red;
}
</style>
