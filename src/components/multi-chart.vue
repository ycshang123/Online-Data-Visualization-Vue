<!--
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-27 15:37:21
-->
<template>
    <div>
        <ve-histogram v-if="chartType === 'histogram'" class="overflow-x-auto" :data="data" :settings="settings"></ve-histogram>
        <ve-pie v-if="chartType === 'pie'" class="overflow-x-auto" :data="data" :settings="settings"></ve-pie>
        <ve-scatter v-if="chartType === 'scatter'" class="overflow-x-auto" :data="data" :settings="settings"></ve-scatter>
        <ve-line v-if="chartType === 'line'" class="overflow-x-auto" :data="data" :settings="settings"></ve-line>
        <ve-candle v-if="chartType === 'candle'" class="overflow-x-auto" :data="data" :settings="settings"></ve-candle>
        <ve-radar v-if="chartType === 'radar'" class="overflow-x-auto" :data="data" :settings="settings"></ve-radar>
        <ve-map v-if="chartType === 'map'" class="overflow-x-auto" :data="data" :settings="settings"></ve-map>
        <ve-gauge v-if="chartType === 'gauge'" class="overflow-x-auto" :data="data" :settings="settings"></ve-gauge>
        <ve-funnel v-if="chartType === 'funnel'" class="overflow-x-auto" :data="data" :settings="settings"></ve-funnel>
    </div>
</template>

<script>
export default {
    props: {
        chartType: {
            type: String,
            default: 'histogram',
        },
        data: {
            type: Object,
            default() {
                return {
                    columns: [],
                    rows: [],
                }
            },
        },
        settings: {
            type: Object,
            default() {
                return {
                    metrics: [],
                    dimension: [],
                }
            },
        },
    },
    data() {
        return {}
    },
    methods: {},
    created() {},
}
</script>

<style></style>
