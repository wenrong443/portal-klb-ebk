<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header" v-for="(record) in records" v-bind:key="record.levelName">
			{{record.levelName}}
        </span>
	
<div class="paper-table-body">
			<div class="paper-table-rows">
		<general-membership-listing-row :records="records" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>

	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>

</template>

<script>
import GeneralMembershipListingRow from "./GeneralMembershipListingRow";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "LanguageListing",
	mixins: [],
	components: { GeneralMembershipListingRow },
	props: {
		records: { type: Array, default: [] },
	},
	data: () => ({
		currency: json.currency,
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
