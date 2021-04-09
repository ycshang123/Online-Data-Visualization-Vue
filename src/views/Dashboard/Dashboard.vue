<template>
    <div>
        <!-- 上半区域 -->
        <v-card style="height: 8%" flat outlined class="d-flex align-center">
            <v-row no-gutters justify="space-between">
                <v-col cols="4" class="d-flex align-center">
                    <div class="text-h6">一月座客率</div>

                    <div class="ml-12 d-flex align-center justify-center">
                        <v-btn icon class="mr-4">
                            <v-icon color="blue-grey lighten-1">mdi-plus</v-icon>
                        </v-btn>
                        <v-btn icon class="">
                            <v-icon color="blue-grey lighten-1">mdi-backup-restore</v-icon>
                        </v-btn>
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
                <v-card height="6%" tile flat outlined class="d-flex align-center justify-space-between">
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
                <v-card height="47%" tile flat outlined class="">
                    <div>维度</div>
                    <div class="mt-4">
                        <div>承运日期</div>
                        <div>出发城市</div>
                    </div>
                </v-card>
                <v-card height="47%" tile flat outlined class="">
                    <div>指标</div>
                    <div class="mt-4">
                        <div>航段距离</div>
                        <div>可供座位</div>
                        <div>座客率</div>
                        <div>座公里</div>
                        <div>客公里</div>
                    </div>
                </v-card>
            </v-col>

            <!-- 中 -->
            <v-col cols="2 blue pa-0">
                <v-card tile flat outlined height="30%">
                    <div>图表类型</div>
                    <v-card class="mt-3" tile flat outlined height="80%">
                        <v-row>
                            <v-col cols="3" v-for="i in 16" :key="i">
                                <v-btn icon>
                                    <v-icon>mdi-view-grid</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>
            </v-col>
            <!-- 右 -->
            <v-col cols="8 purple pa-0">
                <v-card tile flat outlined class="">
                    <div>main</div>
                </v-card>
            </v-col>
        </div>
    </div>
</template>

<style lang="scss" scope>
.v-card {
    padding: 8px 8px 8px 8px;
}
</style>
