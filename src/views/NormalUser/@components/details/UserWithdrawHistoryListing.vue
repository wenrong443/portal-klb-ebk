<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelRefNo() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelBankInfo() }}</span>
		<span class="paper-table--header">{{ $messages.labelAmount() }} ({{ currency }})</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<user-withdraw-history-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import UserWithdrawHistoryListingRow from "./UserWithdrawHistoryListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../../infrastructure/json/config.json";

export default {
	name: "UserBindBankListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { UserWithdrawHistoryListingRow },
	props: {
		userId: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
        currency: json.currency
    }),
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
			const [error, result] =
				await this.$service.accountService.getWithdrawAllForUserDetails(
					this.userId,
					this.filterCriteria
				);
			if (error) {
			} else {
				const items = [];
				result.content.map((d) => {
					const languageList = JSON.parse(d.cwrtUbtName);
					languageList.forEach((i) => {
						var obj = {
							language: i.ltId,
							bankName: this.getBankName(d),
							...d,
						};
						items.push(obj);
					});
				});
				this.records = items.filter(
					(d) => d.language == this.languageOptions[0].ltId
				);

				this.totalPage = result.paginationInfo.totalPages;
			}
		},
		getBankName(d) {
			const contents = JSON.parse(d.cwrtUbtName);
			let result = "";
			contents.forEach((i) => {
				result = i.value;
			});
			return result;
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
