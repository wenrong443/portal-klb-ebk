<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.pctTitle }}</td>
	<td class="cave-table-row--center">{{ record.pctCode }}</td>
	<td class="cave-table-row--center" style="text-align: left">
		<b>{{ $messages.fieldLabelType() }}:</b> <br>{{ record.pctType }}<br><br>
		<b>{{ $messages.fieldLabelDeductType() }}:</b> <br>{{ record.pctDeductType }}<br><br>
		<b>{{ $messages.fieldLabelWalletType() }}:</b> <br>{{ record.pctTo }}
	</td>
	<td class="cave-table-row--center">{{ record.pctValue }}</td>
	<td class="cave-table-row--center" style="text-align: left">
		<b>{{ $messages.fieldLabelMaxPerUser() }}:</b> <br>{{ record.pctMaxPerUser }}<br><br>
		<b>{{ $messages.fieldLabelMaxDistribute() }}:</b> <br>{{ record.pctMaxDistribute }}
	</td>
	<td class="cave-table-row--center" style="text-align: left">
		<b>{{ $messages.fieldLabelTotalUserClaimed() }}:</b> <br>{{ record.pctCurrentUserClaimed }}<br><br>
		<b>{{ $messages.fieldLabelTotalClaimed() }}:</b> <br>{{ record.pctCurrentClaimed }}
	</td>
	<td class="cave-table-row--center" style="text-align: left">
		<b>{{ $messages.labelFrom() }}:</b> <br>{{ record.pctValidStart }}<br><br>
		<b>{{ $messages.labelTo() }}:</b> <br>{{ record.pctValidEnd }}
	</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{ formattedStatusName }}</span>
	</td>
	<td class="text-right" v-if="$claims.canEditPromoCode">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="goToDelete()">{{ $messages.labelDelete() }}</a>
			</div>
		</div>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

import json from "../../../infrastructure/json/config.json";
import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SlideshowListingRow",
	mixins: [rowBehaviour, pageBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedStatusClass() {
			return this.record.pctStatus != null
				? STATUS_CLASS[this.record.pctStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.pctStatus != null
				? this.STATUS[this.record.pctStatus]
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
		openImageInNewTab(url) {
			window.open(url);
		},
		getImgUrl(url) {
			return url;
		},
		goToEdit() {
			this.$router.push({
				name: "PromoCodeEditPage",
				params: { recordId: this.record.pctId },
			});
		},
		async goToDelete() {
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
				const [error, result] = await this.$service.promoCodeService.delete(
					this.record.pctId
				);
				loader.hide();
				if (error) {
					this.showError(error);
				} else {
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$emit("refresh");
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
