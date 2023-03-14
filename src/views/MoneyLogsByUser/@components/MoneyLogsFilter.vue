<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
					<button type="submit" class="btn btn-info btn-round" @click="showFilter()">
						{{ filterWord }}
					</button>
				</div>
				<div class="card-body" v-if="isFilter">
					<div class="form-group">
						<label for="inputState">{{$messages.fieldLabelType()}}</label>
						<select class="form-control" v-model="moneyType">
							<option v-for="sortByOption in moneyLogsType" v-bind:value="sortByOption.id" v-bind:key="sortByOption.id">
								{{ sortByOption.value }}</option>
						</select>
					</div>
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelFrom()}})</label>
						<input type="date" class="form-control" v-model="start" />
					</div>

					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelTo()}})</label>
						<input type="date" class="form-control" v-model="end" />
					</div>

					<div class="card-footer card-footer-right">
						<button type="submit" class="btn btn-danger btn-round" @click="resetFilter()">
							{{$messages.labelFilteringReset()}}
						</button>
						<button type="submit" class="btn btn-info btn-round" @click="emitSearch()">
							{{$messages.labelFilteringSearch()}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data: () => ({
        moneyType: "",
		start: new Date().toISOString().slice(0, 10),
		end: new Date().toISOString().slice(0, 10),
		isFilter: false,
		moneyLogsType: [],
	}),
	computed: {
		filterWord() {
			return this.isFilter
				? this.$messages.labelFilteringHide()
				: this.$messages.labelFilteringShow();
		},
	},
	async created() {
		this.moneyLogsType = [
			{
				id: "IN_DAILY_CHECK_IN_REWARD",
				value: this.$messages.fieldLabelMoneyLogDailyCheckInReward(),
			},
			// {
			// 	id: "IN_MISSION_REWARD",
			// 	value: this.$messages.fieldLabelMoneyLogMissionReward(),
			// },
			// {
			// 	id: "IN_INVESTMENT_CANCELLATION_MODAL_RETURN",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentCancellationModalReturn(),
			// },
			// {
			// 	id: "IN_INVESTMENT_INTEREST",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentInterest(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L1_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL1Interest(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L2_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL2Interest(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L3_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL3Interest(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L1_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL1Reward(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L2_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL2Reward(),
			// },
			// {
			// 	id: "IN_INVESTMENT_REFERRAL_L3_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentReferralL3Reward(),
			// },
			// {
			// 	id: "IN_MINE_INTEREST",
			// 	value: this.$messages.fieldLabelMiningInterest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L1_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL1Interest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L2_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL2Interest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L3_INTEREST_REWARD_FOR_FOR_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL3Interest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L1_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL1FirstInterest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L2_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL2FirstInterest(),
			// },
			// {
			// 	id: "IN_MINE_REFERRAL_L3_REWARD_FOR_FIRST_PURCHASE",
			// 	value: this.$messages.fieldLabelMiningReferralL3FirstInterest(),
			// },
			{
				id: "IN_REGISTER_REWARD",
				value: this.$messages.fieldLabelMoneyLogRegisterReward(),
			},
			{
				id: "IN_ADMIN_INCREASE",
				value: this.$messages.fieldLabelMoneyLogAdminIncrease(),
			},
			{
				id: "IN_REFUND_WITHDRAW",
				value: this.$messages.fieldLabelMoneyLogRefundWithdraw(),
			},
			{
				id: "IN_REFUND_WITHDRAW_PROCESSING_FEE",
				value: this.$messages.fieldLabelMoneyLogRefundWithdrawProcessingFee(),
			},
			{
				id: "IN_DEPOSIT",
				value: this.$messages.fieldLabelMoneyLogDeposit(),
			},
			// {
			// 	id: "IN_CRYTO_EXCHANGE",
			// 	value: this.$messages.fieldLabelMiningCryptoExchange(),
			// },
			// {
			// 	id: "IN_PROMO_CODE_CASHBACK_DEPOSIT",
			// 	value: this.$messages.fieldLabelMoneyLogPromoCodeCashbackDeposit(),
			// },
            // {
			// 	id: "IN_RED_PACKET",
			// 	value: this.$messages.fieldLabelMoneyLogRedPacket(),
			// },
            {
				id: "IN_REVIEW_COMMISSION",
				value: this.$messages.fieldLabelReviewCommission(),
			},
			// {
			// 	id: "IN_PROMO_CODE_CASHBACK_WITHDRAW",
			// 	value: this.$messages.fieldLabelMoneyLogPromoCodeCashbackWithdrawal(),
			// },
			// {
			// 	id: "OUT_CRYTO_EXCHANGE",
			// 	value: this.$messages.fieldLabelMiningOutCryptoExchange(),
			// },
			{
				id: "OUT_ADMIN_DECREASE",
				value: this.$messages.fieldLabelMoneyLogAdminDecrease(),
			},
			{
				id: "OUT_WITHDRAW",
				value: this.$messages.fieldLabelMoneyLogWithdraw(),
			},
			// {
			// 	id: "OUT_INVESTMENT_MODAL_DEDUCT",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentModalDeduct(),
			// },
			// {
			// 	id: "OUT_MINE_MODAL_DEDUCT",
			// 	value: this.$messages.fieldLabelMiningOutModalDeduct(),
			// },
            // {
			// 	id: "OUT_MINE_MODAL_DEDUCT_GIFT_CARD",
			// 	value: this.$messages.fieldLabelMiningOutModalDeductGiftCard(),
			// },
			{
				id: "OUT_WITHDRAW_PROCESSING_FEE",
				value: this.$messages.fieldLabelMoneyLogWithdrawProcessingFee(),
			},
			// {
			// 	id: "OUT_INVESTMENT_CANCELLATION_DEDUCT",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentCancellationDeduct(),
			// },
			// {
			// 	id: "OUT_INVESTMENT_CANCELLATION_PENALTY",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentCancellationPenalty(),
			// },
			// {
			// 	id: "OUT_INVESTMENT_CANCELLATION_PENALTY_WALLET_BALANCE_0",
			// 	value: this.$messages.fieldLabelMoneyLogInvestmentCancellationPenaltyWalletBalance0(),
			// },
		];

        if (process.env.IS_V2 == 'true'){
            this.moneyLogsType.push({
                id: "IN_DEPOSIT_COMMISSION",
				value: this.$messages.fieldLabelDepositReferralComission()
            });
            this.moneyLogsType.push({
                id: "IN_TASK_COMMISSION",
				value: this.$messages.fieldLabelReviewReferralComission()
            });
        }
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
                moneyType: this.moneyType,
				start: this.start,
				end: this.end,
			});
		},
		resetFilter() {
            this.moneyType = "";
			this.start = new Date().toISOString().slice(0, 10);
			this.end = new Date().toISOString().slice(0, 10);
			this.emitSearch();
		},
		showFilter() {
			this.isFilter = !this.isFilter;
		},
	},
};
</script>

<style>
.card-footer-right {
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: 10px;
	padding: 10px 0;
	float: right;
}

.cave-card-header {
	display: grid;
	grid-template-columns: 1fr auto;
}
</style>