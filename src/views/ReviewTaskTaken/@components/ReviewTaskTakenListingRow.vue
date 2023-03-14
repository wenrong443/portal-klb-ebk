<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.customerUsername }}</td>
	<td class="cave-table-row--center">{{ record.grttGrtTitle }}</td>
	<td class="cave-table-row--center">{{ record.type }}</td>
	<td class="cave-table-row--center">{{ record.grttCommissionTaken }}</td>
	<td class="cave-table-row--center">
		{{ $messages.labelReviewGoodRating() }}: {{ record.grttGoodReviewRating }}<br>
		{{ $messages.labelReviewBadRating() }}: {{ record.grttBadReviewRating }}
	</td>
	<td class="cave-table-row--center">{{ record.updatedDatetime }}</td>
	<td class="cave-table-row--center">{{ record.adminUsername }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
	<td class="cave-table-row--center">
		<div class="dropdown">
			<!-- <button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"> -->
				<a class="dropdown-item btn btn-primary btn-block btn-sm" href="#" v-if="record.grttStatus == 1 && $claims.canEditTaskTaken"  @click="goToRelease()">{{ $messages.labelRelease() }}</a>
                <br>
				<a class="dropdown-item btn btn-success btn-block btn-sm" href="#" v-if="record.grttStatus == 2 && $claims.canEditTaskTaken" @click="goToApprove(true)">{{ $messages.labelApprove() }}</a>
				<br>
                <a class="dropdown-item btn btn-danger btn-block btn-sm" href="#" v-if="record.grttStatus == 2 && $claims.canEditTaskTaken" @click="goToApprove(false)">{{ $messages.labelReject() }}</a>
			<!-- </div> -->
		</div>
	</td>
</template>

<script>
const STATUS_CLASS = {
	"-1": "badge-success",
	0: "badge-info",
	1: "badge-danger",
	2: "badge-danger",
	3: "badge-success",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import json from "../../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "ReviewTaskListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedStatusClass() {
			return this.record.grttStatus != null
				? STATUS_CLASS[this.record.grttStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.grttStatus != null
				? this.STATUS[this.record.grttStatus]
				: "-";
		},
	},
	async created() {
		this.STATUS = {
			"-1": this.$messages.fieldLabelRejected(),
			0: this.$messages.fieldLabelInProgress(),
			1: this.$messages.fieldLabelOnHold(),
			2: this.$messages.fieldLabelInReview(),
			3: this.$messages.fieldLabelCompleted(),
		};
	},
	methods: {
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
		async goToRelease() {
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			var formData = new FormData();
			formData.append("grttId", this.record.grttId);
			formData.append("utId", this.record.grttUtId);
			const [error, result] =
				await this.$service.reviewService.releaseOnHoldTask(formData);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$emit("refresh");
			}
		},
        async goToApprove(isApprove) {
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			var formData = new FormData();
			formData.append("grttId", this.record.grttId);
			formData.append("utId", this.record.grttUtId);
            formData.append("approve", isApprove);
			const [error, result] =
				await this.$service.reviewService.approveDenyTask(formData);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$emit("refresh");
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
