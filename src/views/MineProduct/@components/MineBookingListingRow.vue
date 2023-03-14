<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.gmbtUtUsername }}</td>
	<td class="cave-table-row--center">{{ formattedPurchaseTypeName }}</td>
    <td class="cave-table-row--center">{{ record.gmbtGmptShortCode }}</td>
    <td class="cave-table-row--center">{{ record.title }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.gmbtGmpaatPackagePrice) }}</td>
    <td class="cave-table-row--center">{{ formatted2DC(record.gmbtAmountPaid) }}</td>
	<td class="cave-table-row--center">{{ record.gmbtCurrentPeriod }}</td>
	<td class="cave-table-row--center">{{ record.gmbtTotalPeriod }}</td>
	<td class="cave-table-row--center">{{ formatted6DC(record.gmbtTotalProfitTaken) }}</td>
    <td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

const STATUS_CLASS = {
	1: "badge-info",
	2: "badge-success",
	"-1": "badge-danger",
    "-2": "badge-warning",
}; 


export default {
	name: "AnnouncementListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
        STATUS: {},
        PURCHASE_TYPE: {}
    }),
	computed: {
		formattedStatusClass() {
			return this.record.gmbtStatus != null
				? STATUS_CLASS[this.record.gmbtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gmbtStatus != null
				? this.STATUS[this.record.gmbtStatus]
				: "-";
		},
        formattedPurchaseTypeName() {
			return this.record.gmbtPurchaseType != null
				? this.PURCHASE_TYPE[this.record.gmbtPurchaseType]
				: "-";
		},
		formattedGibtCancelledRefund() {
			return this.gibtCancelledRefund ? this.gibtCancelledRefund : "-";
		},
	},
    async created() {
        this.STATUS = {
            1: this.$messages.labelActive(),
            2: this.$messages.fieldLabelFullyDistributed(),
            "-1": this.$messages.fieldLabelCancelled(),
            "-2": this.$messages.fieldLabelCancelledDueToUpgrade()
        }
        this.PURCHASE_TYPE = {
            'NEW': this.$messages.fieldLabelNewPurchase(),
            'UPGRADE': this.$messages.fieldLabelUpgrade()
        }
    },
	methods: {
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
        formatted6DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(12);
		},
	},
};
</script>

<style lang="scss" scoped></style>
