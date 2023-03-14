<template>
		<td v-for="(record) in records" v-bind:key="record.levelName" class="cave-table-row--center">{{ record.total }}</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";
export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		records: { type: Object, required: true },
	},
	data: () => ({}),
	computed: {},
	methods: {},
};
</script>
