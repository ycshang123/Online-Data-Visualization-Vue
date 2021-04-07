<script>
/**
 * 全局方法文件
 */
export default {
    clearObjAttribute(obj) {
        Object.keys(obj).forEach((key) => {
            obj[key] = ''
        })
    },
}
</script>
