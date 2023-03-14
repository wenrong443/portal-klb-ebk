<template>
	<td>{{ rowIndex }}</td>
	<td class="">{{ record.pctCode }}</td>
    <td class="">{{ record.pcutUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.pcutAmount }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
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
		formattedDescription() {
			return this.record.aoltDescription
				? this.record.aoltDescription.replaceAll("\n", "<br>")
				: "-";
		},
	},
	async created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
