<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ formattedTitle }}</td>
	<td class="cave-table-row--center">{{ formattedDescription }}</td>
	<td class="cave-table-row--center">
		{{ formattedMissionType }}
	</td>
	<td class="cave-table-row--center">{{ formattedRepeatType }}</td>
	<td class="cave-table-row--center">
		{{ formattedReward }}
	</td>
	<td class="cave-table-row--center">{{ formattedAddInfo }}</td>
	<td class="cave-table-row--center">{{ record.mitCreatedByUtUsername }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
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
				<a class="dropdown-item" href="#" v-if="$claims.canEditGeneralMission"
					@click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" v-if="$claims.canEditGeneralMission"
					@click="deleteRow()">{{ $messages.labelDelete() }}</a>
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
import { languageFormatter } from "seedwork/languageFormatter";
import { mixin as RecordMixin } from "../Mission";

export default {
	name: "MissionListingRow",
	mixins: [rowBehaviour, pageBehaviour, RecordMixin],
	props: {
		record: { type: Object, require: true },
		selectedLanguage: { type: Number, require: true },
	},
	data: () => ({
		STATUS: {},
		currency: json.currency,
	}),
	computed: {
		formattedTitle() {
			return languageFormatter(this.record.mitTitle, this.selectedLanguage);
		},
		formattedDescription() {
			return languageFormatter(
				this.record.mitDescription,
				this.selectedLanguage
			);
		},
		formattedAddInfo() {
			return this.record.mitAddInfo1 ? this.record.mitAddInfo1 : "-";
		},
		formattedRepeatType() {
			const label =
				this.record.mitRepeatType == 1
					? this.$messages.fieldLabelShowOnceOnly()
					: this.$messages.labelRepeatReset();
			return this.record.mitRepeatType != null ? label : "";
		},
		formattedStatusClass() {
			return this.record.mitStatus != null
				? STATUS_CLASS[this.record.mitStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.mitStatus != null
				? this.STATUS[this.record.mitStatus]
				: "-";
		},
		formattedLanguage() {
			const language = this.languageOptions.find(
				(d) => d.ltId == this.record.language
			);
			return language ? language.ltName : "-";
		},
		formattedMissionType() {
			const missionType = this.missionTypes.find(
				(d) => d.id == this.record.mitType
			);
			return missionType ? this.$messages[missionType.value]() : "-";
		},
		formatted2DC() {
			let nums = (parseFloat(this.record.mitRewardAmount) / 100) * 100.0;
			return nums.toFixed(2);
		},
		formattedReward() {
			const amount =
				this.record.mitRewardType == "CASH"
					? json.currency + " " + this.formatted2DC
					: this.formatted2DC + " %";
			return this.record.mitRewardType != null ? amount : "";
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
				name: "MissionEditPage",
				params: { recordId: this.record.mitId },
			});
		},
		async deleteRow() {
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

				const [error, result] = await this.$service.missionService.delete(
					this.record.mitId
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
