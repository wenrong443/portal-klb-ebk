<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
					<button type="submit" class="btn btn-info btn-round" @click="showFilter()"> {{ filterWord }} </button>
				</div>
				<div class="card-body" v-if="isFilter">
					<div class="cave-card--date">
						<div class="form-group">
							<label for="inputState">{{$messages.labelDate()}} ({{$messages.labelFrom()}})</label>
							<input v-model="fromDate" type="date" class="form-control">
						</div>
						<div class="form-group">
							<label for="inputState">{{$messages.labelDate()}} ({{$messages.labelTo()}})</label>
							<input v-model="toDate" type="date" class="form-control">
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
import { formatDate } from "seedwork/dateFormatter";
export default {
	components: {},
	mixins: [],
	data: () => ({
		fromDate: formatDate(new Date()),
		toDate: formatDate(new Date()),
		isFilter: false,
	}),
	computed: {
		filterWord() {
			return this.isFilter ? this.$messages.labelFilteringHide() : this.$messages.labelFilteringShow();
		},
	},
	methods: {
		emitSearch() {
			this.$emit("search", {
				fromDate: this.fromDate,
				toDate: this.toDate,
			});
		},
		resetFilter() {
			this.fromDate = "";
			this.toDate = "";
			this.emitSearch();
		},
		showFilter() {
			this.isFilter = !this.isFilter;
		},
	},
};
</script>

<style>
.cave-card--date {
	display: grid;
	grid-template-columns: auto auto;
	gap: 16px;
}
</style>