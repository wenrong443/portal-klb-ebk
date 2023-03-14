<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelRankingModeTitle() }}</span>
		<span class="paper-table--header">{{ $messages.labelRankingModeMode() }}</span>
		<span class="paper-table--header">{{ $messages.labelRankingModeStartDate() }}</span>
		<span class="paper-table--header">{{ $messages.labelRankingModeEndDate() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<ranking-listing-row :record="record" @refresh="getAll()" :currentIndex="index"
					:currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
</template>

<script>
import RankingListingRow from "./RankingListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";
export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { RankingListingRow },
	props: {
		sortBy: { type: String, required: false },
		sortDirection: { type: String, required: false },
	},
	data: () => ({
		currency: json.currency,
	}),
	async created() {
		this.setLoading();
		await this.getAll();
		this.setCompleted();
	},
	computed: {
		filterCriteria() {
			return {
				pageNumber: this.currentPage,
				rowPerPage: this.rowPerPage,
				sort: {
					sortBy: this.sortBy,
					sortDirection: this.sortDirection,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.rankingModeService.getAll(
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
