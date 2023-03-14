<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCategory() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelLanguage() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<announcement-listing-row :record="record" @refresh="getAll()" :currentIndex="index"
					:currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div>
</template>

<script>
import AnnouncementListingRow from "./AnnouncementListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { AnnouncementListingRow },
	props: {
		atActId: { type: Number },
		atLtId: { type: Number },
		atStatus: { type: Number },
		atTitle: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({}),
	async created() {
		if (window.localStorage) {
			if (!localStorage.getItem("firstLoad")) {
				localStorage["firstLoad"] = true;
				window.location.reload();
			} else {
				localStorage.removeItem("firstLoad");
				if (localStorage.getItem("token")) {
					await this.getAll();
				}
				this.setCompleted();
			}
		}
	},
	computed: {
		filterCriteria() {
			return {
				atActId: this.atActId,
				atDisplayType: -99,
				atLtId: this.atLtId,
				atStatus: this.atStatus,
				atTitle: this.atTitle,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
				sort: {
					sortBy: this.sortBy,
					sortDirection: this.sortDirection,
				},
			};
		},
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.announcementService.getAdminAll(
					this.filterCriteria
				);
			if (error) {
			} else {
				this.records = result.content;
				this.totalPage = result.paginationInfo.totalPages;
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

<style lang="scss" scoped></style>
