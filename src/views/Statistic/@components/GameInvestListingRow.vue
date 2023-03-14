<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.date }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.purchasedAmount) }}</td>
	<td class="cave-table-row--center">{{ formattedWithdraw }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.balance) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.totalDistribute) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.pendingDistribute) }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	computed: {
		formattedWithdraw() {
			return this.record
				? this.formatted2DC(
						this.record.purchasedReferReward +
							this.record.interestAmount +
							this.record.referInterestAmount
				  )
				: "-";
		},
	},
	methods: {
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
};
</script>

<style lang="scss" scoped></style>
