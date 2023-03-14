<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.grtTitle }}</td>
    <td class="cave-table-row--center" v-if="isV2">{{ record.displayQuantity }}</td>

	<td class="cave-table-row--center">{{ record.grtPrice }}</td>
	<td class="cave-table-row--center">{{ record.grotRound }}</td>
	<td class="cave-table-row--center">{{ record.assignBy }}</td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{
      formattedStatusName
    }}</span>
	</td>
    <td class="cave-table-row--center">
		<div class="dropdown">
			<a class="dropdown-item btn btn-danger btn-round btn-block btn-sm" href="#" v-if="record.grotStatus == 0" @click="goToDelete()">{{ $messages.labelDelete() }}</a>
		</div>
	</td>
</template> 

<script>
const STATUS_CLASS = {
	"-1": "badge-danger",
	0: "badge-info",
	1: "badge-success",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "OnHoldHistoryListingRow",
	mixins: [rowBehaviour, pageBehaviour],

	props: {
		record: { type: Object, require: true },
	},
	data: () => ({
        isV2: process.env.IS_V2 == "true" ? true : false,
		STATUS: [],
	}),
	computed: {
		formattedStatusClass() {
			return this.record.grotStatus != null
				? STATUS_CLASS[this.record.grotStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.grotStatus != null
				? this.STATUS[this.record.grotStatus]
				: "-";
		},
	},
	async created() {
		this.STATUS = {
			"-1": this.$messages.labelRemoved(),
			0: this.$messages.labelPending(),
			1: this.$messages.labelTaken(),
		};
	},
	methods: {
        async goToDelete() {
            let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });
                
            const [error, result] =
					await this.$service.reviewService.removeSpecialTask(
						this.record.grotId
					);
                    loader.hide();
				if (error) {
					this.showError(error);
				} else {
					this.$swal("", this.$messages.labelSuccess(), "success");
                    this.record.grotStatus = -1;
					// this.$emit("refresh");
				}
        }
    },
};
</script>

<style lang="scss" scoped></style>
