<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.gibtUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.title }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.gibtModalAmount) }}</td>
	<td class="cave-table-row--center">{{ record.gibtCurrentPeriod }}</td>
	<td class="cave-table-row--center">{{ record.gibtTotalPeriod }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.gibtTotalProfitTaken) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.gibtCancelledRefund) }}</td>
	<td class="cave-table-row--center">{{ formattedGibtCancelledRefund }}</td>
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
}; 


export default {
	name: "AnnouncementListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
        STATUS: {}
    }),
	computed: {
		formattedStatusClass() {
			return this.record.gibtStatus != null
				? STATUS_CLASS[this.record.gibtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gibtStatus != null
				? this.STATUS[this.record.gibtStatus]
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
        }
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
