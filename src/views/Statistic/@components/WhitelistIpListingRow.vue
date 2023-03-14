<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.witIp }}</td>
	<td class="cave-table-row--center">{{ record.witLastAccessedBy_Username }}</td>
	<td class="cave-table-row--center">{{ formattedLastAccessedAt }}</td>
	<td class="cave-table-row--center">{{ record.witRemarks }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">{{ record.updatedDatetime }}</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">Action</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="deleteRecord()">Delete</a>
			</div>
		</div>
	</td>
</template>

<script>
import rowBehaviour from "seedwork/mixins/rowBehaviour";
export default {
	name: "LanguageListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	data: () => ({}),
	computed: {
		formattedLastAccessedAt() {
			return this.record.witLastAccessedOn ? this.record.witLastAccessedOn : "-";
		},
	},
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
				const [
					error,
					result,
				] = await this.$service.settingService.deleteWhitelistIp(
					this.record.witId
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
