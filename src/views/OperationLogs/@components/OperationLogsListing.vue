<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelDescription() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelOperateBy() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelOperateOn() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<operation-logs-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import OperationLogsListingRow from "./OperationLogsListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { OperationLogsListingRow },
	props: {
        username: { type: String },
		start: { type: String },
		end: { type: String },
		utId: { type: Number },
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
                username: this.username,
				start: this.start,
				end: this.end,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.operationService.getAll(
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
