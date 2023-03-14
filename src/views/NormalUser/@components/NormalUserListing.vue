<template>
	<div class="col-12">
		<div v-if="showBatchActions && $claims.canBatchUpdateUserStatus">
			<button class="btn btn-danger btn-round" @click="suspendUsers">{{ $messages.labelSuspend() }}
				({{ selectedItemsLength }})</button>
			<button class="btn btn-info btn-round" @click="activeUsers">{{ $messages.labelActive() }}
				({{ selectedItemsLength }})
			</button>
		</div>
	</div>
	<div class="paper-table table table-striped table-bordered">
		<span class="paper-table--header">
			<input type="checkbox" v-model="selectAll" />
		</span>
		<span class="paper-table--header">#</span>
		<span class="paper-table--header">{{$messages.labelUsername()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelUserFullname()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelUpline()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelBankInfo()}} ({{$messages.fieldLabelCollectTypeCryto()}})</span>
		<span class="paper-table--header">{{$messages.fieldLabelBankInfo()}} ({{$messages.fieldLabelCollectTypeBank()}})</span>
		<!-- <span class="paper-table--header">{{ $messages.fieldLabelDeposit() }} {{ $messages.labelBalance() }}
			({{ currency }})</span> -->
		<span class="paper-table--header">{{ $messages.fieldLabelWithdraw() }} {{ $messages.labelBalance() }}
			({{ currency }})</span>
		<!-- <span class="paper-table--header">{{$messages.fieldLabelUserLastLogin()}}</span> -->
		<!-- <span class="paper-table--header">{{$messages.fieldLabelRegisteredIP()}}</span> -->
		<span class="paper-table--header">{{$messages.fieldLabelPendingTask()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelOnHoldTask()}}</span>
		<span class="paper-table--header">{{$messages.fieldLabelIsOnline()}}</span>

		<span class="paper-table--header">{{$messages.labelCreatedAt()}}</span>
		<span class="paper-table--header">{{$messages.labelDemoAcc()}}</span>
		<span class="paper-table--header">{{$messages.labelStatus()}}</span>
		<span class="paper-table--header disabled-sorting text-right">{{$messages.labelAction()}}</span>
		<div class="paper-table-body">
			<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
				<normal-user-listing-row :record="record" @refresh="getAll()" :currentIndex="index" :selectedItems="selectedItems"
					@selected="toggleSelected" :currentPage="currentPage" :rowPerPage="rowPerPage" />
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
	<div id="myModal1" class="modal" v-if="showModal1" tabindex="0">
		<div class="modal-content">
			<div class="modal-header">
				<span @click="closeDialog1" class="close">&times;</span>
				<h6>{{ $messages.labelOnHoldManagement() }}
				</h6>
			</div>
			<div class="modal-body">
				<on-hold-user-detail-page :recordId="modalId">
				</on-hold-user-detail-page>
			</div>
		</div>
	</div>
	<div id="myModal2" class="modal" v-if="showModal2" tabindex="0">
		<div class="modal-content">
			<div class="modal-header">
				<span @click="closeDialog2" class="close">&times;</span>
				<h6>{{ $messages.fieldLabelCreateDeposit() }}
				</h6>
			</div>
			<div class="modal-body">
				<add-deposit-manual-fund-page isDeposit="true" :recordId="modalId" :username="selectedUsername">
				</add-deposit-manual-fund-page>
			</div>
		</div>
	</div>
	<div id="myModal3" class="modal" v-if="showModal3" tabindex="0">
		<div class="modal-content">
			<div class="modal-header">
				<span @click="closeDialog3" class="close">&times;</span>
				<h6>{{ $messages.fieldLabelCreateManualFund() }}
				</h6>
			</div>
			<div class="modal-body">
				<add-deposit-manual-fund-page isDeposit="false" :recordId="modalId" :username="selectedUsername">
				</add-deposit-manual-fund-page>
			</div>
		</div>
	</div>
</template>

<script>
import NormalUserListingRow from "./NormalUserListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import json from "../../../infrastructure/json/config.json";
import { integer } from "@vuelidate/validators";
import { mixin as RecordMixin } from "../NormalUser";
import AddDepositManualFundPage from "../AddDepositManualFundPage";
import OnHoldUserDetailPage from "../../ReviewTaskOnHold/OnHoldUserDetailPage";

export default {
	name: "RankingListing",
	mixins: [pageBehaviour, listingBehaviour, RecordMixin],
	components: {
		NormalUserListingRow,
		AddDepositManualFundPage,
		OnHoldUserDetailPage,
	},
	props: {
		invitationId: { type: String },
		utUsername: { type: String },
		walletAddress1: { type: String },
		walletAddress2: { type: String },
		ipAddress: { type: String },
		registeredIpAddress: { type: String },
		fullName: { type: String },
		createdDatetimeStart: { type: String },
		createdDatetimeEnd: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
		status: { type: Number },
		testUser: { type: Number },
	},
	data: () => ({
		currency: json.currency,
	}),
	async created() {
		const filter = sessionStorage.getItem("NORMAL_LISTING_FILTER_LIST");
		await this.getAll(filter);
	},
	computed: {
		selectAll: {
			get: function () {
				return this.records
					? this.selectedItems.length == this.records.length
					: false;
			},
			set: function (value) {
				this.selectedItems = [];
				if (value) {
					this.records.forEach((record) => {
						this.selectedItems.push(record.utId);
					});
				}
			},
		},
		filterCriteria() {
			return {
				invitationId: this.invitationId,
				utUsername: this.utUsername,
				ipAddress: this.ipAddress,
				registeredIpAddress: this.registeredIpAddress,
				fullName: this.fullName,
				walletAddress1: this.walletAddress1,
				walletAddress2: this.walletAddress2,
				createdDatetimeStart: this.createdDatetimeStart,
				createdDatetimeEnd: this.createdDatetimeEnd,
				status: this.status,
				testUser: this.testUser,
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
		async getAll(filter) {
			const selectedFilter = filter
				? JSON.parse(filter)
				: this.filterCriteria;
			sessionStorage.setItem(
				"NORMAL_LISTING_FILTER_LIST",
				JSON.stringify(selectedFilter)
			);
			const [error, result] = await this.$service.userService.getUserList(
				selectedFilter
			);
			if (error) {
				this.showError(error);
			} else {
				this.records = result.content;
				this.totalPage = result.paginationInfo.totalPages;
			}
		},
		async suspendUsers() {
			const [error, result] =
				await this.$service.userService.batchUpdateUserStatus(
					this.selectedItems,
					0
				);

			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.selectedItems = [];
				this.$swal("Inactivated!", "You inactivated!", "success");

				await this.getAll();
			}
		},
		async activeUsers() {
			this.setLoading();

			const [error, result] =
				await this.$service.userService.batchUpdateUserStatus(
					this.selectedItems,
					1
				);

			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.selectedItems = [];
				this.$swal("Activated!", "You activated!", "success");

				await this.getAll();
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
