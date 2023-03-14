<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
        <span class="paper-table--header">{{ $messages.fieldLabelNickname() }} / {{ $messages.fieldLabelBankName() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelNetworkType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelWalletAddress() }} / {{ $messages.fieldLabelAccountNo() }}</span>
		
		<span class="paper-table--header">{{ $messages.fieldLabelMinAmount() }} ({{ currency }})</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelExchangeRate() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right" v-if="$claims.canEditTopupWallet">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<collect-money-bank-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import CollectMoneyBankListingRow from "./CollectMoneyBankListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { CollectMoneyBankListingRow },
	props: {
		cmbtAccountName: { type: String },
		cmbtAccountNo: { type: String },
		cmbtBankName: { type: String },
		cmbtStatus: { type: Number },
		cmbtType: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({
        currency: json.currency
    }),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				cmbtAccountName: this.cmbtAccountName,
				cmbtAccountNo: this.cmbtAccountNo,
				cmbtBankName: this.cmbtBankName,
				cmbtStatus: this.cmbtStatus,
				cmbtType: this.cmbtType,
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
			const [
				error,
				result,
			] = await this.$service.bankService.getCollectMoneyBankAll(
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
