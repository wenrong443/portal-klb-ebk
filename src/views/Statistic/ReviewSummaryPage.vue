<template>
    <div class="card-body-grid">
		<div class="card">
			<h6>{{ $messages.fieldLabelGlobalMUser() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelStatisticsTotalRegistered() }}<div class="card-body--number">{{ records.totalRegistration }}</div>
                {{ $messages.fieldLabelStatisticsTodayRegistered() }}<div class="card-body--number">{{ records.todayRegistered }}</div>
                {{ $messages.fieldLabelStatisticsYesterdayRegistered() }}<div class="card-body--number">{{ records.yesterdayRegistered }}</div>
                {{ $messages.fieldLabelStatisticsMonthlyRegistered() }}<div class="card-body--number">{{ records.monthlyRegistered }}</div>
                {{ $messages.fieldLabelStatisticsCurrentActiveUser() }}<div class="card-body--number">{{ records.onlineUser }}</div>
                {{ $messages.labelBalance() }}<div class="card-body--number">{{ records.balance }}</div>
			</div>
		</div>

        <div class="card">
			<h6>{{ $messages.fieldLabelStatisticsOngoingTask() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelStatisticsOverall() }}<div class="card-body--number">{{ records.ongoingOverall }}</div>
                {{ $messages.fieldLabelStatisticsTotalDistribution() }}<div class="card-body--number">{{ records.ongoingTotalDistribution }}</div>
                {{ $messages.fieldLabelStatisticsTodayDistribution() }}<div class="card-body--number">{{ records.ongoingTodayDistributed }}</div>
                {{ $messages.fieldLabelStatisticsYesterdayDistribution() }}<div class="card-body--number">{{ records.ongoingYesterdayDistributed }}</div>
			</div>
		</div>

        <div class="card">
			<h6>{{ $messages.fieldLabelStatisticsOnHoldTask() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelStatisticsOverall() }}<div class="card-body--number">{{ records.onHoldOverall }}</div>
                {{ $messages.fieldLabelStatisticsTotalDistribution() }}<div class="card-body--number">{{ records.onHoldTotalDistribution }}</div>
                {{ $messages.fieldLabelStatisticsTodayDistribution() }}<div class="card-body--number">{{ records.onHoldTodayDistributed }}</div>
                {{ $messages.fieldLabelStatisticsYesterdayDistribution() }}<div class="card-body--number">{{ records.onHoldYesterdayDistributed }}</div>
			</div>
		</div>
	</div>
    <div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.fieldLabelStatisticsMembership() }}
					</h4>
				</div>
				<div class="card-body">
					<div class="overflow-auto">
						<general-membership-listing :records="formattedRecords2" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.fieldLabelPlatformSelection() }}
					</h4>
				</div>
				<div class="card-body">
					<div class="overflow-auto">
						<general-review-listing :records="formattedRecords" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GeneralReviewListing from "./@components/GeneralReviewListing";
import GeneralMembershipListing from "./@components/GeneralMembershipListing";

import pageBehaviour from "seedwork/mixins/pageBehaviour";
export default {
	name: "",
	components: { GeneralReviewListing, GeneralMembershipListing },
	data: () => ({
		records: {},
		generalSub: [],
        generalSub2: [],
		mineRecords: [],
	}),
	mixins: [pageBehaviour],
	computed: {
        formattedBTCBalance() {
            return this.records ? this.records.pendingWithdrawBTC : 0
        },
        formattedETHBalance() {
            return this.records ? this.records.pendingWithdrawETH : 0
        },
        formattedLTCBalance() {
            return this.records ? this.records.pendingWithdrawLTC : 0
        },
        formattedOverallBTC(){
            return this.records ? this.records.overallBTC : 0;
        },
        formattedPurchaseTodayBTC(){
            return this.records ? this.records.purchasedTodayBTC : 0;
        },
        formattedOverallETH(){
            return this.records ? this.records.overallETH : 0;
        },
        formattedPurchaseTodayETH(){
            return this.records ? this.records.purchasedTodayETH : 0;
        },
        formattedOverallLTC(){
            return this.records ? this.records.overallLTC : 0;
        },
        formattedPurchaseTodayLTC(){
            return this.records ? this.records.purchasedTodayLTC : 0;
        },
		formattedRecords() {
			if (this.generalSub.length <= 0) return [];
			return this.generalSub.map((d) => {
				return {
					type: d.type.replaceAll("_", " "),
					...d.generalSub,
				};
			});
		},
        formattedRecords2() {
			if (this.generalSub2.length <= 0) return [];
			return this.generalSub2;
		},
		formattedCurrentActiveUser() {
			return this.records ? this.records.currentActiveUser : 0;
		},
		formattedTotalUser() {
			return this.records ? this.records.totalUser : 0;
		},
        formattedWithdrawableBalance() {
			return this.records ? this.records.withdrawableBalance : 0;
		},
        formattedDepositBalance() {
			return this.records ? this.records.depositBalance : 0;
		},
		formattedTodayRegister() {
			if (this.formattedRecords.length <= 0) return 0;
			return this.formattedRecords.find((d) => d.type == "TODAY").register;
		},
        formattedThisMonthRegister() {
			if (this.formattedRecords.length <= 0) return 0;
			return this.formattedRecords.find((d) => d.type == "CURRENT MONTH").register;
		},
		formattedYesterdayRegister() {
			if (this.formattedRecords.length <= 0) return 0;
			return this.formattedRecords.find((d) => d.type == "YESTERDAY").register;
		},
	},
	async created() {
		this.setLoading();
		if (window.localStorage) {
			if (!localStorage.getItem("firstLoad")) {
				localStorage["firstLoad"] = true;
				window.location.reload();
			} else {
				localStorage.removeItem("firstLoad");
				if (localStorage.getItem("token")) {
					await this.getAll();
					this.setCompleted();
				}
			}
		}
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.statisticService.getGeneralAll2();
			if (error) {
				this.showError(error);
			} else {
				this.records = result.content;
				this.generalSub = result.content.generalList;
                this.generalSub2 = result.content.general2MembershipList;
			}
		},
	},
};
</script>
<style lang="scss" >
.card-body-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr) !important;
	gap: 10px;
	text-align: center;

	h6 {
		font-weight: 700;
		font-size: 12px;
		padding: 12px;
	}

	.card-body--number {
		font-size: 16px;
		font-weight: 900;
	}
}
</style>