<template>
    <v-card class="d-flex flex-column justify-space-around align-center">
        <v-card height="80" width="100%" class="d-flex justify-space-around align-center" tile elevation="0">
            <v-col cols="5" class="d-flex justify-space-around align-center">
                <span>新增列名</span>
                <v-col cols="8">
                    <v-text-field></v-text-field>
                </v-col>
            </v-col>
            <v-col cols="2" class="d-flex justify-space-around align-center">
                <v-btn>取消</v-btn>
                <v-btn>确定</v-btn>
            </v-col>
        </v-card>
        <v-card width="90%" height="90%" class="d-flex justify-space-around align-center" tile elevation="0">
            <v-card width="20%" height="90%" style="border: 0.5px solid #e6e6e6"></v-card>
            <v-card width="70%" height="90%" style="border: 0.5px solid #e6e6e6" class="d-flex">
                <v-card width="25%" height="100%" style="border-right: 0.5px solid #e6e6e6" tile elevation="0"></v-card>
                <v-card width="75%" height="100%" tile elevation="0"></v-card>
            </v-card>
        </v-card>
    </v-card>
</template>

<script>
export default {
    name: 'AddColumn',
    data() {
        return {}
    },
    components: {},
    created() {},
    mounted() {},
    methods: {},
    computed: {},
}
</script>

<style scoped></style>
