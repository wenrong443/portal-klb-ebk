<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelAnnouncementTitle() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCommision() }}</span>
        <span class="paper-table--header">{{ $messages.labelReviewRating() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
        <span class="paper-table--header">{{ $messages.labelApproveBy() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
        <span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<review-task-taken-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import ReviewTaskTakenListingRow from "./ReviewTaskTakenListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "ReiewTaskTakenListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { ReviewTaskTakenListingRow },
	props: {
		userId: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				grttStatus: -99,
				contactNumber: "",
                grttUtId: this.userId,

				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				}
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.reviewService.getAllTaskTaken(
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
