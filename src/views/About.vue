<template>
    <div>
        <div class="test-view">
            <div ref="from" class="from">
                <div
                    class="item"
                    draggable
                    @dragstart="itemDragStart"
                    :style="{ backgroundColor: item.color }"
                    v-for="item in fromData"
                    :key="item.name"
                >
                    {{ item.name }}
                </div>
            </div>
            <div class="to" @dragenter="toDragEnter" @dragover="(e) => e.preventDefault()" @drop="drop" @dragleave="toDragLeave">
                <div class="item" :style="{ backgroundColor: item.color }" v-for="item in toData" :key="item.name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            fromData: [
                {
                    name: '节点1',
                    color: 'red',
                },
                {
                    name: '节点2',
                    color: 'yellow',
                },
                {
                    name: '节点3',
                    color: 'blue',
                },
            ],
            toData: [],
            toEle: null,
        }
    },
    methods: {
        itemDragStart(e) {
            console.log('元素拖动开始', e)
        },
        drop(e) {
            console.log('元素释放', e)
            // if (!this.toEle) return
            // const one = this.fromData.find((x) => x.name == e.target.innerText)
            // this.toData.push(one)
        },
        toDragEnter(e) {
            console.log('元素拖动进入盒子', e)
            this.toEle = e
        },
        toDragLeave(e) {
            console.log('元素拖动离开盒子', e)
            this.toEle = null
        },
    },
    mounted() {},
}
</script>

<style <style lang="scss" scoped>
.test-view {
    width: 100%;
    height: 100%;
    background-color: #1f1d27;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .from,
    .to {
        width: 200px;
        height: 500px;
        background-color: #464648;
        padding: 10px;
        border-radius: 10px;
        .item {
            width: 100%;
            height: 35px;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #010101;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            user-select: none;
            cursor: pointer;
        }
    }
}
</style>
