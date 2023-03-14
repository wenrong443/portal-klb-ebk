<template>
	<div class="row">
		<div class="col-4">
			<b>{{ $messages.fieldLabelTotalAmount() }}</b> {{ formatted2DC }}
		</div>
		<div class="col-4">
			<div v-if="showBatchActions && $claims.canApproveDeposit && $claims.canRejectDeposit">
				<button class="btn btn-danger btn-round" @click="rejectOrders">{{ $messages.labelReject() }}
					({{ selectedItemsLength }})</button>
				<button v-if="showBatchActions && $claims.canApproveDeposit && $claims.canRejectDeposit"
					class="btn btn-info btn-round" @click="approveOrders">{{ $messages.labelApprove() }}
					({{ selectedItemsLength }})
				</button>
			</div>
		</div>
		<div class="col-4">
			<div class="row">
				<div class="col-6">
					<button class="btn btn-info btn-round float-right" @click="getAll">
						{{ $messages.fieldLabelRefresh() }}
						<template v-if="selectedTime != 0">
							({{timeCount}})
						</template>
					</button>
				</div>
				<div class="col-6">
					<select class="form-control" @change="updateTimeCount" v-model="selectedTime">
						<option v-for="timerOption in timerOptions" :value="timerOption.id" :key="timerOption.id">
							{{timerOption.value}}
						</option>
					</select>
				</div>
			</div>
		</div>
	</div>

	<div class="overflow-auto">
		<div class="paper-table table table-striped table-bordered">
			<span class="paper-table--header">
				<input type="checkbox" v-model="selectAll" />
			</span>
			<span class="paper-table--header">#</span>
			<span class="paper-table--header">{{ $messages.fieldLabelRefNo() }}</span>
			<span class="paper-table--header">{{ $messages.fieldLabelUserRemarks() }}</span>
			<span class="paper-table--header">{{ $messages.labelUsername() }}</span>
			<span class="paper-table--header" style="width: 20%">{{ $messages.fieldLabelBankInfo() }}</span>
			<span class="paper-table--header" style="width: 20%">{{ $messages.labelAmount() }}
				({{currency}})</span>
			<span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
			<span class="paper-table--header">{{ $messages.fieldLabelProcessedBy() }}</span>
			<span class="paper-table--header">{{ $messages.fieldLabelProcessedAt() }}</span>
			<span class="paper-table--header" style="width: 10%">{{ $messages.labelStatus() }}</span>
			<span class="paper-table--header disabled-sorting text-right"
				style="width: 10%">{{ $messages.labelAction() }}</span>

			<div class="paper-table-body">
				<div class="paper-table-rows" v-for="(record, index) in records" v-bind:key="record.id">
					<account-listing-row :record="record" @refresh="getAll(filterCriteria)"
						:selectedItems="selectedItems" :languageOptions="languageOptions" :currentIndex="index"
						:currentPage="currentPage" :rowPerPage="rowPerPage" @selected="toggleSelected" />
				</div>
			</div>
		</div>
	</div>
	<div v-if="hasRecords" class="no-record">
		<div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
	</div>
	<pagination-control :length="totalPage" v-model="currentPage" @rowPerPage="updateRowPerPage"></pagination-control>
	<div id="myModal" class="modal" v-if="showModal" tabindex="0">
		<div class="modal-content">
			<div class="modal-header">
				<span @click="closeDialog" class="close">&times;</span>
				<h6>{{ $messages.labelDepositDetailPage() }} #{{modalOrderNo}}
				</h6>
			</div>
			<div class="modal-body">
				<deposit-detail-page :recordId="modalId" @refresh="getAll(filterCriteria)">
				</deposit-detail-page>
			</div>
		</div>
	</div>
</template>

<script>
import AccountListingRow from "./AccountListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import { createInstance, assign, mixin as RecordMixin } from "../Account";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import DepositDetailPage from "../DepositDetailPage.vue";
import json from "@/infrastructure/json/config.json";

export default {
	name: "ReferrerListing",
	mixins: [pageBehaviour, RecordMixin, listingBehaviour],
	components: { AccountListingRow, DepositDetailPage },
	props: {
		cdrtCmbtId: { type: Number },
		cdrtStatus: { type: Number },
		cdrtUtUsername: { type: String },
		createdDatetimeEnd: { type: String },
		createdDatetimeStart: { type: String },
		sortBy: { type: String },
		sortDirection: { type: String },
	},
	data: () => ({}),
	async created() {
		const filter = sessionStorage.getItem("ACCOUNT_LISTING_FILTER_LIST");
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
						this.selectedItems.push(record.cdrtId);
					});
				}
			},
		},
		filterCriteria() {
			return {
				cdrtCmbtId: this.cdrtCmbtId,
				cdrtStatus: this.cdrtStatus,
				cdrtUtUsername: this.cdrtUtUsername,
				createdDatetimeEnd: this.createdDatetimeEnd,
				createdDatetimeStart: this.createdDatetimeStart,
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
		formatted2DC() {
			let nums = (parseFloat(this.totalAmount) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
	methods: {
		updateTimeCount() {
			clearTimeout(this.deferTime);

			this.deferTime = null;
			this.timeCount = this.selectedTime;

			localStorage.setItem("autoRefreshDeposit", this.selectedTime);
		},
		async getAll(filter) {
			this.setLoading();
			const selectedFilter =
				filter && typeof filter !== "object"
					? JSON.parse(filter)
					: this.filterCriteria;
			sessionStorage.setItem(
				"ACCOUNT_LISTING_FILTER_LIST",
				JSON.stringify(selectedFilter)
			);
			const [error, result] = await this.$service.accountService.getDepositAll(
				selectedFilter
			);
			if (error) {
				this.showError(error);
			} else {
				this.totalAmount = result.content2;
				this.records = result.content;
				this.totalPage = result.paginationInfo.totalPages;
				this.setCompleted();
			}
		},
		async rejectOrders() {
			const { value } = await this.$swal({
				title: this.$messages.labelAreYouSure(),
				text: this.$messages.labelYourWontBeAbleToRevertThis(),
				input: "radio",
				inputOptions: json.depositRejectReasons,
				inputValidator: async (value) => {
					if (!value) {
						return "You need to choose something!";
					}
					this.setLoading();
					const [error, result] =
						await this.$service.accountService.batchDeposit(
							this.selectedItems,
							0,
							value
						);

					if (error) {
						this.showError(error);
					} else {
						this.setCompleted();
						this.selectedItems = [];
						this.$swal("Rejected!", "You rejected!", "success");
						await this.getAll();
					}
				},
			});
		},
		async approveOrders() {
			this.setLoading();

			const [error, result] = await this.$service.accountService.batchDeposit(
				this.selectedItems,
				1,
				"approved"
			);

			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.selectedItems = [];
				this.$swal("Approved!", "You approved!", "success");
				await this.getAll();
			}
		},
	},
	watch: {
		timeCount: {
			async handler(value) {
				if (value > 0) {
					this.deferTime = setTimeout(() => {
						this.timeCount--;
					}, 1000);
				} else {
					this.timeCount = localStorage.getItem("autoRefreshDeposit") || 60;
					const filter = sessionStorage.getItem("ACCOUNT_LISTING_FILTER_LIST");

					this.getAll(filter);
				}
			},
			immediate: true,
		},
	},
};
</script>
