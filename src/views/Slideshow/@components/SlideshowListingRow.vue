<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.sstName }}</td>
	<td class="cave-table-row--center">{{ record.sstType }}</td>
	<td class="cave-table-row--center">{{ record.sstPriority }}</td>
	<td class="cave-table-row--center">{{ record.language }}</td>
	<td class="cave-table-row--center text-xs">{{ record.sstUrl }}</td>
	<td class="cave-table-row--center">
		<img @click="openImageInNewTab(record.fileDownloadURL)" class="image-picker"
			:src="record.fileDownloadURL" alt=""/>
	</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
	<td class="text-right" v-if="$claims.canEditSlideshow">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="goToDelete()">{{ $messages.labelDelete() }}</a>
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

export default {
	name: "SlideshowListingRow",
	mixins: [rowBehaviour, pageBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedStatusClass() {
			return this.record.sstStatus != null
				? STATUS_CLASS[this.record.sstStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.sstStatus != null
				? this.STATUS[this.record.sstStatus]
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
		openImageInNewTab(url) {
			window.open(url);
		},
		getImgUrl(url) {
			return url;
		},
		goToEdit() {
			this.$router.push({
				name: "SlideshowEditPage",
				params: { recordId: this.record.sstId },
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
				let loader = this.$loading.show({
					// Optional parameters
					container: null,
				});
				const [error, result] = await this.$service.slideshowService.delete(
					this.record.sstId
				);
				loader.hide();
				if (error) {
					this.showError(error);
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
