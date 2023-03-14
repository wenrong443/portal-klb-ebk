<template>
	<div class="row">
		<div class="col-md-12">
			<!-- <ranking-filter @search="search"></ranking-filter> -->
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<ranking-listing @refresh="getAll()"
						:currentPage="currentPage" :drdtType="drdtType"
						:drdtMobileNumber="drdtMobileNumber"
						:drdtStatus="drdtStatus" :sortBy="sortBy"
						:sortDirection="sortDirection"></ranking-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RankingListing from "./@components/RankingListing";
import RankingFilter from "./@components/RankingFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { RankingListing, RankingFilter },
	mixins: [pageBehaviour],
	data: () => ({
		drdtMobileNumber: "",
		drdtStatus: -99,
		drdtType: "",
		sortBy: "drdtId",
		sortDirection: "ASC",
	}),
	async created() {},
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "RankingModeAddPage" });
		},
		search(filter) {
			this.drdtMobileNumber = filter.drdtMobileNumber;
			this.drdtType = filter.drdtType;
			this.drdtStatus = filter.drdtStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>