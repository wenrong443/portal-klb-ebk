<template>
	<td>{{ rowIndex }}</td>
	<td>{{ record.gmmpphtPrice }}</td>
	<td class="cave-table-row--center">{{ record.gmmpphtStartDatetime }}</td>
	<td class="cave-table-row--center">{{ record.gmmpphtEndDatetime }}</td>
	<td class="cave-table-row--center">{{ record.gmmpphtProcessedByUtUsername }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
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
