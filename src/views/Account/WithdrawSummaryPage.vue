<template>
	<div class="row">
		<div class="col-md-12">
			<withdraw-filter @search="search"></withdraw-filter>
			<div class="card">
				<div class="card-body">
					<withdraw-listing :records="records" :currentPage="currentPage" :cwrtUbtId="cwrtUbtId"
						:cwrtStatus="cwrtStatus" :roc="roc" :cwrtUtLevelId="cwrtUtLevelId" :cwrtUtUsername="cwrtUtUsername"
						:createdDatetimeEnd="createdDatetimeEnd" :createdDatetimeStart="createdDatetimeStart"
						:sortBy="sortBy" :sortDirection="sortDirection" ref="withdrawListing">
					</withdraw-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import WithdrawListing from "./@components/WithdrawListing";
import { mixin as RecordMixin } from "./Account";
import WithdrawFilter from "./@components/WithdrawFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { WithdrawListing, WithdrawFilter },
	mixins: [RecordMixin, pageBehaviour],
	data: () => ({
        roc: -99,
		cwrtStatus: 0,
		cwrtUbtId: -99,
		cwrtUtLevelId: -99,
		cwrtUtUsername: "",
		createdDatetimeEnd: "",
		createdDatetimeStart: "",
		sortBy: "cwrtId",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		search(filter) {
			this.cwrtStatus = filter.cwrtStatus;
            this.roc = filter.roc;
			this.cwrtUbtId = filter.cwrtUbtId;
			this.cwrtUtLevelId = filter.cwrtUtLevelId;
			this.cwrtUtUsername = filter.cwrtUtUsername;
			this.createdDatetimeEnd = filter.createdDatetimeEnd;
			this.createdDatetimeStart = filter.createdDatetimeStart;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
			if (filter.isReset) {
				this.$refs.withdrawListing.getAll();
			}
		},
	},
};
</script>

<style>
</style>