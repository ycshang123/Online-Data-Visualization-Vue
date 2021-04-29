<template>
    <div>
        <!-- 上半区域 -->
        <v-card style="height: 8%" flat tile outlined class="d-flex align-center">
            <v-row no-gutters justify="space-between">
                <v-col cols="4" class="d-flex align-center">
                    <div class="text-h6">{{ obj.tableName }}</div>

                    <div class="ml-12 d-flex align-center justify-center">
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
                    <v-btn to="/object" class="blue-grey lighten-1 white--text">进入仪表板</v-btn>
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
                        <div>一月航空数据表</div>
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
                            <div class="overflow-y-auto overflow-x-hidden" v-absolute style="width: 98%">
                                <v-card
                                    v-for="(item, index) in dimensionalityArr"
                                    :key="item.id"
                                    draggable="true"
                                    @dragstart="dragstart($event, item, index)"
                                    @dragend="dragend($event)"
                                    class="pa-1 mb-2 d-flex align-center"
                                    color="#E8EAF6"
                                    v-cursor
                                >
                                    <v-icon> mdi-menu-right</v-icon> {{ item.name }}
                                </v-card>
                            </div>
                        </div>
                    </v-card>
                    <!-- 指标 -->
                    <v-card height="47%" tile flat class="d-flex flex-column justify-space-between">
                        <div style="height: 8%">指标</div>
                        <div style="height: 90%; width: 100%" v-relative>
                            <div class="overflow-y-auto overflow-x-hidden" v-absolute style="width: 98%">
                                <v-card
                                    v-for="(item, index) in indicatorArr"
                                    :key="index"
                                    draggable="true"
                                    @dragstart="dragstart($event, item, index)"
                                    @dragend="dragend($event)"
                                    class="pa-1 mb-2 d-flex align-center"
                                    color="#EDE7F6"
                                    v-cursor
                                >
                                    <v-icon> mdi-menu-right</v-icon> {{ item.name }}
                                </v-card>
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
                                                class="d-flex align-center justify-center"
                                                elevation="1"
                                                width="25"
                                                height="25"
                                                icon
                                                v-on="on"
                                                v-bind="attrs"
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
                                            {{ item.name }}
                                        </v-badge>
                                    </v-card>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" class="mt-4">
                            <v-col cols="1">
                                <div>纵轴</div>
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
                                                {{ item.name }}
                                            </v-badge>
                                        </v-card>
                                    </v-card>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card height="75%" class="" flat tile outlined :class="dataStatus ? 'd-flex align-center' : ''">
                        <ve-histogram class="overflow-x-auto" :data="chartData" :settings="chartSettings"></ve-histogram>
                    </v-card>
                </v-card>
            </v-col>
        </div>
    </div>
