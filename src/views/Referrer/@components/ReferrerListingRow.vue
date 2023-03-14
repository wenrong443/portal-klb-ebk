<template>
  <td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.crhtTargetUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.crhtFromUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.crhtToUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.crhtProcessedByUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.updatedDatetime }}</td>
	<td class="cave-table-row--center">{{ record.crhtRemarks }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{
      formattedStatusName
      }}
		</span>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};


import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "AnnouncementListingRow",
    mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
        STATUS: {}
    }),
	computed: {
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedStatusClass() {
			return this.record.crhtStatus != null
				? STATUS_CLASS[this.record.crhtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.crhtStatus != null
				? this.STATUS[this.record.crhtStatus]
				: "-";
		},
		formattedLanguage() {
			const language = this.languageOptions.find(
				(d) => d.ltId == this.record.language
			);
			return language ? language.ltName : "-";
		},
	},
	async created() {
        this.STATUS = {
			1: this.$messages.labelActive(),
			0: this.$messages.labelSuspend(),
		};
    },
	methods: {},
};
</script>

<style lang="scss" scoped></style>
