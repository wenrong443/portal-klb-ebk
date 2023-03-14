<template>
	<div class="row">
		<div class="col-md-12">
			<investment-fund-filter @search="search" />
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<investment-fund-listing :giptPayoutMode="giptPayoutMode" :giptStatus="giptStatus" :sortBy="sortBy"
						:sortDirection="sortDirection" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InvestmentFundListing from "./@components/InvestmentFundListing.vue";
import InvestmentFundFilter from "./@components/InvestmentFundFilter.vue";

export default {
	name: "",
	components: { InvestmentFundListing, InvestmentFundFilter },
	data: () => ({
		giptPayoutMode: "",
		giptStatus: -99,
		sortBy: "giptPayoutMode",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "InvestmentFundAddPage" });
		},
		search(filter) {
			this.giptPayoutMode = filter.giptPayoutMode;
			this.giptStatus = filter.giptStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>