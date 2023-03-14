<template>
	<div class="cave__component-setting">
		<label class="cave__component-setting-title">{{formattedTitle}}</label>
		<div v-if="booleanType">
			<select :value="setting" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)">
				<option v-bind:value="true">True</option>
				<option v-bind:value="false">False</option>
			</select>
		</div>
		<div v-if="integerType">
			<input :value="setting" type="number" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)" />
		</div>
		<div v-if="doubleType">
			<input :value="setting" type="number" step="0.01" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)" />
		</div>
		<div v-if="enumType">
			<select :value="setting" class="form-control" :disabled="!read">
				<option v-bind:value="enumOption.id" v-for="enumOption in enumOptions" v-bind:key="enumOption.id"
					@input="updateSetting($event.target.value)">{{enumOption.value}}</option>
			</select>
		</div>
		<div v-if="urlType">
			<input :value="setting" type="url" class="form-control" :disabled="!read" @change="urlValidator($event.target.value)"
				@input="updateSetting($event.target.value)" />
			<span v-if="!isUrlValid" class="error">URL no valid</span>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";

export default {
	name: "CaveSwitchCheckbox",
	setup(props, { emit }) {
		let isUrlValid = ref(true);
		const updateSetting = (value) => {
			emit("update:setting", value);
		};

		const urlValidator = (value) => {
			var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);
			isUrlValid.value = value.match(regex) ? true : false;
			emit("update:validation", isUrlValid);
		};

		return { updateSetting, urlValidator, isUrlValid };
	},
	components: {},
	props: {
		setting: { required: false },
		title: { type: String, required: false, default: "TEXT bos" },
		description: { type: String, required: false, default: "TEXT Box" },
		type: { type: String, required: false, default: "text" },
		read: { type: Boolean, required: false, default: false },
		validation: { type: Boolean, required: false, default: false },
	},
	computed: {
		formattedTitle() {
			return this.title
				? this.title.replaceAll("_", " ").toLowerCase()
				: "No title";
		},
		booleanType() {
			return this.type == "boolean";
		},
		doubleType() {
			return this.type == "double";
		},
		enumType() {
			return this.type == "enum";
		},
		urlType() {
			return this.type == "url";
		},
		integerType() {
			return this.type == "int";
		},
		enumOptions() {
			return [
				{ id: "AUTO_APPROVE_IMMEDIATELY", value: "Auto Approve Immediately" },
				{
					id: "AUTO_APPROVE_AFTER_1_HOURS",
					value: "Auto Approve After 1 Hour",
				},
				{ id: "APPROVE_MANUALLY", value: "Approve Manually" },
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.cave__component-setting {
	display: grid;
	grid-template-columns: 300px  auto;
	border-top: 1px solid #ddd;
	padding: 18px 0px;

	.cave__component-setting-title {
		text-transform: capitalize;
	}
	.cave__component-setting-description {
		font-size: 10px;
		text-transform: capitalize;
	}

	label {
		font-size: 14px;
	}
}
</style>