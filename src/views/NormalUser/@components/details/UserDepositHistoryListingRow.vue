<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.cdrtOrderNo }}</td>
    <td class="cave-table-row--center">
        {{ formattedRemarks }}
    </td>
	<td class="cave-table-row--center" style="text-align: left">
        {{ record.cdrtCmbtAccountName }} <br>
		{{ record.cdrtCmbtAccountNo }} 
    </td>
	<td class="cave-table-row--center">{{ record.cdrtAmount }}</td>
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
	data: () => ({}),
	computed: {
        formattedRemarks() {
			return this.record.cdrtRemarks ? this.record.cdrtRemarks : "-";
		},
		formattedStatusClass() {
			return this.record.cdrtStatus != null
				? STATUS_CLASS[this.record.cdrtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.cdrtStatus != null
				? STATUS[this.record.cdrtStatus]
				: "-";
		},
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
