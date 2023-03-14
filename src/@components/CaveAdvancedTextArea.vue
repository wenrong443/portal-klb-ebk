<template>
	<div class="form-group">
		<editor v-model="modelValue" api-key="r8x4pay06vllotlk48ws2pojveay2zyxu79ghx2o1j6kve9h" :init="{
        height: 500,
        menubar: true,
        plugins: [
          'importcss advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
      }" />
	</div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import json from "@/infrastructure/json/config.json";

export default {
	name: "CaveAdvancedTextArea",
	components: { Editor },
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
}
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