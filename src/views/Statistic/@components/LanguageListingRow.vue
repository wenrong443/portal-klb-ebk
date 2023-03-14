<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.ltName }}</td>
	<td class="cave-table-row--center">{{ record.ltFileName }}</td>
	<td class="cave-table-row--center">{{ record.ltPriority }}</td>
	<td class="cave-table-row--center">{{ record.ltRemarks }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">{{ record.updatedDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{      formattedStatusName      }}
		</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">Action</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">Edit</a>
				<a class="dropdown-item" :href="formattedDownloadLink" target="_blank" download>Download</a>
				<a class="dropdown-item" href="#" @click="deleteRecord()">Delete</a>
			</div>
		</div>
	</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";

const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

const STATUS = {
	1: "active",
	0: "deactivated",
};

export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	data: () => ({}),
	computed: {
		formattedStatusClass() {
			return this.record.ltStatus != null
				? STATUS_CLASS[this.record.ltStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.ltStatus != null ? STATUS[this.record.ltStatus] : "-";
		},
		formattedDownloadLink() {
			return this.record.fileDownloadURL;
		},
	},
	async created() {},
	methods: {
		goToEdit() {
			this.$router.push({
				name: "LanguageEditPage",
				params: { recordId: this.record.ltId },
			});
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
				const [error, result] = await this.$service.settingService.deleteLanguage(
					this.record.ltId
				);
                loader.hide();
				if (error) {
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
