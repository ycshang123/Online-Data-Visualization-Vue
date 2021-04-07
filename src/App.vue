<template>
    <v-app>
        <router-view style="height: 100%" />
    </v-app>
</template>
<style>
.v-btn {
    cursor: pointer;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.global-transition-enter-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.global-transition-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.global-transition-enter,
.global-transition-leave-to {
    /* transform: translateX(10px); */
    opacity: 0.5;
}
</style>
