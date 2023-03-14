<template>
	<td>{{ rowIndex }}</td>
	<td>{{ record.actName }}</td>
	<td class="cave-table-row--center">{{ record.actUiLink }}</td>
	<td class="cave-table-row--center">{{ formattedRemarks }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>

    <td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteCategory()">{{ $messages.labelDelete() }}</a>
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
	name: "CategoryListingRow",
	mixins: [rowBehaviour,pageBehaviour],
	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedRemarks() {
			return this.record.actRemarks ? this.record.actRemarks : "-";
		},
		formattedStatusClass() {
			return this.record.actStatus != null
				? STATUS_CLASS[this.record.actStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.actStatus != null
				? this.STATUS[this.record.actStatus]
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
				name: "CategoryEditPage",
				params: { categoryId: this.record.actId },
			});
		},
		async deleteCategory() {
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

				const [error, result] =
					await this.$service.announcementService.deleteCategory(
						this.record.actId
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
