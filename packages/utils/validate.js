/**
 *  Rule for validating required fields.
 *
 *  @param rule 规则 {规则名:校验内容}
 *  @param value 需要的校验值
 *  @param callback 回调函数，校验通过将返回错误消息，否则返回空
 */
function required(rule, value, callback) {
	!value ? callback(rule.message || '该项为必填项') : callback()
}
export function validate(rule, value, callback) {
	if (!rule) {
		callback()
		return
	}
	for (let key in rule) {
		if (key == 'required') {
			rule.required ? required(rule, value, callback) : callback()
		}
	}
}
export default {
	validate
};
