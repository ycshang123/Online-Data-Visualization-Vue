<!--
 * @Description:
 * @Author: xxq
 * @Version: 1.0
 * @Date: 2021-04-09 17:15:20
-->
<template>
    <div>
        <v-app-bar app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title style="font-size: 20px">数据可视化平台</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="mdi mdi-bell mdi-24px mr-5 pcolor-lighten1"></span>
            <div v-if="userInfo" class="d-flex align-center">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-avatar v-bind="attrs" v-on="on" size="42">
                            <img :src="userInfo.avatar" alt="avatar" />
                        </v-avatar>
                    </template>
                    <span>{{ userInfo.nickName }}</span>
                </v-tooltip>
            </div>
            <div v-else class="d-flex align-center">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on" class="mdi mdi-github mdi-24px ml-4"></span>
                    </template>
                    <span>login</span>
                </v-tooltip>
            </div>
            <span class="mdi mdi-chevron-down mdi-18px ml-4"></span>
        </v-app-bar>
        <v-main style="height: 100%">
            <div class="d-flex" style="height: 100%; width: 100%">
                <div width="10%" style="background-color: #25354d">
                    <v-list dense nav style="background-color: #25354d">
                        <v-list-item v-for="item in items" :key="item.title" link>
                            <router-link :to="item.path" class="d-flex router-link-active">
                                <v-list-item-icon>
                                    <v-icon color="#a1aabc">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title style="color: #a1aabc"> {{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                            </router-link>
                        </v-list-item>
                    </v-list>
                </div>
                <v-container class="pa-0" fluid>
                    <router-view style="height: 100%" />
                </v-container>
            </div>
        </v-main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                { title: '数据准备', icon: 'mdi-database', path: '/datalink' },
                { title: '数据集', icon: 'mdi-link-variant', path: '/data' },
                { title: '仪表盘', icon: 'mdi-view-dashboard', path: '/dashboard' },
            ],
            clipped: false,
            userInfo: {},
        }
    },
    created() {
        this.userInfo = this.$store.state.userInfo
    },
}
</script>
<style scoped>
.router-link-active {
    text-decoration: none;
}
</style>
