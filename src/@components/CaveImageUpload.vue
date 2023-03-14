<template>
	<div class="form-group form-group--image">
		<label>{{title}}</label>
		<div class="form-group--image-uploader">
			<img :src="formattedExistedImage" class="uploading-image" alt="fail" v-if="!previewImage" />
			<img :src="previewImage" class="uploading-image" alt="fail" v-else />
			<input type="file" accept="image/*" @change="uploadImage">
		</div>
	</div>
	<button v-if="previewImage || existedImage" @click="deleteCurrent" class="btn-sm btn btn-danger">{{ $messages.labelDelete() }}</button>
</template>

<script>
import { ref } from "vue";

export default {
	name: "CaveSwitchCheckbox",
	setup(props, { emit }) {
		let previewImage = ref(null);
		const uploadImage = (e) => {
			const image = e.target.files[0];

			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				previewImage.value = e.target.result;
			};
			emit("update:modelValue", image);
		};

		const deleteCurrent = () => {
			previewImage.value = null;
			emit("update:modelValue", null);
			emit("deleteExistedImage", null);
		};

		return {
			deleteCurrent,
			previewImage,
			uploadImage,
		};
	},
	props: {
		existedImage: { type: String, require: false, default: null },
		title: { type: String, required: false, default: "Image" },
	},
	components: {},
	computed: {
		formattedExistedImage() {
			return this.existedImage
				? this.existedImage
				: "data:image/png;base64,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";
		},
	},
};
</script>

<style lang="scss" scoped>
.uploading-image {
	border: 1px solid #d3d3d3;
	border-radius: 4px;
}
.form-group--image {
	display: grid;
	grid-template-rows: 20px auto;

	.form-group--image-uploader {
		max-width: 500px;
		input {
			max-width: 500px;
		}
	}
}
</style>