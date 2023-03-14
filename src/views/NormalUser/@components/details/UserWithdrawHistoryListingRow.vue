<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.cwrtOrderNo }}</td>
	<td class="cave-table-row--center" style="text-align: left">
        <small>{{ $messages.fieldLabelBankName() }}:</small>{{ record.bankName }} <br>
		<small>{{ $messages.fieldLabelAccountNo() }}:</small>{{ record.cwrtUbbtAccountNo }}<br>
        <span v-if="VITE_INDIA_BANK">
            <small>{{ $messages.labelBankAccountType() }}:</small>  {{ record.cwrtUbbtExAccType }}<br>
            <small>{{ $messages.labelBankBranch() }}:</small>  {{ record.cwrtUbbtExBranch }}<br>
            <small>{{ $messages.labelBankIfsc() }}:</small>  {{ record.cwrtUbbtExIfsc }}<br>
            <small>{{ $messages.labelBankHqIfsc() }}:</small>  {{ record.cwrtUbbtExHqIfsc }}
        </span>
    </td>
	<td class="cave-table-row--center">{{ record.cwrtAmount }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<!-- <span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span> -->

    <span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
		<br>
        <br>
		<small><b>{{ $messages.labelROC() }}</b></small>
        <br>
        <span class="badge badge-pill" v-bind:class="formattedROCClass">
			{{ formattedROCName }}
		</span>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
	"-1": "badge-danger",
};

const STATUS = {
	1: "Approved",
	0: "Pending",
	"-1": "Rejected",
};
import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "UserDepositHistoryListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
        VITE_INDIA_BANK: process.env.VITE_INDIA_BANK == "true" ? true : false,
    }),
	computed: {
		formattedStatusClass() {
			return this.record.cwrtStatus != null
				? STATUS_CLASS[this.record.cwrtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.cwrtStatus != null
				? STATUS[this.record.cwrtStatus]
				: "-";
		},
        formattedROCClass() {
			return this.record.cwrtStatus != null
				? this.record.roc == 1
					? "badge-danger"
					: "badge-info"
				: "";
		},
		formattedROCName() {
			return this.record.cwrtStatus != null
				? this.record.roc == 1
					? "Yes"
					: "No"
				: "-";
		},
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
