<template>
	<div class="form-group">
		<textarea class="form-control" v-model="modelValue"></textarea>
	</div>
</template>

<script>

export default {
	name: "CaveAdvancedTextArea",
	data: () => ({
		editorValue: null,
	}),
	props: {
		modelValue: {
			type: String,
			default: "",
			required: false,
		},
	},

	computed: {
        modelValue: {
    get () { return this.modelValue },
    set (value) { this.$emit('update:modelValue', value) },
  },
	},
};
</script>

<style lang="scss">
.tox .tox-tbtn {
	align-items: unset !important;
}
.tox-tbtn > span,
svg {
	align-self: center !important;
}
svg {
	height: unset !important;
}
</style>