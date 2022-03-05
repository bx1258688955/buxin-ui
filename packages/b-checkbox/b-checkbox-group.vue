<template>
	<div class="b-checkbox-group">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		provide() {
			return {
				bcheckboxGroup: this
			}
		},
		props: {
			value: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			value(value) {
				this.$emit('change', value)
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
