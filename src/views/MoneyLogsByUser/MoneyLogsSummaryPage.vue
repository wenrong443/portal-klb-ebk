<template>
	<div class="row">
		<div class="col-md-12">
			<money-logs-filter @search="search"></money-logs-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<money-logs-listing @refresh="getAll()" :currentPage="currentPage" :start="start" :end="end" :utId="utId" :moneyType="moneyType"></money-logs-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MoneyLogsListing from "./@components/MoneyLogsListing";
import MoneyLogsFilter from "./@components/MoneyLogsFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { MoneyLogsListing, MoneyLogsFilter },
	mixins: [pageBehaviour],
    props: {
        utId: { type: Number }
    },
	data: () => ({
        moneyType: "",
		start: new Date().toISOString().slice(0, 10),
		end: new Date().toISOString().slice(0, 10),
	}),
	async created() {},
	computed: {},
	methods: {
		search(filter) {
            this.moneyType = filter.moneyType;
			this.start = filter.start;
			this.end = filter.end;
		},
	},
};
</script>

<style>
</style>