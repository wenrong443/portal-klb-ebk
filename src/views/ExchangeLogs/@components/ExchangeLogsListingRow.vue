<template>
	<td>{{ rowIndex }}</td>
	<td class="">{{ record.gmehtUtUsername }}</td>
    <td class="">{{ record.gmehtGmptShortCode }}</td>
    <td class="">{{ formatted6DC(record.gmehtAmount) }}</td>
    <td class="">{{ formatted6DC(record.gmehtExchangeRate) }}</td>
    <td class="">{{ formatted6DC(record.gmehtAmountUsdt) }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "RankingListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({}),
	computed: {
		
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
