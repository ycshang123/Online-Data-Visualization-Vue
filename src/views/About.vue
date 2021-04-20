<!--
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-10 11:45:13
-->
<template>
    <div>
        <div ref="test" style="height: 100px"></div>
        <h1>测试界面</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {},
    updated() {
        let h = this.$refs.test
        console.log(h)
    },
}
</script>
