<template>
    <div>
        <v-app-bar app dense style="position: sticky; top: 0; z-index: 1" height="55">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title style="font-size: 20px">数据可视化平台</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="mdi mdi-bell mdi-24px" style="color: #4873f5"></span>
            <span class="mdi mdi-github mdi-24px margin-left"></span>
            <span>admin</span>
            <span class="mdi mdi-chevron-down mdi-18px margin-left"></span>
        </v-app-bar>
        <div class="flex-around">
            <v-card height="100%" width="10%">
                <v-navigation-drawer permanent :color="color">
                    <v-list dense nav>
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
                </v-navigation-drawer>
            </v-card>
            <div style="width: 90%; height: 100%">
                <router-view />
            </div>
        </div>
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
            color: '#25354d',
            clipped: false,
            scrollHeight: window.screenWidth - 60,
        }
    },
    onLoad() {
        console.log('高度是：' + this.scrollHeight)
    },
}
</script>
<style scoped>
.margin-left {
    margin-left: 15px;
}

.flex-around {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: space-around;
}
.router-link-active {
    text-decoration: none;
}
</style>
