<template>
	<div class="b-form">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		provide() {
			return {
				bForm: this
			}
		},
		props: {
			model: {
				type: Object,
				required: true
			},
			labelWidth: {
				type: String,
				default: '80px'
			},
			rules: Object,
		},
		watch: {
			// model: {
			// 	handler(value) {
			// 		this.formModel = value
			// 	},
			// 	deep: true,

			// }
		},
		computed: {
			// formModel() {
			// 	console.log(this.model, 555)
			// 	return this.model
			// },
		},
		data() {
			return {
				fields: [],
				formModel: {},
			}
		},
		created() {
			this.fields = [];
			this.$on('b.form.addField', this.addField);
		},
		methods: {
			addField(formItem) {
				this.fields.push(formItem);
			},
			async validate(callback = () => {}) {
				const validate = this.fields.map((item) => {
					return item();
				});
				const results = await Promise.all(validate);
				let ret = results.every((valid) => {
					return valid
				});
				callback(ret);
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
