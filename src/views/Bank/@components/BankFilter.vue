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
						<label>{{$messages.fieldLabelSwiftCode()}}</label>
						<input type="email" class="form-control" v-model="ubtSwift" />
					</div>
					<div class="form-group">
						<label for="inputState">{{$messages.fieldLabelType()}}</label>
						<select class="form-control" v-model="ubtType">
							<option v-for="statusOption in typeFilter" v-bind:value="statusOption.id" v-bind:key="statusOption.id">
								{{ statusOption.value }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{$messages.labelFilteringSortStatus()}}</label>
						<select class="form-control" v-model="ubtStatus">
							<option v-for="statusOption in statusOptions" v-bind:value="statusOption.id" v-bind:key="statusOption.id">
								{{ statusOption.name }}
							</option>
						</select>
					</div>

					<div class="cave-form">
						<div class="cave-form--input-group cave-form--input-group-two">
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortBy()}}</label>
								<select class="form-control" v-model="sortBy">
									<option v-for="sortByOption in sortByOptions" v-bind:value="sortByOption.id" v-bind:key="sortByOption.id">
										{{ sortByOption.value }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortDirection()}}</label>
								<select class="form-control" v-model="sortDirection">
									<option v-for="sortDirection in sortDirectionOptions" v-bind:value="sortDirection.id"
										v-bind:key="sortDirection.id">
										{{ sortDirection.value }}
									</option>
								</select>
							</div>
						</div>
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
import { mixin as RecordMixin } from "../Bank";
export default {
	components: {},
	mixins: [RecordMixin],
	data: () => ({
		ubtStatus: -99,
		ubtSwift: "",
		ubtType: "",
		sortBy: "ubtId",
		sortDirection: "ASC",
		isFilter: false,
		typeFilter: [],
		statusOptions: [],
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
					id: "ubtId",
					value: "ID",
				},
				{
					id: "ubtSwift",
					value: this.$messages.fieldLabelSwiftCode(),
				},
				{
					id: "ubtType",
					value: this.$messages.fieldLabelType(),
				},
				{
					id: "ubtStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
			];
		},
	},
	async created() {
		this.initFilter();
	},
	methods: {
		initFilter() {
			this.typeFilter = [
				{
					id: "",
					value: this.$messages.fieldLabelAll(),
				},
				{
					id: "CRYTO",
					value: this.$messages.fieldLabelCollectTypeCryto(),
				},
                {
					id: "BANK",
					value: this.$messages.fieldLabelCollectTypeBank(),
				},
			];
			this.statusOptions = [
				{
					id: -99,
					name: this.$messages.fieldLabelAll(),
				},
				{
					id: 1,
					name: this.$messages.labelActive(),
				},
				{
					id: 0,
					name: this.$messages.labelActive(),
				},
			];
		},
		emitSearch() {
			this.$emit("search", {
				ubtStatus: this.ubtStatus,
				ubtSwift: this.ubtSwift,
				ubtType: this.ubtType,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.ubtStatus = -99;
			this.ubtSwift = "";
			this.ubtType = "";
			this.sortBy = "ubtId";
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