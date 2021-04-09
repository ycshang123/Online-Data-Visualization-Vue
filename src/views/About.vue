<style scoped>
.drag-field,
.drop-field {
    height: 10rem;
    box-sizing: border-box;
    padding: 1rem;
    background-color: #eee;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.item {
    width: 30%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 0.9rem;
    background-color: royalblue;
    color: #eee;
}
.item:hover {
    cursor: pointer;
}
</style>

<template>
    <div>
        <div
            class="item"
            v-for="(item, index) in items"
            draggable="true"
            @dragstart="dragstart($event, item)"
            @dragend="dragend($event)"
            :key="index"
        >
            {{ item.label }}
        </div>

        <div class="drop-field" @dragover.prevent @drop="drop">
            <div class="item" v-if="droppedItem">
                {{ droppedItem }}
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: '',
    data() {
        return {
            droppedItem: null,
            items: [
                {
                    id: 1,
                    label: '模块一',
                    a: 'A',
                },
                {
                    id: 2,
                    label: '模块二',
                    b: 'B',
                },
                {
                    id: 3,
                    label: '模块三',
                    c: '模块三',
                },
            ],
        }
    },
    methods: {
        drop(event) {
            console.log('drop')
            this.droppedItem = event.dataTransfer.getData('item')
            console.log(JSON.stringify(this.droppedItem))
        },
        dragstart(event, item) {
            event.dataTransfer.setData('item', item)
        },
        dragend(event) {
            console.log('dragend')
            event.dataTransfer.clearData()
        },
    },
}
</script>
