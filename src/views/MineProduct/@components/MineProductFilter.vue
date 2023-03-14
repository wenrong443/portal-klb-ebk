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
						<label>{{$messages.fieldLabelShortCode()}}</label>
						<input type="text" class="form-control" v-model="gmptShortCode" />
					</div>
					<div class="form-group">
						<label for="inputState">{{$messages.labelStatus()}}</label>
						<select class="form-control" v-model="gmptStatus">
							<option v-for="statusOption in statusOptions" v-bind:value="statusOption.id" v-bind:key="statusOption.id">
								{{ statusOption.name }} </option>
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
import { mixin as RecordMixin } from "../MineProduct.js";

export default {
	components: {},
	mixins: [RecordMixin],
	data: () => ({
		gmptShortCode: "",
		gmptStatus: -99,
		sortBy: "gmptShortCode",
		sortDirection: "ASC",
		isFilter: false,
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
					id: "gmptShortCode",
					value: this.$messages.fieldLabelShortCode(),
				},
				{
					id: "gmptStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
			];
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				gmptShortCode: this.gmptShortCode,
				gmptStatus: this.gmptStatus,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.gmptShortCode = "";
			this.gmptStatus = -99;
			this.sortBy = "gmptShortCode";
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