</template>
<script>
import { getDIDataApi, getChartAllData, getChartData } from '../../common/api/select'
export default {
    name: 'Dashboard',
    data() {
        this.chartSettings = {
            axisSite: { right: ['下单率'] },
            yAxisType: ['KMB', 'percent'],
            yAxisName: ['数值', '比率'],
            showLine: ['下单率'],
        }
        return {
            obj: {
                tableName: 'sample_1k_flts',
                columnName: [],
                sqlType: 'postgresql',
                userName: 'postgres',
                password: 'root',
                host: 'localhost',
                port: 5432,
                database: 'postgres',
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
            // 图标类型图标数组
            chartArr: [
                { id: 0, type: '柱状图', icon: require('../../assets/pic/chart/bar.png') },
                { id: 1, type: '饼图', icon: require('../../assets/pic/chart/pie.png') },
                { id: 2, type: '折线图', icon: require('../../assets/pic/chart/line.png') },
                { id: 3, type: '散点图', icon: require('../../assets/pic/chart/scatter.png') },
                { id: 4, type: 'K 线图', icon: require('../../assets/pic/chart/candlestick.png') },
                { id: 5, type: '雷达图', icon: require('../../assets/pic/chart/radar.png') },
                { id: 6, type: '漏斗图', icon: require('../../assets/pic/chart/funnel.png') },
                { id: 7, type: '仪表盘', icon: require('../../assets/pic/chart/gauge.png') },
                { id: 8, type: '地图', icon: require('../../assets/pic/chart/map.png') },
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
            index: 0,
            colNameList: [],
        }
    },
    created() {
        this.getDIData()
        // let connObj = this.$route.params.table.conn
        // let tableName = this.$route.params.table.name
    },
    mounted() {
        this.chartData.columns = ['日期', '访问用户', '下单用户', '下单率']
        this.chartData.rows = [
            { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
            { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
            { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
            { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
            { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
            { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
            { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
            { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
            { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ]
        this.dataStatus = true
    },
    methods: {
        /**
         * @description: 初始化数据方法
         * @param {*}
         * @return {*}
         */
        async getChartAllData() {
            let arr = this.$store.state.chartData
            if (arr.length == 0) {
                await getChartAllData(this.obj).then((res) => {
                    this.allDataIndex = res.data.allDataListIndex
                    this.$store.commit(
                        'pushChartData',
                        JSON.stringify({
                            database: this.obj.database,
                            tableName: this.obj.tableName,
                            index: res.allDataListIndex,
                        })
                    )
                })
            } else {
                for (let i = 0; i < arr; i++) {
                    let item = arr[i]
                    if (item.database != obj.database && item.tableName != obj.tableName) {
                        await getChartAllData(this.obj).then((res) => {
                            this.allDataIndex = res.data.allDataListIndex
                            this.$store.commit(
                                'pushChartData',
                                JSON.stringify({
                                    database: this.obj.database,
                                    tableName: this.obj.tableName,
                                    index: res.allDataListIndex,
                                })
                            )
                        })
                        break
                    }
                }
            }
        },

        /**
         * @description: 调用获取维度和指标数组数据的方法
         * @param {*}
         * @return {*}
         */
        async getDIData() {
            await getDIDataApi(this.obj).then((res) => {
                console.log(res)
                this.dimensionalityArr = res.data.dimensionality
                this.indicatorArr = res.data.indicator
                // 获取所有的指标和维度值，构造成一个数组，并且赋值给obj对象
                for (let i = 0; i < this.dimensionalityArr.length; i++) {
                    let item = this.dimensionalityArr[i]
                    this.colNameList.push(item.name)
                }
                for (let i = 0; i < this.indicatorArr.length; i++) {
                    let item = this.indicatorArr[i]
                    this.colNameList.push(item.name)
                }
                this.obj.columnName = this.colNameList
                this.getChartAllData()
            })
        },

        /**
         * 删除按钮的监听器
         * xy: 表示对哪个轴进行操作
         */
        delXYAxisArr(o, i, xy) {
            let obj
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
                if (item.type == 'dimensionality') {
                    // 删除被拖拉的对象
                    this.dimensionalityArr.splice(item.index, 1)
                } else {
                    // 删除被拖拉的对象
                    this.indicatorArr.splice(item.index, 1)
                }
                /**
                 * 2. 再在目标区域内追加元素
                 */
                if (elId == 'xAxis') {
                    // 在 x 轴 中追加一个数据
                    this.xAxisArr.push(item)
                } else {
                    // 在 y 轴 中追加一个数据
                    this.yAxisArr.push(item)
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
                for (let i = 0; i < this.yAxisArr.length; i++) {
                    columns.push(this.yAxisArr[i].name)
                }
                console.log('开始生成数据')
                console.log(columns)
                // 谢晓茜接口所需参数
                console.log(this.allDataIndex)
                let param = {
                    allColNameList: this.colNameList, // 单独的所有维度和指标数组
                    allDataListIndex: this.allDataIndex, // 全局变量的索引值
                    colNameList: columns, // 所选择的字段
                }
                console.log(param)
                await getChartData(param).then((res) => {
                    console.log(res)
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
</style>



