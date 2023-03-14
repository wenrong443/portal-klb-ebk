<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.gibtBookingId }}</td>
	<td class="cave-table-row--center">{{ record.projectName }}</td>
	<td class="cave-table-row--center">{{ record.gibtModalAmount }}</td>
    <td class="cave-table-row--center">{{ record.gibtTotalProfitTaken }}</td>
    <td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">{{ record.gibtLastPeriodOn }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-info",
	2: "badge-success",
	"-1": "badge-danger",
};

const STATUS = {
	1: "Active",
	2: "Fully Distributed",
	"-1": "Cancelled",
};
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "UserDepositHistoryListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({}),
	computed: {
		formattedStatusClass() {
			return this.record.gibtStatus != null
				? STATUS_CLASS[this.record.gibtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gibtStatus != null
				? STATUS[this.record.gibtStatus]
				: "-";
		},
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
