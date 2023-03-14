<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTeamDepositUSDT() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTeamWithdrawUSDT() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTeamMemberPAX() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTier() }} 1</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTier() }} 2</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTier() }} 3</span>
		<span class="paper-table--header">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<team-report-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
					:rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div>
</template>

<script>
import TeamReportListingRow from "./TeamReportListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { TeamReportListingRow },
	props: {
		utUsername: { type: String },
		startDate: { type: String },
		endDate: { type: String },
	},
	data: () => ({
		currency: json.currency,
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
                utUsername: this.utUsername,
				createdDatetimeStart: this.startDate,
				createdDatetimeEnd: this.endDate,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.userService.getTeamReport2(
				this.filterCriteria
			);
			if (error) {
			} else {
				this.records = result.content;
				this.totalPage = result.paginationInfo.totalPages;
			}
		},
	},
	watch: {
		filterCriteria() {
			if (this.filterCriteria !== null) {
				this.getAll();
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
