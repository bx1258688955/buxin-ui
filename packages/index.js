/* eslint-disable prettier/prettier */
// 导入组件
// ......
import bCard from "./b-card/b-card.vue";
import bCheckbox from "./b-checkbox/b-checkbox.vue";
import bCheckboxGroup from "./b-checkbox/b-checkbox-group.vue";
import bForm from "./b-form/b-form.vue";
import bFormItem from "./b-form/b-form-item.vue";
import bRadio from "./b-radio/b-radio.vue";
import bRadioGroup from "./b-radio/b-radio-group.vue";
import bTag from "./b-tag/b-tag.vue";
import './iconfont/iconfont.css'
const components = [
    bCard,
    bCheckbox,
    bCheckboxGroup,
    bForm,
    bFormItem,
    bRadio,
    bRadioGroup,
    bTag,
]
const install = function (Vue) {
    components.forEach((item) => {
        Vue.component(item.name, item)
    })
}

if (typeof window !== undefined && window.Vue) {
    install(window.Vue)
}
export default {
    install
}