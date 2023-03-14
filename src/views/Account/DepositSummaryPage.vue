<template>
	<div class="row">
		<div class="col-md-12">
			<deposit-filter @search="search"></deposit-filter>
			<div class="card">
				<div class="card-body">
					<account-listing :records="records" :currentPage="currentPage" :cdrtCmbtId="cdrtCmbtId"
						:cdrtStatus="cdrtStatus" :cdrtUtUsername="cdrtUtUsername"
						:createdDatetimeEnd="createdDatetimeEnd" :createdDatetimeStart="createdDatetimeStart"
						:sortBy="sortBy" :sortDirection="sortDirection" ref="accountListingRef">
					</account-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AccountListing from "./@components/AccountListing";
import { mixin as RecordMixin } from "./Account";
import DepositFilter from "./@components/DepositFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { AccountListing, DepositFilter },
	mixins: [RecordMixin, pageBehaviour],
	data: () => ({
		cdrtCmbtId: -99,
		cdrtStatus: 0,
		cdrtUtUsername: "",
		createdDatetimeEnd: "",
		createdDatetimeStart: "",
		sortBy: "cdrtId",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		search(filter) {
			this.cdrtCmbtId = filter.cdrtCmbtId;
			this.cdrtStatus = filter.cdrtStatus;
			this.cdrtUtUsername = filter.cdrtUtUsername;
			this.createdDatetimeEnd = filter.createdDatetimeEnd;
			this.createdDatetimeStart = filter.createdDatetimeStart;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
            
			if (filter.isReset) {
				this.$refs.accountListingRef.getAll();
			}
		},
	},
};
</script>

<style>
</style>