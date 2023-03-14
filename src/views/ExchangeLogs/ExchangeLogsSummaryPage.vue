<template>
	<div class="row">
		<div class="col-md-12">
			<exchange-logs-filter @search="search"></exchange-logs-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<exchange-logs-listing @refresh="getAll()" :currentPage="currentPage" :start="start" :end="end" :gmptId="gmptId"
						:username="username"></exchange-logs-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ExchangeLogsListing from "./@components/ExchangeLogsListing";
import ExchangeLogsFilter from "./@components/ExchangeLogsFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { ExchangeLogsListing, ExchangeLogsFilter },
	mixins: [pageBehaviour],
	data: () => ({
		username: "",
		gmptId: -99,
		start: new Date().toISOString().slice(0, 10),
		end: new Date().toISOString().slice(0, 10),
	}),
	async created() {},
	computed: {},
	methods: {
		search(filter) {
			this.username = filter.username;
			this.gmptId = filter.gmptId;
			this.start = filter.start;
			this.end = filter.end;
		},
	},
};
</script>

<style>
</style>