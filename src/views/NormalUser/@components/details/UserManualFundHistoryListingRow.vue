<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.mfrtType }}</td>
	<td class="cave-table-row--center">{{ record.mfrtAmount }}</td>
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
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

const STATUS = {
	1: "active",
	0: "suspend",
};
const IS_REAL_MONEY_CLASS = {
	1: "badge-success",
	0: "badge-info",
};
const IS_REAL_MONEY = {
	1: "Yes",
	0: "No",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "UserBindBankListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({}),
	computed: {
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
				? IS_REAL_MONEY[this.record.mfrtIsRealMoneyTransaction]
				: "-";
		},
        formattedIsDepositWalletClass() {
			return this.record.depositWallet != null
				? IS_REAL_MONEY_CLASS[this.record.depositWallet]
				: "";
		},
		formattedIsDepositWallet() {
			return this.record.depositWallet != null
				? IS_REAL_MONEY[this.record.depositWallet]
				: "-";
		},
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
