<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{$messages.labelDeposit()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.labelWithdraw()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsCommission2()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsTaskOngoing()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsTaskOnhold()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelStatisticsCheckInReward()}} ({{currency}})</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<general-review-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>

</template>

<script>
import GeneralReviewListingRow from "./GeneralReviewListingRow";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "LanguageListing",
	mixins: [],
	components: { GeneralReviewListingRow },
	props: {
		records: { type: Array, default: [] },
	},
	data: () => ({
        currency: json.currency
    }),
	async created() {},
	computed: {
		hasRecords() {
			return this.records.length <= 0;
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
