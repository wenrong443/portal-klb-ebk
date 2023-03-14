<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ formattedTitle }}</td>
	<td class="cave-table-row--center">
		{{ formattedMissionType }}
	</td>
	<td class="cave-table-row--center">{{ record.rmtStart }}</td>
	<td class="cave-table-row--center">{{ record.rmtEnd }}</td>
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
import { mixin as RecordMixin } from "../Ranking";
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
		formattedMissionType() {
			const option = this.modeOptions.find((d) => d.id == this.record.rmtMode);
			return option ? this.$messages[option.value]() : "-";
		},
		formattedTitle() {
			return languageFormatter(this.record.rmtTitle);
		},
		formattedStatusClass() {
			return this.record.rmtStatus != null
				? STATUS_CLASS[this.record.rmtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.rmtStatus != null
				? this.STATUS[this.record.rmtStatus]
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
				name: "RankingModeEditPage",
				params: { recordId: this.record.rmtId },
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
				const [error, result] = await this.$service.rankingModeService.delete(
					this.record.rmtId
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
