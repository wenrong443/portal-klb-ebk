<template>
	<td>{{ rowIndex }}</td>
	 <td class="">{{ record.gmehtGmptShortCode }}</td>
    <td class="">{{ formatted6DC(record.gmehtAmount) }}</td>
    <td class="">{{ formatted6DC(record.gmehtExchangeRate) }}</td>
    <td class="">{{ formatted6DC(record.gmehtAmountUsdt) }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
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
	methods: {
        formatted6DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(12);
		},
    },
};
</script>

<style lang="scss" scoped></style>
