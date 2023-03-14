<template>
	<div class="row">
		<div class="col-md-3">
			<button @click="backToPreviousPage" class="btn"><i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i> <b>Back</b></button>
		</div>
	</div>
	<div class="row" style="margin-top: 12px">
		<div class="col-md-3">
			<label>{{ $messages.fieldLabelUpline() }}</label>
			<input class="form-control" disabled="true" v-model="upline" />
		</div>
		<div class="col-md-3">
			<label>{{ $messages.fieldLabelTarget() }}</label>
			<input class="form-control" disabled="true" v-model="parent" />
		</div>
		<div class="col-md-3">
			<label>{{ $messages.fieldLabelDownline() }}</label>
			<input class="form-control" disabled="true" v-model="child" />
		</div>
		<div class="col-md-3">
			<label>{{ $messages.fieldLabelTier() }}</label>
			<input class="form-control" disabled="true" v-model="currentTier" />
		</div>
	</div>
	<br>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelDeposit() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelWithdrawal() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelRebate() }}</span>
		<span class="paper-table--header">{{ $messages.fieldLabelCommision() }}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<my-team-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
</template>

<script>
import MyTeamListingRow from "./MyTeamListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour],
	components: { MyTeamListingRow },
	props: {
		selfUtId: { type: Number },
		utId: { type: Number },
		startDate: { type: String },
		endDate: { type: String },
	},
	data: () => ({
		currency: json.currency,
		parent: "",
		child: "",
		upline: "",
		currentTier: 0,
	}),
	async created() {
		await this.getAll();
	},
	computed: {
		filterCriteria() {
			return {
				utId: +this.utId,
				selfUtId: +this.selfUtId,
				startDate: this.startDate,
				endDate: this.endDate,
				paginationDAO: {
					pageNumber: this.currentPage,
					rowPerPage: this.rowPerPage,
				},
			};
		},
	},
	methods: {
		backToPreviousPage() {
			history.back();
		},
		async getAll() {
			const [error, result] = await this.$service.userService.getMyTeam(
				this.filterCriteria
			);
			if (error) {
			} else {
				this.upline = result.content.upline;
				this.records = result.content.myTeamReportDAOSubList;
				this.child = result.content.account;
				this.parent = result.content.parent;
				this.currentTier = result.content.currentTier;
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
