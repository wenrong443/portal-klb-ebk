<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelSwiftCode() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelNetworkType() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelType() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelCurrency() }}</span>
        <span class="paper-table--header">{{ $messages.fieldLabelExchangeRate() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<bank-listing-row :record="record" @refresh="getAll()" :languageOptions="languageOptions" :currentIndex="index"
					:currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
</template>

<script>
import BankListingRow from "./BankListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import { createInstance, assign, mixin as RecordMixin } from "../Bank";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "AnnouncementListing",
	mixins: [pageBehaviour, RecordMixin, listingBehaviour],
	components: { BankListingRow },
	props: {
		ubtStatus: { type: Number },
		ubtSwift: { type: String },
		ubtType: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				ubtSwift: this.ubtSwift,
				ubtStatus: this.ubtStatus,
				ubtType: this.ubtType,
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
             const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);

            this.languageOptions = languageOptions.content;
            
			const [error, result] = await this.$service.bankService.getAdminAll(
				this.filterCriteria
			);
			if (error) {
			} else {
				this.userBanks = result.content;
				const items = [];
				result.content.map((d) => {
					const userBanks = JSON.parse(d.ubtName);
					userBanks.forEach((i) => {
						var obj = {
							language: i.ltId,
							bankName: i.value,
							...d,
						};
						items.push(obj);
					});
				});
                // console.log(this.languageOptions)
				this.records = items.filter(
					(d) => d.language == this.languageOptions[0].ltId
				);
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
