<template>
	<div class="overflow-auto">
		<div class="paper-table table table-striped table-bordered">
			<span class="paper-table--header">#</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelDescription() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelRepeatType() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelRewardType() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelAddInfo() }}</span>
			<span
				class="paper-table--header">{{ $messages.fieldLabelCreatedBy() }}</span>
			<span
				class="paper-table--header">{{ $messages.labelStatus() }}</span>
			<span
				class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
			<div class="paper-table-body">
				<div class="paper-table-rows" v-for="(record, index) in records"
					v-bind:key="record.id">
					<mission-listing-row :record="record" @refresh="getAll()"
						:selectedLanguage="selectedLanguage"
						:currentIndex="index" :currentPage="currentPage"
						:rowPerPage="rowPerPage" />
				</div>
			</div>
		</div>
	</div>

	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
</template>

<script>
import MissionListingRow from "./MissionListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import { mixin as RecordMixin } from "../Mission";

export default {
	name: "MissionListing",
	mixins: [pageBehaviour, RecordMixin, listingBehaviour],
	components: { MissionListingRow },
	props: {},
	data: () => ({
		results: [],
		selectedLanguage: 1,
	}),
	async created() {
		this.setLoading();
		await this.getLanguageOptions();
		await this.getAll();
		this.setCompleted();
	},
	computed: {
		filterCriteria() {
			return {
				pageNumber: this.currentPage,
				rowPerPage: this.rowPerPage,
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.missionService.getAll(
				this.filterCriteria
			);
			if (error) {
				this.showError(error);
			} else {
				this.totalPage = result.paginationInfo.totalPages;
				this.records = result.content;
			}
		},
	},
	watch: {
		filterCriteria() {
			if (this.filterCriteria !== null) {
				this.getAll();
			}
		},
	},
};
</script>
