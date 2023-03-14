<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.grtTitle }}</td>
    <td class="cave-table-row--center" v-if="isV2">{{ record.displayQuantity }}</td>
	<td class="cave-table-row--center">{{ record.typeName }}</td>
	<td class="cave-table-row--center">{{ record.grtPrice }}</td>
    <td class="cave-table-row--center">
        <input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRound()"
							v-model="round" />
    </td>
	<td class="cave-table-row--center">
		<a class="dropdown-item btn btn-primary btn-round btn-block btn-sm" href="#" @click="assignTask()">{{ $messages.fieldLabelAssign() }}</a>
	</td>
</template>

<script>
import { formatMilliseconds } from "seedwork/dateFormatter";
import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AnnouncementListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
        userId: { type: Object, require: true },
		record: { type: Object, required: true },
	},
	data: () => ({
        isV2: process.env.IS_V2 == "true" ? true : false,
        round: 0
    }),
	computed: {},
	async created() {},
	methods: {
		async assignTask() {
            if (this.round == 0){
                alert(this.$messages.fieldLabelRoundIsRequired());
				return;
            }
			
				let loader = this.$loading.show({
					// Optional parameters
					container: null,
				});

                var formData = new FormData();
                formData.append("utId", this.userId);
                formData.append("grtId", this.record.grtId);
                formData.append("round", this.round);

				const [error, result] =
					await this.$service.reviewService.assignSpecialTask(
						formData
					);
				if (error) {
					loader.hide();
					this.showError(error);
				} else {
					loader.hide();
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$emit("refresh");
				}
			
		},
	},
};
</script>

<style lang="scss" scoped></style>
