<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ formattedTitle }}</td>
	<td class="cave-table-row--center">
		{{ record.rptMaxPerUser }}
	</td>
	<td class="cave-table-row--center">{{ record.rptStart }}</td>
	<td class="cave-table-row--center">{{ record.rptEnd }}</td>
    <td class="cave-table-row--center">{{ record.rptTotalDistributePax }}</td>
    <td class="cave-table-row--center">{{ formatted2DC }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill"
			v-bind:class="formattedStatusClass">{{ formattedStatusName }}</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button
				class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm"
				type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right"
				aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#"
					@click="goToEdit()">{{ $messages.labelEdit() }}</a>
                    <a class="dropdown-item" href="#"
					@click="goToDuplicate()">{{ $messages.labelDuplicate() }}</a>
				<a class="dropdown-item" href="#"
					@click="goToDelete()">{{ $messages.labelDelete() }}</a>
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
import { languageFormatter } from "seedwork/languageFormatter";
import { mixin as RecordMixin } from "../RedPacket";
export default {
	name: "RankingListingRow",
	mixins: [rowBehaviour, pageBehaviour, RecordMixin],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
        formatted2DC() {
			let nums = (parseFloat(this.record.rptTotalDistributeAmount) / 100) * 100.0;
			return nums.toFixed(2);
		},
		formattedMissionType() {
			const option = this.modeOptions.find((d) => d.id == this.record.rmtMode);
			return option ? this.$messages[option.value]() : "-";
		},
		formattedTitle() {
			return languageFormatter(this.record.rptTitle);
		},
		formattedStatusClass() {
			return this.record.rptStatus != null
				? STATUS_CLASS[this.record.rptStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.rptStatus != null
				? this.STATUS[this.record.rptStatus]
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
				name: "RedPacketEditPage",
				params: { recordId: this.record.rptId },
			});
		},
        goToDuplicate() {
			this.$router.push({
				name: "RedPacketDuplicatePage",
				params: { recordId: this.record.rptId },
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
				this.setLoading();
				const [error, result] = await this.$service.redPacketService.delete(
					this.record.rptId
				);
				if (error) {
					this.showError(error);
				} else {
					this.setCompleted();
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$emit("refresh");
				}
			}
		},
	},
};
</script>
