<template>
	<div class="b-checkbox" :class="{'checkbox--column':isColumn}" @click="clickcheckbox">
		<div class="b-checkbox_input">
			<text :class="['b-checkbox_inner',formatIcon(isChecked)]"
				:style="{color:disabled?'#d7d7d7':(isChecked?'#FC8131':'#999999'),'font-size':formatSize(iconSize)+'px'}">
			</text>
			<text class="b-checkbox_label" :style="{'font-size':formatSize(textSize)+'px'}">
				<slot>{{label}}</slot>
			</text>
		</div>
	</div>
</template>

<script>
	export default {
		inject: {
			bcheckboxGroup: {
				default: ''
			}
		},
		props: {
			label: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			name: {
				type: [String, Number, Boolean],
				default: true
			},
			trueLabel: {
				type: [String, Number],
				default: null
			},
			falseLabel: {
				type: [String, Number],
				default: null
			},
			iconSize: {
				type: [String, Number],
				validator: function(value) {
					if (String(parseInt(value)) == 'NaN') {
						return ['large', 'medium', 'mini'].indexOf(value) !== -1
					} else {
						if (String(Number(value)) == 'NaN') {
							return ['px'].some(item => {
								return value.indexOf(item)
							})
						}
						return true
					}
				},
				default: 44
			},
			textSize: {
				type: [String, Number],
				validator: function(value) {
					if (String(parseInt(value)) == 'NaN') {
						return ['large', 'medium', 'mini'].indexOf(value) !== -1
					} else {
						if (String(Number(value)) == 'NaN') {
							return ['px'].some(item => {
								return value.indexOf(item)
							})
						}
						return true
					}
				},
				default: 28
			},
			value: null
		},
		data() {
			return {};
		},
		computed: {
			isGroup() {
				return !!this.bcheckboxGroup
			},
			checkbox: {
				get() {
					return this.isGroup ? this.bcheckboxGroup.value : this.value
				},
				set(value) {
					this.isGroup ? this.bcheckboxGroup.$emit('input', value) : this.$emit('input', value)
				},
			},
			isChecked() {
				return this.isGroup ? this.bcheckboxGroup.value.includes(this.name) : this.value === this.name
			},
			isColumn() {
				return this.isGroup ? this.bcheckboxGroup.placement == 'column' : false
			},
		},
		watch: {},
		methods: {
			clickcheckbox() {
				let _that = this
				if (!this.disabled) {
					let checkbox = JSON.parse(JSON.stringify(this.checkbox))
					if (this.isChecked) {
						this.isGroup ? checkbox.splice(checkbox.indexOf(this.name), 1) : checkbox = false
					} else {
						this.isGroup ? checkbox.push(this.name) : checkbox = this.name
					}
					this.checkbox = checkbox
					this.$nextTick(function() {
						_that.$emit('change', _that.isChecked ? (_that.trueLabel || _that.isChecked) : (_that
							.falseLabel ||
							_that.isChecked))
					})
				}
			},
			formatSize(value) {
				let size = value;
				if (String(parseInt(value)) == 'NaN') {
					switch (value) {
						case 'large':
							size = 32
							break;
						case 'medium':
							size = 28
							break;
						default:
							size = 24
							break;
					}
				} else {
					if (String(Number(value)) == 'NaN') {
						let px = wx.getSystemInfoSync().windowWidth / 750
						size = value.indexOf('px') !== -1 ? value : value / px
					} else {
						size = value
					}
				}
				return size
			},
			formatIcon(checked) {
				if (checked) return 'b-icon-checked'
				else return this.disabled ? 'b-icon-disabledcheck' : 'b-icon-uncheck'
			},
		},
		options: {
			// 微信小程序中 options 选项
			//	multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
			// styleIsolation: "isolated", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
			// addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
			virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
		},
	}
</script>

<style lang="scss">
	.checkbox--column {
		display: block !important;
		margin: 10px 0;
		width: max-content;
	}

	.b-checkbox {
		font-weight: 500;
		line-height: 1;
		display: inline-block;
		white-space: nowrap;
		outline: none;
		font-size: 28px;

		.b-checkbox_input {
			white-space: nowrap;
			outline: none;
			line-height: 28px;
			vertical-align: middle;

			.b-checkbox_inner {
				box-sizing: border-box;
				vertical-align: middle;
			}

			.b-checkbox_label {
				font-size: 28px;
				padding-left: 10px;
				color: #333333;
			}
		}


	}
</style>
