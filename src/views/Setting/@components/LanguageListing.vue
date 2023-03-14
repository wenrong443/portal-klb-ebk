<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCode() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelPriority() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelUserRemarks() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelUpdatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
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
			] = await this.$service.settingService.getAllLanguageIncludeNotActive();
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
