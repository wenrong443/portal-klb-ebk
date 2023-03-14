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
						<label>{{ $messages.fieldLabelAccountName() }}</label>
						<input type="email" class="form-control" v-model="cmbtAccountName" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelAccountNo() }}</label>
						<input type="email" class="form-control" v-model="cmbtAccountNo" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelBankName() }}</label>
						<input type="email" class="form-control" v-model="cmbtBankName" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelMinAmount() }}</label>
						<input type="email" class="form-control" v-model="cmbtMinAmount" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<input type="email" class="form-control" v-model="cmbtRemarks" />
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.labelFilteringSortStatus() }}</label>
						<select class="form-control" v-model="cmbtStatus">
							<option v-for="statusOption in statusOptions" v-bind:value="statusOption.id" v-bind:key="statusOption.id">
								{{ statusOption.name }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="type">
							<option v-for="typeOption in typeOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}
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
import { mixin as RecordMixin } from "../CollectMoneyBank";

export default {
	components: {},
	mixins: [RecordMixin],
	data: () => ({
		cmbtAccountName: "",
		cmbtAccountNo: "",
		cmbtBankName: "",
		cmbtStatus: -99,
		cmbtType: "",
		sortBy: "cmbtAccountName",
		sortDirection: "ASC",
		isFilter: false,
	}),
	computed: {
		filterWord() {
			return this.isFilter ? this.$messages.labelFilteringHide() : this.$messages.labelFilteringShow();
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
					id: "cmbtAccountName",
					value: this.$messages.fieldLabelAccountName(),
				},
				{
					id: "cmbtAccountNo",
					value: this.$messages.fieldLabelAccountNo(),
				},
				{
					id: "cmbtBankName",
					value: this.$messages.fieldLabelBankName(),
				},
				{
					id: "cmbtMinAmount",
					value: this.$messages.fieldLabelMinAmount(),
				},
				{
					id: "cmbtRemarks",
					value: this.$messages.fieldLabelUserRemarks(),
				},
				{
					id: "cmbtStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
				{
					id: "type",
					value: this.$messages.fieldLabelType(),
				},
			];
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				cmbtAccountName: this.cmbtAccountName,
				cmbtAccountNo: this.cmbtAccountNo,
				cmbtBankName: this.cmbtBankName,
				cmbtMinAmount: this.cmbtMinAmount,
				cmbtRemarks: this.cmbtRemarks,
				cmbtStatus: this.cmbtStatus,
				type: this.type,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.cmbtAccountName = "";
			this.cmbtAccountNo = "";
			this.cmbtBankName = "";
			this.cmbtMinAmount = 0;
			this.cmbtRemarks = "";
			this.cmbtStatus = -99;
			this.type = null;
			this.sortBy = "cmbtAccountName";
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