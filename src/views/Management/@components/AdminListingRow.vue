<template>
	<td>{{ rowIndex }}</td>
	<td>{{ record.utUsername }}</td>
	<td class="cave-table-row--center">{{ record.utFullname }}</td>
	<td class="cave-table-row--center">{{ formattedMobileNumber }}</td>
	<td class="cave-table-row--center">{{ record.utDepartmentId_ori }}</td>
	<td class="cave-table-row--center">{{ formattedRemarks }}</td>
	<td class="cave-table-row--center">
		{{ formattedLastLoginIp }} <br /><small style="font-size: smaller">{{
      formattedLastLoginOn
    }}</small>
	</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{ formattedStatusName  }}</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToShowQRCode()">{{ $messages.fieldLabelViewOTP() }}</a>
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteManagementUser()">{{ $messages.labelDelete() }}</a>
			</div>
		</div>
	</td>
</template>

<script>
import { formatMilliseconds } from "seedwork/dateFormatter";
import rowBehaviour from "seedwork/mixins/rowBehaviour";

const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

export default {
	name: "AdminListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedMobileNumber() {
			return (
				"(" + this.record.utCountryCode + ") " + this.record.utMobileNumber
			);
		},
		formattedLastLoginOn() {
			return this.record.utLastLoginOn
				? formatMilliseconds(this.record.utLastLoginOn)
				: "-";
		},
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedRemarks() {
			return this.record.utRemarks ? this.record.utRemarks : "-";
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
	},
	async created() {
		this.STATUS = {
			1: this.$messages.labelActive(),
			0: this.$messages.labelSuspend(),
		};
	},
	methods: {
		goToEdit() {
			this.$router.push({
				name: "AdminEditPage",
				params: { userId: this.record.utId },
			});
		},
		goToShowQRCode() {
			window.open("/qrcode/view/" + this.record.utId);
		},
		async deleteManagementUser() {
			const value = await this.$swal({
				title: this.$messages.labelAreYouSure(),
				text: this.$messages.labelYourWontBeAbleToRevertThis(),
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: this.$messages.fieldLabelYes(),
				cancelButtonText: this.$messages.fieldLabelNo(),
			}).then((value) => {
				return value;
			});

			if (value.isConfirmed) {
				let loader = this.$loading.show({
					// Optional parameters
					container: null,
				});

				const [error, result] =
					await this.$service.managementService.deleteUser(this.record.utId);
				if (error) {
					loader.hide();
				} else {
					loader.hide();
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$emit("refresh");
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
