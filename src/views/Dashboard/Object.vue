<!--
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-10 16:23:40
-->
<template>
    <div>
        <!-- 顶部 -->
        <v-card height="7%" outlined flat tile class="d-flex align-center justify-space-between px-2">
            <div>
                <v-btn outlined v-borderNone class="black--text">
                    <v-icon class="mr-2">mdi-content-save</v-icon>
                    另存为
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-borderNone class="ml-2 black--text" v-bind="attrs" v-on="on">
                            <v-icon class="mr-2">mdi-export-variant</v-icon>
                            导出
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="download('png')" v-cursor v-ripple>
                            <v-list-item-title>png</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="download('jpeg')" v-cursor v-ripple>
                            <v-list-item-title>jpeg</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <v-col cols="1">
                <v-btn outlined v-borderNone elevation="1"> 预览 </v-btn>
            </v-col>
        </v-card>
        <!-- 主体部分 -->
        <v-card height="93%" flat tile>
            <v-row no-gutters style="height: 100%">
                <!-- 左 -->
                <v-col cols="1">
                    <v-card style="height: 100%" class="pa-2 d-flex flex-column align-center">
                        <v-card v-cursor ripple flat class="pa-2 pb-0 d-flex flex-column justify-center align-center pt-1 mb-4">
                            <v-btn :ripple="false" x-small icon color="blue-grey lighten-1">
                                <v-icon> mdi-plus-box </v-icon>
                            </v-btn>
                            <div class="text-caption">添加组件</div>
                        </v-card>
                        <v-card v-cursor ripple flat class="pa-2 pb-0 d-flex flex-column justify-center align-center pt-1 mb-4">
                            <v-btn :ripple="false" x-small icon color="blue-grey lighten-1">
                                <v-icon> mdi-filter-menu </v-icon>
                            </v-btn>
                            <div ripple="false" class="text-caption">过滤组件</div>
                        </v-card>
                        <v-card v-cursor ripple flat class="pa-2 pb-0 d-flex flex-column justify-center align-center pt-1 mb-4">
                            <v-btn :ripple="false" x-small icon color="blue-grey lighten-1">
                                <v-icon> mdi-view-dashboard </v-icon>
                            </v-btn>
                            <div class="text-caption">其它组件</div>
                        </v-card>
                    </v-card>
                </v-col>

                <!-- 中 -->
                <v-col cols="1">
                    <v-card style="height: 100%" class="pa-2 d-flex flex-column align-center" v-borderLR flat tile>
                        <v-btn outlined v-borderNone>
                            <v-icon small class="mr-2">mdi-format-title</v-icon>
                            文本组件
                        </v-btn>
                        <v-btn outlined v-borderNone>
                            <v-icon small class="mr-2">mdi-image-size-select-actual</v-icon>
                            图片组件
                        </v-btn>
                        <v-btn outlined v-borderNone>
                            <v-icon small class="mr-2"> mdi-laptop </v-icon>
                            web组件
                        </v-btn>
                    </v-card>
                </v-col>

                <!-- 右 -->
                <v-col cols="10">
                    <v-card class="px-2" height="60%" width="100%" flat tile :class="dataStatus ? 'd-flex align-center' : ''">
                        <multiChart
                            id="charts"
                            ref="charts"
                            :settings="settings"
                            :chartType="chartType"
                            :data="chartData"
                            :dataStatus="dataStatus"
                        ></multiChart>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import multiChart from '../../components/multi-chart'
export default {
    name: 'Object',
    components: { multiChart },
    data() {
        return {
            dataStatus: false,
            chartData: {
                columns: [],
                rows: [],
            },
            settings: {},
            chartType: 'histogram',
        }
    },
    methods: {
        download(type) {
            // 通过ref找到其下级的canvas
            const charts = document.getElementById('charts').getElementsByTagName('canvas')
            // 创建标签
            const element = document.createElement('a')
            // 设置下载名称
            element.download = 'pic' + `.${type}`
            // 设置地址以及文件类型
            element.href = charts[0].toDataURL(`image/${type}`)
            document.body.appendChild(element)
            // 触发下载事件
            element.click()
            // 移除标签
            element.remove()
        },
    },
    mounted() {},
    created() {
        this.chartData = this.$route.params.chartData
        this.settings = this.$route.params.settings
        this.chartType = this.$route.params.chartType
        setTimeout(() => {
            this.dataStatus = true
        }, 0.01)
    },
}
</script>
<style lang="scss" scoped></style>
