<template>
    <div>
        <!-- 上半区域 -->
        <v-card style="height: 8%" flat tile outlined class="d-flex align-center">
            <v-row no-gutters justify="space-between">
                <v-col cols="4" class="d-flex align-center">
                    <div class="text-h6">一月座客率</div>

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
            <v-col cols="2 red pa-0">
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
                        <div>维度</div>
                        <div class="mt-4 overflow-y-auto overflow-x-hidden">
                            <v-card
                                v-for="(item, index) in dimensionalityArr"
                                :key="item.id"
                                draggable="true"
                                @dragstart="dragstart($event, item, index)"
                                @dragend="dragend($event)"
                                class="pa-1 mb-2 d-flex align-center"
                                color="#c5cae9"
                                style="cursor: pointer"
                            >
                                <v-icon> mdi-menu-right</v-icon> {{ item.name }}
                            </v-card>
                        </div>
                    </v-card>
                    <!-- 指标 -->
                    <v-card height="47%" tile flat>
                        <div class="d-flex justify-space-between align-center">
                            <div>指标</div>
                            <v-col class="pa-0" cols="4">
                                <v-btn icon>
                                    <v-icon>mdi-plus </v-icon>
                                </v-btn>
                            </v-col>
                        </div>
                        <div class="mt-4 overflow-y-auto overflow-x-hidden">
                            <v-card
                                v-for="(item, index) in indicatorArr"
                                :key="index"
                                draggable="true"
                                @dragstart="dragstart($event, item, index)"
                                @dragend="dragend($event)"
                                class="pa-1 mb-2 d-flex align-center"
                                color="#d1c4e9"
                                style="cursor: pointer"
                            >
                                <v-icon> mdi-menu-right</v-icon> {{ item.name }}
                            </v-card>
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
                                                <img :src="item.icon" />
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
            <v-col cols="8  pa-0">
                <v-card class="d-flex flex-column justify-space-between" tile flat height="100%">
                    <v-card class="" flat height="20%">
                        <v-row no-gutters align="center" class="">
                            <v-col cols="1">
                                <div>横轴</div>
                            </v-col>
                            <v-col cols="11">
                                <v-card
                                    :disabled="xIsDisabled"
                                    flat
                                    tile
                                    outlined
                                    class="d-flex align-center"
                                    height="50"
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
                                            @click.native="delXYAxisArr(item, index)"
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
                            <v-col cols="11">
                                <v-card
                                    :disabled="yIsDisabled"
                                    flat
                                    tile
                                    outlined
                                    class="d-flex align-center"
                                    height="50"
                                    @dragover.prevent
                                    @drop="drop($event)"
                                >
                                    <v-card
                                        class="mr-4 py-1 px-3"
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
                                            @click.native="delXYAxisArr(item, index)"
                                        >
                                            {{ item.name }}
                                        </v-badge>
                                    </v-card>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card height="75%" flat tile outlined class="d-flex justify-center align-center">
                        <v-sparkline
                            :value="value"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                    </v-card>
                </v-card>
            </v-col>
        </div>
    </div>
</template>
<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
]

export default {
    data() {
        return {
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
            // -------------------图表------------------------
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false,
            // ----------------------------------------------
            // x 轴区域是否可用
            xIsDisabled: false,
            // y 轴区域是否可用
            yIsDisabled: false,
            // 维度 内容数组
            dimensionalityArr: [
                { id: 0, name: '承运日期' },
                { id: 1, name: '出发城市' },
            ],
            // 指标 内容数组
            indicatorArr: [
                { id: 0, name: '航段距离' },
                { id: 1, name: '可供座位' },
                { id: 2, name: '座客率' },
                { id: 3, name: '座公里' },
                { id: 4, name: '客公里' },
            ],
            // X 轴数组
            xAxisArr: [],
            // Y 轴数组
            yAxisArr: [],
        }
    },
    methods: {
        delXYAxisArr(o, i) {
            if (o.direction == 'x') {
                let obj = this.xAxisArr.splice(i, 1)
                let objIndex = obj[0].index
                let { direction, index, isShow, ...item } = obj[0]
                this.dimensionalityArr.splice(objIndex, 0, item)
            } else {
                let obj = this.yAxisArr.splice(i, 1)
                let objIndex = obj[0].index
                let { direction, index, isShow, ...item } = obj[0]
                this.indicatorArr.splice(objIndex, 0, item)
            }
        },

        /**
         * 拖 动作开始方法
         */
        dragstart(event, item, index) {
            /**
             *  在 维度 数组中找到了目标 item 对象，则表示进行 X 操作
             *  给 item 对象追加一个索引的属性，以便后续进行删除数组中的数据
             **/
            if (JSON.stringify(this.dimensionalityArr).indexOf(JSON.stringify(item)) != -1) {
                this.xIsDisabled = false
                this.yIsDisabled = true
                item.direction = 'x'
            } else {
                this.xIsDisabled = true
                this.yIsDisabled = false
                item.direction = 'y'
            }
            item.index = index
            item.isShow = false
            // 注意：这里的 setData() 方法基本上只能传递字符串，不能传递数字、对象等
            event.dataTransfer.setData('item', JSON.stringify(item))
        },

        /**
         * 拖拉到拖拉结束并放之间 的动作监听方法
         */
        drop(event) {
            let item = JSON.parse(event.dataTransfer.getData('item'))
            if (item.direction === 'x') {
                // 删除被拖拉的对象
                this.dimensionalityArr.splice(item.index, 1)
                // 在 x轴 中追加一个数据
                this.xAxisArr.push(item)
            } else {
                // 删除被拖拉的对象
                this.indicatorArr.splice(item.index, 1)
                // 在 x轴 中追加一个数据
                this.yAxisArr.push(item)
            }
        },

        /**
         * 拖 动作结束方法
         */
        dragend(event) {
            this.yIsDisabled = false
            this.xIsDisabled = false
            // 无参数则删除所有数据
            event.dataTransfer.clearData()
        },
    },
}
</script>
<style lang="scss" scoped>
.v-card {
    padding: 8px 8px 8px 8px;
}
</style>
