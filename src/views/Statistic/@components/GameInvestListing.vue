<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{$messages.labelDate()}} </span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsPurchaseAmount()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.labelWithdraw()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.labelBalance()}}  ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsTotalDistribute()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsPendingDistribute()}} ({{currency}})</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<game-invest-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
					:rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
</template>

<script>
import GameInvestListingRow from "./GameInvestListingRow";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import { formatDate } from "seedwork/dateFormatter";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "LanguageListing",
	mixins: [listingBehaviour],
	components: { GameInvestListingRow },
	props: {
		fromDate: { type: String },
		toDate: { type: String },
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
				fromDate: formatDate(this.fromDate),
				toDate: formatDate(this.toDate),
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.statisticService.getAllGameInvest(
					this.filterCriteria
				);
			if (error) {
			} else {
				this.records = result.content;
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
