<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
        <span class="paper-table--header">{{$messages.fieldLabelIPAddress()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelTotalClaimed()}}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<burce-force-i-p-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>

</template>

<script>
import BurceForceIPListingRow from "./BurceForceIPListingRow";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "LanguageListing",
	mixins: [],
	components: { BurceForceIPListingRow },
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
