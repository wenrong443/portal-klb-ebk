<template>
	<div class="form-group">
		<label class="cave-detail-component--text">{{label}}</label>
		<input v-bind:value="modelValue == null ? '' : modelValue.replace(/ /g, 'T')" v-on:input="onChange($event.target.value)" 
            type="datetime-local" class="form-control" />
	</div>
</template>

<script>
export default {
	name: "CaveDateTimePicker",
	components: {},
	props: {
		modelValue: { type: String, required: false, default: "" },
		label: { type: String, required: false, default: "Text Box" },
	},
	data: () => ({
		editorValue: null,
	}),
	computed: {},
	methods: {
		onChange(value) {
			this.$emit("update:modelValue", value);
		},
	},
};
</script>

<style lang="scss" scoped>
.cave-detail-component--text {
	font-size: 14px;
	min-width: 150px;
}
.cave-detail-component--value {
	margin: 0px 10px;
	font-weight: 700;
}
</style>