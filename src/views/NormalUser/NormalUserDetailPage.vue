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
							<cave-detail-component :label="$messages.fieldLabelUserInvitationCode()" :value="referrerCode" />
							<cave-detail-component :label="$messages.fieldLabelUserFullname()" :value="fullName" />
							<cave-detail-component :label="$messages.fieldLabelUserMobileNumber()" :value="formattedMobileNumber" />
							<cave-detail-component :label="$messages.fieldLabelUserRegisteredOn()" :value="registeredOn" />
							<cave-detail-component :label="$messages.fieldLabelUserLastLoginOn()" :value="lastLoginOn" />
							<cave-detail-component :label="$messages.fieldLabelUserLastLoginIP()" :value="lastLoginIP" />
							<cave-detail-component :label="$messages.fieldLabelUsernameUpline()" :value="uplineUsername" />
							<cave-detail-component :label="$messages.fieldLabelReferralCodeUpline()" :value="uplineCode" />
							<cave-detail-component label="Level" v-if="lsLevel != null" :value="getMembershipTitles(lsLevel)" />
						</div>
						<div class="col-md-6">
							<cave-detail-component :label="$messages.fieldLabelUserTotalInvite()" :value="totalInvite" />
							<cave-detail-component :label="$messages.fieldLabelUserTotalTopup() + ' (' + currency + ')'" :value="totalTopUp" />
							<cave-detail-component :label="$messages.fieldLabelUserTotalWithdraw() + ' (' + currency + ')'" :value="totalWithdraw" />
							<cave-detail-component :label="$messages.fieldLabelDeposit() + ' ' + $messages.labelBalance() + ' (' + currency + ')'"
								:value="depositBalance" />
							<cave-detail-component :label="$messages.fieldLabelWithdraw() + ' ' + $messages.labelBalance() + ' (' + currency + ')'"
								:value="withdrawBalance" />
							<div class="form-group">
								<label class="cave-detail-component--text">{{ $messages.fieldLabelNRIC() }}</label>
								<span class="cave-detail-component--value"> <img :src="formattedNRIC" style="width: 200px; height: auto"
										@click="viewIc()"></span>
							</div>
							<!-- <cave-detail-component v-for="(record) in crytoBalanceInfoList" v-bind:key="record.shortCode" :label="record.shortCode + ' ' + $messages.labelBalance()" :value="record.balance" /> -->
							<!-- <cave-detail-component :label="$messages.fieldLabelETH() + ' ' + $messages.labelBalance()" :value="ethBalance" /> -->
							<!-- <cave-detail-component :label="$messages.fieldLabelLTC() + ' ' + $messages.labelBalance()" :value="ltcBalance" /> -->
						</div>
					</div>
				</div>
				<hr>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<!-- <div class="form-group" v-if="lsLevel != null">
								<label for="inputState">{{ $messages.fieldLabelLikeShare() }} {{ $messages.fieldLabelUserMembership() }}</label>
								<select class="form-control" v-model="lsLevel.mtId" :disabled="true">
									<option v-for="membershipOption in membershipRecords" v-bind:value="membershipOption.mtId"
										v-bind:key="membershipOption.mtId">
										{{ membershipOption.membershipTitle }}
									</option>
								</select>
							</div> -->
							<div class="form-group">
								<label>{{ $messages.fieldLabelEmail() }}</label>
								<input type="text" class="form-control" v-model="email" :disabled="!isEdit" />
							</div>
							<div class="form-group">
								<label>{{ $messages.fieldLabelUserFullname() }}</label>
								<input type="text" class="form-control" v-model="fullName" :disabled="!isEdit" />
							</div>
							<div class="form-group">
								<label>{{ $messages.fieldLabelLoginPassword() }}</label>
								<input type="text" class="form-control" :placeholder="$messages.fieldTooltipEnterWithdrawPasswordIfWantReset()"
									v-model="loginPassword" :disabled="!isEdit" />
							</div>
							<!-- <div class="form-group" v-for="(record) in crytoPackageInfoList" v-bind:key="record.shortCode">
								<label>{{ record.shortCode }}
									{{ $messages.fieldLabelUserMembership() }}</label>
								<input type="text" class="form-control" v-model="record.displayValue" :disabled="true" />
							</div> -->
						</div>
						<div class="col-md-6">
							<!-- <div class="form-group">
								<label>{{ $messages.fieldLabelUserCreditScore() }}</label>
								<input type="text" class="form-control" :placeholder="$messages.fieldTooltipEnterCreditScore()" v-model="creditScore"
									:disabled="!isEdit" />
							</div> -->

							<div class="form-group">
								<label>{{ $messages.fieldLabelUserWithdrawPassowrd() }}</label>
								<input type="text" class="form-control" :placeholder="$messages.fieldTooltipEnterWithdrawPasswordIfWantReset()"
									v-model="withdrawPassword" :disabled="!isEdit" />
							</div>
							<div class="form-group">
								<label>{{ $messages.fieldLabelUserRemarks() }}</label>
								<textarea type="text" class="form-control" :placeholder="$messages.fieldTooltipEnterRemarks()" v-model="remarks"
									:disabled="!isEdit"></textarea>
							</div>
							<div class="row">
								<div class="col-md-3">
									<cave-switch-checkbox v-model="status" :text="$messages.fieldLabelUserIsActive()" :isDisabled="!isEdit">
									</cave-switch-checkbox>
								</div>
								<div class="col-md-3">
									<cave-switch-checkbox v-model="leader" :text="$messages.fieldLabelUserIsLeader()" :isDisabled="!isEdit">
									</cave-switch-checkbox>

								</div>
								<div class="col-md-3">
									<cave-switch-checkbox v-model="risk" :text="$messages.fieldLabelUserIsRisk()" :isDisabled="!isEdit">
									</cave-switch-checkbox>
								</div>
								<div class="col-md-3">
									<cave-switch-checkbox v-model="test" :text="$messages.labelDemoAcc()"
										:isDisabled="!isEdit || !$claims.canUpdateUserAsTest">
									</cave-switch-checkbox>
								</div>
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
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserBindedBank() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(1)">
						{{ filterWordSection(1) }}
					</button>
				</div>
				<div class="card-body">
					<user-bind-bank-listing v-if="languageOptions.length != 0 && isFilterSection1" @refresh="getAll()" :currentPage="currentPage"
						:userId="recordId" :languageOptions="languageOptions">
					</user-bind-bank-listing>
				</div>
			</div>
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserInvitationHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(2)">
						{{ filterWordSection(2) }}
					</button>
				</div>
				<div class="card-body">
					<user-referrer-history-listing v-if="languageOptions.length != 0 && isFilterSection2" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-referrer-history-listing>
				</div>
			</div>
			<div class="card" v-if="$claims.canViewDeposit">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserDepositHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(3)">
						{{ filterWordSection(3) }}
					</button>
				</div>
				<div class="card-body">
					<user-deposit-history-listing v-if="languageOptions.length != 0 && isFilterSection3" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-deposit-history-listing>
				</div>
			</div>
			<div class="card" v-if="$claims.canViewWithdraw">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserWithdrawHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(4)">
						{{ filterWordSection(4) }}
					</button>
				</div>
				<div class="card-body">
					<user-withdraw-history-listing v-if="languageOptions.length != 0 && isFilterSection4" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-withdraw-history-listing>
				</div>
			</div>
			<div class="card" v-if="$claims.canViewManualFund">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserManualFundHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(5)">
						{{ filterWordSection(5) }}
					</button>
				</div>
				<div class="card-body">
					<user-manual-fund-history-listing v-if="languageOptions.length != 0 && isFilterSection5" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-manual-fund-history-listing>
				</div>
			</div>
			<div class="card" v-if="$claims.canViewInvestmentBooking">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserGameInvestmentBookingHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(6)">
						{{ filterWordSection(6) }}
					</button>
				</div>
				<div class="card-body">
					<user-game-investment-booking-history-listing v-if="languageOptions.length != 0 && isFilterSection6" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-game-investment-booking-history-listing>
				</div>
			</div>

			<div class="card" v-if="$claims.canViewMineBooking">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserGameMineBookingHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(7)">
						{{ filterWordSection(7) }}
					</button>
				</div>
				<div class="card-body">
					<user-game-mine-booking-history-listing v-if="languageOptions.length != 0 && isFilterSection7" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-game-mine-booking-history-listing>
				</div>
			</div>

			<div class="card" v-if="$claims.canViewExchangeLog">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUserExchangeHistory() }}</h4>
					<button type="button" class="btn btn-info btn-round" @click="showSection(8)">
						{{ filterWordSection(8) }}
					</button>
				</div>
				<div class="card-body">
					<user-exchange-history-listing v-if="languageOptions.length != 0 && isFilterSection8" @refresh="getAll()"
						:currentPage="currentPage" :userId="recordId" :languageOptions="languageOptions">
					</user-exchange-history-listing>
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
} from "./NormalUser";
import CaveDetailComponent from "@components/CaveDetailComponent";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import UserBindBankListing from "./@components/details/UserBindBankListing";
import UserReferrerHistoryListing from "./@components/details/UserReferrerHistoryListing";
import UserDepositHistoryListing from "./@components/details/UserDepositHistoryListing";
import UserWithdrawHistoryListing from "./@components/details/UserWithdrawHistoryListing";
import UserManualFundHistoryListing from "./@components/details/UserManualFundHistoryListing";
import UserGameInvestmentBookingHistoryListing from "./@components/details/UserGameInvestmentBookingHistoryListing";
import UserGameMineBookingHistoryListing from "./@components/details/UserGameMineBookingHistoryListing";
import UserExchangeHistoryListing from "./@components/details/UserExchangeHistoryListing";

