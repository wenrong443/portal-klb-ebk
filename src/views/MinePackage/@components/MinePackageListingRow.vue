<template>
	<td>{{ rowIndex }}</td>
    <td class="cave-table-row--center">{{ record.gmpaatGmptShortCode }}</td>
	<td class="cave-table-row--center">{{ record.packageTitle }}</td>
    <td class="cave-table-row--center">{{ formatted6DC(record.gmpaatRewardPerDay) }}</td>
    <td class="cave-table-row--center">{{ record.gmpaatValidityDay }}</td>
    <td class="cave-table-row--center">{{ formatted2DC(record.gmpaatPackagePrice) }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
        <span class="badge badge-pill" v-bind:class="formattedConditionalClass">
			{{
      formattedConditionalName
      }}
		</span>
    </td>
    <td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{
      formattedStatusName
      }}
		</span>
	</td>
	<td class="text-right" v-if="$claims.canEditMinePackage">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" >
				<!-- <a class="dropdown-item" href="#" @click="goToView()">{{ $messages.labelViewDetails() }}</a> -->
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
        CAN_SUBSCRIBE: {}
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
			return this.record.gmpaatStatus != null
				? STATUS_CLASS[this.record.gmpaatStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gmpaatStatus != null
				? this.STATUS[this.record.gmpaatStatus]
				: "-";
		},
        formattedConditionalClass() {
			return this.record.conditionalGmpaatId != null
				? (this.record.conditionalGmpaatId == 0 ? "badge-info" : "badge-success")
				: "";
		},
        formattedConditionalName() {
			return this.record.conditionalGmpaatId != null
				? (this.record.conditionalGmpaatId == 0 ? "No" : "Yes")
				: "";
		},
        formattedCanSubscribeMultiple() {
            return this.record.gmptCanSubscribeMultiplePackage != null
				? this.CAN_SUBSCRIBE[this.record.gmptCanSubscribeMultiplePackage]
				: "-";
        }
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
				name: "MinePackageEditPage",
				params: { recordId: this.record.gmpaatId },
			});
		},
		// goToView() {
		// 	this.$router.push({
		// 		name: "MineProductDetailPage",
		// 		params: { recordId: this.record.gmptId },
		// 	});
		// },
        formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
         formatted6DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(12);
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

				const [error, result] = await this.$service.minePackageService.delete(
					this.record.gmpaatId
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
	},
};
</script>

<style lang="scss" scoped></style>
