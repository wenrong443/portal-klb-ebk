<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelCurrency() }}</span>
		<span class="paper-table--header">{{ $messages.labelAmount() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelIsDepositWallet() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelIsRealMoney() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelUserRemarks() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelProcessedBy() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelProcessedAt() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<manual-fund-listing-row :record="record" @refresh="getAll()" :languageOptions="languageOptions"
					:currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>

</template>

<script>
import ManualFundListingRow from "./ManualFundListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import { createInstance, assign, mixin as RecordMixin } from "../Account";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "ReferrerListing",
	mixins: [pageBehaviour, RecordMixin, listingBehaviour],
	components: { ManualFundListingRow },
	props: {
		mfrtType: { type: String },
		mfrtUtUsername: { type: String },
		mfrtIsRealMoneyTransaction: { type: Number },
		createdDatetimeEnd: { type: String },
		createdDatetimeStart: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
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
				mfrtType: this.mfrtType,
				mfrtUtUsername: this.mfrtUtUsername,
				mfrtIsRealMoneyTransaction: this.mfrtIsRealMoneyTransaction,
				createdDatetimeEnd: this.createdDatetimeEnd,
				createdDatetimeStart: this.createdDatetimeStart,
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
			const [error, result] =
				await this.$service.accountService.getManualFundAll(
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
