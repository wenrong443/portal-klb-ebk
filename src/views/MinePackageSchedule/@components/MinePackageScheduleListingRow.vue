<template>
	<td>{{ rowIndex }}</td>
    <td class="cave-table-row--center">{{ record.packageTitle }}</td>
	<td class="cave-table-row--center">{{ record.gmpstStart }}</td>
    <td class="cave-table-row--center">{{ record.gmpstEnd }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
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

		formattedStatusClass() {
			return this.record.gmpstStatus != null
				? STATUS_CLASS[this.record.gmpstStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.gmpstStatus != null
				? this.STATUS[this.record.gmpstStatus]
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
				name: "MinePackageScheduleEditPage",
				params: { recordId: this.record.gmpstId },
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

				const [error, result] = await this.$service.minePackageService.deleteSchedule(
					this.record.gmpstId
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
