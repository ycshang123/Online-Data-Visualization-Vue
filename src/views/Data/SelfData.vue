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

            <div class="flow-btn-area mt-3 d-flex align-center">
                <v-card text outlined flat style="user-select: none; cursor: pointer">选字段</v-card>
                <v-divider style="width: 50px"></v-divider>
                <v-card outlined flat style="user-select: none; cursor: pointer">新增列</v-card>
                <v-divider style="width: 50px"></v-divider>
                <v-menu v-ripple offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-card v-bind="attrs" v-on="on" outlined flat style="cursor: pointer"><v-icon>mdi-plus</v-icon> </v-card>
                    </template>

                    <v-list>
                        <v-list-item v-ripple v-for="(item, index) in addColArr" :key="index" style="cursor: pointer">
                            <v-list-item-title>{{ item }}</v-list-item-title>
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

                    <div class="mt-4">
                        <div class="text-body-2 mb-2">一月数据表</div>
                        <div class="text-body-2 mb-2">二月数据表</div>
                        <div class="text-body-2 mb-2">三月数据表</div>
                        <div class="text-body-2 mb-2">四月数据表</div>
                        <div class="text-body-2 mb-2">五月数据表</div>
                        <div class="text-body-2 mb-2">全年月度数据表</div>
                    </div>
                </v-card>
            </v-col>
            <!-- 字段添加区域 -->
            <v-col cols="2" class="pa-0">
                <v-card class="pa-2 d-flex flex-column align-center" outlined flat tile style="height: 100%">
                    <v-card
                        v-ripple
                        class="d-flex justify-center align-center"
                        outlined
                        tile
                        flat
                        width="120"
                        height="35"
                        style="user-select: none; cursor: pointer"
                        >全部添加</v-card
                    >

                    <v-col cols="7" class="pa-0 mt-4">
                        <div class="text-body-2 mb-2">承运日期</div>
                        <div class="text-body-2 mb-2">出发城市</div>
                        <div class="text-body-2 mb-2">出发机场</div>
                        <div class="text-body-2 mb-2">到达城市</div>
                        <div class="text-body-2 mb-2">客公里</div>
                    </v-col>
                </v-card>
            </v-col>

            <v-col cols="8" class="">
                <v-data-table :headers="headers" :items="desserts" :items-per-page="9" class="elevation-1"></v-data-table>
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
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        }
    },
}
</script>
<style scoped lang="scss">
* {
    user-select: none;
}
.flow-btn-area {
    width: 30%;

    .v-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 40px;
    }
}
</style>
