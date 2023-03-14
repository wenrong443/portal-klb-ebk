<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMinePackageScheduleAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelPackage() }}</label>
						<select class="form-control" v-model="gmpstGmpaatId">
							<option v-for="packageA in packageList" v-bind:value="packageA.gmpaatId" v-bind:key="packageA.gmpaatId">
								{{ packageA.title }}
							</option>
						</select>
						<div v-if="v$.gmpstGmpaatId.$error">
							<div v-if="v$.gmpstGmpaatId.required" class="error">
								{{ $messages.fieldLabelPackage() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRankingModeStartDate() }}</label>
						<input type="datetime-local" v-model="gmpstStart" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRankingModeStartDate()" />
						<div v-if="v$.gmpstStart.$error">
							<div v-if="v$.gmpstStart.required" class="error">
								{{ $messages.fieldLabelRankingModeStartDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRankingModeEndDate() }}</label>
						<input type="datetime-local" v-model="gmpstEnd" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRankingModeEndDate()" />
						<div v-if="v$.gmpstEnd.$error">
							<div v-if="v$.gmpstEnd.required" class="error">
								{{ $messages.fieldLabelRankingModeEndDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    
					<cave-switch-checkbox v-model="gmpstStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">{{ $messages.labelSave() }}</button>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Good Title Would Help</h4>
				</div>
				<div class="card-body">
					<p>Discovere how a title would help to make the post attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./MinePackageSchedule";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, CaveImageUpload, Tabs },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		packageList: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
		const [error, result] =
			await this.$service.minePackageService.getAll({});
		if (error) {
			this.showError(error);
		} else {
			this.packageList = result.content;
		}
	},
	computed: {},
	methods: {
		async save() {
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}

			const record = {
				...createInstance(this),
			};
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.minePackageService.addSchedule(record);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MinePackageScheduleSummaryPage" });
			}
		},

		cancel() {
			this.$router.push({ name: "MinePackageScheduleSummaryPage" });
		},
	},
};
</script>

<style></style>
