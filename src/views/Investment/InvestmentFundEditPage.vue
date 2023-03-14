<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelInvestmentProjectEditPage() }}
					</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length > 0">
						</tabs>
						<div class="form-group cave-form">
							<div class v-for="fieldOptionDisplayTitle in fieldOptionDisplayTitles" v-bind:key="fieldOptionDisplayTitle.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayTitle.ltId">
									<label>{{ $messages.fieldLabelTitle() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
										v-model="fieldOptionDisplayTitle.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayTitles.$error">
								<div v-if="v$.fieldOptionDisplayTitles.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
						<div class="form-group cave-form">
							<div v-for="fieldOptionDisplayDescriptionShort in fieldOptionDisplayDescriptionShorts"
								v-bind:key="fieldOptionDisplayDescriptionShort.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayDescriptionShort.ltId">
									<label>{{ $messages.fieldLabelShortDescription() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelShortDescription()"
										v-model="fieldOptionDisplayDescriptionShort.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayDescriptionShorts.$error">
								<div v-if="v$.fieldOptionDisplayDescriptionShorts.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelShortDescription() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
						<div class="form-group cave-form">
							<div v-for="fieldOptionDisplayDescriptionLong in fieldOptionDisplayDescriptionLongs"
								v-bind:key="fieldOptionDisplayDescriptionLong.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayDescriptionLong.ltId">
									<label>{{ $messages.fieldLabelLongDescription() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelLongDescription()"
										v-model="fieldOptionDisplayDescriptionLong.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayDescriptionLongs.$error">
								<div v-if="v$.fieldOptionDisplayDescriptionLongs.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelLongDescription() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

					</div>
					<div class="form-group cave-form">
						<div v-for="fieldOptionDisplayDividendPerShare in fieldOptionDisplayDividendPerShares"
							v-bind:key="fieldOptionDisplayDividendPerShare.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayDividendPerShare.ltId">
								<label>{{ $messages.fieldLabelDividendPerShare() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDividendPerShare()"
									v-model="fieldOptionDisplayDividendPerShare.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionDisplayDividendPerShares.$error">
							<div v-if="v$.fieldOptionDisplayDividendPerShares.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelDividendPerShare() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelCancellationProcessingFeePercent() }}</label>
						<input type="number" v-model="giptCancellationProcessingFeePercent" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCancellationProcessingFeePercent()" />
						<div v-if="v$.giptCancellationProcessingFeePercent.$error">
							<div v-if="v$.giptCancellationProcessingFeePercent.required" class="error">
								{{ $messages.fieldLabelCancellationProcessingFeePercent() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelInterestRatePercent() }}</label>
						<input type="numer" v-model="giptDailyInterestRate" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelInterestRatePercent()" />
						<div v-if="v$.giptDailyInterestRate.$error">
							<div v-if="v$.giptDailyInterestRate.required" class="error">
								{{ $messages.fieldLabelInterestRatePercent() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelTotalIssuing() }}</label>
						<input type="numer" v-model="giptDisplayTotalIssuing" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTotalIssuing()" />
						<div v-if="v$.giptDisplayTotalIssuing.$error">
							<div v-if="v$.giptDisplayTotalIssuing.required" class="error">
								{{ $messages.fieldLabelTotalIssuing() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelIncrementAmount() }}</label>
						<input type="numer" v-model="giptIncreamentAmount" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelIncrementAmount()" />
						<div v-if="v$.giptIncreamentAmount.$error">
							<div v-if="v$.giptIncreamentAmount.required" class="error">
								{{ $messages.fieldLabelIncrementAmount() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelInvestmentCycle() }}</label>
						<input type="numer" v-model="giptInvestmentCycle" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelInvestmentCycle()" />
						<div v-if="v$.giptInvestmentCycle.$error">
							<div v-if="v$.giptInvestmentCycle.required" class="error">
								{{ $messages.fieldLabelInvestmentCycle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMaxPurchasePerUser() }}</label>
						<input type="numer" v-model="giptLimitPerAccount" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMaxPurchasePerUser()" />
						<div v-if="v$.giptLimitPerAccount.$error">
							<div v-if="v$.giptLimitPerAccount.required" class="error">
								{{ $messages.fieldLabelMaxPurchasePerUser() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMaxAmount() }}</label>
						<input type="numer" v-model="giptMaxAmount" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMaxAmount()" />
						<div v-if="v$.giptMaxAmount.$error">
							<div v-if="v$.giptMaxAmount.required" class="error">
								{{ $messages.fieldLabelMaxAmount() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMinAmount() }}</label>
						<input type="numer" v-model="giptMinAmount" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMinAmount()" />
						<div v-if="v$.giptMinAmount.$error">
							<div v-if="v$.giptMinAmount.required" class="error">
								{{ $messages.fieldLabelMinAmount() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProjectScale() }}</label>
						<input type="numer" v-model="giptProjectScale" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelProjectScale()" />
						<div v-if="v$.giptProjectScale.$error">
							<div v-if="v$.giptProjectScale.required" class="error">
								{{ $messages.fieldLabelProjectScale() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<cave-switch-checkbox v-model="giptStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelPayoutMode() }}</label>
						<select class="form-control" v-model="payoutMode">
							<option v-for="payoutMode in payoutModes" v-bind:value="payoutMode.id" v-bind:key="payoutMode.id">{{ payoutMode.value }}
							</option>
						</select>
						<div v-if="v$.payoutMode.$error">
							<div v-if="v$.payoutMode.required" class="error">
								{{ $messages.fieldLabelPayoutMode() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelReturnModeWhileCancellation() }}</label>
						<select class="form-control" v-model="returnModel">
							<option v-for="returnModel in returnModels" v-bind:value="returnModel.id" v-bind:key="returnModel.id">
								{{ returnModel.value }}</option>
						</select>
						<div v-if="v$.returnModel.$error">
							<div v-if="v$.returnModel.required" class="error">
								{{ $messages.fieldLabelReturnModeWhileCancellation() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImage()" v-model="image" :existedImage="giptImageFileName"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
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
} from "./Fund";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "DepositDetailPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { Tabs, CaveImageUpload },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		isRead: true,
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
				await this.$service.investmentService.getDetail(this.recordId);

			if (error) {
			} else {
				//TODO: maybe got a better way, see back later
				// Can try with computed
				assign(this, result.content);

				this.fieldOptionDisplayDescriptionLongs = JSON.parse(
					this.giptDisplayDescriptionLong
				);
				this.fieldOptionDisplayDescriptionShorts = JSON.parse(
					this.giptDisplayDescriptionShort
				);
				this.fieldOptionDisplayDividendPerShares = JSON.parse(
					this.giptDisplayDividendPerShare
				);
				this.fieldOptionDisplayTitles = JSON.parse(
					this.giptDisplayTitle
				);
			}
		},
		cancel() {
			this.$router.push({ name: "InvestmentFundSummaryPage" });
		},
		async save() {
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}

			//TODO: maybe got a better way, see back later
			// Can try with computed

			this.giptDisplayDescriptionLong =
				this.fieldOptionDisplayDescriptionLongs;
			this.giptDisplayDescriptionShort =
				this.fieldOptionDisplayDescriptionShorts;
			this.giptDisplayDividendPerShare =
				this.fieldOptionDisplayDividendPerShares;
			this.giptDisplayTitle = this.fieldOptionDisplayTitles;

			const record = {
				...createInstance(this),
			};

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] =
				await this.$service.investmentService.update(record);

			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				if (!this.image) {
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$router.push({ name: "InvestmentFundSummaryPage" });
				} else {
					await this.uploadImage(this.recordId);
				}
			}
		},
		async uploadImage(id) {
			var formData = new FormData();
			formData.append("image", this.image);

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] =
				await this.$service.investmentService.uploadImage(id, formData);

			if (error) {
				loader.hide();
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "InvestmentFundSummaryPage" });
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