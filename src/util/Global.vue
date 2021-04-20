<!--
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-10 16:23:40
-->
/** * 全局方法文件 */
<script>
import Vue from 'vue'
import store from '../store'
/**
 * 自定义指令----批量导入
 * v-cursor：修改绑定的元素样式为鼠标手
 */
let orderArr = {
    cursor: {
        inserted: (el) => {
            el.style.cursor = 'pointer'
        },
    },
    borderNone: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
        },
    },
    borderTop: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderTopStyle = 'solid '
        },
    },
    borderBottom: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderBottomStyle = 'solid'
        },
    },
    borderLeft: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderLeftStyle = 'solid'
        },
    },
    borderRight: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderRightStyle = 'solid'
        },
    },
    borderLR: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderLeftStyle = 'solid'
            el.style.borderRightStyle = 'solid'
        },
    },
    borderTB: {
        inserted: (el) => {
            el.style.borderStyle = 'none'
            el.style.borderWidth = '0.1px'
            el.style.borderColor = '#E0E0E0'
            el.style.borderTopStyle = 'solid'
            el.style.borderBottomStyle = 'solid'
        },
    },
}
Object.keys(orderArr).forEach((k) => {
    Vue.directive(k, orderArr[k])
})

export default {
    clearObjAttribute(obj) {
        Object.keys(obj).forEach((key) => {
            obj[key] = ''
        })
    },

    /**
     * @description: 定义全局方法去给vuex中的alertArr数据追加数据
     * @param {*} obj
     * @return {*}
     */
    pushAlertArrObj(obj) {
        store.commit('pushAlertArrObj', JSON.stringify(obj))
    },
}
</script>
