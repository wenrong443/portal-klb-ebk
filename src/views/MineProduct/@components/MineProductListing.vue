<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
        <span class="paper-table--header">{{ $messages.fieldLabelShortCode() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
        <!-- <span class="paper-table--header">{{ $messages.fieldLabelCanSubscribeMultiple() }}</span> -->
		<span class="paper-table--header">{{ $messages.fieldLabelMinExchange() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelMaxAmount() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right" v-if="$claims.canEditMineProduct">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in formattedRecords" v-bind:key="record.id">
				<mine-product-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage"
					@refresh="getAll" />
			</div>
		</div>
	</div>
	<div v-if=" hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div>
</template>

<script>
import MineProductListingRow from "./MineProductListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { MineProductListingRow },
	props: {
		gmptShortCode: { type: String },
		gmptStatus: { type: Number },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({
		currency: json.currency,
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				gmptShortCode: this.gmptShortCode,
				gmptStatus: this.gmptStatus,
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
		formattedRecords() {
			if (this.records.length <= 0) return [];
			const items = [];
			this.records.map((d) => {
				const title = JSON.parse(d.gmptDisplayTitle);
				title.forEach((i) => {
					const obj = {
						language: i.ltId,
						title: i.value,
						...d,
					};
					items.push(obj);
				});
			});

			return items.filter((d) => d.language == 1);
		},
	},
	methods: {
		async getAll() {
			const [error, result] = await this.$service.mineProductService.getAll(
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
