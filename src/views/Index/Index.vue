<template>
    <div>
        <v-app-bar app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title style="font-size: 20px">数据可视化平台</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="mdi mdi-bell mdi-24px" style="color: #4873f5"></span>
            <span class="mdi mdi-github mdi-24px ml-4"></span>
            <span>admin</span>
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
                { title: '数据集', icon: 'mdi-link-variant', path: '/data' },
                { title: '数据连接', icon: 'mdi-database', path: '/datalink' },
                { title: '仪表盘', icon: 'mdi-view-dashboard', path: '/dashboard' },
            ],
            clipped: false,
        }
    },
}
</script>
<style scoped>
.router-link-active {
    text-decoration: none;
}
</style>
