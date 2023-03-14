<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.account }}</td>
    <td class="cave-table-row--center">{{ formatted6DC(record.teamDeposit) }}</td>
    <td class="cave-table-row--center">{{ formatted6DC(record.teamWithdraw) }}</td>
    <td class="cave-table-row--center">{{ record.teamMemberPax }}</td>
    <td class="" style="text-align: left"><b>{{ $messages.fieldLabelDepositAmount() }}:</b><br>{{ record.depositAmount_l1 }} <br><br><b>{{ $messages.fieldLabelNumberOfDeposit() }}:</b><br>{{ record.numberOfDeposit_l1 }}</td>
    <td class="" style="text-align: left"><b>{{ $messages.fieldLabelDepositAmount() }}:</b><br>{{ record.depositAmount_l2 }} <br><br><b>{{ $messages.fieldLabelNumberOfDeposit() }}:</b><br>{{ record.numberOfDeposit_l2 }}</td>
    <td class="" style="text-align: left"><b>{{ $messages.fieldLabelDepositAmount() }}:</b><br>{{ record.depositAmount_l3 }} <br><br><b>{{ $messages.fieldLabelNumberOfDeposit() }}:</b><br>{{ record.numberOfDeposit_l3 }}</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToView()">{{ $messages.labelViewDetails() }}</a>
			</div>
		</div>
	</td>
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
			return nums.toFixed(2);
		},
        goToView() {
            this.$router.push({
				name: "MyTeamSummaryPage",
				params: { selfUtId: this.record.utId, utId: 0 },
			});
        }
    },
};
</script>

<style lang="scss" scoped></style>
