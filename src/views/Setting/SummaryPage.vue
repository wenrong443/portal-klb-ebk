<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="save()" v-if="isEdit">{{ $messages.labelSave() }}</button>
					<button class="btn btn-danger" @click="cancelEdit()" v-if="isEdit">{{ $messages.labelCancel() }}</button>
					<button class="btn btn-primary" @click="editSetting()" v-else>{{ $messages.labelEdit() }}</button>
				</div>
				<div class="card-body">
					<template v-for="record in records" v-bind:key="record.stName">
						<cave-setting-component v-model:setting="record.stValue" v-model:validation="record.validation" :title="record.stName"
							:read="isEdit" :type="record.valueType">
						</cave-setting-component>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveSettingComponent from "./@components/CaveSettingComponent";
import { onMounted, ref } from "vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	mixins: [pageBehaviour],
	data: () => ({}),
	setup() {
		const records = ref([]);

		const getAll = async () => {
			const [error, result] = await $service.settingService.getAll();
			if (error) {
			} else {
				let tmp = [];
				result.content.map((d) => {
					switch (d.stName) {
						case "WEBSITE_TITLE":
						case "WEBSITE_LOGO":
                        case "WEBSITE_LOGO2":
						case "PLAY_LOGO":
						case "TASK_REVIEW_APPROVAL_MODE":
                        case "REVIEW_LOADING_BACKGROUND_IMAGE":
                        case "REVIEW_LOADING_GIF":
							break;
						default:
							tmp.push(d);
					}
				});
				records.value = tmp.map((d) => {
					return { validation: true, ...d };
				});
			}
		};
		onMounted(() => getAll());
		return { records };
	},
	components: { CaveSettingComponent },
	data: () => ({
		isEdit: false,
	}),
	methods: {
		async save() {
			const validations = this.records.filter((d) => !d.validation);
			if (validations.length > 0) return;

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.settingService.update(
				this.records
			);
			loader.hide();

			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.isEdit = false;
			}
		},
		editSetting() {
			this.isEdit = true;
		},
		cancelEdit() {
			location.reload();
		},
	},
};
</script>

<style>
</style>