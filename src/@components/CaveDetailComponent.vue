<template>
	<div class="form-group">
		<label class="cave-detail-component--text">{{ label }}</label>
		<!-- <span v-if="value" class="cave-detail-component--value"> {{ value }}</span>
		<slot v-else></slot> -->
        <span class="cave-detail-component--value"> {{ value }}</span>
	</div>
</template>

<script>
export default {
	name: "CaveDetailComponent",
	components: {},
	props: {
		modelValue: { type: Number, required: false, default: 0 },
		label: { type: String, required: false, default: "Text Box" },
		value: { type: String, required: false, default: null },
	},
	data: () => ({
		editorValue: null,
	}),
	computed: {},
};
</script>

<style lang="scss">
.cave-detail-component--text {
	font-size: 14px;
	min-width: 150px;
}
.cave-detail-component--value {
	margin: 0px 10px;
	font-weight: 700;
}
</style>