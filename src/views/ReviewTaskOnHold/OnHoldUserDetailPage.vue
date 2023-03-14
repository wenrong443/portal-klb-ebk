<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserInfo() }}</h4>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<cave-detail-component :label="$messages.labelUsername()" :value="username" />
							<cave-detail-component :label="$messages.fieldLabelUserMobileNumber()" :value="formattedMobileNumber" />
                            <cave-detail-component :label="$messages.fieldLabelEmail()" :value="email" />
							<cave-detail-component :label="$messages.fieldLabelUserRegisteredOn()" :value="registeredOn" />
                            <cave-detail-component :label="$messages.fieldLabelTotalTaskTaken()" :value="totalTaskTaken" />
                            <cave-detail-component label="Level" v-if="lsLevel != null" :value="getMembershipTitles(lsLevel)" />
						</div>
						<div class="col-md-6">
                            <cave-detail-component :label="$messages.fieldLabelUserTotalTopup() + ' (' + currency + ')'" :value="totalTopUp" />
							<cave-detail-component :label="$messages.fieldLabelUserTotalWithdraw() + ' (' + currency + ')'" :value="totalWithdraw" />
							<cave-detail-component :label="$messages.fieldLabelDeposit() + ' ' + $messages.labelBalance() + ' (' + currency + ')'"
								:value="depositBalance" />
							<cave-detail-component :label="$messages.fieldLabelWithdraw() + ' ' + $messages.labelBalance() + ' (' + currency + ')'"
								:value="withdrawBalance" />
							<cave-detail-component :label="$messages.fieldLabelTotalTaskTakenToday()" :value="totalTaskTakenForToday" />
                            <cave-detail-component :label="$messages.fieldLabelOnHoldTask()" :value="totalOnhold + '/1'" />

                        </div>
					</div>
                    <hr>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							
							<div class="form-group">
								<label>{{ $messages.fieldLabelCompletedTask() }}</label>
								<input type="number" class="form-control" v-model="totalCompletedByToday" :disabled="!isEdit" />
							</div>
                           
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>{{ $messages.fieldLabelTodayAvailableTask() }}</label>
								<input type="number" class="form-control" v-model="totalAvailableForToday" :disabled="!isEdit" />
							</div>
						</div>
						<div class="col-md-12" style="text-align: right">
							<button class="btn btn-danger btn-round" @click="editOrSaveBtnOnClick()"
								v-if="$claims.canEditUserInfo">{{ editTitle }}</button>
							<button class="btn btn-info btn-round" v-if="isEdit" @click="cancelBtnOnClick()">{{ $messages.labelCancel() }}</button>
						</div>
					</div>
				</div>
				</div>
			</div>
            <div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelAssignSpecialTask() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(3)">
						{{ filterWordSection(3) }}
					</button>
				</div>
				<div class="card-body">
                    <special-task-filter v-if="isFilterSection3" @search="search"></special-task-filter>
					<special-task-listing 
                        v-if="isFilterSection3" @refresh="getAll()" :currentPage="currentPage"
                        :start="start" :end="end" :type="type"
						:userId="recordId" :languageOptions="languageOptions">
					</special-task-listing>
				</div>
			</div>

            <div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.labelOnHoldHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(2)">
						{{ filterWordSection(2) }}
					</button>
				</div>
				<div class="card-body">
					<on-hold-history-listing v-if="languageOptions.length != 0 && isFilterSection2" @refresh="getAll()" :currentPage="currentPage"
						:userId="recordId" :languageOptions="languageOptions">
					</on-hold-history-listing>
				</div>
			</div>

			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.labelMenuReviewTaskTakenList() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(1)">
						{{ filterWordSection(1) }}
					</button>
				</div>
				<div class="card-body">
					<review-task-taken-listing v-if="languageOptions.length != 0 && isFilterSection1" @refresh="getAll()" :currentPage="currentPage"
						:userId="recordId" :languageOptions="languageOptions">
					</review-task-taken-listing>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	createInstance,
	assign,
	STATUS_CLASS,
	STATUS,
	RecordMixin as mixin,
} from "./OnHoldUser";
import CaveDetailComponent from "@components/CaveDetailComponent";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import ReviewTaskTakenListing from "./details/ReviewTaskTakenListing";
import OnHoldHistoryListing from "./details/OnHoldHistoryListing";
import SpecialTaskFilter from "./details/SpecialTaskFilter";
import SpecialTaskListing from "./details/SpecialTaskListing";
// import UserWithdrawHistoryListing from "./@components/details/UserWithdrawHistoryListing";
// import UserManualFundHistoryListing from "./@components/details/UserManualFundHistoryListing";
// import UserGameInvestmentBookingHistoryListing from "./@components/details/UserGameInvestmentBookingHistoryListing";
// import UserGameMineBookingHistoryListing from "./@components/details/UserGameMineBookingHistoryListing";
// import UserExchangeHistoryListing from "./@components/details/UserExchangeHistoryListing";

import pageBehaviour from "seedwork/mixins/pageBehaviour";
// import json from "../../infrastructure/json/config.json";

