<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelAnnouncementTitle() }}</span>
        <span class="paper-table--header" v-if="isV2">{{ $messages.fieldLabelDisplayQuantity() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelPrice() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelClaimedQuantity() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelTotalIssuing() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelPriority() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<review-task-listing-row :record="record" @refresh="getAll()" :currentIndex="index"
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
import ReviewTaskListingRow from "./ReviewTaskListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "ReviewTaskListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { ReviewTaskListingRow },
	props: {
		grtStatus: { type: Number },
		grtType: { type: Number },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({
		currency: json.currency,
        isV2: process.env.IS_V2 == "true" ? true : false
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				grtType: this.grtType,
				grtStatus: this.grtStatus,
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
			const [error, result] = await this.$service.reviewService.getAllTask(
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
