<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ formattedTitle }}</td>
	<!-- <td class="cave-table-row--center">{{ formattedDescription }}</td> -->
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>

	<td class="text-right" v-if="$claims.canEditFaq">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteRow()">{{ $messages.labelDelete() }}</a>
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
import { mixin as RecordMixin } from "../Fnq";

export default {
	name: "FnqListingRow",
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
			return languageFormatter(this.record.ftTitle, this.selectedLanguage);
		},
		formattedDescription() {
			return languageFormatter(
				this.record.ftDescription,
				this.selectedLanguage
			);
		},
		formattedStatusClass() {
			return this.record.ftStatus != null
				? STATUS_CLASS[this.record.ftStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.ftStatus != null
				? this.STATUS[this.record.ftStatus]
				: "-";
		},
		formattedLanguage() {
			const language = this.languageOptions.find(
				(d) => d.ltId == this.record.language
			);
			return language ? language.ltName : "-";
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
				name: "FnqEditPage",
				params: { recordId: this.record.ftId },
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

				const [error, result] = await this.$service.fnqService.delete(
					this.record.ftId
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
