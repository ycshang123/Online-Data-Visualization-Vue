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
        <!-- 全屏透明大卡片 -->
        <v-card
            class="transparent d-flex justify-center align-center"
            outlined
            dark
            style="position: absolute; z-index: 2; width: 100%; height: 100%"
        >
            <!-- 登录卡片 -->
            <div class="login-card d-flex flex-column justify-center align-center card-bg py-3">
                <v-card-title>数据可视化平台</v-card-title>
                <v-col cols="8">
                    <v-form>
                        <v-text-field label="账号" required v-model="loginObj.account"></v-text-field>
                    </v-form>
                    <v-form>
                        <!-- <v-text-field label="密码" required v-model="loginObj.password"></v-text-field> -->
                        <v-text-field
                            v-model="loginObj.password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="密码"
                            hint="At least 8 characters"
                            counter
                            @click:append="show = !show"
                        ></v-text-field>
                    </v-form>
                </v-col>

                <v-card class="transparent d-flex justify-space-between" width="60%" elevation="0">
                    <v-btn class="transparent mr-10" @click="login()">登录</v-btn>
                    <v-btn class="transparent" :href="codeUrl">GITHUB 登录</v-btn>
                </v-card>
            </div>
        </v-card>
    </div>
</template>

<script>
import { loginByGithub, login } from '../../common/api/login'
export default {
    data() {
        return {
            show: false,
            loginObj: {
                account: '',
                password: '',
            },
            rules: {
                required: (value) => !!value || 'Required.',
                min: (v) => v.length >= 6 || 'Min 6 characters',
            },
            codeUrl:
                'https://github.com/login/oauth/authorize?client_id=75bfbb55511431752d68&redirect_uri=http://localhost:5000/login/oauth/redirect',
        }
    },
    methods: {
        async login() {
            console.log(this.loginObj)
            await login(this.loginObj).then((res) => {
                if (res.code === 200) {
                    const data = res.data
                    this.$store.commit('saveUserInfo', data)
                    localStorage.setItem('userId', JSON.stringify(data.user_id))
                    localStorage.setItem('userInfo', JSON.stringify(data))
                    this.$router.push({
                        name: 'Data',
                    })
                }
            })
        },
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
    width: 30%;
}
</style>
