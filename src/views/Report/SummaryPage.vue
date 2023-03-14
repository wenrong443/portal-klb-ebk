<template>
	<div class="row">
		<div class="col-md-12">
			<team-report-filter @search="search"></team-report-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<team-report-listing @refresh="getAll()" :currentPage="currentPage" :startDate="startDate" :endDate="endDate"
						:utUsername="utUsername"></team-report-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TeamReportListing from "./@components/TeamReportListing";
import TeamReportFilter from "./@components/TeamReportFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { TeamReportListing, TeamReportFilter },
	mixins: [pageBehaviour],
	data: () => ({
		utUsername: "",
		startDate: new Date().toISOString().slice(0, 10),
		endDate: new Date().toISOString().slice(0, 10),
	}),
	async created() {},
	computed: {},
	methods: {
		search(filter) {
			this.utUsername = filter.utUsername;
			this.startDate = filter.startDate;
			this.endDate = filter.endDate;
		},
	},
};
</script>

<style>
</style>