<template>
	<div class="row">
		<div class="col-md-12">
			<operation-logs-filter @search="search"></operation-logs-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<operation-logs-listing @refresh="getAll()" :currentPage="currentPage" :start="start" :end="end" :username="username">
					</operation-logs-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OperationLogsListing from "./@components/OperationLogsListing";
import OperationLogsFilter from "./@components/OperationLogsFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { OperationLogsListing, OperationLogsFilter },
	mixins: [pageBehaviour],
	data: () => ({
		username: "",
		start: new Date().toISOString().slice(0, 10),
		end: new Date().toISOString().slice(0, 10),
	}),
	async created() {},
	computed: {},
	methods: {
		search(filter) {
			this.username = filter.username;
			this.start = filter.start;
			this.end = filter.end;
		},
	},
};
</script>

<style>
</style>