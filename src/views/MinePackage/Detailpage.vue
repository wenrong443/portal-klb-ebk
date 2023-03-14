<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<button type="submit" class="btn btn-primary btn-sm btn-round" @click="edit()">{{ $messages.labelEdit() }}</button>
				</div>
				<div class="card-body">
					<div class="" v-for="formattedLanguageContent in formattedLanguageContents" v-bind:key="formattedLanguageContent">
						<language-content :content="formattedLanguageContent"></language-content>
					</div>
					<div class="cave-detail--side">
						<cave-detail-component :label="$messages.fieldLabelTotalIssuing()" :value="giptDisplayTotalIssuing" />
						<cave-detail-component :label="$messages.fieldLabelInterestRatePercent()" :value="giptDailyInterestRate" />
						<cave-detail-component :label="$messages.fieldLabelProjectScale()" :value="giptProjectScale" />
						<cave-detail-component :label="$messages.fieldLabelPayoutMode()" :value="formattedPayoutMode" />
						<cave-detail-component :label="$messages.fieldLabelMaxAmount()" :value="giptMaxAmount" />
						<cave-detail-component :label="$messages.fieldLabelMinAmount()" :value="giptMinAmount" />
						<cave-detail-component :label="$messages.fieldLabelIncrementAmount()" :value="giptIncreamentAmount" />
						<cave-detail-component :label="$messages.fieldLabelInvestmentCycle()" :value="giptInvestmentCycle" />
						<cave-detail-component :label="$messages.fieldLabelMaxPurchasePerUser()" :value="giptLimitPerAccount" />
						<cave-detail-component :label="$messages.fieldLabelCancellationProcessingFeePercent()"
							:value="giptCancellationProcessingFeePercent" />
						<cave-detail-component :label="$messages.labelStatus()">
							<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{ formattedStatusName }}</span>
						</cave-detail-component>
						<cave-detail-component :label="$messages.fieldLabelReturnModeWhileCancellation()">
							<span class="badge badge-pill" v-bind:class="formattedReturnModelClass">{{ formattedReturnModelName }}</span>
						</cave-detail-component>
						<div class="cave-detail--side-image">
							<label>{{ $messages.fieldLabelImage() }}</label>
							<img :src="formattedImageUrl" alt="investment image url" />
						</div>
					</div>
				</div>
			</div>
		</div>
		{{ formattedLanguageContent }}
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
	STATUS_CLASS,
	STATUS,
	createValidator,
	RETURN_MODAL,
	RETURN_MODAL_STATUS,
	mixin as RecordMixin,
} from "./MinePackage";
import useVuelidate from "@vuelidate/core";
import CaveDetailComponent from "@components/CaveDetailComponent";
import LanguageContent from "./@components/LanguageContent.vue";

export default {
	name: "DepositDetailPage",
	mixins: [RecordMixin],
	components: { CaveDetailComponent, LanguageContent },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		STATUS: {},
		RETURN_MODAL: {},
		payoutModeType: {},
		isRead: true,
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	computed: {
		formattedPayoutMode() {
			const payoutMode = this.payoutMode ? this.payoutMode : 0;
			return this.payoutModeType[payoutMode];
		},
		formattedStatusClass() {
			const status = this.giptStatus ? this.giptStatus : 0;
			return STATUS_CLASS[status];
		},
		formattedStatusName() {
			const status = this.giptStatus ? this.giptStatus : 0;
			return this.STATUS[status];
		},
		formattedReturnModelClass() {
			const status = this.giptIsReturnModal ? this.giptIsReturnModal : 0;
			return RETURN_MODAL_STATUS[status];
		},
		formattedReturnModelName() {
			const status = this.giptIsReturnModal ? this.giptIsReturnModal : 0;
			return this.RETURN_MODAL[status];
		},
		formattedLanguageContents() {
			const longDescription = this.giptDisplayDescriptionLong
				? JSON.parse(this.giptDisplayDescriptionLong).map((d) => {
						return { type: "giptDisplayDescriptionLong", ...d };
				  })
				: [];
			const shortDescription = this.giptDisplayDescriptionShort
				? JSON.parse(this.giptDisplayDescriptionShort).map((d) => {
						return { type: "giptDisplayDescriptionShort", ...d };
				  })
				: [];
			const dividendShare = this.giptDisplayDividendPerShare
				? JSON.parse(this.giptDisplayDividendPerShare).map((d) => {
						return { type: "giptDisplayDividendPerShare", ...d };
				  })
				: [];
			const displayTitle = this.giptDisplayTitle
				? JSON.parse(this.giptDisplayTitle).map((d) => {
						return { type: "giptDisplayTitle", ...d };
				  })
				: [];

			const multipleLanguage = [
				...longDescription,
				...shortDescription,
				...dividendShare,
				...displayTitle,
			];
			return multipleLanguage
				.reduce((rv, x) => {
					(rv[x["ltId"]] = rv[x["ltId"]] || []).push(x);
					return rv;
				}, [])
				.filter((d) => d);
		},
		formattedImageUrl() {
			return this.giptImageFileName
				? this.giptImageFileName
				: null;
		},
	},
	async created() {
		await this.getDetail();
	},
	methods: {
		async getDetail() {
			this.STATUS = {
				1: this.$messages.labelActive(),
				0: this.$messages.labelSuspend(),
			};

			this.payoutModeType = {
				DAILY: this.$messages.fieldLabelDailyDistribute(),
				WEEKLY: this.$messages.fieldLabelWeeklyDistribute(),
				MONTHLY: this.$messages.fieldLabelMonthlyDistribute(),
				LUMP_SUM: this.$messages.fieldLabelLumpSumDistribute(),
				DAILY_COMPOUND_INTEREST:
					this.$messages.fieldLabelDailyCompoundInterest(),
			};

			this.RETURN_MODAL = {
				1: this.$messages.fieldLabelYes(),
				0: this.$messages.fieldLabelNo(),
			};
			const [error, result] =
				await this.$service.investmentService.getDetail(this.recordId);

			if (error) {
			} else {
				assign(this, result.content);
			}
		},
		edit() {
			this.$router.push({
				name: "MinePackageEditPage",
				params: {
					recordId: this.recordId,
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.card-title--right {
	float: right;
}
.cave-detail--side {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 4px;
	padding-top: 10px;
	.cave-detail--side-image {
		display: grid;
		grid-template-rows: 30px auto;
		img {
			max-width: 250px;
		}
	}
}
</style>