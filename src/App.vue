<template>
    <v-app>
        <router-view style="height: 100%" />
    </v-app>
</template>
<style>
/* 所有按钮都变为手指头的样式 */
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

/* 滚动条样式设置 */
*::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

*::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    height: 30px;
    background: rgb(183, 183, 183);
}

*::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 5px;
    background: rgb(229, 229, 229);
}
</style>
