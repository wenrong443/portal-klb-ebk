<template>
<div class="row">
		<div class="col-4">
			<b>{{ $messages.fieldLabelTotalAmount() }} ($)</b> {{ formatted2DC }}
		</div>
</div>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelProduct() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelExchangeAmount() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelExchangeRate() }}</span>
        <span class="paper-table--header">{{ $messages.labelAmount() }} ({{ currency }})</span>
		<span class="paper-table--header">{{ $messages.fieldLabelOperateOn() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<exchange-logs-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import ExchangeLogsListingRow from "./ExchangeLogsListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { ExchangeLogsListingRow },
	props: {
        username: { type: String },
		start: { type: String },
		end: { type: String },
		utId: { type: Number },
        gmptId: { type: Number },
	},
	data: () => ({
		currency: json.currency,
        totalAmount: 0
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
                username: this.username,
                gmptId: this.gmptId,
				start: this.start,
				end: this.end,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
        formatted2DC() {
			let nums = (parseFloat(this.totalAmount) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.mineProductService.getExchangeHistory(
				this.filterCriteria
			);
			if (error) {
			} else {
                this.totalAmount = result.content2;
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
