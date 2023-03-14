<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
        <span class="paper-table--header">{{ $messages.fieldLabelProduct() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelRewardPerDay() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelValidity() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelPrice() }} ({{currency}})</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelConditionalPackage() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right" v-if="$claims.canEditMinePackage">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in formattedRecords" v-bind:key="record.id">
				<mine-package-listing-row :record="record" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage"
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
import MinePackageListingRow from "./MinePackageListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { MinePackageListingRow },
	props: {
		gmpaatGmptId: { type: String },
		gmpaatStatus: { type: Number },
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
				gmpaatGmptId: this.gmpaatGmptId,
				gmpaatStatus: this.gmpaatStatus,
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
            const items2 = [];
			this.records.map((d) => {
				const title = JSON.parse(d.gmpaatDisplayTitle);
                const title2 = JSON.parse(d.gmpaatGmptDisplayTitle);
				title.forEach((i, index) => {
					const obj = {
						language: i.ltId,
						packageTitle: i.value,
                        productTitle: title2[index].value,
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
			const [error, result] = await this.$service.minePackageService.getAll(
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
