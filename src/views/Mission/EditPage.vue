<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelDailyMissionEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length > 0"></tabs>
						<div class v-for="fieldOption in fieldOptionsTitle" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelTitle() }}</label>
								<input type="text" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
									v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsTitle.$error">
							<div v-if="v$.fieldOptionsTitle.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsDescription" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelDescription() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDescription()" v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsDescription.$error">
							<div v-if="v$.fieldOptionsDescription.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelDescription() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="mitType">
							<option v-for="missionType in missionTypes" v-bind:value="missionType.id" v-bind:key="missionType.id">
								{{ $messages[missionType.value]() }}
							</option>
						</select>
						<div v-if="v$.mitType.$error">
							<div v-if="v$.mitType.required" class="error">
								{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRewardType() }}</label>
						<select class="form-control" v-model="mitRewardType">
							<option v-for="rewardType in rewardTypes" v-bind:value="rewardType.id" v-bind:key="rewardType.id">
								{{ $messages[rewardType.value]() }}
							</option>
						</select>
						<div v-if="v$.mitRewardType.$error">
							<div v-if="v$.mitRewardType.required" class="error">
								{{ $messages.fieldLabelRewardType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRewardAmount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRewardAmount()"
							v-model="mitRewardAmount" />
						<div v-if="v$.mitRewardAmount.$error">
							<div v-if="v$.mitRewardAmount.required" class="error">
								{{ $messages.fieldLabelRewardAmount() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mitRewardAmount.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRepeatType() }}</label>
						<select class="form-control" v-model="mitRepeatType">
							<option v-for="repeatType in repeatTypes" v-bind:value="repeatType.id" v-bind:key="repeatType.id">
								{{ $messages[repeatType.value]() }}
							</option>
						</select>
						<div v-if="v$.mitRepeatType.$error">
							<div v-if="v$.mitRepeatType.required" class="error">
								{{ $messages.fieldLabelRepeatType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPriority() }}</label>
						<input type="number" step="1" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPriority()"
							v-model="priority" />
						<div v-if="v$.priority.$error">
							<div v-if="v$.priority.required" class="error">
								{{ $messages.fieldLabelPriority() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.priority.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>
					<cave-switch-checkbox v-model="forActiveMiner" :text="$messages.fieldLabelForActiveMiner()"></cave-switch-checkbox>
					<cave-switch-checkbox v-model="mitStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMissionGoTo() }}</label>
						<select class="form-control" v-model="goTo">
							<option v-for="goToOption in goToOptions" v-bind:value="goToOption.id" v-bind:key="goToOption.id">
								{{ $messages[goToOption.value]() }}
							</option>
						</select>
						<div v-if="v$.goTo.$error">
							<div v-if="v$.goTo.required" class="error">
								{{ $messages.fieldLabelMissionGoTo() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowProductId">
						<label for="inputState">{{ $messages.fieldLabelMissionProductId() }}</label>
						<select class="form-control" v-model="productId">
							<option v-for="typeOption in productOptions" v-bind:value="typeOption.gmptId" v-bind:key="typeOption.gmptId">
								{{ typeOption.gmptShortCode }} </option>
						</select>
						<div v-if="v$.productId.$error">
							<div v-if="v$.productId.required" class="error">
								{{ $messages.fieldLabelMissionProductId() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowPackageId">
						<label for="inputState">{{ $messages.fieldLabelMissionPackageId() }}</label>
						<select class="form-control" v-model="packageId">
							<option v-for="typeOption in packageOptions" v-bind:value="typeOption.gmpaatId" v-bind:key="typeOption.gmpaatId">
								{{ typeOption.gmpaatGmptShortCode }} -
								{{ typeOption.title }}</option>
						</select>
						<div v-if="v$.packageId.$error">
							<div v-if="v$.packageId.required" class="error">
								{{ $messages.fieldLabelMissionPackageId() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowProfitBoost">
						<label>{{ $messages.fieldLabelMissionProfitBoost() }}</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMissionProfitBoost()" v-model="profitBoost" />
						<div v-if="v$.profitBoost.$error">
							<div v-if="v$.profitBoost.required" class="error">
								{{ $messages.fieldLabelMissionProfitBoost() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowSameToPromoCode">
						<label>{{ $messages.fieldLabelMissionSameToPromoCode() }}</label>
						<input type="text" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMissionSameToPromoCode()" v-model="sameToPromoCode" />
						<div v-if="v$.sameToPromoCode.$error">
							<div v-if="v$.sameToPromoCode.required" class="error">
								{{ $messages.fieldLabelMissionSameToPromoCode() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowTotal">
						<label>{{ $messages.fieldLabelMissionTotal() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMissionTotal()"
							v-model="total" />
						<div v-if="v$.total.$error">
							<div v-if="v$.total.required" class="error">
								{{ $messages.fieldLabelMissionTotal() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isShowUrl">
						<label>{{ $messages.fieldLabelMissionUrl() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMissionUrl()"
							v-model="url" />
						<div v-if="v$.url.$error">
							<div v-if="v$.url.required" class="error">
								{{ $messages.fieldLabelMissionUrl() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">
						{{ $messages.labelCancel() }}
					</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">
						{{ $messages.labelSave() }}
					</button>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Good Title Would Help</h4>
				</div>
				<div class="card-body">
					<p>Discovere how a title would help to make the post
						attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import Tabs from "@components/Tabs.vue";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Mission";
import useVuelidate from "@vuelidate/core";

export default {
	name: "EditPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, required: true },
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.mitTitle = this.fieldOptionsTitle;
			this.mitDescription = this.fieldOptionsDescription;

			const record = {
				mitId: this.recordId,
				...createInstance(this),
			};
			this.setLoading();

			const [error, result] = await this.$service.missionService.update(
				record
			);
			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MissionSummaryPage" });
			}
		},
		async getDetail() {
			const [error, result] =
				await this.$service.missionService.getDetail(this.recordId);

			if (error) {
				this.showError(error);
			} else {
				assign(this, result.content);
				this.fieldOptionsTitle = JSON.parse(this.mitTitle);
				this.fieldOptionsDescription = JSON.parse(this.mitDescription);
			}
		},
	},
};
</script>
