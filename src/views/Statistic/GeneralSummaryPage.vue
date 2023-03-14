<template>
    <div class="card-body-grid">
		<div class="card">
			<h6>{{ $messages.fieldLabelGlobalMUser() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelStatisticsTotalRegistered() }}<div class="card-body--number">{{formattedTotalUser}}</div>
                {{ $messages.fieldLabelWithdrawalBalance() }}<div class="card-body--number">{{formattedWithdrawableBalance}}</div>
                {{ $messages.fieldLabelDepositBalance() }}<div class="card-body--number">{{formattedDepositBalance}}</div>
			</div>
		</div>

        <div class="card" v-for="(record) in records.mineGeneralInfoList" v-bind:key="record.shortCode">
			<h6>{{record.shortCode}} {{ $messages.fieldLabelPackage() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelOverall() }}<div class="card-body--number">{{record.overall}}</div>
                {{ $messages.fieldPurchasedToday() }}<div class="card-body--number">{{record.purchasedToday}}</div>
                {{ $messages.fieldLabelUserBalance() }}<div class="card-body--number">{{record.pendingWithdraw}}</div>
			</div>
		</div>

		<!-- <div class="card">
			<h6>{{ $messages.fieldLabelBTCPackage() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelOverall() }}<div class="card-body--number">{{formattedOverallBTC}}</div>
                {{ $messages.fieldPurchasedToday() }}<div class="card-body--number">{{formattedPurchaseTodayBTC}}</div>
                {{ $messages.fieldLabelUserBalance() }}<div class="card-body--number">{{formattedBTCBalance}}</div>
			</div>
		</div>
		<div class="card">
			<h6>{{ $messages.fieldLabelETHPackage() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelOverall() }}<div class="card-body--number">{{formattedOverallETH}}</div>
                {{ $messages.fieldPurchasedToday() }}<div class="card-body--number">{{formattedPurchaseTodayETH}}</div>
                {{ $messages.fieldLabelUserBalance() }}<div class="card-body--number">{{formattedETHBalance}}</div>
			</div>
		</div>
        <div class="card">
			<h6>{{ $messages.fieldLabelLTCPackage() }}</h6>
			<div class="card-body">
				{{ $messages.fieldLabelOverall() }}<div class="card-body--number">{{formattedOverallLTC}}</div>
                {{ $messages.fieldPurchasedToday() }}<div class="card-body--number">{{formattedPurchaseTodayLTC}}</div>
                {{ $messages.fieldLabelUserBalance() }}<div class="card-body--number">{{formattedLTCBalance}}</div>
			</div>
		</div> -->
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
						<general-listing :records="formattedRecords" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card-body-grid">
		<div class="card">
			<h6>{{$messages.fieldLabelStatisticsTodayRegistered()}}</h6>
			<div class="card-body">
				<div class="card-body--number">{{formattedTodayRegister}}</div>
			</div>
		</div>
		<div class="card">
			<h6>{{$messages.fieldLabelStatisticsYesterdayRegistered()}}</h6>
			<div class="card-body">
				<div class="card-body--number">{{formattedYesterdayRegister}}
				</div>
			</div>
		</div>
		<div class="card">
			<h6>{{$messages.fieldLabelStatisticsThisMonthRegistered()}}</h6>
			<div class="card-body">
				<div class="card-body--number">{{formattedThisMonthRegister}}</div>
			</div>
		</div>
		<div class="card">
			<h6>{{$messages.fieldLabelStatisticsCurrentActiveUser()}}</h6>
			<div class="card-body">
				<div class="card-body--number">{{formattedCurrentActiveUser}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GeneralListing from "./@components/GeneralListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
export default {
	name: "",
	components: { GeneralListing },
	data: () => ({
		records: {},
		generalSub: [],
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
				await this.$service.statisticService.getGeneralAll();
			if (error) {
				this.showError(error);
			} else {
				this.records = result.content;
				this.generalSub = result.content.generalList;
			}
		},
	},
};
</script>
<style lang="scss" >
.card-body-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
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