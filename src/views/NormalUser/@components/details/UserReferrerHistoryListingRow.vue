<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.username }}</td>
	<td class="cave-table-row--center">{{ formattedFullname }}</td>
	<td class="cave-table-row--center">{{ record.referrerCode }}</td>
	<td class="cave-table-row--center">{{ record.btcPackage }}</td>
    <td class="cave-table-row--center">{{ record.ethPackage }}</td>
    <td class="cave-table-row--center">{{ record.ltcPackage }}</td>
    <td class="cave-table-row--center">{{ record.etcPackage }}</td>
	<td class="cave-table-row--center">{{ record.registeredOn }}</td>
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
			return this.record.status != null
				? STATUS_CLASS[this.record.status]
				: "";
		},
		formattedStatusName() {
			return this.record.status != null
				? STATUS[this.record.status]
				: "-";
		},
        formattedFullname(){
            return this.record.fullName ? this.record.fullName : "-";
        }
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
