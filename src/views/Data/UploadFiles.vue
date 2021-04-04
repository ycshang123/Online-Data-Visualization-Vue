<template>
    <div class="d-flex justify-space-around" style="height: 100%">
        <v-card width="10%">
            <v-list-item>
                <span class="mdi mdi-chevron-left mdi-24px"></span>
                <v-list-item-content>
                    <v-list-item-title> ***航空数据 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </v-card>
        <v-card width="90%">
            <v-card class="d-flex justify-space-around align-center" height="8%">
                <v-col cols="3"> 上传文件 </v-col>
                <v-col class="d-flex justify-center align-items-center" cols="4">
                    <v-col class="d-flex align-center"> 上传数据包至： </v-col>
                    <v-col cols="8" style="margin-top: 8%">
                        <v-select label="***航空公司" solo :items="items"></v-select>
                    </v-col>
                </v-col>
                <v-col cols="4"> 已选择{{ number }}项 </v-col>
                <v-col cols="1">
                    <v-btn>确定</v-btn>
                </v-col>
            </v-card>
            <v-card height="92%" class="d-flex align-center">
                <v-row>
                    <v-col style="background: blue,height:100px" cols="6">
                        <v-file-input accept=".xlsx,.xlsm,.xls,.xlsb" label="上传excel文件" prepend-icon="mdi-file-excel"></v-file-input>
                    </v-col>
                    <v-col style="background: blue,height:100px" cols="6">
                        <v-file-input accept=".csv" label="上传csv文件" prepend-icon="mdi-file-code"></v-file-input>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: ['2021年航空数据', '2020年航空数据', '2019年航空数据'],
            number: 2,
        }
    },
}
</script>

<style scoped>
.flex-center-around {
    display: flex;
    align-items: center;
}
</style>

