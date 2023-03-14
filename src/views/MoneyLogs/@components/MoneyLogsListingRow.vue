<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.mltUtUsername }}</td>
	<td class="">{{ formattedType(record.mltType) }}</td>
	<td class="">{{ record.mltGmptShortCode }}</td>
	<td class="cave-table-row--right">
		{{ formattedIn(record.mltInOut, record.mltAmount) }}
	</td>
	<td class="cave-table-row--right">
		{{ formattedOut(record.mltInOut, record.mltAmount) }}
	</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "RankingListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		moneyLogsType: [],
	}),
	computed: {
		
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
        formattedType(type) {
            for (let i=0; i< this.moneyLogsType.length; i++){
                if (type == this.moneyLogsType[i].id){
                    return this.moneyLogsType[i].value;
                }
            }
            return  "";
		},
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(12);
		},
		formattedIn(mltInOut, mltAmount) {
			return mltInOut != null
				? mltInOut == "IN"
					? this.formatted2DC(mltAmount)
					: ""
				: "";
		},
		formattedOut(mltInOut, mltAmount) {
			return mltInOut != null
				? mltInOut == "OUT"
					? this.formatted2DC(mltAmount)
					: ""
				: "";
		},
	},
};
</script>

<style lang="scss" scoped></style>
