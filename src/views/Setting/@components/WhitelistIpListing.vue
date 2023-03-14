<template>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.fieldLabelIPAddress() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelLastAccessedBy() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelLastAccessedAt() }}</span>
		<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelLastAccessedAt() }}</span>
		<span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<whitelist-ip-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage"
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
import WhitelistIpListingRow from "./WhitelistIpListingRow";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
	name: "LanguageListing",
	mixins: [listingBehaviour],
	components: { WhitelistIpListingRow },
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
			] = await this.$service.settingService.getAllWhitelistIp();
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
