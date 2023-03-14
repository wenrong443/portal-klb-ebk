<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
					<button type="submit" class="btn btn-info btn-round" @click="showFilter()"> {{ filterWord }} </button>
				</div>
				<div class="card-body" v-if="isFilter">
					<div class="form-group">
						<label>{{$messages.fieldLabelPackage()}}</label>
                        <select class="form-control" v-model="gmpstGmpaatId">
							<option v-for="packageA in packageList" v-bind:value="packageA.gmpaatId" v-bind:key="packageA.gmpaatId">
								{{  packageA.title }}</option>
						</select>
					</div>
					<div class="cave-form">
						<div class="cave-form--input-group cave-form--input-group-two">
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortBy()}}</label>
								<select class="form-control" v-model="sortBy">
									<option v-for="sortByOption in sortByOptions" v-bind:value="sortByOption.id" v-bind:key="sortByOption.id">
										{{ sortByOption.value }} </option>
								</select>
							</div>
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortDirection()}}</label>
								<select class="form-control" v-model="sortDirection">
									<option v-for="sortDirection in sortDirectionOptions" v-bind:value="sortDirection.id"
										v-bind:key="sortDirection.id"> {{ sortDirection.value }} </option>
								</select>
							</div>
						</div>
					</div>
					<div class="card-footer card-footer-right">
						<button type="submit" class="btn btn-danger btn-round" @click="resetFilter()"> {{$messages.labelFilteringReset()}} </button>
						<button type="submit" class="btn btn-info btn-round" @click="emitSearch()"> {{$messages.labelFilteringSearch()}} </button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mixin as RecordMixin } from "../MinePackageSchedule.js";

export default {
	components: {},
	mixins: [RecordMixin],
	data: () => ({
		gmpstGmpaatId: -99,
		gmpstStatus: -99,
		sortBy: "gmpstGmpaatId",
		sortDirection: "ASC",
		isFilter: false,
        packageList: {},
	}),
	computed: {
		filterWord() {
			return this.isFilter
				? this.$messages.labelFilteringHide()
				: this.$messages.labelFilteringShow();
		},
		sortDirectionOptions() {
			return [
				{
					id: "ASC",
					value: this.$messages.labelFilteringSortAsc(),
				},
				{
					id: "DESC",
					value: this.$messages.labelFilteringSortDesc(),
				},
			];
		},
		sortByOptions() {
			return [
				{
					id: "gmpstGmpaatId",
					value: this.$messages.fieldLabelPackage(),
				},
				{
					id: "gmpstStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
			];
		},
	},
    async created() {
		await this.getFilteringOption();
	},
	methods: {
        async getFilteringOption() {
			const [error, result] =
				await this.$service.minePackageService.getAll({});
			this.packageList = [
				{
					gmpstId: -99,
					title: this.$messages.fieldLabelAll(),
				},
			];
			this.packageList = this.packageList.concat.apply(
				this.packageList,
				result.content
			);
		},
		emitSearch() {
			this.$emit("search", {
				gmpstGmpaatId: this.gmpstGmpaatId,
				gmpstStatus: this.gmpstStatus,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.gmpstGmpaatId = -99;
			this.gmpstStatus = -99;
			this.sortBy = "gmpstGmpaatId";
			this.sortDirection = "ASC";
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