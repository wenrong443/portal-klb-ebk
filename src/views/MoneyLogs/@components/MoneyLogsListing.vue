<template>
	<div class="row">
		<div class="col-4">
			<b>{{ $messages.fieldLabelTotalAmount() }} (+) ($)</b> {{ formatted2DCIn }}
		</div>
		<div class="col-4">
			<b>{{ $messages.fieldLabelTotalAmount() }} (-) ($)</b> {{ formatted2DCOut }}
		</div>
	</div>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCurrency() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelIn() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelOut() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<money-logs-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
					:rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
</template>

<script>
import MoneyLogsListingRow from "./MoneyLogsListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { MoneyLogsListingRow },
	props: {
		mfrtUtUsername: { type: String },
		moneyType: { type: String },
		start: { type: String },
		end: { type: String },
		utId: { type: Number },
	},
	data: () => ({
		totalIn: 0.0,
		totalOut: 0.0,
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		formatted2DCIn() {
			let nums = (parseFloat(this.totalIn) / 100) * 100.0;
			return nums.toFixed(2);
		},
		formatted2DCOut() {
			let nums = (parseFloat(this.totalOut) / 100) * 100.0;
			return nums.toFixed(2);
		},
		filterCriteria() {
			return {
				mfrtUtUsername: this.mfrtUtUsername,
				type: this.moneyType,
				start: this.start,
				end: this.end,
				utId: this.utId,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.moneyLogsService.getAll(
				this.filterCriteria
			);
			if (error) {
			} else {
				this.totalIn = result.content2.totalIn;
				this.totalOut = result.content2.totalOut;
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
