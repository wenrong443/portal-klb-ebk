<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.mfrtUtUsername }}</td>
	<td class="cave-table-row--center">{{ formattedType }}</td>
    <td class="cave-table-row--center">{{ record.currency }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.mfrtAmount) }}</td>
    <td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedIsDepositWalletClass">
			{{ formattedIsDepositWallet }}
		</span>
	</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedIsRealMoneyClass">
			{{ formattedIsRealMoney }}
		</span>
	</td>
	<td class="cave-table-row--center">{{ formattedRemarks }}</td>
	<td class="cave-table-row--center">{{ record.mfrtProceesedByUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};
const STATUS = {
	1: "active",
	0: "deactivated",
};
const IS_REAL_MONEY_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "ManualFundListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
		IS_REAL_MONEY: {},
        TYPE: {},
	}),
	computed: {
		formattedUserBank() {
			return this.record.userBanks[0].value;
		},
		formattedMembership() {
			return this.record.memberships[0].value;
		},
		formattedStatusClass() {
			return this.record.mfrtStatus != null
				? STATUS_CLASS[this.record.mfrtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.mfrtStatus != null
				? STATUS[this.record.mfrtStatus]
				: "-";
		},
		formattedIsRealMoneyClass() {
			return this.record.mfrtIsRealMoneyTransaction != null
				? IS_REAL_MONEY_CLASS[this.record.mfrtIsRealMoneyTransaction]
				: "";
		},
		formattedIsRealMoney() {
			return this.record.mfrtIsRealMoneyTransaction != null
				? this.IS_REAL_MONEY[this.record.mfrtIsRealMoneyTransaction]
				: "-";
		},
        formattedIsDepositWalletClass() {
			return this.record.depositWallet != null
				? IS_REAL_MONEY_CLASS[this.record.depositWallet]
				: "";
		},
		formattedIsDepositWallet() {
			return this.record.depositWallet != null
				? this.IS_REAL_MONEY[this.record.depositWallet]
				: "-";
		},
		formattedRemarks() {
			return this.record.mfrtRemarks ? this.record.mfrtRemarks : "-";
		},
        formattedType() {
			return this.record.mfrtType != null
				? this.TYPE[this.record.mfrtType]
				: "-";
		},
	},
	async created() {
		this.IS_REAL_MONEY = {
			1: this.$messages.fieldLabelYes(),
			0: this.$messages.fieldLabelNo(),
		};
        this.TYPE = {
			'IN': this.$messages.fieldLabelIn(),
			'OUT': this.$messages.fieldLabelOut(),
		};
	},
	methods: {
		goToView() {
			this.$router.push({
				name: "AccountWithdrawDetailPage",
				params: { recordId: this.record.cwrtId },
			});
		},
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
};
</script>

<style lang="scss" scoped></style>
