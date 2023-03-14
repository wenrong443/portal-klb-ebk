<template>
	<td>{{ rowIndex }}</td>
	<td>{{ record.dtName }}</td>
	<td class="cave-table-row--center">{{ formattedRemarks }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
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
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteDepartment()">{{ $messages.labelDelete() }}</a>
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
	name: "DepartmentListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedRemarks() {
			return this.record.dtRemarks ? this.record.dtRemarks : "-";
		},
		formattedStatusClass() {
			return this.record.dtStatus != null
				? STATUS_CLASS[this.record.dtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.dtStatus != null
				? this.STATUS[this.record.dtStatus]
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
				name: "DepartmentEditPage",
				params: { departmentId: this.record.dtId },
			});
		},
		goToShowQRCode() {
			window.open(this.record.googleAuthenticatorURL);
		},
		async deleteDepartment() {
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
					await this.$service.managementService.deleteDepartment(
						this.record.dtId
					);
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
