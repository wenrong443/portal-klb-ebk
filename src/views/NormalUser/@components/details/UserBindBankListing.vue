<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelNetworkType() }}</span>
		<!-- <span class="paper-table--header">{{ $messages.fieldLabelAccountName() }}</span> -->
		<span class="paper-table--header">{{ $messages.fieldLabelWalletAddress() }}</span>
        		<span class="paper-table--header" v-if="!hasDropDown">{{ $messages.fieldLabelUserFullname() }}</span>
        		<span class="paper-table--header" v-if="!hasDropDown">{{ $messages.fieldLabelUserMobileNumber() }}</span>

        <span class="paper-table--header" v-if="VITE_INDIA_BANK">{{ $messages.labelBankAccountType() }}</span>
        <span class="paper-table--header" v-if="VITE_INDIA_BANK">{{ $messages.labelBankBranch() }}</span>
        <span class="paper-table--header" v-if="VITE_INDIA_BANK">{{ $messages.labelBankIfsc() }}</span>
        <span class="paper-table--header" v-if="VITE_INDIA_BANK">{{ $messages.labelBankHqIfsc() }}</span>


		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelStatus() }}</span>
        <span class="paper-table--header">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<user-bind-bank-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import UserBindBankListingRow from "./UserBindBankListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "UserBindBankListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { UserBindBankListingRow },
	props: {
		userId: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
        VITE_INDIA_BANK: process.env.VITE_INDIA_BANK == "true" ? true : false,
        hasDropdown: true
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
				await this.$service.bankService.getUserBindBankAll(
					this.userId,
					this.filterCriteria
				);
			if (error) {
			} else {
				const items = [];
				result.content.map((d) => {
                    try {
                        const languageList = JSON.parse(d.ubbtUbtName);
					languageList.forEach((i) => {
						var obj = {
							language: i.ltId,
							bankName: this.getBankName(d),
                            hasDropDown: true,
							...d,
						};
						items.push(obj);
					});
                    }catch(e){
                        this.hasDropdown = false;
                        var obj = {
							language: 1,
							bankName: d.ubbtUbtName,
                            hasDropDown: false,
							...d,
						};
						items.push(obj);
                    }
					
				});
				this.records = items.filter(
					(d) => d.language == this.languageOptions[0].ltId
				);
				this.totalPage = result.paginationInfo.totalPages;
			}
		},
		getBankName(d) {
			const contents = JSON.parse(d.ubbtUbtName);
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
