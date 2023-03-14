<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center clickable" @click="goToView()">{{ record.account }}</td>
	<td class="cave-table-row--center"><b>Personal</b><br>{{ record.deposit }} <br><b>Team</b><br> {{ record.teamDeposit }}</td>
	<td class="cave-table-row--center"><b>Personal</b><br>{{ record.withdraw }}<br><b>Team</b><br> {{ record.teamWithdraw }}</td>
	<td class="cave-table-row--center">{{ record.rebate }}</td>
	<td class="cave-table-row--center">{{ record.commission }}</td>
</template>
<style scoped>
    .clickable {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
</style>
<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "RankingListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({}),
	computed: {},
	async created() {},
	methods: {
		formatted6DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
		goToView() {
			if (this.record.currentTier < 3) {
				this.$router.push({
					name: "MyTeamSummaryPage",
					params: {
						selfUtId: this.record.parentUtId,
						utId: this.record.utId,
					},
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
