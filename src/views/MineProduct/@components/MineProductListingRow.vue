<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.gmptShortCode }}</td>
	<td class="cave-table-row--center">{{ record.title }}</td>
	<!-- <td class="cave-table-row--center">{{ formattedCanSubscribeMultiple }}</td> -->
	<td class="cave-table-row--center">{{ formatted2DC(record.gmptMinExchange) }}</td>
	<td class="cave-table-row--center">{{ formatted2DC(record.gmptMaxExchange) }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>
	<td class="text-right" v-if="$claims.canEditMineProduct">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToView()">{{ $messages.labelViewDetails() }}</a>
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
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
		CAN_SUBSCRIBE: {},
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
			return this.record.gmptStatus != null
				? STATUS_CLASS[this.record.gmptStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gmptStatus != null
				? this.STATUS[this.record.gmptStatus]
				: "-";
		},
		formattedCanSubscribeMultiple() {
			return this.record.gmptCanSubscribeMultiplePackage != null
				? this.CAN_SUBSCRIBE[this.record.gmptCanSubscribeMultiplePackage]
				: "-";
		},
	},
	async created() {
		this.STATUS = {
			1: this.$messages.labelActive(),
			0: this.$messages.labelSuspend(),
		};
		this.CAN_SUBSCRIBE = {
			1: this.$messages.fieldLabelYes(),
			0: this.$messages.fieldLabelNo(),
		};
	},
	methods: {
		goToEdit() {
			this.$router.push({
				name: "MineProductEditPage",
				params: { recordId: this.record.gmptId },
			});
		},
		goToView() {
			this.$router.push({
				name: "MineProductPricePage",
				params: { recordId: this.record.gmptId },
			});
		},
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
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

				const [error, result] = await this.$service.mineProductService.delete(
					this.record.gmptId
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