import pageBehaviour from "seedwork/mixins/pageBehaviour";
import json from "../../infrastructure/json/config.json";

export default {
	name: "NormalUserDetailPage",
	components: {
		CaveSwitchCheckbox,
		CaveDetailComponent,
		UserBindBankListing,
		UserReferrerHistoryListing,
		UserDepositHistoryListing,
		UserWithdrawHistoryListing,
		UserManualFundHistoryListing,
		UserGameInvestmentBookingHistoryListing,
		UserGameMineBookingHistoryListing,
		UserExchangeHistoryListing,
	},
	mixins: [pageBehaviour],
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		isEdit: false,
		isEdit2: false,
		isRead: true,
		currency: json.currency,
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
		...createInstance(),
	}),
	computed: {
		formattedNRIC() {
			return this.icImage;
		},
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
        viewIc(){
window.open(this.icImage);
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
			let apiData = {
				utId: this.recordId,
				// creditScore: this.creditScore == null ? 0 : this.creditScore,
				isActive: this.status == null ? 0 : this.status,
				isLeader: this.leader == null ? 0 : this.leader ? 1 : 0,
				isRisk: this.risk == null ? 0 : this.risk ? 1 : 0,
				isTest: this.test == null ? 0 : this.test ? 1 : 0,
				// membershipId: this.lsLevel.mtId == null ? 0 : this.lsLevel.mtId,
				otp: otp == null ? "" : otp,
				remarks: this.remarks == null ? "" : this.remarks,
				withdrawPassword:
					this.withdrawPassword == null ? "" : this.withdrawPassword,
				loginPassword:
					this.loginPassword == null ? "" : this.loginPassword,
				email: this.email == null ? "" : this.email,
				fullName: this.fullName,
			};
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.userService.updateNormalUserInfo(apiData);
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