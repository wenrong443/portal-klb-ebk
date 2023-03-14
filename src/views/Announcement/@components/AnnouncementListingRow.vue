<template>
  <td>{{ rowIndex }}</td>
  <td>{{ record.atTitle }}</td>
  <td class="cave-table-row--center">{{ record.atActIdOri.actName }}</td>
  <td class="cave-table-row--center">{{ record.atLtIdOri }}</td>
  <td class="cave-table-row--center">{{ record.createdDatetime }}</td>
  <td class="cave-table-row--center">
    <span class="badge badge-pill" v-bind:class="formattedStatusClass">
      {{
      formattedStatusName
      }}
    </span>
  </td>

  <td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteAnnouncement()">{{ $messages.labelDelete() }}</a>
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
	mixins: [ rowBehaviour, pageBehaviour],
	props: {
		record: { type: Object, required: true },
	},
	data: () => ({
        STATUS: {}
    }),
	computed: {
		formattedLastLoginOn() {
			return this.record.utLastLoginOn
				? formatMilliseconds(this.record.utLastLoginOn)
				: "-";
		},
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedStatusClass() {
			return this.record.atStatus != null
				? STATUS_CLASS[this.record.atStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.atStatus != null ? this.STATUS[this.record.atStatus] : "-";
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
				name: "AnnouncementEditPage",
				params: { announcementId: this.record.atId },
			});
		},
		async deleteAnnouncement() {
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

				const [error, result] = await this.$service.announcementService.delete(
					this.record.atId
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
