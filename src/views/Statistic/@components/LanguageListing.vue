<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">Name</span>
		<span class="paper-table--header">Code</span>
		<span class="paper-table--header">Priority</span>
		<span class="paper-table--header">Remarks</span>
		<span class="paper-table--header">Created At</span>
		<span class="paper-table--header">Updated At</span>
		<span class="paper-table--header">Status</span>
		<span class="paper-table--header disabled-sorting text-right">Actions</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<language-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
					:rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<!-- <div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div> -->
</template>

<script>
import LanguageListingRow from "./LanguageListingRow";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "LanguageListing",
	mixins: [listingBehaviour],
	components: { LanguageListingRow },
	props: {},
	data: () => ({}),
	async created() {
		await this.getAll();
	},
	computed: {},
	methods: {
		async getAll() {
			const [
				error,
				result,
			] = await this.$service.settingService.getAllLanguage();
			if (error) {
			} else {
				this.records = result.content;
				// this.totalPage = result.paginationInfo.totalPages;
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
