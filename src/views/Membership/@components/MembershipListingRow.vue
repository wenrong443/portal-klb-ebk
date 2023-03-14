<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.membershipTitle }}</td>
	<td class="cave-table-row--center">{{ record.membershipDescription }}</td>
	<td class="cave-table-row--center">{{ record.mtLevel }}</td>
	<td class="cave-table-row--center">
		{{ formatted2DC(record.mtPrice) }}
	</td>
	<td class="cave-table-row--center">{{ record.mtTotalTask }}</td>
    <td class="cave-table-row--center">{{ record.mtCommissionPercent }}</td>
    <td class="cave-table-row--center">{{ record.color }}</td>

	<!-- <td class="cave-table-row--center">
		{{ formatted2DC(record.mtRewardPerTask) }}
	</td>
	<td class="cave-table-row--center">
		1st: {{ formatted2DC(record.mt1stTaskReward) }} %<br />
		2nd: {{ formatted2DC(record.mt2ndTaskReward) }} %<br />
		3rd: {{ formatted2DC(record.mt3rdTaskReward) }} %<br />
	</td>
	<td class="cave-table-row--center">
		1st: {{ formatted2DC(record.mt1stTopupReward) }} %<br />
		2nd: {{ formatted2DC(record.mt2ndTopupReward) }} %<br />
		3rd: {{ formatted2DC(record.mt3rdTopupReward) }} %<br />
	</td> -->
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>

    <td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a v-if="record.mtLevel != 0" class="dropdown-item" href="#" @click="deleteRow()">{{ $messages.labelDelete() }}</a>
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
	name: "MembershipListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		formattedStatusClass() {
			return this.record.mtStatus != null
				? STATUS_CLASS[this.record.mtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.mtStatus != null
				? this.STATUS[this.record.mtStatus]
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
		formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
		},
		goToEdit() {
			if (this.record.mtLevel == 0) {
				this.$router.push({
					name: "MembershipEditPageL1",
					params: { recordId: this.record.mtId },
				});
			} else {
				this.$router.push({
					name: "MembershipEditPage",
					params: { recordId: this.record.mtId },
				});
			}
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
                let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });

				const [error, result] =
					await this.$service.membershipService.delete(
						this.record.mtId
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
