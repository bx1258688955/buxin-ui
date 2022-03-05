<template>
	<label class="b-tag"
		:style="[{'width':tagWidth,'font-size':tagSize+'rpx','line-height':lineHeight+'rpx','border-radius':round?'999px':'6px','background-color':bgColor,'color':color},plainStyle]">
		<slot>标签</slot>
	</label>
</template>

<script>
	export default {
		props: {
			width: {
				type: [String, Number],
				validator: function(value) {
					if (String(Number(value)) == 'NaN') {
						return ['px', 'rpx'].some(item => {
							return value.indexOf(item)
						})
					}
					return true
				},
				default: 'auto'
			},
			color: {
				type: String,
				default: '#fff'
			},
			bgColor: {
				type: String,
				default: '#FC8131'
			},
			rowHeight: {
				type: String,
				default: ''
			},
			size: {
				type: [String, Number],
				validator: function(value) {
					if (String(parseInt(value)) == 'NaN') {
						return ['large', 'medium', 'mini'].indexOf(value) !== -1
					} else {
						if (String(Number(value)) == 'NaN') {
							return ['px', 'rpx'].some(item => {
								return value.indexOf(item)
							})
						}
						return true
					}
				},
				default: 28
			},
			round: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			}
		},
		options: {
			// 微信小程序中 options 选项
			//	multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
			//styleIsolation: "isolated", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
			addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
			virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
		},
		computed: {
			plainStyle() {
				return this.plain ? {
					'border-color': this.color
				} : {
					'border-color': this.bgColor
				}
			},
			tagWidth() {
				let width = this.width
				if (String(Number(this.width)) == 'NaN' && this.width !== 'auto') {
					let rpx = wx.getSystemInfoSync().windowWidth / 750
					width = this.width.indexOf('rpx') !== -1 ? this.width : this.width / rpx + 'rpx'
				} else if (typeof this.width === 'number' && isFinite(this.width)) {
					width = this.width + 'rpx'
				}
				return width
			},
			tagSize() {
				let size = this.size;
				if (String(parseInt(this.size)) == 'NaN') {
					switch (this.size) {
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
					if (String(Number(this.size)) == 'NaN') {
						let rpx = wx.getSystemInfoSync().windowWidth / 750
						size = this.size.indexOf('rpx') !== -1 ? this.size : this.size / rpx
					} else {
						size = this.size
					}
				}
				return size
			},
			lineHeight() {
				return this.rowHeight || this.tagSize + 8
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.b-tag {
		position: relative;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		justify-content: center;
		padding: 4px 15px;
		margin: 5rpx 10rpx;
		box-sizing: border-box;
		white-space: nowrap;
		color: #fff;
		border: 1px solid;
		// &+&{
		// 	margin-left: 22rpx;
		// }
	}
</style>
