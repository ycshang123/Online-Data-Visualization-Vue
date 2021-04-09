<script>
/**
 * 全局方法文件
 */
export default {
    data() {
        return {
            borderBottom: {
                borderStyle: 'none',
                borderBottomStyle: 'solid',
            },
            borderTop: {
                borderStyle: 'none',
                borderTopStyle: 'solid',
            },
            borderLeft: {
                borderStyle: 'none',
                borderLeftStyle: 'solid',
            },
            borderRight: {
                borderStyle: 'none',
                borderRightStyle: 'solid',
            },
            borderLR: {
                borderStyle: 'none',
                borderLeftStyle: 'solid',
                borderRightStyle: 'solid',
            },
            borderTB: {
                borderStyle: 'none',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
            },
        }
    },
    clearObjAttribute(obj) {
        Object.keys(obj).forEach((key) => {
            obj[key] = ''
        })
    },
}
</script>
