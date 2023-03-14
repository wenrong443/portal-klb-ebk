<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCode() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelAmount() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelDistribute() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelClaimedQuantity() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelValid() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right" v-if="$claims.canEditPromoCode">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<promo-code-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
					:rowPerPage="rowPerPage" />
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
import PromoCodeListingRow from "./PromoCodeListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "SlideshowListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { PromoCodeListingRow },
	props: {},
	data: () => ({}),
	async created() {
		await this.getAll();
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
			const [error, result] = await this.$service.promoCodeService.getAll(
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
