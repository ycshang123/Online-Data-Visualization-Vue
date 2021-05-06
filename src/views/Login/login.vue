<!--
 * @Description:
 * @Author: xxq
 * @Version: 1.0
 * @Date: 2021-04-30 16:56:51
-->

<template>
    <div id="bg" style="height: 100%">
        <!-- 背景图的遮罩层 -->
        <div class="mask"></div>
        <!-- 正常背景的全屏大卡片 -->
        <v-card
            class="transparent d-flex justify-center align-center"
            outlined
            style="position: absolute; z-index: 2; width: 100%; height: 100%"
        >
            <!-- 登录卡片 -->
            <div class="login-card d-flex flex-column justify-center align-center card-bg">
                <v-card-title class="white--text">第三方登录</v-card-title>
                <v-btn class="transparent white--text" :href="codeUrl">GITHUB LOGIN</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import { loginByGithub, test1 } from '../../common/api/login'
export default {
    data() {
        return {
            codeUrl:
                'https://github.com/login/oauth/authorize?client_id=75bfbb55511431752d68&redirect_uri=http://localhost:5000/login/oauth/redirect',
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
#bg {
    height: 100%;
    width: 100%;
    background-image: url('../../assets/pic/login/bg-3.jpg');
    background-size: 100% 100%;
}

.mask {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: black;
    opacity: 0.3;
}

.transparent {
    background-color: transparent !important;
    // border-color: transparent !important;
}
.card-bg {
    background: rgba(33, 58, 90, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.login-card {
    width: 20%;
    height: 30%;
}
</style>
