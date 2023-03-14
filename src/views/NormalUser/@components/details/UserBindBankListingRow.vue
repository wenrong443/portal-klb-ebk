<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">
		<select class="form-control" v-model="record.ubbtUbtId" :disabled="!isEditable" v-if="record.hasDropDown">
			<option v-for="userBank in userBanks" v-bind:value="userBank.ubtId" v-bind:key="userBank.ubtId">
				{{ userBank.title }}
			</option>
		</select>
		<input v-model="record.bankName" style="width: 120px !important;" class="form-control" :disabled="!isEditable"  v-if="!record.hasDropDown"/>

	</td>
	<!-- <td class="cave-table-row--center">{{ record.ubbtAccountName }}</td> -->
	<td class="cave-table-row--center">
		<input v-model="record.ubbtAccountNo" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>

    <td class="cave-table-row--center" v-if="!record.hasDropDown">
		<input v-model="record.ubbtAccountName" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>
    <td class="cave-table-row--center" v-if="!record.hasDropDown">
		<input v-model="record.phoneNumber" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>

    <td class="cave-table-row--center" v-if="VITE_INDIA_BANK">
		<input v-model="record.ubbtExAccType" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>
    <td class="cave-table-row--center" v-if="VITE_INDIA_BANK">
		<input v-model="record.ubbtExBranch" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>
    <td class="cave-table-row--center" v-if="VITE_INDIA_BANK">
		<input v-model="record.ubbtExIfsc" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>
    <td class="cave-table-row--center" v-if="VITE_INDIA_BANK">
		<input v-model="record.ubbtExHqIfsc" style="width: 120px !important;" class="form-control" :disabled="!isEditable" />
	</td>

	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<!-- <a class="dropdown-item" href="#" @click="goToView()">{{ $messages.labelViewDetails() }}</a> -->
				<a class="dropdown-item" @click="goToEdit()"
					v-if="!isEditable && $claims.canEditUserBindedWallet">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" @click="goToSave()"
					v-if="isEditable && $claims.canEditUserBindedWallet">{{ $messages.labelSave() }}</a>
				<a class="dropdown-item" @click="deleteRecord()">{{ $messages.labelDelete() }}</a>
			</div>
		</div>
	</td>
</template> 

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

const STATUS = {
	1: "active",
	0: "suspend",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "UserBindBankListingRow",
	mixins: [rowBehaviour, pageBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
        VITE_INDIA_BANK: process.env.VITE_INDIA_BANK == "true" ? true : false,
		isEditable: false,
		userBanks: [],
	}),
	computed: {
		formattedStatusClass() {
			return this.record.ubbtStatus != null
				? STATUS_CLASS[this.record.ubbtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.ubbtStatus != null
				? STATUS[this.record.ubbtStatus]
				: "-";
		},
	},
	async created() {
		const [error, result] = await this.$service.bankService.getAdminAll({});
		if (error) {
		} else {
			this.userBanks = result.content;
		}
	},
	methods: {
		goToEdit() {
			this.isEditable = !this.isEditable;
		},
		async deleteRecord() {
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] =
				await this.$service.bankService.deleteUserBindBank(this.record.ubbtId);
			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$emit("refresh");
			}
		},
		async goToSave() {
			this.isEditable = false;

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			let request = {};
            if (this.record.hasDropDown){
                request = {
                    ubbtUbtId: this.record.ubbtUbtId,
                    ubbtAccountNo: this.record.ubbtAccountNo,
                    ubbtExAccType: this.record.ubbtExAccType,
                    ubbtExBranch: this.record.ubbtExBranch,
                    ubbtExIfsc: this.record.ubbtExIfsc,
                    ubbtExHqIfsc: this.record.ubbtExHqIfsc,
                };
            }else{
                request = {
                    phoneNumber: this.record.phoneNumber,
                    accountName: this.record.ubbtAccountName,
                    ubbtAccountNo: this.record.ubbtAccountNo,
                    bankName: this.record.bankName,
                    ubbtExAccType: this.record.ubbtExAccType,
                    ubbtExBranch: this.record.ubbtExBranch,
                    ubbtExIfsc: this.record.ubbtExIfsc,
                    ubbtExHqIfsc: this.record.ubbtExHqIfsc,
                };
            }
			const [error, result] = await this.$service.bankService.updateUserBank(
				this.record.ubbtId,
				request
			);
			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$emit("refresh");
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
