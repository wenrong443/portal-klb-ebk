<template>
	<div class="row">
		<div class="col-md-12">
			<collect-money-bank-filter @search="search"></collect-money-bank-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditTopupWallet">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<collect-money-bank-listing :currentPage="currentPage" :cmbtAccountName="cmbtAccountName" :cmbtAccountNo="cmbtAccountNo"
						:cmbtBankName="cmbtBankName" :cmbtStatus="cmbtStatus" :sortBy="sortBy" :sortDirection="sortDirection" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CollectMoneyBankListing from "./@components/CollectMoneyBankListing";
import CollectMoneyBankFilter from "./@components/CollectMoneyBankFilter";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { CollectMoneyBankListing, CollectMoneyBankFilter },
	mixins: [pageBehaviour],
	data: () => ({
		cmbtAccountName: "",
		cmbtAccountNo: "",
		cmbtBankName: "",
		cmbtStatus: -99,
		cmbtType: "",
		sortBy: "cmbtId",
		sortDirection: "ASC",
	}),
	async created() {},
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "CollectMoneyBankAddPage" });
		},
		search(filter) {
			this.cmbtAccountName = filter.cmbtAccountName;
			this.cmbtAccountNo = filter.cmbtAccountNo;
			this.cmbtBankName = filter.cmbtBankName;
			this.cmbtStatus = filter.cmbtStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>
