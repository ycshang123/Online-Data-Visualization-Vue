<!--
 * @Description:    消息弹窗组件
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-19 10:54:11
-->
<template>
    <!-- 信息提示框 -->
    <div class="alert-area" v-if="alertArr.length !== 0">
        <div class="d-flex flex-column align-center" style="width: 100%">
            <v-alert
                width="500"
                class="div-alert"
                style="z-index: 1000"
                v-ripple
                v-for="(item, index) in alertArr"
                :type="item.type"
                dismissible
                elevation="3"
                :key="index"
            >
                {{ item.content }}
            </v-alert>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlertDialog',
    data() {
        return {
            alertArr: [],
        }
    },
    mounted() {
        this.alertArr = this.$store.state.alertArr
    },
    watch: {
        alertArr: {
            handler() {
                if (this.alertArr.length !== 0) {
                    setTimeout(() => {
                        this.alertArr.splice(0, 1)
                    }, 2000)
                }
            },
            deep: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.alert-area {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    overflow: auto;
}
</style>
