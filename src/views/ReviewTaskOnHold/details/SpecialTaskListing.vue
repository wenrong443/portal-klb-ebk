<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelAnnouncementTitle() }}</span>
        <span class="paper-table--header" v-if="isV2">{{ $messages.fieldLabelDisplayQuantity() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelPrice() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelRound() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<special-task-listing-row :userId="userId" :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import SpecialTaskListingRow from "./SpecialTaskListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "SpecialTaskListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { SpecialTaskListingRow },
	props: {
		userId: { type: Object, require: true },
		start: { type: Number },
		end: { type: Number },
		type: { type: Number },
	},
	data: () => ({
        isV2: process.env.IS_V2 == "true" ? true : false,
    }),
	async created() {
		this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				start: this.start,
				end: this.end,
                type: this.type,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.reviewService.getAllSpcialTaskList(
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
