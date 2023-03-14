<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{$messages.labelDeposit()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.labelWithdraw()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelExchange()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelGiftCard()}} ({{currency}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelDailyProfit()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelDailyBonus()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelReferralBonus()}}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<general-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>

</template>

<script>
import GeneralListingRow from "./GeneralListingRow";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "LanguageListing",
	mixins: [],
	components: { GeneralListingRow },
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
