<template>
	<div class="paper-table table table-striped table-bordered p-2">
		<div class="form-group">
			<label>{{ $messages.fieldLabelRedPacketSub() }}</label>
			<button class=" btn btn-primary btn-round btn-sm form-control" type="button"
				@click="addNewLine">{{ $messages.labelButtonAdd() }}</button>
		</div>
		<div class="paper-table-body" :key="componentKey">
			<div class="paper-table-rows " v-for="(record, index) in updatedRecords" v-bind:key="record.id">
				<div class="red-packet-sub">
                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProduct() }}</label>
						<select class="form-control" v-model="record.rpptPrizeType">
							<option v-for="product in productList" v-bind:value="product.gmptId" v-bind:key="product.gmptId">
								{{ product.gmptShortCode }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRedPacketSubPrizeAmount() }}</label>
						<input type="text" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRedPacketSubPrizeAmount()"
							v-model="record.rpptPrizeAmount" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRedPacketSubPrizeStock() }}</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRedPacketSubPrizeStock()"
							v-model="record.rpptPrizeStock" />
					</div>
					<div class="form-group red-packet-sub--button">
						<button class="btn btn-danger btn-round btn-sm " type="button"
							@click="deleteNewRow(index)">{{ $messages.labelButtonDelete() }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import pageBehaviour from "seedwork/mixins/pageBehaviour";
export default {
	name: "",
	mixins: [pageBehaviour],
	components: {},
	props: {
		records: { type: Array, required: false, default: () => [] },
		sortBy: { type: String, required: false },
		sortDirection: { type: String, required: false },
        productList: { type: Array },
	},
	data: () => ({
		updatedRecords: [],
		componentKey: 0,
	}),
	async created() {
		this.updatedRecords = this.records;
	},
	computed: {},
	methods: {
		addNewLine() {
			this.componentKey++;
			this.updatedRecords.push({
				rpptId: 0,
				rpptPrizeAmount: 0,
				rpptPrizeStock: 0,
                rpptPrizeType: 0
			});
		},
		deleteNewRow(id) {
			this.componentKey++;
			this.updatedRecords.splice(id, 1);
		},
	},
	watch: {},
};
</script>
<style lang="scss">
.red-packet-sub {
	display: grid;
	grid-auto-flow: column;
	grid-gap: 10px;
	.red-packet-sub--button {
		align-self: flex-end;
	}
}
</style>
