<template>
	<td>{{ rowIndex }}</td>

	<td class="cave-table-row--center">{{ record.ipAddress }}</td>
	<td class="cave-table-row--center">{{ record.total }}</td>
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