export default {
	name: "OnHoldUserDetailPage",
	components: {
		CaveSwitchCheckbox,
		CaveDetailComponent,
		ReviewTaskTakenListing,
		OnHoldHistoryListing,
		SpecialTaskListing,
        SpecialTaskFilter,
		// UserWithdrawHistoryListing,
		// UserManualFundHistoryListing,
		// UserGameInvestmentBookingHistoryListing,
		// UserGameMineBookingHistoryListing,
		// UserExchangeHistoryListing,
	},
	mixins: [pageBehaviour],
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		isEdit: false,
		currency: "$",
		membershipRecords: [],
		languageOptions: [],
		isFilterSection1: false,
		isFilterSection2: false,
		isFilterSection3: false,
		isFilterSection4: false,
		isFilterSection5: false,
		isFilterSection6: false,
		isFilterSection7: false,
		isFilterSection8: false,
        start: -99,
        end: -99,
        type: -99,
		...createInstance(),
	}),
	computed: {
		formattedMobileNumber() {
			return "(" + this.countryCode + ") " + this.mobileNumber;
		},
		formattedStatusClass() {
			return this.status != null ? STATUS_CLASS[this.status] : "";
		},
		formattedStatusName() {
			return this.status != null ? STATUS[this.status] : "-";
		},
		editTitle() {
			return (this.editTitle = this.isEdit
				? this.$messages.labelSave()
				: this.$messages.labelEdit());
		},
	},
	async created() {
		await this.get();
	},
	methods: {
        getMembershipTitles(d) {
			const contents = JSON.parse(d.mtTitle);
			let result = "";
			contents.forEach((i) => {
				if (result == "") {
					result = i.value;
				}
			});
			return result;
		},
        search(filter) {
			this.start = filter.start;
			this.end = filter.end;
            this.type = filter.type;
		},
		filterWordSection(index) {
			switch (index) {
				case 1:
					return this.isFilterSection1
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 2:
					return this.isFilterSection2
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 3:
					return this.isFilterSection3
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 4:
					return this.isFilterSection4
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 5:
					return this.isFilterSection5
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 6:
					return this.isFilterSection6
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 7:
					return this.isFilterSection7
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
				case 8:
					return this.isFilterSection8
						? this.$messages.labelFilteringHide()
						: this.$messages.labelFilteringShow();
			}
			return "Undefined";
		},
		showSection(index) {
			switch (index) {
				case 1:
					this.isFilterSection1 = !this.isFilterSection1;
					break;
				case 2:
					this.isFilterSection2 = !this.isFilterSection2;
					break;
				case 3:
					this.isFilterSection3 = !this.isFilterSection3;
					break;
				case 4:
					this.isFilterSection4 = !this.isFilterSection4;
					break;
				case 5:
					this.isFilterSection5 = !this.isFilterSection5;
					break;
				case 6:
					this.isFilterSection6 = !this.isFilterSection6;
					break;
				case 7:
					this.isFilterSection7 = !this.isFilterSection7;
					break;
				case 8:
					this.isFilterSection8 = !this.isFilterSection8;
					break;
			}
		},
		async get() {
			const [error3, result3] =
				await this.$service.settingService.getAllLanguage();
			if (error3) {
			} else {
				this.languageOptions = result3.content;
			}

			const [error2, result2] =
				await this.$service.membershipService.getAll({});
			if (error2) {
			} else {
				const items = [];
				result2.content.map((d) => {
					const languageList = JSON.parse(d.mtTitle);
					languageList.forEach((i) => {
						var obj = {
							language: i.ltId,
							membershipTitle: this.getMembershipTitles(d),
							...d,
						};
						items.push(obj);
					});
				});
				this.membershipRecords = items.filter(
					(d) => d.language == this.languageOptions[0].ltId
				);
			}

			const [error, result] = await this.$service.userService.getUserInfo(
				this.recordId
			);

			if (error) {
			} else {
				assign(this, result.content);
			}
		},
		getMembershipTitles(d) {
			const contents = JSON.parse(d.mtTitle);
			let result = "";
			contents.forEach((i) => {
				if (result == "") {
					result = i.value;
				}
			});
			return result;
		},
		editOrSaveBtnOnClick() {
			this.isEdit = !this.isEdit;
			if (!this.isEdit) {
				// this.$swal({
				// 	title: "Update user info confirmation",
				// 	text: "Please enter your OTP below to proceed",
				// 	input: "text",
				// 	inputPlaceholder: "Enter your OTP",
				// 	inputAttributes: {
				// 		autocapitalize: "off",
				// 	},
				// 	showCancelButton: true,
				// 	confirmButtonText: "Proceed",
				// 	showLoaderOnConfirm: true,
				// 	preConfirm: (otp) => {
				// 		this.editOrSaveBtnOnClickSub(otp);
				// 	},
				// });
                						this.editOrSaveBtnOnClickSub("123456");

			}
		},

		async editOrSaveBtnOnClickSub(otp) {
			var formData = new FormData();
formData.append('utId', this.recordId);
formData.append('taskCompleted', this.totalCompletedByToday);
formData.append('taskAvailable', this.totalAvailableForToday);

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.userService.updateReviewTaskCount(formData);
			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
			}
		},
		cancelBtnOnClick() {
			this.isEdit = false;
		},
	},
};
</script>

<style>
</style>