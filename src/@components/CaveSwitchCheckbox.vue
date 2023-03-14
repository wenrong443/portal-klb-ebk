<template>
	<div class="form-group cave-switch-checkbox">
		<label>{{text}}</label>
		<label class="switch">
			<input type="checkbox" v-model="formattedStatus" :disabled="isDisabled ? '' : (disabled)" />
			<div class="slider round"></div>
		</label>
	</div>
</template>

<script>
export default {
	name: "CaveSwitchCheckbox",
	components: {},
	props: {
		modelValue: { type: Number, required: false, default: 0 },
		text: { type: String, required: false, default: "Text Box" },
		isDisabled: { type: String, required: false },
	},
	data: () => ({
		editorValue: null,
	}),
	computed: {
		formattedStatus: {
			get: function () {
				return this.modelValue == 1 ? true : false;
			},
			set: function (newValue) {
				const value = newValue == true ? 1 : 0;
				this.$emit("update:modelValue", value);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.cave-switch-checkbox {
	display: grid;
}
.switch {
	display: inline-block;
	height: 26px;
	position: relative;
	width: 50px;
}

.switch input {
	display: none;
}

.slider {
	background-color: #ccc;
	bottom: 0;
	cursor: pointer;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transition: 0.4s;
}

.slider:before {
	background-color: #fff;
	bottom: 2px;
	content: "";
	height: 22px;
	left: 1px;
	position: absolute;
	transition: 0.4s;
	width: 22px;
}

input:checked + .slider {
	background-color: #66615b;
}

input:checked + .slider:before {
	transform: translateX(26px);
}

.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}

/* general styling */
html,
body {
	height: 100%;
	margin: 0;
}

body {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	background-color: #f1f2f3;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}

.container {
	margin: 0 auto;
}
</style>