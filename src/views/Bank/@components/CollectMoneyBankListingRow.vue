<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.cmbtBankName }}</td>
	<td class="cave-table-row--center">{{ record.cmbtAccountName }}</td>
	<td class="cave-table-row--center">{{ record.cmbtAccountNo }}</td>

	<td class="cave-table-row--center">{{ formatted2DC(record.cmbtMinAmount) }}</td>
	<td class="cave-table-row--center">{{ record.cmbtType }}</td>
    <td class="cave-table-row--center">{{ record.bankExchangeRate }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>
	<td class="text-right" v-if="$claims.canEditTopupWallet">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteRecord()">{{ $messages.labelDelete() }}</a>
			</div>
		</div>
	</td>

</template>

<script>
import { formatMilliseconds } from "seedwork/dateFormatter";
import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

export default {
	name: "AnnouncementListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
		STATUS: {},
		record: { type: Object, required: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedLastLoginOn() {
			return this.record.utLastLoginOn
				? formatMilliseconds(this.record.utLastLoginOn)
				: "-";
		},
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedStatusClass() {
			return this.record.cmbtStatus != null
				? STATUS_CLASS[this.record.cmbtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.cmbtStatus != null
				? this.STATUS[this.record.cmbtStatus]
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
				name: "CollectMoneyBankEditPage",
				params: { recordId: this.record.cmbtId },
			});
		},
		async deleteRecord() {
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
					await this.$service.bankService.deleteCollectMoneyBankDetail(
						this.record.cmbtId
					);
				if (error) {
					loader.hide();
					this.showError(error);
				} else {
					loader.hide();
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$emit("refresh");
				}
			}
		},
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
};
</script>

<style lang="scss" scoped></style>
