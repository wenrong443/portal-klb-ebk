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
						<label>{{$messages.labelUsername()}}</label>
						<input type="text" class="form-control" v-model="gmbtUtUsername" />
					</div>
					<div class="form-group">
						<label for="inputState">{{$messages.fieldLabelShortCode()}}</label>
						<input type="text" class="form-control" v-model="gmbtGmptShortCode" />
					</div>
                    <div class="form-group">
						<label for="inputState">{{$messages.fieldLabelType()}}</label>
						<select class="form-control" v-model="type">
							<option v-for="statusOption in typeOptions" v-bind:value="statusOption.id" v-bind:key="statusOption.id">
								{{ statusOption.name }} </option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{$messages.labelStatus()}}</label>
						<select class="form-control" v-model="gmbtStatus">
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
		gmbtUtUsername: "",
		gmbtGmptShortCode: "",
        type: -99,
		gmbtStatus: -99,
		sortBy: "gmbtId",
		sortDirection: "ASC",
		isFilter: false,
		statusOptions: [],
        typeOptions: [],
		productOptions: [],
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
					id: "gmbtId",
					value: "ID",
				},
				{
					id: "gmbtStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
			];
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				gmbtUtUsername: this.gmbtUtUsername,
				gmbtGmptShortCode: this.gmbtGmptShortCode,
                type: this.type,
				gmbtStatus: this.gmbtStatus,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.gmbtUtUsername = "";
			this.gmbtGmptShortCode = "";
			this.gmbtStatus = -99;
            this.type = -99;
			this.sortBy = "gmbtId";
			this.sortDirection = "ASC";
			this.emitSearch();
		},
		showFilter() {
			if (this.$route.path == "/mine/mineproduct/booking/active") {
				this.statusOptions = [
					{
						id: 1,
						name: this.$messages.labelActive(),
					},
				];
			} else {
				this.statusOptions = [
					{
						id: 2,
						name: this.$messages.fieldLabelFullyDistributed(),
					},
					{
						id: "-2",
						name: this.$messages.fieldLabelCancelledDueToUpgrade(),
					},
				];
			}

            this.typeOptions = [
					{
						id: -99,
						name: "All",
					},
					{
						id: 1,
						name: this.$messages.fieldLabelNewPurchase(),
					},
                    {
						id: 2,
						name: this.$messages.fieldLabelUpgrade(),
					},
				];

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