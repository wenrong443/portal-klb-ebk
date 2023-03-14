<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.gmbotReducePercent }}</td>
	<td class="cave-table-row--center">{{ record.gmbotBoostPercent }}</td>
	<td class="cave-table-row--center">{{ record.shortCode }}</td>
	<td class="cave-table-row--center">{{ record.gmbotUsdtValue }}</td>
	<td class="cave-table-row--center text-xs">{{ record.gmbotRemark }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
	<td class="text-right" v-if="$claims.canEditSlideshow">
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

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "MineBoostListingRow",
	mixins: [rowBehaviour, pageBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedStatusClass() {
			return this.record.gmbotStatus != null
				? STATUS_CLASS[this.record.gmbotStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gmbotStatus != null
				? this.STATUS[this.record.gmbotStatus]
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
				name: "MineBoostEditPage",
				params: { recordId: this.record.gmbotId },
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
				const [error, result] = await this.$service.mineBoostService.delete(
					this.record.gmbotId
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
