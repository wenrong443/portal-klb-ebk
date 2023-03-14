<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMinePackageScheduleEditPage() }}
					</h4>
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
import {
	assign,
	createInstance,
	createValidator,
	mixin as RecordMixin,
} from "./MinePackageSchedule";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";

export default {
	name: "DepositDetailPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { Tabs, CaveImageUpload, CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		isRead: true,
		packageList: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	computed: {},
	async created() {
		await this.getDetail();
	},
	methods: {
		async getDetail() {
			const [error, result] =
				await this.$service.minePackageService.getDetailSchedule(this.recordId);

			if (error) {
			} else {
				//TODO: maybe got a better way, see back later
				// Can try with computed
				assign(this, result.content);
			}

			const [error2, result2] =
				await this.$service.minePackageService.getAll({});
			if (error2) {
				this.showError(error2);
			} else {
				this.packageList = result2.content;
			}
		},
		cancel() {
			this.$router.push({ name: "MinePackageScheduleSummaryPage" });
		},
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
				await this.$service.minePackageService.updateSchedule(record);

			if (error) {
                loader.hide();
				this.showError(error);
			} else {
                loader.hide();
				if (!this.image) {
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$router.push({ name: "MinePackageScheduleSummaryPage" });
				} else {
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$router.push({ name: "MinePackageScheduleSummaryPage" });
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.card-title--right {
	float: right;
}
</style>