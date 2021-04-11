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
                        <v-btn outlined v-borderNone class="ml-10 black--text" v-bind="attrs" v-on="on">
                            <v-icon class="mr-2">mdi-export-variant</v-icon>
                            导出
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-cursor v-ripple>
                            <v-list-item-title>PDF</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-cursor v-ripple>
                            <v-list-item-title>web</v-list-item-title>
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
                        <v-card v-cursor ripple flat width="50%" class="d-flex flex-column justify-center align-center pt-1 mb-4">
                            <v-btn :ripple="false" x-small icon color="blue-grey lighten-1">
                                <v-icon> mdi-plus-box </v-icon>
                            </v-btn>
                            <div class="text-caption">添加组件</div>
                        </v-card>
                        <v-card v-cursor ripple flat width="50%" class="d-flex flex-column justify-center align-center pt-1 mb-4">
                            <v-btn :ripple="false" x-small icon color="blue-grey lighten-1">
                                <v-icon> mdi-filter-menu </v-icon>
                            </v-btn>
                            <div ripple="false" class="text-caption">过滤组件</div>
                        </v-card>
                        <v-card v-cursor ripple flat width="50%" class="d-flex flex-column justify-center align-center pt-1 mb-4">
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
                    <v-card class="px-2" style="height: 100%" flat tile>
                        <div>做好的图</div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped></style>
