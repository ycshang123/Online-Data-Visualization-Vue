<template>
    <div>
        <!-- 上半区域 -->
        <v-card style="height: 8%" flat outlined class="d-flex align-center">
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
                    <v-btn class="blue-grey lighten-1 white--text">进入仪表板</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <!-- 下半区域 -->
        <div class="d-flex" style="height: 92%">
            <!-- 左 -->
            <v-col cols="2 red pa-0">
                <v-card height="100%" class="pa-0" tile flat>
                    <!-- 顶部标题 -->
                    <v-card
                        height="6%"
                        tile
                        flat
                        class="d-flex align-center justify-space-between"
                        outlined
                        :style="this.GLOBAL.data().borderBottom"
                    >
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
                    <v-card height="47%" tile flat outlined :style="this.GLOBAL.data().borderBottom">
                        <div>维度</div>
                        <div class="mt-4">
                            <div>> 承运日期</div>
                            <div>> 出发城市</div>
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
                        <div class="mt-4">
                            <div>> 航段距离</div>
                            <div>> 可供座位</div>
                            <div>> 座客率</div>
                            <div>> 座公里</div>
                            <div>> 客公里</div>
                        </div>
                    </v-card>
                </v-card>
            </v-col>

            <!-- 中 -->
            <v-col cols="2 pa-0">
                <v-card height="100%" tile flat outlined class="pa-0">
                    <v-card tile flat height="30%">
                        <div>图表类型</div>
                        <v-card class="mt-3 overflow-y-auto overflow-x-hidden" tile outlined flat height="80%">
                            <v-row>
                                <v-col cols="3" v-for="i in 16" :key="i">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-on="on" v-bind="attrs">
                                                <v-icon>mdi-view-grid</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>xx图</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-card>
                    <v-card tile flat height="70%" class="pa-0" outlined :style="this.GLOBAL.data().borderTB">
                        <v-card flat tile class="pa-0" height="8%">
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <v-card
                                        tile
                                        flat
                                        class="text-center"
                                        style="cursor: pointer; user-select: none"
                                        ripple
                                        outlined
                                        :style="this.GLOBAL.data().borderRight"
                                    >
                                        <div>图形属性</div>
                                    </v-card>
                                </v-col>
                                <v-col cols="6">
                                    <v-card tile flat class="text-center" style="cursor: pointer; user-select: none" ripple>
                                        <div>组件样式</div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card tile flat height="92%" outlined :style="this.GLOBAL.data().borderTop">
                            <v-card tile flat outlined class="pa-1 mb-4">颜色</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4">大小</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4">标签</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4">提示</v-card>
                            <v-card tile flat outlined class="pa-1 mb-4">细粒度</v-card>
                        </v-card>
                    </v-card>
                </v-card>
            </v-col>

            <!-- 右 -->
            <v-col cols="8  pa-0">
                <v-card
                    class="d-flex flex-column justify-space-between"
                    tile
                    flat
                    height="100%"
                    outlined
                    :style="this.GLOBAL.data().borderTB"
                >
                    <v-card class="" flat height="20%">
                        <v-row no-gutters align="center" class="">
                            <v-col cols="1">
                                <div>横轴</div>
                            </v-col>
                            <v-col cols="11">
                                <v-card flat tile outlined class="d-flex">
                                    <v-card class="mr-4 py-1 px-3" rounded="lg" outlined v-for="i in 3" :key="i"> 承运日期（年月） </v-card>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" class="mt-4">
                            <v-col cols="1">
                                <div>纵轴</div>
                            </v-col>
                            <v-col cols="11">
                                <v-card flat tile outlined class="d-flex">
                                    <v-card class="mr-4 py-1 px-3" rounded="lg" outlined v-for="i in 3" :key="i"> 客公里 </v-card>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card height="75%" flat tile outlined class="d-flex justify-center align-center">
                        <div>统计图</div>
                    </v-card>
                </v-card>
            </v-col>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            borderBottom: {
                backgroundColor: 'blue',
                borderStyle: 'dashed',
                borderBottomStyle: 'solid',
            },
        }
    },
}
</script>
<style lang="scss" scoped>
.v-card {
    padding: 8px 8px 8px 8px;
}
</style>
