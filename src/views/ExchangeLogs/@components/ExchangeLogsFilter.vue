<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
					<button type="submit" class="btn btn-info btn-round" @click="showFilter()">
						{{ filterWord }}
					</button>
				</div>
				<div class="card-body" v-if="isFilter">
                    <div class="form-group">
						<label>{{$messages.labelUsername()}}</label>
						<input type="text" class="form-control" v-model="username" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelProduct() }}</label>
						<select class="form-control" v-model="gmptId">
							<option v-for="productOption in productOptions" v-bind:value="productOption.gmptId" v-bind:key="productOption.gmptId">
								{{  productOption.gmptShortCode }}</option>
						</select>
					</div>
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelFrom()}})</label>
						<input type="date" class="form-control" v-model="start" />
					</div>

					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelTo()}})</label>
						<input type="date" class="form-control" v-model="end" />
					</div>

					<div class="card-footer card-footer-right">
						<button type="submit" class="btn btn-danger btn-round" @click="resetFilter()">
							{{$messages.labelFilteringReset()}}
						</button>
						<button type="submit" class="btn btn-info btn-round" @click="emitSearch()">
							{{$messages.labelFilteringSearch()}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data: () => ({
        username: "",
		start: new Date().toISOString().slice(0, 10),
		end: new Date().toISOString().slice(0, 10),
		utId: 0,
		gmptId: -99,
		isFilter: false,
		productOptions: {},
	}),
	async created() {
		await this.getFilteringOption();
	},
	computed: {
		filterWord() {
			return this.isFilter
				? this.$messages.labelFilteringHide()
				: this.$messages.labelFilteringShow();
		},
	},
	methods: {
		async getFilteringOption() {
			const [error, result] =
				await this.$service.mineProductService.getAll2();
			this.productOptions = [
				{
					gmptId: -99,
					gmptShortCode: this.$messages.fieldLabelAll(),
				},
			];
			this.productOptions = this.productOptions.concat.apply(
				this.productOptions,
				result.content
			);
		},
		emitSearch() {
			this.$emit("search", {
                username: this.username,
				start: this.start,
				end: this.end,
				utId: this.utId,
				gmptId: this.gmptId,
			});
		},
		resetFilter() {
            this.username = "";
			this.utId = 0;
			this.gmptId = -99;
			this.start = new Date().toISOString().slice(0, 10);
			this.end = new Date().toISOString().slice(0, 10);
			this.emitSearch();
		},
		showFilter() {
			this.isFilter = !this.isFilter;
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