<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-body" v-if="isFilter">
					<div class="row">
						<div class="col-4">
							<div class="form-group">
								<label>{{ $messages.fieldLabelAmountStart() }}</label>
								<input type="number" class="form-control" v-model="start" />
							</div>
						</div>
						<div class="col-4">
							<div class="form-group">
								<label>{{ $messages.fieldLabelAmountEnd() }}</label>
								<input type="number" class="form-control" v-model="end" />
							</div>
						</div>
						<div class="col-4">
							<div class="form-group">
								<label>{{ $messages.fieldLabelType() }}</label>
								<select class="form-control" v-model="type">
									<option v-for="typeOption in typeOptionsForFilter" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
										{{ $messages[typeOption.value]() }}
									</option>
								</select>
							</div>
						</div>
					</div>

					<div class="card-footer card-footer-right">
						<button type="submit" class="btn btn-danger btn-round" @click="resetFilter()">{{$messages.labelFilteringReset()}}</button>
						<button type="submit" class="btn btn-info btn-round" @click="emitSearch()">{{$messages.labelFilteringSearch()}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	mixins: [],
	data: () => ({
		start: -99,
		end: -99,
		type: -99,
		isFilter: true,
		typeOptionsForFilter: [
			{
				id: -99,
				value: "fieldLabelAll",
			},
			{
				id: 2,
				value: "fieldLabelDeluxe",
			},
			{
				id: 3,
				value: "fieldLabelRoyal",
			},
		],
	}),
	computed: {
		filterWord() {
			return this.isFilter
				? this.$messages.labelFilteringHide()
				: this.$messages.labelFilteringShow();
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				start: this.start,
				end: this.end,
				type: this.type,
			});
		},
		resetFilter() {
			this.start = -99;
			this.end = -99;
			this.type = -99;
			this.emitSearch();
		},
	},
};
</script>

<style>
.card-footer-right {
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: 10px;
	padding: 10px 0;
	float: right;
}

.cave-card-header {
	display: grid;
	grid-template-columns: 1fr auto;
}
</style>