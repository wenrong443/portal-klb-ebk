<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.drdtType }}</td>
	<td>
		<div class="user">
			<div class="photo">
				<img style="height: 35px; width: 35px" :src="getImgUrl(record.drdtProfileImage)" /> {{ formattedMobileNumber }}
			</div>
		</div>
	</td>
	<td class="cave-table-row--center">
		{{ formatted2DC(record.drdtAmount) }}
	</td>
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
import json from "../../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "RankingListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedMobileNumber() {
			return (
				"(" +
				this.record.drdtCountryCode +
				") " +
				this.record.drdtMobileNumber
			);
		},
		formattedStatusClass() {
			return this.record.drdtStatus != null
				? STATUS_CLASS[this.record.drdtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.drdtStatus != null
				? this.STATUS[this.record.drdtStatus]
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
		goToEdit() {
			this.$router.push({
				name: "RankingEditPage",
				params: { recordId: this.record.drdtId },
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
				const [error, result] =
					await this.$service.rankingService.delete(
						this.record.drdtId
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
