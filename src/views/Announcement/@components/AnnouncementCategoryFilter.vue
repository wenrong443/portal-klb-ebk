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
						<label>{{ $messages.fieldLabelTitle() }}</label>
						<input type="email" class="form-control" v-model="actName" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUIURL() }}</label>
						<input type="email" class="form-control" v-model="actUiLink" />
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.labelStatus() }}</label>
						<select class="form-control" v-model="actStatus">
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
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import { mixin as RecordMixin } from "../Announcement";
export default {
	components: { CaveSwitchCheckbox },
	mixins: [RecordMixin],
	data: () => ({
		actName: "",
		actUiLink: "",
		actStatus: -99,
		sortBy: "actId",
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
					id: "actId",
					value: "ID",
				},
				{
					id: "actName",
					value: this.$messages.fieldLabelTitle(),
				},
				{
					id: "actUiLink",
					value: this.$messages.fieldLabelUIURL(),
				},
				{
					id: "actStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
			];
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				actName: this.actName,
				actUiLink: this.actUiLink,
				actStatus: this.actStatus,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.actStatus = -99;
			this.actName = "";
			this.actUiLink = "";
			this.sortBy = "actId";
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