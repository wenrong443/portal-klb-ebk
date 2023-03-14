<template>
	<div class="row">
		<div class="col-md-12">
			<bank-filter @search="search"></bank-filter>

			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<bank-listing :records="records" @refresh="getAll()" :currentPage="currentPage" :ubtStatus="ubtStatus" :ubtSwift="ubtSwift"
						:ubtType="ubtType" :sortBy="sortBy" :sortDirection="sortDirection"></bank-listing>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import BankListing from "./@components/BankListing";
import BankFilter from "./@components/BankFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { BankListing, BankFilter },
	mixins: [pageBehaviour],
	data: () => ({
		ubtStatus: -99,
		ubtSwift: "",
		ubtType: "",
		sortBy: "ubtId",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "BankAddPage" });
		},
		search(filter) {
			this.ubtSwift = filter.ubtSwift;
			this.ubtStatus = filter.ubtStatus;
			this.ubtType = filter.ubtType;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>