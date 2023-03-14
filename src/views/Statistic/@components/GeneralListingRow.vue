<template>
	<td>{{ formattedType }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.depositAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.withdrawAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.sstExchangeAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.sstGiftCardAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.sstDailyProfitAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.sstDailyBonusAmount) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.sstReferralBonusAmount) }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";
export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	data: () => ({}),
	computed: {
		formattedType() {
			switch (this.record.type) {
				case "TODAY":
					return this.$messages.fieldLabelStatisticsToday();
				case "YESTERDAY":
					return this.$messages.fieldLabelStatisticsYesterday();
				case "CURRENT WEEK":
					return this.$messages.fieldLabelStatisticsCurrentWeek();
				case "CURRENT MONTH":
					return this.$messages.fieldLabelStatisticsCurrentMonth();
				case "OVERALL":
					return this.$messages.fieldLabelStatisticsOverall();
			}
			return this.record.type;
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
