<template>
	<td>
		<input type="checkbox" v-model="selected" />
	</td>
	<td>{{ rowIndex }}</td>
	<td>
		<div class="user">
			<div class="photo">
				<img style="height: 20px; width: 20px" :src="getImgUrl(record.utProfileImage)" alt="" />
				{{ record.utUsername }}<br><small>({{ record.utReferrerCode }})</small>
			</div>
		</div>
	</td>
	<td class="cave-table-row--center">{{ formattedFullName }}</td>
        	<td class="cave-table-row--center">{{ formattedUpline }}</td>

	<td class="cave-table-row--center"><b>{{ formattedWalletInfo2 }}</b><br>{{ formattedWalletInfo }}</td>
	<td class="cave-table-row--center"><b>{{ formattedWalletInfo2_2 }}</b><br>{{ formattedWalletInfo_2 }}</td>
	<!-- <td class="cave-table-row--right">
		{{ formatted2DC(record.utBalanceDeposit) }}
	</td> -->
	<td class="cave-table-row--right">
		{{ formatted2DC(record.utBalanceWithdraw) }}
	</td>
	<!-- <td class="cave-table-row--center">
		{{ formattedLastLoginIp }} <br /><small style="font-size: smaller">{{
      formattedLastLoginOn
    }}</small>
	</td>
	<td class="cave-table-row--center">
		{{ formattedRegisteredIp }}
	</td> -->
    	<td class="cave-table-row--center">{{ record.totalAvailableForToday - record.totalCompletedByToday }} / {{ record.totalAvailableForToday }}</td>
	<td class="cave-table-row--center">{{ record.totalOnhold }} / 1</td>
<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatus2Class">{{
      formattedStatus2Name
    }}</span>
	</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedTestClass">{{
      formattedTestName
    }}</span>
	</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" @click="goToView()">{{ $messages.labelViewDetails() }}</a>
				<a class="dropdown-item" v-if="$claims.canEditTaskTaken" @click="goToOnHold()">{{ $messages.labelOnHoldManagement() }}</a>
				<a class="dropdown-item" v-if="$claims.canAddDepositRecord" @click="createDepositManualFund(true)">{{ $messages.fieldLabelCreateDeposit() }}</a>
				<a class="dropdown-item" v-if="$claims.canAddFreeCash" @click="createDepositManualFund(false)">{{ $messages.fieldLabelCreateManualFund() }}</a>
				<a class="dropdown-item" @click="viewMoneyLogs()">{{ $messages.labelMenuCashFlowList() }}</a>


                
			</div>
		</div>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "NormalUserListingRow",
	mixins: [rowBehaviour],

	props: {
		record: { type: Object, require: true },
		selectedItems: { type: Array, require: true },
	},
	data: () => ({
		STATUS: {},
        		STATUS2: {},

		currency: json.currency,
	}),
	computed: {
		selected: {
			get: function () {
				return this.selectedItems &&
					this.selectedItems.find((item) => item === this.record.utId)
					? true
					: false;
			},
			set: function (value) {
				const index = this.selectedItems.indexOf(this.record.utId);
				if (index > 0) {
					this.selectedItems = this.selectedItems.splice(index, 1);
				} else {
					this.$emit("selected", {
						id: this.record.utId,
						selected: this.selected,
					});
				}
			},
		},
		formattedRegisteredIp() {
			return this.record.registeredIp ? this.record.registeredIp : "-";
		},
		formattedWalletInfo2() {
			return this.record.ubbtUbtNameShort1
				? this.record.ubbtUbtNameShort1
				: "-";
		},
		formattedWalletInfo() {
			return this.record.ubbtAccountNo1
				? this.record.ubbtAccountNo1
				: "-";
		},
		formattedWalletInfo2_2() {
			return this.record.ubbtUbtNameShort2
				? this.record.ubbtUbtNameShort2
				: "-";
		},
		formattedWalletInfo_2() {
			return this.record.ubbtAccountNo2
				? this.record.ubbtAccountNo2
				: "-";
		},
		formattedFullName() {
			return this.record.utFullname ? this.record.utFullname : "-";
		},
        formattedUpline() {
			return this.record.upline ? this.record.upline : "-";
		},
		formattedLastLoginOn() {
			return this.record.utLastLoginOn ? this.record.utLastLoginOn : "-";
		},
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedStatusClass() {
			return this.record.utStatus != null
				? STATUS_CLASS[this.record.utStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.utStatus != null
				? this.STATUS[this.record.utStatus]
				: "-";
		},
        formattedStatus2Class() {
            if (this.record.online != null){
                if (this.record.online){
                    return STATUS_CLASS[1];
                }else{
                    return STATUS_CLASS[0];
                }
            }else{
                return "";
            }
		},
		formattedStatus2Name() {
            if (this.record.online != null){
                if (this.record.online){
                    return this.STATUS2[1];
                }else{
                    return this.STATUS2[0];
                }
            }else{
                return "";
            }
		},
		formattedTestClass() {
			return this.record.testUser != null
				? this.record.testUser
					? "badge-info"
					: "badge-success"
				: "";
		},
		formattedTestName() {
			return this.record.testUser != null
				? this.record.testUser
					? "Yes"
					: "No"
				: "-";
		},
	},
	async created() {
		this.STATUS = {
			1: this.$messages.labelActive(),
			0: this.$messages.labelSuspend(),
		};

        this.STATUS2 = {
			1: this.$messages.fieldLabelYes(),
			0: this.$messages.fieldLabelNo(),
		};
	},
	methods: {
		getImgUrl(index) {
			index = index % json.totalProfileImages;
			var images = require.context(
				"../../../assets/img/profile",
				false,
				/\.png$/
			);
			return images("./" + index + ".png");
		},
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
		goToView() {
			this.$router.push({
				name: "NormalUserDetailPage",
				params: { recordId: this.record.utId },
			});
		},
        viewMoneyLogs(){
            this.$router.push({
					name: "MoneyLogsSummaryPage2",
					params: { utId: this.record.utId},
				});
        },
		createDepositManualFund(isDeposit) {
			if (isDeposit) {
                this.$parent.showQuickView2(this.record.utId, this.record.utUsername);

				// this.$router.push({
				// 	name: "AddDepositRecordPage",
				// 	params: { recordId: this.record.utId, isDeposit: true },
				// });
			} else {
                this.$parent.showQuickView3(this.record.utId), this.record.utUsername;

				// this.$router.push({
				// 	name: "AddManualFundRecordPage",
				// 	params: { recordId: this.record.utId, isDeposit: false },
				// });
			}
		},
		goToOnHold() {
            this.$parent.showQuickView1(this.record.utId);
			// this.$router.push({
			// 	name: "OnHoldUserDetailPage",
			// 	params: { recordId: this.record.utId },
			// });
		},
	},
};
</script>

<style lang="scss" scoped></style>
