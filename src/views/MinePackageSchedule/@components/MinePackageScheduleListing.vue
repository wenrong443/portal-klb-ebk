<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
        <span class="paper-table--header">{{ $messages.fieldLabelPackage() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelRankingModeStartDate() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelRankingModeEndDate() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right" v-if="$claims.canEditMinePackageSchedule">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<mine-package-schedule-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage"
					@refresh="getAll" />
			</div>
		</div>
	</div>
	<div v-if=" hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div>
</template>

<script>
import MinePackageScheduleListingRow from "./MinePackageScheduleListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { MinePackageScheduleListingRow },
	props: {
		gmpstGmpaatId: { type: Number },
		gmpstStatus: { type: Number },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({
		currency: json.currency,
        records: []
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				gmpstGmpaatId: this.gmpstGmpaatId,
				gmpstStatus: this.gmpstStatus,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
				sort: {
					sortBy: this.sortBy,
					sortDirection: this.sortDirection,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.minePackageService.getAllSchedule(
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
