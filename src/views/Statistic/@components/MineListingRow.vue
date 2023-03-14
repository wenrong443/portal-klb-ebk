<template>
	<td>{{ rowIndex }}</td>

	<td class="cave-table-row--center">{{ record.packageName }}</td>
	<td class="cave-table-row--center">{{ record.today }}</td>
	<td class="cave-table-row--center">{{ record.yesterday }}</td>
	<td class="cave-table-row--center">{{ record.currentWeek }}</td>
	<td class="cave-table-row--center">{{ record.currentMonth }}</td>
	<td class="cave-table-row--center">{{ record.overall }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";
export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	data: () => ({}),
	computed: {
		
	},
	methods: {
		
	},
};
</script>
